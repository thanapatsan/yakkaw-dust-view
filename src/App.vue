<template>
  <div id="app" class="container">

    <div class="mt-2 grid gap-1 lg:gap-2 grid-flow-row grid-cols-1 lg:grid-cols-3">
      <SmallWidgetTH stationid="014" />
      <SmallWidgetTH stationid="3018" />
      <SmallWidgetTH stationid="006" />

      <!-- <FullWidgetTH stationid="014" />
      <FullWidgetTH stationid="3018" />
      <FullWidgetTH stationid="006" /> -->
    </div>

    <!-- <StoreData /> -->
  </div>
</template>

<script>
import { store } from "./store/store";

// import FullWidgetTH from "./components/FullWidgetTH";
import SmallWidgetTH from "./components/SmallWidgetTH";

// import StoreData from "./components/StoreData"

export default {
  name: "App",
  store,
  components: {
    // FullWidgetTH,
    SmallWidgetTH,
    // StoreData
  },

  methods: {
    fetchData() {
      this.$store.dispatch("fetchData");
    },
  },
  created() {
    this.fetchData();
  },
};
</script>


