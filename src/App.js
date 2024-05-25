import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Header from './components/Header';
import UserProfile from './components/FirstScreen';
import SignInSide  from './components/SignInSide';

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  return (
    <Fragment>
      <Header />
      {!isAuth && <SignInSide />}
      {isAuth && <UserProfile />}
    </Fragment>
  );
}

export default App;
