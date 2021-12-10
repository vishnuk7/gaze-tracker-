// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
// import webgazer from 'renderer/webgazer';
// import webgazer from './webgazer';

window.saveDataAcrossSessions = true;

const webInit = () => {
  console.log(webgazer);
  webgazer
    .setGazeListener((data, timestamp) => {
      console.log(data, timestamp);
    })
    .begin();
};

export const EyeTracker: React.FC = () => {
  webInit();
  return (
    <>
      <div>Eye Tracker</div>
    </>
  );
};
