import React, { useEffect, useState } from 'react';
import { customOverlappingPayload } from './utils/mock';
import { getMarginTop, getMatrixEvents, getStartTime } from './utils/times';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [currentMatrixEvents, setCurrentMatrixEventss] = useState([]);
  const [startTime, setStartTime] = useState(0);
  //Styles
  const BoxStyle = {
    border: '1px black solid',
    margin: '1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    const matrixEvents = getMatrixEvents(customOverlappingPayload, width, height);
    setCurrentMatrixEventss(matrixEvents);
    setStartTime(getStartTime(customOverlappingPayload));
  }, []);
  return (
    <div>
      {currentMatrixEvents.length &&
        currentMatrixEvents.map((events) => {
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

export default App;
