import MainPage from '.';
import Preloader from '../../assets/components/Preloader/Preloader';

import { setUserData } from '../../redux/actions/app';
import { setUsername } from '../../redux/actions/auth';

import moment from 'moment';
import { useEffect } from 'react';
import { connect } from 'react-redux';

const MainPageContainer = (props) => {
    useEffect(() => {
        const filterDate = {date: moment().format('YYYY.wo'), format: 'YYYY.wo'}; 
        const startDate = moment().startOf('week').format('YYYY-MM-DD');
        const endDate = moment().endOf('week').format('YYYY-MM-DD');
        props.setUserData(filterDate, {start_date: startDate, end_date: endDate});
        props.setUsername();
    }, [])

    return(
        <>
            {props.loadingInProcess ? <Preloader/> : null}
            <MainPage
            auth={props.auth}
            loadingInProcess={props.loadingInProcess}
            />
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
        loadingInProcess: state.app.loadingInProcess
    }
}

export default connect(mapStateToProps,{
    setUserData,
    setUsername
})(MainPageContainer);