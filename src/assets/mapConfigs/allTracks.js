/* eslint-disable no-loss-of-precision */
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
						size: "big",
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
						size: "big",
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
						type: "fill",
						paint: {
							"fill-color": "#666",
							"fill-opacity": 0.8,
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
						type: "fill",
						paint: {
							"fill-color": "#666",
							"fill-opacity": 0.8,
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
						type: "fill",
						paint: {
							"fill-color": "#666",
							"fill-opacity": 0.8,
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
			caption: true,
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
			index: "village-helper",
			mapConfig: { center: "default" },
			images: true,
		},
		{
			index: "station-expansion",
			caption: true,
			mapConfig: {
				layers: [
					{
						type: "fill",
						paint: {
							"fill-color": [
								"case",
								["==", ["get", "class"], 1],
								"#40A461",
								["==", ["get", "class"], 2],
								"#7FBF7B",
								["==", ["get", "class"], 3],
								"#ACCFFF",
								["==", ["get", "class"], 4],
								"#BEBEBE",
								["==", ["get", "class"], 5],
								"#BFDAB8",
								["==", ["get", "class"], 6],
								"#3D56FF",
								"#8E8E8E",
							],
							"fill-opacity": 0.5,
							"fill-outline-color": "#555555",
						},
					},
				],
				center: {
					center: [121.52586280418996, 25.080435559940524],
					zoom: 11.0,
					duration: 3000,
					pitch: 0,
					bearing: 0,
				},
				mobileCenter: {
					center: [121.55586280418996, 25.040435559940524],
					zoom: 10.6,
					duration: 3000,
					pitch: 30,
					bearing: -10,
				},
			},
			mapControls: [
				{
					layers: [1],
					legend: [
						["fill", "#3D56FF"],
						["fill", "#40A461"],
						["fill", "#7FBF7B"],
						["fill", "#ACCFFF"],
						["fill", "#BEBEBE"],
						["fill", "#BFDAB8"],
						["fill", "#8E8E8E"],
					],
				},
			],
		},
		{
			index: "expansion-priority",
			// caption: true,
			mapConfig: {
				layers: [
					{
						type: "fill",
						paint: {
							"fill-color": [
								"interpolate",
								["linear"],
								["get", "Num_Space"],
								0,
								"#FFFFCC",
								80,
								"#800026",
							],
							"fill-opacity": 0.8,
							"fill-outline-color": "#555555",
						},
					},
					{
						type: "fill",
						paint: {
							"fill-color": [
								"interpolate",
								["linear"],
								["get", "Num_Car"],
								0,
								"#FFFFCC",
								40,
								"#800026",
							],
							"fill-opacity": 0.8,
							"fill-outline-color": "#555555",
						},
					},
				],
				center: {
					center: [121.52586280418996, 25.080435559940524],
					zoom: 11.753671549231125,
					duration: 3000,
					pitch: 0,
					bearing: 0,
				},
				mobileCenter: {
					center: [121.55586280418996, 25.040435559940524],
					zoom: 10.6,
					duration: 3000,
					pitch: 30,
					bearing: -10,
				},
			},
			mapControls: [
				{
					layers: [1],
					legend: [["lineGradient", "#800026", "#FFFFCC"]],
				},
				{
					layers: [2],
					legend: [["lineGradient", "#800026", "#FFFFCC"]],
				},
			],
		},
		{
			index: "green-future",
			mapConfig: {
				center: {
					center: [121.5608, 25.039083],
					zoom: 16,
					duration: 4000,
					pitch: 79.49999999999997,
					bearing: 0,
				},
				mobileCenter: {
					center: [121.52999788080645, 25.033683464432847],
					zoom: 19.879940985860358,
					duration: 4000,
					pitch: 68.12121996685961,
					bearing: -93.3720198049345,
				},
			},
			images: true,
		},
		{ index: "credits", mapConfig: { center: "default" } },
	],
	weekday: [
		{
			index: "weekday-user",
			mapConfig: {
				center: {
					center: [121.51538477043312, 25.058811618829735],
					zoom: 11.753671549231125,
					duration: 3000,
					pitch: 70,
					bearing: 20,
				},
				mobileCenter: {
					center: [121.536609, 25.044808000000003],
					zoom: 11,
					duration: 3000,
					pitch: 60,
					bearing: -10,
				},
			},
			images: "nocaption",
		},
		{
			index: "commute-path",
			caption: true,
			mapConfig: {
				layers: [
					{
						type: "arc",
						paint: {
							color: ["#fd7900", "#47d3d9"],
						},
					},
					{
						type: "circle",
						paint: {
							"circle-color": "white",
						},
					},
					{
						type: "symbol",
						layout: {
							"text-field": ["to-string", ["get", "name"]],
							"text-size": 16,
							"text-allow-overlap": true,
							"text-ignore-placement": true,
						},
						paint: {
							"text-color": "white",
							"text-halo-color": "#888",
							"text-halo-width": 5,
						},
					},
				],
				center: {
					center: [121.536609, 25.044808000000003],
					zoom: 12.5,
					duration: 4000,
					pitch: 50,
					bearing: -10,
				},
				mobileCenter: {
					center: [121.536609, 25.044808000000003],
					zoom: 11,
					duration: 4000,
					pitch: 60,
					bearing: -10,
				},
			},
			mapControls: [
				{
					layers: [1, 2, 3],
					legend: [
						["lineGradient", "#47d3d9", "#fd7900"],
						["circle", "white"],
					],
				},
			],
		},
		{
			index: "dongmen-runout",
			threed: {
				coordinates: [121.52921121866285, 25.033807497981314],
				rotation: { x: 90, y: 176.5, z: 0 },
				adjustment: { x: 0, y: 0.5, z: 0 },
				scale: 2,
			},
			mapConfig: {
				center: {
					center: [121.52890599608053, 25.033592119375055],
					zoom: 20,
					duration: 4000,
					pitch: 90,
					bearing: -110,
				},
				mobileCenter: {
					center: [121.52930788080645, 25.033703464432847],
					zoom: 20,
					duration: 4000,
					pitch: 70,
					bearing: -110,
				},
			},
		},
		{
			index: "dongmen-full",
			caption: true,
			threed: {
				coordinates: [121.52921121866285, 25.033807497981314],
				rotation: { x: 90, y: 176.5, z: 0 },
				adjustment: { x: 0, y: 0.5, z: 0 },
				scale: 2,
			},
			mapConfig: {
				center: {
					center: [121.52910599608053, 25.033592119375055],
					zoom: 20,
					duration: 4000,
					pitch: 90,
					bearing: -110,
				},
				mobileCenter: {
					center: [121.52950788080645, 25.033703464432847],
					zoom: 20,
					duration: 4000,
					pitch: 70,
					bearing: -110,
				},
			},
		},
		{
			index: "alternative-stations-dongmen",
			caption: true,
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
				center: {
					center: [121.529, 25.034098000000003],
					zoom: 16,
					duration: 4000,
					pitch: 0,
					bearing: 0,
				},
				mobileCenter: {
					center: [121.529, 25.034],
					zoom: 14.5,
					duration: 4000,
					pitch: 0,
					bearing: 0,
				},
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
			index: "zhoumei-idle",
			threed: {
				coordinates: [121.506443, 25.100458],
				rotation: { x: 90, y: 180, z: 0 },
				adjustment: { x: 0, y: 0.45, z: 0 },
				scale: 2,
			},
			mapConfig: {
				center: {
					center: [121.507043, 25.100778],
					zoom: 19.6,
					duration: 4000,
					pitch: 120,
					bearing: 40,
				},
				mobileCenter: {
					center: [121.506543, 25.100258],
					zoom: 20.1,
					duration: 4000,
					pitch: 70,
					bearing: 40,
				},
			},
		},
		{
			index: "zhoumei-optimized",
			threed: {
				coordinates: [121.506443, 25.100458],
				rotation: { x: 90, y: 180, z: 0 },
				adjustment: { x: 0, y: 0.45, z: 0 },
				scale: 2,
			},
			mapConfig: {
				center: {
					center: [121.507043, 25.100778],
					zoom: 19.4,
					duration: 4000,
					pitch: 120,
					bearing: 40,
				},
				mobileCenter: {
					center: [121.506543, 25.100258],
					zoom: 20.5,
					duration: 4000,
					pitch: 70,
					bearing: 40,
				},
			},
		},
		{
			index: "weekday-question",
			multipleChoice: 4,
			mapConfig: { center: "default" },
		},
		{ index: "credits", mapConfig: { center: "default" } },
	],
	weekend: [
		{
			index: "weekend-user",
			mapConfig: {
				center: {
					center: [121.51538477043312, 25.058811618829735],
					zoom: 11.753671549231125,
					duration: 3000,
					pitch: 70,
					bearing: 20,
				},
				mobileCenter: {
					center: [121.536609, 25.044808000000003],
					zoom: 11,
					duration: 3000,
					pitch: 60,
					bearing: -10,
				},
			},
			images: "nocaption",
		},
		{
			index: "leisure-path",
			mapConfig: {
				layers: [
					{
						type: "arc",
						paint: {
							color: ["#fd7900", "#47d3d9"],
						},
					},
					{
						type: "circle",
						paint: {
							"circle-color": "white",
						},
					},
					{
						type: "symbol",
						layout: {
							"text-field": ["to-string", ["get", "name"]],
							"text-size": 16,
							"text-allow-overlap": true,
							"text-ignore-placement": true,
						},
						paint: {
							"text-color": "white",
							"text-halo-color": "#888",
							"text-halo-width": 5,
						},
					},
				],
				center: {
					center: [121.51538477043312, 25.058811618829735],
					zoom: 11.3,
					duration: 3000,
					pitch: 60,
					bearing: 20,
				},
				mobileCenter: {
					center: [121.536609, 25.044808000000003],
					zoom: 11,
					duration: 3000,
					pitch: 60,
					bearing: -10,
				},
			},
			mapControls: [
				{
					layers: [1, 2, 3],
					legend: [
						["lineGradient", "#47d3d9", "#fd7900"],
						["circle", "white"],
					],
				},
			],
		},
		{
			index: "model-explanation",
			mapConfig: {
				center: {
					center: [121.51538477043312, 25.058811618829735],
					zoom: 11.753671549231125,
					duration: 3000,
					pitch: 70,
					bearing: 20,
				},
				mobileCenter: {
					center: [121.536609, 25.044808000000003],
					zoom: 11,
					duration: 3000,
					pitch: 60,
					bearing: -10,
				},
			},
			images: "nocaption",
		},
		{
			index: "prediction",
			mapConfig: {
				layers: [
					{
						type: "fill",
						paint: {
							"fill-color": [
								"interpolate",
								["linear"],
								["get", "Num_Space"],
								0,
								"#FFFFCC",
								80,
								"#800026",
							],
							"fill-opacity": 0.8,
							"fill-outline-color": "#555555",
						},
					},
					{
						type: "fill",
						paint: {
							"fill-color": [
								"interpolate",
								["linear"],
								["get", "Num_Car"],
								0,
								"#FFFFCC",
								40,
								"#800026",
							],
							"fill-opacity": 0.8,
							"fill-outline-color": "#555555",
						},
					},
				],
				center: {
					center: [121.52586280418996, 25.080435559940524],
					zoom: 11.753671549231125,
					duration: 3000,
					pitch: 0,
					bearing: 0,
				},
				mobileCenter: {
					center: [121.55586280418996, 25.040435559940524],
					zoom: 10.6,
					duration: 3000,
					pitch: 30,
					bearing: -10,
				},
			},
			mapControls: [
				{
					layers: [1],
					legend: [["lineGradient", "#800026", "#FFFFCC"]],
				},
				{
					layers: [2],
					legend: [["lineGradient", "#800026", "#FFFFCC"]],
				},
			],
		},
		{
			index: "convenient-isochrone",
			mapConfig: {
				center: {
					center: [121.52586280418996, 25.050435559940524],
					zoom: 11.11,
					duration: 3000,
					pitch: 0,
					bearing: 0,
				},
				layers: [
					{
						type: "fill",
						paint: {
							"fill-color": [
								"match",
								["get", "contour"],
								15,
								"#D94701",
								30,
								"#FD8D3C",
								45,
								"#FDBE85",
								"#FEEDDE",
							],
							"fill-opacity": [
								"interpolate",
								["linear"],
								["get", "contour"],
								15,
								0.5,
								60,
								0.25,
							],
						},
					},
					{
						type: "fill",
						paint: {
							"fill-color": [
								"match",
								["get", "contour"],
								15,
								"#D94701",
								30,
								"#FD8D3C",
								45,
								"#FDBE85",
								"#FEEDDE",
							],
							"fill-opacity": [
								"interpolate",
								["linear"],
								["get", "contour"],
								15,
								0.5,
								60,
								0.25,
							],
						},
					},
					{
						type: "fill",
						paint: {
							"fill-color": [
								"match",
								["get", "contour"],
								15,
								"#D94701",
								30,
								"#FD8D3C",
								45,
								"#FDBE85",
								"#FEEDDE",
							],
							"fill-opacity": [
								"interpolate",
								["linear"],
								["get", "contour"],
								15,
								0.5,
								60,
								0.25,
							],
						},
					},
					{
						type: "fill",
						paint: {
							"fill-color": [
								"match",
								["get", "contour"],
								15,
								"#D94701",
								30,
								"#FD8D3C",
								45,
								"#FDBE85",
								"#FEEDDE",
							],
							"fill-opacity": [
								"interpolate",
								["linear"],
								["get", "contour"],
								15,
								0.5,
								60,
								0.25,
							],
						},
					},
					{
						type: "symbol",
						layout: {
							"icon-image": "white-pin",
							"icon-size": 1,
							"icon-anchor": "bottom",
						},
					},
					{
						type: "symbol",
						layout: {
							"icon-image": "white-pin",
							"icon-size": 1,
							"icon-anchor": "bottom",
						},
					},
					{
						type: "symbol",
						layout: {
							"icon-image": "white-pin",
							"icon-size": 1,
							"icon-anchor": "bottom",
						},
					},
					{
						type: "symbol",
						layout: {
							"icon-image": "white-pin",
							"icon-size": 1,
							"icon-anchor": "bottom",
						},
					},
				],
			},
			mapControls: [
				{
					layers: [1, 5],
					legend: [
						["line", "#D94701"],
						["line", "#FD8D3C"],
						["line", "#FDBE85"],
						["line", "#FEEDDE"],
					],
				},
				{
					layers: [2, 6],
					legend: [
						["line", "#D94701"],
						["line", "#FD8D3C"],
						["line", "#FDBE85"],
						["line", "#FEEDDE"],
					],
				},
				{
					layers: [3, 7],
					legend: [
						["line", "#D94701"],
						["line", "#FD8D3C"],
						["line", "#FDBE85"],
						["line", "#FEEDDE"],
					],
				},
				{
					layers: [4, 8],
					legend: [
						["line", "#D94701"],
						["line", "#FD8D3C"],
						["line", "#FDBE85"],
						["line", "#FEEDDE"],
					],
				},
			],
		},
		{
			index: "weekend-question",
			multipleChoice: 4,
			mapConfig: {
				center: {
					center: [121.52586280418996, 25.080435559940524],
					zoom: 11.753671549231125,
					duration: 3000,
					pitch: 0,
					bearing: 0,
				},
			},
		},
		{ index: "credits", mapConfig: { center: "default" } },
	],
};
