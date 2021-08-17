import React, { useRef, useEffect, useState } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import { dataLayer, dataLayerHightLight } from './map-style';
import ControlPanel from './ControlPanel';
import Legend from './Legend';
import mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2h1Y2swNTIwIiwiYSI6ImNrMDk2NDFhNTA0bW0zbHVuZTk3dHQ1cGUifQ.dkjP73KdE6JMTiLcUoHvUA';

const Map = ({ weightsDone, data }) => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-88.4);
	const [lat, setLat] = useState(27.8);
	const [zoom, setZoom] = useState(5.5);

	const [ viewport, setViewport ] = useState({
		// latitude: 27.8,
		// longitude: -88.4,
		// zoom: 6,
		latitude:lat,
		longitude:lng,
		zoom: zoom,
		bearing: 0,
		pitch: 0
	});
	
	const [ filter, setFilter ] = useState([ 'in', 'OBJECTID', '' ]);
	const [ hoverInfo, setHoverInfo ] = useState(null);
	
	const onHover = (e) => {
		// console.log(viewport);
		if (viewport.zoom >= 10) {
			let objectId = '';
			let hoveredInfo = null;
			
			if (e.features) {
				
					const hexagonHovered = e.features[0];
					if (hexagonHovered) {
						hoveredInfo = {
							hexagon: hexagonHovered.properties
						};
						objectId = hexagonHovered.properties.OBJECTID;
					}
					
			}
			setHoverInfo(hoveredInfo);
			setFilter([ 'in', 'OBJECTID', objectId ? objectId:"" ]);
			let windowContent = document.getElementById("floatingWindow");
			windowContent.style.display = 'none';
		}
	};
	
	const onViewStateChange = (e) => {
		// console.log(e);
		let windowContent = document.getElementById("floatingWindow");
		// let popupWindow = document.getElementsByClassName("map.tooltip");
		windowContent.style.display = 'block';
		// console.log(popupWindow);
		if (e.viewState.zoom >= 10) {
			windowContent.innerHTML = "<p>Click to explore the details of a single hexagonal area.</p>"
									+"<p>Current zoom level :"
									+e.viewState.zoom.toFixed(1)+"</p>"
		}
		else {
			windowContent.innerHTML = "<p>Please zoom in to level 10 to explore the details of a single hexagonal area.</p>"
									+"<p>Current zoom level :"
									+e.viewState.zoom.toFixed(1)+"</p>"
		}
	}

	return (
		<MapGL
			{...viewport}
			style={{ position: 'fixed' }}
			width="100vw"
			height="100vh"
			showZoom={true}
			mapStyle="mapbox://styles/mapbox/dark-v9"
			// onViewportChange={(nextViewport) => setViewport(nextViewport)}
			onViewportChange={setViewport}
			onViewStateChange={onViewStateChange}
			mapboxApiAccessToken={MAPBOX_TOKEN}
			onClick={onHover}
			// onHover={onHover}
		>
			{weightsDone && (
				<>
				<Source type="vector" url="mapbox://chuck0520.09krrv10" maxzoom={22} minzoom={0}>
					<Layer
						{...dataLayer}
						paint={{
							'fill-color': data,
							'fill-opacity': [ 'case', [ 'boolean', [ 'feature-state', 'hover' ], false ], 1, 0.5 ]
						}}
					/>
					<Layer {...dataLayerHightLight} filter={filter} />
				</Source>
				<ControlPanel hoverInfo={hoverInfo?hoverInfo:{hexagon:{}}}></ControlPanel>
				<Legend></Legend>
				</>
			)}
		</MapGL>
	);
};

export default Map;
