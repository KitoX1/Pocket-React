import Global from '.';

import { connect } from 'react-redux';


const GlobalContainer = (props) => {

    return(
        <>
            <Global
            filterDate={props.filterDate}
            global={props.global}
            />
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        filterDate: state.app.filterDate,
        global: state.global.global
    }
}

export default connect(mapStateToProps, {})(GlobalContainer);