import { useSelector, useDispatch } from "react-redux";

import classes from "./Header.module.css";
import { authActions } from "../store/auth";
import AccountMenu from "./AccountMenu";
import AlertDialog from "./AlertDialog";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <h1>Squirrel</h1>
      {isAuth && (
        <nav>
          <ul>
            {/* <li>Hiring</li>
            <li>About Us</li> */}
            <li><AlertDialog/></li>
            <li>
              <AccountMenu />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
