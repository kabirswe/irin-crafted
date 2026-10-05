import { useState } from 'react';

/**
 * Image with a graceful, on brand fallback.
 *
 * If an asset is missing the frame keeps its aspect ratio and shows a soft
 * gold-lit gradient with a monogram, so the layout never breaks.
 */
export default function Img({
    src,
    alt = '',
    className = '',
    imgClassName = '',
    ratio,
    loading = 'lazy',
    sizes,
    fallbackLabel,
    ...rest
}) {
    const [state, setState] = useState('loading');

    return (
        <span
            className={`relative block overflow-hidden bg-ink-800 ${className}`}
            style={ratio ? { aspectRatio: ratio } : undefined}
            data-img-state={state}
        >
            {state !== 'error' ? (
                <img
                    src={src}
                    alt={alt}
                    loading={loading}
                    decoding="async"
                    sizes={sizes}
                    onLoad={() => setState('ready')}
                    onError={() => setState('error')}
                    className={`h-full w-full object-cover transition-opacity duration-700 ${
                        state === 'ready' ? 'opacity-100' : 'opacity-0'
                    } ${imgClassName}`}
                    {...rest}
                />
            ) : (
                <span className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_120%_at_20%_10%,rgba(201,162,95,0.22),rgba(11,9,8,0.96))]">
                    <span className="flex max-w-[80%] flex-col items-center gap-3 text-gold-700/70">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9" aria-hidden="true">
                            <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.3l-1.8-5.7L4.5 10.8 10.2 9 12 3.5Z" />
                        </svg>
                        <span className="text-center font-display text-[0.7rem] uppercase leading-relaxed tracking-[0.34em] text-gold-700/60">
                            {(fallbackLabel || alt || 'Irin Crafted').slice(0, 22)}
                        </span>
                    </span>
                </span>
            )}
            {state === 'loading' && (
                <span className="absolute inset-0 animate-pulse bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900" />
            )}
        </span>
    );
}
