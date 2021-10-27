import { categoriesAPI } from "../../api/api";
import { setLoading } from "./app";
import { updateGlobal } from "./global";
import { deleteTransactionsByCategory } from "./transactions";

export const addCategoryToStore = (newCategory) => {
    return {
        type: 'ADD_CATEGORY_TO_STORE',
        newCategory
    }
}

export const deleteCategoryFromStore = (categoryId) => {
    return {
        type: 'DELETE_CATEGORY',
        categoryId
    }
}

export const setCategoriesToStore = (categories) => {
    return {
        type: 'SET_CATEGORIES',
        categories
    }
}

export const setSummaryError = (error) => {
    return {
        type: 'SET_SUMMARY_ERROR',
        error
    }
}

export const updateCategory = (categoryId, amount) => {
    return {
        type: 'UPDATE_CATEGORY',
        categoryId,
        amount
    }
}


export const addCategory = (values) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await categoriesAPI.addCategory(values)
        dispatch(addCategoryToStore({...data, "transactions_sum": "0"}));
        dispatch(setSummaryError(null));
        dispatch(setLoading(false));
    } catch (error) {
        if (error.response.status === 400) {
            dispatch(setSummaryError('This category already exists'));
        } else {
            dispatch(setSummaryError('Server error'))
        }
        dispatch(setLoading(false));
    }
}

export const deleteCategory = (categoryId, categoryType, amount) => (dispatch) => {
    dispatch(setLoading(true));
    categoriesAPI.deleteCategory(categoryId);
    dispatch(deleteCategoryFromStore(categoryId));
    dispatch(deleteTransactionsByCategory(categoryId));
    dispatch(updateGlobal(categoryType, amount))
    dispatch(setLoading(false));
}

export const getCategories = (dates) => async (dispatch) => {
    const {data} = await categoriesAPI.getCategories(dates)
    dispatch(setCategoriesToStore(data));
}