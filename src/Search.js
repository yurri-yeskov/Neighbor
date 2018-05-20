import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {

  // Typechecking with PropTypes
  static propTypes = {
    locations: PropTypes.array.isRequired,
    onClickLink: PropTypes.func.isRequired
  }

  
  handleLink(e, location) {
    e.preventDefault()
    this.props.onClickLink(location)
  }

  render() {
    return (
      <nav>
        <h1>Neighborhood Map</h1>
        <ul>
          {this.props.locations.map( (location) => (
            <li key={location.title}><a href="#" onClick={ (e) => this.handleLink(e, location) }>{location.title}</a></li>
          ) )}
        </ul>
      </nav>
    )
  }
}

export default Search