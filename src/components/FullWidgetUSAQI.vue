<template>
  <div class="flex flex-col max-w-full border-2 border-gray-500 rounded-md">

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
      :class="[`bg-${getUSAQIColorCode(calculateUSAQI_pm25(data.pm25))}`]"
    >
      <div class="row-span-2 col-span-1 text-center">
        <p class="text-6xl font-bold">
          {{ calculateUSAQI_pm25(data.pm25) }}
        </p>
        <p>US AQI</p>
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
      <p>{{ data.av24h | USAQIEmoji }}</p>
      <p>12h</p>
      <p>{{ data.av12h }}</p>
      <p>{{ data.av12h | USAQIEmoji }}</p>
      <p>6h</p>
      <p class="font-bold">{{ data.av6h }}</p>
      <p>{{ data.av6h | USAQIEmoji }}</p>
      <p>3h</p>
      <p>{{ data.av3h }}</p>
      <p>{{ data.av3h | USAQIEmoji }}</p>
      <p>1h</p>
      <p>{{ data.av1h }}</p>
      <p>{{ data.av1h | USAQIEmoji }}</p>
      <p>5m</p>
      <p class="font-bold">{{ data.pm25 }}</p>
      <p>{{ data.pm25 | USAQIEmoji }}</p>
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
  name: "FullWidgetUSAQI",
  props: {
    stationid: String,
    datasrc:{}
  },
  data() {
    return {  data: {} };
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
      if (value > 500) {
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
        return "green-500";
      } else if (value >= 51 && value <= 100) {
        return "yellow-400";
      } else if (value >= 101 && value <= 150) {
        return "orange-500";
      } else if (value >= 151 && value <= 200) {
        return "red-600";
      } else if (value >= 201 && value <= 300) {
        return "purple-600";
      } else if (value > 301) {
        return "red-800";
      } else return "gray-300";
    },

    
  },

  created() {
    this.data = this.datasrc.response.filter(
      (station) => station.dvid == this.stationid
    )[0];
  },
};
</script>


