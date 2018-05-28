import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {DebounceInput} from 'react-debounce-input'


class Search extends Component {

  // Typechecking with PropTypes
  static propTypes = {
    locations: PropTypes.array.isRequired,
    onClickLink: PropTypes.func.isRequired,
    hamburger:PropTypes.string.isRequired
  }

  state = {
    locations: [],
    search: false
  }

  
  handleLink(e, location) {
    e.preventDefault()
    this.props.onClickLink(location)
  }

  /**
  * @description If is a match, sets state.loactions to [] and push all matched locations
  * @param {string} value - Value of search input
  */
  searchPlaces(value) {
    this.setState({locations: []})
    if (value) {
      console.log(this.state.locations)
      const regex = new RegExp( value, 'i' )
      this.props.locations.map( location => {
        if(location.venue.name.match(regex)) {
          this.setState((prevState) => {

            locations: prevState.locations.push(location)
          })
        }
      })
      this.setState({search: true})
    }else {
      this.resetStateLocations()
      this.setState({search: false})

    }
  }

  
  locationsMap() {

    console.log(this.state.locations)
    return [ this.state.locations.map( (location) => (
      <li key={location.venue.id}><a href="#" onClick={ (e) => this.handleLink(e, location.venue) }>{location.venue.name}</a></li>
    )) ]
  }

  /**
  * @description Set all locations from props.locations
  */
  resetStateLocations() {
    this.setState({locations: this.props.locations })
  }

  

  render() {
    // Holds search query
    let searchQuery
    
    return (
      <nav id="nav" className={this.props.hamburger}>
        <h1>Neighborhood Golf Map</h1>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          autoFocus
          placeholder=" Search..."
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