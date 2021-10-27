import { connect } from 'react-redux';

import { Global } from './Global';

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