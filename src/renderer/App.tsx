import { MemoryRouter, Switch, Route } from 'react-router-dom';
import { EyeTracker } from './components/EyeTracker';

import { HeatMap } from './components/HeatMap';
import { Home } from './components/Home';

const App = () => {
  return (
    <>
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/eye-tracker" component={EyeTracker} />
          <Route path="/heatmap" component={HeatMap} />
          {/* <Route exact path="/" component={Home} /> */}
        </Switch>
      </MemoryRouter>
    </>
  );
};

export default App;
