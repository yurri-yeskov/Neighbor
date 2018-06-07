/* global google */
import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'
import PropTypes from 'prop-types'

class Maps extends Component {

  // Typechecking with PropTypes
  static propTypes = {
    locations: PropTypes.array.isRequired,
    locationClicked: PropTypes.object.isRequired,
    allSearchedLocations: PropTypes.array.isRequired, // List of all queried locations
    isSearchTrue: PropTypes.bool.isRequired // True if search is active, false otherwise
  }

  /**
  * @property {array} this.state.markers - Array of all markers
  * @property {object} this.state.map - Google Map
  * @property {array} this.state.styles - Array of Google Map styles
  * @property {object} this.state.largeInfoWindow - Google Maps InfoWindow
  */
  state = {
    markers: [],
    map: {},
    styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
    ],
    largeInfoWindow: null
  }

  /**
  * @description Update markers and activate infowindow
  */
  componentDidUpdate(prevProps, prevState) {
    //console.log("componentDidUpdate")
    //console.log(this.props.allSearchedLocations)
    if (this.props.isSearchTrue) {
      //console.log(this.state.markers)
      this.hideMarkers(this.props.allSearchedLocations, this.state.markers)
    }

    if (!this.props.isSearchTrue) {
      this.showAllMarkers(this.state.markers)
    }

    this.state.markers.map( (marker) => {
      if (marker.title === this.props.locationClicked.name) {
        this.toggleBounce(marker)
        return this.populateInfoWindow(marker, this.state.largeInfoWindow)
      }
    })
  }

  /**
  * @description Show only markers in the search
  * @param {array} allSearchedLocations - List of all queried locations
  * @param {array} allMarkers - List of all markers on map
  */
  hideMarkers(allSearchedLocations, allMarkers) {
    this.hideAllMarkers(allMarkers)
    allMarkers.map((marker) => {
      //console.log(allSearchedLocations)
      allSearchedLocations.map((allLocations) => {
        //console.log(allLocations.venue)
        
        if (marker.getTitle() === allLocations.venue.name) {
          if(!marker.setMap()) {
            marker.setMap(this.state.map)
          }
        }
      })
    })
  }

  /**
  * @description Hide all markers on map
  * @param {array} allMarkers - List of all markers on map
  */
  hideAllMarkers(allMarkers) {
    allMarkers.map((marker) => {
      marker.setMap(null)
    })
  }

  /**
  * @description Show all markers on map
  * @param {array} allMarkers - List of all markers on map
  */
  showAllMarkers(allMarkers) {
    allMarkers.map((marker) => {
      marker.setMap(this.state.map)
    })
  }

  populateInfoWindow = (marker, infowindow) => {
    infowindow.marker = marker
    fetch(`https://api.foursquare.com/v2/venues/${marker.id}?client_id=FTXP4WO54K05G1TYHCWIQYBH5OQRIG4SMSZBXYBV4MJWIZRT&client_secret=BAGGZ43LJJOH0OFFAEH3I0PRYL2THBLEYYT3L2PYSEWR1UAX&v=20180523`, {})
      .then(response => response.json())
      .then(data => {
        infowindow.setContent( `<section class="infowindow">
                                  <h2>${data.response.venue.name}</h2>
                                  <div class="addressInfowindow">${this.address(data.response.venue)}</div>
                                  <div class="descriptionInfowindow">${this.description(data.response.venue)}</div>
                                  <div class="imgInfowindow"><img src="https://igx.4sqi.net/img/general/250x250${data.response.venue.bestPhoto.suffix}" alt="${data.response.venue.name}"></div>
                                  <nav><a href="${data.response.venue.canonicalUrl}"  target="_blank"><i class="fab fa-foursquare fa-lg"></i> See details on foursquare</a></nav>
                                </section>`)
        infowindow.open(this.state.map, marker)
      }
    )
    .catch(error => {
      infowindow.setContent( `<section>
                                <h1>Data can not load at this time!</h1>
                                <div>${error}</div>
                              </section>`)
    })
  }

  /**
  * @description Set description of venue in infowindow
  */
  description(venue) {
    if (venue.description) {
      return `${venue.description}`
    }else {
      return ``
    }
  }

  /**
  * @description Set venue location in infowindow
  */
  address(venue) {
    if (venue.location.address &&
      venue.location.city &&
      venue.location.postalCode &&
      venue.location.state) {
        return `<div id="location">${venue.location.address}, ${venue.location.city}</div>
                <div>Zip Code ${venue.location.postalCode}, ${venue.location.state}</div>`
    }else {
      return venue.location.formattedAddress
    }
  }

  /**
  * @description Marker bounce animation 
  */
  toggleBounce(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE)
    // to bounce only once
    setTimeout(function(){ marker.setAnimation(null) }, 700)
  }

  /**
  * @description Add all markers to infowindow and fit bounds
  */
  addMarkers() {
    let largeInfoWindow = new google.maps.InfoWindow()
    this.setState((prevState) => {
      return { largeInfoWindow: largeInfoWindow }
    })
    let bounds = new google.maps.LatLngBounds()
    for (var i = 0; i < this.props.locations.length; i++) {
      let lat = this.props.locations[i].venue.location.lat
      let lng = this.props.locations[i].venue.location.lng
      
      let title = this.props.locations[i].venue.name

      let marker = new google.maps.Marker({
        icon: "http://maps.google.com/mapfiles/kml/pal2/icon5.png",
        map: this.state.map,
        position: {lat:lat, lng: lng},
        title: title,
        animation: google.maps.Animation.DROP,
        id: this.props.locations[i].venue.id
      })
      this.state.markers.push(marker)
      bounds.extend(marker.position)
      marker.addListener('click', () => {
        this.toggleBounce(marker)
        this.populateInfoWindow(marker, this.state.largeInfoWindow)
      })
      // Click on map closes infowindow
      google.maps.event.addListener(this.state.map, "click", e => {
        largeInfoWindow.close()
        this.resetLastClickedVenue()
      })
      // Click on close button closes infowindow
      google.maps.event.addListener(largeInfoWindow,'closeclick',() => {
        this.resetLastClickedVenue()
      });
    }
    this.state.map.fitBounds(bounds)
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.state.map = new google.maps.Map(this.refs.map, {
          center: {lat: 34.1657053, lng: -118.3970014},
          zoom: 13,
          fullscreenControl: false, // Fullscreen button disabled
          styles: this.state.styles
        })
        this.addMarkers()
       
      }
      else this.props.onError()
    }
  }

  /**
  * @description Close infowindow sets locationClicked props to {}
  */
  resetLastClickedVenue() {
    this.props.resetLastVenue()
  }

  render(){
    return (    
    <div id="mapContainer">
      <div id="map" ref="map"></div>
      { !this.state.map && <div className="center-md">Loading...</div> } 
    </div>
    )
  }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyA3COE3YJ53eoghxYryS0CH--oI17Jphd4"]
)(Maps)