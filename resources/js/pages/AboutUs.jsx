import Layout from '../components/layout/Layout';
import PageHero from '../components/layout/PageHero';
import SplitFeature from '../components/sections/SplitFeature';
import Features from '../components/sections/Features';
import Testimonials from '../components/sections/Testimonials';
import CtaBand from '../components/sections/CtaBand';
import Steps from '../components/sections/Steps';
import { Reveal, SectionHeading, Eyebrow, Ornament, StatBlock } from '../components/ui/primitives';
import Icon from '../components/ui/Icon';
import { content } from '../data/content';

const values = [
    { icon: 'mortar', title: 'Quality Ingredients', body: 'Fresh, seasonal produce chosen the morning of your event.' },
    { icon: 'award', title: 'Culinary Excellence', body: 'Classical technique applied with a modern, light hand.' },
    { icon: 'star', title: 'Personalized Service', body: 'Menus and pacing shaped around you and your guests.' },
    { icon: 'sparkle', title: 'Memorable Experiences', body: 'The details that make an evening worth retelling.' },
];

const timeline = [
    { year: '2006', title: 'First kitchen', body: 'Classical training begins in a Michelin-listed dining room.' },
    { year: '2012', title: 'Head chef', body: 'Leading a brigade of fourteen through tasting menus nightly.' },
    { year: '2018', title: 'Going private', body: 'The first private clients — a table of eight in Manhattan.' },
    { year: 'Today', title: 'Irin Crafted', body: 'A full private chef service across the East Coast.' },
];

export default function AboutUs() {
    const { about, pageMeta, testimonials, cta, steps } = content;

    return (
        <Layout content={content} path="/about-us">
            <PageHero meta={pageMeta['/about-us']} breadcrumb={[{ label: 'About Us' }]} image="/images/about-dish.jpg" />

            <SplitFeature
                eyebrow="Our story"
                title="A passion for fine dining & meaningful moments"
                body={[
                    'Irin Crafted was created with a simple belief: exceptional food has the power to bring people together. With years of experience in fine dining and private hospitality, our chef brings restaurant-quality cuisine to the comfort of your home.',
                    'Every dish is thoughtfully crafted, every detail is considered, and every experience is designed to leave a lasting impression.',
                ]}
                image={about.images[0].src}
                imageAlt={about.images[0].alt}
                badge={{ icon: 'candle', title: 'Since 2006', body: 'in professional kitchens' }}
                cta={{ label: 'Work with us', href: '/book-a-chef' }}
            />

            {/* values */}
            <section className="section relative bg-ink-950/60">
                <div className="shell">
                    <SectionHeading eyebrow="What guides us" title="Our values in every detail" align="center" />
                    <Features features={values} className="mt-14" />
                </div>
            </section>

            {/* chef profile */}
            <SplitFeature
                flip
                eyebrow="Meet your chef"
                title="Experience, dedication & a love for what we do"
                body={[
                    'With over 20 years of experience in fine dining and private culinary services, our chef has worked in award-winning restaurants and served discerning clients around the world.',
                    'Today, that expertise comes directly to you, creating refined dishes and personalized experiences that reflect a commitment to excellence, hospitality and attention to detail.',
                ]}
                stats={[
                    { value: 20, suffix: '+', label: 'Years of Experience' },
                    { value: 600, suffix: '+', label: 'Private Events' },
                    { value: 100, suffix: '%', label: 'Dedication' },
                ]}
                image={about.images[1].src}
                imageAlt={about.images[1].alt}
                note="Every menu is tasted, adjusted and signed off before it reaches your table."
            />

            {/* timeline */}
            <section className="section relative">
                <div className="shell">
                    <SectionHeading eyebrow="The journey" title="Two decades of quiet obsession" align="center" />
                    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {timeline.map((t, i) => (
                            <Reveal key={t.year} delay={i * 0.07} className="relative border-l border-gold-700/40 pl-6">
                                <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-gold-500" />
                                <p className="font-display text-3xl text-gold-200">{t.year}</p>
                                <h3 className="display-4 mt-3 text-cream-50">{t.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-cream-500">{t.body}</p>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.1} className="mt-14 flex justify-center">
                        <Ornament width={220} />
                    </Reveal>
                </div>
            </section>

            <Testimonials
                items={testimonials}
                variant="wall"
                eyebrow="What our clients say"
                title="Experiences that speak for themselves"
            />

            <Steps steps={steps} eyebrow="How it works" title="Simple, personal & seamless" />

            {/* promise band */}
            <section className="section-tight">
                <div className="shell">
                    <Reveal className="card flex flex-col items-center gap-6 p-12 text-center">
                        <Eyebrow center>The Irin promise</Eyebrow>
                        <p className="mx-auto max-w-2xl font-display text-2xl leading-snug text-cream-50 sm:text-3xl">
                            If a single detail is not right, we return and make it right. That has never changed.
                        </p>
                        <StatBlock stats={about.stats} className="mt-4 w-full max-w-xl" />
                        <span className="mt-4 grid size-12 place-items-center rounded-full border border-gold-600/40 text-gold-300">
                            <Icon name="chef-hat" size={22} />
                        </span>
                    </Reveal>
                </div>
            </section>

            <CtaBand cta={cta} image="/images/about-chef-hands.jpg" />
        </Layout>
    );
}
