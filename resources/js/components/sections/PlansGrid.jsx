import Icon from '../ui/Icon';
import { SectionEyebrow } from '../ui/decor';
import { Badge, Reveal } from '../ui/primitives';
import { AppLink } from '../../lib/router';

export default function PlansGrid({ plans, eyebrow = 'Choose your plan', title = 'Flexible Plans For Every Lifestyle', note, cta }) {
    return (
        <section className="section relative overflow-hidden bg-ink-950/70">
            <div className="pointer-events-none absolute left-1/2 top-10 h-[26rem] w-[44rem] -translate-x-1/2 glow-gold opacity-40" />
            <div className="shell relative">
                <div className="flex flex-col items-center gap-6 text-center">
                    <SectionEyebrow>{eyebrow}</SectionEyebrow>
                    <h2 data-split className="display-2 mx-auto max-w-2xl opacity-0 text-balance">{title}</h2>
                </div>

                <div className="mt-14 grid gap-6 lg:grid-cols-3">
                    {plans.map((plan, i) => (
                        <Reveal
                            key={plan.name}
                            delay={i * 0.07}
                            className={`group card relative flex flex-col p-9 ${
                                plan.featured ? 'card-gold-border bg-[linear-gradient(170deg,rgba(201,164,92,0.10),rgba(20,17,15,0.95))]' : ''
                            }`}
                        >
                            {plan.featured && (
                                <span className="absolute -top-3 left-9">
                                    <Badge>Most chosen</Badge>
                                </span>
                            )}

                            <span className="icon-badge">
                                <Icon name="chef-hat" size={22} />
                            </span>

                            <h3 className="display-3 mt-7 text-cream-50">{plan.name}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-cream-500">{plan.body}</p>

                            <span className="mt-7 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold-400">
                                <Icon name="utensils" size={15} />
                                {plan.meals}
                            </span>

                            <div className="mt-8 border-t border-cream-200/10 pt-7">
                                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-cream-500">Starting at</p>
                                <p className="mt-2 flex items-baseline gap-2">
                                    <span className="font-display text-4xl text-gold-200">{plan.price}</span>
                                    <span className="text-sm text-cream-500">{plan.suffix}</span>
                                </p>
                            </div>

                            <AppLink
                                href="/book-a-chef"
                                className={`btn mt-9 w-full ${plan.featured ? 'btn-gold' : 'btn-ghost'}`}
                            >
                                Learn more
                                <Icon name="arrow-right" size={15} />
                            </AppLink>
                        </Reveal>
                    ))}
                </div>

                {note && (
                    <Reveal delay={0.1} className="mt-10 flex items-center justify-center gap-3 text-sm text-cream-500">
                        <Icon name="check" size={16} className="text-gold-500" />
                        {note}
                    </Reveal>
                )}
            </div>
        </section>
    );
}
