/**
 * Standalone preview shell: maps URLs to the same page components Inertia
 * renders in Laravel, using the static content model.
 */
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Services from '../pages/Services';
import PrivateDining from '../pages/PrivateDining';
import WeeklyMealPrep from '../pages/WeeklyMealPrep';
import SpecialEvents from '../pages/SpecialEvents';
import CorporateDining from '../pages/CorporateDining';
import DietaryPlans from '../pages/DietaryPlans';
import WinePairing from '../pages/WinePairing';
import MenuExperience from '../pages/MenuExperience';
import Gallery from '../pages/Gallery';
import Faq from '../pages/Faq';
import BookAChef from '../pages/BookAChef';
import ContactUs from '../pages/ContactUs';
import Blog from '../pages/Blog';
import NotFound from '../pages/NotFound';
import { RouterProvider, useRouter } from '../lib/router';

const ROUTES = {
    '/': Home,
    '/about-us': AboutUs,
    '/services': Services,
    '/private-dining': PrivateDining,
    '/weekly-meal-prep': WeeklyMealPrep,
    '/special-events': SpecialEvents,
    '/corporate-dining': CorporateDining,
    '/dietary-plans': DietaryPlans,
    '/wine-pairing': WinePairing,
    '/menu-experience': MenuExperience,
    '/gallery': Gallery,
    '/faq': Faq,
    '/book-a-chef': BookAChef,
    '/contact-us': ContactUs,
    '/blog': Blog,
};

function CurrentPage() {
    const { path } = useRouter();
    const Page = ROUTES[path] || NotFound;
    return <Page key={path} />;
}

export function PreviewApp() {
    return (
        <RouterProvider>
            <CurrentPage />
        </RouterProvider>
    );
}

export default PreviewApp;
