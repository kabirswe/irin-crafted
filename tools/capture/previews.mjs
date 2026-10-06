/**
 * ThemeForest preview capture.
 *
 * Two jobs:
 *  1. Grab every official preview screenshot of each demo page (the item page
 *     gallery) at the highest resolution available.
 *  2. Screenshot the live full_screen_preview demo (and its iframe content) so
 *     we own a full-page reference of every template page.
 *
 * Output: design-reference/themeforest/ and design-reference/desktop-live/
 * Usage: node tools/capture/previews.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const ITEM = 'https://themeforest.net/item/veyssette-private-chef-services-elementor-pro-template-kit/63658456';
const FULL_SCREEN =
    'https://preview.themeforest.net/item/veyssette-private-chef-services-elementor-pro-template-kit/full_screen_preview/63658456';
const OUT = path.resolve('design-reference');

const UA =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (s) => (s || 'page').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

async function main() {
    for (const d of ['themeforest', 'desktop-live', 'mobile-live']) {
        await fs.mkdir(path.join(OUT, d), { recursive: true });
    }

    const browser = await chromium.launch({
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-blink-features=AutomationControlled'],
    });
    const context = await browser.newContext({
        userAgent: UA,
        viewport: { width: 1440, height: 900 },
        locale: 'en-US',
        extraHTTPHeaders: { 'accept-language': 'en-US,en;q=0.9' },
    });
    const page = await context.newPage();
    page.setDefaultTimeout(60000);

    /* ---------------- 1. item page gallery ---------------- */
    const found = new Map();
    try {
        console.log('=== item page');
        await page.goto(ITEM, { waitUntil: 'domcontentloaded' });
        await sleep(4000);
        for (let i = 0; i < 6; i++) {
            await page.evaluate(() => window.scrollBy(0, 1400));
            await sleep(1200);
        }
        await page.screenshot({ path: path.join(OUT, 'themeforest', '_item-page.jpg'), fullPage: true, type: 'jpeg', quality: 70 });

        const srcs = await page.evaluate(() =>
            [...document.querySelectorAll('img')]
                .map((i) => ({ src: i.currentSrc || i.src, alt: i.alt }))
                .filter((x) => /envatousercontent|previews\/files|screenshots/i.test(x.src)),
        );
        for (const { src, alt } of srcs) {
            const base = src.split('?')[0];
            if (!found.has(base)) found.set(base, alt);
        }
        console.log('  preview images found:', found.size);
    } catch (e) {
        console.log('  item page failed:', String(e).split('\n')[0]);
    }

    /* ---------------- 2. live full screen preview ---------------- */
    const shots = [];
    try {
        console.log('=== full screen preview');
        await page.goto(FULL_SCREEN, { waitUntil: 'domcontentloaded' });
        await sleep(5000);

        // frame url(s) shown by the preview wrapper
        const frames = page.frames().map((f) => f.url());
        console.log('  frames:', frames.join(' | ').slice(0, 500));
        const inner = frames.find((f) => /templateup|themeforest|demo/i.test(f) && f !== FULL_SCREEN);

        if (inner) {
            const p2 = await context.newPage();
            await p2.goto(inner, { waitUntil: 'domcontentloaded' });
            await sleep(6000);
            const title = await p2.title();
            console.log('  inner title:', title);
            if (!/one moment/i.test(title)) {
                await p2.evaluate(() => window.scrollTo(0, 0));
                await sleep(1500);
                await p2.screenshot({ path: path.join(OUT, 'desktop-live', 'home.jpg'), fullPage: true, type: 'jpeg', quality: 78 });
                shots.push({ url: inner, title });
                const html = await p2.content();
                await fs.writeFile(path.join(OUT, 'html', 'home-live.html'), html);
            }
            await p2.close();
        }

        // also screenshot the wrapper (shows the demo inside the envato chrome)
        await page.screenshot({ path: path.join(OUT, 'themeforest', '_full-screen-preview.jpg'), fullPage: false, type: 'jpeg', quality: 70 });
    } catch (e) {
        console.log('  preview failed:', String(e).split('\n')[0]);
    }

    /* ---------------- 3. download every preview image, big ------- */
    const manifest = [];
    let idx = 0;
    for (const [u, alt] of found) {
        idx++;
        const big = `${u}?w=1600&h=1000&cf_fit=crop&crop=top&format=auto&q=88`;
        const fallback = u;
        const name = `${String(idx).padStart(2, '0')}-${slug(alt) || 'preview'}.jpg`;
        try {
            const res = await context.request.get(big, { headers: { referer: ITEM } });
            const okRes = res.ok() ? res : await context.request.get(fallback, { headers: { referer: ITEM } });
            if (!okRes.ok()) { manifest.push({ url: big, error: okRes.status() }); continue; }
            const body = await okRes.body();
            await fs.writeFile(path.join(OUT, 'themeforest', name), body);
            manifest.push({ url: u, name, bytes: body.length, alt });
            console.log('  saved', name, body.length);
        } catch (e) {
            manifest.push({ url: u, error: String(e).slice(0, 160) });
        }
    }

    await fs.writeFile(
        path.join(OUT, 'themeforest', 'manifest.json'),
        JSON.stringify({ generatedAt: new Date().toISOString(), item: ITEM, fullScreen: FULL_SCREEN, shots, images: manifest, found: [...found.keys()] }, null, 2),
    );

    await browser.close();
    console.log('DONE');
}

main().catch((e) => { console.error(e); process.exit(1); });
