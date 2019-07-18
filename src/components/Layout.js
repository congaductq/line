import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Layout extends Component {
  render() {
    const { children, pathname } = this.props
    return (
      <div>
        <header>
          <div className="tms-nav container">
            <Link to="/" className="tms-logo">TRUM</Link>
            <div className="tms-nav-bar">
              <Link to="/" className={`tms-nav-item ${(new RegExp('^/[0-9]+$|/$')).test(pathname) ? ' active' : ''}`}>Truck List</Link>
              <Link to="/about" className={`tms-nav-item ${pathname && pathname.includes('/about') ? ' active' : ''}`}>About</Link>
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
