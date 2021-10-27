const initialState = { 
    filterDate: {date: '', format: ''},
    loadingInProcess: false
}

export const app = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER_DATE':
            return {
                ...state,
                filterDate: action.filterDate
            }  
        case 'SET_LOADING':
            return {
                ...state,
                loadingInProcess: action.flag
            }  
        default:
            return state;
    }
}