import PageHero from '../components/layout/PageHero';
import Layout from '../components/layout/Layout';
import SplitFeature from '../components/sections/SplitFeature';
import Features from '../components/sections/Features';
import FeaturedMenus from '../components/sections/FeaturedMenus';
import Steps from '../components/sections/Steps';
import Testimonials from '../components/sections/Testimonials';
import CtaBand from '../components/sections/CtaBand';
import PlansGrid from '../components/sections/PlansGrid';
import { Eyebrow, Reveal, SectionHeading } from '../components/ui/primitives';
import Icon from '../components/ui/Icon';
import { content, faqGroups } from '../data/content';
import { servicePages } from '../data/servicePages';

/**
 * Shared template for the six service detail pages.
 * Each page renders: hero → intro split → highlights → (menu | plans) →
 * steps → testimonials → CTA.
 */
export default function ServicePage({ path }) {
    const config = servicePages[path];
    const meta = content.pageMeta[path];
    const service = content.services.find((s) => s.href === path);

    return (
        <Layout content={content} path={path}>
            <PageHero meta={meta} breadcrumb={[{ label: 'Services', href: '/services' }, { label: meta.title }]} image={service?.image} />

            <SplitFeature {...config.intro} />

            {/* highlights */}
            <section className="section-tight relative bg-ink-950/60">
                <div className="shell">
                    <SectionHeading
                        eyebrow="What’s included"
                        title="Considered in every detail"
                        align="center"
                    />
                    <Features features={config.highlights} columns={config.highlights.length === 4 ? 4 : 3} className="mt-12" />
                </div>
            </section>

            {config.plans && (
                <PlansGrid
                    plans={content.plans}
                    note="All plans are fully customizable to your preferences and dietary needs."
                />
            )}

            {config.menuTitle && (
                <FeaturedMenus
                    dishes={content.featuredMenus}
                    eyebrow="Sample menu"
                    title={config.menuTitle}
                    layout={config.menuLayout || 'grid'}
                    cta={{ label: 'See full menu', href: '/menu-experience' }}
                />
            )}

            <Steps steps={content.steps} {...(config.steps || {})} />

            <Testimonials items={content.testimonials} variant="grid" eyebrow="Guest stories" title="Experiences that speak for themselves" />

            {/* FAQ teaser */}
            <section className="section-tight">
                <div className="shell grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                    <div>
                        <Reveal className="flex">
                            <Eyebrow>Good to know</Eyebrow>
                        </Reveal>
                        <h2 className="display-2 mt-5">Questions, answered</h2>
                        <p className="lede mt-5">
                            Everything from booking windows to allergens — and if anything is missing, we are one message
                            away.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faqGroups[0].items.slice(0, 3).map((item, i) => (
                            <Reveal key={item.q} delay={i * 0.05} className="card p-6">
                                <p className="flex items-start gap-3 display-4 text-cream-50">
                                    <Icon name="sparkle" size={17} className="mt-1.5 shrink-0 text-gold-500" />
                                    {item.q}
                                </p>
                                <p className="mt-3 pl-7 text-sm leading-relaxed text-cream-500">{item.a}</p>
                            </Reveal>
                        ))}
                        <Reveal delay={0.16}>
                            <a href="/faq" className="btn btn-ghost btn-sm">
                                Read all FAQs
                                <Icon name="arrow-up-right" size={14} />
                            </a>
                        </Reveal>
                    </div>
                </div>
            </section>

            <CtaBand cta={config.cta} image={service?.image} />
        </Layout>
    );
}
