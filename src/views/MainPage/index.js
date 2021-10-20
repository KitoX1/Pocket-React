import './mainPage.less';

import GlobalContainer from '../../components/Global/container';
import ProfileFilterContainer from '../../components/ProfileFilter/container';
import SummaryContainer from '../../components/Summary/container';
import TransactionsContainer from '../../components/Transactions/container';
import WidgetsContainer from '../../components/Widgets/container';

import { Redirect } from 'react-router';

const MainPage = ({auth, loadingInProcess}) => {
    if (auth === false) {
        return <Redirect to={"/login"} />
    }

    return(
    <div 
    className="mainPageContainer" 
    style={loadingInProcess ? {filter: 'blur(5px)'} : null}
    >
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

export default MainPage;