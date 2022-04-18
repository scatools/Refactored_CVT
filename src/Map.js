import React, { useRef, useEffect, useState } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import MultiSwitch from "react-multi-switch-toggle";
import { Button } from "react-bootstrap";
import { FiMap } from "react-icons/fi";
import { defaultLayer, dataLayer, dataLayerHightLight } from "./map-style";
import Legend from "./Legend";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiY2h1Y2swNTIwIiwiYSI6ImNrMDk2NDFhNTA0bW0zbHVuZTk3dHQ1cGUifQ.dkjP73KdE6JMTiLcUoHvUA";

const Map = ({
  weightsDone,
  data,
  zoom,
  setZoom,
  opacity,
  setHoverInfo,
  setImageURL,
  setInstruction,
  mapRef,
  activeSidebar,
}) => {
  const [lng, setLng] = useState(-88.4);
  const [lat, setLat] = useState(27.8);
  const [selectBasemap, setSelectBasemap] = useState(false);
  const [basemapStyle, setBasemapStyle] = useState("light-v10");

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

  const onToggle = (value) => {
    if (value === 0) {
      setBasemapStyle("light-v10");
    } else if (value === 1) {
      setBasemapStyle("dark-v10");
    } else if (value === 2) {
      setBasemapStyle("satellite-v9");
    } else if (value === 3) {
      setBasemapStyle("outdoors-v11");
    }
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
      }
    }
  };

  const onViewStateChange = (e) => {
    setZoom(e.viewState.zoom.toFixed(1));
    let popupWindow = document.getElementsByClassName("control-panel")[0];
    if (popupWindow) {
      popupWindow.style.display = "none";
    }
  };

  useEffect(() => {
    if (zoom >= 10) {
      setInstruction(
        "Click to explore the details of a single hexagonal area."
      );
    } else {
      setInstruction(
        "Please zoom in to level 10 to explore the details of a single hexagonal area."
      );
    }
  }, [zoom]);

  return (
    <>
      {!activeSidebar && (
        <Button
          className="basemapButton"
          variant="secondary"
          onClick={() => setSelectBasemap(!selectBasemap)}
        >
          <FiMap />
        </Button>
      )}
      {selectBasemap && (
        <div className="basemapSwitch">
          <MultiSwitch
            texts={["Light", "Dark", "Satellite", "Terrain", ""]}
            selectedSwitch={0}
            bgColor={"gray"}
            onToggleCallback={onToggle}
            height={"38px"}
            fontSize={"15px"}
            fontColor={"white"}
            selectedFontColor={"#6e599f"}
            selectedSwitchColor={"white"}
            borderWidth={0}
            eachSwitchWidth={80}
          />
        </div>
      )}
      <MapGL
        {...viewport}
        ref={mapRef}
        style={{ position: "fixed" }}
        width="100vw"
        height="100vh"
        showZoom={true}
        mapStyle={"mapbox://styles/mapbox/" + basemapStyle}
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
                    parseInt(opacity) / 100,
                  ],
                }}
              />
              <Layer {...dataLayerHightLight} filter={filter} />
            </Source>
            <Legend opacity={opacity}></Legend>
          </>
        )}
      </MapGL>
    </>
  );
};

export default Map;
