import Link from 'next/link';
import { client } from '../libs/microcms';

// 記事の型定義
type Props = {
  id: string;
  title: string;
};

// microCMSから記事を取得
async function getColumnPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'column', // 'column'はmicroCMSのエンドポイント名
    queries: {
      fields: 'id,title',  // idとtitleを取得
      limit: 5,  // 最新の5件を取得
    },
  });
  return data.contents;
}

export default async function Home() {
  const posts = await getColumnPosts();

  return (
    <main>
      <h1>記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/column/${post.id}`}> {/* 記事へのリンクを生成 */}
              {post.title} {/* タイトルを表示 */}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}