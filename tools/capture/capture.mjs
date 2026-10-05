/**
 * Reference design capture tool.
 *
 * Runs inside a GitHub Actions runner (full internet access) and captures:
 *   - full page desktop screenshots  (design-reference/desktop/<slug>.jpg)
 *   - full page mobile screenshots   (design-reference/mobile/<slug>.jpg)
 *   - rendered HTML per page         (design-reference/html/<slug>.html)
 *   - design tokens JSON             (design-reference/design-tokens.json)
 *   - self hosted webfonts           (design-reference/fonts/*.woff2 + fonts.css)
 *
 * Usage: node tools/capture/capture.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://templateup.site/veyssette';
const OUT = path.resolve('design-reference');

const PAGES = [
  ['home', '/'],
  ['about-us', '/about-us/'],
  ['services', '/services/'],
  ['private-dining', '/private-dining/'],
  ['weekly-meal-prep', '/weekly-meal-prep/'],
  ['special-events', '/special-events/'],
  ['menu-experience', '/menu-experience/'],
  ['gallery', '/gallery/'],
  ['faq', '/faq/'],
  ['book-a-chef', '/book-a-chef/'],
  ['contact-us', '/contact-us/'],
  ['blog', '/blog/'],
  ['404', '/404-2/'],
];

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

async function mkdirs() {
  for (const d of ['desktop', 'mobile', 'html', 'fonts', 'raw-css']) {
    await fs.mkdir(path.join(OUT, d), { recursive: true });
  }
}

/** Scroll the whole page so lazy loaded images / scroll animations resolve. */
async function warmUp(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight / 2;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight + window.innerHeight) {
          setTimeout(step, 120);
        } else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 600);
        }
      };
      step();
    });
  });
  await page.waitForTimeout(1500);
}

async function collectTokens(page) {
  return page.evaluate(() => {
    const props = [
      'color', 'background-color', 'font-family', 'font-size', 'font-weight',
      'line-height', 'letter-spacing', 'text-transform', 'border-radius',
      'padding', 'margin', 'border-color', 'transition',
    ];
    const pick = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const o = {};
      for (const p of props) o[p] = cs.getPropertyValue(p);
      return o;
    };
    const rootVars = {};
    for (const sheet of document.styleSheets) {
      let rules;
      try { rules = sheet.cssRules; } catch { continue; }
      if (!rules) continue;
      for (const rule of rules) {
        if (rule.selectorText === ':root' || rule.selectorText === 'html') {
          for (const name of rule.style || []) {
            if (name.startsWith('--')) rootVars[name] = rule.style.getPropertyValue(name).trim();
          }
        }
      }
    }
    const tally = (fn, limit = 60) => {
      const m = new Map();
      document.querySelectorAll('*').forEach((el) => {
        const v = fn(el);
        if (!v) return;
        m.set(v, (m.get(v) || 0) + 1);
      });
      return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
    };
    const sample = (sel) => pick(document.querySelector(sel));
    return {
      rootVars,
      colors: tally((el) => {
        const c = getComputedStyle(el).color;
        return c && c !== 'rgba(0, 0, 0, 0)' ? c : null;
      }),
      backgrounds: tally((el) => {
        const c = getComputedStyle(el).backgroundColor;
        return c && c !== 'rgba(0, 0, 0, 0)' ? c : null;
      }, 40),
      fonts: tally((el) => getComputedStyle(el).fontFamily, 20),
      fontSizes: tally((el) => getComputedStyle(el).fontSize, 40),
      headings: {
        h1: sample('h1'), h2: sample('h2'), h3: sample('h3'), h4: sample('h4'),
        h5: sample('h5'), h6: sample('h6'),
        body: sample('body'), p: sample('p'),
        firstLink: sample('a'), firstButton: sample('button, .elementor-button'),
        header: sample('header'), footer: sample('footer'),
      },
      fontFaces: (() => {
        const out = [];
        for (const sheet of document.styleSheets) {
          let rules;
          try { rules = sheet.cssRules; } catch { continue; }
          if (!rules) continue;
          for (const rule of rules) {
            if (rule.constructor.name === 'CSSFontFaceRule' || rule.type === 5) {
              out.push({ cssText: rule.cssText, family: rule.style.getPropertyValue('font-family'), src: rule.style.getPropertyValue('src'), weight: rule.style.getPropertyValue('font-weight') });
            }
          }
        }
        return out;
      })(),
      stylesheetHrefs: [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href),
      imageCount: document.querySelectorAll('img').length,
      sections: [...document.querySelectorAll('section, .elementor-section, .e-con')].length,
    };
  });
}

async function downloadFonts(context, tokens) {
  const urls = new Map(); // url -> filename
  for (const face of tokens.fontFaces) {
    const m = /url\((['"]?)([^'")]+)\1\)/.exec(face.src || '');
    if (!m) continue;
    let u = m[2];
    if (u.startsWith('//')) u = 'https:' + u;
    if (u.startsWith('/')) u = new URL(u, BASE).href;
    if (!/^https?:/.test(u)) continue;
    if (!urls.has(u)) {
      const clean = u.split('?')[0];
      const ext = (clean.match(/\.(woff2|woff|ttf|otf)$/) || [, 'woff2'])[1];
      const family = (face.family || 'font').replace(/['"]/g, '').replace(/\s+/g, '-').toLowerCase();
      const weight = (face.weight || '400').replace(/['"]/g, '').replace(/\s+/g, '-');
      urls.set(u, `${family}-${weight}.${ext}`);
    }
  }
  const manifest = [];
  for (const [u, filename] of urls) {
    try {
      const res = await context.request.get(u);
      if (!res.ok()) { manifest.push({ url: u, filename, error: res.status() }); continue; }
      const body = await res.body();
      await fs.writeFile(path.join(OUT, 'fonts', filename), body);
      manifest.push({ url: u, filename, bytes: body.length });
      console.log('  font:', filename, body.length);
    } catch (e) {
      manifest.push({ url: u, filename, error: String(e) });
    }
  }
  return manifest;
}

async function downloadCss(context, tokens) {
  const list = [];
  for (const href of tokens.stylesheetHrefs) {
    try {
      const res = await context.request.get(href);
      if (!res.ok()) continue;
      const name = href.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120);
      const text = await res.text();
      await fs.writeFile(path.join(OUT, 'raw-css', name), text);
      list.push({ href, name, bytes: text.length });
    } catch { /* ignore */ }
  }
  return list;
}

const main = async () => {
  await mkdirs();
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
    viewport: DESKTOP,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);

  let tokens = null;
  const report = { generatedAt: new Date().toISOString(), base: BASE, pages: [], fonts: [], css: [] };

  for (const [slug, urlPath] of PAGES) {
    const url = BASE + urlPath;
    console.log('=== capture', slug, url);
    try {
      const res = await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(2500);
      await warmUp(page);

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(OUT, 'desktop', `${slug}.jpg`), fullPage: true, type: 'jpeg', quality: 80 });
      console.log('  desktop ok');

      // mobile pass
      await page.setViewportSize(MOBILE);
      await page.waitForTimeout(1200);
      await warmUp(page);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(OUT, 'mobile', `${slug}.jpg`), fullPage: true, type: 'jpeg', quality: 78 });
      await page.setViewportSize(DESKTOP);
      await page.waitForTimeout(400);
      console.log('  mobile ok');

      const html = await page.content();
      await fs.writeFile(path.join(OUT, 'html', `${slug}.html`), html);
      if (!tokens) tokens = await collectTokens(page);
      report.pages.push({ slug, url, status: res ? res.status() : null, htmlBytes: html.length });
    } catch (e) {
      console.log('  FAILED', String(e).slice(0, 300));
      report.pages.push({ slug, url, error: String(e).slice(0, 500) });
    }
  }

  if (tokens) {
    report.fonts = await downloadFonts(context, tokens);
    report.css = await downloadCss(context, tokens);
    await fs.writeFile(path.join(OUT, 'design-tokens.json'), JSON.stringify(tokens, null, 2));
    // fonts.css with local paths
    const css = (tokens.fontFaces || []).map((f) => {
      let src = f.src || '';
      for (const m of report.fonts) {
        if (m.filename && src.includes(m.url)) src = src.split(m.url).join(`./${m.filename}`);
      }
      return `@font-face { font-family: ${f.family}; src: ${src}; font-weight: ${f.weight || 400}; font-style: normal; font-display: swap; }`;
    }).join('\n');
    await fs.writeFile(path.join(OUT, 'fonts', 'fonts.css'), css + '\n');
  }

  report.stylesheetHrefs = tokens ? tokens.stylesheetHrefs : [];
  await fs.writeFile(path.join(OUT, 'capture-report.json'), JSON.stringify(report, null, 2));
  await browser.close();
  console.log('DONE');
};

main().catch((e) => { console.error(e); process.exit(1); });
