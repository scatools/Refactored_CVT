import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const ControlPanel = ({ hoverInfo }) => {
  const filterNoData = (value) => {
    if (parseFloat(value) === -1) {
      return "No Data";
    } else {
      return value;
    }
  };

  useEffect(() => {
    hoverInfo.hexagon && hoverInfo.hexagon.hasOwnProperty("OBJECTID")
      ? setActiveControl(true)
      : setActiveControl(false);
  }, [hoverInfo.hexagon]);

  const [activeControl, setActiveControl] = useState(false);

  return (
    <div className={activeControl ? "control-panel active" : "control-panel"}>
      <div
        className={activeControl ? "" : "hide"}
        id="control-panel-dismiss"
        onClick={() => {
          setActiveControl(false);
        }}
      >
        X
      </div>
      {hoverInfo.hexagon && (
        <div>
          <div>
            <Table striped bordered size="sm" variant="dark">
              <tbody>
                <tr>
                  <td colSpan="2">
                    <b>Habitat: </b>{" "}
                  </td>
                </tr>
                <tr>
                  <td>Connectivity to Existing Protected Area:</td>
                  <td>{filterNoData(hoverInfo.hexagon.hab1)}</td>
                </tr>
                <tr>
                  <td>Connectivity of Natural Lands:</td>
                  <td>{filterNoData(hoverInfo.hexagon.hab2)}</td>
                </tr>
                <tr>
                  <td>Threat of Urbanization:</td>
                  <td>{filterNoData(hoverInfo.hexagon.hab3)}</td>
                </tr>
                <tr>
                  <td>Composition of Priority Natural Lands:</td>
                  <td>{filterNoData(hoverInfo.hexagon.hab4)}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <b>Water Quality & Quantity: </b>{" "}
                  </td>
                </tr>
                <tr>
                  <td>Impaired Watershed Area:</td>
                  <td>{filterNoData(hoverInfo.hexagon.wq1)}</td>
                </tr>
                <tr>
                  <td>Hydrologic Response to Land-Use Change:</td>
                  <td>{filterNoData(hoverInfo.hexagon.wq2)}</td>
                </tr>
                <tr>
                  <td>Percent Irrigated Agriculture:</td>
                  <td>{filterNoData(hoverInfo.hexagon.wq3)}</td>
                </tr>
                <tr>
                  <td>Lateral Connectivity to Floodplain:</td>
                  <td>{filterNoData(hoverInfo.hexagon.wq4)}</td>
                </tr>
                <tr>
                  <td>Composition of Riparizan Zone Lands:</td>
                  <td>{filterNoData(hoverInfo.hexagon.wq5)}</td>
                </tr>
                <tr>
                  <td>Presence of Impoundments:</td>
                  <td>{filterNoData(hoverInfo.hexagon.wq6)}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <b>Living Coastal & Marine Resources:</b>{" "}
                  </td>
                </tr>
                <tr>
                  <td>Vulnerable Area of Terrestrial Endemic Species: </td>
                  <td>{filterNoData(hoverInfo.hexagon.lcmr1)}</td>
                </tr>
                <tr>
                  <td>T&E Critical Habitat Area:</td>
                  <td>{filterNoData(hoverInfo.hexagon.lcmr2)}</td>
                </tr>
                <tr>
                  <td>T&E Number of Species:</td>
                  <td>{filterNoData(hoverInfo.hexagon.lcmr3)}</td>
                </tr>
                <tr>
                  <td>Light Pollution Index:</td>
                  <td>{filterNoData(hoverInfo.hexagon.lcmr4)}</td>
                </tr>
                <tr>
                  <td>Terrestrial Vertebrate Biodiversity:</td>
                  <td>{filterNoData(hoverInfo.hexagon.lcmr5)}</td>
                </tr>
                <tr>
                  <td>Vulnerability to Invasive Plants:</td>
                  <td>{filterNoData(hoverInfo.hexagon.lcmr6)}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <b>Community Resilience:</b>{" "}
                  </td>
                </tr>
                <tr>
                  <td>National Register of Historic Places: </td>
                  <td>{filterNoData(hoverInfo.hexagon.cl1)}</td>
                </tr>
                <tr>
                  <td>National Heritage Area:</td>
                  <td>{filterNoData(hoverInfo.hexagon.cl2)}</td>
                </tr>
                <tr>
                  <td>Proximity to Socially Vulnerability Communities:</td>
                  <td>{filterNoData(hoverInfo.hexagon.cl3)}</td>
                </tr>
                <tr>
                  <td>Community Threat Index:</td>
                  <td>{filterNoData(hoverInfo.hexagon.cl4)}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <b>Gulf Economy:</b>{" "}
                  </td>
                </tr>
                <tr>
                  <td>High Priority Working Lands: </td>
                  <td>{filterNoData(hoverInfo.hexagon.eco1)}</td>
                </tr>
                <tr>
                  <td>Commercial Fishery Reliance:</td>
                  <td>{filterNoData(hoverInfo.hexagon.eco2)}</td>
                </tr>
                <tr>
                  <td>Recreational Fishery Engagement:</td>
                  <td>{filterNoData(hoverInfo.hexagon.eco3)}</td>
                </tr>
                <tr>
                  <td>Access & Recreation - Number of Access Points:</td>
                  <td>{filterNoData(hoverInfo.hexagon.eco4)}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
