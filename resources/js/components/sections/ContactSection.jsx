import { useState } from 'react';
import Icon from '../ui/Icon';
import { Eyebrow, Reveal } from '../ui/primitives';

export default function ContactSection({ brand, options, tips = [] }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
    const [sent, setSent] = useState(false);
    const [errors, setErrors] = useState({});

    const set = (k) => (e) => {
        setForm((f) => ({ ...f, [k]: e.target.value }));
        setErrors((err) => ({ ...err, [k]: undefined }));
    };

    const submit = (e) => {
        e.preventDefault();
        const next = {};
        if (!form.name.trim()) next.name = 'Please add your name.';
        if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'A valid email, please.';
        if (!form.message.trim()) next.message = 'Tell us a little about your event.';
        setErrors(next);
        if (Object.keys(next).length) return;
        setSent(true);
    };

    const details = [
        { icon: 'mail', title: 'Email', lines: [brand.email, 'support@irincrafted.com'] },
        { icon: 'phone', title: 'Phone', lines: [brand.phone, '+1 (111) 123 4567'] },
        { icon: 'pin', title: 'Location', lines: brand.address },
        { icon: 'clock', title: 'Business hours', lines: brand.hours },
    ];

    return (
        <section className="section relative">
            <div className="shell">
                <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
                    <div>
                        <Reveal className="flex">
                            <Eyebrow>Get in touch</Eyebrow>
                        </Reveal>
                        <h2 data-split className="display-2 mt-6 opacity-0 text-balance">
                            Let’s plan something exceptional
                        </h2>
                        <Reveal delay={0.06} className="mt-6">
                            <p className="max-w-xl text-cream-400">
                                Tell us about your event, questions or culinary needs. Our team will get back to you with the
                                next steps.
                            </p>
                        </Reveal>

                        {sent ? (
                            <div className="card mt-10 flex flex-col items-center gap-4 p-12 text-center">
                                <span className="grid size-14 place-items-center rounded-full border border-gold-500/50 bg-gold-600/10 text-gold-200">
                                    <Icon name="check" size={24} />
                                </span>
                                <h3 className="display-3">Message sent</h3>
                                <p className="max-w-sm text-sm text-cream-400">
                                    Thank you — we will be in touch within one business day.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={submit} noValidate className="card mt-10 p-7 sm:p-9">
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
                                    <Field label="Service interest">
                                        <select className="field" value={form.service} onChange={set('service')}>
                                            <option value="">Select service</option>
                                            {options.services.map((s) => (
                                                <option key={s} value={s}>
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                    <Field label="Message" error={errors.message} className="sm:col-span-2">
                                        <textarea
                                            className="field min-h-[8rem] resize-y"
                                            placeholder="Tell us about your date, guests and what you have in mind…"
                                            value={form.message}
                                            onChange={set('message')}
                                        />
                                    </Field>
                                </div>
                                <button type="submit" className="btn btn-gold mt-8 w-full sm:w-auto">
                                    Send message
                                    <Icon name="arrow-right" size={16} />
                                </button>
                            </form>
                        )}
                    </div>

                    {/* details */}
                    <div className="space-y-5">
                        <Reveal className="grid gap-5 sm:grid-cols-2">
                            {details.map((d, i) => (
                                <div key={d.title} className="card p-5">
                                    <span className="grid size-10 place-items-center rounded-xl bg-gold-600/12 text-gold-300">
                                        <Icon name={d.icon} size={18} />
                                    </span>
                                    <p className="mt-4 text-[0.62rem] uppercase tracking-[0.24em] text-gold-500">{d.title}</p>
                                    {d.lines.map((line) => (
                                        <p key={line} className="mt-1 text-sm text-cream-300">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </Reveal>

                        {tips.length > 0 && (
                            <Reveal delay={0.1} className="card p-7">
                                <Eyebrow>Before you reach out</Eyebrow>
                                <h3 className="display-4 mt-4 text-cream-50">A few details help us serve you better</h3>
                                <ul className="mt-6 space-y-3">
                                    {tips.map((tip, i) => (
                                        <li key={tip.title} className="flex items-start gap-3">
                                            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-gold-600/40 text-gold-300">
                                                <Icon name={tip.icon || 'check'} size={13} />
                                            </span>
                                            <span className="text-sm text-cream-300">{tip.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        )}

                        <Reveal delay={0.14} className="relative overflow-hidden rounded-[1.25rem] border border-gold-700/25 p-7">
                            <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 glow-gold" />
                            <p className="relative font-display text-2xl text-cream-50">
                                Ready to reserve your experience?
                            </p>
                            <a href="/book-a-chef" className="btn btn-gold mt-6">
                                Book a chef
                                <Icon name="arrow-right" size={15} />
                            </a>
                        </Reveal>
                    </div>
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
