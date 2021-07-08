import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PodList from "./components/PodList";
import CreatePod from "./components/CreatePod";
import PodDetails from "./components/PodDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path='/' component={PodList}/>
          <Route path='/CreatePod' component={CreatePod}/>
          <Route path='/pod/:id' component = {PodDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
