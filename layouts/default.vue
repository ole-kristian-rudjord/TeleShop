<script setup lang="ts">
  useHead({
    title: 'TeleShop',
    link: [{ rel: 'icon', type: 'image/svg', href: 'teleshop-logo.svg' }],
  });

  const { numberOfCartItems } = useCart();
</script>

<template>
  <v-layout>
    <v-app-bar class="border-b elevation-0">
      <v-app-bar-title class="ma-0">
        <v-btn size="x-large" to="/" :active="false" class="h-100 pa-5">
          <template v-slot:prepend>
            <v-icon
              icon="fa-solid fa-bag-shopping"
              size="x-large"
              color="pink-darken-4"
              class="mr-2"
            ></v-icon>
          </template>
          <span class="text-h6 font-weight-bold">TeleShop</span>
        </v-btn>
      </v-app-bar-title>

      <v-btn icon color="pink-darken-4" to="/cart" :active="false">
        <v-badge
          v-if="numberOfCartItems > 0"
          :content="numberOfCartItems"
          floating
          location="bottom start"
        >
          <v-icon icon="fa-solid fa-cart-shopping"></v-icon>
        </v-badge>
        <v-icon v-else icon="fa-solid fa-cart-shopping"></v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="h-screen">
      <slot />
    </v-main>
  </v-layout>
</template>
