import { GetStaticPaths, GetStaticProps } from 'next';

import ContentPageLayout from '@/components/content/ContentPageLayout';
import DocArticleBody from '@/components/content/DocArticleBody';
import { DocArticle, docArticles, getArticleBySlug } from '@/content/docs';

type Props = { article: DocArticle };

export default function DocArticlePage({ article }: Props) {
  return (
    <ContentPageLayout
      title={article.title}
      description={article.description}
      badge='Guide'
      coverImage={article.coverImage}
      showAd
    >
      <DocArticleBody slug={article.slug} />
    </ContentPageLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: docArticles.map((a) => ({ params: { slug: a.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const article = getArticleBySlug(slug);
  if (!article) return { notFound: true };
  return { props: { article } };
};
