// pages/api/posts/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  const post = {
    id,
    title: `Post ${id}`,
    content: `This is the content of post ${id}.`,
    updatedAt: new Date().toISOString()
  };
  res.status(200).json(post);
}
