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
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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
      .bindPopup(`Współrzędne: ${lat}, ${lng}`)
      .openPopup();
  });
});
</script>
<template>
  <div class="tw-w-[90vw] tw-h-[50vh] lg:tw-w-[80vw] 2xl:tw-w-full">
    <div id="map" class="tw-w-full tw-h-full" />
  </div>
</template>
