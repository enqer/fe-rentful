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

function createIcon(content, isCluster = false) {
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
      const clusterId = cluster.properties.cluster_id;
      const offers = clusterIndex.getLeaves(clusterId, Infinity);
      const offerList = offers
        .map(
          (offer) =>
            `<div class="tw-bg-white"><a href="/" class="tw-no-underline  ">
              <div class="tw-flex tw-items-center tw-gap-3 tw-text-primary ">
                <img src="${offer.properties.image}" width="40px" " />
                <div>
                  <div class="tw-text-xs tw-capitalize">${offer.properties.title}</div>
                  <div class="tw-text-xs tw-text-red-500">${offer.properties.price}${currencySymbol}</div>
                </div>
              </div>
            </a></div>`
        )
        .join('');
      const popupContent = `<div class="tw-flex tw-flex-col tw-gap-1">${offerList}</div>`;

      L.marker([latitude, longitude], {
        icon: createIcon(cluster.properties.point_count, true),
      })
        .addTo(map)
        .bindPopup(popupContent);
    } else {
      L.marker([latitude, longitude], {
        icon: createIcon(`${cluster.properties.price}${currencySymbol}`),
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
      ...offer,
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

.leaflet-popup-content-wrapper {
  background-color: #f0ede6;
  border-radius: 8px;
  max-height: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.leaflet-popup-tip {
  background-color: #eeeef7;
}
</style>
