import { globalAPI } from "../../api/api";


export const setGlobalToStore = (global) => {
    return {
        type: 'SET_GLOBAL',
        global
    }
}

export const updateGlobal = (categoryType, amount) => {
    return {
        type: 'UPDATE_GLOBAL',
        categoryType,
        amount
    }
}



export const getGlobal = (dates) => async (dispatch) => {
    const data = await globalAPI.getGlobal(dates);
    dispatch(setGlobalToStore(data));
}