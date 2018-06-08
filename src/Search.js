import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {DebounceInput} from 'react-debounce-input'


class Search extends Component {

  // Typechecking with PropTypes
  static propTypes = {
    locations: PropTypes.array.isRequired,
    onClickLink: PropTypes.func.isRequired,
    hamburger:PropTypes.bool.isRequired,  // show or hide, use to change css class
    searchedLocations: PropTypes.func.isRequired,
    isSearch: PropTypes.func.isRequired     // True if search is active, false otherwise
  }

  /**
  * @property {array} this.state.locations - All locations that match search query
  * @property {boolean} this.state.search - True if search query is active, false otherwise
  */
  state = {
    locations: [],
    search: false
  }

  
  handleLink(e, location) {
    console.log(this.state.locations, "searchPlaces")
    e.preventDefault()
    this.props.onClickLink(location)
  }
  
  /**
  * @description If is a match, sets state.loactions to [] and push all matched locations
  * @param {string} value - Value of search input
  */
  searchPlaces(value) {
    console.log(this.state.locations, "searchPlaces")
    this.setState({locations: []})
    if (value) {
      
      const regex = new RegExp( value, 'i' )
      this.props.locations.map( location => {
        if(location.venue.name.match(regex)) {
          this.setState((prevState) => {

            prevState.locations.push(location)
          })
        }
      })
      this.props.searchedLocations(this.state.locations) // Send searched locations to Map component
      this.props.isSearch(true)
      this.setState({search: true})
    }else {
      this.resetSearchLocations()
      this.setSearchToEmpty()
      this.props.isSearch(false)
      this.setState({search: false})

    }
  }

  /**
  * @description Renders list with all searched locations
  */
  locationsMap() {
    console.log(this.state.locations, "locationsMap()")
    return [ this.state.locations.map( (location) => (
      <li key={location.venue.id}><a href="#" onClick={ (e) => this.handleLink(e, location.venue) }>{location.venue.name}</a></li>
    )) ]
  }

  /**
  * @description Set all default locations from props.locations
  */
  resetSearchLocations() {
    this.setState({locations: this.props.locations })
  }

  /**
  * @description Set searched locations to empty
  */
  setSearchToEmpty() {
    this.props.searchedLocations([])
  }

  

  render() {
    // Holds search query
    let searchQuery

    let slideEffect = (!this.props.hamburger) ? 'menu-slide-left' : 'menu-slide-right'
    
    return (
      <nav id="nav" className={slideEffect}>
        <h1>Neighborhood Golf Map</h1>
        <p>Map shows golf courses in my area in 7km radius. App uses Foursquare data</p>
        <label htmlFor="search">Search: </label>
        <DebounceInput
          minLength={2}
          name="search"
          debounceTimeout={300}
          autoFocus
          placeholder=" Search for golf courses"
          value={searchQuery}
          onChange={(event) => this.searchPlaces(event.target.value)}
        />
        <ul id="searchMenu">
          {(!this.state.search) ?
          this.props.locations.map( (location) => (
                <li key={location.venue.id}><a href="#" onClick={ (e) => this.handleLink(e, location.venue) }>{location.venue.name}</a></li>
              )) : this.locationsMap()
          }
        </ul>
      </nav>
    )
  }
}

export default Search