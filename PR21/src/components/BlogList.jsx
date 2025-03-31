import { Link } from 'react-router-dom';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    excerpt: "Learn the basics of React and start building modern web applications.",
    date: "2024-03-20"
  },
  {
    id: 2,
    title: "Understanding React Router",
    excerpt: "A comprehensive guide to routing in React applications.",
    date: "2024-03-19"
  },
  {
    id: 3,
    title: "State Management in React",
    excerpt: "Explore different approaches to managing state in React applications.",
    date: "2024-03-18"
  }
];

function BlogList() {
  return (
    <div className="blog-list">
      <h2>All Blog Posts</h2>
      <div className="posts-grid">
        {blogPosts.map(post => (
          <article key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="post-meta">
              <span className="date">{post.date}</span>
              <Link to={`/blog/${post.id}`} className="read-more">
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BlogList; 