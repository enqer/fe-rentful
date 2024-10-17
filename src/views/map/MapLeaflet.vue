<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
let map;

onMounted(() => {
  // Inicjalizacja mapy
  map = L.map('map').setView([51.759445, 19.457216], 5.4); // Ustawiamy początkowy widok

  // Ustawienie kafelków (można wybrać kafelki OSM)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Dodanie markera z domyślną ikoną
  // const marker = L.marker([51.505, -0.09])
  //   .addTo(map)
  //   .bindPopup('Hello! This is a marker.')
  //   .openPopup();

  // Kliknięcie na mapę - odczytanie współrzędnych
  map.on('click', function (e) {
    const { lat, lng } = e.latlng;
    // alert(`Kliknięto na współrzędne: ${lat}, ${lng}`);

    // Możesz dodać marker w miejscu kliknięcia
    L.marker([lat, lng]).addTo(map).bindPopup(`Współrzędne: ${lat}, ${lng}`).openPopup();
  });
});
</script>
<template>
  <div id="map"></div>
</template>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
