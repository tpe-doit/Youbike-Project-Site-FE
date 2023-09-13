// Initial Position and Settings
export const MapObjectConfig = {
	antialias: true,
	container: "mapboxBox",
	center: [121.536609, 25.044808],
	maxBounds: [
		[121.3870596781498, 24.95733863075891], // Southwest coordinates
		[121.6998231749096, 25.21179993640203], // Northeast coordinates
	],
	zoom: 12.5,
	minZoom: 11,
	maxZoom: 22,
	interactive: false,
	projection: "globe", // display the map as a 3D globe
};

// Styles for base layer "Taipei Town"
export const TaipeiTown = {
	id: "taipei_town",
	source: "taipei_town",
	type: "symbol",
	layout: {
		"text-field": ["to-string", ["get", "TNAME"]],
		"text-size": [
			"interpolate",
			["linear"],
			["zoom"],
			11,
			10,
			13,
			12,
			15.5,
			14,
		],
		"text-allow-overlap": true,
	},
	paint: {
		"text-color": [
			"interpolate",
			["linear"],
			["zoom"],
			15,
			"#aaa",
			16,
			"#fff",
		],
		"text-halo-color": "#888",
		"text-halo-width": ["interpolate", ["linear"], ["zoom"], 15, 0, 16, 1],
		"text-opacity": ["interpolate", ["linear"], ["zoom"], 15.99, 1, 16, 0],
	},
};

// Styles for Base Layer "Taipei Village"
export const TaipeiVillage = {
	id: "taipei_village",
	source: "taipei_village",
	type: "symbol",
	layout: {
		"text-field": ["to-string", ["get", "VNAME"]],
		"text-size": 14,
	},
	paint: {
		"text-color": "#85bdbd",
		"text-opacity": [
			"interpolate",
			["linear"],
			["zoom"],
			15.49,
			0,
			15.5,
			1,
		],
	},
};

export const TaipeiBuilding = {
	id: "taipei_building_3d",
	source: "taipei_building_3d_source",
	"source-layer": "tp_building_height84-18p8j0",
	type: "fill-extrusion",
	minzoom: 14,
	paint: {
		"fill-extrusion-height": [
			"interpolate",
			["linear"],
			["get", "1_top_high"],
			0,
			0,
			1044.14,
			1044.14,
		],
		"fill-extrusion-opacity": 0.8,
		"fill-extrusion-color": [
			"interpolate",
			["linear"],
			["zoom"],
			14.4,
			"#121212",
			14.5,
			"#272727",
		],
	},
};
