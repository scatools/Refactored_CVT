import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { RiFileDownloadLine, RiSaveLine, RiScreenshot2Fill } from "react-icons/ri";
import ControlPanel from "./ControlPanel";
import Sidebar from "./Sidebar";
import Map from "./Map";
import "./main.css";

const Main = ({ userLoggedIn }) => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [data, setData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [weightsDone, setWeightsDone] = useState(false);
  const [show, setShow] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const mapRef = useRef();
  
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const resizeImageURL = (url, newWidth, newHeight) => {
    return new Promise(async function(resolve, reject){
      var img = document.createElement('img');
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
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
    setImageURL(resizedImage);
    handleShow();
  };

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
          style={{ position: "fixed", top: "80px", left: "50px", zIndex: 1 }}
          variant="secondary"
          onClick={() => {
            setActiveSidebar(true);
          }}
        >
          Start
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
          setImageURL={setImageURL}
          mapRef={mapRef}
        />
        <ControlPanel
          id="popupWindow"
          hoverInfo={hoverInfo ? hoverInfo : { hexagon: {} }}
        ></ControlPanel>
        <Button
          style={{ position: "fixed", top: "200px", right: "20px", width: "300px", zIndex: 1 }}
          variant="secondary"
          onClick={getImage}
        >
          <RiScreenshot2Fill /> &nbsp;
          Export Current View
        </Button>
        <Modal centered show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              Current Map View
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column justify-content-center">
              <img src={imageURL} alt={"Current Map View"} />
              <br/>
              <div 
                className={
                  userLoggedIn?
                  "d-flex justify-content-between":
                  "d-flex justify-content-center"
                }
              >
                <Button variant="secondary">
                  <RiFileDownloadLine /> &nbsp;
                  Download Map
                </Button>
                {userLoggedIn && (
                  <Button variant="secondary">
                    <RiSaveLine /> &nbsp;
                    Save to: {userLoggedIn}
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
