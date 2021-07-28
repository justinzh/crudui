import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PodList from "./components/PodList";
import CreatePod from "./components/CreatePod";
import PodDetails from "./components/PodDetails";
import LogIn from './components/LogIn';

//import {config } from "./config";
//import {publicClientApplication} from '@azure/msal-browser';


export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path='/' component={PodList}/>
            <Route path='/CreatePod' component={CreatePod}/>
            <Route path="/logIn" component={LogIn}></Route>
            <Route path='/pod/:id' component = {PodDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
