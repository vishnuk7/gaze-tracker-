import { useHistory } from 'react-router-dom';

export const Home = () => {
  const hist = useHistory();
  return (
    <>
      {/* <Link to="/eye-tracker">Eye Tracker</Link> */}
      <div className="w-screen h-screen">
        <div className="flex justify-center items-center w-full h-full">
          <button
            className="bg-yellow-500 px-4 py-2 text-white mr-2"
            type="button"
            onClick={() => {
              hist.push('/cal');
            }}
          >
            Calibrate
          </button>
          <button
            className="bg-red-500 px-4 py-2 text-white mr-2"
            type="button"
            onClick={() => {
              hist.push('/eye-tracker');
            }}
          >
            Tracker
          </button>
          <button
            className="bg-green-500 px-4 py-2 text-white mr-2"
            type="button"
            onClick={() => {
              hist.push('/heatmap');
            }}
          >
            Heatmap
          </button>
          <button
            className="bg-cyan-500 px-4 py-2 text-white mr-2"
            type="button"
            onClick={() => {
              hist.push('/aoi');
            }}
          >
            AOI
          </button>
          <button
            className="bg-cyan-500 px-4 py-2 text-white mr-2"
            type="button"
            onClick={() => {
              hist.push('/scanpath');
            }}
          >
            Scanpath
          </button>
        </div>
      </div>
    </>
  );
};
