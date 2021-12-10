interface resType {
  [name: string]: number;
}

export const loadCSV = (fileData: string): resType[] | null => {
  try {
    const files = fileData;
    const lines = files.split('\n');
    const res: resType[] = [];
    let header = lines[0].split(',');

    // remove space from each column name
    header = header.map((el) => el.trim());

    for (let i = 1; i < lines.length; i++) {
      const obj: { [k: string]: number } = {};
      const currentLine = lines[i].split(',');

      for (let j = 0; j < header.length; j++) {
        obj[header[j]] = parseInt(currentLine[j], 10);
      }

      console.log(res);

      res.push(obj);
    }
    return res;
  } catch (e) {
    console.error(e);
  }

  return null;
};
