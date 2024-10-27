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

let map;
let marker = null;

onMounted(() => {
  map = L.map('map').setView([51.759445, 19.457216], 5.4);
  L.tileLayer(mapUrl, {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  map.on('click', function (e) {
    if (marker) {
      console.log(marker);
      map.removeLayer(marker);
    }
    const { lat, lng } = e.latlng;
    marker = L.marker([lat, lng], {
      icon: locationIcon,
    })
      .addTo(map)
      .openPopup();
  });
});
</script>
<template>
  <div id="map" />
</template>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
