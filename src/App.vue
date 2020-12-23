<template>
  <div id="app" class="container">
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <!-- <PassData stationid="014" :datasrc="rawdata" /> -->
      <!-- <FullWidgetTHAQI stationid="014" /> -->
      <HelloWorld stationid="014" />
    </div>
  </div>
</template>

<script>
// import axios from "axios";

// import PassData from "./components/passdata.vue";
// import FullWidgetTHAQI from "./components/FullWidgetTHAQI";
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    // PassData,
    // FullWidgetTHAQI,
    HelloWorld,
  },
  data() {
    return { rawdata: {} };
  },
  created() {
    //* actual API point
    // axios
    //   .get(`https://yakkaw.mfu.ac.th/api/yakkaw/devices`)
    //   .then((response) => {
    //     this.rawdata = response.data;
    //   })
    //   .catch((e) => {
    //     this.errors.push(e);
    //   });
  },
};
</script>


