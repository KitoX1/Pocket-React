import { authAPI } from "../../api/api";
import { setLoading } from "./app";



export const setAuth = (flag) => {
    return {
        type: 'SET_AUTH',
        flag
    }
}

export const setLoginError = (error) => {
    return {
        type: 'SET_LOGIN_ERROR',
        error
    }
} 

export const setRegistrationError = (error) => {
    return {
        type: 'SET_REGISTRATION_ERROR',
        error
    }
} 

export const setRegistrationSuccess = (flag) => {
    return {
        type: 'SET_REGISTRATION_SUCCESS',
        flag
    }
}

export const setUsernameToStore = (username) => {
    return {
        type: 'SET_USERNAME',
        username
    }
}


export const login = (values) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await authAPI.login(values);
        localStorage.setItem('access', data.access);
        dispatch(setAuth(true));
        dispatch(setLoginError(null));
        dispatch(setLoading(false));
        localStorage.setItem('refresh', data.refresh);
    } catch (error) {
        if (error.response.status === 401) {
            dispatch(setLoginError('User with such data was not found'));
        } else {
            dispatch(setLoginError('Server error'))
        }
    }
}

export const register = (values) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await authAPI.register(values);
        dispatch(setRegistrationSuccess(true));
        dispatch(setRegistrationError(null));
        dispatch(setLoading(false));
    } catch (error) {
        if (error.response.status === 400) {
            const fields = Object.keys(error.response.data);
            dispatch(setRegistrationError(`User with this ${fields.length === 1 ? `${fields[0]}` : `${fields[0]} and ${fields[1]}`} already exists`));
        } else {
            dispatch(setRegistrationError('Server error'))
        }
    }
}

export const setUsername = () => async (dispatch) => {
    const data = await authAPI.getUsername();
    dispatch(setUsernameToStore(data.username));
}