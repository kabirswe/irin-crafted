import Layout from '../components/layout/Layout';
import PageHero from '../components/layout/PageHero';
import GalleryGrid from '../components/sections/GalleryGrid';
import CtaBand from '../components/sections/CtaBand';
import Features from '../components/sections/Features';
import { content } from '../data/content';

const galleryFeatures = [
    { icon: 'candle', title: 'Culinary Art', body: 'Refined dishes crafted with the finest ingredients and a passion for perfection.' },
    { icon: 'sparkle', title: 'Special Events', body: 'Celebrations brought to life with impeccable service and exquisite food.' },
    { icon: 'chef-hat', title: 'Chef’s Craft', body: 'Behind-the-scenes moments where creativity meets technique.' },
];

export default function Gallery() {
    const { gallery, galleryCategories, pageMeta, cta } = content;

    return (
        <Layout content={content} path="/gallery">
            <PageHero meta={pageMeta['/gallery']} breadcrumb={[{ label: 'Gallery' }]} image="/images/dish-scallop.jpg" />

            <GalleryGrid
                items={gallery}
                categories={galleryCategories}
                eyebrow="Explore the experience"
                title="Every detail tells a story"
                body="From intimate dinners to grand celebrations, every detail is thoughtfully crafted to create memories that last a lifetime."
            />

            <section className="section-tight bg-ink-950/60">
                <div className="shell">
                    <Features features={galleryFeatures} columns={3} />
                </div>
            </section>

            <CtaBand cta={cta} image="/images/service-events.jpg" />
        </Layout>
    );
}
