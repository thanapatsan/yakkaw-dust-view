<template>
  <div class="grid gap-1 lg:gap-2 grid-flow-row grid-cols-1 lg:grid-cols-3">
    <!-- <TinyWidgetTH
      :stationid="station.dvid"
      v-for="station in display"
      :key="station.dvid"
    /> -->

    <SmallWidgetTH
      :stationid="station.dvid"
      v-for="station in display"
      :key="station.dvid"
    />

    <!-- <FullWidgetTH
      :stationid="station.dvid"
      v-for="station in display"
      :key="station.dvid"
    /> -->

    <!-- <FullWidgetUS
      :stationid="station.dvid"
      v-for="station in display"
      :key="station.dvid"
    /> -->
  </div>
</template>

<script>
// import TinyWidgetTH from "./TinyWidgetTH";
import SmallWidgetTH from "./SmallWidgetTH";
// import FullWidgetTH from "./FullWidgetTH";
// import FullWidgetUS from "./FullWidgetUS";
export default {
  name: "StoreData",
  components: {
    // TinyWidgetTH,
    SmallWidgetTH,
    // FullWidgetTH,
    // FullWidgetUS,
  },

  computed: {
    display() {
      return this.$store.getters.getActiveStations;
    },
  },
};
</script>
