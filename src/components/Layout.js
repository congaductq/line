import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Layout extends Component {
  render() {
    const { children, pathname } = this.props
    return (
      <div>
        <header>
          <div className="cms-nav container">
            <Link to="/" className="cms-logo">TRUM</Link>
            <div className="cms-nav-bar">
              <Link to="/" className={`cms-nav-item ${pathname === '/' ? ' active' : ''}`}>Truck List</Link>
              <Link to="/about" className={`cms-nav-item ${pathname && pathname.includes('/about') ? ' active' : ''}`}>About</Link>
            </div>
          </div>
        </header>
        <main className="container">
          {children}
        </main>
        <footer>© 2019 DucDV. All rights reserved.</footer>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  pathname: PropTypes.string,
}

export default Layout
