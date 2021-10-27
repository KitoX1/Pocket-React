import { Form, Input, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';

import '../authPages.less';
import { ROUTES } from '../../../constants/routes';

export const LoginPage = ({ auth, login, loginError }) => {
    const onFinish = (values) => {
        login(values)
    }

    if (auth === true) {
        return <Redirect to={ROUTES.main} />
    }

    return(
        <div className="authPageBg">
            <Form
            name="login"
            layout="vertical"
            requiredMark={false}
            className="authForm"
            onFinish={onFinish}
            >   
                <p className="authForm__logo">Pockets</p>
                <p className="authForm__title">Welcome to Pockets!</p>
                <p className="authForm__subtitle">Please sign-in to your account and start the adventure</p>
                
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
                    message: 'Please input your password!',
                    },
                ]}
                >
                    <Input
                    type="password"
                    placeholder="Enter your password"
                    />
                </Form.Item>

                <Link className="authForm__forgot" to={ROUTES.login}>
                    Forgot password
                </Link>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="authForm__button">
                        Login
                    </Button>
                    <p className="authForm__auth-message">
                        New on our platform? <Link to={ROUTES.registration}>Create an account</Link>
                    </p>
                </Form.Item>

                <span className="authForm__error">{loginError}</span>

            </Form>
        </div>
    )
 }