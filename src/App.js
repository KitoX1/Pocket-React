import './App.less';

import LoginPageContainer from "./views/AuthPages/LoginPage/container";
import MainPageContainer from './views/MainPage/container';
import RegistrationPageContainer from "./views/AuthPages/RegistrationPage/container";

import { ROUTES } from './constants/routes';

import { Switch, Route } from "react-router-dom";


const App = () => {
  return (
    <div className="App">
      <Switch>
          <Route path={ROUTES.login}>
            <LoginPageContainer />
          </Route>
          <Route path={ROUTES.registration}>
            <RegistrationPageContainer />
          </Route>
          <Route path="/">
            <MainPageContainer />
          </Route>
        </Switch>      
    </div>
  );
}

export default App;
