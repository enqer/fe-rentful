<script setup>
import { onMounted, watch } from 'vue';
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

function getHtmlItem(offer) {
  return `<div class="tw-bg-white tw-w-[200px] ">
            <a href="/announcement/${offer.properties.id}" class="tw-no-underline  ">
              <div class="tw-flex tw-items-center tw-gap-3 tw-text-primary ">
                <img src="${offer.properties.image}" width="40px" height="30px" " />
                <div>
                  <div class="tw-text-xs tw-capitalize tw-line-clamp-1">${offer.properties.title}</div>
                  <div class="tw-text-xs tw-text-red-500">${offer.properties.price}${currencySymbol}</div>
                </div>
              </div>
            </a>
          </div>`;
}

function updateClusters() {
  const bounds = map.getBounds();
  const zoom = map.getZoom();

  const clusters = clusterIndex.getClusters(
    [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
    zoom
  );

  map.eachLayer((layer) => {
    if (layer instanceof L.Marker && !layer._icon.classList.contains('leaflet-title')) {
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
            getHtmlItem(offer) +
            '<div class=" tw-border-0 tw-border-b tw-border-solid tw-border-gray-300"></div>'
        )
        .join('');
      const popupContent = `<div class="tw-flex tw-flex-col tw-gap-1 tw-m-0">${offerList}</div>`;

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
        .bindPopup(getHtmlItem(cluster));
    }
  });
}

function setupClusters(announcements) {
  clusterIndex = new Supercluster({
    radius: 40,
    maxZoom: 16,
  });

  const geoJSONData = announcements.map((offer) => ({
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
  updateClusters();
}

function setupMap() {
  map = L.map('map').setView([51.759445, 19.457216], 6);
  L.tileLayer(mapUrl, {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  setupClusters(props.announcements);

  map.on('moveend', updateClusters);
}

watch(
  () => props.announcements,
  (newAnnouncements) => {
    setupClusters(newAnnouncements);
    updateClusters();
  },
  { deep: true }
);

onMounted(() => setupMap());
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
  background-color: white;
  border-radius: 8px;
  max-height: 200px;
  padding: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.leaflet-popup-content {
  margin: 13px 5px 5px;
}

.leaflet-popup-tip {
  background-color: #eeeef7;
}
</style>
