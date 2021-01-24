<template>
  <div
    class="flex flex-col max-w-full max-h-full border-2 border-gray-400 rounded-md"
  >
    <div class="px-4">
      <div class="my-4">
        <h1 class="text-2xl mb-1 font-medium">
          {{ display.place }}

        </h1>
        <h2 class="text-lg my-1">
          {{ display.address }}
        </h2>
        <h3>
          📅 {{ display.ddate }} {{ display.dtime | clockEmoji }}
          {{ display.dtime }}
        </h3>
      </div>
    </div>

    <div
      class="grid grid-rows-2 grid-cols-2 grid-flow-col items-center text-center"
      :class="[`aqi-bg-${getTHAQIColorCode(calculateTHAQI_pm25(display.pm25))}`]"
    >
      <div class="row-span-2 col-span-1 text-center">
        <p class="text-5xl lg:text-6xl font-bold">
          {{ calculateTHAQI_pm25(display.pm25) }}
        </p>
        <p>TH AQI</p>
      </div>

      <div class="row-span-1 col-span-1">
        <p>
          PM<sub>2.5</sub>:
          <span class="font-bold">{{ display.pm25 }}</span> μg/m<sup>3</sup>
        </p>
      </div>
      <div class="row-span-1 col-span-1">
        <p>
          PM<sub>10</sub>:
          <span class="font-bold">{{ display.pm100 }}</span> μg/m<sup>3</sup>
        </p>
      </div>
    </div>

    <div
      class="grid grid-rows-3 grid-cols-6 grid-flow-col justify-items-center text-center bg-gray-100"
    >
      <div class="row-span-1 col-span-6 text-lg">
        <p>PM<sub>2.5</sub> Trend: {{ display.trend | trendIndicator }}</p>
      </div>

      <p>24h</p>
      <p
        class="w-full"
        :class="[
          `border-b-4 aqi-border-${getTHAQIColorCode(
            calculateTHAQI_pm25(display.av24h)
          )}`,
        ]"
      >
        {{ display.av24h }}
      </p>

      <p>12h</p>
      <p
        class="w-full"
        :class="[
          `border-b-4 aqi-border-${getTHAQIColorCode(
            calculateTHAQI_pm25(display.av12h)
          )}`,
        ]"
      >
        {{ display.av12h }}
      </p>

      <p>6h</p>
      <p
        class="w-full"
        :class="[
          `border-b-4 aqi-border-${getTHAQIColorCode(
            calculateTHAQI_pm25(display.av6h)
          )}`,
        ]"
      >
        {{ display.av6h }}
      </p>

      <p>3h</p>
      <p
        class="w-full"
        :class="[
          `border-b-4 aqi-border-${getTHAQIColorCode(
            calculateTHAQI_pm25(display.av3h)
          )}`,
        ]"
      >
        {{ display.av3h }}
      </p>

      <p>1h</p>
      <p
        class="w-full"
        :class="[
          `border-b-4 aqi-border-${getTHAQIColorCode(
            calculateTHAQI_pm25(display.av1h)
          )}`,
        ]"
      >
        {{ display.av1h }}
      </p>

      <p>5m</p>
      <p
        class="w-full"
        :class="[
          `border-b-4 aqi-border-${getTHAQIColorCode(
            calculateTHAQI_pm25(display.pm25)
          )}`,
        ]"
      >
        {{ display.pm25 }}
      </p>
    </div>

    <div class="grid grid-cols-2 justify-items-center">
      <div class="row-span-1 col-span-1">
        <p class="">
          🌡️: <span class="font-bold">{{ display.temperature }}</span
          >&#8451;
        </p>
      </div>
      <div class="row-span-1 col-span-1">
        <p class="">
          💧: <span class="font-bold">{{ display.humidity }}</span
          >&#37;
        </p>
      </div>
    </div>

    <div class="px-4 my-1 text-sm text-gray-500">
      <p>{{ display.note }} ({{ display.dvid }})</p>
    </div>
  </div>
</template>


<script>
export default {
  name: "FullWidgetTH",
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


