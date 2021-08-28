import React from 'react';
import {Table} from 'react-bootstrap'

const ControlPanel = ({hoverInfo})=> {
    
    return (
      <div className={hoverInfo.hexagon && hoverInfo.hexagon.hasOwnProperty("OBJECTID") ? "control-panel active": "control-panel"}>
          { hoverInfo.hexagon && (
	 			<div>
	 				<div>
	 					<Table striped bordered size="sm" variant="dark">
	 						<tbody>
	 							<tr>
	 								<td colSpan="2">
	 									<b>Habitat: </b>{' '}
	 								</td>
	 							</tr>
	 							<tr>
	 								<td>Connectivity to Existing Protected Area:</td>
	 								<td>{hoverInfo.hexagon.hab1}</td>
	 							</tr>
	 							<tr>
	 								<td>Connectivity of Natural Lands:</td>
	 								<td>{hoverInfo.hexagon.hab2}</td>
	 							</tr>
	 							<tr>
	 								<td>Threat of Urbanization:</td>
	 								<td>{hoverInfo.hexagon.hab3}</td>
	 							</tr>
	 							<tr>
	 								<td>Composition of Priority Natural Lands:</td>
	 								<td>{hoverInfo.hexagon.hab4}</td>
	 							</tr>
	 							<tr>
	 								<td colSpan="2">
	 									<b>Water Quality & Quantity: </b>{' '}
	 								</td>
	 							</tr>
	 							<tr>
	 								<td>Impaired Watershed Area:</td>
	 								<td>{hoverInfo.hexagon.wq1}</td>
	 							</tr>
	 							<tr>
	 								<td>Hydrologic Response to Land-Use Change:</td>
	 								<td>{hoverInfo.hexagon.wq2}</td>
	 							</tr>
	 							<tr>
	 								<td>Percent Irrigated Agriculture:</td>
	 								<td>{hoverInfo.hexagon.wq3}</td>
	 							</tr>
								<tr>
	 								<td>Lateral Connectivity to Floodplain:</td>
	 								<td>{hoverInfo.hexagon.wq4}</td>
	 							</tr>
								<tr>
	 								<td>Composition of Riparizan Zone Lands:</td>
	 								<td>{hoverInfo.hexagon.wq5}</td>
	 							</tr>
								 <tr>
	 								<td>Presence of Impoundments:</td>
	 								<td>{hoverInfo.hexagon.wq6}</td>
	 							</tr>
	 							<tr>
	 								<td colSpan="2">
	 									<b>Living Coastal & Marine Resources:</b>{' '}
	 								</td>
	 							</tr>
	 							<tr>
	 								<td>Vulnerable Area of Terrestrial Endemic Species: </td>
	 								<td>{hoverInfo.hexagon.lcmr1}</td>
	 							</tr>
	 							<tr>
	 								<td>T&E Critical Habitat Area:</td>
	 								<td>{hoverInfo.hexagon.lcmr2}</td>
	 							</tr>
	 							<tr>
	 								<td>T&E Number of Species:</td>
	 								<td>{hoverInfo.hexagon.lcmr3}</td>
	 							</tr>
	 							<tr>
	 								<td>Light Pollution Index:</td>
	 								<td>{hoverInfo.hexagon.lcmr4}</td>
	 							</tr>
								 <tr>
	 								<td>Terrestrial Vertebrate Biodiversity:</td>
	 								<td>{hoverInfo.hexagon.lcmr5}</td>
	 							</tr>
								 <tr>
	 								<td>Vulnerability to Invasive Plants:</td>
	 								<td>{hoverInfo.hexagon.lcmr6}</td>
	 							</tr>
	 							<tr>
	 								<td colSpan="2">
	 									<b>Community Resilience:</b>{' '}
	 								</td>
	 							</tr>
	 							<tr>
	 								<td>National Register of Historic Places: </td>
	 								<td>{hoverInfo.hexagon.cl1}</td>
	 							</tr>
	 							<tr>
	 								<td>National Heritage Area:</td>
	 								<td>{hoverInfo.hexagon.cl2}</td>
	 							</tr>
	 							<tr>
	 								<td>Proximity to Socially Vulnerability Communities:</td>
	 								<td>{hoverInfo.hexagon.cl3}</td>
	 							</tr>
	 							<tr>
	 								<td>Community Threat Index:</td>
	 								<td>{hoverInfo.hexagon.cl4}</td>
	 							</tr>
	 							<tr>
	 								<td colSpan="2">
	 									<b>Gulf Economy:</b>{' '}
	 								</td>
	 							</tr>
	 							<tr>
	 								<td>High Priority Working Lands: </td>
	 								<td>{hoverInfo.hexagon.eco1}</td>
	 							</tr>
	 							<tr>
	 								<td>Commercial Fishery Reliance:</td>
	 								<td>{hoverInfo.hexagon.eco2}</td>
	 							</tr>
	 							<tr>
	 								<td>Recreational Fishery Engagement:</td>
	 								<td>{hoverInfo.hexagon.eco3}</td>
	 							</tr>
	 							<tr>
	 								<td>Access & Recreation - Number of Access Points:</td>
	 								<td>{hoverInfo.hexagon.eco4}</td>
	 							</tr>
	 						</tbody>
	 					</Table>
	 				</div>
	 			</div>
          )
        }
      </div>
    );
}

export default ControlPanel;