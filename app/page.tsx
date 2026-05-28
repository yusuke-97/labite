import { ArticleListSection } from '../components/ArticleListSection';
import { getLatestColumnPosts } from '../libs/column';

export default async function Home() {
  const posts = await getLatestColumnPosts();

  return (
    <main>
      <ArticleListSection title="新着記事" posts={posts} variant="primary" />
    </main>
  );
}
