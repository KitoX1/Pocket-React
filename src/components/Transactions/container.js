import Transactions from ".";

import { addTransaction, deleteTransaction, editTransaction } from '../../redux/actions/transactions';

import { connect } from 'react-redux';


const TransactionsContainer = (props) => {
    return(
        <Transactions 
        addTransaction={props.addTransaction}
        categories={props.categories}
        deleteTransaction={props.deleteTransaction}
        editTransaction={props.editTransaction}
        filterDate={props.filterDate}
        loadingInProcess={props.loadingInProcess}
        transactions={props.transactions}
        />
    )
}



const mapStateToProps = (state) => {
    return {
        categories: state.summary.categories,
        filterDate: state.app.filterDate,
        loadingInProcess: state.app.loadingInProcess,
        transactions: state.transactions.transactions
    }
}

export default connect(mapStateToProps,{
    addTransaction,
    deleteTransaction,
    editTransaction
})(TransactionsContainer);