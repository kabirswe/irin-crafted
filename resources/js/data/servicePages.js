/**
 * Per service page configuration (analysis of the reference kit's service
 * sub-pages folded into reusable blocks).
 */
export const servicePages = {
    '/private-dining': {
        intro: {
            eyebrow: 'The experience',
            title: 'Fine Dining, Reimagined At Home',
            body: [
                'From an intimate dinner for two to a celebration with friends and family, we create a bespoke culinary experience that reflects your tastes, preferences and the occasion.',
                'Your chef arrives with every ingredient, prepares each course in your kitchen and leaves the space exactly as it was found.',
            ],
            bullets: [
                'Menus tailored to your preferences',
                'Premium and locally sourced ingredients',
                'Elegant plating and professional service',
                'Complete clean up included',
            ],
            image: '/images/service-private-dining.jpg',
            badge: { icon: 'candle', title: '2 – 20 guests', body: 'intimate settings' },
            cta: { label: 'Reserve your evening', href: '/book-a-chef' },
        },
        highlights: [
            { icon: 'notebook', title: 'Bespoke Menus', body: 'Every menu is thoughtfully crafted just for you.' },
            { icon: 'wine', title: 'Impeccable Service', body: 'Professional, discreet service from start to finish.' },
            { icon: 'sparkle', title: 'Unforgettable Moments', body: 'We create the perfect atmosphere for lasting memories.' },
        ],
        menuTitle: 'A preview of what we create',
        menuLayout: 'list',
        steps: { eyebrow: 'How it works', title: 'Simple, Personal & Seamless' },
        cta: {
            eyebrow: 'Reserve your date',
            title: 'Let’s Create Your Perfect Evening',
            body: 'Share your date and preferences — we will take care of every detail from menu to cleanup.',
            primary: { label: 'Book your experience', href: '/book-a-chef' },
            secondary: { label: 'See the menu', href: '/menu-experience' },
        },
    },

    '/weekly-meal-prep': {
        intro: {
            eyebrow: 'Weekly meal prep',
            title: 'Healthy Meals, Beautifully Prepared For Your Week',
            body: [
                'Enjoy chef-crafted meals designed around your lifestyle, dietary needs and weekly schedule. Each plan is prepared with premium ingredients, balanced portions and refined flavors.',
            ],
            bullets: [
                'Custom weekly menus designed with you',
                'Fresh, seasonal ingredients sourced weekly',
                'Balanced portions and clean nutrition',
                'Ready-to-enjoy meals, labelled and stored',
            ],
            image: '/images/service-meal-prep.jpg',
            badge: { icon: 'calendar', title: 'Weekly plans', body: '5 to 10 meals' },
            cta: { label: 'Start your plan', href: '/book-a-chef' },
        },
        highlights: [
            { icon: 'notebook', title: 'Custom weekly menus', body: 'Rotating menus so no week ever repeats.' },
            { icon: 'leaf', title: 'Fresh ingredients', body: 'Sourced the morning of your prep day.' },
            { icon: 'bowl', title: 'Balanced portions', body: 'Macro-aware portions built around your goals.' },
            { icon: 'check', title: 'Ready-to-enjoy meals', body: 'Labelled, chilled and ready when you are.' },
        ],
        plans: true,
        steps: { eyebrow: 'Sample & effortless', title: 'Your Week, Planned With Care' },
        cta: {
            eyebrow: 'Effortless weeks',
            title: 'Make Every Week Taste Effortless',
            body: 'Book a personalized meal prep plan designed around your lifestyle.',
            primary: { label: 'Book your meals', href: '/book-a-chef' },
            secondary: { label: 'See our services', href: '/services' },
        },
    },

    '/special-events': {
        intro: {
            eyebrow: 'Tailored to you',
            title: 'Your Event, Your Vision. Our Culinary Art',
            body: [
                'Every detail is thoughtfully curated around your preferences, theme and guest experience to deliver a seamless and personalized celebration.',
                'From milestone birthdays to anniversaries and intimate weddings, we scale our team to the occasion.',
            ],
            bullets: [
                'Custom menus designed around your occasion',
                'Premium ingredients sourced for exceptional flavor',
                'Professional service with attention to every detail',
                'Cleanup included so you can simply enjoy',
            ],
            image: '/images/service-events.jpg',
            badge: { icon: 'sparkle', title: 'Up to 60 guests', body: 'celebrations & milestones' },
            cta: { label: 'Plan your event', href: '/book-a-chef' },
        },
        highlights: [
            { icon: 'notebook', title: 'Bespoke Menus', body: 'Every menu is thoughtfully crafted just for you.' },
            { icon: 'wine', title: 'Impeccable Service', body: 'Professional, discreet service from start to finish.' },
            { icon: 'sparkle', title: 'Unforgettable Moments', body: 'We create the perfect atmosphere for lasting memories.' },
        ],
        menuTitle: 'Signature dishes for celebrations',
        menuLayout: 'grid',
        steps: { eyebrow: 'How it works', title: 'Simple, Personal & Seamless' },
        cta: {
            eyebrow: 'Let’s begin',
            title: 'Ready To Plan Your Special Event?',
            body: 'Tell us about your occasion and we will take care of the rest.',
            primary: { label: 'Plan your event', href: '/book-a-chef' },
            secondary: { label: 'Talk to us', href: '/contact-us' },
        },
    },

    '/corporate-dining': {
        intro: {
            eyebrow: 'For business',
            title: 'Dining That Carries The Conversation',
            body: [
                'Elevate your business gatherings with refined menus and seamless service that impresses every time — from board lunches to client dinners and team celebrations.',
                'We work around your agenda: discreet timing, plated courses on cue and a kitchen that leaves no trace.',
            ],
            bullets: [
                'Menus built for efficient, elegant service',
                'Dietary and cultural requirements handled',
                'On-site chefs, service and full cleanup',
                'Invoicing for corporate accounts',
            ],
            image: '/images/service-corporate.jpg',
            badge: { icon: 'briefcase', title: 'Corporate accounts', body: 'invoiced & receipts' },
            cta: { label: 'Request a proposal', href: '/book-a-chef' },
        },
        highlights: [
            { icon: 'clock', title: 'On-time, every time', body: 'Courses served to your schedule, not ours.' },
            { icon: 'users', title: 'Teams of any size', body: 'Additional staff added for larger boards.' },
            { icon: 'award', title: 'Memorable impressions', body: 'Clients remember how the evening felt.' },
        ],
        menuTitle: 'Corporate menus we love',
        menuLayout: 'grid',
        steps: { eyebrow: 'How it works', title: 'A Simple, Seamless Process' },
        cta: {
            eyebrow: 'Let’s begin',
            title: 'Ready To Bring The Restaurant To The Boardroom?',
            body: 'Share your date and headcount and we will send a costed proposal within 24 hours.',
            primary: { label: 'Request a proposal', href: '/book-a-chef' },
            secondary: { label: 'Contact us', href: '/contact-us' },
        },
    },

    '/dietary-plans': {
        intro: {
            eyebrow: 'Wellness first',
            title: 'Flavour Without Compromise',
            body: [
                'Specialized menus for vegan, keto, gluten-free and other dietary needs — designed by a fine dining chef so that nothing feels like a compromise.',
                'We map every restriction, then build a menu that celebrates ingredients rather than substituting them.',
            ],
            bullets: [
                'Vegan, vegetarian and plant-forward menus',
                'Gluten-free, dairy-free and nut-free kitchens',
                'Keto, paleo and macro-tracked plans',
                'Allergy protocols documented and respected',
            ],
            image: '/images/service-wellness.jpg',
            badge: { icon: 'leaf', title: '9 diet types', body: 'accommodated with ease' },
            cta: { label: 'Discuss your needs', href: '/book-a-chef' },
        },
        highlights: [
            { icon: 'leaf', title: 'Plant forward', body: 'Vegetable cookery that stands as the main event.' },
            { icon: 'check', title: 'Strict protocols', body: 'Separate prep to protect against cross-contact.' },
            { icon: 'fire', title: 'Full flavoured', body: 'Technique-driven flavour, never a downgrade.' },
        ],
        menuTitle: 'Wellness dishes from our kitchen',
        menuLayout: 'list',
        steps: { eyebrow: 'How it works', title: 'Personal From First Contact' },
        cta: {
            eyebrow: 'Wellness first',
            title: 'Let’s Design A Menu Around Your Body’s Needs',
            body: 'Tell us your restrictions and goals — we will reply with a menu that proves nothing is missing.',
            primary: { label: 'Book a consultation', href: '/book-a-chef' },
            secondary: { label: 'Read our FAQ', href: '/faq' },
        },
    },

    '/wine-pairing': {
        intro: {
            eyebrow: 'Cellar & table',
            title: 'Every Course, Thoughtfully Paired',
            body: [
                'Carefully selected wine pairings designed to complement every dish and elevate the entire evening — poured and introduced at the table.',
            ],
            bullets: [
                'Guided pairings for each course',
                'Cellar consultation before your date',
                'Bring your own bottles or let us source',
                'Zero-alcohol pairings available',
            ],
            image: '/images/service-wine.jpg',
            badge: { icon: 'wine', title: 'By the glass', body: 'guided courses' },
            cta: { label: 'Book a pairing', href: '/book-a-chef' },
        },
        highlights: [
            { icon: 'wine', title: 'Champagne & canapés', body: 'A bright, celebratory opening for the palate.' },
            { icon: 'glass', title: 'Burgundy & beef', body: 'Earthy red fruit against rich, slow-cooked cuts.' },
            { icon: 'sparkle', title: 'Sauternes & dessert', body: 'Honeyed sweetness that mirrors caramel.' },
        ],
        steps: { eyebrow: 'How it works', title: 'From Cellar To Table' },
        cta: {
            eyebrow: 'Cellar & table',
            title: 'Ready To Pair A Bottle With Every Memory?',
            body: 'Tell us what you love to drink and we will build the flight around it.',
            primary: { label: 'Book a pairing', href: '/book-a-chef' },
            secondary: { label: 'View the menu', href: '/menu-experience' },
        },
    },
};

export default servicePages;
