import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Homepage from './components/Homepage'
import About from './components/About'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/about" component={About} />
      <Route path="/page/:page" component={Homepage} />
    </Switch>
  </BrowserRouter>
)

export default App
