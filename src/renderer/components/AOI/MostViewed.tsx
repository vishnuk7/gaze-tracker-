import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { ipcRenderer } = window.electron;
const res: any[] = [];
ipcRenderer.once('data-csv', (arg: string) => {
  const data = JSON.parse(arg);

  data.forEach((a: any) => {
    const d = {
      startTime: a[0],
      endTime: a[1],
      duration: a[2],
      startX: a[3],
      startY: a[4]
    };
    res.push(d);
  });

  console.log(res);
});

ipcRenderer.datacsv();

export const MostViewed = () => {
  const [totalData] = useState(res.length);
  const [leftPercentage, setLeftPercentage] = useState(0);
  const [centerPercentage, setCenterPercentage] = useState(0);
  const [rightPercentage, setRightPercentage] = useState(0);
  const [leftBg, setLeftBg] = useState('');
  const [centerBg, setCenterBg] = useState('');
  const [rightBg, setRightBg] = useState('');

  const left = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  const func = () => {
    const leftDiv = { lowerBound: 0, upperBound: 0 };
    const centerDiv = { lowerBound: 0, upperBound: 0 };
    const rightDiv = { lowerBound: 0, upperBound: 0 };

    if (left.current) {
      const leftElement = left.current.getBoundingClientRect();
      leftDiv.lowerBound = leftElement.left;
      leftDiv.upperBound = leftElement.right;
    }

    if (center.current) {
      const centerElement = center.current.getBoundingClientRect();
      centerDiv.lowerBound = centerElement.left;
      centerDiv.upperBound = centerElement.right;
    }

    if (right.current) {
      const rightElement = right.current.getBoundingClientRect();
      rightDiv.lowerBound = rightElement.left;
      rightDiv.upperBound = rightElement.right;
    }
    let lCount = 0;
    let cCount = 0;
    let rCount = 0;

    res.forEach((data) => {
      if (data.startX >= leftDiv.lowerBound && data.startX < leftDiv.upperBound) {
        lCount++;
      } else if (data.startX >= centerDiv.lowerBound && data.startX < centerDiv.upperBound) {
        cCount++;
      } else if (data.startX >= rightDiv.lowerBound && data.startX < rightDiv.upperBound) {
        rCount++;
      }
    });

    setLeftPercentage(Math.round((lCount / totalData) * 100));
    setCenterPercentage(Math.round((cCount / totalData) * 100));
    setRightPercentage(Math.round((rCount / totalData) * 100));
  };

  useEffect(() => {
    setTimeout(() => {
      func();
    }, 3000);

    if (leftPercentage === Math.max(leftPercentage, centerPercentage, rightPercentage)) {
      setLeftBg('opacity-60 bg-red-400');
    } else if (leftPercentage === Math.min(leftPercentage, centerPercentage, rightPercentage)) {
      setLeftBg('opacity-60 bg-green-400');
    } else {
      setLeftBg('opacity-60 bg-yellow-400');
    }

    if (centerPercentage === Math.max(leftPercentage, centerPercentage, rightPercentage)) {
      setCenterBg('opacity-60 bg-red-400');
    } else if (centerPercentage === Math.min(leftPercentage, centerPercentage, rightPercentage)) {
      setCenterBg('opacity-60 bg-green-400');
    } else {
      setCenterBg('opacity-60 bg-yellow-400');
    }

    if (rightPercentage === Math.max(leftPercentage, centerPercentage, rightPercentage)) {
      setRightBg('opacity-60 bg-red-400');
    } else if (rightPercentage === Math.min(leftPercentage, centerPercentage, rightPercentage)) {
      setRightBg('opacity-60 bg-green-400');
    } else {
      setRightBg('opacity-60 bg-yellow-400');
    }
  });

  return (
    <div className="flex w-full h-full">
      <div id="left" ref={left} className={`h-full w-1/5 border border-black flex items-center ${leftBg}`}>
        <p className="flex justify-center text-7xl w-full">
          <span className=" bg-black text-white px-4 py-5 rounded-lg">{leftPercentage} %</span>
        </p>
      </div>
      <div id="center" ref={center} className={`h-full border w-3/5 border-black flex items-center ${centerBg}`}>
        <p className="flex justify-center text-7xl w-full">
          <span className="bg-black text-white px-4 py-5 rounded-lg">{centerPercentage} %</span>
        </p>
      </div>
      <div id="right" ref={right} className={`h-full w-1/5 border border-black flex items-center ${rightBg}`}>
        <p className="flex justify-center text-7xl w-full">
          {' '}
          <span className="opacity-70 bg-black text-white px-4 py-5 rounded-lg">{rightPercentage} %</span>
        </p>
      </div>
    </div>
  );
};
