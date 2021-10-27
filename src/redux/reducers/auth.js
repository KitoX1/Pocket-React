const initialState = { 
    auth: true,
    loginError: null,
    registrationError: null,
    registrationSuccess: false,
    username: ''
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                auth: action.flag
            }
        case 'SET_LOGIN_ERROR':
            return {
                ...state,
                loginError: action.error
            } 
        case 'SET_REGISTRATION_ERROR':
            return {
                ...state,
                registrationError: action.error
            }      
        case 'SET_REGISTRATION_SUCCESS':
            return {
                ...state,
                registrationSuccess: action.flag
            }  
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.username
            }  
        default:
            return state;
    }
}