<script setup lang="ts"></script>

<template>
  <v-layout>
    <v-app-bar class="border-b elevation-0">
      <v-app-bar-title>
        <v-icon
          icon="fa-solid fa-bag-shopping"
          color="pink-darken-4"
          class="ml-3 mr-2"
        ></v-icon>
        <span class="font-weight-bold">TeleShop</span>
      </v-app-bar-title>

      <v-btn icon color="pink-darken-4">
        <v-icon icon="fa-solid fa-cart-shopping"></v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="h-screen">
      <slot />
    </v-main>
  </v-layout>
</template>
