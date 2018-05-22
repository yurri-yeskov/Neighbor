import React, { Component } from 'react'
import Maps from './Maps.js'
import Search from './Search.js'
import foursquaredata from './foursquaredata.json'
class App extends Component {

state = {
    locations: foursquaredata,
    locationClicked: {},
    data: []
  }

  locationClick = (location) => {
    this.setState( (prevState) => {
      return { locationClicked: location}
    })
  }

  render() {
    //console.log(this.state.locations.response.items)
    return (
      <main>
        <Search 
          locations={this.state.locations.response.items}
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
