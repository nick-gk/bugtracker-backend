import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'

const Project = ({ match, auth, setAlert }) => {
   const [project, setProject] = useState({});
   const [mps, setMps] = useState([]);
   const [tsts, setTsts] = useState([]);

   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   useEffect(() => {
      getProject()
   }, []);


   const addBug = () => {
      console.log("add BUg");
   }

   const becomeMP = async () => {
      if(mps.find(mp => mp.id === auth.user.id)) {
         // console.log('user already mp');
         setAlert("Esti deja Manager la acest proiect", 'info');
      } else {
         const body = JSON.stringify({user_id: auth.user.id, project_id: match.params.id});

         try {
            await axios.post(`/api/project/teams`, body, config).then(res => {
               getProject();
            });
         } catch (error) {
            console.dir(error);
         }
      }
   }

   const becomeTst = async () => {
      if(tsts.find(tst => tst.id === auth.user.id)) {
         setAlert("Esti deja Tester la acest proiect", 'info');
      } else {
         const body = JSON.stringify({user_id: auth.user.id, project_id: match.params.id});

         try {
            await axios.post(`/api/project/teams`, body, config).then(res => {
               getProject();
            });
         } catch (error) {
            console.dir(error);
         }
      }
   }

   const getProject = async () => {
      try {
         await axios.get(`/api/project/${match.params.id}`, config).then(res => {
            console.log(res.data);
            setProject({ ...res.data});
         });
         
      } catch (error) {
         console.dir(error);
      }

      try {
         await axios.get(`/api/project/${match.params.id}/team/mps`, config).then(res => {
            console.log(res.data);
            setMps([...res.data]);
            console.log(project);
         });
      } catch (error) {
         console.dir(error);
      }

      try {
         await axios.get(`/api/project/${match.params.id}/team/tsts`, config).then(res => {
            console.log(res.data);
            setTsts([...res.data]);
         });
      } catch (error) {
         console.dir(error);
      }
   }

   return (
      <Fragment>
         <div className="container page pb-5">
            <div className="d-flex flex-column">
               <div className="mt-3">
                  <h3>{project?.title}</h3>
               </div>
               <div className="mt-3">
                  <h4>Descriere</h4>
                  <p>{project?.description}</p>
               </div>
               <div className="mt-3">
                  <h4>Repository</h4>
                  <p>{project?.repository}</p>
               </div>
               <div className="d-flex flex-row justify-content-start">
                  <div className="mt-3 mr-4">
                     <h4>Echipa Manageri Proiect</h4>
                     <ul className="list-group" style={{width: 350 + 'px'}}>
                        {mps.map(mp => (
                           <li key={mp.id} className="list-group-item">{mp.email}</li>
                        ))}
                     </ul>
                  </div>
                  <div className="mt-3 mr-4">
                     <h4>Echipa Testeri Proiect</h4>
                     <ul className="list-group" style={{width: 350 + 'px'}}>
                        {tsts.map(tst => (
                           <li key={tst.id} className="list-group-item">{tst.email}</li>
                        ))}
                     </ul>
                  </div>
                  <div className="mt-3">
                     <h4>Lista Buguri</h4>
                     <ul className="list-group" style={{width: 350 + 'px'}}>
                        <li className="list-group-item">Titlu bug</li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                        <li className="list-group-item">A fourth item</li>
                        <li className="list-group-item">And a fifth one</li>
                     </ul>
                  </div>
               </div>
               <div className="mt-4 align-self-center">
                  {auth.user?.role === 'TST' && <button className="btn btn-primary mr-2" onClick={ () => addBug()} type="submit">Adauga BUG</button>}
                  {auth.user?.role === 'TST' && <button className="btn btn-primary mr-2" onClick={ () => becomeTst() } type="submit">Become a tester for this project</button>}
                  {auth.user?.role === 'MP' && <button className="btn btn-primary" onClick={ () => becomeMP()} type="submit">Become a MP for this project</button>}
               </div>
            </div>
         </div>
      </Fragment>
   )
}

Project.propTypes = {
   auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
   auth: state.auth
})

const mapDispatchToProps = {
   setAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
