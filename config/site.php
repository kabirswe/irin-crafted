<?php

/**
 * Site level content shared with every Inertia page.
 * Mirrors resources/js/data/content.js so the backend and the static
 * preview stay in sync.
 */
return [
    'brand' => [
        'name' => 'Irin Crafted',
        'tagline' => 'Personal Chef Experiences',
        'phone' => '+1 (212) 845 2741',
        'phone_href' => 'tel:+12128452741',
        'email' => 'hello@irincrafted.com',
        'address' => ['18 W 27th Street, New York', '- NY 10001 - USA'],
        'hours' => ['Mon | Fri: 9AM – 6PM', 'Sat: 10AM – 4PM'],
    ],

    'nav' => [
        ['label' => 'Home', 'href' => '/'],
        ['label' => 'About Us', 'href' => '/about-us'],
        [
            'label' => 'Services',
            'href' => '/services',
            'children' => [
                ['label' => 'All Services', 'href' => '/services'],
                ['label' => 'Private Dining', 'href' => '/private-dining'],
                ['label' => 'Weekly Meal Prep', 'href' => '/weekly-meal-prep'],
                ['label' => 'Special Events', 'href' => '/special-events'],
            ],
        ],
        [
            'label' => 'Pages',
            'href' => '/menu-experience',
            'children' => [
                ['label' => 'Menu Experience', 'href' => '/menu-experience'],
                ['label' => 'Gallery', 'href' => '/gallery'],
                ['label' => 'FAQ', 'href' => '/faq'],
                ['label' => 'Book a Chef', 'href' => '/book-a-chef'],
            ],
        ],
        ['label' => 'Blog', 'href' => '/blog'],
        ['label' => 'Contact', 'href' => '/contact-us'],
    ],

    'footer' => [
        'blurb' => 'Private chef experiences, seasonal menus and quietly impeccable service for gatherings of every size.',
        'columns' => [
            [
                'title' => 'Explore',
                'links' => [
                    ['label' => 'Home', 'href' => '/'],
                    ['label' => 'About Us', 'href' => '/about-us'],
                    ['label' => 'Services', 'href' => '/services'],
                    ['label' => 'Menu Experience', 'href' => '/menu-experience'],
                    ['label' => 'Gallery', 'href' => '/gallery'],
                ],
            ],
            [
                'title' => 'Services',
                'links' => [
                    ['label' => 'Private Dining', 'href' => '/private-dining'],
                    ['label' => 'Weekly Meal Prep', 'href' => '/weekly-meal-prep'],
                    ['label' => 'Special Events', 'href' => '/special-events'],
                    ['label' => 'Corporate Dining', 'href' => '/corporate-dining'],
                    ['label' => 'Wine Pairing', 'href' => '/wine-pairing'],
                ],
            ],
            [
                'title' => 'Support',
                'links' => [
                    ['label' => 'Book a Chef', 'href' => '/book-a-chef'],
                    ['label' => 'Contact Us', 'href' => '/contact-us'],
                    ['label' => 'FAQ', 'href' => '/faq'],
                    ['label' => 'Blog', 'href' => '/blog'],
                ],
            ],
        ],
    ],

    'page_meta' => [
        '/' => ['title' => 'Elevated Dining, Crafted Around You', 'eyebrow' => 'Luxury Personal Chef Experience', 'body' => 'Private chef experiences, seasonal menus and quietly impeccable service in the comfort of your home.'],
        '/about-us' => ['title' => 'About Us', 'eyebrow' => 'Our Story', 'body' => 'Crafted with passion, precision and a deep commitment to unforgettable culinary experiences.'],
        '/services' => ['title' => 'Services', 'eyebrow' => 'What We Offer', 'body' => 'Personal chef experiences crafted for private dinners, weekly routines and unforgettable celebrations.'],
        '/private-dining' => ['title' => 'Private Dining', 'eyebrow' => 'The Experience', 'body' => 'An intimate fine dining experience designed around your taste, occasion and lifestyle.'],
        '/weekly-meal-prep' => ['title' => 'Weekly Meal Prep', 'eyebrow' => 'Weekly Meal Prep', 'body' => 'Fresh, personalized meals prepared to bring ease, balance and flavor to your weekly routine.'],
        '/special-events' => ['title' => 'Special Events', 'eyebrow' => 'Tailored To You', 'body' => 'Refined culinary experiences for celebrations, gatherings and meaningful moments.'],
        '/corporate-dining' => ['title' => 'Corporate Dining', 'eyebrow' => 'For Business', 'body' => 'Refined menus and seamless service that impress clients, partners and teams.'],
        '/dietary-plans' => ['title' => 'Wellness & Dietary Plans', 'eyebrow' => 'Wellness First', 'body' => 'Specialized menus for vegan, keto, gluten-free and other dietary needs — without compromising on flavour.'],
        '/wine-pairing' => ['title' => 'Wine Pairing Experience', 'eyebrow' => 'Cellar & Table', 'body' => 'Carefully selected pairings designed to complement every dish and elevate the evening.'],
        '/menu-experience' => ['title' => 'Menu Experience', 'eyebrow' => 'Signature Menu', 'body' => 'A curated selection of seasonal dishes, signature flavors and refined culinary pairings.'],
        '/gallery' => ['title' => 'Gallery', 'eyebrow' => 'Featured Moments', 'body' => 'A visual collection of elegant dishes, intimate moments and unforgettable dining experiences.'],
        '/faq' => ['title' => 'FAQ', 'eyebrow' => 'Good To Know', 'body' => 'Everything you need to know before booking your personal chef experience.'],
        '/book-a-chef' => ['title' => 'Book a Chef', 'eyebrow' => 'Booking Request', 'body' => 'Reserve a private dining experience tailored to your occasion, guests and preferences.'],
        '/contact-us' => ['title' => 'Contact Us', 'eyebrow' => 'Get In Touch', 'body' => 'Let’s start planning a personalized culinary experience crafted around you.'],
        '/blog' => ['title' => 'Blog', 'eyebrow' => 'Journal', 'body' => 'Notes from the kitchen — menus, techniques and the craft of hosting well.'],
    ],
];
