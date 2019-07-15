import React from 'react'
import ReactDom from 'react-dom'
import './static/css/bootstrap.min.css'

const App = () => (
  <div className="d-flex justify-content-center">
    Hello World!
  </div>
)

ReactDom.render(<App />, document.getElementById('root'))
