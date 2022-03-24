import heatmapjs from 'heatmapjs';

export const drawHeatmap = (jsonData: { [name: string]: number }[], container: HTMLDivElement) => {
  const config = {
    container,
    radius: 60,
    maxOpacity: 0.5,
    minOpacity: 0,
    blur: 0.75
    // gradient: {
    //   // enter n keys between 0 and 1 here
    //   // for gradient color customization
    //   '.5': 'blue',
    //   '.8': 'red',
    //   '.95': 'white'
    // }
  };

  const heatmap = heatmapjs.create(config);

  const data: { x: number; y: number; value: number }[] = [];

  jsonData.map((d) => {
    console.log(d);

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

  // for (let i = 0; i < data.length; i++) {
  //   console.log(data[i]);
  // }
};
