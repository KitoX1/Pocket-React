import { Switch, Route } from "react-router-dom";

import './App.less';
import { ROUTES } from './constants/routes';
import LoginPageContainer from "./views/AuthPages/LoginPage/LoginPageContainer";
import MainPageContainer from './views/MainPage/MainPageContainer';
import RegistrationPageContainer from "./views/AuthPages/RegistrationPage/RegistrationPageContainer";

export const App = () => {
  return (
    <div className="App">
      <Switch>
          <Route path={ROUTES.login}>
            <LoginPageContainer />
          </Route>
          
          <Route path={ROUTES.registration}>
            <RegistrationPageContainer />
          </Route>

          <Route path={ROUTES.main}>
            <MainPageContainer />
          </Route>
        </Switch>      
    </div>
  )
}