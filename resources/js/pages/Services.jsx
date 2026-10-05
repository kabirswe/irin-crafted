import Layout from '../components/layout/Layout';
import PageHero from '../components/layout/PageHero';
import ServicesGrid from '../components/sections/ServicesGrid';
import Steps from '../components/sections/Steps';
import Testimonials from '../components/sections/Testimonials';
import CtaBand from '../components/sections/CtaBand';
import SplitFeature from '../components/sections/SplitFeature';
import PlansGrid from '../components/sections/PlansGrid';
import { content } from '../data/content';

export default function Services() {
    const { services, pageMeta, steps, testimonials, cta, plans } = content;

    return (
        <Layout content={content} path="/services">
            <PageHero meta={pageMeta['/services']} breadcrumb={[{ label: 'Services' }]} image="/images/service-events.jpg" />

            <ServicesGrid
                services={services}
                variant="cards"
                showHeader
                eyebrow="What we offer"
                title="Services tailored to every occasion"
                body="Every experience is fully customized, from the menu to the final detail, to create moments that are unique, delicious and unforgettable."
            />

            <SplitFeature
                eyebrow="Fully bespoke"
                title="One chef, one kitchen, one menu made for you"
                body={[
                    'No two events repeat. We begin with a conversation, then design a menu around the season, your guests and the way you like to host.',
                    'From a tasting for two to a celebration for sixty, the standard never moves.',
                ]}
                bullets={[
                    'Consultation and menu proposal before you commit',
                    'Ingredients sourced locally wherever possible',
                    'Wine and zero-alcohol pairings available',
                    'Complete service and cleanup included',
                ]}
                image="/images/about-chef-hands.jpg"
                imageAlt="Chef plating a course"
                badge={{ icon: 'utensils', title: 'Four to seven', body: 'courses per menu' }}
                note="Travel beyond the city? We regularly cook in the Hamptons, Aspen and Miami."
            />

            <PlansGrid
                plans={plans}
                eyebrow="Meal prep plans"
                title="Weekly plans for every lifestyle"
                note="All plans are fully customizable to your preferences and dietary needs."
            />

            <Steps steps={steps} eyebrow="How it works" title="Simple, personal & seamless" />

            <Testimonials
                items={testimonials}
                variant="grid"
                eyebrow="What our clients say"
                title="Experiences that speak for themselves"
            />

            <CtaBand cta={cta} image="/images/service-private-dining.jpg" />
        </Layout>
    );
}
