const initialState = { 
    categories: [],
    summaryError: null
}

export const summary = (state = initialState, action) => {
    switch (action.type) { 
        case 'ADD_CATEGORY_TO_STORE':
            return {
                ...state,
                categories: [action.newCategory, ...state.categories]
            }
        case 'DELETE_CATEGORY':
            return {
                ...state,
                categories: state.categories.filter(category => {return category.id !== action.categoryId})
            }
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.categories
            } 
        case 'SET_SUMMARY_ERROR':
            return {
                ...state,
                summaryError: action.error
            } 
        case 'UPDATE_CATEGORY':
            return {
                ...state,
                categories: state.categories.map(category => {
                    if (category.id === action.categoryId) {
                        category.transactions_sum = +category.transactions_sum + +action.amount
                    }
                    return category;
                })
            }    
        default:
            return state;
    }
}