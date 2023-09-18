import { defineStore } from "pinia";
import mapboxGl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

import mapStyle from "../assets/mapConfigs/mapStyle.js";
import {
	MapObjectConfig,
	TaipeiTown,
	TaipeiVillage,
	TaipeiBuilding,
	maplayerCommonPaint,
	maplayerCommonLayout,
} from "../assets/mapConfigs/mapConfig.js";
// import { Threebox } from "threebox-plugin";

const { BASE_URL } = import.meta.env;

export const useMapStore = defineStore("map", {
	state: () => ({
		// Stores the mapbox map instance
		map: null,
		currentLayers: [],
		currentMap: 0,
	}),
	getters: {},
	actions: {
		/* Initialize Mapbox */
		// 1. Creates the mapbox instance and passes in initial configs
		initializeMapBox() {
			this.map = null;
			const MAPBOXTOKEN = import.meta.env.VITE_MAPBOXTOKEN;
			mapboxGl.accessToken = MAPBOXTOKEN;
			this.map = new mapboxGl.Map({
				...MapObjectConfig,
				style: mapStyle,
			});
			// this.map.addControl(new mapboxGl.NavigationControl());
			this.map.doubleClickZoom.disable();
			this.map.on("load", () => {
				this.initializeBasicLayers();
			});
			this.map.on("style.load", () => {
				this.initialize3dLayer();
			});
		},
		// 2. Adds three basic layers to the map (Taipei District, Taipei Village labels, and Taipei 3D Buildings)
		// Due to performance concerns, Taipei 3D Buildings won't be added in the mobile version
		initializeBasicLayers() {
			const images = [];
			images.forEach((element) => {
				this.map.loadImage(
					`${BASE_URL}/images/${element}.png`,
					(error, image) => {
						if (error) throw error;
						this.map.addImage(element, image);
					}
				);
			});
			fetch(`${BASE_URL}/maps/taipei_town.geojson`)
				.then((response) => response.json())
				.then((data) => {
					this.map
						.addSource("taipei_town", {
							type: "geojson",
							data: data,
						})
						.addLayer(TaipeiTown);
				});
			fetch(`${BASE_URL}/maps/taipei_village.geojson`)
				.then((response) => response.json())
				.then((data) => {
					this.map
						.addSource("taipei_village", {
							type: "geojson",
							data: data,
						})
						.addLayer(TaipeiVillage);
				});
			this.map
				.addSource("taipei_building_3d_source", {
					type: "vector",
					url: import.meta.env.VITE_MAPBOXTILE,
				})
				.addLayer(TaipeiBuilding);
		},
		/* Adding Map Layers */
		// 1.
		fetchLocalGeoJson(mapConfig, pageIndex, mapControls) {
			mapConfig.forEach((element, index) => {
				let mapLayerId = `${pageIndex}-${index + 1}`;
				axios
					.get(`${BASE_URL}/maps/${mapLayerId}.geojson`)
					.then((rs) => {
						this.addMapLayerSource(
							element,
							mapLayerId,
							rs.data,
							mapControls
						);
					})
					.catch((e) => console.error(e));
			});
		},
		// 2.
		addMapLayerSource(mapConfig, mapLayerId, data, mapControls) {
			this.map.addSource(mapLayerId, {
				type: "geojson",
				data: data,
			});
			this.addMapLayer(mapConfig, mapLayerId, mapControls);
		},
		// 3.
		addMapLayer(mapConfig, mapLayerId, mapControls) {
			let extra_paint_configs = {};
			let extra_layout_configs = {};
			if (mapConfig.icon) {
				extra_paint_configs = {
					...maplayerCommonPaint[
						`${mapConfig.type}-${mapConfig.icon}`
					],
				};
				extra_layout_configs = {
					...maplayerCommonLayout[
						`${mapConfig.type}-${mapConfig.icon}`
					],
				};
			}
			if (mapConfig.size) {
				extra_paint_configs = {
					...extra_paint_configs,
					...maplayerCommonPaint[
						`${mapConfig.type}-${mapConfig.size}`
					],
				};
				extra_layout_configs = {
					...extra_layout_configs,
					...maplayerCommonLayout[
						`${mapConfig.type}-${mapConfig.size}`
					],
				};
			}
			this.map.addLayer({
				id: mapLayerId,
				type: mapConfig.type,
				paint: {
					...maplayerCommonPaint[`${mapConfig.type}`],
					...extra_paint_configs,
					...mapConfig.paint,
				},
				layout: {
					...maplayerCommonLayout[`${mapConfig.type}`],
					...extra_layout_configs,
				},
				source: mapLayerId,
			});
			this.currentLayers.push(mapLayerId);
			this.currentMap = 0;

			if (!mapControls[0].layers.includes(+mapLayerId.slice(-1))) {
				this.map.setLayoutProperty(mapLayerId, "visibility", "none");
			}
		},
		switchMap(mapIndex, mapControls, index) {
			if (mapIndex === this.currentMap) return;

			mapControls[this.currentMap].layers.forEach((el) => {
				this.map.setLayoutProperty(
					`${index}-${el}`,
					"visibility",
					"none"
				);
			});

			mapControls[mapIndex].layers.forEach((el) => {
				this.map.setLayoutProperty(
					`${index}-${el}`,
					"visibility",
					"visible"
				);
			});

			this.currentMap = mapIndex;
		},
		initialize3dLayer() {
			// const tb = (window.tb = new Threebox(
			// 	this.map,
			// 	this.map.getCanvas().getContext("webgl"), //get the context from the map canvas
			// 	{ defaultLights: true }
			// ));
			// modelConfig.forEach((el) => {
			// 	this.map.addLayer({
			// 		id: el[0],
			// 		type: "custom",
			// 		renderingMode: "3d",
			// 		onAdd: function () {
			// 			const options = {
			// 				obj: `${BASE_URL}models/${el[1]}.gltf`,
			// 				type: "gltf",
			// 				scale: 3,
			// 				units: "meters",
			// 				rotation: { x: 0, y: 0, z: 0 },
			// 			};
			// 			tb.loadObj(options, (model) => {
			// 				model.setCoords(el[2]);
			// 				model.setRotation({ x: 0, y: 0, z: el[4] });
			// 				tb.add(model);
			// 			});
			// 		},
			// 		render: function () {
			// 			tb.update(); //update Threebox scene
			// 		},
			// 	});
			// });
		},
		easeToLocation(center) {
			if (center === "default") {
				this.map.easeTo({
					center: [121.536609, 25.044808],
					zoom: 12.5,
					duration: 3000,
					pitch: 0,
					bearing: 0,
				});
				return;
			}

			this.map.easeTo({
				center: center.center,
				zoom: center.zoom,
				duration: center.duration,
				pitch: center.pitch,
				bearing: center.bearing,
			});
		},
		clearMap() {
			if (this.currentLayers.length === 0) return;
			this.currentLayers.forEach((element) => {
				this.map.removeLayer(element);
				this.map.removeSource(element);
			});
			this.currentLayers.splice(0, this.currentLayers.length);
		},
	},
});
