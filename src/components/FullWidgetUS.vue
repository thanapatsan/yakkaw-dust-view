<template>
  <div
    class="flex flex-col max-w-full max-h-full border-2 border-gray-400 rounded-md"
  >
    <div class="px-4">
      <div class="my-4">
        <h1 class="text-2xl mb-1">
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
      :class="[`aqi-bg-${getUSAQIColorCode(calculateUSAQI_pm25(display.pm25))}`]"
    >
      <div class="row-span-2 col-span-1 text-center">
        <p class="text-5xl lg:text-6xl font-bold">
          {{ calculateUSAQI_pm25(display.pm25) }}
        </p>
        <p>US AQI</p>
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
          `border-b-4 aqi-border-${getUSAQIColorCode(
            calculateUSAQI_pm25(display.av24h)
          )}`,
        ]"
      >
        {{ display.av24h }}
      </p>

      <p>12h</p>
      <p
        class="w-full"
        :class="[
          `border-b-4 aqi-border-${getUSAQIColorCode(
            calculateUSAQI_pm25(display.av12h)
          )}`,
        ]"
      >
        {{ display.av12h }}
      </p>

      <p>6h</p>
      <p
        class="w-full"
        :class="[
          `border-b-4 aqi-border-${getUSAQIColorCode(
            calculateUSAQI_pm25(display.av6h)
          )}`,
        ]"
      >
        {{ display.av6h }}
      </p>

      <p>3h</p>
      <p
        class="w-full"
        :class="[
          `border-b-4 aqi-border-${getUSAQIColorCode(
            calculateUSAQI_pm25(display.av3h)
          )}`,
        ]"
      >
        {{ display.av3h }}
      </p>

      <p>1h</p>
      <p
        class="w-full"
        :class="[
          `border-b-4 aqi-border-${getUSAQIColorCode(
            calculateUSAQI_pm25(display.av1h)
          )}`,
        ]"
      >
        {{ display.av1h }}
      </p>

      <p>5m</p>
      <p
        class="w-full"
        :class="[
          `border-b-4 aqi-border-${getUSAQIColorCode(
            calculateUSAQI_pm25(display.pm25)
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
      } else return "?";
    },
    overrangeUSAQIIndicator: (value) => {
      if (value > 300) {
        return "⚠️";
      } else return value;
    },
    USAQIEmoji: (value) => {
      if (value > 0 && value <= 50) {
        return "🟢";
      } else if (value >= 51 && value <= 100) {
        return "🟡";
      } else if (value >= 101 && value <= 150) {
        return "🟠";
      } else if (value >= 151 && value <= 200) {
        return "🔴";
      } else if (value >= 201 && value <= 300) {
        return "🟣";
      } else if (value > 301) {
        return "🟤";
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
    calculateUSAQI_pm25: function (value) {
      let cHigh;
      let cLow;
      let iHigh;
      let iLow;

      if (value >= 0 && value <= 12.0) {
        iLow = 0;
        iHigh = 50;
        cLow = 0.0;
        cHigh = 12.0;
      } else if (value >= 12.1 && value <= 35.4) {
        iLow = 51;
        iHigh = 100;
        cLow = 12.1;
        cHigh = 35.4;
      } else if (value >= 35.5 && value <= 55.4) {
        iLow = 101;
        iHigh = 150;
        cLow = 35.5;
        cHigh = 55.4;
      } else if (value >= 55.5 && value <= 150.4) {
        iLow = 151;
        iHigh = 200;
        cLow = 55.5;
        cHigh = 150.4;
      } else if (value >= 150.5 && value <= 250.4) {
        iLow = 201;
        iHigh = 300;
        cLow = 150.5;
        cHigh = 250.4;
      } else if (value >= 250.5 && value <= 350.4) {
        iLow = 301;
        iHigh = 400;
        cLow = 250.5;
        cHigh = 350.4;
      } else if (value >= 350.5 && value <= 500.4) {
        iLow = 401;
        iHigh = 500;
        cLow = 350.5;
        cHigh = 500.4;
      } else if (value >= 500.5) {
        return 500 + (value - 500.5);
      } else return "???";

      let result = ((iHigh - iLow) / (cHigh - cLow)) * (value - cLow) + iLow;
      return Math.floor(result);
    },

    calculateUSAQI_pm100: function (value) {
      let cHigh;
      let cLow;
      let iHigh;
      let iLow;

      if (value > 0 && value <= 54) {
        iLow = 0;
        iHigh = 50;
        cLow = 0;
        cHigh = 54;
      } else if (value >= 55 && value <= 154) {
        iLow = 51;
        iHigh = 100;
        cLow = 55;
        cHigh = 154;
      } else if (value >= 155 && value <= 254) {
        iLow = 101;
        iHigh = 150;
        cLow = 155;
        cHigh = 254;
      } else if (value >= 255 && value <= 354) {
        iLow = 151;
        iHigh = 200;
        cLow = 255;
        cHigh = 354;
      } else if (value >= 355 && value <= 424) {
        iLow = 201;
        iHigh = 300;
        cLow = 355;
        cHigh = 424;
      } else if (value >= 425 && value <= 504) {
        iLow = 301;
        iHigh = 400;
        cLow = 425;
        cHigh = 504;
      } else if (value >= 505 && value <= 604) {
        iLow = 401;
        iHigh = 500;
        cLow = 505;
        cHigh = 604;
      } else if (value > 605) {
        return 500 + (value - 604);
      } else return "???";

      let result = ((iHigh - iLow) / (cHigh - cLow)) * (value - cLow) + iLow;
      return Math.floor(result);
    },

    getUSAQIColorCode: function (value) {
      if (value > 0 && value <= 50) {
        return "green";
      } else if (value >= 51 && value <= 100) {
        return "yellow";
      } else if (value >= 101 && value <= 150) {
        return "orange";
      } else if (value >= 151 && value <= 200) {
        return "red";
      } else if (value >= 201 && value <= 300) {
        return "purple";
      } else if (value > 301) {
        return "brown";
      } else return "gray";
    },

    
  },


  
};
</script>


