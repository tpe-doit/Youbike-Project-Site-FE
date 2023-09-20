# YouBike Project Site

## Installation

Run `npm install` in the terminal. Then add an .env file:

```
BASE_URL=/
NODE_ENV=development

VITE_APP_TITLE=YouBike優化分析
VITE_APP_VERSION=1.0.0
VITE_MAPBOXTOKEN=<omitted>
VITE_MAPBOXTILE=<omitted>
```

run `npm run dev` to enter development mode. ctrl-c to exit.

## Adding Pages

To create a page, you must provide a config object as well as content.

5 page types are supported. Each page should have a unique index. All materials associated with a page must be named using the index. For geojsons, append a -{number} at the end of the file name since each page can contain more than 1 geojson.

All materials are located in the `/public` folder.

-   Just Content
-   Map Layer (Supported map types: circle, fill, fill-extrusion, line, symbol, arc)
    -   Unlimited geojsons
    -   max 4 layers (each layer can contain multiple geojsons)
-   Image
    -   max 1 (square or flatter aspect ratios preferred)
-   3d model
    -   max 1 (gltf)
-   Multiple Choice
-   Credits

### Page Config Object

`/src/assets/mapConfigs/allTracks.js`

\*Optional parameters can be omitted entirely if not needed.

```js
{
	index: "shortage", // Required (Unique)
	caption: true, // Optional | Small grey text under main content
	mapConfig: { // Required | Must at least fill in the "center" prop
		layers: [ // Optional | If page has geojsons
			// First config object refers to shortage-1.geojson
			{ // Ref Taipei City Dashboard Map Config Obj
				type: "circle", // Required
				paint: {}, // Optional
				layout: {}, // Optional
				size: "big", // Optional
				icon: "border", // Optional
			},
			// Second config object refers to shortage-2.geojson, etc.
		],
		center: { // Required (can also be "default")
			center: [121.536609, 25.044808], // Required
			zoom: 12.5, // Required
			duration: 3000, // Required
			pitch: 25, // Required
			bearing: 10, // Required
		},
		mobileCenter: { // Optional
			center: [121.536609, 25.044808],
			zoom: 11,
			duration: 3000,
			pitch: 25,
			bearing: 10,
		},
	},
	mapControls: [ // Optional but Required if page has geojsons
		{
			layers: [3, 2], // Required. Corresponds to geojson no., can contain multiple
			legend: [ // Required. 7 options listed below
				["circle", "#404040"],
				["circleStacked", "#ca0020"],
				["line", "#9f9f9f"],
				["lineStacked", "#e6e6e6"],
				["lineGradient", "#f4a582", "#e6e6e6"],
				["fill", "#ca0020"],
				["symbol", "youbike"],
			],
		},
	],
	images: false, // Optional. Fill in true if page has an image
	threed: { // Optional. Fill in object if has 3d object
		coordinates: [121.52921121866285, 25.033807497981314],
		rotation: { x: 90, y: 176.5, z: 0 },
		adjustment: { x: 0, y: 0.5, z: 0 },
		scale: 2,
	},
	multipleChoice: false, // Optional. Fill in true if page is multiple choice
},
```

### Content Config Object

`/src/assets/lang/ch.js`

```js
"station-expansion": { // Same as page index
	title: "", // Required
	content: "", // Required (except for multiple choice)
	note: "", // Optional. "caption" parameter should be set to true
	"map-1": "", // Optional. Name of map 1
	"map-2": "", // Optional. Name of map 2
	"btn-1": "", // Optional. Switch button of map 1
	"btn-2": "", // Optional. Switch button of map 2
	"legend-1-1": "", // Optional. Legend item 1 of map 1
	"legend-1-2": "", // Optional. Legend item 2 of map 1
	"legend-2-1": "", // Optional. Legend item 1 of map 2
	image: "", // Image caption
	"ans-1": "", // Optional. But all 4 must be filled out if multiple choice
	"ans-2": "",
	"ans-3": "",
	"ans-4": "",
},
```
