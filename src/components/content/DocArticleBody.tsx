import Link from 'next/link';

import DocImage, { DocImageData } from '@/components/content/DocImage';
import { docArticles } from '@/content/docs';

export default function DocArticleBody({ slug }: { slug: string }) {
  const article = docArticles.find((a) => a.slug === slug);
  if (!article) return null;

  return (
    <>
      {article.sections.map((section, i) => (
        <section key={i}>
          {section.heading && <h2>{section.heading}</h2>}
          {section.paragraphs?.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
          {section.image && <DocImage {...section.image} />}
          {section.list && (
            <ul>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.orderedList && (
            <ol>
              {section.orderedList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          )}
          {section.code && (
            <pre>
              <code>{section.code}</code>
            </pre>
          )}
        </section>
      ))}
      <p>
        Continue with our{' '}
        <Link href='/docs/complete-fcm-testing-guide'>complete testing guide</Link> or open the{' '}
        <Link href='/'>FCM tester</Link> to send a notification now.
      </p>
    </>
  );
}

export type { DocImageData };
