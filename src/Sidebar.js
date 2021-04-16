import React, { useState } from 'react';
import { Button, Accordion, Card, Form, Row, Col, ButtonGroup, ToggleButton, Table, Modal } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import './main.css';
import Select from 'react-select';
import {useDispatch,useSelector} from 'react-redux';
import {changeMeasures,changeMeasuresWeight,changeGoalWeights} from './action';




const RESTOREGoal = ['Habitat', 'Water Quality & Quantity', 'Living Coastal & Marine Resources','Community Resilience','Gulf Economy']

const Sidebar = ({activeSidebar,setActiveSidebar,setWeightsDone, setData}) =>{
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

	const [ radioValue, setRadioValue ] = useState('SCA');
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
									<ButtonGroup toggle className="mb-2">
										<ToggleButton
											type="radio"
											variant="outline-secondary"
											name="SCA"
											value="SCA"
											checked={radioValue === 'SCA'}
											onChange={(e) => setRadioValue(e.currentTarget.value)}
										>
											SCA Region
										</ToggleButton>
										<ToggleButton
											type="radio"
											variant="outline-secondary"
											name="states"
											value="states"
											checked={radioValue === 'state'}
											onChange={(e) => setRadioValue(e.currentTarget.value)}
										>
											Filter by States
										</ToggleButton>
									</ButtonGroup>
									<br />
									<Accordion.Toggle eventKey="1" as={Button} variant="dark">
										Next
									</Accordion.Toggle>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card className="my-2">
							<Accordion.Toggle as={Card.Header} eventKey="1">
								Data Measures:
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="1">
								<Card.Body>
									<span>Habitat:</span>
									<Select
										styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
										menuPortalTarget={document.body}
										options={[
											{ value: 'hab1', label: 'Connectivity to Existing Protected Area' },
											{ value: 'hab2', label: 'Structural Connectivity Index' },
											{ value: 'hab3', label: 'Threat of Urbanization' },
											{ value: 'hab4', label: 'Land Cover - Composition of Natural Lands ' }
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
											<div className="m-2" key={measure.value}>
												<span style={{ display: 'block' }} className="my-1">
													{measure.label}
												</span>
												<ButtonGroup toggle>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="utility"
														value="-1"
														checked={measure.utility === '-1'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'hab'
															)}
													>
														UnDesired
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="utility"
														value="1"
														checked={measure.utility === '1'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'hab'
															)}
													>
														Desired
													</ToggleButton>
												</ButtonGroup>
												<ButtonGroup toggle className="ml-2">
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="low"
														checked={measure.weight === 'low'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'hab'
															)}
													>
														Low
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="medium"
														checked={measure.weight === 'medium'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'hab'
															)}
													>
														Medium
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="high"
														checked={measure.weight === 'high'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'hab'
															)}
													>
														High
													</ToggleButton>
												</ButtonGroup>
											</div>
										))}
									<br />
									<span>Water Quality & Quantity:</span>
									<Select
										styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
										menuPortalTarget={document.body}
										options={[
											{ value: 'wq1', label: "Impaired Watershed Area -- EPA '303(d)' list " },
											{ value: 'wq2', label: 'Stream Abundance' },
											{ value: 'wq3', label: 'Hydrologic Response to Land-Use Change' }
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
											<div className="m-2" key={measure.value}>
												<span style={{ display: 'block' }} className="my-1">
													{measure.label}
												</span>
												<ButtonGroup toggle>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="utility"
														value="-1"
														checked={measure.utility === '-1'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'wq'
															)}
													>
														UnDesired
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="utility"
														value="1"
														checked={measure.utility === '1'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'wq'
															)}
													>
														Desired
													</ToggleButton>
												</ButtonGroup>
												<ButtonGroup toggle className="ml-2">
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="low"
														checked={measure.weight === 'low'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'wq'
															)}
													>
														Low
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="medium"
														checked={measure.weight === 'medium'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'wq'
															)}
													>
														Medium
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="high"
														checked={measure.weight === 'high'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'wq'
															)}
													>
														High
													</ToggleButton>
												</ButtonGroup>
											</div>
										))}
									<br />
									<span>Living Costal & Marine Resources:</span>
									<Select
										styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
										menuPortalTarget={document.body}
										options={[
											{ value: 'lcmr1', label: 'Biodiversity Index ' },
											{
												value: 'lcmr2',
												label: 'Threatened and Endangered Species - Critical Habitat Area '
											},
											{
												value: 'lcmr3',
												label: 'Threatened and Endangered Species - Number of Species '
											},
											{ value: 'lcmr4', label: 'Light Pollution Index  ' }
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
											<div className="m-2" key={measure.value}>
												<span style={{ display: 'block' }} className="my-1">
													{measure.label}
												</span>
												<ButtonGroup toggle>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="utility"
														value="-1"
														checked={measure.utility === '-1'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'lcmr'
															)}
													>
														UnDesired
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="utility"
														value="1"
														checked={measure.utility === '1'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'lcmr'
															)}
													>
														Desired
													</ToggleButton>
												</ButtonGroup>
												<ButtonGroup toggle className="ml-2">
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="low"
														checked={measure.weight === 'low'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'lcmr'
															)}
													>
														Low
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="medium"
														checked={measure.weight === 'medium'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'lcmr'
															)}
													>
														Medium
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="high"
														checked={measure.weight === 'high'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'lcmr'
															)}
													>
														High
													</ToggleButton>
												</ButtonGroup>
											</div>
										))}
									<br />
									<span>Community Resilience:</span>
									<Select
										styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
										menuPortalTarget={document.body}
										options={[
											{ value: 'cl1', label: 'National Register of Historic Places' },
											{ value: 'cl2', label: 'National Heritage Area' },
											{ value: 'cl3', label: 'Social Vulnerability Index' },
											{ value: 'cl4', label: 'Community Threat Index ' }
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
											<div className="m-2" key={measure.value}>
												<span style={{ display: 'block' }} className="my-1">
													{measure.label}
												</span>
												<ButtonGroup toggle>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="utility"
														value="-1"
														checked={measure.utility === '-1'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'cl'
															)}
													>
														UnDesired
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="utility"
														value="1"
														checked={measure.utility === '1'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'cl'
															)}
													>
														Desired
													</ToggleButton>
												</ButtonGroup>
												<ButtonGroup toggle className="ml-2">
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="low"
														checked={measure.weight === 'low'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'cl'
															)}
													>
														Low
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="medium"
														checked={measure.weight === 'medium'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'cl'
															)}
													>
														Medium
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="high"
														checked={measure.weight === 'high'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'cl'
															)}
													>
														High
													</ToggleButton>
												</ButtonGroup>
											</div>
										))}
									<br />
									<span>Gulf Economy:</span>
									<Select
										styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
										menuPortalTarget={document.body}
										options={[
											{ value: 'eco1', label: 'Working Lands' },
											{ value: 'eco2', label: 'Commercial Fishery Index' },
											{ value: 'eco3', label: 'Recreational Fishery Index' },
											{ value: 'eco4', label: 'Access & Recreation' }
										]}
										isMulti
										placeholder="Select Community Resilience measures..."
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
											<div className="m-2" key={measure.value}>
												<span style={{ display: 'block' }} className="my-1">
													{measure.label}
												</span>
												<ButtonGroup toggle>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="utility"
														value="-1"
														checked={measure.utility === '-1'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'eco'
															)}
													>
														UnDesired
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="utility"
														value="1"
														checked={measure.utility === '1'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'eco'
															)}
													>
														Desired
													</ToggleButton>
												</ButtonGroup>
												<ButtonGroup toggle className="ml-2">
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="low"
														checked={measure.weight === 'low'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'eco'
															)}
													>
														Low
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="medium"
														checked={measure.weight === 'medium'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'eco'
															)}
													>
														Medium
													</ToggleButton>
													<ToggleButton
														type="radio"
														variant="outline-secondary"
														name="weight"
														value="high"
														checked={measure.weight === 'high'}
														onChange={(e) =>
															handleChange(
																e.currentTarget.value,
																e.currentTarget.name,
																measure.value,
																'eco'
															)}
													>
														High
													</ToggleButton>
												</ButtonGroup>
											</div>
										))}
									<br />
									<Accordion.Toggle eventKey="2" as={Button} variant="dark">
										Next
									</Accordion.Toggle>
								</Card.Body>
							</Accordion.Collapse>
						</Card>

						<Card className="my-2">
							<Accordion.Toggle as={Card.Header} eventKey="2">
								RESTORE Goal Weights:
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="2">
								<Card.Body>
									<Form>
									{weights.hab.selected &&
									    (<>
										<span>Habitat:</span>
										<Form.Group as={Row}>
											<Col xs="9">
												<RangeSlider
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
										</>)
                                    }
									{weights.wq.selected &&
									    (<>
										<span>Water Quality & Quantity:</span>
										<Form.Group as={Row}>
										<Col xs="9">
												<RangeSlider
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
										</>)
                                    }
									{weights.lcmr.selected &&
									    (<>
										<span>Living Costal & Marine Resources:</span>
										<Form.Group as={Row}>
										<Col xs="9">
												<RangeSlider
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
										</>)
                                    }
									{weights.cl.selected &&
									    (<>
										<span>Community Resilience:</span>
										<Form.Group as={Row}>
										<Col xs="9">
												<RangeSlider
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
										</>)
                                    }
									{weights.eco.selected &&
									    (<>
										<span>Gulf Economy:</span>
										<Form.Group as={Row}>
										<Col xs="9">
												<RangeSlider
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
										</>)
                                    }
									</Form>
									<br />
									<Accordion.Toggle eventKey="3" as={Button} variant="dark">
										Next
									</Accordion.Toggle>
								</Card.Body>
							</Accordion.Collapse>
						</Card>

						<Card className="my-2">
							<Accordion.Toggle as={Card.Header} eventKey="3">
								Review:
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="3">
								<Card.Body>
									Data Measure:
									<Table striped bordered hover size="sm">
									<thead>
                                        <tr>
                                          <th>Measure Name</th>
										  <th>Goal Related</th>
                                          <th>Utility</th>
                                          <th>Weights</th>
                                        </tr>
                                    </thead>
									<tbody>
										{weights.hab.selected&&
										   weights.hab.selected.map(measure=>(
											   <tr key={measure.value}>
												   <td>{measure.label}</td>
												   <td>Habitat</td>
												   <td>{measure.utility==='1'? 'Desired':'UnDesired'}</td>
												   <td>{measure.weight.toUpperCase()}</td>
											   </tr>
										   ))
										}
										{weights.wq.selected&&
										   weights.wq.selected.map(measure=>(
											   <tr key={measure.value}>
												   <td>{measure.label}</td>
												   <td>Water Quality</td>
												   <td>{measure.utility==='1'? 'Desired':'UnDesired'}</td>
												   <td>{measure.weight.toUpperCase()}</td>
											   </tr>
										   ))
										}
										{weights.lcmr.selected&&
										   weights.lcmr.selected.map(measure=>(
											   <tr key={measure.value}>
												   <td>{measure.label}</td>
												   <td>LCMR</td>
												   <td>{measure.utility==='1'? 'Desired':'UnDesired'}</td>
												   <td>{measure.weight.toUpperCase()}</td>
											   </tr>
										   ))
										}
										{weights.cl.selected&&
										   weights.cl.selected.map(measure=>(
											   <tr key={measure.value}>
												   <td>{measure.label}</td>
												   <td>Resilience</td>
												   <td>{measure.utility==='1'? 'Desired':'UnDesired'}</td>
												   <td>{measure.weight.toUpperCase()}</td>
											   </tr>
										   ))
										}
										{weights.eco.selected&&
										   weights.eco.selected.map(measure=>(
											   <tr key={measure.value}>
												   <td>{measure.label}</td>
												   <td>Economy</td>
												   <td>{measure.utility==='1'? 'Desired':'UnDesired'}</td>
												   <td>{measure.weight.toUpperCase()}</td>
											   </tr>
										   ))
										}
                                    </tbody>     
								    </Table>
									Goal Weights:
									<Table striped bordered hover size="sm">
									<thead>
                                        <tr>
                                          <th>RESTORE Goal</th>
										  <th>Goal Weights</th>
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
																								console.log( ['*',weightList[measure.weight],['number',['get', measure.value]]])
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