import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRouteTST = ({ component: Component, auth, ...rest }) => (
   <Route 
      { ...rest } 
      render={props => 
         !auth.isAuthenticated && !auth.loading && auth.user.role == 'TST' ? 
            (<Redirect to='/' />) : 
            (<Component {...props}></Component>)} 
   />
)

PrivateRouteTST.propTypes = {
   auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps)(PrivateRouteTST);
