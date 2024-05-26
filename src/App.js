import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import UserProfile from './components/UserProfile/UserProfile';

function App() {

  return (
    <Fragment>
      <UserProfile />
    </Fragment>
  );
}

export default App;
