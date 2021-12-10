// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useCallback, useState } from 'react';
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

const spinner = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
        disabled=""
      >
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Camera is loading 🔃...
      </button>
    </div>
  );
};

export const Calibration = () => {
  const [loading, setLoading] = useState(false);

  const tracker = webInit();
  const tr = tracker.begin();
  tr.then(() => {
    console.log('waited for 4 seconds');
    setLoading(true);
    throw new Error('error occurred');
  }).catch(() => {
    console.log('error');
  });

  return (
    <>
      {loading ? (
        <div className="calibrationDiv relative flex flex-col justify-between h-screen z-50">{dotRows()}</div>
      ) : (
        spinner()
      )}
    </>
  );
};
