import React, { Component } from 'react'
import Maps from './Maps.js'
import Search from './Search.js'
import foursquaredata from './foursquaredata.json'
import Hamburger from './Hamburger.js'

class App extends Component {

state = {
    locations: foursquaredata,
    locationClicked: {},
    data: [],
    hamburger: ''
  }

  locationClick = (location) => {
    this.setState( (prevState) => {
      return { locationClicked: location}
    })
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
        />
        <Maps 
          locations={this.state.locations.response.items}
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
