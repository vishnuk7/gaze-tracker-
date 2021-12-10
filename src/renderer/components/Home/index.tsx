import { Link, useHistory } from 'react-router-dom';

export const Home = () => {
  const hist = useHistory();
  return (
    <>
      <div>Hello, 🔥</div>
      {/* <Link to="/eye-tracker">Eye Tracker</Link> */}
      <button
        type="button"
        onClick={() => {
          hist.push('/eye-tracker');
        }}
      >
        tracker
      </button>
      <button
        type="button"
        onClick={() => {
          hist.push('/heatmap');
        }}
      >
        heatmap
      </button>

      <button
        type="button"
        onClick={() => {
          hist.push('/cal');
        }}
      >
        cal
      </button>
    </>
  );
};
