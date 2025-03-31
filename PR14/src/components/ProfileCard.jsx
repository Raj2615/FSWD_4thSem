import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ name, photo, bio }) => {
  return (
    <div className="profile-card">
      <img src={photo} alt={name} className="profile-photo" />
      <div className="profile-info">
        <h2>{name}</h2>
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default ProfileCard; 