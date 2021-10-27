import { Form, Input, Button, Checkbox } from 'antd';
import { Link, Redirect } from 'react-router-dom';

import '../authPages.less'
import { ROUTES } from '../../../constants/routes';

export const RegistrationPage = ({ auth, register, registrationError, registrationSuccess, setRegistrationSuccess }) => {
    const onFinish = ({username,email,password}) => {
        register({username,email,password})
    };

    if (auth) {
        return <Redirect to={ROUTES.main} />
    } else if (registrationSuccess) {
        setRegistrationSuccess(false);

        return <Redirect to={ROUTES.login} />
    }

    return(
        <div className="authPageBg">
            <Form
            name="Registration"
            layout="vertical"
            requiredMark={false}
            className="authForm"
            onFinish={onFinish}
            >   
                <p className="authForm__logo">Pockets</p>
                <p className="authForm__title">Adventures starts here</p>
                <p className="authForm__subtitle">Make your app management easy and fun!</p>

                <Form.Item
                label="Username"
                name="username"
                rules={[
                    { 
                        required: true, 
                        message: 'Please input your username' 
                    }
                ]}
                >
                    <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                name="email"
                label="Email"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid email',
                },
                {
                    required: true,
                    message: 'Please input your email',
                },
                ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password',
                    },
                ]}
                >
                    <Input
                    type="password"
                    placeholder="Enter your password"
                    />
                </Form.Item>

                <Form.Item
                className="authForm__checkbox"
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                    validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                >
                    <Checkbox>
                        <p className="authForm__checkboxTitle">I have read the agreement</p>
                    </Checkbox>
                </Form.Item>

                <span className="authForm__error">{registrationError}</span>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="authForm__button">
                        Sign up
                    </Button>
                    <p className="authForm__auth-message">
                        Alreary have an account? <Link to={ROUTES.login}>Sign in instead</Link>
                    </p>
                </Form.Item>
            </Form>
        </div>
    )
 }