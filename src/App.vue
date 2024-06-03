<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

body {
  margin: 0px;
}

.dm-sans-bold {
  font-family: "DM Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}

.dm-sans-semibold {
  font-family: "DM Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.dm-sans-medium {
  font-family: "DM Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

.dm-sans-regular {
  font-family: "DM Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
</style>
