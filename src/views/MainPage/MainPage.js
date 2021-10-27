import { Redirect } from 'react-router';

import './mainPage.less';
import { ROUTES } from '../../constants/routes';
import GlobalContainer from '../../components/Global/GlobalContainer';
import ProfileFilterContainer from '../../components/ProfileFilter/ProfileFilterContainer';
import SummaryContainer from '../../components/Summary/SummaryContainer';
import TransactionsContainer from '../../components/Transactions/TransactionsContainer';
import WidgetsContainer from '../../components/Widgets/WidgetsContainer';

export const MainPage = ({auth, loadingInProcess}) => {
    if (auth === false) {
        return <Redirect to={ROUTES.login} />
    }

    return(
        <div className="mainPageContainer" style={loadingInProcess ? {filter: 'blur(5px)'} : null}>
            <div className="leftBlock">
                <h1>Pocket</h1>
                <div className="historyBlock">
                    <TransactionsContainer />
                    <SummaryContainer />
                </div>
                <WidgetsContainer />
            </div>

            <div className="rightBlock">
                <ProfileFilterContainer />
                <GlobalContainer />
            </div>
        </div>
    )
}