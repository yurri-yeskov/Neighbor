/* global google */
import React from 'react'
import scriptLoader from 'react-async-script-loader'

class Maps extends React.Component {

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.map = new google.maps.Map(this.refs.map, {
          center: {lat: 10.794234, lng: 106.706541},
          zoom: 13
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            this.map.setCenter(pos);

            const marker = new google.maps.Marker({
              position: pos,
              map: this.map,
              title: 'Hello World!'
            });                
          }, () => {
            console.log('navigator disabled');
          });
        } else {
          // Browser doesn't support Geolocation
          console.log('navigator disabled');
        }
      }
      else this.props.onError()
    }
  }

  render(){
    return (    
    <div>
      <div id="map" ref="map"></div>
      { !this.map && <div className="center-md">Loading...</div> } 
    </div>
    )
  }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyA3COE3YJ53eoghxYryS0CH--oI17Jphd4"]
)(Maps)