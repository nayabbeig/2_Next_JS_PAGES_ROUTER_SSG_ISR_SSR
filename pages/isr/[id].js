// pages/isr/[id].js
import { getAllPosts, getPostById } from "../../lib/posts";

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((p) => ({ params: { id: p.id } })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const post = getPostById(params.id);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
    revalidate: 10 // ISR: regenerate page every 10 seconds in the background
  };
}

export default function PostISR({ post }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>{post.title} (ISR)</h1>
      <p>{post.content}</p>
      <small>updatedAt: {post.updatedAt}</small>
      <p>This page is statically generated at build time and revalidated every 10 seconds.</p>
    </div>
  );
}
