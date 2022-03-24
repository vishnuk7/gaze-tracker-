import { useRef, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { ipcRenderer } = window.electron;
const arr: any[] = [];
ipcRenderer.once('data-csv', (arg: string) => {
  const data = JSON.parse(arg);

  data.forEach((a: any) => {
    const d = {
      startTime: a[0],
      endTime: a[1],
      duration: a[2],
      x: a[3],
      y: a[4]
    };
    arr.push(d);
  });
});

ipcRenderer.datacsv();

export const ScanPathCanvas = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current !== null) {
      canvas.current.width = window.innerWidth;
      canvas.current.height = window.innerHeight;
      const ctx = canvas.current.getContext('2d');

      if (ctx) {
        for (let i = 1; i < arr.length; i++) {
          ctx.beginPath();
          ctx.moveTo(arr[i - 1].x, arr[i - 1].y);
          ctx.lineTo(arr[i].x, arr[i].y);
          ctx.stroke();
          // draw_arrow(ctx, arr[i].x, arr[i].y, 10);
        }

        for (let i = 0; i < arr.length; i++) {
          ctx.beginPath();
          const radius = parseInt(arr[i].duration, 10) / 10;
          ctx.arc(arr[i].x, arr[i].y, radius, 0, 2 * Math.PI);
          ctx.strokeStyle = 'rgba(255, 165, 2,1)';
          ctx.stroke();
          ctx.fillStyle = 'rgba(223, 228, 234,0.5)';
          ctx.fill();
          ctx.closePath();
        }

        for (let i = 0; i < arr.length; i++) {
          ctx.beginPath();
          ctx.fillStyle = 'rgba(47, 53, 66,1.0)';
          ctx.fill();
          ctx.font = '30px Arial';
          ctx.fillText((i + 1).toString(), arr[i].x - 5, arr[i].y + 5);

          ctx.closePath();
        }
      }
    }
  });

  return (
    <div className="w-screen h-screen">
      <div className="flex w-full h-full">
        <canvas id="canvas" ref={canvas} className="w-full h-full" />
      </div>
    </div>
  );
};
