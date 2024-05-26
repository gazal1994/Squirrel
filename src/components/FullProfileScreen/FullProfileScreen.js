import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './FullProfileScreen.module.css';
import NameEditPopup from '../NameEditPopup/NameEditPopup';
import { saveUser } from '../../store/usersSlice'; // Import the saveUser action

const FullProfileScreen = ({ user, onClose, onDelete, onUpdate, onBack }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [isNameEditPopupOpen, setIsNameEditPopupOpen] = useState(false);

  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setEditedFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setEditedLastName(e.target.value);
  };

  const handleNameSave = () => {
    const updatedName = {
      title: editedTitle,
      first: editedFirstName,
      last: editedLastName,
    };
    setIsEditingName(false);
    setIsNameEditPopupOpen(false);
    onUpdate(updatedName);
    onClose();
  };

  const handleSave = () => {
    dispatch(saveUser(user));
    onClose();
  };

  const handleDelete = () => {
    onDelete(user);
  };

  const handleUpdate = () => {
    setIsEditingName(true);
    setEditedTitle(user.name.title);
    setEditedFirstName(user.name.first);
    setEditedLastName(user.name.last);
  };

  return (
    <div className={styles.fullProfileContainer}>
      <div className={styles.profileCard}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>User Profile</h2>
        {user && (
          <>
            <img src={user.picture.large} alt="User" className={styles.profileImage} />
            {isEditingName ? (
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={handleTitleChange}
                  className={styles.inputField}
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={editedFirstName}
                  onChange={handleFirstNameChange}
                  className={styles.inputField}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={editedLastName}
                  onChange={handleLastNameChange}
                  className={styles.inputField}
                  placeholder="Last Name"
                />
                <button className={styles.saveButton} onClick={handleNameSave}>Save</button>
              </div>
            ) : (
              <p className={styles.infoText}>
                Name: {`${user.name.title} ${user.name.first} ${user.name.last}`}
              </p>
            )}
            <p className={styles.infoText}>Gender: {user.gender}</p>
            <p className={styles.infoText}>
              Age: {user.dob.age}, Year of Birth: {new Date(user.dob.date).getFullYear()}
            </p>
            <p className={styles.infoText}>Address:</p>
            <p className={styles.infoText}>
              Street: {user.location.street.number} {user.location.street.name}
            </p>
            <p className={styles.infoText}>City: {user.location.city}</p>
            <p className={styles.infoText}>State: {user.location.state}</p>
            <p className={styles.infoText}>Contact:</p>
            <p className={styles.infoText}>Email: {user.email}</p>
            <p className={styles.infoText}>Phone: {user.phone}</p>

            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={onBack}>Back</button>
          </>
        )}
      </div>
      {isNameEditPopupOpen && (
        <NameEditPopup
          editedTitle={editedTitle}
          editedFirstName={editedFirstName}
          editedLastName={editedLastName}
          onTitleChange={handleTitleChange}
          onFirstNameChange={handleFirstNameChange}
          onLastNameChange={handleLastNameChange}
          onSave={handleNameSave}
          onClose={() => setIsNameEditPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default FullProfileScreen;
