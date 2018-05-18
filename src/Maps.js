/* global google */
import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'
import PropTypes from 'prop-types'

class Maps extends Component {

  // Typechecking with PropTypes
  static propTypes = {
    locations: PropTypes.array.isRequired,
    locationClicked: PropTypes.object.isRequired
  }


  /* KAKO DA POVEZEM MAPS.JS SA STATE.LOCATIONCLICKED??????????????????*/

  state ={
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
    ]
  }

  populateInfoWindow = (marker, infowindow) => {
    // Check if infowindow is not alredy open
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(this.state.map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      // infowindow.addListener('closeclick', () => {
      //   console.log(infowindow)
      //   infowindow.close();
      // });
    }
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.state.map = new google.maps.Map(this.refs.map, {
          center: {lat: 10.794234, lng: 106.706541},
          zoom: 13,
          styles: this.state.styles
        });

        let largeInfoWindow = new google.maps.InfoWindow();
        let bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < this.props.locations.length; i++) {
          let position = this.props.locations[i].location;
          
          let title = this.props.locations[i].title;

          let marker = new google.maps.Marker({
            map: this.state.map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          this.state.markers.push(marker);
          bounds.extend(marker.position);
          marker.addListener('click', () => {
            this.populateInfoWindow(marker, largeInfoWindow)
          });
        }
        this.state.map.fitBounds(bounds);
      }
      else this.props.onError()
    }
  }

  render(){
    return (    
    <div>
      <div id="map" ref="map"></div>
      { !this.state.map && <div className="center-md">Loading...</div> } 
    </div>
    )
  }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyA3COE3YJ53eoghxYryS0CH--oI17Jphd4"]
)(Maps)