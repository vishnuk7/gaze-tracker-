/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { py } from '../server/python/ivt';

import { BgImgBtn } from '../Button/BgImgBtn';
import { drawHeatmap } from '../../utils/drawHeatMap';

interface ActionBarProps {
  container: HTMLDivElement | null;
  setBgImg: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// @ts-ignore
const { ipcRenderer } = window.electron;
// @ts-ignore
const heatmap = (container: HTMLDivElement) => {
  ipcRenderer.once('data-csv', (arg: string) => {
    const data = JSON.parse(arg);
    const res: any[] = [];
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

    drawHeatmap(res, container);
  });
  ipcRenderer.datacsv();
};

export const ActionBar: React.FC<ActionBarProps> = ({ container, setBgImg }) => {
  return (
    <div className="absolute top-1 right-2 z-50">
      <BgImgBtn setBgImg={setBgImg} />
      <button
        type="button"
        onClick={() => {
          if (container !== null) heatmap(container);
        }}
      >
        data test
      </button>
    </div>
  );
};
