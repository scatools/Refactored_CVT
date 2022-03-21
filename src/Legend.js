import React from 'react';

const Legend = () => {
	return (
		<div className="legend">
			<div className="legend-title">Overall Score</div>
			<div className="legend-scale">
				<ul className="legend-labels">
					<li>
						<span style={{background:'#ffeda0'}} />{'< 0.1'}
					</li>
					<li>
						<span style={{background:"#ffeda0"}} />0.2
					</li>
					<li>
						<span style={{background:"#fed976"}} />0.3
					</li>
					<li>
						<span style={{background:"#feb24c"}} />0.4
					</li>
					<li>
						<span style={{background:"#fd8d3c"}} />0.5
					</li>
                    <li>
						<span style={{background:"#fc4e2a"}} />0.6
					</li>
					<li>
						<span style={{background:"#bb0026"}} />0.7
					</li>
					<li>
						<span style={{background:"#bd0026"}} />{'> 0.8'}
					</li>
				</ul>
			</div>
		</div>
	);
};
export default Legend;
