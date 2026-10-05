/**
 * Reference design capture tool (v2).
 *
 * Runs inside a GitHub Actions runner (full internet access) and captures:
 *   - full page desktop screenshots  (design-reference/desktop/<slug>.jpg)
 *   - full page mobile screenshots   (design-reference/mobile/<slug>.jpg)
 *   - rendered HTML per page         (design-reference/html/<slug>.html)
 *   - design tokens JSON             (design-reference/design-tokens.json)
 *   - self hosted webfonts           (design-reference/fonts/*.woff2 + fonts.css)
 *   - raw stylesheets                (design-reference/raw-css/*)
 *
 * The host sits behind a JS challenge ("One moment, please...") that reloads
 * itself; we detect it, wait for the reload to settle and retry.
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

const UA =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function mkdirs() {
    for (const d of ['desktop', 'mobile', 'html', 'fonts', 'raw-css']) {
        await fs.mkdir(path.join(OUT, d), { recursive: true });
    }
}

const isChallenge = (page) =>
    page
        .title()
        .then((t) => /one moment|just a moment|checking your browser|attention required/i.test(t))
        .catch(() => false);

/** Load a url, riding out the JS challenge, and wait for real content. */
async function gotoWithChallenge(page, url, { tries = 5, contentSelector = 'body *' } = {}) {
    for (let i = 0; i < tries; i++) {
        try {
            const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
            await sleep(1500);
            if (await isChallenge(page)) {
                console.log(`    challenge detected (attempt ${i + 1}) — waiting for reload`);
                await sleep(9000);
                try {
                    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
                } catch {
                    /* ignore */
                }
                await sleep(2000);
                if (await isChallenge(page)) {
                    await sleep(6000);
                    continue;
                }
            }
            // wait for something meaningful to render
            await page
                .waitForFunction(
                    () => {
                        const t = (document.title || '').toLowerCase();
                        if (t.includes('one moment')) return false;
                        return document.body && document.body.innerText.trim().length > 400;
                    },
                    { timeout: 30000 },
                )
                .catch(() => {});
            return res;
        } catch (e) {
            console.log('    nav error:', String(e).split('\n')[0]);
            await sleep(4000);
        }
    }
    return null;
}

/** Scroll the whole page so lazy loaded images / scroll animations resolve. */
async function warmUp(page) {
    await page
        .evaluate(async () => {
            await new Promise((resolve) => {
                let y = 0;
                const step = () => {
                    y += Math.max(200, window.innerHeight / 2);
                    window.scrollTo(0, y);
                    if (y < document.body.scrollHeight + window.innerHeight) {
                        setTimeout(step, 130);
                    } else {
                        window.scrollTo(0, 0);
                        setTimeout(resolve, 700);
                    }
                };
                step();
            });
        })
        .catch(() => {});
    await sleep(1800);
    // force eager loading of every image, then wait for them
    await page
        .evaluate(() =>
            Promise.all(
                [...document.images]
                    .filter((i) => !i.complete)
                    .map((i) => new Promise((r) => {
                        i.addEventListener('load', r, { once: true });
                        i.addEventListener('error', r, { once: true });
                        setTimeout(r, 8000);
                    })),
            ),
        )
        .catch(() => {});
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
        const fontFaces = [];
        for (const sheet of document.styleSheets) {
            let rules;
            try { rules = sheet.cssRules; } catch { continue; }
            if (!rules) continue;
            for (const rule of rules) {
                if (rule.type === 5) {
                    fontFaces.push({
                        cssText: rule.cssText,
                        family: rule.style.getPropertyValue('font-family'),
                        src: rule.style.getPropertyValue('src'),
                        weight: rule.style.getPropertyValue('font-weight'),
                    });
                }
            }
        }
        return {
            rootVars,
            colors: tally((el) => {
                const c = getComputedStyle(el).color;
                return c && c !== 'rgba(0, 0, 0, 0)' ? c : null;
            }, 40),
            backgrounds: tally((el) => {
                const c = getComputedStyle(el).backgroundColor;
                return c && c !== 'rgba(0, 0, 0, 0)' ? c : null;
            }, 40),
            fonts: tally((el) => getComputedStyle(el).fontFamily, 20),
            fontSizes: tally((el) => getComputedStyle(el).fontSize, 40),
            headings: {
                h1: sample('h1'), h2: sample('h2'), h3: sample('h3'),
                body: sample('body'), p: sample('p'),
                link: sample('a'), button: sample('button, .elementor-button'),
                header: sample('header'), footer: sample('footer'),
            },
            fontFaces,
            stylesheetHrefs: [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href),
            imageCount: document.images.length,
            sections: document.querySelectorAll('section, .elementor-section, .e-con').length,
            bodyClasses: document.body.className,
            title: document.title,
        };
    });
}

async function downloadFonts(context, tokens) {
    const urls = new Map();
    for (const face of tokens.fontFaces || []) {
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
            const res = await context.request.get(u, { headers: { referer: BASE + '/' } });
            if (!res.ok()) { manifest.push({ url: u, filename, error: res.status() }); continue; }
            const body = await res.body();
            await fs.writeFile(path.join(OUT, 'fonts', filename), body);
            manifest.push({ url: u, filename, bytes: body.length });
        } catch (e) {
            manifest.push({ url: u, filename, error: String(e).slice(0, 200) });
        }
    }
    return manifest;
}

async function downloadCss(context, tokens) {
    const list = [];
    for (const href of tokens.stylesheetHrefs || []) {
        try {
            const res = await context.request.get(href, { headers: { referer: BASE + '/' } });
            if (!res.ok()) continue;
            const name = href.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-110);
            const text = await res.text();
            await fs.writeFile(path.join(OUT, 'raw-css', name), text);
            list.push({ href, name, bytes: text.length });
        } catch { /* ignore */ }
    }
    return list;
}

const main = async () => {
    await mkdirs();
    const browser = await chromium.launch({
        args: [
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-blink-features=AutomationControlled',
        ],
    });
    const context = await browser.newContext({
        userAgent: UA,
        viewport: DESKTOP,
        deviceScaleFactor: 1,
        locale: 'en-US',
        timezoneId: 'America/New_York',
        extraHTTPHeaders: { 'accept-language': 'en-US,en;q=0.9' },
    });
    await context.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
        window.chrome = window.chrome || { runtime: {} };
    });

    const page = await context.newPage();
    page.setDefaultTimeout(60000);

    let tokens = null;
    const report = { generatedAt: new Date().toISOString(), base: BASE, pages: [], fonts: [], css: [] };

    // warm cookies on the home page first so the challenge is solved once
    console.log('=== warming up');
    await gotoWithChallenge(page, BASE + '/');

    for (const [slug, urlPath] of PAGES) {
        const url = BASE + urlPath;
        console.log('=== capture', slug, url);
        try {
            const res = await gotoWithChallenge(page, url);
            await warmUp(page);

            await page.evaluate(() => window.scrollTo(0, 0));
            await sleep(900);
            await page.screenshot({
                path: path.join(OUT, 'desktop', `${slug}.jpg`),
                fullPage: true,
                type: 'jpeg',
                quality: 78,
            });
            console.log('  desktop ok');

            await page.setViewportSize(MOBILE);
            await sleep(1400);
            await warmUp(page);
            await page.evaluate(() => window.scrollTo(0, 0));
            await sleep(900);
            await page.screenshot({
                path: path.join(OUT, 'mobile', `${slug}.jpg`),
                fullPage: true,
                type: 'jpeg',
                quality: 76,
            });
            await page.setViewportSize(DESKTOP);
            await sleep(500);
            console.log('  mobile ok');

            const html = await page.content();
            await fs.writeFile(path.join(OUT, 'html', `${slug}.html`), html);
            if (!tokens) tokens = await collectTokens(page);
            report.pages.push({ slug, url, status: res ? res.status() : null, htmlBytes: html.length, title: await page.title() });
        } catch (e) {
            console.log('  FAILED', String(e).slice(0, 200));
            report.pages.push({ slug, url, error: String(e).slice(0, 400) });
        }
    }

    if (tokens) {
        report.fonts = await downloadFonts(context, tokens);
        report.css = await downloadCss(context, tokens);
        await fs.writeFile(path.join(OUT, 'design-tokens.json'), JSON.stringify(tokens, null, 2));
        const css = (tokens.fontFaces || [])
            .map((f) => {
                let src = f.src || '';
                for (const m of report.fonts) {
                    if (m.filename && src.includes(m.url)) src = src.split(m.url).join(`./${m.filename}`);
                }
                return `@font-face { font-family: ${f.family}; src: ${src}; font-weight: ${f.weight || 400}; font-style: normal; font-display: swap; }`;
            })
            .join('\n');
        await fs.writeFile(path.join(OUT, 'fonts', 'fonts.css'), css + '\n');
    }

    report.tokens = tokens ? { title: tokens.title, bodyClasses: tokens.bodyClasses, imageCount: tokens.imageCount } : null;
    await fs.writeFile(path.join(OUT, 'capture-report.json'), JSON.stringify(report, null, 2));
    await browser.close();
    console.log('DONE');
};

main().catch((e) => { console.error(e); process.exit(1); });
