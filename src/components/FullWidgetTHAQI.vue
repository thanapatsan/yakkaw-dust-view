<template>
  <div class="flex flex-col max-w-full border-2 border-gray-500 rounded-md">
      {{datasrc}}
    <div class="px-4">
      <div class="my-4">
        <h1 class="text-3xl mb-1">
          {{ data.place }}
        </h1>
        <h2 class="text-xl my-1">
          {{ data.address }}
        </h2>
        <h3>
          📅 {{ data.ddate }} {{ data.dtime | clockEmoji }} {{ data.dtime }}
        </h3>
      </div>
    </div>

    <div
      class="grid grid-rows-2 grid-cols-2 grid-flow-col items-center"
      :class="[`bg-${getTHAQIColorCode(calculateTHAQI_pm25(data.pm25))}`]"
    >
      <div class="row-span-2 col-span-1 text-center">
        <p class="text-6xl font-bold">
          {{ calculateTHAQI_pm25(data.pm25) }}
        </p>
        <p>TH AQI</p>
      </div>

      <div class="row-span-1 col-span-1">
        <p>
          PM<sub>2.5</sub>:
          <span class="font-bold">{{ data.pm25 }}</span> μg/m<sup>3</sup>
        </p>
      </div>
      <div class="row-span-1 col-span-1">
        <p>
          PM<sub>10</sub>:
          <span class="font-bold">{{ data.pm100 }}</span> μg/m<sup>3</sup>
        </p>
      </div>
    </div>

    <div
      class="grid grid-rows-4 grid-cols-6 grid-flow-col justify-items-center"
    >
      <div class="row-span-1 col-span-6 text-lg">
        <p>PM<sub>2.5</sub> Trend: {{ data.trend | trendIndicator }}</p>
      </div>

      <p>24h</p>
      <p>{{ data.av24h }}</p>
      <p>{{ data.av24h | THAQIEmoji }}</p>
      <p>12h</p>
      <p>{{ data.av12h }}</p>
      <p>{{ data.av12h | THAQIEmoji }}</p>
      <p>6h</p>
      <p class="font-bold">{{ data.av6h }}</p>
      <p>{{ data.av6h | THAQIEmoji }}</p>
      <p>3h</p>
      <p>{{ data.av3h }}</p>
      <p>{{ data.av3h | THAQIEmoji }}</p>
      <p>1h</p>
      <p>{{ data.av1h }}</p>
      <p>{{ data.av1h | THAQIEmoji }}</p>
      <p>5m</p>
      <p class="font-bold">{{ data.pm25 }}</p>
      <p>{{ data.pm25 | THAQIEmoji }}</p>
    </div>

    <div class="grid grid-cols-2 justify-items-center">
      <div class="row-span-1 col-span-1">
        <p class="">
          🌡️: <span class="font-bold">{{ data.temperature }}</span
          >&#8451;
        </p>
      </div>
      <div class="row-span-1 col-span-1">
        <p class="">
          💧: <span class="font-bold">{{ data.humidity }}</span
          >&#37;
        </p>
      </div>
    </div>

    <div class="px-4 my-1 text-sm text-gray-500">
      <p>{{ data.note }} ({{ data.dvid }})</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FullWidgetTHAQI",
  props: {
    stationid: String,
    datasrc: Object,
  },
  data() {
    return { rawdata: {}, data: {} };
  },
  filters: {
    trendIndicator: (value) => {
      if (value === "u") {
        return "📈";
      } else if (value === "d") {
        return "📉";
      } else return "?";
    },

    overrangeTHAQIIndicator: (value) => {
      if (value > 200) {
        return "⚠️";
      } else return value;
    },

    THAQIEmoji: (value) => {
      if (value > 0 && value <= 25) {
        return "🔵";
      } else if (value >= 26 && value <= 50) {
        return "🟢";
      } else if (value >= 51 && value <= 100) {
        return "🟡";
      } else if (value >= 101 && value <= 200) {
        return "🟠";
      } else if (value >= 201) {
        return "🔴";
      } else return "⚫";
    },
    clockEmoji: (value) => {
      let timestring = value;

      let hours = timestring.substring(0, 2);
      let minutes = timestring.substring(timestring.length, 3);
      let halfhour = minutes >= 16 && minutes <= 45;

      if (hours % 12 == 0) {
        if (halfhour) {
          return "🕧";
        } else return "🕛";
      } else if (hours % 12 == 1) {
        if (halfhour) {
          return "🕜";
        } else return "🕐";
      } else if (hours % 12 == 2) {
        if (halfhour) {
          return "🕝";
        } else return "🕑";
      } else if (hours % 12 == 3) {
        if (halfhour) {
          return "🕞";
        } else return "🕒";
      } else if (hours % 12 == 4) {
        if (halfhour) {
          return "🕟";
        } else return "🕓";
      } else if (hours % 12 == 5) {
        if (halfhour) {
          return "🕠";
        } else return "🕔";
      } else if (hours % 12 == 6) {
        if (halfhour) {
          return "🕡";
        } else return "🕕";
      } else if (hours % 12 == 7) {
        if (halfhour) {
          return "🕢";
        } else return "🕖";
      } else if (hours % 12 == 8) {
        if (halfhour) {
          return "🕣";
        } else return "🕗";
      } else if (hours % 12 == 9) {
        if (halfhour) {
          return "🕤";
        } else return "🕘";
      } else if (hours % 12 == 10) {
        if (halfhour) {
          return "🕥";
        } else return "🕙";
      } else if (hours % 12 == 11) {
        if (halfhour) {
          return "🕦";
        } else return "🕚";
      }
    },
  },

  methods: {
    calculateTHAQI_pm25: function (value) {
      let cHigh;
      let cLow;
      let iHigh;
      let iLow;

      if (value > 0 && value <= 25) {
        iLow = 0;
        iHigh = 25;
        cLow = 0;
        cHigh = 25;
      } else if (value >= 26 && value <= 37) {
        iLow = 26;
        iHigh = 50;
        cLow = 26;
        cHigh = 37;
      } else if (value >= 38 && value <= 50) {
        iLow = 51;
        iHigh = 100;
        cLow = 38;
        cHigh = 50;
      } else if (value >= 51 && value <= 90) {
        iLow = 101;
        iHigh = 200;
        cLow = 51;
        cHigh = 90;
      } else if (value >= 91) {
        return 200 + (value - 90);
      } else return "???";

      let result = ((iHigh - iLow) / (cHigh - cLow)) * (value - cLow) + iLow;

      return Math.floor(result);
    },

    calculateTHAQI_pm100: function (value) {
      let cHigh;
      let cLow;
      let iHigh;
      let iLow;

      if (value > 0 && value <= 50) {
        iLow = 0;
        iHigh = 25;
        cLow = 0;
        cHigh = 50;
      } else if (value >= 51 && value <= 80) {
        iLow = 26;
        iHigh = 50;
        cLow = 51;
        cHigh = 80;
      } else if (value >= 81 && value <= 120) {
        iLow = 51;
        iHigh = 100;
        cLow = 81;
        cHigh = 120;
      } else if (value >= 121 && value <= 180) {
        iLow = 101;
        iHigh = 200;
        cLow = 121;
        cHigh = 180;
      } else if (value >= 181) {
        return 200 + (value - 180);
      } else return "???";

      let result = ((iHigh - iLow) / (cHigh - cLow)) * (value - cLow) + iLow;
      return Math.floor(result);
    },

    getTHAQIColorCode: function (value) {
      if (value > 0 && value <= 25) {
        return "blue-400";
      } else if (value >= 26 && value <= 50) {
        return "green-500";
      } else if (value >= 51 && value <= 100) {
        return "yellow-300";
      } else if (value >= 101 && value <= 200) {
        return "orange-500";
      } else if (value >= 201) {
        return "red-600";
      } else return "gray-300";
    },
  },

  mounted() {
    
  },
};
</script>


