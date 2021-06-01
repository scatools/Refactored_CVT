import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const SidebarMode = ({ mode, setMode }) => {
	return (
		<ButtonGroup toggle className="mb-2">
									<ToggleButton
											type="radio"
											variant="outline-secondary"
                                            name="view"
				                            value="view"
				                            checked={mode === 'view'}
				                            onChange={(e) => setMode(e.currentTarget.value)}
										>
											SCA Region
										</ToggleButton>
										<ToggleButton
											type="radio"
											variant="outline-secondary"
                                            name="view"
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
