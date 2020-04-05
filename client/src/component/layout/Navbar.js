import React, { useContext, Fragement, Fragment } from 'react';
import propTypes from "prop-types";
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/ContactContext';


const Navbar = (props) => {
    const { title, icon } = props;
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const { clearContacts } = contactContext;
    const { isAuthenticated, logout, user } = authContext;
    const onLogout = () => {
        logout();
        clearContacts();

    }
    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout}>
                    <i className="fas fa-sign-out-alt" /><span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary ">
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>

    )
}

Navbar.propTypes = {
    title: propTypes.string.isRequired,
    icon: propTypes.string,
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}
export default Navbar;