<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [25, 95],
  },
});
const locationIcon = new LeafIcon({
  iconUrl: '/src/assets/icons/location.svg',
});

const props = defineProps({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  isPrecised: {
    type: Boolean,
    required: true,
  },
});

let map;

onMounted(() => {
  map = L.map('map').setView([51.759445, 19.457216], 6);
  L.tileLayer(mapUrl, {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  if (props.latitude > 0 && props.longitude > 0) {
    if (props.isPrecised) {
      L.marker([props.latitude, props.longitude], {
        icon: locationIcon,
      })
        .addTo(map)
        .openPopup();
    } else {
      L.circle([props.latitude, props.longitude], {
        color: 'red',
        fillColor: 'red',
        fillOpacity: 0.1,
        radius: 10000,
      }).addTo(map);
    }
  }
});
</script>
<template>
  <div id="map" class="tw-w-full tw-h-full" />
</template>
