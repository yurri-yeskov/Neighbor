import React, { Component } from 'react'
import Maps from './Maps.js'
import Search from './Search.js'
import foursquaredata from './foursquaredata.json'
import Hamburger from './Hamburger.js'

class App extends Component {

state = {
    locations: foursquaredata,
    locationClicked: {},
    locationsSearch: [],
    hamburger: '',
    isSearchOn: false
  }

  locationClick = (location) => {
    this.setState( (prevState) => {
      return { locationClicked: location}
    })
  }

  /**
  * @description Set state with queried locations form search form
  * @param {array} locations - List of all queried locations
  */
  searchedLocationsList = (locations) => {
    this.setState( (prevState) => {
      return { locationsSearch: locations}
    })
  }

  /**
  * @description Set state with queried locations form search form
  * @param {bool} boolean - If search is active, set to true, false otherwise
  */
  isSearchActive = (boolean) => {
    this.setState( {isSearchOn: boolean})
  }

  /**
  * @description Close infowindow sets locationClicked props to {}
  */
  resetVenue = () => {
    this.setState( (prevState) => {
      return { locationClicked: {}}
    })
  }

  hamburgerHide(ishidden) {
    console.log("click")
    if (!ishidden){
      this.setState({hamburger: ''})
    }else{
      this.setState({hamburger: 'hide'})
    }
  }

  render() {
    //console.log(this.state.locations.response.items)
    return (
      <main>
        <Hamburger 
          hamburger={(ishidden) => {
            this.hamburgerHide(ishidden)
          }}
        />
        <Search 
          locations={this.state.locations.response.items}
          hamburger={this.state.hamburger}
          onClickLink={(location) => {
            this.locationClick(location)
          }}
          searchedLocations={(locations) => {
            this.searchedLocationsList(locations)
          }}
          isSearch={(boolean) => {
            this.isSearchActive(boolean)
          }}
        />
        <Maps 
          locations={this.state.locations.response.items}
          allSearchedLocations={this.state.locationsSearch}
          isSearchTrue={this.state.isSearchOn}
          locationClicked={this.state.locationClicked}
          resetLastVenue={(location) => {
            this.resetVenue(location)
          }}
        />
      </main>
    )
  }
}

export default App
