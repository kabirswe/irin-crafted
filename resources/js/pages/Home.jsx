import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import MarqueeStrip from '../components/sections/MarqueeStrip';
import Features from '../components/sections/Features';
import AboutIntro from '../components/sections/AboutIntro';
import ServicesGrid from '../components/sections/ServicesGrid';
import Steps from '../components/sections/Steps';
import FeaturedMenus from '../components/sections/FeaturedMenus';
import Testimonials from '../components/sections/Testimonials';
import CtaBand from '../components/sections/CtaBand';
import { SectionEyebrow } from '../components/ui/decor';
import { Reveal } from '../components/ui/primitives';
import { content } from '../data/content';

/**
 * Home page composition mirrors the reference kit section order:
 * hero → locations → features → about → services → process → menus →
 * testimonials → closing CTA.
 */
export default function Home() {
    const { hero, features, about, services, steps, featuredMenus, testimonials, cta } = content;

    return (
        <Layout content={content} path="/">
            <Hero hero={hero} />

            <MarqueeStrip items={hero.cities} label={hero.trustedLabel} />

            {/* feature band */}
            <section className="section-tight relative">
                <div className="shell">
                    <Features features={features} />
                </div>
            </section>

            <AboutIntro about={about} />

            <ServicesGrid
                services={services.slice(0, 4)}
                eyebrow="Our Services"
                title="Culinary Experiences Made For You"
                body="From intimate dinners to special celebrations, we offer a variety of services designed to make every occasion unique and stress-free."
                variant="tiles"
                cta={{ label: 'View All Services', href: '/services' }}
                className="border-y border-cream-100/8 bg-ink-950/50"
            />

            <Steps steps={steps} />

            <FeaturedMenus
                dishes={featuredMenus}
                eyebrow="Featured Menus"
                title="A Taste Of What We Create"
                body="Experience thoughtfully curated dishes crafted with seasonal ingredients, refined techniques and unforgettable presentation designed for intimate luxury dining."
                cta={{ label: 'See Full Menu', href: '/menu-experience' }}
                layout="list"
            />

            <Testimonials
                items={testimonials}
                variant="grid"
                eyebrow="What Our Clients Say"
                title="Experiences That Speak For Themselves"
            />

            {/* promise strip */}
            <section className="section-tight">
                <div className="shell max-w-3xl text-center">
                    <Reveal className="flex flex-col items-center gap-6">
                        <SectionEyebrow>The Irin Promise</SectionEyebrow>
                        <p className="font-display text-2xl leading-snug text-cream-100 sm:text-[1.75rem]">
                            “The difference is in the details — the moment a plate lands, the room goes quiet.”
                        </p>
                    </Reveal>
                </div>
            </section>

            <CtaBand
                cta={cta}
                image="/images/dish-filet.jpg"
                imageRight="/images/service-wine.jpg"
            />
        </Layout>
    );
}
