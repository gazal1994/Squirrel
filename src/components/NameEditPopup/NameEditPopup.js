import React from 'react';
import styles from './../NameEditPopup/NameEditPopup.module.css'; // Import the CSS module

const NameEditPopup = ({ editedName, onChange, onSave, onClose }) => {
  return (
    <div className={styles['name-edit-popup']}> {/* Use the CSS module syntax */}
      <h3>Edit Name</h3>
      <input type="text" value={editedName} onChange={onChange} className={styles.input} />
      <button onClick={onSave} className={styles.button}>Save</button>
      <button onClick={onClose} className={styles.button}>Cancel</button>
    </div>
  );
};

export default NameEditPopup;
