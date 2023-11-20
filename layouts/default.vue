<script setup lang="ts"></script>

<template>
  <v-layout>
    <v-app-bar>
      <v-app-bar-title>
        <v-icon
          icon="fa-solid fa-shop"
          size="small"
          color="red"
          class="ml-2 mr-3"
        ></v-icon>
        TeleShop
      </v-app-bar-title>

      <v-btn icon>
        <v-icon icon="fa-solid fa-cart-shopping" size="small"></v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="h-screen">
      <slot />
    </v-main>
  </v-layout>
</template>
