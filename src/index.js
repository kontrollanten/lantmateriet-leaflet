import L from 'leaflet';
import { CRS } from 'proj4leaflet';

const apiKey = process.env.LANTMATERIET_TOKEN;
const crs = new L.Proj.CRS('EPSG:3006',
  '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
  {
    resolutions: [
      4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8
    ],
    origin: [-1200000.000000, 8500000.000000 ],
    bounds:  L.bounds( [-1200000.000000, 8500000.000000], [4305696.000000, 2994304.000000])
  });

const map = new L.Map('map', {
  crs: crs,
  continuousWorld: true,
});

new L.TileLayer(`https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/${apiKey}/?service=wmts&request=GetTile&version=1.0.0&layer=topowebb&style=default&tilematrixset=3006&tilematrix={z}&tilerow={y}&tilecol={x}&format=image%2Fpng`, {
  maxZoom: 9,
  minZoom: 0,
  continuousWorld: true,
  attribution: '&copy; <a href="https://www.lantmateriet.se/en/">Lantmäteriet</a> Topografisk Webbkarta Visning, CCB',
}).addTo(map);

map.setView([59.3367, 18.0667], 7);
