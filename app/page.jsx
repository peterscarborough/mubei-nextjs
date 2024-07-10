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
全省多地十个销售展厅，多人专业设计团队，严格符合环保和安全标准的现代化厂房。\`展厅地址列表\` 
([链接](https://sandersonmonument.ca/contact/))
`;
const choiceExplainer = `
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
                    <ContactContextCard />
                </section>
            )}
            
            <section className="flex flex-col gap-4">
                <Markdown content={choiceExplainer} />
                <DedicationContextCard />
            </section>

            <section className="flex flex-col gap-4">
                <QualityContextCard />
            </section>
            
            <section className="flex flex-col gap-4">
                <CraftsmanshipContextCard />
            </section>
            
            <section className="flex flex-col gap-4">
                <GuaranteeContextCard />
            </section>

            
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

function ContactContextCard() {
    const title = `中文客服电话`;
    return <Card title={title} text="647 370 3600" />;
}

function DedicationContextCard() {
    const title = `敬业精神`;
    return <Card title={title} text="150 年来我们一直致力于服务客户。我们拥有跨越 5 代人的行业知识。不知道从哪里开始？请致电我们，我们将为您提供帮助。" />;
}

function QualityContextCard() {
    const title = `质量卓越`;
    return <Card title={title} text="花岗岩是一种优质材料，因其耐用性和复杂的图案而被选中。我们采购了最优质的花岗岩来帮助纪念您的家族历史。" />;
}

function CraftsmanshipContextCard() {
    const title = `工艺精良`;
    return <Card title={title} text="技巧、风格和精致的细节都是我们在工厂生产的每件作品中所体现的品质。从布局到生产和交付，我们努力打造最好的纪念碑。" />;
}

function GuaranteeContextCard() {
    const title = `终身保用`;
    return <Card title={title} text="我们保证您的纪念碑所用的花岗岩不会出现裂缝或缺陷，并且将在很长一段时间内成为您所爱之人的美丽纪念。" />;
}




