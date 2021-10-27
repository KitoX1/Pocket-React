import { connect } from 'react-redux';

import { Summary } from "./Summary";
import { addCategory, deleteCategory } from '../../redux/actions/summary';

const SummaryContainer = (props) => {
    return(
        <>
            <Summary 
            addCategory={props.addCategory}
            categories={props.categories}
            deleteCategory={props.deleteCategory}
            loadingInProcess={props.loadingInProcess}
            summaryError={props.summaryError}
            />
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        categories: state.summary.categories,
        loadingInProcess: state.app.loadingInProcess,
        summaryError: state.summary.summaryError
    }
}

export default connect(mapStateToProps,{
    addCategory,
    deleteCategory
})(SummaryContainer);