import { useState } from 'react';
import Layout from '../components/layout/Layout';
import PageHero from '../components/layout/PageHero';
import BlogGrid from '../components/sections/BlogGrid';
import CtaBand from '../components/sections/CtaBand';
import Icon from '../components/ui/Icon';
import { Reveal } from '../components/ui/primitives';
import { content } from '../data/content';

export default function Blog() {
    const { posts, pageMeta, cta } = content;
    const [email, setEmail] = useState('');
    const [done, setDone] = useState(false);

    const categories = ['All', ...new Set(posts.map((p) => p.category))];

    return (
        <Layout content={content} path="/blog">
            <PageHero meta={pageMeta['/blog']} breadcrumb={[{ label: 'Blog' }]} image="/images/about-chef-hands.jpg" />

            <section className="section-tight">
                <div className="shell flex flex-wrap items-center justify-center gap-3">
                    {categories.map((cat) => (
                        <span
                            key={cat}
                            className="rounded-full border border-cream-200/15 px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.2em] text-cream-400 transition-colors duration-500 hover:border-gold-600/60 hover:text-gold-200"
                        >
                            {cat}
                        </span>
                    ))}
                </div>
            </section>

            <BlogGrid posts={posts} showHeader={false} title="" />

            {/* newsletter */}
            <section className="section-tight">
                <div className="shell">
                    <Reveal className="card relative overflow-hidden p-10 text-center sm:p-14">
                        <span className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 glow-gold" />
                        <span className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 glow-gold" />
                        <div className="relative mx-auto max-w-xl">
                            <span className="eyebrow eyebrow--center">The seasonal letter</span>
                            <h2 className="display-2 mt-6">Menus, notes and quiet invitations</h2>
                            <p className="mt-5 text-cream-400">
                                One considered email each season — new dishes, seasonal tables and the occasional last-minute
                                date.
                            </p>
                            {done ? (
                                <p className="mt-8 flex items-center justify-center gap-3 text-gold-200">
                                    <Icon name="check" size={18} />
                                    You are on the list. Welcome.
                                </p>
                            ) : (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (/^\S+@\S+\.\S+$/.test(email)) setDone(true);
                                    }}
                                    className="mt-8 flex flex-col gap-3 sm:flex-row"
                                >
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="field flex-1"
                                    />
                                    <button type="submit" className="btn btn-gold">
                                        Subscribe
                                    </button>
                                </form>
                            )}
                        </div>
                    </Reveal>
                </div>
            </section>

            <CtaBand cta={cta} image="/images/service-meal-prep.jpg" />
        </Layout>
    );
}
