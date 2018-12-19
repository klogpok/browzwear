import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends React.Component {
  render() {
    const style = {
      width: '395px',
      height: '300px'
    };

    const { lat, lng } = this.props.center;

    return (
      <Map
        google={this.props.google}
        zoom={17}
        style={style}
        initialCenter={{
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }}
        center={{
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }}
      >
        <Marker
          title={this.props.title}
          name={this.props.title}
          position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA0ZHLcOBxzpUPL4MIWdiULswTOwNx774g'
})(MapContainer);
