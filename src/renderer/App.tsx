import { MemoryRouter, Switch, Route } from 'react-router-dom';
import { EyeTracker } from './components/EyeTracker';
import { Calibration } from './components/EyeTracker/Calibration';

import { HeatMap } from './components/HeatMap';
import { Home } from './components/Home';

import './App.css';
import { AOI } from './components/AOI';
import { ScanPath } from './components/Scanpath';

const App = () => {
  return (
    <>
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cal" component={Calibration} />
          <Route path="/eye-tracker" component={EyeTracker} />
          <Route path="/heatmap" component={HeatMap} />
          <Route path="/aoi" component={AOI} />
          <Route path="/scanpath" component={ScanPath} />
        </Switch>
      </MemoryRouter>
    </>
  );
};

export default App;
