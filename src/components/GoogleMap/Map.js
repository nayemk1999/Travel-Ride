import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Component } from 'react';

export class GoogleMap extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14}>
                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyB6BYGowWlDfflWP9pH5-TTs0n_hOKtcDc")
})(GoogleMap)