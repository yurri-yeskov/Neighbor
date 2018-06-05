import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Hamburger extends Component {

   // Typechecking with PropTypes
  static propTypes = {
    hamburger: PropTypes.func.isRequired,
  }

  hamburger = () => {
    this.props.hamburger(true)
  }

  render() {
    return (
      <div className="hamburger" onClick={this.hamburger}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    )
  }
}

export default Hamburger