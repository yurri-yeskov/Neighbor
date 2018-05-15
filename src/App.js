import React, { Component } from 'react'
import Maps from './Maps.js'
class App extends Component {

  state = {
    locations: [
      {title: 'La Metro RedLine', description: 'La Metro RedLine / North Hollywood Station', location: {lat:34.1689208, lng: -118.3767172}},
      {title: 'Mulholland Scenic Overview', description: 'Scenic Lookout', location: {lat:34.1335677, lng: -118.410631}},
      {title: 'Salt & Straw', description: 'Ice Cream Shop', location: {lat:34.1432587, lng: -118.3978998}},
      {title: 'Mendocino Farms', description: 'Sandwich Place', location: {lat:34.1497189, lng: -118.4412726}},
      {title: 'MidiCi, The Neapolitan Pizza', description: 'Pizza Restaurant', location: {lat:34.1511962, lng: -118.4515353}}
    ]
  }

  render() {
    return (
      <main>
        <nav>
          <h1>Neighborhood Map</h1>
          <ul>
            
          </ul>
        </nav>
        <Maps />
      </main>
    );
  }
}

export default App
