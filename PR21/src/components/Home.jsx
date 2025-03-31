import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Our Blog</h1>
      <p>Discover amazing stories and insights from our writers.</p>
      <div className="cta-buttons">
        <Link to="/blog" className="btn">View All Posts</Link>
        <Link to="/about" className="btn">About Us</Link>
      </div>
    </div>
  );
}

export default Home; 