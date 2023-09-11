import { defineStore } from "pinia";
import mapboxGl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import mapStyle from "../assets/mapConfigs/mapStyle.js";
import {
	MapObjectConfig,
	TaipeiTown,
	TaipeiVillage,
	TaipeiBuilding,
} from "../assets/mapConfigs/mapConfig.js";
// import { Threebox } from "threebox-plugin";

const { BASE_URL } = import.meta.env;

export const useMapStore = defineStore("map", {
	state: () => ({
		// Stores the mapbox map instance
		map: null,
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
		easeToLocation() {
			// this.map.easeTo({
			// 	center: ,
			// 	zoom: ,
			// 	duration: ,
			// 	pitch: ,
			// 	bearing:
			// });
		},
	},
});
