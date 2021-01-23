import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { setAlert } from '../../actions/alert'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/auth'

const AddProject = ({ role, login, setAlert, history }) => {
   const [formData, setFormData] = useState({
      title: '',
      description: '',
      repository: ''
   });

   const { title, description, repository } = formData;

   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = e => {
      e.preventDefault();
      // console.log("adding a project");
      addProject();
   }

   // Redirect if logged in
   if(role !== 'MP') {
      return <Redirect to="/" />
   }

   const addProject = async payload => {
      console.log("adding a project");
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      const body = JSON.stringify({ title, description, repository });


      try {
         const res = await axios.post('/api/project', body, config).then(res => {
            console.log(res);
            setAlert("Proiectul a fost adaugat cu succes", 'success');
            history.push('/');
         });
         
      } catch (error) {
         const errors = error.response.data.errors;
         if(errors) {
            errors.forEach(error => setAlert(error.msg, 'danger'));
         }
      }
   }


   return <Fragment>
      <div className="container">
         <div className="row justify-content-center">
            <div className="row flex-column login-card p-3">
               <div className="login-head mb-3 text-left">
                  <h4>Adauga un proiect</h4>
               </div>
               <form onSubmit = { e => onSubmit(e) }>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Titlu</label>
                     <input type="title" name="title" value={title} onChange = { e => onChange(e) } id="title"  />
                  </div>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Descriere</label>
                     <input type="description" name="description" value={description} onChange = { e => onChange(e) } id="description" required />
                  </div>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Github Url</label>
                     <input type="repository" name="repository" placeholder="example@website.com" id="repository" value={repository} onChange = { e => onChange(e) } required />
                  </div>
                  <button className="btn btn-primary mt-3" type="submit">Adauga proiect</button>
               </form>
            </div>
         </div>
      </div>
   </Fragment>
}

AddProject.propTypes = state => ({
   login: PropTypes.func.isRequired,
   isLoggedIn: PropTypes.bool,
   role: PropTypes.string
})

const mapStateToProps = state => ({
   isLoggedIn: state.auth.isAuthenticated,
   role: state.auth.user?.role
})

const mapDispatchToProps = {
   setAlert,
   login
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject)
