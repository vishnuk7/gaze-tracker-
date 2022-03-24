// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState } from 'react';
import { BgImgBtn } from '../Button/BgImgBtn';

import { Spinner } from './Spinner';

window.saveDataAcrossSessions = true;

const { ipcRenderer } = window.electron;

const objectList = [];

const webInit = () => {
  const tracker = webgazer.setGazeListener((data, timestamp) => {
    if (data != null && data.x > 0 && data.y > 0 && data.x <= window.innerWidth && data.y <= window.innerHeight) {
      const predx = data.x;
      const predy = data.y;
      const elapsedTime = timestamp;

      const csv_data = {
        ts: elapsedTime,
        x: predx,
        y: predy
      };

      // push to objectList array
      objectList.push(csv_data);

      console.log(`${data.x}, ${data.y}, ${timestamp}`);
    }
  });

  return tracker;
};

const saveToCSV = async (tracker) => {
  tracker.pause();
  // tracker.stop();
  ipcRenderer.savecsv(objectList);
};

export const EyeTracker: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [bgImage, setBgImg] = useState<string | undefined>();

  const tracker = webInit();

  const begin = tracker.begin();
  begin
    .then(() => {
      setLoading(true);
      throw new Error('error occurred');
    })
    .catch(() => {
      console.error('error');
    });

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen relative">
          <div className="flex justify-center items-center w-screen h-screen">
            <div
              style={{
                background: bgImage && `url(${bgImage}) no-repeat center center fixed`
              }}
              className="h-full w-full overflow-hidden"
            >
              <div className="absolute top-1 right-2 z-50">
                <BgImgBtn setBgImg={setBgImg} />
                <button type="button" className="bg-green-500 px-4 py-5" onClick={() => saveToCSV(tracker)}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
