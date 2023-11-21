<script setup lang="ts">
  // const numberOfCartItems = ref(0);

  // const updateCartItemCount = () => {
  //   const cartString = sessionStorage.getItem('cartItems');
  //   const cart: CartItem[] = cartString ? JSON.parse(cartString) : [];
  //   numberOfCartItems.value = cart.reduce(
  //     (total, item) => total + item.count,
  //     0
  //   );
  // };

  // const handleStorageChange = (event: StorageEvent) => {
  //   if (event.key === 'cartItems') {
  //     updateCartItemCount();
  //   }
  // };

  // onMounted(() => {
  //   window.addEventListener('storage', handleStorageChange);
  //   updateCartItemCount();
  // });

  // onUnmounted(() => {
  //   window.removeEventListener('storage', handleStorageChange);
  // });

  const { numberOfCartItems } = useCart();
</script>

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
        <v-badge :content="numberOfCartItems" floating location="bottom start">
          <v-icon icon="fa-solid fa-cart-shopping"></v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main class="h-screen">
      <slot />
    </v-main>
  </v-layout>
</template>
