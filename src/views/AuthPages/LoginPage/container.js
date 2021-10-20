import LoginPage from '.';

import { login } from '../../../redux/actions/auth';

import { connect } from 'react-redux';

const LoginPageContainer = (props) => {
    return(
        <>
            <LoginPage
            auth={props.auth}
            login={props.login}
            loginError={props.loginError}
            />
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
        loginError: state.auth.loginError
    }
}


export default connect(mapStateToProps,{
    login
})(LoginPageContainer);