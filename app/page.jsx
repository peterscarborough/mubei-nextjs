import Link from 'next/link';
import { Card } from 'components/card';
import { RandomQuote } from 'components/random-quote';
import { Markdown } from 'components/markdown';
import { ContextAlert } from 'components/context-alert';
import { getNetlifyContext } from 'utils';

const cards = [
    //{ text: 'Hello', linkText: 'someLink', href: '/' }
];

const contextExplainer = `
The card below is rendered on the server based on the value of \`process.env.CONTEXT\` 
([docs](https://docs.netlify.com/configure-builds/environment-variables/#build-metadata)):
`;
const choiceExplainer = `
为什么选择我们
我们承诺为您的家人提供最好的客户服务和采用最优质花岗岩制成的最高品质纪念碑。
`;
const preDynamicContentExplainer = `
The card content below is fetched by the client-side from \`/quotes/random\` (see file \`app/quotes/random/route.js\`) with a different quote shown on each page load:
`;

const postDynamicContentExplainer = `
On Netlify, Next.js Route Handlers are automatically deployed as [Serverless Functions](https://docs.netlify.com/functions/overview/).
Alternatively, you can add Serverless Functions to any site regardless of framework, with acccess to the [full context data](https://docs.netlify.com/functions/api/).

And as always with dynamic content, beware of layout shifts & flicker! (here, we aren't...)
`;

const ctx = getNetlifyContext();

export default function Page() {
    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            <section className="flex flex-col items-start gap-3 sm:gap-4">
                <ContextAlert />
                <h1 className="mb-0">Sanderson Monument 安省最大石碑厂</h1>
                <p className="text-lg">服务加拿大社区一百五十二年 值得信赖</p>
                <Link
                    href="https://sandersonmonument.ca/"
                    className="btn btn-lg btn-primary sm:btn-wide"
                >
                    公司英文网站
                </Link>
            </section>
            {!!ctx && (
                <section className="flex flex-col gap-4">
                    <Markdown content={contextExplainer} />
                    <RuntimeContextCard />
                </section>
            )}
            <section className="flex flex-col gap-4">
                <Markdown content={preDynamicContentExplainer} />
                <RandomQuote />
                <Markdown content={postDynamicContentExplainer} />
            </section>
            {/* !!cards?.length && <CardsGrid cards={cards} /> */}
        </main>
    );
}

function RuntimeContextCard() {
    const title = `Netlify Context: running in ${ctx} mode.`;
    if (ctx === 'dev') {
        return <Card title={title} text="Next.js will rebuild any page you navigate to, including static pages." />;
    } else {
        return <Card title={title} text="This page was statically-generated at build time." />;
    }
}

function DedicationContextCard() {
    const title = `敬业精神Netlify Context: running in ${ctx} mode.`;
    return <Card title={title} text="150 年来我们一直致力于服务客户。我们拥有跨越 5 代人的行业知识。不知道从哪里开始？请致电我们，我们将为您提供帮助。Next.js will rebuild any page you navigate to, including static pages." />;
}

function QualityContextCard() {
    const title = `敬业精神Netlify Context: running in ${ctx} mode.`;
    return <Card title={title} text="150 年来我们一直致力于服务客户。我们拥有跨越 5 代人的行业知识。不知道从哪里开始？请致电我们，我们将为您提供帮助。Next.js will rebuild any page you navigate to, including static pages." />;
}



