// // UserProfile.js
// import React, { useState, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers, fetchSavedUsers } from '../store/usersSlice';
// import UserList from './UserList';
// import FullProfileScreen from './FullProfileScreen';
// import classes from './UserProfile.module.css';

// const SecondScreen = () => {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.users.users);
//   const userStatus = useSelector((state) => state.users.status);
//   const error = useSelector((state) => state.users.error);

//   const [fetchClicked, setFetchClicked] = useState(false);
//   const [filterName, setFilterName] = useState('');
//   const [filterCountry, setFilterCountry] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showFullProfile, setShowFullProfile] = useState(false);

//   const fetchData = (fetchFunction) => {
//     dispatch(fetchFunction());
//     setFetchClicked(true);
//   };

//   const handleFetchData = () => {
//     fetchData(fetchUsers);
//   };

//   const handleFetchSavedUsers = () => {
//     fetchData(fetchSavedUsers);
//   };

//   const handleAddUser = (index) => {
//     // Add user logic
//   };

//   const handleDeleteUser = (index) => {
//     // Delete user logic
//   };

//   const handleRowClick = (user) => {
//     setSelectedUser(user);
//     setShowFullProfile(true);
//   };

//   const filteredUsers = useMemo(() => {
//     return users.filter(user => {
//       const nameMatch = user.name.first.toLowerCase().includes(filterName.toLowerCase()) ||
//                        user.name.last.toLowerCase().includes(filterName.toLowerCase());
//       const countryMatch = user.location.country.toLowerCase().includes(filterCountry.toLowerCase());
//       return nameMatch && countryMatch;
//     });
//   }, [users, filterName, filterCountry]);

//   let content;

//   if (fetchClicked && userStatus === 'loading') {
//     content = <p className={classes.blue}>Loading...</p>;
//   } else if (fetchClicked && userStatus === 'succeeded') {
//     content = (
//       <>
//         <div className={classes.filterContainer}>
//           <label htmlFor="filterName">Filter by Name:</label>
//           <input type="text" id="filterName" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
//         </div>
//         <div className={classes.filterContainer}>
//           <label htmlFor="filterCountry">Filter by Country:</label>
//           <input type="text" id="filterCountry" value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} />
//         </div>
//         <UserList
//           users={filteredUsers}
//           handleRowClick={handleRowClick}
//           handleAddUser={handleAddUser}
//           handleDeleteUser={handleDeleteUser}
//         />
//       </>
//     );
//   } else if (fetchClicked && userStatus === 'failed') {
//     content = <p className={classes.red}>{error}</p>;
//   }

//   return (
//     <main className={classes.profile}>
//       <h2>My User Profile</h2>
//       <button onClick={handleFetchData}>Fetch</button>
//       <button onClick={handleFetchSavedUsers}>History</button>
//       <div>{content}</div>
//       {showFullProfile && <FullProfileScreen user={selectedUser} onClose={() => setShowFullProfile(false)} />}
//     </main>
//   );
// };

// export default UserProfile;
