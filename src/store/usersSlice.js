import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



const host = "http://localhost:3001";
// Async thunk to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=10');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Async thunk to fetch saved users from the backend
export const fetchSavedUsers = createAsyncThunk('users/fetchSavedUsers', async () => {
  try {
    const response = await fetch(host , '/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data; // Assuming the backend returns an array of saved users
  } catch (error) {
    throw new Error(error.message);
  }
});

// Async thunk to update a user
export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser) => {
  try {
    console.log(updatedUser);
    const response = await fetch(host, `/api/update-user/${updatedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    const data = await response.json();
    return data.updatedUser; // Assuming the backend returns the updated user object
  } catch (error) {
    throw new Error(error.message);
  }
});

// Async thunk to save a new user
export const saveUser = createAsyncThunk('users/saveUser', async (newUser) => {
  try {
    const response = await fetch(host , '/api/save-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      alert("Are you checking me out :) User already exists");
      throw new Error('Failed to save user');
    }
    const data = await response.json();
    alert("The user has been saved successfully");
    return data.savedUser; // Assuming the backend returns the saved user object
  } catch (error) {
    throw new Error(error.message);
  }
});

// Async thunk to delete a user
export const deleteUserFromServer = createAsyncThunk('users/deleteUserFromServer', async (userId) => {
  try {
    const response = await fetch(host , `/api/delete-user/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return userId; // Return the deleted user's ID
  } catch (error) {
    throw new Error(error.message);
  }
});

// Users slice
const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], savedUsers: [], status: 'idle', error: null },
  reducers: {
    addUser(state, action) {
      saveUser(action.payload);
      state.users.push(action.payload);
    },
    deleteUser(state, action) {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUserDetails(state, action) {
      debugger;
      const updatedDetails  = action.payload;
      const userIndex = state.users.findIndex(user => user.email === updatedDetails.email);
      if (userIndex !== -1) {
        state.users[userIndex] = updatedDetails;
      }
      console.log("gazal" , state.users[0]);
    },
    updateUser(state, action) {
      state.status = 'succeeded';
      const updatedUser = action.payload;
      const index = state.savedUsers.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.savedUsers[index] = updatedUser;
      }   
     },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSavedUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSavedUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.savedUsers = action.payload;
      })
      .addCase(fetchSavedUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedUser = action.payload;
        console.log(updatedUser);
       // const index = state.user.findIndex(user => user.id === updatedUser.id);
        // if (index !== -1) {
        //   state.user[index] = updatedUser;
        // }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.savedUsers.push(action.payload);
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUserFromServer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUserFromServer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUserFromServer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addUser, deleteUser, updateUserDetails } = usersSlice.actions;

export default usersSlice.reducer;
