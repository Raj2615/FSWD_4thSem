import { useState } from 'react'
import ProfileCard from './components/ProfileCard'
import './App.css'

function App() {
  const [profile] = useState({
    name: "John Doe",
    photo: "https://via.placeholder.com/150",
    bio: "A passionate web developer who loves creating beautiful and functional applications using React."
  });

  return (
    <div className="app">
      <h1>React Profile Card Demo</h1>
      <ProfileCard 
        name={profile.name}
        photo={profile.photo}
        bio={profile.bio}
      />
    </div>
  )
}

export default App
