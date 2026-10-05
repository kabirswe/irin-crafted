import Layout from '../components/layout/Layout';
import PageHero from '../components/layout/PageHero';
import ContactSection from '../components/sections/ContactSection';
import CtaBand from '../components/sections/CtaBand';
import { Reveal, SectionHeading, Eyebrow } from '../components/ui/primitives';
import Icon from '../components/ui/Icon';
import { content } from '../data/content';

const tips = [
    { title: 'Preferred event date', icon: 'calendar' },
    { title: 'Type of service', icon: 'utensils' },
    { title: 'Number of guests', icon: 'users' },
    { title: 'Dietary preferences', icon: 'leaf' },
];

const areas = ['Manhattan', 'Brooklyn', 'The Hamptons', 'Westchester', 'Miami', 'Aspen', 'Los Angeles', 'Chicago'];

export default function ContactUs() {
    const { brand, bookingOptions, pageMeta, cta } = content;

    return (
        <Layout content={content} path="/contact-us">
            <PageHero meta={pageMeta['/contact-us']} breadcrumb={[{ label: 'Contact Us' }]} image="/images/service-corporate.jpg" />

            <ContactSection brand={brand} options={bookingOptions} tips={tips} />

            {/* service area */}
            <section className="section-tight bg-ink-950/60">
                <div className="shell">
                    <SectionHeading
                        eyebrow="Where we cook"
                        title="Service areas & travel"
                        body="Based in New York with regular travel to selected destinations. Tell us where you are and we will confirm availability."
                        align="center"
                    />
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {areas.map((area, i) => (
                            <Reveal
                                key={area}
                                delay={(i % 4) * 0.04}
                                className="rounded-full border border-cream-200/15 px-5 py-2.5 text-sm text-cream-300 transition-all duration-500 hover:border-gold-500/70 hover:text-gold-200"
                            >
                                {area}
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.1} className="mx-auto mt-12 max-w-xl card flex items-center gap-5 p-6">
                        <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-gold-600/40 text-gold-300">
                            <Icon name="globe" size={20} />
                        </span>
                        <p className="text-sm text-cream-400">
                            Outside these areas? We travel worldwide for private residencies and multi-day events.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="section-tight">
                <div className="shell flex flex-col items-center gap-6 text-center">
                    <Eyebrow center>Ready when you are</Eyebrow>
                    <p className="font-display text-2xl text-cream-50 sm:text-3xl">
                        Call {brand.phone} — or send a request and we will reply within 24 hours.
                    </p>
                    <a href="/book-a-chef" className="btn btn-gold">
                        Book a chef
                        <Icon name="arrow-right" size={16} />
                    </a>
                </div>
            </section>

            <CtaBand cta={cta} image="/images/service-wine.jpg" />
        </Layout>
    );
}
