import { useRef, useState } from 'react';
import Icon from '../ui/Icon';
import { Eyebrow, Reveal } from '../ui/primitives';

const EMPTY = {
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    service: '',
    diet: '',
    notes: '',
};

export default function BookingForm({ options, perks, brand }) {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);
    const panel = useRef(null);

    const set = (key) => (e) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        setErrors((err) => ({ ...err, [key]: undefined }));
    };

    const submit = (e) => {
        e.preventDefault();
        const next = {};
        if (!form.name.trim()) next.name = 'Please tell us your name.';
        if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'A valid email helps us reply.';
        if (!form.date) next.date = 'Choose a preferred date.';
        if (!form.guests) next.guests = 'How many guests?';
        if (!form.service) next.service = 'Select a service type.';
        setErrors(next);
        if (Object.keys(next).length) return;

        setSent(true);
        import('../../lib/anim').then(({ gsap, prefersReducedMotion }) => {
            if (prefersReducedMotion() || !panel.current) return;
            gsap.fromTo(
                panel.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            );
        });
    };

    return (
        <section className="section relative">
            <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                {/* intro column */}
                <div className="lg:sticky lg:top-32 lg:self-start">
                    <Reveal className="flex">
                        <Eyebrow>Booking request</Eyebrow>
                    </Reveal>
                    <h2 data-split className="display-2 mt-6 opacity-0 text-balance">
                        Plan your perfect dining experience
                    </h2>
                    <Reveal delay={0.06} className="mt-6">
                        <p className="text-cream-400">
                            Every event is unique. Share your preferred date, guest count and dining preferences, and we will
                            create a personalized culinary experience tailored exclusively to you.
                        </p>
                    </Reveal>

                    <ul className="mt-10 space-y-4">
                        {perks.map((perk, i) => (
                            <Reveal key={perk} as="li" delay={i * 0.05} className="flex items-center gap-4">
                                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold-600/40 text-gold-300">
                                    <Icon name="check" size={14} />
                                </span>
                                <span className="text-sm text-cream-300">{perk}</span>
                            </Reveal>
                        ))}
                    </ul>

                    <Reveal delay={0.16} className="mt-12 rounded-2xl border border-gold-700/25 bg-gold-600/[0.06] p-6">
                        <p className="flex items-center gap-3 text-sm text-cream-200">
                            <Icon name="phone" size={17} className="text-gold-400" />
                            Prefer to talk it through?
                        </p>
                        <a href={brand.phoneHref} className="mt-3 block font-display text-2xl text-gold-200">
                            {brand.phone}
                        </a>
                        <p className="mt-2 text-xs text-cream-500">{brand.hours.join('  ·  ')}</p>
                    </Reveal>
                </div>

                {/* form */}
                <div>
                    {sent ? (
                        <div
                            ref={panel}
                            className="card flex flex-col items-center justify-center gap-5 p-14 text-center"
                        >
                            <span className="grid size-16 place-items-center rounded-full border border-gold-500/50 bg-gold-600/10 text-gold-200">
                                <Icon name="check" size={28} />
                            </span>
                            <h3 className="display-2">Request received</h3>
                            <p className="max-w-md text-cream-400">
                                Thank you, {form.name.split(' ')[0] || 'friend'}. We will reply within 24 hours with a proposed
                                menu, a quote and the next steps. Nothing is charged until you confirm.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSent(false);
                                    setForm(EMPTY);
                                }}
                                className="btn btn-ghost mt-2"
                            >
                                Send another request
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={submit} noValidate className="card p-7 sm:p-10">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <Field label="Full name" error={errors.name}>
                                    <input className="field" placeholder="Jane Doe" value={form.name} onChange={set('name')} />
                                </Field>
                                <Field label="Email address" error={errors.email}>
                                    <input className="field" type="email" placeholder="jane@email.com" value={form.email} onChange={set('email')} />
                                </Field>
                                <Field label="Phone number">
                                    <input className="field" placeholder="+1 (212) 000 0000" value={form.phone} onChange={set('phone')} />
                                </Field>
                                <Field label="Event date" error={errors.date}>
                                    <input className="field" type="date" value={form.date} onChange={set('date')} />
                                </Field>
                                <Field label="Number of guests" error={errors.guests}>
                                    <select className="field" value={form.guests} onChange={set('guests')}>
                                        <option value="">Select guest count</option>
                                        {options.guests.map((g) => (
                                            <option key={g} value={g}>
                                                {g}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                                <Field label="Service type" error={errors.service}>
                                    <select className="field" value={form.service} onChange={set('service')}>
                                        <option value="">Select service</option>
                                        {options.services.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                                <Field label="Dietary preferences" className="sm:col-span-2">
                                    <select className="field" value={form.diet} onChange={set('diet')}>
                                        <option value="">Select preferences</option>
                                        {options.diets.map((d) => (
                                            <option key={d} value={d}>
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                                <Field label="Additional notes" className="sm:col-span-2">
                                    <textarea
                                        className="field min-h-[7.5rem] resize-y"
                                        placeholder="Occasion, favourite ingredients, timings, anything else we should know…"
                                        value={form.notes}
                                        onChange={set('notes')}
                                    />
                                </Field>
                            </div>

                            <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
                                <p className="flex items-center gap-3 text-xs text-cream-500">
                                    <Icon name="check" size={15} className="text-gold-500" />
                                    Your information is secure and will never be shared.
                                </p>
                                <button type="submit" className="btn btn-gold w-full sm:w-auto">
                                    Submit booking request
                                    <Icon name="arrow-right" size={16} />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

function Field({ label, error, children, className = '' }) {
    return (
        <label className={`block ${className}`}>
            <span className="field-label">{label}</span>
            {children}
            {error && <span className="mt-2 block text-xs text-gold-300">{error}</span>}
        </label>
    );
}
