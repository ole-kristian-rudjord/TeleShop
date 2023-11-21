<script setup lang="ts">
  const cart = useCart();
  const cartItems = cart.getCartItems;
  const cartProducts = ref<(Product & { count: number })[]>([]);

  const getProductDetails = async () => {
    const productsWithCount: (Product & { count: number })[] = [];
    for (const item of cartItems.value) {
      try {
        const product = await getProduct(item.productId);
        productsWithCount.push({ ...product, count: item.count });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
    cartProducts.value = productsWithCount;
  };

  const totalCost = computed(() => {
    return cartProducts.value.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
  });

  const decrementProductCount = (productId: number) => {
    cart.removeFromCart(productId);
  };

  const incrementProductCount = (productId: number) => {
    cart.addToCart(productId);
  };

  const deleteProduct = (productId: number) => {
    cart.deleteProductFromCart(productId);
  };

  onMounted(() => {
    getProductDetails();
  });

  watch(
    cartItems,
    () => {
      cartItems.value.forEach((cartItem) => {
        const productIndex = cartProducts.value.findIndex(
          (p) => p.id === cartItem.productId
        );
        if (productIndex !== -1) {
          cartProducts.value[productIndex].count = cartItem.count;
        }
      });

      // Remove any products that are no longer in the cart
      cartProducts.value = cartProducts.value.filter((p) =>
        cartItems.value.some((ci) => ci.productId === p.id)
      );
    },
    { deep: true }
  );
</script>

<template>
  <div style="max-width: 1250px" class="mx-auto my-12 px-4">
    <h1 class="text-center mb-6">
      <v-icon
        icon="fa-solid fa-cart-shopping"
        size="small"
        class="mr-8"
      ></v-icon>
      My cart
    </h1>
    <v-table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th class="text-center">Amount</th>
          <th class="text-center">Price</th>
          <th class="text-center">Total</th>
          <th class="text-center">Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in cartProducts" :key="index">
          <td class="py-2">
            <v-img
              :src="product.image"
              height="72"
              width="72"
              class="mx-auto"
            ></v-img>
          </td>
          <td>{{ product.title }}</td>
          <td>
            <div class="d-flex flex-row justify-center align-center">
              <v-btn
                icon
                size="small"
                density="comfortable"
                variant="tonal"
                color="pink-darken-4"
                :disabled="product.count <= 1"
                @click="decrementProductCount(product.id)"
              >
                <v-icon icon="fa-solid fa-minus" size="x-small"></v-icon>
              </v-btn>
              <div class="mx-1 text-center" style="width: 3ch">
                {{ product.count }}
              </div>
              <v-btn
                icon
                size="small"
                density="comfortable"
                variant="tonal"
                color="pink-darken-4"
                @click="incrementProductCount(product.id)"
              >
                <v-icon icon="fa-solid fa-plus" size="x-small"></v-icon>
              </v-btn>
            </div>
          </td>
          <td class="text-right">${{ product.price.toFixed(2) }}</td>
          <td class="text-right">
            ${{ (product.price * product.count).toFixed(2) }}
          </td>
          <td>
            <div class="w-100 d-flex justify-center">
              <v-btn
                icon
                size="small"
                density="comfortable"
                variant="tonal"
                color="red"
                @click="deleteProduct(product.id)"
              >
                <v-icon icon="fa-solid fa-x" size="x-small"></v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
        <tr class="text-right bg-pink-lighten-5">
          <td></td>
          <td></td>
          <td></td>
          <td class="text-no-wrap">Total price:</td>
          <td class="font-weight-bold">${{ totalCost.toFixed(2) }}</td>
          <td></td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
