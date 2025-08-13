// pages/ssg/[id].js
import { getPostById, getAllPosts } from '../../lib/posts';

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map(post => ({ params: { id: post.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = getPostById(params.id);
  return { props: { post } };
}

export default function PostPage({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>updatedAt: {post.updatedAt}</small>
      <p>This page is statically generated at build time.</p>
    </div>
  );
}
