// lib/posts.js
export function getAllPosts() {
  return [
    { id: '1', title: 'First Post', content: 'Hello world' },
    { id: '2', title: 'Second Post', content: 'More content here' },
      { id: '3', title: 'Third Post', content: 'This is the third post' },
      { id: '4', title: 'Fourth Post', content: 'Another interesting post' },
      { id: '5', title: 'Fifth Post', content: 'Learning Next.js is fun!' },
      { id: '6', title: 'Sixth Post', content: 'Exploring JavaScript features' },
      { id: '7', title: 'Seventh Post', content: 'Understanding React components' },
      { id: '8', title: 'Eighth Post', content: 'Tips for web development' },
      { id: '9', title: 'Ninth Post', content: 'Deploying your app' },
      { id: '10', title: 'Tenth Post', content: 'Styling with CSS modules' },
      { id: '11', title: 'Eleventh Post', content: 'API routes in Next.js' },
      { id: '12', title: 'Twelfth Post', content: 'Static site generation' }
      ].map(post => ({
        ...post,
        updatedAt: new Date().toString()
      }));
}

export function getPostById(id) {
  return getAllPosts().find(post => post.id === id);
}
