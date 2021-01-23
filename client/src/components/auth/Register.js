import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';


const Register = ({ setAlert, register, isLoggedIn }) => {
   const [formData, setFormData] = useState({
      prenume: '',
      nume: '',
      email: '',
      password: '',
      password2: '',
      role: 'MP',
   });

   const { prenume, nume, email, password, password2, role } = formData;

   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = e => {
      e.preventDefault();
      if(password !== password2) {
         setAlert('Parolele nu corespund', 'danger', 2000);
      } else {
         register({ prenume, nume, email, password, role });
      }
   }

   if(isLoggedIn) {
      return <Redirect to="/" />
   }

   return <Fragment>
      <div className="container">
         <div className="row justify-content-center">
            <div className="row flex-column login-card p-3">
               <div className="login-head mb-3 text-left">
                  <h4>Creaza un utilizator</h4>
               </div>
               <form onSubmit = { e => onSubmit(e) }>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Prenume</label>
                     <input type="prenume" name="prenume" value={prenume} onChange = { e => onChange(e) } id="prenume"  />
                  </div>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Nume</label>
                     <input type="nume" name="nume" value={nume} onChange = { e => onChange(e) } id="nume" required />
                  </div>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Email</label>
                     <input type="email" name="email" placeholder="example@website.com" id="email" value={email} onChange = { e => onChange(e) } required />
                  </div>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Rol</label>
                     <select name="role" id="role" value={role} onChange = { e => onChange(e) } required>
                        <option value="MP">Manager Proiect</option>
                        <option value="TST">Tester</option>
                     </select>
                  </div>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Parola</label>
                     <input type="password" name="password" id="password" value={password} onChange = { e => onChange(e) } required />
                  </div>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Confirma Parola</label>
                     <input type="password" name="password2" id="password2" value={password2} onChange = { e => onChange(e) } required />
                  </div>
                  <button className="btn btn-primary mt-3" type="submit">Creaza cont</button>
               </form>
            </div>
         </div>
      </div>
   </Fragment>
}

Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   register: PropTypes.func.isRequired,
   isLoggedIn: PropTypes.bool
}

const mapStateToProps = state => ({
   isLoggedIn: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
