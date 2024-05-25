// UserList.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addUser, deleteUser } from '../store/usersSlice';
import FullProfileScreen from './FullProfileScreen';
import classes from './UserList.module.css';

const UserList = ({ users, handleRowClick, handleAddUser, handleDeleteUser }) => {
  return (
    <ul>
      {users.map((user, index) => (
        <div key={index} className={classes.userContainer}>
          <li className={classes.userRow} onClick={() => handleRowClick(user)}>
            <img src={user.picture.thumbnail} alt="Thumbnail" className={classes.userThumbnail} />
            <div className={classes.userDetails}>
              <p>{`${user.name.title} ${user.name.first} ${user.name.last}`}</p>
              <p>Gender: {user.gender}</p>
              <p>Country: {user.location.country}</p>
              <p>Phone: {user.phone}</p>
              <p>Email: {user.email}</p>
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
};

export default UserList;
