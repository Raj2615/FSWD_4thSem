import { useParams, Link } from 'react-router-dom';

// Sample blog posts data (in a real app, this would come from an API or database)
const blogPosts = {
  1: {
    title: "Getting Started with React",
    content: "React is a JavaScript library for building user interfaces. It's component-based and makes it easy to create interactive UIs.",
    date: "2024-03-20",
    author: "John Doe"
  },
  2: {
    title: "Understanding React Router",
    content: "React Router is the standard routing library for React. It enables navigation between different components in your application.",
    date: "2024-03-19",
    author: "Jane Smith"
  },
  3: {
    title: "State Management in React",
    content: "State management is crucial in React applications. There are various approaches, from local state to global state management solutions.",
    date: "2024-03-18",
    author: "Mike Johnson"
  }
};

function BlogPost() {
  const { id } = useParams();
  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="error">
        <h2>Post not found</h2>
        <Link to="/blog">Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="blog-post">
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span className="author">By {post.author}</span>
        <span className="date">{post.date}</span>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <Link to="/blog" className="back-link">
        ← Back to Blog
      </Link>
    </article>
  );
}

export default BlogPost; 