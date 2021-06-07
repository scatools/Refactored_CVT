import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const SidebarMode = ({ mode, setMode }) => {
	return (
		<ButtonGroup toggle className="mb-2">
									<ToggleButton
											type="radio"
											variant="outline-secondary"
                                            name="region"
				                            value="-1"
				                            checked={mode === '-1'}
				                            onChange={(e) => setMode(e.currentTarget.value)}
										>
											SCA Region
										</ToggleButton>
										<ToggleButton
											type="radio"
											variant="outline-secondary"
                                            name="states"
				                            value="view"
				                            checked={mode === 'view'}
				                            onChange={(e) => setMode(e.currentTarget.value)}   
										>
										Filter by States
										</ToggleButton>
									</ButtonGroup>	
	);
};
export default SidebarMode;
