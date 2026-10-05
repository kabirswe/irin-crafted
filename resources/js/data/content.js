/**
 * Single source of truth for all site copy + imagery.
 *
 * The Laravel controllers return exactly this shape as Inertia props
 * (see app/Http/Controllers), so the React pages can render from either the
 * backend or this static model (standalone preview).
 */

export const brand = {
    name: 'Irin Crafted',
    tagline: 'Personal Chef Experiences',
    phone: '+1 (212) 845 2741',
    phoneHref: 'tel:+12128452741',
    email: 'hello@irincrafted.com',
    address: ['18 W 27th Street, New York', '- NY 10001 - USA'],
    hours: ['Mon | Fri: 9AM – 6PM', 'Sat: 10AM – 4PM'],
    socials: [
        { label: 'Instagram', href: '#', icon: 'instagram' },
        { label: 'Facebook', href: '#', icon: 'facebook' },
        { label: 'Pinterest', href: '#', icon: 'pinterest' },
        { label: 'Youtube', href: '#', icon: 'youtube' },
    ],
};

export const nav = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    {
        label: 'Services',
        href: '/services',
        children: [
            { label: 'All Services', href: '/services' },
            { label: 'Private Dining', href: '/private-dining' },
            { label: 'Weekly Meal Prep', href: '/weekly-meal-prep' },
            { label: 'Special Events', href: '/special-events' },
        ],
    },
    {
        label: 'Pages',
        href: '/menu-experience',
        children: [
            { label: 'Menu Experience', href: '/menu-experience' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Book a Chef', href: '/book-a-chef' },
        ],
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact-us' },
];

export const hero = {
    eyebrow: 'Luxury Personal Chef Experience',
    title: ['Elevated Dining,', 'Crafted Around You'],
    body:
        'Experience restaurant-quality cuisine in the comfort of your home with personalized menus, seasonal ingredients, and unforgettable culinary moments tailored to your lifestyle.',
    primary: { label: 'Book a private experience', href: '/book-a-chef' },
    secondary: { label: 'Explore our services', href: '/services' },
    trustedLabel: 'Trusted by clients in',
    ratingLabel: 'Happy clients',
    ratingValue: 800,
    ratingSuffix: '+',
    image: '/images/hero-chef.jpg',
    imageAlt: 'Private chef plating a fine dining dish in a luxury home kitchen',
    cities: ['New York', 'The Hamptons', 'Los Angeles', 'Miami', 'Aspen', 'Chicago'],
};

export const features = [
    {
        icon: 'menu-book',
        title: 'Custom Menus',
        body: 'Tailored to your tastes, dietary needs and lifestyle.',
    },
    {
        icon: 'mortar',
        title: 'Premium Ingredients',
        body: 'We use fresh, seasonal and high-quality ingredients.',
    },
    {
        icon: 'home-chef',
        title: 'In-Home Experience',
        body: 'Relax and enjoy as we prepare your kitchen.',
    },
    {
        icon: 'star',
        title: 'Impeccable Service',
        body: 'Professional, discreet and dedicated to every detail.',
    },
];

export const about = {
    eyebrow: 'About Us',
    title: 'Passion For Food. Commitment To You',
    body: [
        'We believe that every meal is an opportunity to create memorable moments. Our mission is to bring people together through exceptional cuisine and personalized service.',
        'Every dish is thoughtfully crafted, every detail is considered, and every experience is designed to leave a lasting impression.',
    ],
    cta: { label: 'Learn more about us', href: '/about-us' },
    stats: [
        { value: 20, suffix: '+', label: 'Years of Experience' },
        { value: 150, suffix: '+', label: 'Unique Menus' },
        { value: 800, suffix: '+', label: 'Happy Clients' },
    ],
    images: [
        { src: '/images/about-dish.jpg', alt: 'Seared beef tenderloin plated with truffle purée' },
        { src: '/images/about-chef-hands.jpg', alt: "Chef's hands garnishing a plate with micro herbs" },
    ],
};

export const services = [
    {
        slug: '/private-dining',
        icon: 'candle',
        title: 'Private Dining',
        href: '/private-dining',
        body: 'Exclusive in-home dining experiences crafted just for you and your guests.',
        short: 'Intimate and exclusive dinners prepared just for you and your guests.',
        image: '/images/service-private-dining.jpg',
    },
    {
        slug: '/weekly-meal-prep',
        icon: 'bowl',
        title: 'Weekly Meal Prep',
        href: '/weekly-meal-prep',
        body: 'Weekly or custom meal plans designed around your goals and preferences.',
        short: 'Healthy, personalized meals prepared weekly to save time and meet needs.',
        image: '/images/service-meal-prep.jpg',
    },
    {
        slug: '/special-events',
        icon: 'sparkle',
        title: 'Special Events',
        href: '/special-events',
        body: 'From birthdays to anniversaries, we create extraordinary culinary celebrations.',
        short: 'Custom menus for birthdays and special celebrations.',
        image: '/images/service-events.jpg',
    },
    {
        slug: '/corporate-dining',
        icon: 'briefcase',
        title: 'Corporate Dining',
        href: '/corporate-dining',
        body: 'Elevate your business gatherings with refined menus and seamless service.',
        short: 'Refined menus that impress clients, partners and teams.',
        image: '/images/service-corporate.jpg',
    },
    {
        slug: '/dietary-plans',
        icon: 'leaf',
        title: 'Wellness & Dietary Plans',
        href: '/dietary-plans',
        body: 'Specialized menus for vegan, keto and gluten-free needs without compromise.',
        short: 'Menus adapted to dietary restrictions and specific preferences.',
        image: '/images/service-wellness.jpg',
    },
    {
        slug: '/wine-pairing',
        icon: 'wine',
        title: 'Wine Pairing Experience',
        href: '/wine-pairing',
        body: 'Carefully selected pairings designed to complement every dish.',
        short: 'Curated pairings that heighten the entire dining experience.',
        image: '/images/service-wine.jpg',
    },
];

export const steps = [
    { number: '01', title: 'Book', body: 'Choose your date and tell us about your preferences.', icon: 'calendar' },
    { number: '02', title: 'Plan', body: 'We create a custom menu just for you.', icon: 'notebook' },
    { number: '03', title: 'Cook', body: 'We cook in your kitchen while you relax.', icon: 'pan' },
    { number: '04', title: 'Enjoy', body: 'Savor every bite and we handle the cleanup.', icon: 'glass' },
];

export const featuredMenus = [
    {
        name: 'Seared Filet Mignon',
        price: '$20',
        body: 'Truffle potato purée, roasted vegetables and red wine reduction.',
        image: '/images/dish-filet.jpg',
        tag: 'Signature',
    },
    {
        name: 'Burrata & Heirloom Tomatoes',
        price: '$9',
        body: 'Fresh basil, aged balsamic glaze and artisan olive oil.',
        image: '/images/dish-burrata.jpg',
        tag: 'Starter',
    },
    {
        name: 'Herb-Crusted Salmon',
        price: '$18',
        body: 'Seasonal greens, citrus beurre blanc and grilled asparagus.',
        image: '/images/dish-salmon.jpg',
        tag: 'Main',
    },
    {
        name: 'Dark Chocolate Mousse',
        price: '$12',
        body: 'Hazelnut crumble, vanilla cream and gold leaf finish.',
        image: '/images/dish-mousse.jpg',
        tag: 'Dessert',
    },
];

export const menuCourses = [
    {
        course: 'Amuse-Bouche',
        title: 'Seared Scallop',
        body: 'Cauliflower purée, brown butter, chive oil.',
        image: '/images/dish-scallop.jpg',
    },
    {
        course: 'First Course',
        title: 'Heirloom Tomato Salad',
        body: 'Burrata, basil emulsion, aged balsamic pearls.',
        image: '/images/dish-burrata.jpg',
    },
    {
        course: 'Main Course',
        title: 'Truffle Butter Filet Mignon',
        body: 'Roasted heritage vegetables, potato purée, red wine jus.',
        image: '/images/dish-filet.jpg',
    },
    {
        course: 'Dessert',
        title: 'Dark Chocolate Mousse',
        body: 'Hazelnut crumble, vanilla ice cream, gold leaf.',
        image: '/images/dish-mousse.jpg',
    },
];

export const menuStyles = [
    {
        title: 'Classic Fine Dining',
        body: 'Elegant courses inspired by timeless restaurant techniques.',
        image: '/images/dish-filet.jpg',
    },
    {
        title: 'Mediterranean Table',
        body: 'Fresh, vibrant flavors with seasonal vegetables, seafood and herbs.',
        image: '/images/dish-salmon.jpg',
    },
    {
        title: 'Celebration Menu',
        body: 'A festive dining experience designed for special occasions.',
        image: '/images/service-events.jpg',
    },
];

export const pairings = [
    { title: 'Champagne & Canapés', body: 'A bright, celebratory opening that lifts the palate and sets the tone.' },
    { title: 'Burgundy & Beef', body: 'Earthy red fruit and silky tannins balanced against rich, slow-cooked cuts.' },
    { title: 'Sauternes & Dessert', body: 'Honeyed sweetness that mirrors caramel, vanilla and dark chocolate.' },
];

export const testimonials = [
    {
        quote:
            'Our anniversary dinner was remarkable, akin to a Michelin-star restaurant, with exceptional service and flavors.',
        name: 'Olivia T.',
        role: 'Special Occasion Dinner',
        avatar: '/images/avatar-olivia.jpg',
        rating: 5,
    },
    {
        quote:
            'Every detail felt thoughtfully curated. From the presentation to the flavors, the entire evening was elegant and intimate.',
        name: 'Jessica M.',
        role: 'Private Dinner',
        avatar: '/images/avatar-jessica.jpg',
        rating: 5,
    },
    {
        quote:
            'Professional, discreet and incredibly talented. Irin created a dining experience that impressed every guest at our event.',
        name: 'Michael A.',
        role: 'Private Event Experience',
        avatar: '/images/avatar-michael.jpg',
        rating: 5,
    },
    {
        quote:
            'The meal prep transformed our routine with quality, beautifully prepared meals and an effortless experience.',
        name: 'Daniel R.',
        role: 'Weekly Meal Prep',
        avatar: '/images/avatar-daniel.jpg',
        rating: 5,
    },
    {
        quote:
            'From the first tasting to the final course, everything was considered. Our guests still talk about that evening.',
        name: 'Sofia L.',
        role: 'Corporate Dinner',
        avatar: '/images/avatar-sofia.jpg',
        rating: 5,
    },
];

export const galleryCategories = ['All', 'Plating', 'Events', 'Craft', 'Details'];

export const gallery = [
    { src: '/images/dish-scallop.jpg', title: 'Culinary Art', category: 'Plating', span: 'tall' },
    { src: '/images/service-events.jpg', title: 'Special Events', category: 'Events', span: 'wide' },
    { src: '/images/about-chef-hands.jpg', title: "Chef's Craft", category: 'Craft', span: 'normal' },
    { src: '/images/service-wine.jpg', title: 'Cellar Pairings', category: 'Details', span: 'normal' },
    { src: '/images/dish-filet.jpg', title: 'Signature Main', category: 'Plating', span: 'wide' },
    { src: '/images/service-private-dining.jpg', title: 'Candlelit Table', category: 'Events', span: 'tall' },
    { src: '/images/dish-mousse.jpg', title: 'Sweet Finale', category: 'Dessert', span: 'normal' },
    { src: '/images/service-meal-prep.jpg', title: 'Weekly Prep', category: 'Plating', span: 'normal' },
    { src: '/images/service-corporate.jpg', title: 'Boardroom Service', category: 'Events', span: 'normal' },
];

export const faqGroups = [
    {
        eyebrow: 'FAQ',
        title: 'Frequently Asked Questions',
        image: '/images/dish-scallop.jpg',
        items: [
            {
                q: 'How Far In Advance Should I Book?',
                a: 'We recommend booking at least 2–4 weeks in advance to secure your preferred date. For special occasions and holiday periods, earlier reservations are encouraged.',
            },
            {
                q: 'Can Dietary Restrictions Be Accommodated?',
                a: 'Absolutely. Menus can be tailored to accommodate allergies, dietary restrictions and personal preferences, including vegetarian, vegan, gluten-free and other specialized requirements.',
            },
            {
                q: 'Is Cleanup Included?',
                a: 'Yes. Your chef leaves the kitchen exactly as it was found — cookware washed, surfaces cleared and any waste removed before departure.',
            },
            {
                q: 'Do You Provide Ingredients?',
                a: 'Yes. We source and provide all ingredients required for your selected menu, carefully choosing premium products to ensure exceptional quality and flavor.',
            },
            {
                q: 'What Areas Do You Serve?',
                a: 'We provide private chef services throughout the local region and selected surrounding areas. Contact us to confirm availability for your location.',
            },
        ],
    },
    {
        eyebrow: 'Menu & Dining',
        title: 'Everything You Need To Know',
        image: '/images/dish-salmon.jpg',
        items: [
            {
                q: 'How Does The Private Chef Experience Work?',
                a: 'You share your date, guest count and preferences, we design a bespoke menu, then your chef arrives with ingredients and prepares every course in your kitchen.',
            },
            {
                q: 'Can you accommodate dietary restrictions?',
                a: 'Always. Gluten-free, dairy-free, vegetarian, vegan, keto, paleo and nut-free menus are all prepared with the same level of craft.',
            },
            {
                q: 'Do You Offer Vegetarian Or Vegan Menus?',
                a: 'Yes — seasonal vegetable tasting menus are among our most requested experiences, built around market produce and plant-based technique.',
            },
            {
                q: 'Do You Provide Wine Pairing?',
                a: 'We offer guided pairings for each course, from champagne openers to dessert wines. You may supply your own cellar or we can source bottles for you.',
            },
            {
                q: 'Can You Serve Large Events?',
                a: 'We regularly serve dinners from two to sixty guests, with additional trained staff added for larger celebrations.',
            },
        ],
    },
    {
        eyebrow: 'Booking & Service',
        title: 'Simple, Secure And Personalized',
        image: '/images/service-events.jpg',
        items: [
            {
                q: 'What Information Do I Need To Provide?',
                a: 'Your date, guest count, service type, any dietary requirements and a rough idea of the atmosphere you would like to create.',
            },
            {
                q: 'Is A Deposit Required?',
                a: 'A 30% deposit confirms your date, with the balance due on the evening of your experience. Everything is invoiced transparently.',
            },
            {
                q: 'Can I Reschedule My Booking?',
                a: 'Yes. Reschedule free of charge up to 7 days before your date, subject to availability.',
            },
            {
                q: 'What Happens After I Submit A Booking Request?',
                a: 'You will receive a reply within 24 hours with a proposed menu, a quote and next steps. Nothing is charged until you confirm.',
            },
        ],
    },
];

export const plans = [
    {
        name: 'Essential Plan',
        body: 'Balanced meals for busy weekdays.',
        meals: '5 meals per week',
        price: '$110',
        suffix: '/ week',
        featured: false,
    },
    {
        name: 'Wellness Plan',
        body: 'Nutritious meals focused on health, energy and clean ingredients.',
        meals: '5 meals per week',
        price: '$125',
        suffix: '/ week',
        featured: true,
    },
    {
        name: 'Family Plan',
        body: 'Fresh, flavorful meals designed for the whole household.',
        meals: '10 meals per week',
        price: '$200',
        suffix: '/ week',
        featured: false,
    },
];

export const bookingOptions = {
    guests: ['2 Guests', '4 Guests', '6 Guests', '8 Guests', '10 Guests', '12+ Guests'],
    services: [
        'Private Dining',
        'Weekly Meal Prep',
        'Special Events',
        'Corporate Dining',
        'Wellness & Dietary Plans',
        'Wine Pairing Experience',
    ],
    diets: [
        'No Restrictions',
        'Vegetarian',
        'Vegan',
        'Gluten-Free',
        'Dairy-Free',
        'Keto',
        'Paleo',
        'Nut-Free',
        'Custom Requirements',
    ],
};

export const bookingPerks = [
    'Personalized consultation',
    'Custom menu creation',
    'Premium ingredients',
    'Full service experience',
    'Cleanup included',
];

export const posts = [
    {
        title: 'The art of the seasonal tasting menu',
        excerpt: 'How a market walk shapes the seven courses that end up on your table.',
        category: 'Menus',
        date: 'March 12, 2026',
        readTime: '5 min read',
        image: '/images/dish-scallop.jpg',
    },
    {
        title: 'Pairing wine with a private dinner',
        excerpt: 'A practical guide to building a flight that flatters every course.',
        category: 'Wine',
        date: 'February 28, 2026',
        readTime: '6 min read',
        image: '/images/service-wine.jpg',
    },
    {
        title: 'Setting a table that feels like an occasion',
        excerpt: 'Linen, candlelight and the small details guests always remember.',
        category: 'Entertaining',
        date: 'February 14, 2026',
        readTime: '4 min read',
        image: '/images/service-private-dining.jpg',
    },
    {
        title: 'Meal prep that actually lasts the week',
        excerpt: 'Chef techniques for keeping texture, colour and flavour intact.',
        category: 'Meal Prep',
        date: 'January 30, 2026',
        readTime: '5 min read',
        image: '/images/service-meal-prep.jpg',
    },
    {
        title: 'Inside a celebration for forty guests',
        excerpt: 'A look behind the scenes of a milestone anniversary dinner.',
        category: 'Events',
        date: 'January 18, 2026',
        readTime: '7 min read',
        image: '/images/service-events.jpg',
    },
    {
        title: 'The craft of plating at home',
        excerpt: 'Simple principles that turn a home kitchen into a pass.',
        category: 'Technique',
        date: 'January 6, 2026',
        readTime: '4 min read',
        image: '/images/about-chef-hands.jpg',
    },
];

export const cta = {
    eyebrow: 'Reserve Your Date',
    title: 'Ready To Enjoy An Unforgettable Culinary Experience?',
    body: 'Tell us about your occasion and we will craft a menu around it. Most evenings are confirmed within 24 hours.',
    primary: { label: 'Book your chef', href: '/book-a-chef' },
    secondary: { label: 'Contact us', href: '/contact-us' },
};

export const ctaAlt = {
    eyebrow: 'Let’s Begin',
    title: 'Ready To Create Something Extraordinary?',
    body: 'Share your date and preferences — we will take care of every detail from menu to cleanup.',
    primary: { label: 'Book your experience', href: '/book-a-chef' },
    secondary: { label: 'View the menu', href: '/menu-experience' },
};

export const footer = {
    blurb:
        'Private chef experiences, seasonal menus and quietly impeccable service for gatherings of every size.',
    columns: [
        {
            title: 'Explore',
            links: [
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about-us' },
                { label: 'Services', href: '/services' },
                { label: 'Menu Experience', href: '/menu-experience' },
                { label: 'Gallery', href: '/gallery' },
            ],
        },
        {
            title: 'Services',
            links: [
                { label: 'Private Dining', href: '/private-dining' },
                { label: 'Weekly Meal Prep', href: '/weekly-meal-prep' },
                { label: 'Special Events', href: '/special-events' },
                { label: 'Corporate Dining', href: '/services' },
                { label: 'Wine Pairing', href: '/menu-experience' },
            ],
        },
        {
            title: 'Support',
            links: [
                { label: 'Book a Chef', href: '/book-a-chef' },
                { label: 'Contact Us', href: '/contact-us' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Blog', href: '/blog' },
            ],
        },
    ],
    legal: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
    ],
};

export const pageMeta = {
    '/': {
        title: 'Elevated Dining, Crafted Around You',
        eyebrow: 'Luxury Personal Chef Experience',
        body: 'Private chef experiences, seasonal menus and quietly impeccable service in the comfort of your home.',
    },
    '/about-us': {
        title: 'About Us',
        eyebrow: 'Our Story',
        body: 'Crafted with passion, precision and a deep commitment to unforgettable culinary experiences.',
    },
    '/services': {
        title: 'Services',
        eyebrow: 'What We Offer',
        body: 'Personal chef experiences crafted for private dinners, weekly routines and unforgettable celebrations.',
    },
    '/private-dining': {
        title: 'Private Dining',
        eyebrow: 'The Experience',
        body: 'An intimate fine dining experience designed around your taste, occasion and lifestyle.',
    },
    '/weekly-meal-prep': {
        title: 'Weekly Meal Prep',
        eyebrow: 'Weekly Meal Prep',
        body: 'Fresh, personalized meals prepared to bring ease, balance and flavor to your weekly routine.',
    },
    '/special-events': {
        title: 'Special Events',
        eyebrow: 'Tailored To You',
        body: 'Refined culinary experiences for celebrations, gatherings and meaningful moments.',
    },
    '/corporate-dining': {
        title: 'Corporate Dining',
        eyebrow: 'For Business',
        body: 'Refined menus and seamless service that impress clients, partners and teams.',
    },
    '/dietary-plans': {
        title: 'Wellness & Dietary Plans',
        eyebrow: 'Wellness First',
        body: 'Specialized menus for vegan, keto, gluten-free and other dietary needs — without compromising on flavour.',
    },
    '/wine-pairing': {
        title: 'Wine Pairing Experience',
        eyebrow: 'Cellar & Table',
        body: 'Carefully selected pairings designed to complement every dish and elevate the evening.',
    },
    '/menu-experience': {
        title: 'Menu Experience',
        eyebrow: 'Signature Menu',
        body: 'A curated selection of seasonal dishes, signature flavors and refined culinary pairings.',
    },
    '/gallery': {
        title: 'Gallery',
        eyebrow: 'Featured Moments',
        body: 'A visual collection of elegant dishes, intimate moments and unforgettable dining experiences.',
    },
    '/faq': {
        title: 'FAQ',
        eyebrow: 'Good To Know',
        body: 'Everything you need to know before booking your personal chef experience.',
    },
    '/book-a-chef': {
        title: 'Book a Chef',
        eyebrow: 'Booking Request',
        body: 'Reserve a private dining experience tailored to your occasion, guests and preferences.',
    },
    '/contact-us': {
        title: 'Contact Us',
        eyebrow: 'Get In Touch',
        body: 'Let’s start planning a personalized culinary experience crafted around you.',
    },
    '/blog': {
        title: 'Blog',
        eyebrow: 'Journal',
        body: 'Notes from the kitchen — menus, techniques and the craft of hosting well.',
    },
};

export const content = {
    brand,
    nav,
    hero,
    features,
    about,
    services,
    steps,
    featuredMenus,
    menuCourses,
    menuStyles,
    pairings,
    testimonials,
    gallery,
    galleryCategories,
    faqGroups,
    plans,
    bookingOptions,
    bookingPerks,
    posts,
    cta,
    ctaAlt,
    footer,
    pageMeta,
};

export default content;
