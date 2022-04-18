import React, { useState } from "react";
import {
  Container,
  Button,
  Accordion,
  Card,
  Form,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Table,
  Modal,
} from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import "./main.css";
import Select from "react-select";
import SelectRestoreWeights from "./ViewCreateVis/SelectRestoreWeights";
import SelectDataMeasures from "./ViewCreateVis/SelectDataMeasures";
import ReviewVisSettings from "./ViewCreateVis/ReviewVisSettings";
import SidebarMode from "./SidebarMode";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMeasures,
  changeMeasuresWeight,
  changeGoalWeights,
} from "./action";
import { GoInfo } from "react-icons/go";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const arrowIcon = (
  <FontAwesomeIcon icon={faArrowLeft} color="white" size="lg" />
);

const RESTOREGoal = [
  "Habitat",
  "Water Quality & Quantity",
  "Living Coastal & Marine Resources",
  "Community Resilience",
  "Gulf Economy",
];

const Sidebar = ({
  activeSidebar,
  setActiveSidebar,
  setWeightsDone,
  setData,
  view,
  setAlertText,
  setAlertType,
  setView,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleNext = () => {
    setView("weights");
  };

  return (
    <div id="sidebar" className={activeSidebar ? "active" : ""}>
      <div
        id="dismiss"
        onClick={() => {
          setActiveSidebar(false);
        }}
      >
        {arrowIcon}
      </div>
      <Container>
        <div className="ControlWrapper">
          {view === "welcome" && (
            <div>
              <h3>Welcome to Conservation Visualization Tool!</h3>
              <br />
              <br />
              <p className="smaller-text">
                This tool provides region-wide visualization based on your
                chosen RESTORE council goal weights and selected data measure
                priorities.
              </p>
              <br />
              <br />
              <Button onClick={handleNext}>Start</Button>
            </div>
          )}

          {view === "weights" && (
            <SelectRestoreWeights
              setAlertText={setAlertText}
              setAlertType={setAlertType}
              setView={setView}
            />
          )}

          {view === "selectDataMeasures" && (
            <SelectDataMeasures
              setAlertText={setAlertText}
              setAlertType={setAlertType}
              setView={setView}
            />
          )}

          {view === "reviewVisSettings" && (
            <ReviewVisSettings
              setAlertText={setAlertText}
              setAlertType={setAlertType}
              setView={setView}
              setWeightsDone={setWeightsDone}
              setData={setData}
              setActiveSidebar={setActiveSidebar}
            />
          )}
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Oops, Something went wrong!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please make sure the sum of RESTORE Council Goals to be 100 and at
            least 1 data measure is selected.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Sidebar;
