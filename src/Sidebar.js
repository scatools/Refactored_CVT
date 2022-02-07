import React, { useState } from 'react';
import { Button, Accordion, Card, Form, Row, Col, ButtonGroup, ToggleButton, Table, Modal } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import './main.css';
import Select from 'react-select';
import SidebarMode from './SidebarMode';
import {useDispatch,useSelector} from 'react-redux';
import {changeMeasures,changeMeasuresWeight,changeGoalWeights} from './action';
import { GoInfo } from 'react-icons/go';
import ReactTooltip from "react-tooltip";

const RESTOREGoal = ['Habitat', 'Water Quality & Quantity', 'Living Coastal & Marine Resources','Community Resilience','Gulf Economy']

const Sidebar = ({activeSidebar,setActiveSidebar,setWeightsDone, setData}) =>{
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
	const [ mode, setMode ] = useState('add');

    const weights =  useSelector(state => state.weights)

	const handleChange = (value, name, label, type) => {	
		dispatch(changeMeasuresWeight(value,name, label, type))
	};	  
	const handleWeights = (value, goal) =>{
		const newValue = Number(value)> 100 ? 100 : Number(value);
		dispatch(changeGoalWeights(newValue, goal))
	}
    return (
        <div id="sidebar" className={activeSidebar ? 'active' : ''}>
            	<div
					id="dismiss"
					onClick={() => {
						setActiveSidebar(false);
					}}
				>
				X
				</div>

				<div className="ControlWrapper">
					<p>Layer Control</p>
					<Accordion defaultActiveKey="0">
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								Geographic Scale:
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
								<h6>Welcome to Conservation Visualization Tool! This tool provides region-wide visualization based on data measures selected.</h6>
								<SidebarMode mode={mode} setMode={setMode} />
									<br />
									{mode === 'view' && (
									<div>
									<span>Select States:</span>
									<Select
										styles={{ menuPortal: (base, state) => ({ ...base, zIndex: 9999 }) }}
										menuPortalTarget={document.body}
										options={[
											{ value: 'wq1', type: 'checkbox', label: "Alabama " },
											{ value: 'wq2', type: 'checkbox', label: 'Louisiana' },
											{ value: 'wq3', type: 'checkbox', label: 'Texas' },
											{ value: 'wq4', type: 'checkbox', label: 'Florida' },
											{ value: 'wq5', type: 'checkbox', label: 'Mississippi' }
										]}
										isMulti
										placeholder="Select states..."
										name="colors"
										className="basic-multi-select"
										classNamePrefix="select"
										value={weights.wq.selected}
										isClearable={false}
										onChange={(selectedOption) => {
											let state;
										dispatch(changeMeasures('wq', state))
										}}
									/>
									</div>
									)}
									<br />
									<Accordion.Toggle eventKey="1" as={Button} variant="dark">
										Next
									</Accordion.Toggle>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
						
						<Card className="my-2">
							<Accordion.Toggle as={Card.Header} eventKey="1">
								RESTORE Goal Weights:
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="1">
								<Card.Body>
										<Form>
									    <>
										<span>Habitat:</span>
										<Form.Group as={Row}>
											<Col xs="9">
												<RangeSlider
													step = {5}
													value={weights.hab.weight}
													onChange={(e) => handleWeights(e.target.value,'hab')}
													variant="secondary"
												/>
											</Col>
											<Col xs="3">
												<Form.Control
													value={weights.hab.weight}
													onChange={(e) => handleWeights(e.target.value, 'hab')}
												/>
											</Col>
										</Form.Group>
										</>
									    <>
										<span>Water Quality & Quantity:</span>
										<Form.Group as={Row}>
										<Col xs="9">
												<RangeSlider
													step = {5}
													value={weights.wq.weight}
													onChange={(e) => handleWeights(e.target.value, 'wq')}
													variant="secondary"
												/>
											</Col>
											<Col xs="3">
												<Form.Control
													value={weights.wq.weight}
													onChange={(e) => handleWeights(e.target.value, 'wq')}
												/>
											</Col>
										</Form.Group>
										</>
										<>
										<span>Living Coastal & Marine Resources:</span>
										<Form.Group as={Row}>
										<Col xs="9">
												<RangeSlider
													step = {5}
													value={weights.lcmr.weight}
													onChange={(e) => handleWeights(e.target.value, 'lcmr')}
													variant="secondary"
												/>
											</Col>
											<Col xs="3">
												<Form.Control
													value={weights.lcmr.weight}
													onChange={(e) => handleWeights(e.target.value, 'lcmr')}
												/>
											</Col>
										</Form.Group>
										</>
                                    	<>
										<span>Community Resilience:</span>
										<Form.Group as={Row}>
										<Col xs="9">
												<RangeSlider
													step = {5}
													value={weights.cl.weight}
													onChange={(e) => handleWeights(e.target.value, 'cl')}
													variant="secondary"
												/>
											</Col>
											<Col xs="3">
												<Form.Control
													value={weights.cl.weight}
													onChange={(e) => handleWeights(e.target.value, 'cl')}
												/>
											</Col>
										</Form.Group>
										</>
                    					<>
										<span>Gulf Economy:</span>
										<Form.Group as={Row}>
										<Col xs="9">
												<RangeSlider
													step = {5}
													value={weights.eco.weight}
													onChange={(e) => handleWeights(e.target.value, 'eco')}
													variant="secondary"
												/>
											</Col>
											<Col xs="3">
												<Form.Control
													value={weights.eco.weight}
													onChange={(e) => handleWeights(e.target.value, 'eco')}
												/>
											</Col>
										</Form.Group>
										</>
									</Form>
									<br />
									<label>Total Sum: &nbsp;&nbsp;</label>
									<span>
										<input
											type="text"
											value={weights.hab.weight+weights.wq.weight+weights.lcmr.weight+weights.cl.weight+weights.eco.weight}							
											disabled
										>	
										</input>
									</span>
									<br></br>
									<br></br>
									<Accordion.Toggle eventKey="2" as={Button} variant="dark" 
													  onClick={()=>{
															if(Object.values(weights).reduce((a,b)=>{return a+b.weight},0)!==100){
																handleShow()
															}
													  }}>
										Next
									</Accordion.Toggle>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					

						<Card className="my-2">
							<Accordion.Toggle as={Card.Header} eventKey="2">
								Data Measures:
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="2">
								<Card.Body>
									<span>Habitat:</span>
									<Select
										styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
										menuPortalTarget={document.body}
										options={[
											{ value: 'hab1', label: 'Connectivity to Existing Protected Area' },
											{ value: 'hab2', label: 'Connectivity of Natural Lands' },
											{ value: 'hab3', label: 'Threat of Urbanization' },
											{ value: 'hab4', label: 'Composition of Priority Natural Lands' }
										]}
										isMulti
										isClearable={false}
										placeholder="Select Habitat measures..."
										name="colors"
										value={weights.hab.selected}
										onChange={(selectedOption) => {
											let state;
											if (selectedOption) {
											    state = selectedOption.map((selected) => ({
											    	...selected,
											    	utility: selected['utility'] || '1',
											    	weight: selected['weight'] || 'medium'
											    }));
										    }else{
										    	state = null;
										    	handleWeights(0,'hab');
										    }
										    dispatch(changeMeasures('hab', state))
										}}    
										className="basic-multi-select"
										classNamePrefix="select"
									/>
									
									{weights.hab.selected &&
										weights.hab.selected.map((measure) => (
										<div className="m-2 measure-container" key={measure.value}>
											<span style={{ display: "block" }} className="my-1">
											{measure.label} &nbsp;
											<GoInfo data-tip data-for={measure.value} />
											<ReactTooltip id={measure.value} type='dark'>
												<span>
												{measure.label==='Connectivity to Existing Protected Area'? 'Connectivity to existing protected area indicates if the proposed conservation area is close to an area classified as protected by PAD-US 2.0 data.':
												(measure.label==='Connectivity of Natural Lands'? 'A percent attribute that stands for the proportion of area classified as a hub or corridor.':
												(measure.label==='Threat of Urbanization'? 'Threat of urbanization (ToU) indicates the likelihood of the given project area or area of interest (AoI) being urbanized by the year 2060.':
												(measure.label==='Composition of Priority Natural Lands'? 'This attribute prioritizes rare habitat types and those that have been identified as conservation priorities in state and regional plans.':
												"")))}
												</span>
											</ReactTooltip>
											</span>
											<div className="d-flex justify-content-between utility-btn-cont">
											<div>
												<div>
												<p className="smaller-text no-margin no-padding">
													{measure.label==='Connectivity to Existing Protected Area'? 'Is more or less connected the better?':
													(measure.label==='Connectivity of Natural Lands'? 'Is more or less connected the better?':
													(measure.label==='Threat of Urbanization'? 'Is higher or lower threat of urbanization the better?':
													(measure.label==='Composition of Priority Natural Lands'? 'Are more or less natural lands the better?':
													"")))}
												</p>
												</div>
												<ButtonGroup className="utility-inner" toggle>
												<ToggleButton
													type="radio"
													data-tip
													data-for={"positive-"+measure.value}
													variant="outline-secondary"
													name="utility"
													value="1"
													checked={measure.utility === "1"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"hab"
													)
													}
												>
													{measure.label==='Connectivity to Existing Protected Area'? 'More':
													(measure.label==='Connectivity of Natural Lands'? 'More':
													(measure.label==='Threat of Urbanization'? 'Lower':
													(measure.label==='Composition of Priority Natural Lands'? 'More':
													"")))}
												</ToggleButton>
												<ReactTooltip id={"positive-"+measure.value} place="top">
													{measure.label==='Connectivity to Existing Protected Area'? 'More connected the better':
													(measure.label==='Connectivity of Natural Lands'? 'More connected the better':
													(measure.label==='Threat of Urbanization'? 'Lower threat of urbanization the better':
													(measure.label==='Composition of Priority Natural Lands'? 'More natural lands the better':
													"")))}
												</ReactTooltip>
												<ToggleButton
													type="radio"
													data-tip
													data-for={"negative-"+measure.value}
													variant="outline-secondary"
													name="utility"
													value="-1"
													checked={measure.utility === "-1"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"hab"
													)
													}
												>
													{measure.label==='Connectivity to Existing Protected Area'? 'Less':
													(measure.label==='Connectivity of Natural Lands'? 'Less':
													(measure.label==='Threat of Urbanization'? 'Higher':
													(measure.label==='Composition of Priority Natural Lands'? 'Less':
													"")))}
												</ToggleButton>
												<ReactTooltip id={"negative-"+measure.value} place="top">
													{measure.label==='Connectivity to Existing Protected Area'? 'Less connected the better':
													(measure.label==='Connectivity of Natural Lands'? 'Less connected the better':
													(measure.label==='Threat of Urbanization'? 'Higher threat of urbanization the better':
													(measure.label==='Composition of Priority Natural Lands'? 'Less natural lands the better':
													"")))}
												</ReactTooltip>
												</ButtonGroup>
											</div>
											<div>
												<div>
												<p className="smaller-text no-margin">
													Select the priority
												</p>
												<br />
												</div>
												<ButtonGroup toggle className="ml-2 weight-inner">
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="low"
													checked={measure.weight === "low"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"hab"
													)
													}
												>
													Low
												</ToggleButton>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="medium"
													checked={measure.weight === "medium"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"hab"
													)
													}
												>
													Medium
												</ToggleButton>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="high"
													checked={measure.weight === "high"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"hab"
													)
													}
												>
													High
												</ToggleButton>
												</ButtonGroup>
											</div>
											</div>
										</div>
										))
									}
									
									<br />
									<span>Water Quality & Quantity:</span>
									<Select
										styles={{ menuPortal: (base, state) => ({ ...base, zIndex: 9999 }) }}
										menuPortalTarget={document.body}
										options={[
											{ value: 'wq1', type: 'checkbox', label: '303(d): Impaired Watershed Area' },
											{ value: 'wq2', type: 'checkbox', label: 'Hydrologic Response to Land-Use Change' },
											{ value: 'wq3', type: 'checkbox', label: 'Percent Irrigated Agriculture' },
											{ value: 'wq4', type: 'checkbox', label: 'Lateral Connectivity of Floodplain' },
											{ value: 'wq5', type: 'checkbox', label: 'Composition of Riparizan Zone Lands' },
											{ value: 'wq6', type: 'checkbox', label: 'Presence of Impoundments' }
										]}
										isMulti
										placeholder="Select Water Quality & Quantity measures..."
										name="colors"
										className="basic-multi-select"
										classNamePrefix="select"
										value={weights.wq.selected}
										isClearable={false}
										onChange={(selectedOption) => {
											let state;
											if (selectedOption) {
											state = selectedOption.map((selected) => ({
												...selected,
												utility: selected['utility'] || '1',
												weight: selected['weight'] || 'medium'
											}));
										}else{
											state = null;
											handleWeights(0,'wq');
										}
										
										dispatch(changeMeasures('wq', state))
										}}
									/>
									{weights.wq.selected &&
										weights.wq.selected.map((measure) => (
										<div className="m-2 measure-container" key={measure.value}>
											<span style={{ display: "block" }} className="my-1">
											{measure.label} &nbsp;
											<GoInfo data-tip data-for={measure.value} />
											<ReactTooltip id={measure.value} type='dark'>
												<span>
												{measure.label==='303(d): Impaired Watershed Area'? 'A percent attribute that stands for the proportion of impaired watershed within each hexagon.':
												(measure.label==='Hydrologic Response to Land-Use Change'? 'The magnitude of change in peak flow due to Land-Use/Land-Cover change from 1996 to 2016.':
												(measure.label==='Percent Irrigated Agriculture'? 'The proportion (%) of the area of interest that is covered by irrigated agriculture.':
												(measure.label==='Lateral Connectivity of Floodplain'? 'The proportion of floodplain within the area of interest that is connected.':
												(measure.label==='Composition of Riparizan Zone Lands'? 'An average index value of the composition of lands within a 100-meter buffer of streams.':
												(measure.label==='Presence of Impoundments'? 'This measure describes whether or not an area is impacted by hydromodification.':
												"")))))}
												</span>
											</ReactTooltip>
											</span>
											<div className="d-flex justify-content-between utility-btn-cont">
											<div>
												<div>
												<p className="smaller-text no-margin no-padding">
													{measure.label==='303(d): Impaired Watershed Area'? 'Are more or less impaired areas the better?':
													(measure.label==='Hydrologic Response to Land-Use Change'? 'Is more or less impact on hydrology the better?':
													(measure.label==='Percent Irrigated Agriculture'? 'Is more or less irrigated agriculture the better?':
													(measure.label==='Lateral Connectivity of Floodplain'? 'Is more or less connected the better?':
													(measure.label==='Composition of Riparizan Zone Lands'? 'Are more or less natural riparian zones the better?':
													(measure.label==='Presence of Impoundments'? 'Are more or less impoundments the better?':
													"")))))}
												</p>
												</div>
												<ButtonGroup className="utility-inner" toggle>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													data-tip
													data-for={"positive-"+measure.value}
													name="utility"
													value="1"
													checked={measure.utility === "1"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"wq"
													)
													}
												>
													{measure.label==='303(d): Impaired Watershed Area'? 'Less':
													(measure.label==='Hydrologic Response to Land-Use Change'? 'Less':
													(measure.label==='Percent Irrigated Agriculture'? 'Less':
													(measure.label==='Lateral Connectivity of Floodplain'? 'More':
													(measure.label==='Composition of Riparizan Zone Lands'? 'More':
													(measure.label==='Presence of Impoundments'? 'Less':
													"")))))}
												</ToggleButton>
												<ReactTooltip id={"positive-"+measure.value} place="top">
													{measure.label==='303(d): Impaired Watershed Area'? 'Less impaired area the better':
													(measure.label==='Hydrologic Response to Land-Use Change'? 'Less impact on hydrology the better':
													(measure.label==='Percent Irrigated Agriculture'? 'Less irrigated agriculture the better':
													(measure.label==='Lateral Connectivity of Floodplain'? 'More connected the better':
													(measure.label==='Composition of Riparizan Zone Lands'? 'More natural riparian zone the better':
													(measure.label==='Presence of Impoundments'? 'Less impoundment the better':
													"")))))}
												</ReactTooltip>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													data-tip
													data-for={"negative-"+measure.value}
													name="utility"
													value="-1"
													checked={measure.utility === "-1"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"wq"
													)
													}
												>
													{measure.label==='303(d): Impaired Watershed Area'? 'More':
													(measure.label==='Hydrologic Response to Land-Use Change'? 'More':
													(measure.label==='Percent Irrigated Agriculture'? 'More':
													(measure.label==='Lateral Connectivity of Floodplain'? 'Less':
													(measure.label==='Composition of Riparizan Zone Lands'? 'Less':
													(measure.label==='Presence of Impoundments'? 'More':
													"")))))}
												</ToggleButton>
												<ReactTooltip id={"negative-"+measure.value} place="top">
													{measure.label==='303(d): Impaired Watershed Area'? 'More impaired area the better':
													(measure.label==='Hydrologic Response to Land-Use Change'? 'More impact on hydrology the better':
													(measure.label==='Percent Irrigated Agriculture'? 'More irrigated agriculture the better':
													(measure.label==='Lateral Connectivity of Floodplain'? 'Less connected the better':
													(measure.label==='Composition of Riparizan Zone Lands'? 'Less natural riparian zone the better':
													(measure.label==='Presence of Impoundments'? 'More impoundment the better':
													"")))))}
												</ReactTooltip>
												</ButtonGroup>
											</div>
											<div>
												<div>
												<p className="smaller-text no-margin">
													Select the priority
												</p>
												<br />
												</div>
												<ButtonGroup toggle className="ml-2 weight-inner">
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="low"
													checked={measure.weight === "low"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"wq"
													)
													}
												>
													Low
												</ToggleButton>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="medium"
													checked={measure.weight === "medium"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"wq"
													)
													}
												>
													Medium
												</ToggleButton>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="high"
													checked={measure.weight === "high"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"wq"
													)
													}
												>
													High
												</ToggleButton>
												</ButtonGroup>
											</div>
											</div>
										</div>
										))
									}
									
									<br />
									<span>Living Coastal & Marine Resources:</span>
									<Select
										styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
										menuPortalTarget={document.body}
										options={[
											{ value: 'lcmr1', label: 'Vulnerable Areas of Terrestrial Endemic Species' },
											{ value: 'lcmr2', label: 'Threatened and Endangered Species - Critical Habitat Area' },
											{ value: 'lcmr3', label: 'Threatened and Endangered Species - Number of Species' },
											{ value: 'lcmr4', label: 'Light Pollution Index' },
											{ value: 'lcmr5', label: 'Terrestrial Vertebrate Biodiversity' },
											{ value: 'lcmr6', label: 'Vulnerability to Invasive Plants' }
										]}
										isMulti
										placeholder="Select Living Coastal & Marine Resources measures..."
										name="colors"
										className="basic-multi-select"
										classNamePrefix="select"
										isClearable={false}
										value={weights.lcmr.selected}
										onChange={(selectedOption) => {
											let state
											if (selectedOption) {
												state = selectedOption.map((selected) => ({
													...selected,
													utility: selected['utility'] || '1',
													weight: selected['weight'] || 'medium'
												}));
											}else{
												state = null;
												
										    	handleWeights(0,'lcmr');
											}
											
										    dispatch(changeMeasures('lcmr', state))
										}}
									/>
									{weights.lcmr.selected &&
										weights.lcmr.selected.map((measure) => (
										<div className="m-2 measure-container" key={measure.value}>
											<span style={{ display: "block" }} className="my-1">
											{measure.label} &nbsp;
											<GoInfo data-tip data-for={measure.value} />
											<ReactTooltip id={measure.value} type='dark'>
												<span>
												{measure.label==='Vulnerable Areas of Terrestrial Endemic Species'? 'This measure represents the ratio of endemic species to the amount of protected land in the contiguous U.S.':
												(measure.label==='Threatened and Endangered Species - Critical Habitat Area'? 'The measure is based on the U.S. Fish and Wildlife Service designated federally threatened and endangered (T&E) critical habitat.':
												(measure.label==='Threatened and Endangered Species - Number of Species'? 'This attribute measures the number of federally threatened and endangered (T&E) species that have habitat ranges identified within each hexagon.':
												(measure.label==='Light Pollution Index'? 'An index that measures the intensity of light pollution within each hexagon.':
												(measure.label==='Terrestrial Vertebrate Biodiversity'? 'Definition of Terrestrial Vertebrate Biodiversity.':
												(measure.label==='Vulnerability to Invasive Plants'? 'Definition of Vulnerability to Invasive Plants.':
												"")))))}
												</span>
											</ReactTooltip>
											</span>
											<div className="d-flex justify-content-between utility-btn-cont">
											<div>
												<div>
												<p className="smaller-text no-margin no-padding">
													{measure.label==='Vulnerable Areas of Terrestrial Endemic Species'? 'Are more or less vulnerable areas the better?':
													(measure.label==='Threatened and Endangered Species - Critical Habitat Area'? 'Are more or less critical habitats the better?':
													(measure.label==='Threatened and Endangered Species - Number of Species'? 'Are more or less T&E species the better?':
													(measure.label==='Light Pollution Index'? 'Is more or less light pollution the better?':
													(measure.label==='Terrestrial Vertebrate Biodiversity'? 'Is higher or lower terrestrial vertebrate biodiversity the better?':
													(measure.label==='Vulnerability to Invasive Plants'? 'Is higher or lower vulnerability to invasive plants the better?':
													"")))))}
												</p>
												</div>
												<ButtonGroup className="utility-inner" toggle>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="utility"
													data-tip
													data-for={"positive-"+measure.value}
													value="1"
													checked={measure.utility === "1"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"lcmr"
													)
													}
												>
													{measure.label==='Vulnerable Areas of Terrestrial Endemic Species'? 'More':
													(measure.label==='Threatened and Endangered Species - Critical Habitat Area'? 'More':
													(measure.label==='Threatened and Endangered Species - Number of Species'? 'More':
													(measure.label==='Light Pollution Index'? 'Less':
													(measure.label==='Terrestrial Vertebrate Biodiversity'? 'Higher':
													(measure.label==='Vulnerability to Invasive Plants'? 'Higher':
													"")))))}
												</ToggleButton>
												<ReactTooltip id={"positive-"+measure.value} place="top">
													{measure.label==='Vulnerable Areas of Terrestrial Endemic Species'? 'More vulnerable area the better':
													(measure.label==='Threatened and Endangered Species - Critical Habitat Area'? 'More critical habitat the better':
													(measure.label==='Threatened and Endangered Species - Number of Species'? 'More T&E species the better':
													(measure.label==='Light Pollution Index'? 'Less light pollution the better':
													(measure.label==='Terrestrial Vertebrate Biodiversity'? 'Higher terrestrial vertebrate biodiversity the better':
													(measure.label==='Vulnerability to Invasive Plants'? 'Higher vulnerability to invasive plants the better':
													"")))))}
												</ReactTooltip>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="utility"
													data-tip
													data-for={"negative-"+measure.value}
													value="-1"
													checked={measure.utility === "-1"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"lcmr"
													)
													}
												>
													{measure.label==='Vulnerable Areas of Terrestrial Endemic Species'? 'Less':
													(measure.label==='Threatened and Endangered Species - Critical Habitat Area'? 'Less':
													(measure.label==='Threatened and Endangered Species - Number of Species'? 'Less':
													(measure.label==='Light Pollution Index'? 'More':
													(measure.label==='Terrestrial Vertebrate Biodiversity'? 'Lower':
													(measure.label==='Vulnerability to Invasive Plants'? 'Lower':
													"")))))}
												</ToggleButton>
												<ReactTooltip id={"negative-"+measure.value} place="top">
													{measure.label==='Vulnerable Areas of Terrestrial Endemic Species'? 'Less vulnerable area the better':
													(measure.label==='Threatened and Endangered Species - Critical Habitat Area'? 'Less critical habitat the better':
													(measure.label==='Threatened and Endangered Species - Number of Species'? 'Less T&E species the better':
													(measure.label==='Light Pollution Index'? 'More light pollution the better':
													(measure.label==='Terrestrial Vertebrate Biodiversity'? 'Lower terrestrial vertebrate biodiversity the better':
													(measure.label==='Vulnerability to Invasive Plants'? 'Lower vulnerability to invasive plants the better':
													"")))))}
												</ReactTooltip>
												</ButtonGroup>
											</div>
											<div>
												<div>
												<p className="smaller-text no-margin">
													Select the priority
												</p>
												<br />
												</div>
												<ButtonGroup toggle className="ml-2 weight-inner">
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="low"
													checked={measure.weight === "low"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"lcmr"
													)
													}
												>
													Low
												</ToggleButton>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="medium"
													checked={measure.weight === "medium"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"lcmr"
													)
													}
												>
													Medium
												</ToggleButton>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="high"
													checked={measure.weight === "high"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"lcmr"
													)
													}
												>
													High
												</ToggleButton>
												</ButtonGroup>
											</div>
											</div>
										</div>
										))
									}
									
									<br />
									<span>Community Resilience:</span>
									<Select
										styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
										menuPortalTarget={document.body}
										options={[
											{ value: 'cl1', label: 'National Register of Historic Places' },
											{ value: 'cl2', label: 'National Heritage Area' },
											{ value: 'cl3', label: 'Proximity to Socially Vulnerability Communities' },
											{ value: 'cl4', label: 'Community Threat Index' }
										]}
										isMulti
										placeholder="Select Community Resilience measures..."
										name="colors"
										isClearable={false}
										className="basic-multi-select"
										classNamePrefix="select"
										value={weights.cl.selected}
										onChange={(selectedOption) => {
											let state
											if (selectedOption) {
											state = selectedOption.map((selected) => ({
												...selected,
												utility: selected['utility'] || '1',
												weight: selected['weight'] || 'medium'
											}));
										}else{
											state = null;
											
											handleWeights(0,'cl');
										}
										dispatch(changeMeasures('cl', state))
										}}
									/>
									{weights.cl.selected &&
										weights.cl.selected.map((measure) => (
										<div className="m-2 measure-container" key={measure.value}>
											<span style={{ display: "block" }} className="my-1">
											{measure.label} &nbsp;
											<GoInfo data-tip data-for={measure.value} />
											<ReactTooltip id={measure.value} type='dark'>
												<span>
												{measure.label==='National Register of Historic Places'? 'A numeric attribute that represents the counts of historic places within each hexagon.':
												(measure.label==='National Heritage Area'? 'A percent attribute that stands for the proportion of heritage area within each hexagon.':
												(measure.label==='Proximity to Socially Vulnerable Communities'? 'This measure indicates the proximity to communities that are socially vulnerable according to the National Oceanic and Atmospheric Administration’s (NOAA) Social Vulnerability Index.':
												(measure.label==='Community Threat Index'? 'The Community Threat Index (CTI) comes from the Coastal Resilience Evaluation and Siting Tool (CREST).':
												(measure.label=== 'Social Vulnerability Index'? 'Definition of Social Vulnerability Index.':
												""))))}
												</span>
											</ReactTooltip>
											</span>
											<div className="d-flex justify-content-between utility-btn-cont">
											<div>
												<div>
												<p className="smaller-text no-margin no-padding">
													{measure.label==='National Register of Historic Places'? 'Are more or less historic places the better?':
													(measure.label==='National Heritage Area'? 'Are more or less national heritage areas the better?':
													(measure.label==='Proximity to Socially Vulnerable Communities'? 'Are more or less connections to vulnerable communities the better?':
													(measure.label==='Community Threat Index'? 'Is higher or lower threat to community the better?':
													(measure.label=== 'Social Vulnerability Index'? 'Is higher or lower social vulnerability the better?':
													""))))}
												</p>
												</div>
												<ButtonGroup className="utility-inner" toggle>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													data-tip
													data-for={"positive-"+measure.value}
													name="utility"
													value="1"
													checked={measure.utility === "1"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"cl"
													)
													}
												>
													{measure.label==='National Register of Historic Places'? 'More':
													(measure.label==='National Heritage Area'? 'More':
													(measure.label==='Proximity to Socially Vulnerable Communities'? 'More':
													(measure.label==='Community Threat Index'? 'Higher':
													(measure.label=== 'Social Vulnerability Index'? 'Higher':
													""))))}
												</ToggleButton>
												<ReactTooltip id={"positive-"+measure.value} place="top">
													{measure.label==='National Register of Historic Places'? 'More historic places the better':
													(measure.label==='National Heritage Area'? 'More national heritage areas the better':
													(measure.label==='Proximity to Socially Vulnerable Communities'? 'More connection to socially vulnerable communities the better':
													(measure.label==='Community Threat Index'? 'Higher threat to community the better':
													(measure.label=== 'Social Vulnerability Index'? 'Higher social vulnerability the better':
													""))))}
												</ReactTooltip>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													data-tip
													data-for={"negative-"+measure.value}
													name="utility"
													value="-1"
													checked={measure.utility === "-1"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"cl"
													)
													}
												>
													{measure.label==='National Register of Historic Places'? 'Less':
													(measure.label==='National Heritage Area'? 'Less':
													(measure.label==='Proximity to Socially Vulnerable Communities'? 'Less':
													(measure.label==='Community Threat Index'? 'Lower':
													(measure.label=== 'Social Vulnerability Index'? 'Lower':
													""))))}
												</ToggleButton>
												<ReactTooltip id={"negative-"+measure.value} place="top">
													{measure.label==='National Register of Historic Places'? 'Less historic places the better':
													(measure.label==='National Heritage Area'? 'Less national heritage areas the better':
													(measure.label==='Proximity to Socially Vulnerable Communities'? 'Less connection to socially vulnerable communities the better':
													(measure.label==='Community Threat Index'? 'Lower threat to community the better':
													(measure.label=== 'Social Vulnerability Index'? 'Lower social vulnerability the better':
													""))))}
												</ReactTooltip>
												</ButtonGroup>
											</div>
											<div>
												<div>
												<p className="smaller-text no-margin">
													Select the priority
												</p>
												<br />
												</div>
												<ButtonGroup toggle className="ml-2 weight-inner">
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="low"
													checked={measure.weight === "low"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"cl"
													)
													}
												>
													Low
												</ToggleButton>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="medium"
													checked={measure.weight === "medium"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"cl"
													)
													}
												>
													Medium
												</ToggleButton>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="high"
													checked={measure.weight === "high"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"cl"
													)
													}
												>
													High
												</ToggleButton>
												</ButtonGroup>
											</div>
											</div>
										</div>
										))
									}
									
									<br />
									<span>Gulf Economy:</span>
									<Select
										styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
										menuPortalTarget={document.body}
										options={[
											{ value: 'eco1', label: 'High Priority Working Lands' },
											{ value: 'eco2', label: 'Commercial Fishing Reliance' },
											{ value: 'eco3', label: 'Recreational Fishing Engagement' },
											{ value: 'eco4', label: 'Access & Recreation - Number of Access Points' }
										]}
										isMulti
										placeholder="Select Gulf Economy..."
										name="colors"
										isClearable={false}
										className="basic-multi-select"
										classNamePrefix="select"
										value={weights.eco.selected}
										onChange={(selectedOption) => {
											let state;
											if (selectedOption) {
											state = selectedOption.map((selected) => ({
												...selected,
												utility: selected['utility'] || '1',
												weight: selected['weight'] || 'medium'
											}));
										}else{
											state = null;
											
											handleWeights(0,'eco');
										}
										
										dispatch(changeMeasures('eco', state))
										}}
									/>
									{weights.eco.selected &&
										weights.eco.selected.map((measure) => (
										<div className="m-2 measure-container" key={measure.value}>
											<span style={{ display: "block" }} className="my-1">
											{measure.label} &nbsp;
											<GoInfo data-tip data-for={measure.value} />
											<ReactTooltip id={measure.value} type='dark'>
												<span>
												{measure.label==='High Priority Working Lands'? 'The percentage area of pine, cropland, and pasture/hay classes from the National Land Cover Database (NLCD) 2016 classification map.':
												(measure.label==='Commercial Fishing Reliance'? 'Commercial fishing reliance measures the presence of commercial fishing through fishing activity as shown through permits and vessel landings relative to the population of a community. ':
												(measure.label==='Recreational Fishing Engagement'? 'Recreational fishing engagement measures the presence of recreational fishing through fishing activity estimates, including charter fishing pressure, private fishing pressure, and shore fishing pressure.':
												(measure.label==='Access & Recreation - Number of Access Points'? 'This measure indicates the number of points within a 25 km buffer radius of a hexagon, where the public can access places to engage in outdoor recreation.':
												"")))}
												</span>
											</ReactTooltip>
											</span>
											<div className="d-flex justify-content-between utility-btn-cont">
											<div>
												<div>
												<p className="smaller-text no-margin no-padding">
													{measure.label==='High Priority Working Lands'? 'Are more or less priority working lands the better?':
													(measure.label==='Commercial Fishing Reliance'? 'Is higher or lower reliance the better?':
													(measure.label==='Recreational Fishing Engagement'? 'Is more or less engagement the better?':
													(measure.label==='Access & Recreation - Number of Access Points'? 'Are more or less recreational access points the better?':
													"")))}
												</p>
												</div>
												<ButtonGroup className="utility-inner" toggle>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													data-tip
													data-for={"positive-"+measure.value}
													name="utility"
													value="1"
													checked={measure.utility === "1"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"eco"
													)
													}
												>
													{measure.label==='High Priority Working Lands'? 'More':
													(measure.label==='Commercial Fishing Reliance'? 'Higher':
													(measure.label==='Recreational Fishing Engagement'? 'More':
													(measure.label==='Access & Recreation - Number of Access Points'? 'More':
													"")))}
												</ToggleButton>
												<ReactTooltip id={"positive-"+measure.value} place="top">
													{measure.label==='High Priority Working Lands'? 'More priority working lands the better':
													(measure.label==='Commercial Fishing Reliance'? 'Higher reliance the better':
													(measure.label==='Recreational Fishing Engagement'? 'More engagement the better':
													(measure.label==='Access & Recreation - Number of Access Points'? 'More recreational access points the better':
													"")))}
												</ReactTooltip>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													data-tip
													data-for={"negative-"+measure.value}
													name="utility"
													value="-1"
													checked={measure.utility === "-1"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"eco"
													)
													}
												>
													{measure.label==='High Priority Working Lands'? 'Less':
													(measure.label==='Commercial Fishing Reliance'? 'Lower':
													(measure.label==='Recreational Fishing Engagement'? 'Less':
													(measure.label==='Access & Recreation - Number of Access Points'? 'Less':
													"")))}
												</ToggleButton>
												<ReactTooltip id={"negative-"+measure.value} place="top">
													{measure.label==='High Priority Working Lands'? 'Less priority working lands the better':
													(measure.label==='Commercial Fishing Reliance'? 'Lower reliance the better':
													(measure.label==='Recreational Fishing Engagement'? 'Less engagement the better':
													(measure.label==='Access & Recreation - Number of Access Points'? 'Less recreational access points the better':
													"")))}
												</ReactTooltip>
												</ButtonGroup>
											</div>
											<div>
												<div>
												<p className="smaller-text no-margin">
													Select the priority
												</p>
												<br />
												</div>
												<ButtonGroup toggle className="ml-2 weight-inner">
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="low"
													checked={measure.weight === "low"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"eco"
													)
													}
												>
													Low
												</ToggleButton>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="medium"
													checked={measure.weight === "medium"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"eco"
													)
													}
												>
													Medium
												</ToggleButton>
												<ToggleButton
													type="radio"
													variant="outline-secondary"
													name="weight"
													value="high"
													checked={measure.weight === "high"}
													onChange={(e) =>
													handleChange(
														e.currentTarget.value,
														e.currentTarget.name,
														measure.value,
														"eco"
													)
													}
												>
													High
												</ToggleButton>
												</ButtonGroup>
											</div>
											</div>
										</div>
										))
									}
									<br />
									<Accordion.Toggle eventKey="3" as={Button} variant="dark">
										Next
									</Accordion.Toggle>
								</Card.Body>
							</Accordion.Collapse>
						</Card>

						<Card className="my-2">
							<Accordion.Toggle as={Card.Header} eventKey="3">
								Review & Result:
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="3">
								<Card.Body>
									Data Measure Weights Summary:
									<Table striped bordered hover size="sm">
									<thead>
                                        <tr>
                                          <th>Measure Name</th>
										  <th>Goal Related</th>
                                          <th>Utility &nbsp;
											<GoInfo data-tip data-for='utility' />
											<ReactTooltip id='utility' type='dark'>
  												<span>
													  Utility functions are mathematical representations of how an individual prefers varying values of a single measure.
												</span>
											</ReactTooltip>
										  </th>
                                          <th>Weights &nbsp;
											<GoInfo data-tip data-for='weights' />
											<ReactTooltip id='weights' type='dark'>
  												<span>
													  Measures can be weighted zero, low, medium, or high based on the user’s priorities.
												</span>
											</ReactTooltip></th>
                                        </tr>
                                    </thead>
									<tbody>
										{weights.hab.selected &&
											weights.hab.selected.map((measure) => (
												<tr key={measure.value}>
												<td>
													{measure.label} &nbsp;
													<GoInfo data-tip data-for={measure.value} />
													<ReactTooltip id={measure.value} type='dark'>
													<span>
														{measure.label==='Connectivity to Existing Protected Area'? 'Connectivity to existing protected area indicates if the proposed conservation area is close to an area classified as protected by PAD-US 2.0 data.':
														(measure.label==='Connectivity of Natural Lands'? 'A percent attribute that stands for the proportion of area classified as a hub or corridor.':
														(measure.label==='Threat of Urbanization'? 'Threat of urbanization (ToU) indicates the likelihood of the given project area or area of interest (AoI) being urbanized by the year 2060.':
														(measure.label==='Composition of Priority Natural Lands'? 'This attribute prioritizes rare habitat types and those that have been identified as conservation priorities in state and regional plans.':
														"")))}
													</span>
													</ReactTooltip>
												</td>
												<td>Habitat</td>
												<td>
													{measure.utility === "1" ? (
													measure.label==='Connectivity to Existing Protected Area'? 'More':
													(measure.label==='Connectivity of Natural Lands'? 'More':
													(measure.label==='Threat of Urbanization'? 'Lower':
													(measure.label==='Composition of Priority Natural Lands'? 'More':
													"")))
													) : (
													measure.label==='Connectivity to Existing Protected Area'? 'Less':
													(measure.label==='Connectivity of Natural Lands'? 'Less':
													(measure.label==='Threat of Urbanization'? 'Higher':
													(measure.label==='Composition of Priority Natural Lands'? 'Less':
													"")))
													)}
												</td>
												<td>{measure.weight.toUpperCase()}</td>
												</tr>
											))
										}
										{weights.wq.selected &&
											weights.wq.selected.map((measure) => (
												<tr key={measure.value}>
												<td>
													{measure.label} &nbsp;
													<GoInfo data-tip data-for={measure.value} />
													<ReactTooltip id={measure.value} type='dark'>
													<span>
														{measure.label==='303(d): Impaired Watershed Area'? 'A percent attribute that stands for the proportion of impaired watershed within each hexagon.':
														(measure.label==='Hydrologic Response to Land-Use Change'? 'The magnitude of change in peak flow due to Land-Use/Land-Cover change from 1996 to 2016.':
														(measure.label==='Percent Irrigated Agriculture'? 'The proportion (%) of the area of interest that is covered by irrigated agriculture.':
														(measure.label==='Lateral Connectivity of Floodplain'? 'The proportion of floodplain within the area of interest that is connected.':
														(measure.label==='Composition of Riparizan Zone Lands'? 'An average index value of the composition of lands within a 100-meter buffer of streams.':
														(measure.label==='Presence of Impoundments'? 'This measure describes whether or not an area is impacted by hydromodification.':
														"")))))}
													</span>
													</ReactTooltip>
												</td>
												<td>Water</td>
												<td>
													{measure.utility === "1" ? (
													measure.label==='303(d): Impaired Watershed Area'? 'Less':
													(measure.label==='Hydrologic Response to Land-Use Change'? 'Less':
													(measure.label==='Percent Irrigated Agriculture'? 'Less':
													(measure.label==='Lateral Connectivity of Floodplain'? 'More':
													(measure.label==='Composition of Riparizan Zone Lands'? 'More':
													(measure.label==='Presence of Impoundments'? 'Less':
													"")))))
													) : (
													measure.label==='303(d): Impaired Watershed Area'? 'More':
													(measure.label==='Hydrologic Response to Land-Use Change'? 'More':
													(measure.label==='Percent Irrigated Agriculture'? 'More':
													(measure.label==='Lateral Connectivity of Floodplain'? 'Less':
													(measure.label==='Composition of Riparizan Zone Lands'? 'Less':
													(measure.label==='Presence of Impoundments'? 'More':
													"")))))
													)}
												</td>
												<td>{measure.weight.toUpperCase()}</td>
												</tr>
											))
										}
										{weights.lcmr.selected &&
											weights.lcmr.selected.map((measure) => (
												<tr key={measure.value}>
												<td>
													{measure.label} &nbsp;
													<GoInfo data-tip data-for={measure.value} />
													<ReactTooltip id={measure.value} type='dark'>
													<span>
														{measure.label==='Vulnerable Areas of Terrestrial Endemic Species'? 'This measure represents the ratio of endemic species to the amount of protected land in the contiguous U.S.':
														(measure.label==='Threatened and Endangered Species - Critical Habitat Area'? 'The measure is based on the U.S. Fish and Wildlife Service designated federally threatened and endangered (T&E) critical habitat.':
														(measure.label==='Threatened and Endangered Species - Number of Species'? 'This attribute measures the number of federally threatened and endangered (T&E) species that have habitat ranges identified within each hexagon.':
														(measure.label==='Light Pollution Index'? 'An index that measures the intensity of light pollution within each hexagon.':
														(measure.label==='Terrestrial Vertebrate Biodiversity'? 'Definition of Terrestrial Vertebrate Biodiversity.':
														(measure.label==='Vulnerability to Invasive Plants'? 'Definition of Vulnerability to Invasive Plants.':
														"")))))}
													</span>
													</ReactTooltip>
												</td>
												<td>LCMR</td>
												<td>
													{measure.utility === "1" ? (
													measure.label==='Vulnerable Areas of Terrestrial Endemic Species'? 'More':
													(measure.label==='Threatened and Endangered Species - Critical Habitat Area'? 'More':
													(measure.label==='Threatened and Endangered Species - Number of Species'? 'More':
													(measure.label==='Light Pollution Index'? 'Less':
													(measure.label==='Terrestrial Vertebrate Biodiversity'? 'Higher':
													(measure.label==='Vulnerability to Invasive Plants'? 'Higher':
													"")))))
													) : (
													measure.label==='Vulnerable Areas of Terrestrial Endemic Species'? 'Less':
													(measure.label==='Threatened and Endangered Species - Critical Habitat Area'? 'Less':
													(measure.label==='Threatened and Endangered Species - Number of Species'? 'Less':
													(measure.label==='Light Pollution Index'? 'More':
													(measure.label==='Terrestrial Vertebrate Biodiversity'? 'Lower':
													(measure.label==='Vulnerability to Invasive Plants'? 'Lower':
													"")))))
													)}
												</td>
												<td>{measure.weight.toUpperCase()}</td>
												</tr>
											))
										}
										{weights.cl.selected &&
											weights.cl.selected.map((measure) => (
												<tr key={measure.value}>
												<td>
													{measure.label} &nbsp;
													<GoInfo data-tip data-for={measure.value} />
													<ReactTooltip id={measure.value} type='dark'>
													<span>
														{measure.label==='National Register of Historic Places'? 'A numeric attribute that represents the counts of historic places within each hexagon.':
														(measure.label==='National Heritage Area'? 'A percent attribute that stands for the proportion of heritage area within each hexagon.':
														(measure.label==='Proximity to Socially Vulnerable Communities'? 'This measure indicates the proximity to communities that are socially vulnerable according to the National Oceanic and Atmospheric Administration’s (NOAA) Social Vulnerability Index.':
														(measure.label==='Community Threat Index'? 'The Community Threat Index (CTI) comes from the Coastal Resilience Evaluation and Siting Tool (CREST).':
														"")))}
													</span>
													</ReactTooltip>
												</td>
												<td>Resilience</td>
												<td>
													{measure.utility === "1" ? (
													measure.label==='National Register of Historic Places'? 'More':
													(measure.label==='National Heritage Area'? 'More':
													(measure.label==='Proximity to Socially Vulnerable Communities'? 'More':
													(measure.label==='Community Threat Index'? 'Higher':
													(measure.label=== 'Social Vulnerability Index'? 'Higher':
													""))))
													) : (
													measure.label==='National Register of Historic Places'? 'Less':
													(measure.label==='National Heritage Area'? 'Less':
													(measure.label==='Proximity to Socially Vulnerable Communities'? 'Less':
													(measure.label==='Community Threat Index'? 'Lower':
													(measure.label=== 'Social Vulnerability Index'? 'Lower':
													""))))
													)}
												</td>
												<td>{measure.weight.toUpperCase()}</td>
												</tr>
											))
										}
										{weights.eco.selected &&
											weights.eco.selected.map((measure) => (
												<tr key={measure.value}>
												<td>
													{measure.label} &nbsp;
													<GoInfo data-tip data-for={measure.value} />
													<ReactTooltip id={measure.value} type='dark'>
													<span>
														{measure.label==='High Priority Working Lands'? 'The percentage area of pine, cropland, and pasture/hay classes from the National Land Cover Database (NLCD) 2016 classification map.':
														(measure.label==='Commercial Fishing Reliance'? 'Commercial fishing reliance measures the presence of commercial fishing through fishing activity as shown through permits and vessel landings relative to the population of a community. ':
														(measure.label==='Recreational Fishing Engagement'? 'Recreational fishing engagement measures the presence of recreational fishing through fishing activity estimates, including charter fishing pressure, private fishing pressure, and shore fishing pressure.':
														(measure.label==='Access & Recreation - Number of Access Points'? 'This measure indicates the number of points within a 25 km buffer radius of a hexagon, where the public can access places to engage in outdoor recreation.':
														"")))}
													</span>
													</ReactTooltip>
												</td>
												<td>Economy</td>
												<td>
													{measure.utility === "1" ? (
													measure.label==='High Priority Working Lands'? 'More':
													(measure.label==='Commercial Fishing Reliance'? 'Higher':
													(measure.label==='Recreational Fishing Engagement'? 'More':
													(measure.label==='Access & Recreation - Number of Access Points'? 'More':
													"")))
													) : (
													measure.label==='High Priority Working Lands'? 'Less':
													(measure.label==='Commercial Fishing Reliance'? 'Lower':
													(measure.label==='Recreational Fishing Engagement'? 'Less':
													(measure.label==='Access & Recreation - Number of Access Points'? 'Less':
													"")))
													)}
												</td>
												<td>{measure.weight.toUpperCase()}</td>
												</tr>
											))
										}
                                    </tbody>
								    </Table>
									Goal Weights Summary:
									<Table striped bordered hover size="sm">
									<thead>
                                        <tr>
                                          <th>RESTORE Goal</th>
										  <th>Weights</th>
                                        </tr>
                                    </thead>
									<tbody>
										{RESTOREGoal.map((goal,idx)=>{
											return (
												<tr key={idx}>
													<td>{goal}</td>
													<td>{Object.values(weights)[idx].weight}%</td>
												</tr>
											)
										})}

								    </tbody>
									</Table>
									<Button variant='dark' onClick={()=>{
										async function calculateNewData(){
											setWeightsDone(false);
											const weightList = {
												'high': 1,
												'medium':0.67,
												'low':0.33
											}
											
											// const intermediate=	Object.entries(weights)
											// 		.filter(goal=>goal[1].weight!==0)
											// 		.map(goal=>
											// 			['*',goal[1].weight/100,["+", 
											// 				goal[1].selected.map(measure=>{
											// 					if(measure.utility==='1'){
											// 						console.log( ['*',weightList[measure.weight],['number',['get', measure.value]]])
											// 						return ['*',weightList[measure.weight],['number',['get', measure.value]]]
											// 					}else{
											// 						return ['+',1, ['*',-1*weightList[measure.weight],['number',['get', measure.value]]]]
											// 					}
											// 				})
											// 			]]
											// 		);
											const intermediate = Object.entries(weights).filter(goal=>goal[1].weight!==0)
																	.map(goal=>['*',goal[1].weight/100,
																	                ["/",["+",0, ...goal[1].selected.map(measure=>{
																							if(measure.utility==='1'){
																								// console.log( ['*',weightList[measure.weight],['number',['get', measure.value]]])
																								return ['*',weightList[measure.weight],['number',['get', measure.value]]]
																							}else{
																								return ['+',1, ['*',-1*weightList[measure.weight],['number',['get', measure.value]]]]
																							}
																					})],goal[1].selected.length]
																	]);
											const newData = [
												"step", 
												['+',0,
												  ...intermediate
											    ],
												"#ffeda0",
												.1, "#ffeda0",
												.2, "#fed976",
												.3, "#feb24c",
												.4, "#fd8d3c",
												.5, "#fc4e2a",
												.6, "#e31a1c",
												.7, "hsl(348, 100%, 37%)",
												.8, "#bd0026"]
											await setData(data=>newData);
											setWeightsDone(true);
											setActiveSidebar(false);
											
										}
										if(Object.values(weights).reduce((a,b)=>{return a+b.weight},0)!==100){
											handleShow()
										}else{
										    calculateNewData();
										}
										
									}}>Generate Visualization</Button>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				</div>
				<Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Oops, Something went wrong!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please make sure the sum of RESTORE Goals to be 100 and at least 1 data measure is selected.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default Sidebar;