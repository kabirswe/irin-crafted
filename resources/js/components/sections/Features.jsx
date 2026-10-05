import Icon from '../ui/Icon';
import { Reveal } from '../ui/primitives';

const COLS = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
};

/** Reference pattern: icon, two-line serif title (second line gold), copy. */
export default function Features({ features, columns = 4, align = 'center', divided = false, className = '' }) {
    const words = (t) => t.split(' ');
    const centered = align === 'center';

    return (
        <div className={`grid gap-6 sm:grid-cols-2 ${COLS[columns] || COLS[4]} ${className}`}>
            {features.map((f, i) => {
                const parts = words(f.title);
                return (
                    <Reveal
                        key={f.title}
                        delay={i * 0.06}
                        className={`group relative flex flex-col ${centered ? 'items-center text-center' : 'items-start'} ${
                            divided ? 'border-t border-gold-700/30 pt-8' : 'card p-8'
                        }`}
                    >
                        <span className="icon-badge">
                            <Icon name={f.icon} size={20} />
                        </span>
                        <h3 className="display-3 mt-5 text-cream-100">
                            <span className="block">{parts[0]}</span>
                            {parts.length > 1 && <span className="block text-gold-300">{parts.slice(1).join(' ')}</span>}
                        </h3>
                        <p className={`mt-3 text-sm leading-relaxed text-cream-400 ${centered ? 'max-w-[17rem]' : ''}`}>
                            {f.body}
                        </p>
                    </Reveal>
                );
            })}
        </div>
    );
}
