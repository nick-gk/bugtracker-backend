import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getProjects } from '../../actions/project';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const MainPage = ({ getProjects, auth, project: {projects} }) => {
   useEffect(() => {
      getProjects();
   }, [getProjects]);

   return (
      <div className="container page pb-5">
         <div className="d-flex flex-column">
            <div className="my-3">
               <h3>Proiecte adaugate</h3>
            </div>
            <ul className="list-group">
            {projects.map(project => (
               <Link to={{pathname: `/projects/${project.id}`}}>
                  <li key={project.id} className="list-group-item">
                     <span className="mr-4">{project.id}</span>
                     <span>{project.title} </span>
                     <span className="ml-5">{project.description.slice(0, 100)}</span>
                  </li>
               </Link>
            ))}
            </ul>            
         </div>
      </div>
   )
}

MainPage.propTypes = {
   getProjects: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   projects: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth,
   project: state.project,
})

export default connect(mapStateToProps, { getProjects })(MainPage);
