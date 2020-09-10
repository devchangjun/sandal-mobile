import React from 'react';
import TitleBar from 'components/titlebar/TitleBar';
import BottomNav from 'components/nav/BottomNav';
import EventContainer from '../../containers/event/EventContainer';
import EventListContainer from '../../containers/event/EventListContainer';

export default ({ match }) => {
    const post = match.params.post;

    return (
        <>
            <TitleBar title={'이벤트'} />
                {post ? <EventContainer id={post} />
                : <EventListContainer />}
            <BottomNav />
        </>
    );
};
