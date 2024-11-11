<script setup>
import { onMounted, watch } from 'vue';
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
  modelValue: {
    type: Object,
    required: true,
    default: () => ({ lat: 0, lng: 0 }),
  },
});
const emit = defineEmits(['update:modelValue']);

let map;
let marker = null;

watch(props, () => {
  if (marker != null && (props.modelValue.lat === 0 || props.modelValue.lng === 0)) {
    map.removeLayer(marker);
    marker = null;
  }
});

onMounted(() => {
  map = L.map('map').setView([51.759445, 19.457216], 5);
  L.tileLayer(mapUrl, {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  map.on('click', function (e) {
    if (marker) {
      map.removeLayer(marker);
    }
    const { lat, lng } = e.latlng;
    marker = L.marker([lat, lng], {
      icon: locationIcon,
    })
      .addTo(map)
      .bindPopup(`Współrzędne: ${lat}, ${lng}`)
      .openPopup();
    emit('update:modelValue', { lat, lng });
  });
});
</script>
<template>
  <div id="map" class="tw-w-full tw-h-full" />
</template>
