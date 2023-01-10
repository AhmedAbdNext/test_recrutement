import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMarginTop, getEvents, getStartTime } from './utils';
import { v4 as uuidv4 } from 'uuid';

function App(props) {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [startTime, setStartTime] = useState(0);
  //Styles
  const BoxStyle = {
    border: '1px black dashed',
    margin: '1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    const mEvents = getEvents(props.events, width, height);
    setCurrentEvents(mEvents);
    setStartTime(getStartTime(props.events));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {currentEvents.length &&
        currentEvents.map((events) => {
          return (
            <div
              key={uuidv4()}
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {events.map((subEvent) => {
                const currSubEvent = subEvent[Object.keys(subEvent)[0]];

                return (
                  <div
                    key={uuidv4()}
                    style={{
                      ...BoxStyle,
                      height: currSubEvent.height + 'px',
                      width: currSubEvent.width + 'px',
                      marginTop: getMarginTop(window.innerHeight, startTime, currSubEvent.start) + 'px',
                    }}
                  >
                    <h1>{Object.keys(subEvent).toString()}</h1>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

App.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};

export default App;
