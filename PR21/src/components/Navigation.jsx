import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <Link to="/">Blog App</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation; 