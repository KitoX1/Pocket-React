const initialState = { 
    global: {
        "total_income": 0,
        "total_expenses": 0
    }
}

export const global = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GLOBAL':
            return {
                global: action.global
            }  
        case 'UPDATE_GLOBAL':
            return {
                global: action.categoryType === 'income' 
                ? {...state.global, total_income: +state.global.total_income + +action.amount}
                : {...state.global, total_expenses: +state.global.total_expenses + +action.amount}
            }    
        default:
            return state;
    }
}