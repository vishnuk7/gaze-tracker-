/* eslint-disable react/button-has-type */
import { useRef } from 'react';
import { drawHeatmap } from '../../utils/drawHeatMap';
import { loadCSV } from '../../utils/loadcsv';

interface UploadCSVBtnProps {
  container: HTMLDivElement | null;
}

export const UploadCSVBtn: React.FC<UploadCSVBtnProps> = ({ container }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onHandleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (inputRef !== null) {
      inputRef.current?.click();
    }
  };

  const onHandleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileData = '';

    if (e.target.files !== null && e.target.files.length > 0) {
      fileData = await e.target.files[0].text();

      const res = loadCSV(fileData);

      if (res !== null && container !== null) {
        drawHeatmap(res, container);
      }
    }
  };

  return (
    <div className="mt-4">
      <input className="hidden" type="file" onChange={onHandleFile} ref={inputRef} accept=".csv" />
      <button
        type="button"
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-bold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={onHandleButton}
      >
        Select CSV
      </button>
    </div>
  );
};
