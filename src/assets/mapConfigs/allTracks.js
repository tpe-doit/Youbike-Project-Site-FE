export const allTracks = {
	management: [
		{
			index: "shortage",
			caption: true,
			mapConfig: {
				layers: [
					{
						type: "circle",
						paint: {
							"circle-color": [
								"interpolate",
								["linear"],
								["get", "available_rate_mean_03"],
								0.11,
								"#ca0020",
								0.87,
								"#e4665c",
								0.92,
								"#e97c69",
								0.96,
								"#f4a582",
								0.98,
								"#bababa",
								1,
								"#797979",
							],
						},
						size: "xl",
						icon: "border",
					},
					{
						type: "circle",
						paint: {
							"circle-color": [
								"interpolate",
								["linear"],
								["get", "available_rate_mean_07"],
								0.11,
								"#ca0020",
								0.87,
								"#e4665c",
								0.92,
								"#e97c69",
								0.96,
								"#f4a582",
								0.98,
								"#bababa",
								1,
								"#797979",
							],
						},
						icon: "border",
						size: "xl",
					},
					{
						type: "circle",
						paint: {
							"circle-color": [
								"case",
								["<=", ["get", "differ_avaliable"], -0.2],
								"#404040",
								["<=", ["get", "differ_avaliable"], -0.05],
								"#9f9f9f",
								["<=", ["get", "differ_avaliable"], 0.05],
								"#e6e6e6",
								["<=", ["get", "differ_avaliable"], 0.2],
								"#f4a582",
								"#ca0020",
							],
						},
						size: "xl",
						icon: "border",
					},
				],
				center: {
					center: [121.536609, 25.044808],
					zoom: 12.5,
					duration: 3000,
					pitch: 25,
					bearing: 10,
				},
				mobileCenter: {
					center: [121.536609, 25.044808],
					zoom: 11,
					duration: 3000,
					pitch: 25,
					bearing: 10,
				},
			},
			mapControls: [
				{
					layers: [3],
					legend: [
						["circle", "#404040"],
						["circle", "#9f9f9f"],
						["circle", "#e6e6e6"],
						["circle", "#f4a582"],
						["circle", "#ca0020"],
					],
				},
				{
					layers: [1],
					legend: [
						["circle", "#ca0020"],
						["circle", "#e4665c"],
						["circle", "#e97c69"],
						["circle", "#f4a582"],
						["circle", "#bababa"],
						["circle", "#797979"],
					],
				},
				{
					layers: [2],
					legend: [
						["circle", "#ca0020"],
						["circle", "#e4665c"],
						["circle", "#e97c69"],
						["circle", "#f4a582"],
						["circle", "#bababa"],
						["circle", "#797979"],
					],
				},
			],
		},
		{
			index: "dispatch-optimization",
			mapConfig: {
				layers: [
					{
						type: "circle",
						paint: {
							"circle-color": "#666",
							"circle-radius": [
								"interpolate",
								["linear"],
								["get", "capacity"],
								0,
								0,
								1000,
								400,
							],
						},
						icon: "border",
					},
					{
						type: "fill-extrusion",
						paint: {
							"fill-extrusion-color": "#48CBFF",
							"fill-extrusion-height": [
								"interpolate",
								["linear"],
								["get", "閒置車_202307"],
								0,
								0,
								500,
								25000,
							],
							"fill-extrusion-opacity": 0.8,
						},
					},
					{
						type: "circle",
						paint: {
							"circle-color": "#666",
							"circle-radius": [
								"interpolate",
								["linear"],
								["get", "capacity"],
								0,
								0,
								1000,
								400,
							],
						},
						icon: "border",
					},
					{
						type: "fill-extrusion",
						paint: {
							"fill-extrusion-color": "#2171B5",
							"fill-extrusion-height": [
								"interpolate",
								["linear"],
								["get", "建議調整柱數_202307"],
								0,
								0,
								500,
								25000,
							],
							"fill-extrusion-opacity": 0.8,
						},
					},
					{
						type: "circle",
						paint: {
							"circle-color": "#666",
							"circle-radius": [
								"interpolate",
								["linear"],
								["get", "Capacity"],
								0,
								0,
								1000,
								400,
							],
						},
						icon: "border",
					},
					{
						type: "fill-extrusion",
						paint: {
							"fill-extrusion-color": "#FFAB40",
							"fill-extrusion-height": [
								"interpolate",
								["linear"],
								["get", "月均_調度車數差(模擬-現實)"],
								0,
								0,
								500,
								10000,
							],
							"fill-extrusion-opacity": 0.8,
						},
					},
				],
				center: {
					center: [121.51346642942684, 25.029449855138438],
					zoom: 13.591806231612589,
					duration: 3000,
					pitch: 72.82724555188693,
					bearing: 25.55086095698175,
				},
				mobileCenter: {
					center: [121.53346642942684, 25.049449855138438],
					zoom: 11,
					duration: 3000,
					pitch: 60,
					bearing: 15,
				},
			},
			mapControls: [
				{
					layers: [1, 2],
					legend: [
						["line", "#48CBFF"],
						["lineStacked", "#666"],
						["circleStacked", "#666"],
					],
				},
				{
					layers: [3, 4],
					legend: [
						["line", "#2171B5"],
						["lineStacked", "#666"],
						["circleStacked", "#666"],
					],
				},
				{
					layers: [5, 6],
					legend: [
						["line", "#FFAB40"],
						["lineStacked", "#666"],
						["circleStacked", "#666"],
					],
				},
			],
		},
		{
			index: "alternative-stations",
			mapConfig: {
				layers: [
					{
						type: "circle",
						paint: {
							"circle-color": [
								"case",
								["<=", ["get", "sum_cor"], 132],
								"#975506",
								["<=", ["get", "sum_cor"], 297.67],
								"#EF7535",
								["<=", ["get", "sum_cor"], 670.83],
								"#DCC454",
								"#F9F9F9",
							],
						},
					},
					{
						type: "line",
						paint: {
							"line-color": [
								"case",
								["<=", ["get", "times"], 3],
								"#5A1846",
								["<=", ["get", "times"], 14],
								"#831A3D",
								["<=", ["get", "times"], 75],
								"#E3611C",
								"#FFC300",
								// "interpolate",
								// ["linear"],
								// ["get", "times"],
								// 3,
								// "#5A1846",
								// 14,
								// "#831A3D",
								// 75,
								// "#E3611C",
								// 4940,
								// "#FFC300",
							],
						},
					},
				],
				center: "default",
			},
			mapControls: [
				{
					layers: [1, 2],
					legend: [
						["lineGradient", "#5A1846", "#FFC300"],
						["circle", "#E6BA1B"],
					],
				},
			],
		},
		{
			index: "management-mid",
			threed: false,
			mapConfig: { center: "default" },
			mapControls: false,
			multipleChoice: true,
			images: false,
		},
		{
			index: "management-end",
			threed: false,
			mapConfig: { center: "default" },
			mapControls: false,
			multipleChoice: false,
			images: false,
		},
	],
	weekday: [
		{
			index: "management-start",
			threed: false,
			mapConfig: false,
			mapControls: false,
			images: false,
		},
	],
	weekend: [
		{
			index: "management-start",
			threed: false,
			mapConfig: false,
			mapControls: false,
			images: false,
		},
	],
};
