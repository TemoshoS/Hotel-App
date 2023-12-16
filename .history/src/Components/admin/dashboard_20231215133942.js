import React, { useState, useEffect } from 'react';
import { getAuth } from '../../services/authService';

const  = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const listAllUsers = (nextPageToken) => {
      // List batch of users, 1000 at a time.
      getAuth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
          setUsers((prevUsers) => [...prevUsers, ...listUsersResult.users]);

          if (listUsersResult.pageToken) {
            // List next batch of users.
            listAllUsers(listUsersResult.pageToken);
          }
        })
        .catch((error) => {
          console.log('Error listing users:', error);
        });
    };

    // Start listing users from the beginning, 1000 at a time.
    listAllUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.uid}>
            <strong>UID:</strong> {user.uid}, <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
