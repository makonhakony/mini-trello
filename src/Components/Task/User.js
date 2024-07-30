import React from 'react';
import { Image } from 'react-bootstrap';

const users = [
  { id: 1, name: 'User 1', imageUrl: 'https://via.placeholder.com/50' },
  { id: 2, name: 'User 2', imageUrl: 'https://via.placeholder.com/50' },
  { id: 3, name: 'User 3', imageUrl: 'https://via.placeholder.com/50' },
  // Add more users as needed
];

const User = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {users.map(user => (
        <div key={user.id} style={{ margin: '0 10px', textAlign: 'center' }}>
          <Image src={user.imageUrl} roundedCircle />
          <div>{user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default User;

