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
          onClickLink={(onClickLink) => {
            this.locationClick(onClickLink)
          }}
        />
        <Maps 
          locations={this.state.locations.response.items}
          locationClicked={this.state.locationClicked}
        />
      </main>
    )
  }
}

export default App
