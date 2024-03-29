import React from 'react';

const Legend = ({ opacity }) => {
	return (
		<div className="legend">
			<div className="legend-title">Overall Score</div>
			<div className="legend-scale">
				<ul className="legend-labels">
					<li>
						<span style={{background:'#ffeda0', opacity: parseInt(opacity)/100}} />{'< 0.1'}
					</li>
					<li>
						<span style={{background:"#f8d685", opacity: parseInt(opacity)/100}} />0.1 ~ 0.2
					</li>
					<li>
						<span style={{background:"#f1bf6d", opacity: parseInt(opacity)/100}} />0.2 ~ 0.3
					</li>
					<li>
						<span style={{background:"#eaa757", opacity: parseInt(opacity)/100}} />0.3 ~ 0.4
					</li>
					<li>
						<span style={{background:"#e28e45", opacity: parseInt(opacity)/100}} />0.4 ~ 0.5
					</li>
                    <li>
						<span style={{background:"#db7537", opacity: parseInt(opacity)/100}} />0.5 ~ 0.6
					</li>
					<li>
						<span style={{background:"#d2592e", opacity: parseInt(opacity)/100}} />0.6 ~ 0.7
					</li>
					<li>
						<span style={{background:"#c83a28", opacity: parseInt(opacity)/100}} />0.7 ~ 0.8
					</li>
					<li>
						<span style={{background:"#bd0026", opacity: parseInt(opacity)/100}} />{'> 0.8'}
					</li>
				</ul>
			</div>
		</div>
	);
};
export default Legend;
