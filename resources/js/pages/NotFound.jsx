import Layout from '../components/layout/Layout';
import { Ornament, Reveal } from '../components/ui/primitives';
import Icon from '../components/ui/Icon';
import { content } from '../data/content';
import { AppLink } from '../lib/router';

export default function NotFound() {
    return (
        <Layout content={content} path="/404">
            <section className="relative flex min-h-screen items-center overflow-hidden pt-32">
                <div className="pointer-events-none absolute left-1/2 top-24 h-[30rem] w-[46rem] -translate-x-1/2 glow-gold opacity-60" />
                <div className="shell relative text-center">
                    <Reveal className="flex justify-center">
                        <span className="eyebrow eyebrow--center">Lost in the kitchen</span>
                    </Reveal>
                    <h1 className="display-1 mt-8 font-display">
                        4<span className="italic-accent">0</span>4
                    </h1>
                    <Ornament className="mt-10" width={220} />
                    <p className="mx-auto mt-8 max-w-lg text-cream-400">
                        This page seems to have left the table. Let us guide you back to something delicious.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <AppLink href="/" className="btn btn-gold">
                            Back to home
                            <Icon name="arrow-right" size={16} />
                        </AppLink>
                        <AppLink href="/menu-experience" className="btn btn-ghost">
                            View the menu
                        </AppLink>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
