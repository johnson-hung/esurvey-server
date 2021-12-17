import axios from 'axios';
import { FETCH_USER } from './types';

// Action creator
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user'); // Request to our backend
    dispatch({type: FETCH_USER, payload: res.data});
};