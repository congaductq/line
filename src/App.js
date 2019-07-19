import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import About from './components/About'

const App = () => (
  <Router>
    <Route exact path="/" component={Homepage} />
    <Route path="/about" component={About} />
    <Route path="/page/:page" component={Homepage} />
  </Router>
)

export default App
