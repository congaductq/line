import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import About from './components/About'
import './static/css/bootstrap.min.css'
import './static/less/site.less'

const App = () => (
  <Router>
    <Route exact path="/" component={Homepage} />
    <Route path="/about" component={About} />
    <Route path="/page/:page" component={Homepage} />
  </Router>
)

ReactDom.render(<App />, document.getElementById('root'))
