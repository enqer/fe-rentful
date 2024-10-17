<script setup lang="ts">
import { Map, MapStyle, Marker, config, type MapOptions } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, markRaw, ref } from 'vue';
import * as maptilersdk from '@maptiler/sdk';

const mapContainer = shallowRef<HTMLElement | null>(null);
const map = shallowRef()


onMounted(() => {
  const initialState = { lng: 19.457216, lat: 51.759445, zoom: 4.7 };
  if (mapContainer.value){
    const options: MapOptions = {
      apiKey: import.meta.env.VITE_API_KEY,
      language:  maptilersdk.Language.AUTO,
      container: mapContainer.value,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,

    }
    map.value = new Map(options);

  }


  // new Marker({ color: '#FF0000' }).setLngLat([139.7525, 35.6846]).addTo(map.value);
}),
onUnmounted(() => {
  if (map.value) {
    map.value.remove();
  }
});
</script>
<template>
  <div class="map-wrap">
    <div ref="mapContainer" class="map" />
  </div>
</template>
<style>
.map-wrap {
  position: relative;
  width: 100%;
  /* height: calc(100vh - 77px); */
  height: 100%;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
.maplibregl-control-container {
  display: none !important;
  height: 0;
}
</style>
