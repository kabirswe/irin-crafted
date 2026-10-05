import Layout from '../components/layout/Layout';
import PageHero from '../components/layout/PageHero';
import FaqSection from '../components/sections/FaqSection';
import CtaBand from '../components/sections/CtaBand';
import SplitFeature from '../components/sections/SplitFeature';
import { content } from '../data/content';

export default function Faq() {
    const { faqGroups, pageMeta, cta } = content;

    return (
        <Layout content={content} path="/faq">
            <PageHero meta={pageMeta['/faq']} breadcrumb={[{ label: 'FAQ' }]} image="/images/dish-salmon.jpg" />

            <FaqSection group={faqGroups[0]} layout="split" />

            <section className="section-tight bg-ink-950/60">
                <div className="shell">
                    <FaqSection group={faqGroups[1]} layout="stacked" className="!py-0" />
                </div>
            </section>

            <SplitFeature
                eyebrow="Personalized around your occasion"
                title="We’re here to accommodate every detail that matters"
                body={[
                    'Allergies, cultural requirements, timing, seating, service style — tell us once and it is handled quietly and completely.',
                ]}
                image="/images/service-private-dining.jpg"
                imageAlt="Private dining table"
                badges
                bullets={[
                    'Allergen protocols documented per guest',
                    'Menus reviewed and approved before the day',
                    'Flexible service styles: plated, family or grazing',
                    'Timings built around your schedule',
                ]}
                cta={{ label: 'Talk to us', href: '/contact-us' }}
            />

            <section className="section-tight">
                <div className="shell">
                    <FaqSection group={faqGroups[2]} layout="stacked" className="!py-0" />
                </div>
            </section>

            <CtaBand cta={cta} image="/images/service-wine.jpg" />
        </Layout>
    );
}
