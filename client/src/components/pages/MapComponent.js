import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import BathroomTile from '../modules/BathroomTile.js';
import BathroomList from '../modules/BathroomList.js';

class MapComponent extends Component {
	constructor(props) {
        super(props);
        this.state = {
            bn : null,
            bathdict : {}
        };
    }

    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhemVjIiwiYSI6ImNqcjg5OG82ZDAzY200NG5xdGt6OXY2M2gifQ.gWaiUiYVeb4vpxBMRLA9Wg';
        var map = new mapboxgl.Map({
            container: 'map', // container id
            center: [-71.09, 42.3600], // starting position [lng, lat]
            zoom: 15.5, // starting zoom
						style: 'mapbox://styles/blazec/cjrh7uxlo19il2spmiqz8k354',
						pitch: 45,
						bearing: -17.6,

        });

				map.on('load', function() {
					// Insert the layer beneath any symbol layer.
					var layers = map.getStyle().layers;

					var labelLayerId;
					for (var i = 0; i < layers.length; i++) {
					if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
					labelLayerId = layers[i].id;
					break;
					}
					}

					map.addLayer({
					'id': '3d-buildings',
					'source': 'composite',
					'source-layer': 'building',
					'filter': ['==', 'extrude', 'true'],
					'type': 'fill-extrusion',
					'minzoom': 15,
					'paint': {
					'fill-extrusion-color': '#aaa',

					// use an 'interpolate' expression to add a smooth transition effect to the
					// buildings as the user zooms in
					'fill-extrusion-height': [
					"interpolate", ["linear"], ["zoom"],
					15, 0,
					15.05, ["get", "height"]
					],
					'fill-extrusion-base': [
					"interpolate", ["linear"], ["zoom"],
					15, 0,
					15.05, ["get", "min_height"]
					],
					'fill-extrusion-opacity': .6
					}
					}, labelLayerId);
					});





      var onClick = (e) => {
          var features = map.queryRenderedFeatures(e.point, {
              layers: ['mit-buildings'] // replace this with the name of the layer
          });
          if(this.state.bn != features[0].properties.name){
              var tempname = features[0].properties.name;
              console.log("adkjflaskjdf" + tempname);
              this.setState({
                  bn: tempname,
                  bathdict: Object.assign({}, this.state.bathdict, {[tempname]: <BathroomList n={features[0].properties.name}/>})
              });
          }
          //console.log(features[0].properties.name);
      };
      map.on('click', onClick);
  }

    render() {
        console.log("aaaaaaaa");
        //const isLoggedIn = this.props.userInfo !== null;
        console.log(this.state.bn);
        console.log(this.state.bathdict);
        return (
            <div>
                {/* <BathroomTile name="helo"/> */}
                <div id='map'></div>
                {this.state.bathdict[this.state.bn]}
            </div>
        );
    }


}


export default MapComponent;
