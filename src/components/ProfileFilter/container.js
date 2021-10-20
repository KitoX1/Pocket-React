import ProfileFilter from '.';

import { connect } from 'react-redux';

import { setUserData } from '../../redux/actions/app';

const ProfileFilterContainer = (props) => {
    return(
        <>
            <ProfileFilter
            setUserData={props.setUserData}
            username={props.username}
            />
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}

export default connect(mapStateToProps,{
    setUserData
})(ProfileFilterContainer);