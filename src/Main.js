import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import {
  RiFileDownloadLine,
  RiSaveLine,
  RiScreenshot2Fill,
} from "react-icons/ri";
import ControlPanel from "./ControlPanel";
import Sidebar from "./Sidebar";
import Map from "./Map";
import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCamera } from "@fortawesome/free-solid-svg-icons";

const arrowIcon = (
  <FontAwesomeIcon icon={faArrowRight} color="white" size="lg" />
);

const cameraIcon = <FontAwesomeIcon icon={faCamera} />;

const Main = ({ setAlertText, setAlertType, setView, view, userLoggedIn }) => {
  const [activeSidebar, setActiveSidebar] = useState(true);
  const [data, setData] = useState(null);
  const [zoom, setZoom] = useState(5.5);
  const [opacity, setOpacity] = useState(50);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [weightsDone, setWeightsDone] = useState(false);
  const [show, setShow] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [resizedImageURL, setResizedImageURL] = useState(null);
  const [instruction, setInstruction] = useState(
    "Please zoom in to level 10 to explore the details of a single hexagonal area."
  );
  const mapRef = useRef();

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const resizeImageURL = (url, newWidth, newHeight) => {
    return new Promise(async function (resolve, reject) {
      var img = document.createElement("img");
      img.onload = function () {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(this, 0, 0, newWidth, newHeight);
        var dataURI = canvas.toDataURL();
        resolve(dataURI);
      };
      img.src = url;
    });
  };

  const getImage = async () => {
    var originalImage = mapRef.current.getMap().getCanvas().toDataURL();
    var resizedImage = await resizeImageURL(originalImage, 750, 500);
    setImageURL(originalImage);
    setResizedImageURL(resizedImage);
    handleShow();
  };

  // The length of image URL exceeds the limit of broswer
  // Need to use a blob object to recreate the URL instead
  function imageURLToBlob(url) {
    var binStr = atob(url.split(",")[1]),
      len = binStr.length,
      arr = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr]);
  }

  const DownloadMap = () => {
    var a = document.createElement("a");
    var blob = imageURLToBlob(imageURL);
    a.href = URL.createObjectURL(blob);
    a.download = "Map.png";
    a.click();
  };

  return (
    <div>
      <Sidebar
        activeSidebar={activeSidebar}
        setActiveSidebar={setActiveSidebar}
        setWeightsDone={setWeightsDone}
        setData={setData}
        setAlertType={setAlertType}
        setAlertText={setAlertText}
        setView={setView}
        view={view}
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
        {!activeSidebar && (
          <div id="floatingWindow" className="window">
            <p>
              <em>{instruction}</em>
            </p>
            <p>Current Zoom Level : {zoom}</p>
            <label>Layer Opacity (%) :</label>
            <RangeSlider
              step={1}
              value={opacity}
              onChange={(e) => setOpacity(e.target.value)}
              variant="secondary"
            />{" "}
            <Button id="snapshotButton" variant="secondary" onClick={getImage}>
              {cameraIcon}
            </Button>
          </div>
        )}
        <Map
          weightsDone={weightsDone}
          data={data}
          zoom={zoom}
          setZoom={setZoom}
          opacity={opacity}
          setHoverInfo={setHoverInfo}
          setImageURL={setImageURL}
          setInstruction={setInstruction}
          mapRef={mapRef}
          activeSidebar={activeSidebar}
        />
        <ControlPanel
          id="popupWindow"
          hoverInfo={hoverInfo ? hoverInfo : { hexagon: {} }}
        ></ControlPanel>

        <Modal centered show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Current Map View</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column justify-content-center">
              <img src={resizedImageURL} alt={"Current Map View"} />
              <br />
              <div
                className={
                  userLoggedIn
                    ? "d-flex justify-content-between"
                    : "d-flex justify-content-center"
                }
              >
                <Button variant="secondary" onClick={DownloadMap}>
                  <RiFileDownloadLine /> &nbsp; Download Map
                </Button>
                {userLoggedIn && (
                  <Button variant="secondary">
                    <RiSaveLine /> &nbsp; Save to: {userLoggedIn}
                  </Button>
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Main;
