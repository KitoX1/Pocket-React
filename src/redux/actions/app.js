import { getCategories, updateCategory } from "./summary";
import { getGlobal, updateGlobal } from "./global";
import { getTransactions } from "./transactions";
import { getWidgets } from "./widgets";


export const setFilterDate = (filterDate) => {
    return {
        type: 'SET_FILTER_DATE',
        filterDate
    }
}

export const setLoading = (flag) => {
    return {
        type: 'SET_LOADING',
        flag
    }
}

export const setRegistrationError = (error) => {
    return {
        type: 'SET_REGISTRATION_ERROR',
        error
    }
} 


export const setUserData = (filterDate, dates) => (dispatch) => {
    dispatch(setLoading(true));
    dispatch(getTransactions(dates));
    dispatch(getCategories(dates));
    dispatch(getGlobal(dates));
    dispatch(setFilterDate(filterDate));
    dispatch(getWidgets())
    .then(() => { dispatch(setLoading(false)) })
}

export const updateUserData = (categoryId, categoryType, amount) => (dispatch) => {
    dispatch(setLoading(true));
    dispatch(updateCategory(categoryId, amount));
    dispatch(updateGlobal(categoryType, amount));
    dispatch(getWidgets())
    .then(() => { dispatch(setLoading(false)) })
}