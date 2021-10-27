const initialState = { 
    transactions: []
}

export const transactions = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION_TO_STORE':
            return {
                transactions: [...state.transactions, action.newTransaction].sort((a, b) => {
                    if (a.transaction_date < b.transaction_date) return 1;
                    if (a.transaction_date === b.transaction_date) return 0;
                    if (a.transaction_date > b.transaction_date) return -1;
                    return 0;
                })
            }
        case 'DELETE_TRANSACTION':
            return {
                transactions: state.transactions.filter(transaction => {return transaction.id !== action.transactionId})
            }   
        case 'DELETE_TRANSACTIONS_BY_CATEGORY':
            return {
                transactions: state.transactions.filter(transaction => {return transaction.category.id !== action.categoryId})
            }
        case 'EDIT_TRANSACTION_IN_STORE':
            return {
                transactions: state.transactions.map(transaction => {
                    if (transaction.id === action.editedTransaction.id) {
                        return action.editedTransaction;
                    }
                    return transaction;
                }).sort((a, b) => {
                    if (a.transaction_date < b.transaction_date) return 1;
                    if (a.transaction_date === b.transaction_date) return 0;
                    if (a.transaction_date > b.transaction_date) return -1;
                    return 0;
                })
            }   
        case 'SET_TRANSACTIONS': 
            return {
                transactions: action.transactions
            } 
        default:
            return state;
    }
}