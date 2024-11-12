<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import Supercluster from 'supercluster';
import 'leaflet/dist/leaflet.css';
import { currencySymbol } from '@/constants/Symbols';

const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const props = defineProps({
  announcements: {
    type: Array,
    required: true,
  },
});

let map;
let clusterIndex;

function createCircleIcon(content, isCluster = false) {
  return L.divIcon({
    className: isCluster ? 'circle-icon' : 'square-icon',
    html: `<span>${content}</span>`,
    iconSize: isCluster ? [30, 30] : [20, 20],
    iconAnchor: [15, 15],
  });
}

function updateClusters() {
  const bounds = map.getBounds();
  const zoom = map.getZoom();

  const clusters = clusterIndex.getClusters(
    [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
    zoom
  );

  map.eachLayer((layer) => {
    if (layer instanceof L.Marker && !layer._icon.classList.contains('leaflet-tile')) {
      map.removeLayer(layer);
    }
  });

  clusters.forEach((cluster) => {
    const [longitude, latitude] = cluster.geometry.coordinates;
    if (cluster.properties.cluster) {
      L.marker([latitude, longitude], {
        icon: createCircleIcon(cluster.properties.point_count, true),
      })
        .addTo(map)
        .bindPopup(`Offers: ${cluster.properties.point_count}`);
    } else {
      L.marker([latitude, longitude], {
        icon: createCircleIcon(`${cluster.properties.price}${currencySymbol}`),
      })
        .addTo(map)
        .bindPopup(`${cluster.properties.price} ${currencySymbol}`);
    }
  });
}

onMounted(() => {
  map = L.map('map').setView([51.759445, 19.457216], 6);
  L.tileLayer(mapUrl, {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  clusterIndex = new Supercluster({
    radius: 40,
    maxZoom: 16,
  });

  const geoJSONData = props.announcements.map((offer) => ({
    type: 'Feature',
    properties: {
      id: offer.id,
      price: offer.price,
    },
    geometry: {
      type: 'Point',
      coordinates: [offer.location.longitude, offer.location.latitude],
    },
  }));
  clusterIndex.load(geoJSONData);

  map.on('moveend', updateClusters);
  updateClusters();
});
</script>

<template>
  <div id="map" class="tw-w-full tw-h-full" />
</template>

<style>
.circle-icon {
  background-color: #ffffff;
  color: #18181b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  border: 2px solid #18181b;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
.square-icon {
  background-color: #ffffff;
  color: #18181b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  border: 2px solid #18181b;
  padding: 4px 8px;
  min-width: 80px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
