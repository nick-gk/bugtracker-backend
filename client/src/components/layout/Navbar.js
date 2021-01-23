import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: {isAuthenticated, loading }, logout }) => {

   const authLinks = (
      <Fragment>
         <li className="nav-item mr-3">
            <Link className="nav-link" to="/add-project">Adauga Proiect</Link>
          </li>
         <li className="nav-item mr-3">
            <a className="nav-link" onClick={logout} href="#!">Logout</a>
         </li>
      </Fragment>
   );

   const guestLinks = (
      <Fragment>
          <li className="nav-item mr-3">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item mr-3">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
      </Fragment>
   );

   return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{paddingLeft: 200 + 'px'}}>
      <a className="navbar-brand" href="#">BugTracking App</a>
      <div className="collapse navbar-collapse ml-5" id="navbarNavDropdown">
        <ul className="navbar-nav">
         <li className="nav-item active mr-3">
            <Link className="nav-link" to="/">Lista proiecte</Link>
         </li>
         { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
        </ul>
      </div>
   </nav>
   )
}

Navbar.propTypes = {
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
   auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar);