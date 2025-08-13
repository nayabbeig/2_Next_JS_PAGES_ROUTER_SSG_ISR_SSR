// pages/ssr/[id].js
export async function getServerSideProps(context) {
  const { id } = context.params;
  const base = process.env.BASE_URL || "http://localhost:3000";
  // run on every request
  const res = await fetch(`${base}/api/posts/${id}`);
  const post = await res.json();

  return { props: { post } };
}

export default function PostSSR({ post }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>{post.title} (SSR)</h1>
      <p>{post.content}</p>
      <small>updatedAt: {post.updatedAt}</small>
      <p>This page is rendered on each request.</p>
      <p>Check the source code to see how it works.</p>
      <p>Note: The API endpoint is at <code>/api/posts/[id]</code>.</p>
      <p>Try refreshing the page to see the server-side rendering in action.</p>
    </div>
  );
}
