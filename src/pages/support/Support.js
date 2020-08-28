import React from 'react';
import SupportContainer from 'containers/support/SupportContainer';
import QNAContainer from '../../containers/support/QNAContainer';
import { Switch, Route } from 'react-router-dom';
import { Paths } from '../../paths';

const Support = ({ match, location }) => {
    const { tab } = match.params;
    
    return (
        <Switch>
            <Route exact path={`${Paths.ajoonamu.support}/:tab`} render={() => <SupportContainer tab={tab}/>} />
            <Route path={`${Paths.ajoonamu.support}/qna/:tab`} render={({ match }) => <QNAContainer tab={match.params.tab} />} />
        </Switch>
    )
};

export default Support;
