// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from './Spinner';
import './style.css';

const handleClick = (e: React.MouseEvent) => {
  const bgClass = e.target.classList[1];
  const bgClassNo = parseInt(bgClass.split('-')[2], 10);
  if (bgClassNo <= 500 && bgClass !== 'bg-yellow-500') {
    e.target.classList.remove(bgClass);
    e.target.classList.add(`bg-red-${bgClassNo + 100}`);
  }
  if (bgClass === 'bg-red-600') {
    e.target.classList.remove(bgClass);
    e.target.classList.add(`bg-yellow-500`);
  }
};

window.saveDataAcrossSessions = true;

const webInit = () => {
  console.log(webgazer);
  const tracker = webgazer.setGazeListener((data, timestamp) => {
    // console.log(data, timestamp);
  });

  console.log(tracker);
  return tracker;
};

const dots = () => {
  const res = [];

  for (let i = 0; i < 4; i++) {
    res.push(
      <input
        type="button"
        key={i}
        className="Calibration bg-red-100"
        onClick={(e: React.MouseEvent) => {
          handleClick(e);
        }}
      />
    );
  }

  return res;
};

const dotRows = () => {
  const res = [];

  for (let i = 0; i < 3; i++) {
    res.push(
      <div key={i} className="flex justify-between">
        {dots()}
      </div>
    );
  }

  return res;
};

export const Calibration = () => {
  const [loading, setLoading] = useState(false);
  const hist = useHistory();

  const tracker = webInit();
  const begin = tracker.begin();

  console.log(tracker);

  const goBack = () => {
    tracker.end();
    hist.goBack();
  };

  begin
    .then(() => {
      setLoading(true);
      throw new Error('error occurred');
    })
    .catch(() => {
      console.log('error');
    });

  return (
    <>
      {loading ? (
        <div className="calibrationDiv relative flex flex-col justify-between h-screen z-50">
          {dotRows()}
          <button
            className="absolute right-12"
            type="button"
            onClick={() => {
              goBack();
            }}
          >
            back
          </button>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
