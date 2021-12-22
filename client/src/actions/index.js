import axios from 'axios';
import { FETCH_USER } from './types';

// Action creators:
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user'); // Send HTTP request to our backend
    dispatch({type: FETCH_USER, payload: res.data});
};

export const handleToken = (token) => async (dispatch) => {
    const res = await axios.post('/api/stripe', token); // Send HTTP request to our backend
    dispatch({type: FETCH_USER, payload: res.data});
};

export const submitSurvey = (values, history) => async (dispatch) => {
    const res = await axios.post('/api/surveys', values); // Send HTTP request to our backend
    history.push('/surveys');
    dispatch({type: FETCH_USER, payload: res.data});
};