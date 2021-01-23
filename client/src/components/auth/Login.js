import React, { Fragment, useState} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const Login = ({ login, isLoggedIn }) => {
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });

   const { email, password } = formData;

   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = e => {
      e.preventDefault();
      login(email, password);
   }

   // Redirect if logged in
   if(isLoggedIn) {
      return <Redirect to="/" />
   }

   return <Fragment>
      <div className="container">
         <div className="row justify-content-center">
            <div className="row flex-column login-card p-3">
               <div className="login-head mb-3 text-left">
                  <h4>Login</h4>
               </div>
               <form onSubmit = { e => onSubmit(e) }>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Email</label>
                     <input type="email" name="email" placeholder="example@website.com" id="email" value={email} onChange = { e => onChange(e) } required />
                  </div>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Parola</label>
                     <input type="password" name="password" id="password" value={password} onChange = { e => onChange(e) } required />
                  </div>
                  <button className="btn btn-primary mt-3" type="submit">Conecteaza-te</button>
               </form>
            </div>
         </div>
      </div>
   </Fragment>
}

Login.propTypes = {
   login: PropTypes.func.isRequired,
   isLoggedIn: PropTypes.bool
}

const mapStateToProps = state => ({
   isLoggedIn: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
