import { connect } from 'react-redux';

import { Transactions } from "./Transactions";
import { addTransaction, deleteTransaction, editTransaction } from '../../redux/actions/transactions';

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