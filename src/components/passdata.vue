<template>
  <div class="c">
    {{ displaydata }}
  </div>
</template>

<script>
export default {
  name: "PassData",
  props: {
    stationid: String,
    datasrc: Object,
  },

  computed: {
    displaydata: function () {
      let rawdata = this.datasrc.response;
      return rawdata.filter(
          (station) => station.dvid == this.stationid
        )[0];
    },
  },

  created() {},
};
</script>


