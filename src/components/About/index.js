import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../Layout'
import '~/static/less/about.less'

class About extends Component {
  render() {
    const { location: { pathname } } = this.props
    return (
      <Layout pathname={pathname}>
        <div className="about-container">
          <div className="about-content">
            <h1 className="about-title">TRUM</h1>
            <h5 className="about-sub-title">Truck Management System</h5>
            <div className="about-description">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random text.
                It has roots in a piece of classical Latin literature from 45 BC,
                making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.
              </p>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

About.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default About
