import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Homepage from './components/Homepage'
import About from './components/About'
import DriverPage from './components/Driver'
import CargoTypePage from './components/CargoType'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/about" component={About} />
      <Route path="/page/:page" component={Homepage} />
      <Route path="/driver/page/:page" component={DriverPage} />
      <Route path="/driver" component={DriverPage} />
      <Route path="/cargo-type/page/:page" component={CargoTypePage} />
      <Route path="/cargo-type" component={CargoTypePage} />
    </Switch>
  </BrowserRouter>
)

export default App
