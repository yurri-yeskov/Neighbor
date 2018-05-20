import React, { Component } from 'react'
import Maps from './Maps.js'
import Search from './Search.js'
class App extends Component {

state = {
    locations: [
      {title: 'La Metro RedLine', description: 'La Metro RedLine / North Hollywood Station', location: {lat:34.1689208, lng: -118.3767172}},
      {title: 'Mulholland Scenic Overview', description: 'Scenic Lookout', location: {lat:34.1335677, lng: -118.410631}},
      {title: 'Salt & Straw', description: 'Ice Cream Shop', location: {lat:34.1432587, lng: -118.3978998}},
      {title: 'Mendocino Farms', description: 'Sandwich Place', location: {lat:34.1497189, lng: -118.4412726}},
      {title: 'MidiCi, The Neapolitan Pizza', description: 'Pizza Restaurant', location: {lat:34.1511962, lng: -118.4515353}}
    ],
    locationClicked: {}
  }

  foursquareAPI() {
    // Foursquare API
    const request = require('request');

    request({
      url: 'https://api.foursquare.com/v2/venues/explore',
      method: 'GET',
      qs: {
        client_id: 'FTXP4WO54K05G1TYHCWIQYBH5OQRIG4SMSZBXYBV4MJWIZRT',
        client_secret: 'C5HM10QZKYCGJZ2NILFVTSK2PF03C1WB0OIEC3CXX3KAAPDA',
        ll: '34.1657053, -118.3970014',
        query: 'golf',
        v: '20180323',
        limit: 15
      }
    }, function(err, res, body) {
      if (err) {
        console.error(err)
      } else {
        let obj = JSON.parse(body)
        console.log(obj.response.groups["0"].items["0"].venue)

      }
    })
    
  }

  locationClick = (location) => {
    this.setState( (prevState) => {
      return { locationClicked: location}
    })
  }

  render() {
    this.foursquareAPI()
    return (
      <main>
        <Search 
          locations={this.state.locations}
          onClickLink={(onClickLink) => {
            this.locationClick(onClickLink)
          }
          }
        />
        <Maps 
          locations={this.state.locations}
          locationClicked={this.state.locationClicked}
        />
      </main>
    )
  }
}

export default App
