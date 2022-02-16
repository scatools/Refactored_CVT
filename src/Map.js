import React, { useRef, useEffect, useState } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import { defaultLayer, dataLayer, dataLayerHightLight } from "./map-style";
import ControlPanel from "./ControlPanel";
import Legend from "./Legend";
import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiY2h1Y2swNTIwIiwiYSI6ImNrMDk2NDFhNTA0bW0zbHVuZTk3dHQ1cGUifQ.dkjP73KdE6JMTiLcUoHvUA";

const Map = ({ weightsDone, data, setHoverInfo }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-88.4);
  const [lat, setLat] = useState(27.8);
  const [zoom, setZoom] = useState(5.5);

  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: zoom,
    bearing: 0,
    pitch: 0,
  });

  const [filter, setFilter] = useState(["in", "OBJECTID", ""]);

  const onHover = (e) => {
    // console.log(viewport);
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
            // console.log(i);
            // console.log(typeof i);
            if (
              i.includes("cl") ||
              i.includes("eco") ||
              i.includes("hab") ||
              i.includes("lcmr") ||
              i.includes("wq")
            ) {
              // i is string type so this won't work
              //hoveredInfo.hexagon.i = hoveredInfo.hexagon.i.toFixed(2);
              // instead this works
              hoveredInfo.hexagon[i] = hoveredInfo.hexagon[i].toFixed(2);
            }
          }
          objectId = hexagonHovered.properties.OBJECTID;
        }
      }
      setHoverInfo(hoveredInfo);
      setFilter(["in", "OBJECTID", objectId ? objectId : ""]);

      // These won't work
      // let popupWindow = document.getElementById("popupWindow");
      // let popupWindow = document.getElementsByTagName("ControlPanel")[0];
      let popupWindow = document.getElementsByClassName("control-panel")[0];
      if (popupWindow) {
        popupWindow.style.display = "initial";
      }
      let windowContent = document.getElementById("floatingWindow");
      windowContent.style.display = "none";
    }
  };

  const onViewStateChange = (e) => {
    // console.log(e);
    let popupWindow = document.getElementsByClassName("control-panel")[0];
    if (popupWindow) {
      popupWindow.style.display = "none";
    }
    let windowContent = document.getElementById("floatingWindow");
    windowContent.style.display = "block";
    if (e.viewState.zoom >= 10) {
      windowContent.innerHTML =
        "<p><em>Click to explore the details of a single hexagonal area.</em></p>" +
        "<p>Current zoom level : " +
        e.viewState.zoom.toFixed(1) +
        "</p>";
    } else {
      windowContent.innerHTML =
        "<p><em>Please zoom in to level 10 to explore the details of a single hexagonal area.</em></p>" +
        "<p>Current zoom level : " +
        e.viewState.zoom.toFixed(1) +
        "</p>";
    }
  };

  return (
    <MapGL
      {...viewport}
      style={{ position: "fixed" }}
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
                  0.5,
                ],
              }}
            />
            <Layer {...dataLayerHightLight} filter={filter} />
          </Source>

          <Legend></Legend>
        </>
      )}
    </MapGL>
  );
};

export default Map;
