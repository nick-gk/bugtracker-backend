import { GET_PROJECTS, GET_PROJECT_ERROR } from "../actions/types";


const initialState = {
   projects: [],
   project: [],
   loading: true,
   error: {}
}

export default function(state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case GET_PROJECTS:
         return { ...state, projects: payload, loading: false };
      case GET_PROJECT_ERROR:
         return {
            ...state, error: payload, loading: false
         }   
      default:
         return state;
   }
}