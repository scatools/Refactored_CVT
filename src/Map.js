import React, { useRef, useEffect, useState } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import { defaultLayer, dataLayer, dataLayerHightLight } from "./map-style";
import Legend from "./Legend";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiY2h1Y2swNTIwIiwiYSI6ImNrMDk2NDFhNTA0bW0zbHVuZTk3dHQ1cGUifQ.dkjP73KdE6JMTiLcUoHvUA";

const Map = ({ weightsDone, data, zoom, setZoom, opacity, setHoverInfo, setImageURL, setInstruction, mapRef }) => {
  const [lng, setLng] = useState(-88.4);
  const [lat, setLat] = useState(27.8);

  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: zoom,
    bearing: 0,
    pitch: 0,
  });

  const [filter, setFilter] = useState(["in", "OBJECTID", ""]);

  const onLoad = (e) => {
    setImageURL(e.target.getCanvas().toDataURL());
  };

  const onClick = (e) => {
    if (viewport.zoom >= 10) {
      let objectId = "";
      let hoveredInfo = null;

      if (e.features) {
        const hexagonHovered = e.features[0];
        if (hexagonHovered) {
          hoveredInfo = {
            hexagon: hexagonHovered.properties,
          };

          for (var i in hoveredInfo.hexagon) {
            if (
              i.includes("cl") ||
              i.includes("eco") ||
              i.includes("hab") ||
              i.includes("lcmr") ||
              i.includes("wq")
            ) {
              hoveredInfo.hexagon[i] = hoveredInfo.hexagon[i].toFixed(2);
            }
          }
          objectId = hexagonHovered.properties.OBJECTID;
        }
      }
      setHoverInfo(hoveredInfo);
      setFilter(["in", "OBJECTID", objectId ? objectId : ""]);

      let popupWindow = document.getElementsByClassName("control-panel")[0];
      if (popupWindow) {
        popupWindow.style.display = "initial";
      };
    };
  };

  const onViewStateChange = (e) => {
    setZoom(e.viewState.zoom.toFixed(1));
    let popupWindow = document.getElementsByClassName("control-panel")[0];
    if (popupWindow) {
      popupWindow.style.display = "none";
    };
  };

  useEffect(() => {
    if (zoom >= 10) {
      setInstruction("Click to explore the details of a single hexagonal area.");
    } else {
      setInstruction("Please zoom in to level 10 to explore the details of a single hexagonal area.");
    };
  }, [zoom]);

  return (
    <MapGL
      {...viewport}
      ref={mapRef}
      style={{ position: "fixed" }}
      width="100vw"
      height="100vh"
      showZoom={true}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      // onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onViewportChange={setViewport}
      onViewStateChange={onViewStateChange}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      preserveDrawingBuffer={true}
      onLoad={onLoad}
      onClick={onClick}
    >
      <Source
        type="vector"
        url="mapbox://chuck0520.bardd4y7"
        maxzoom={22}
        minzoom={0}
      >
        <Layer {...defaultLayer} />
      </Source>
      {weightsDone && (
        <>
          <Source
            type="vector"
            url="mapbox://chuck0520.2jhtgjk6"
            maxzoom={22}
            minzoom={0}
          >
            <Layer
              {...dataLayer}
              paint={{
                "fill-color": data,
                "fill-opacity": [
                  "case",
                  ["boolean", ["feature-state", "hover"], false],
                  1,
                  parseInt(opacity)/100,
                ],
              }}
            />
            <Layer {...dataLayerHightLight} filter={filter} />
          </Source>
          <Legend opacity={opacity}></Legend>
        </>
      )}
    </MapGL>
  );
};

export default Map;
