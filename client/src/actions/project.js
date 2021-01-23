import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROJECT, GET_PROJECTS, GET_PROJECT_ERROR, SET_ALERT } from './types';

export const getProjects = () => async dispatch => {
   try {
      const res = await axios.get('/api/project');
      dispatch({
         type: GET_PROJECTS,
         payload: res.data
      })

      dispatch(setAlert(`Au fost incarcate ${res.data.length} proiecte`, 'info', 2500));
   } catch (error) {
      dispatch({
         type: GET_PROJECT_ERROR,
         payload: { msg: error.response.statusText, status: error.response.status }
      })
   }
}
