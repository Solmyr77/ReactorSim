<script setup>
import { PowerIcon, ArrowPathRoundedSquareIcon } from "@heroicons/vue/24/solid";
import { isObject } from "@vue/shared";
</script>


<script>
export default {
  data() {
    return {
      isOn: false,
      isCoolingOn: false,
      generatedPower: 0,
      temperature: 32,
      popupText: "",
      showPopup: false,
      timeOut: undefined,
      coolingCounter: undefined,
      heatCounter: undefined,
      idleCounter: undefined,
      startNumber: 10,
      fail: false,
      generatedPowerSum: 0,
      elapsedTime: 0,
      elapsedCounter: undefined,
      imgSrc: "/ReactorSim/src/images/reactor_off.png",
    }
  },
  mounted() {
    const coolingTickTime = 150;
    const heatTickTime = 100;
    const idleTickTime = 3000;

    this.coolingCounter = setInterval(() => {
      if (this.isCoolingOn && !this.fail) {
        if (this.isOn) {
          if (this.temperature > 32) {
            this.temperature--;
          }
        }
        else {
          if (this.temperature > 32) {
            this.temperature--;
          }
        }
      }
    }, coolingTickTime);

    this.heatCounter = setInterval(() => {
      if (this.isOn && !this.fail) {
        this.temperature++;
        if (this.temperature >= 40) {
          this.generatedPower = this.generatePower();
          this.generatedPowerSum += Number(this.generatedPower);
        }

        if (this.temperature < 40 && !this.isCoolingOn) {
          this.imgSrc = "/ReactorSim/src/images/reactor_starting.png"
        }

        else if (this.temperature >= 40 && !this.isCoolingOn) {
          this.imgSrc = "/ReactorSim/src/images/reactor_on.png"
        }

        if (this.temperature >= 100) {
          this.fail = true;
          this.imgSrc = "/ReactorSim/src/images/reactor_failed.png"
        }
      }
    }, heatTickTime);

    this.idleCounter = setInterval(() => {
      if (!this.isOn && this.temperature > 32 && !this.fail) {
        this.temperature--;
      }
    }, idleTickTime);

    this.elapsedCounter = setInterval(() => {
      this.elapsedTime += 1;
    }, 1000);
  },
  beforeUnmount() {

  },
  methods: {
    secondsToTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      const paddedHours = String(hours).padStart(2, '0');
      const paddedMinutes = String(minutes).padStart(2, '0');
      const paddedSeconds = String(remainingSeconds).padStart(2, '0');

      return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    },
    generatePower() {
      let minChange = -2;
      let maxChange = 2;

      let change = Math.floor(Math.random() * (maxChange - minChange + 1)) + minChange;
      let nextNumber = this.startNumber + change;

      if (nextNumber < 5) nextNumber = 5;
      if (nextNumber > 15) nextNumber = 15;

      nextNumber *= this.temperature / 3;

      return nextNumber.toFixed(2);
    },
    handleIsOn() {
      // Start sequence
      if (!this.isOn) {
        this.isOn = true;
        if (this.temperature >= 40) {
          this.imgSrc = "/ReactorSim/src/images/reactor_on.png"
        }
        else {
          this.imgSrc = "/ReactorSim/src/images/reactor_starting.png"
        }
      }

      // Power off sequence
      else {
        if (this.temperature > 70) {
          clearTimeout(this.timeOut);

          this.showPopup = true;
          this.popupText = "Sikertelen leállítási kísérlet, reaktor hőfok túl magas (> 70 °C)";

          this.timeOut = setTimeout(() => {
            this.showPopup = false;
          }, 4000);
        }
        else {
          this.isOn = false;
          this.imgSrc = "/ReactorSim/src/images/reactor_off.png"
        }
      }
    },
    handleCooling() {
      this.isCoolingOn = !this.isCoolingOn;
      if (this.isCoolingOn) {
        this.imgSrc = "/ReactorSim/src/images/reactor_cooled.png"
      }
      else {
        if (this.isOn && this.temperature >= 40) {
          this.imgSrc = "/ReactorSim/src/images/reactor_on.png"
        }
        else if (this.isOn && this.temperature < 40) {
          this.imgSrc = "/ReactorSim/src/images/reactor_starting.png"
        }
        else {
          this.imgSrc = "/ReactorSim/src/images/reactor_off.png"
        }
      }
    },
    handleReset() {
      this.fail = false;
      this.temperature = 32;
      this.isOn = false;
      this.isCoolingOn = false;
      this.showPopup = false;
      this.generatedPower = 0;
      this.generatedPowerSum = 0;
      this.elapsedTime = 0;
      this.imgSrc = "/ReactorSim/src/images/reactor_off.png"
    }
  }
}
</script>

<template>
  <div class="flex justify-between flex-col bg-ui-background h-1 w-screen min-h-screen relative">

    <!--Popup-->
    <div v-if="showPopup" class="flex justify-center items-center fixed top-3/4 z-20 bg-ui-card ring-gray-300 ring-1 px-12 py-6 rounded-xl animate-messagePing ">
      <h1 class="dm-sans-semibold text-red-600">{{ popupText }}</h1>
    </div>
    <!--Popup-->

    <div class="flex h-full w-full">
      <div class="flex justify-center items-center basis-2/3 w-full min-h-full">
        <img :src=imgSrc>
      </div>

      <div class="grid grid-cols-1 grid-rows-8 basis-1/3 w-full min-h-full p-4 gap-4">

        <div @click="handleIsOn" :class="{ 'ring-ui-primary ring-2': isOn, 'ring-ui-ring ring-2': !isOn }"
          class="flex justify-center items-center w-full h-full bg-ui-card rounded-xl p-4 cursor-pointer">
          <div class="flex flex-col justify-center items-start w-full h-full pointer-events-none select-none">
            <div class="flex justify-between items-center basis-1/3 w-full">

              <h2 class="text-center text-white dm-sans-medium">{{ isOn == true ? "Reaktor leállítása" : "Reaktor indítása" }}</h2>

              <h2 class="text-center text-white dm-sans-medium">
                <PowerIcon :class="{ 'fill-ui-primary': isOn, 'fill-white': !isOn }" class="size-6" />
              </h2>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center items-center">
          <h2 v-if="!isOn && !fail" class="text-gray-300 dm-sans-regular text-2xl w-full text-center">Reaktor állapota: <span class="text-red-600">Leállítva</span>
          </h2>

          <h2 v-if="isOn && temperature < 40 && !isCoolingOn && !fail" class="text-gray-300 dm-sans-regular text-2xl w-full text-center">Reaktor állapota: <span
              class="text-yellow-400">Indítás alatt</span>
          </h2>

          <h2 v-if="isOn && temperature >= 40 && !fail" class="text-gray-300 dm-sans-regular text-2xl w-full text-center">Reaktor állapota: <span
              class="text-emerald-400">Üzemel</span>
          </h2>

          <h2 v-if="isOn && temperature < 40 && isCoolingOn && !fail" class="text-gray-300 dm-sans-regular text-2xl w-full text-center">Reaktor állapota: <span
              class="text-blue-400">Túl hideg</span>
          </h2>

          <h2 v-if="fail" class="text-gray-300 dm-sans-regular text-2xl w-full text-center">Reaktor állapota: <span class="text-orange-600">Felrobbant</span>
          </h2>

          <h2 class="text-gray-300 dm-sans-regular text-2xl w-full text-center">Energiatermelés: <span>{{ isOn == true ? `${generatedPower} GW`
      : "0 GW" }}</span></h2>
        </div>

        <div @click="handleCooling" :class="{ 'ring-ui-primary ring-2': isCoolingOn, 'ring-ui-ring ring-2': !isCoolingOn }"
          class="flex justify-center items-center w-full h-full bg-ui-card rounded-xl p-4 cursor-pointer">
          <div class="flex flex-col justify-center items-start w-full h-full pointer-events-none select-none">
            <div class="flex justify-between items-center basis-1/3 w-full">

              <h2 class="text-center text-white dm-sans-medium">Hűtővíz beengedés</h2>

              <h2 class="text-center text-white dm-sans-medium">
                <ArrowPathRoundedSquareIcon :class="{ 'fill-ui-primary': isCoolingOn, 'fill-white': !isCoolingOn }" class="size-6" />
              </h2>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center items-center">
          <h2 class="text-gray-300 dm-sans-regular text-2xl w-full text-center">Hűtővíz keringetés: <span
              :class="{ 'text-emerald-400': isCoolingOn, 'text-red-600': !isCoolingOn }">{{ isCoolingOn == true ? "Bekapcsolva" : "Leállítva" }}</span></h2>
          <h2 class="text-gray-300 dm-sans-regular text-2xl w-full text-center">Reaktor hőmérséklete: <span
              :class="{ 'text-blue-400': temperature < 40, 'text-emerald-400': temperature >= 40 && temperature <= 80, 'text-orange-600': temperature > 80 && temperature < 90, 'text-red-600': temperature >= 90 }">{{
      temperature }} °C</span></h2>
        </div>

        <div></div>

        <h2 v-if="fail" class="text-gray-300 dm-sans-regular text-2xl w-full text-center flex justify-center items-end">A reaktor túlmelegedett és felrobbant!</h2>
        <button v-if="fail" @click="handleReset" class="dm-sans-regular px-4 py-2 bg-ui-stone ring-ui-ring ring-2 rounded-lg text-gray-300">Újraindítás</button>
      </div>
    </div>

    <div class="flex justify-between h-20 bg-ui-background w-full border-t-2 border-ui-ring">
      <div class="flex justify-center items-center h-full ml-4 dm-sans-regular text-gray-300 text-2xl max-w-96">Eltelt idő: {{ secondsToTime(elapsedTime) }}</div>
      <div class="flex justify-center items-center h-full mr-4 dm-sans-regular text-gray-300 text-2xl max-w-96">Termelt energia: {{ generatedPowerSum.toFixed(2) }} GW</div>
    </div>

  </div>
</template>

<style>
@import '../assets/main.css'
</style>