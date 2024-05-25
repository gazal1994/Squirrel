import React, { useState, useMemo , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchSavedUsers , deleteUserFromServer , updateUser , updateUserDetails} from '../store/usersSlice';
import UserList from './UserList';
import classes from './UserProfile.module.css';
import FullProfileScreen from './FullProfileScreen';

const UserProfile = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [fetchClicked, setFetchClicked] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [historyFlag, setHistoryFlag] = useState(false);
  const [savedUsers, setavedUsers] = useState([]);

  useEffect(() => {
    console.log("useEffect",  users);
  }, [users]);

  const handleFetchData = () => {
    dispatch(fetchUsers());
    setHistoryFlag(false);
    setFetchClicked(true);
  };

  const handleFetchSavedUsers = async () => {
    setavedUsers(await dispatch(fetchSavedUsers()));
    setFetchClicked(true);
    setHistoryFlag(true);
  };
  

  const handleAddUser = (index) => {
    // Add user logic
  };

  const handleDeleteUser = (index) => {
    // Delete user logic
  };
const handleUpdateUser = async (newName) => {
    debugger;
    // Create a shallow copy of the user object
    let user = structuredClone(selectedUser);
    user.name.first = newName.first;
    user.name.last = newName.last;
    user.name.title = newName.title;
    
    // Update the state with the modified user object
    setSelectedUser(user);

    // Dispatch the updateUser action with the modified user
    if(historyFlag){
      await dispatch(updateUser(user));
      setavedUsers(await dispatch(fetchSavedUsers()));
    }else{
      await dispatch(updateUserDetails(user));
    } 
    setSelectedUser(null);
};


  
  const handleRowClick = (user) => {
    setSelectedUser(user);
  };
  const deleteSelectedUser = async () => {
    await dispatch(deleteUserFromServer(selectedUser["id"]));
    setavedUsers(await dispatch(fetchSavedUsers()));
    setSelectedUser(null);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const nameMatch = user.name.first.toLowerCase().includes(filterName.toLowerCase()) ||
                       user.name.last.toLowerCase().includes(filterName.toLowerCase());
      const countryMatch = user.location.country.toLowerCase().includes(filterCountry.toLowerCase());
      return nameMatch && countryMatch;
    });
  }, [users, filterName, filterCountry]);

  const filteredSavedUsers = useMemo(() => {
    let A = savedUsers.payload;
  
    // // Check if savedUsers is an array
    if (!Array.isArray(A)) {
      console.error('savedUsers is not an array');
      return [];
    }
  
    // Filter the array
    return A.filter(user => {
      const nameMatch = user.name.first.toLowerCase().includes(filterName.toLowerCase()) ||
                       user.name.last.toLowerCase().includes(filterName.toLowerCase());
      const countryMatch = user.location.country.toLowerCase().includes(filterCountry.toLowerCase());
      return nameMatch && countryMatch;
    });
  }, [savedUsers, filterName, filterCountry]);
  

  
  return (
    <main className={classes.profile}>
      <h2>My User Profile</h2>
      <button onClick={handleFetchData}>Fetch</button>
      <button onClick={handleFetchSavedUsers}>History</button>
      <div>
        {fetchClicked && userStatus === 'loading' && <p className={classes.blue}>Loading...</p>}
        {fetchClicked && userStatus === 'succeeded' && (
          <>
            <div className={classes.filterContainer}>
              <label htmlFor="filterName">Filter by Name:</label>
              <input type="text" id="filterName" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
            </div>
            <div className={classes.filterContainer}>
              <label htmlFor="filterCountry">Filter by Country:</label>
              <input type="text" id="filterCountry" value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} />
            </div>
            <UserList
              users={historyFlag?  filteredSavedUsers : filteredUsers}
              handleRowClick={handleRowClick}
              handleAddUser={handleAddUser}
              handleDeleteUser={handleDeleteUser}
            />
          </>
        )}
        {fetchClicked && userStatus === 'failed' && <p className={classes.red}>{error}</p>}
      </div>
      {selectedUser && (
        <FullProfileScreen
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onBack={() => setSelectedUser(null)}
          onDelete={() => deleteSelectedUser()}
          onUpdate={(user) => handleUpdateUser(user)}
        />
      )}
    </main>
  );
};

export default UserProfile;
