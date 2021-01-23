import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';

// Load User
export const loadUser = () => async dispatch => {
   if(localStorage.token) {
      console.log(localStorage.token);
      setAuthToken(localStorage.token)
   }

   try {
      const res = await axios.get('/api/auth');
      dispatch({type: USER_LOADED, payload: res.data});
   } catch (error) {
      dispatch({
         type: AUTH_ERROR
      })
   }
}

// login User
export const login = (email, password) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   const body = JSON.stringify({ email, password });

   try {
      const res = await axios.post('/api/auth/login', body, config);
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
      });

      dispatch(loadUser());

   } catch (error) {
      const errors = error.response.data.errors;
      if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
         type: LOGIN_FAIL
      })
   }
}

// Register User
export const register = ({ nume, prenume, email, password, role }) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   const body = JSON.stringify({ nume, prenume, email, password, role });

   try {
      const res = await axios.post('/api/auth/register', body, config);
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data
      });

      dispatch(loadUser());

   } catch (error) {
      const errors = error.response.data.errors;
      if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
         type: REGISTER_FAIL
      })
   }
}

// Logout
export const logout = () => dispatch => {
   dispatch({ type: LOGOUT });
}