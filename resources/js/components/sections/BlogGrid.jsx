import Icon from '../ui/Icon';
import Img from '../ui/Img';
import { SectionEyebrow } from '../ui/decor';
import { Reveal } from '../ui/primitives';
import { AppLink } from '../../lib/router';

function PostCard({ post, index, featured = false }) {
    return (
        <Reveal delay={(index % 3) * 0.06} className={`group card overflow-hidden ${featured ? 'lg:col-span-2 lg:flex' : ''}`}>
            <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2' : ''}`}>
                <Img
                    src={post.image}
                    alt={post.title}
                    ratio={featured ? '4 / 3.4' : '16 / 10'}
                    fallbackLabel={post.title}
                    className="w-full"
                    imgClassName="transition-transform duration-[1.3s] group-hover:scale-[1.07]"
                />
                <span className="absolute left-4 top-4 rounded-full border border-gold-500/40 bg-ink-950/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold-200 backdrop-blur-sm">
                    {post.category}
                </span>
            </div>
            <div className={`p-7 ${featured ? 'lg:w-1/2 lg:self-center' : ''}`}>
                <div className="flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.2em] text-cream-600">
                    <span>{post.date}</span>
                    <span className="size-1 rounded-full bg-gold-700" />
                    <span>{post.readTime}</span>
                </div>
                <h3 className={`mt-4 text-cream-50 transition-colors duration-500 group-hover:text-gold-200 ${featured ? 'display-2' : 'display-4'}`}>
                    {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-500">{post.excerpt}</p>
                <AppLink href="/blog" className="btn-link mt-6">
                    Read article
                    <Icon name="arrow-right" size={15} />
                </AppLink>
            </div>
        </Reveal>
    );
}

export default function BlogGrid({ posts, eyebrow = 'Journal', title = 'Notes From The Kitchen', body, limit, cta }) {
    const list = limit ? posts.slice(0, limit) : posts;
    return (
        <section className="section relative">
            <div className="shell">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <SectionEyebrow>{eyebrow}</SectionEyebrow>
                        <h2 data-split className="display-2 mt-5 opacity-0 text-balance">{title}</h2>
                        {body && (
                            <Reveal delay={0.06} className="mt-5">
                                <p className="text-cream-400">{body}</p>
                            </Reveal>
                        )}
                    </div>
                    {cta && (
                        <Reveal delay={0.1}>
                            <AppLink href={cta.href} className="btn btn-ghost">
                                {cta.label}
                                <Icon name="arrow-up-right" size={15} />
                            </AppLink>
                        </Reveal>
                    )}
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {list.map((post, i) => (
                        <PostCard key={post.title} post={post} index={i} featured={i === 0 && list.length > 3} />
                    ))}
                </div>
            </div>
        </section>
    );
}
