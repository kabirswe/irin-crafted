import Icon from '../ui/Icon';
import Img from '../ui/Img';
import { SectionEyebrow, Wing } from '../ui/decor';
import { Reveal } from '../ui/primitives';

/** Numbered course list with imagery — used on the menu experience page. */
export default function MenuCourses({ courses, eyebrow = 'Signature menu', title = 'A Taste Of What We Create', body }) {
    return (
        <section className="section relative">
            <div className="shell">
                <div className="flex flex-col items-center gap-6 text-center">
                    <SectionEyebrow>{eyebrow}</SectionEyebrow>
                    <h2 data-split className="display-2 mx-auto max-w-3xl opacity-0 text-balance">{title}</h2>
                    {body && (
                        <Reveal delay={0.06} className="mx-auto max-w-2xl">
                            <p className="text-cream-400">{body}</p>
                        </Reveal>
                    )}
                </div>

                <div className="mt-16 space-y-6">
                    {courses.map((course, i) => (
                        <Reveal
                            key={course.title}
                            delay={i * 0.05}
                            className={`group card flex flex-col gap-6 overflow-hidden p-5 sm:flex-row sm:items-center sm:gap-8 sm:p-6 ${
                                i % 2 === 1 ? 'sm:flex-row-reverse' : ''
                            }`}
                        >
                            <div className="relative w-full shrink-0 overflow-hidden rounded-[1rem] sm:w-56">
                                <Img
                                    src={course.image}
                                    alt={course.title}
                                    ratio="4 / 3"
                                    fallbackLabel={course.course}
                                    className="w-full"
                                    imgClassName="transition-transform duration-[1.3s] group-hover:scale-[1.08]"
                                />
                            </div>

                            <div className="flex-1">
                                <span className="text-[0.62rem] uppercase tracking-[0.3em] text-gold-500">
                                    {String(i + 1).padStart(2, '0')} — {course.course}
                                </span>
                                <h3 className="display-3 mt-3 text-cream-50 transition-colors duration-500 group-hover:text-gold-200">
                                    {course.title}
                                </h3>
                                <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream-500">{course.body}</p>
                            </div>

                            <span className="hidden shrink-0 items-center gap-3 pr-4 text-gold-600/70 sm:flex">
                                <Icon name="utensils" size={20} />
                            </span>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.1} className="mt-14 flex justify-center">
                    <Wing className="text-gold-700/60" width={72} />
                </Reveal>
            </div>
        </section>
    );
}
