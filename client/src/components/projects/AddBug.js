import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import axios from 'axios';

const AddBug = ({ setAlert, role, match, history }) => {
   const [bug, setBug] = useState({
      title: '',
      severity: 'CRITICAL',
      priority: 'HIGH',
      status: 'UNSOLVED',
      foundOnCommit: '',
      
   });

   const { title, severity, priority, foundOnCommit, status } = bug;

   const onChange = e => setBug({ ...bug, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();
      
      addBug(); 
   }

   const addBug = async () => {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      const body = JSON.stringify({ title, severity, priority, status, foundOnCommit, project_id: match.params.id });

      console.log(body);

      try {
         const res = await axios.post('/api/project/add-bug', body, config).then(res => {
            console.log(res);
            setAlert("Bug-ul a fost adaugat cu succes", 'success');
            history.push('/projects/'+ match.params.id);
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
                  <h4>Adauga un Bug</h4>
               </div>
               <form onSubmit = { (e) => onSubmit(e) }>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Titlu</label>
                     <input type="title" name="title" value={title} onChange = { e => onChange(e) } id="title" required />
                  </div>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Severitate</label>
                     <select name="severity" id="severity" value={"CRITIC"} onChange = { e => onChange(e) } required>
                        <option value="CRITICAL">Critical</option>
                        <option value="MAJOR">Major</option>
                        <option value="MODERATE">Moderate</option>
                        <option value="MINOR">Minor</option>
                        <option value="COSMETIC">Cosmetic</option>
                     </select>
                  </div>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Prioritate</label>
                     <select name="priority" id="priority" value={"HIGHEST"}  onChange = { e => onChange(e) } required>
                        <option value="HIGHEST">Highest</option>
                        <option value="High">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                     </select>
                  </div>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Status</label>
                     <select name="status" id="status" value={"UNSOLVED"} onChange = { e => onChange(e) } required>
                        <option value="UNSOLVED">Unsolved</option>
                        <option value="SOLVED">Solved</option>
                        <option value="PENDING">Pending</option>
                     </select>
                  </div>
                  <div className="d-flex flex-column mb-2">
                     <label className="mb-0">Commit Url</label>
                     <input type="foundOnCommit" name="foundOnCommit" placeholder="example@website.com" id="foundOnCommit" value={foundOnCommit} onChange = { e => onChange(e) } required />
                  </div>
                  <button className="btn btn-primary mt-3" type="submit">Adauga bug</button>
               </form>
            </div>
         </div>
      </div>
   </Fragment>
}

AddBug.propTypes = {

}

const mapStateToProps = state => ({
   isLoggedIn: state.auth.isAuthenticated,
   role: state.auth.user?.role
})

const mapDispatchToProps = {
   setAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBug);
