import * as React from 'react';
import Text from '../../Common/Inputs/Text';
import PopupContainer from '../../Common/Popups/PopupContainer';

interface joinEventTypes {
    eventName: string
}

const JoinEvent = ({eventName}: joinEventTypes) => {
    return (
        <PopupContainer closePopup={() => {}}>
            <div>
                <span>Join {eventName}</span>
                <div>
                    <Text label="Your Name"/>
                </div>
            </div>
        </PopupContainer>
    );
}

export default JoinEvent;