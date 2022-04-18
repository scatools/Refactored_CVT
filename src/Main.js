import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Map from "./Map";
import "./main.css";
import Sidebar from "./Sidebar";
import ControlPanel from "./ControlPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const arrowIcon = (
  <FontAwesomeIcon icon={faArrowRight} color="white" size="lg" />
);

const Main = () => {
  const [activeSidebar, setActiveSidebar] = useState(true);
  const [data, setData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [weightsDone, setWeightsDone] = useState(false);

  return (
    <div>
      <Sidebar
        activeSidebar={activeSidebar}
        setActiveSidebar={setActiveSidebar}
        setWeightsDone={setWeightsDone}
        setData={setData}
      />
      <div style={{ height: "100%", position: "relative" }} className="content">
        <Button
          style={{ position: "fixed", top: "65px", left: "3px", zIndex: 1 }}
          variant="secondary"
          onClick={() => {
            setActiveSidebar(true);
          }}
        >
          {arrowIcon}
        </Button>
        <div id="floatingWindow" className="window">
          <p>
            <em>
              Please zoom in to level 10 to explore the details of a single
              hexagonal area.
            </em>
          </p>
          <p>Current zoom level : </p>
        </div>
        <Map
          weightsDone={weightsDone}
          data={data}
          setHoverInfo={setHoverInfo}
        />
        <ControlPanel
          id="popupWindow"
          hoverInfo={hoverInfo ? hoverInfo : { hexagon: {} }}
        ></ControlPanel>
      </div>
    </div>
  );
};

export default Main;
