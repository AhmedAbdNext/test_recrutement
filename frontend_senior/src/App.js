import React, { useEffect, useState } from 'react';
import { customOverlappingPayload } from './utils/mock';
import { getBoxHeight, getOverLappingMatrixIds } from './utils/times';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [currentMatrixIds, setCurrentMatrixIds] = useState([]);
  //TODO remove useEffect
  useEffect(() => {
    const matrixIds = getOverLappingMatrixIds(customOverlappingPayload);
    const { innerHeight: width, innerHeight: height } = window;
    //TODO add a sort interval
    const boxWidth = Math.floor(width / matrixIds[0].length);
    for (var i = 0; i < matrixIds.length; i++) {
      var currentRow = matrixIds[i];
      for (var j = 0; j < currentRow.length; j++) {
        const currentPayload = customOverlappingPayload.find((item) => {
          return item.id === currentRow[j];
        });
        currentRow[j] = {
          [currentRow[j]]: {
            width: boxWidth,
            start: currentPayload.start,
            duration: currentPayload.duration,
            height: getBoxHeight(height, currentPayload.duration),
          },
        };
      }
    }
    setCurrentMatrixIds(matrixIds);
  }, []);
  return (
    <div>
      {currentMatrixIds.length &&
        currentMatrixIds.map((el) => {
          return (
            <div
              key={uuidv4()}
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {el.map((ell) => {
                return (
                  <div
                    key={uuidv4()}
                    style={{
                      border: '1px black solid',
                      height: ell[Object.keys(ell)[0]].height + 'px',
                      width: ell[Object.keys(ell)[0]].width + 'px',
                      margin: '1px',
                    }}
                  >
                    {ell.duration}
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
