<script setup lang="ts">
  const cart = useCart();
  const cartItems = cart.getCartItems;
  const cartProducts = ref<(Product & { count: number })[]>([]);

  const fetchProductDetails = async () => {
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

  watchEffect(() => {
    fetchProductDetails();
  });
</script>

<template>
  <v-card max-width="1250px" class="mx-auto my-12 pa-12 border rounded-xl">
    <h1>
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
          <th>Amount</th>
          <th>Price</th>
          <th>Total</th>
          <th>Remove</th>
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
              >
                <v-icon icon="fa-solid fa-minus" size="x-small"></v-icon>
              </v-btn>
              <div class="mx-1 text-center" style="width: 2ch">
                {{ product.count }}
              </div>
              <v-btn
                icon
                size="small"
                density="comfortable"
                variant="tonal"
                color="pink-darken-4"
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
              >
                <v-icon icon="fa-solid fa-x" size="x-small"></v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
