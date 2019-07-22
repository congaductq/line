import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../Layout'
import '~/static/less/about.less'
import { DRIVER_MIN_BORN_YEAR, DRIVER_MAX_BORN_YEAR } from '~/constants/driver'
import { TRUCK_MIN_PROD_YEAR, TRUCK_MAX_PROD_YEAR } from '~/constants/truck'

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
                Truck Management System is a transportation business management software.
                TRUM make all management task is easy and fast.
              </p>
              <p>
                Truck data:
              </p>
              <ul>
                <li>
                  Truck Plate is unique, must be Vietnamese car&apos;s plate format (without dot).
                  &nbsp;
                  <i>e.g: 22B-11425, 30E-4215.</i>
                </li>
                <li>One driver can handle multiple trucks, but one truck is only belongs to one driver (or not assigned) at the same time.</li>
                <li>
                  Production year range is from
                  {` ${TRUCK_MIN_PROD_YEAR} to ${TRUCK_MAX_PROD_YEAR}.`}
                </li>
                <li>Cargo type must be less than or equal 10 types.</li>
                <li>Address must be less than or equal 500 characters.</li>
                <li>Description must be less than or equal 200 characters.</li>
              </ul>
              <p>Driver data:</p>
              <ul>
                <li>Driver&apos;s name must be less than or equal 50 characters.</li>
                <li>
                  Driver&apos;s year of born must be between
                  {` ${DRIVER_MIN_BORN_YEAR} and ${DRIVER_MAX_BORN_YEAR}.`}
                </li>
                <li>License ID must be less than or equal 15 characters.</li>
                <li>Address must be less than or equal 500 characters.</li>
                <li>Note must be less than or equal 200 characters.</li>
                <li>Remove a driver or set driver&apos;s status to Inactive/Has left will remove this driver from related data.</li>
              </ul>
              <p>Cargo Type data:</p>
              <ul>
                <li>Name is unique, must be less than or equal 50 characters.</li>
                <li>Description must be less than or equal 200 characters.</li>
                <li>Note must be less than or equal 200 characters.</li>
                <li>Remove a cargo type or set cargo type&apos;s status to Inactive will remove this cargo type from related data.</li>
              </ul>
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
