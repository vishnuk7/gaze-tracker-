import ObjectsToCsv from 'objects-to-csv';
import path from 'path';

export const SaveCSV = async (objectList: [{ [key: string]: string }]) => {
  console.log(objectList);

  const csv = new ObjectsToCsv(objectList);
  await csv.toDisk(path.resolve(__dirname, '../server/data', 'data.csv'));

  // Return the CSV file as string:
  console.log(await csv.toString());
};
