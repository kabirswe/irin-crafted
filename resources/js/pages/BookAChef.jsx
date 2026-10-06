import Layout from '../components/layout/Layout';
import PageHero from '../components/layout/PageHero';
import BookingForm from '../components/sections/BookingForm';
import Steps from '../components/sections/Steps';
import FaqSection from '../components/sections/FaqSection';
import CtaBand from '../components/sections/CtaBand';
import { content } from '../data/content';

const bookingSteps = [
    { number: '01', title: 'Book', body: 'Choose your date and tell us about your preferences.', icon: 'calendar' },
    { number: '02', title: 'Consult', body: 'We discuss your vision and culinary needs.', icon: 'notebook' },
    { number: '03', title: 'Customize', body: 'A menu is created specifically for your occasion.', icon: 'utensils' },
    { number: '04', title: 'Enjoy', body: 'Your chef arrives and delivers an unforgettable experience.', icon: 'glass' },
];

export default function BookAChef() {
    const { bookingOptions, bookingPerks, brand, pageMeta, faqGroups, cta } = content;

    return (
        <Layout content={content} path="/book-a-chef">
            <PageHero meta={pageMeta['/book-a-chef']} breadcrumb={[{ label: 'Book a Chef' }]} image="/images/service-private-dining.jpg" />

            <BookingForm options={bookingOptions} perks={bookingPerks} brand={brand} />

            <Steps
                steps={bookingSteps}
                eyebrow="How it works"
                title="A seamless journey from booking to dining"
                body="Four quiet steps between your first message and the first course."
            />

            <FaqSection group={faqGroups[0]} layout="stacked" className="bg-ink-950/60" />

            <CtaBand cta={cta} image="/images/service-events.jpg" />
        </Layout>
    );
}
