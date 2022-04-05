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
						<span style={{background:"#f8d685"}} />0.1 ~ 0.2
					</li>
					<li>
						<span style={{background:"#f1bf6d"}} />0.2 ~ 0.3
					</li>
					<li>
						<span style={{background:"#eaa757"}} />0.3 ~ 0.4
					</li>
					<li>
						<span style={{background:"#e28e45"}} />0.4 ~ 0.5
					</li>
                    <li>
						<span style={{background:"#db7537"}} />0.5 ~ 0.6
					</li>
					<li>
						<span style={{background:"#d2592e"}} />0.6 ~ 0.7
					</li>
					<li>
						<span style={{background:"#c83a28"}} />0.7 ~ 0.8
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
