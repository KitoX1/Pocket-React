import { connect } from 'react-redux';

import { Widgets } from "./Widgets";
import { addWidget, deleteWidget, getWidgets  } from '../../redux/actions/widgets';

const WidgetsContainer = (props) => {
    return(
        <>
            <Widgets 
            addWidget={props.addWidget}
            categories={props.categories}
            deleteWidget={props.deleteWidget}
            loadingInProcess={props.loadingInProcess}
            widgets={props.widgets}
            />
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        categories: state.summary.categories,
        loadingInProcess: state.app.loadingInProcess,
        widgets: state.widgets.widgets,
    }
}

export default connect(mapStateToProps,{
    addWidget,
    deleteWidget,
    getWidgets
})(WidgetsContainer);