import { connect } from 'react-redux';

import { RegistrationPage } from './RegistrationPage';
import { register, setRegistrationSuccess } from '../../../redux/actions/auth';

const RegistrationPageContainer = (props) => {
    return(
        <>
            <RegistrationPage
            auth={props.auth}
            register={props.register}
            registrationError={props.registrationError}
            registrationSuccess={props.registrationSuccess}
            setRegistrationSuccess={props.setRegistrationSuccess}
            />
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth,
        registrationError: state.auth.registrationError,
        registrationSuccess: state.auth.registrationSuccess
    }
}


export default connect(mapStateToProps,{
    register,
    setRegistrationSuccess
})(RegistrationPageContainer);