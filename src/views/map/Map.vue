<script setup>
import { shallowRef, onMounted, onUnmounted, markRaw, ref } from 'vue';
import * as maptilersdk from '@maptiler/sdk';

const mapContainer = (shallowRef < HTMLElement) | (null > null);
const initialState = { lng: 19.457216, lat: 51.759445, zoom: 4 };

const map = new maptilersdk.Map({
  apiKey: import.meta.env.VITE_API_KEY,
  language: maptilersdk.Language.AUTO,
  container: mapContainer.value,
  center: [initialState.lng, initialState.lat],
  zoom: initialState.zoom,
});
const marker = (ref < Marker) | (null > null);

onMounted(() => {}),
  onUnmounted(() => {
    if (map.value) {
      map.value.remove();
    }
  });
</script>
<template>
  <div class="mapwrap">
    <div ref="mapContainer" class="map" />
  </div>
</template>
<style>
.mapwrap {
  position: relative;
  width: 100%;
  /* height: calc(100vh - 77px); */
  height: 100%;
  background-color: red;
  padding: 10px;
}

.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.maplibregl-control-container {
  display: none !important;
  height: 0;
}
</style>
