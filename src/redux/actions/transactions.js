import { transactionsAPI } from "../../api/api";
import { setLoading, updateUserData } from "./app";

export const addTransactionToStore = (newTransaction) => {
    return {
        type: 'ADD_TRANSACTION_TO_STORE',
        newTransaction
    }
}

export const deleteTransactionsByCategory = (categoryId) => {
    return {
        type: 'DELETE_TRANSACTIONS_BY_CATEGORY',
        categoryId
    }
}

export const deleteTransactionFromStore = (transactionId) => {
    return {
        type: 'DELETE_TRANSACTION',
        transactionId
    }
}

export const editTransactionInStore = (editedTransaction) => {
    return {
        type: 'EDIT_TRANSACTION_IN_STORE',
        editedTransaction
    }
}

export const setTransactionsToStore = (transactions) => {
    return {
        type: 'SET_TRANSACTIONS',
        transactions
    }
}


export const addTransaction = (values, updateData) => async (dispatch) => {
    dispatch(setLoading(true));
    const data = await transactionsAPI.addTransaction(values)
    if (updateData) {
        dispatch(addTransactionToStore(data));
        dispatch(updateUserData(data.category.id, data.category.category_type, data.amount));
    }
    dispatch(setLoading(false));
}

export const deleteTransaction = (transactionId, categoryId, categoryType, amount) => (dispatch) => {
    dispatch(setLoading(true));
    transactionsAPI.deleteTransaction(transactionId);
    dispatch(deleteTransactionFromStore(transactionId));
    dispatch(updateUserData(categoryId, categoryType, amount));
    dispatch(setLoading(false));
}

export const editTransaction = (transactionId, values, updateData, dataToDelete) => async (dispatch) => {
    dispatch(setLoading(true));
    const data = await transactionsAPI.editTransaction(transactionId, values) 
    dispatch(updateUserData(dataToDelete.category, dataToDelete.category_type, -dataToDelete.amount));
    if (updateData) {
        dispatch(editTransactionInStore(data));
        dispatch(updateUserData(data.category.id, data.category.category_type, data.amount));
    }
    dispatch(setLoading(false));
}

export const getTransactions = (dates) => async (dispatch) => {
    const data = await transactionsAPI.getTransactions(dates)
    dispatch(setTransactionsToStore(data));
}