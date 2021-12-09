import heatmapjs from 'heatmapjs';

export const drawHeatmap = (jsonData: { [name: string]: number }[], container: HTMLDivElement) => {
  const heatmap = heatmapjs.create({
    container
  });

  const data: { x: number; y: number; value: number }[] = [];

  jsonData.map((d) => {
    const obj = {
      x: d.startX,
      y: d.startY,
      value: d.duration
    };

    return data.push(obj);
  });

  heatmap.setData({
    max: 5,
    data
  });
};
