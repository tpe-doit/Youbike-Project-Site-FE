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

- Just Content
- Map Layer (Supported map types: circle, fill, fill-extrusion, line, symbol, arc)
  - Unlimited geojsons
  - max 4 layers (each layer can contain multiple geojsons)
- Image
  - max 1 (square or flatter aspect ratios preferred)
- 3d model
  - max 1 (gltf)
- Credits

### Page Config Object

`/src/assets/mapConfigs/allTracks.js`

*Optional parameters can be omitted entirely if not needed.
