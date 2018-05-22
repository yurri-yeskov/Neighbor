import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {DebounceInput} from 'react-debounce-input'

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

  searchPlaces(value) {
    


    console.log(value)
    if (value) {
      this.props.locations.map( location => {

      })
    }
   }



  render() {
    // Holds search query
    let searchQuery

    return (
      <nav>
        <h1>Neighborhood Map</h1>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          autoFocus
          placeholder=" Search..."
          value={searchQuery}
          onChange={(event) => this.searchPlaces(event.target.value)}
        />
        <ul>
          {this.props.locations.map( (location) => (
            <li key={location.venue.id}><a href="#" onClick={ (e) => this.handleLink(e, location.venue) }>{location.venue.name}</a></li>
          ) )}
        </ul>
      </nav>
    )
  }
}

export default Search