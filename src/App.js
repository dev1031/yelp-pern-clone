import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './routes/Home';
import Reviews from './routes/Reviews';
import UpdatePage from './routes/UpdatePage';
import {ResturantContextProvider} from './context/resturantsContext';

function App() {
  return (
    <ResturantContextProvider>
      <div>
        <Router>
          <Switch>
              <Route exact path ='/' component ={Home}></Route>
              <Route exact path ='/reviews/:id' component ={Reviews}></Route>
              <Route exact path ='/:id/update' component ={UpdatePage}></Route>
          </Switch>
        </Router>
      </div>
    </ResturantContextProvider>
  );
}

export default App;
