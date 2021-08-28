export const defaultLayer = {
	id: 'cvt-boundry',
	'source-layer': 'SCA_Boundry-13ifc0',
	type: 'fill',
	paint: {
		'fill-outline-color': '#484896',
		'fill-color': '#6e599f',
		'fill-opacity': 0.2
	},
	minzoom: 0,
	maxzoom: 22
};

export const dataLayer = {
	id: 'cvt-data',
	'source-layer': 'sca_landonly_withdata7_rename',
	type: 'fill',
	minzoom: 0,
	maxzoom: 22
};

export const dataLayerHightLight = {
	id: 'cvt-data-highlighted',
	type: 'fill',
	source: 'cvt',
	'source-layer': 'sca_landonly_withdata7_rename',
	paint: {
		'fill-outline-color': '#484896',
		'fill-color': '#6e599f',
		'fill-opacity': 0.75
	}
};
