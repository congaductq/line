import React, { Component } from 'react'
import '~/static/less/index.less'
import PropTypes from 'prop-types'
import Layout from '../Layout'
import SearchBox from './Searchbox/SearchBox'
import List from './List'

class Homepage extends Component {
  render() {
    const { location: { pathname } } = this.props
    return (
      <Layout pathname={pathname}>
        <SearchBox />
        <List />
      </Layout>
    )
  }
}

Homepage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default Homepage
