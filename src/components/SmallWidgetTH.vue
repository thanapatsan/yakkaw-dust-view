<template>
  <div class="flex flex-row max-w-full border border-gray-400 rounded-md" >
    <div class="flex-1">
      <div class="m-2">
        <h1 class="text-xl font-medium my-1">
          {{ display.place }}
        </h1>
        <h2 class="text-base my-1">
          {{ display.address }}
        </h2>
        <h3 class="text-sm my-1">
          📅 {{ display.ddate }} {{ display.dtime | clockEmoji }}
          {{ display.dtime }}
        </h3>
        <h4 class="text-sm my-1">
          🌡️: <span>{{ display.temperature }}</span
          >&#8451; 💧: <span>{{ display.humidity }}</span
          >&#37;
        </h4>
      </div>

      <div
        class="grid grid-rows-1 grid-cols-5 grid-flow-col justify-items-center text-center h-1 mb-1 px-1"
      >
        <p
          class="w-11/12 rounded-md"
          :class="[
            `aqi-bg-${getTHAQIColorCode(calculateTHAQI_pm25(display.av24h))}`,
          ]"
        ></p>

        <p
          class="w-11/12 rounded-md"
          :class="[
            `aqi-bg-${getTHAQIColorCode(calculateTHAQI_pm25(display.av12h))}`,
          ]"
        ></p>

        <p
          class="w-11/12 rounded-md"
          :class="[
            `aqi-bg-${getTHAQIColorCode(calculateTHAQI_pm25(display.av6h))}`,
          ]"
        ></p>

        <p
          class="w-11/12 rounded-md"
          :class="[
            `aqi-bg-${getTHAQIColorCode(calculateTHAQI_pm25(display.av3h))}`,
          ]"
        ></p>

        <p
          class="w-11/12 rounded-md"
          :class="[
            `aqi-bg-${getTHAQIColorCode(calculateTHAQI_pm25(display.av1h))}`,
          ]"
        ></p>
      </div>

      <div class="mx-2 mb-1">
        <p class="text-xs text-gray-500">
          {{ display.note }} ({{ display.dvid }})
        </p>
      </div>
    </div>

    <div
      class="flex flex-col justify-center text-center w-1/3"
      :class="[
        `aqi-bg-${getTHAQIColorCode(calculateTHAQI_pm25(display.pm25))}`,
      ]"
    >
      <p class="text-4xl font-bold">
        {{ calculateTHAQI_pm25(display.pm25) }}
      </p>
      <p>TH AQI</p>

      <p class="text-sm mt-1">
        PM<sub>2.5</sub>:
        <span class="font-bold">{{ display.pm25 }}</span> μg/m<sup>3</sup>
      </p>
      <p class="text-sm mb-1">
        PM<sub>10</sub>:
        <span class="font-bold">{{ display.pm100 }}</span> μg/m<sup>3</sup>
      </p>

      <p class="text-sm">
        Trend: {{ display.trend | trendIndicator }}
      </p>

    </div>
  </div>
</template>

<script>
export default {
  name: "FullWidgetTHAQI",
  props: {
    stationid: { type: String, default: "014" },
  },

  computed: {
    display() {
      return this.$store.getters.getDataById(this.stationid);
    },
  },

  filters: {
    trendIndicator: (value) => {
      if (value === "u") {
        return "📈";
      } else if (value === "d") {
        return "📉";
      } else if (value === "e") {
        return "➡️";
      } else return "?";
    },

    overrangeTHAQIIndicator: (value) => {
      if (value > 150) {
        return "⚠️";
      }
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

      let halfhour = minutes >= 20 && minutes <= 39;

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
        return "blue";
      } else if (value >= 26 && value <= 50) {
        return "green";
      } else if (value >= 51 && value <= 100) {
        return "yellow";
      } else if (value >= 101 && value <= 200) {
        return "orange";
      } else if (value >= 201) {
        return "red";
      } else return "gray";
    },
  },
};
</script>


