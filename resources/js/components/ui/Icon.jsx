/**
 * Hand drawn line icon set (1.2 stroke, currentColor) tuned for the
 * espresso + gold art direction.
 */
const paths = {
    'arrow-right': <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
    'arrow-up-right': <path d="M7 17 17 7m0 0H8.5M17 7v8.5" />,
    'arrow-left': <path d="M20 12H5m0 0 5.5-5.5M5 12l5.5 5.5" />,
    'chevron-down': <path d="m6 9.5 6 6 6-6" />,
    'chevron-right': <path d="m9.5 6 6 6-6 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    check: <path d="m5 13 4.5 4.5L19 7" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
    phone: (
        <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    ),
    mail: <path d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6" />,
    pin: (
        <>
            <path d="M12 21s7-6.1 7-11a7 7 0 0 0-14 0c0 4.9 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.6" />
        </>
    ),
    clock: (
        <>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5V12l3 2" />
        </>
    ),
    calendar: (
        <>
            <rect x="4" y="5.5" width="16" height="14" rx="2.5" />
            <path d="M4 10h16M9 3.5v4M15 3.5v4" />
        </>
    ),
    users: (
        <>
            <circle cx="9.5" cy="9" r="3.2" />
            <path d="M3.8 19.5c.6-3 3-4.6 5.7-4.6s5.1 1.6 5.7 4.6M16.5 6.4a3 3 0 0 1 0 5.9M17.5 14.7c2 .5 3.3 1.9 3.7 4" />
        </>
    ),
    'menu-book': (
        <>
            <path d="M12 6.6c-1.6-1.2-3.6-1.7-6-1.7v12.5c2.4 0 4.4.5 6 1.7 1.6-1.2 3.6-1.7 6-1.7V4.9c-2.4 0-4.4.5-6 1.7Z" />
            <path d="M12 6.6v12.5" />
        </>
    ),
    mortar: (
        <>
            <path d="M5 11.5h14a7 7 0 0 1-14 0Z" />
            <path d="M12 4.5v7M8.5 6.2c1.6-1.4 5.4-1.6 7 .4M4.5 19h15" />
        </>
    ),
    'home-chef': (
        <>
            <path d="M4 10.5 12 4l8 6.5V20H4z" />
            <path d="M9.5 20v-5.2a2.5 2.5 0 0 1 5 0V20" />
        </>
    ),
    star: <path d="m12 4.4 2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-3.9 5.6-.8L12 4.4Z" />,
    candle: (
        <>
            <path d="M12 3.5c1.8 1.6 2.6 2.9 2.6 4a2.6 2.6 0 0 1-5.2 0c0-1.1.8-2.4 2.6-4Z" />
            <path d="M8.5 13h7v7.5h-7zM6 20.5h12" />
        </>
    ),
    bowl: (
        <>
            <path d="M4 11.5h16a8 8 0 0 1-16 0Z" />
            <path d="M9 8.5c0-1.6 1.3-2.5 3-2.5M14.5 8.5c0-1 .6-1.8 1.5-2.2M3 19.5h18" />
        </>
    ),
    sparkle: (
        <>
            <path d="M12 3.5 13.6 9 19 10.6 13.6 12.2 12 17.7 10.4 12.2 5 10.6 10.4 9 12 3.5Z" />
            <path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
        </>
    ),
    briefcase: (
        <>
            <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" />
            <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 12.5h17" />
        </>
    ),
    leaf: (
        <>
            <path d="M20 4c-8 0-13 3.5-13 9.5 0 2.4 1.3 4.3 3.3 5.2C12.6 20.3 20 15.6 20 4Z" />
            <path d="M6.5 20c1.5-4.6 4.6-8.2 9-10.5" />
        </>
    ),
    wine: (
        <>
            <path d="M8 3.5h8l-.6 5.2A4.5 4.5 0 0 1 12 12a4.5 4.5 0 0 1-3.4-3.3L8 3.5Z" />
            <path d="M12 12v7M8.5 20.5h7M7.6 7.5h8.8" />
        </>
    ),
    notebook: (
        <>
            <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
            <path d="M9 3.5v17M12 8h4M12 12h4" />
        </>
    ),
    pan: (
        <>
            <circle cx="10" cy="12" r="6.5" />
            <path d="M16.5 12H21M10 8.5v7" />
        </>
    ),
    glass: (
        <>
            <path d="M6.5 3.5h11l-1 6.5a4.5 4.5 0 0 1-9 0L6.5 3.5Z" />
            <path d="M12 14.5v6M8 20.5h8M7 7.5h10" />
        </>
    ),
    quote: (
        <path d="M9.5 6.5c-3 1.2-4.6 3.5-4.6 6.7 0 2.4 1.3 4.3 3.4 4.3 1.9 0 3.2-1.3 3.2-3.1 0-1.7-1.1-2.9-2.7-2.9h-.5c.2-1.6 1.3-2.9 3.2-3.8l-2-1.2Zm9 0c-3 1.2-4.6 3.5-4.6 6.7 0 2.4 1.3 4.3 3.4 4.3 1.9 0 3.2-1.3 3.2-3.1 0-1.7-1.1-2.9-2.7-2.9h-.5c.2-1.6 1.3-2.9 3.2-3.8l-2-1.2Z" />
    ),
    'chef-hat': (
        <>
            <path d="M6 12.5a3.5 3.5 0 1 1 .9-6.9A4 4 0 0 1 14.9 5a3.5 3.5 0 1 1 1.1 7v.5H6v-.5Z" />
            <path d="M6.5 13.5h11V19h-11zM6 19h12" />
        </>
    ),
    utensils: (
        <>
            <path d="M6 3.5v7a2 2 0 0 0 4 0v-7M8 12.5V20.5" />
            <path d="M15 3.5c-1.3 1-2 2.5-2 4.5s.7 3 2 3.5V20.5" />
        </>
    ),
    instagram: (
        <>
            <rect x="4" y="4" width="16" height="16" rx="4.5" />
            <circle cx="12" cy="12" r="3.6" />
            <path d="M16.8 7.4h.01" />
        </>
    ),
    facebook: <path d="M14.5 8.5h2V5.6h-2.2c-2 0-3.3 1.3-3.3 3.4v1.5H9v3h2v7h3v-7h2.2l.5-3H14v-1c0-.7.2-1 .5-1Z" />,
    pinterest: (
        <>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M10.5 20c.6-1.5 1-2.6 1.2-3.4.3 1 1 1.6 2.1 1.6 2 0 3.4-1.9 3.4-4.3 0-2.2-1.7-3.9-4-3.9-2.6 0-4.3 1.7-4.3 4 0 1 .3 1.9 1 2.4" />
        </>
    ),
    youtube: (
        <>
            <rect x="3.5" y="6" width="17" height="12" rx="3.5" />
            <path d="m11 9.5 4.5 2.5L11 14.5v-5Z" />
        </>
    ),
    play: <path d="M9 6.5 18 12l-9 5.5v-11Z" />,
    search: (
        <>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
        </>
    ),
    globe: (
        <>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M3.5 12h17M12 3.5c2.4 2.6 3.6 5.4 3.6 8.5S14.4 18.4 12 20.5c-2.4-2.1-3.6-5.4-3.6-8.5S9.6 6.1 12 3.5Z" />
        </>
    ),
    fire: (
        <path d="M12 3.5c3.4 3 5 5.7 5 8.2a5 5 0 0 1-10 0c0-1.4.5-2.6 1.4-3.7.6 1 1.2 1.5 1.9 1.5.4-2.3 1-4.3 1.7-6Z" />
    ),
    award: (
        <>
            <circle cx="12" cy="9.5" r="4.5" />
            <path d="m9 13.5-1 7 4-2 4 2-1-7" />
        </>
    ),
};

export default function Icon({ name, size = 22, stroke = 1.2, className = '', filled = false, ...rest }) {
    const d = paths[name];
    if (!d) return null;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? 'currentColor' : 'none'}
            stroke={filled ? 'none' : 'currentColor'}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
            {...rest}
        >
            {d}
        </svg>
    );
}
