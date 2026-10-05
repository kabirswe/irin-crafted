import Layout from '../components/layout/Layout';
import PageHero from '../components/layout/PageHero';
import MenuCourses from '../components/sections/MenuCourses';
import FeaturedMenus from '../components/sections/FeaturedMenus';
import SplitFeature from '../components/sections/SplitFeature';
import Steps from '../components/sections/Steps';
import CtaBand from '../components/sections/CtaBand';
import Img from '../components/ui/Img';
import Icon from '../components/ui/Icon';
import { Eyebrow, Ornament, Reveal, SectionHeading } from '../components/ui/primitives';
import { content } from '../data/content';

export default function MenuExperience() {
    const { menuCourses, menuStyles, pairings, steps, cta, pageMeta } = content;

    return (
        <Layout content={content} path="/menu-experience">
            <PageHero meta={pageMeta['/menu-experience']} breadcrumb={[{ label: 'Menu Experience' }]} image="/images/dish-scallop.jpg" />

            <MenuCourses
                courses={menuCourses}
                eyebrow="Signature menu"
                title="A taste of what we create"
                body="Each dish is thoughtfully crafted with exceptional ingredients, refined techniques and a passion for detail that defines the Irin experience."
            />

            {/* menu styles */}
            <section className="section relative bg-ink-950/60">
                <div className="shell">
                    <SectionHeading
                        eyebrow="Menu styles"
                        title="Experiences crafted around your taste"
                        align="center"
                    />
                    <div className="mt-14 grid gap-6 lg:grid-cols-3">
                        {menuStyles.map((style, i) => (
                            <Reveal key={style.title} delay={i * 0.06} className="group card overflow-hidden">
                                <div data-img-reveal className="overflow-hidden">
                                    <Img
                                        src={style.image}
                                        alt={style.title}
                                        ratio="4 / 3"
                                        fallbackLabel={style.title}
                                        className="w-full"
                                        imgClassName="transition-transform duration-[1.3s] group-hover:scale-[1.08]"
                                    />
                                </div>
                                <div className="p-7">
                                    <h3 className="display-3 text-cream-50">{style.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-cream-500">{style.body}</p>
                                    <a href="/book-a-chef" className="btn-link mt-6">
                                        Choose this style
                                        <Icon name="arrow-right" size={15} />
                                    </a>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <FeaturedMenus
                dishes={content.featuredMenus}
                eyebrow="À la carte favourites"
                title="Signature dishes, priced per guest"
                body="A small selection from the current season — your final menu is always composed around what looks best at market."
                layout="grid"
                cta={{ label: 'Book a tasting', href: '/book-a-chef' }}
            />

            {/* pairings */}
            <section className="section relative">
                <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center">
                    <div>
                        <Reveal className="flex">
                            <Eyebrow>Pairings & details</Eyebrow>
                        </Reveal>
                        <h2 data-split className="display-2 mt-6 opacity-0">
                            Every flavour thoughtfully balanced
                        </h2>
                        <Reveal delay={0.06} className="mt-6">
                            <p className="text-cream-400">
                                Each course can be matched with a wine, a zero-alcohol pairing or a house mocktail designed to
                                echo the plate.
                            </p>
                        </Reveal>

                        <div className="mt-10 space-y-5">
                            {pairings.map((p, i) => (
                                <Reveal key={p.title} delay={i * 0.06} className="flex items-start gap-4 border-b border-cream-200/10 pb-5">
                                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-600/12 text-gold-300">
                                        <Icon name="wine" size={19} />
                                    </span>
                                    <span>
                                        <span className="block font-display text-xl text-cream-50">{p.title}</span>
                                        <span className="mt-1 block text-sm text-cream-500">{p.body}</span>
                                    </span>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={0.2} className="mt-10">
                            <a href="/book-a-chef" className="btn btn-gold">
                                Book a chef
                                <Icon name="arrow-right" size={16} />
                            </a>
                        </Reveal>
                    </div>

                    <div className="relative">
                        <div data-img-reveal className="overflow-hidden rounded-[1.75rem] border border-gold-700/25">
                            <Img src="/images/dish-filet.jpg" alt="Signature main course" ratio="5 / 6" fallbackLabel="Signature main" className="w-full" />
                        </div>
                        <div data-parallax="-0.06" className="absolute -bottom-8 -left-6 hidden w-52 overflow-hidden rounded-[1.25rem] border border-gold-700/30 shadow-2xl sm:block">
                            <Img src="/images/dish-mousse.jpg" alt="Dessert course" ratio="4 / 3" fallbackLabel="Dessert" className="w-full" />
                        </div>
                    </div>
                </div>
            </section>

            <Steps steps={steps} eyebrow="How it works" title="From first call to final course" />

            <section className="section-tight">
                <div className="shell flex justify-center">
                    <Ornament width={240} />
                </div>
            </section>

            <CtaBand cta={cta} image="/images/dish-salmon.jpg" />
        </Layout>
    );
}
