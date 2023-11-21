<script setup lang="ts">
  const title = ref('TeleShop');

  useHead({
    title: title,
  });

  const product = ref<Product | null>(null);

  const handleAddToCart = async () => {
    if (product.value) {
      useCart().addToCart(product.value.id);
    }
  };

  onMounted(async () => {
    const productId = Number(useRoute().params.id);

    if (!isNaN(productId)) {
      try {
        const response = await getProduct(productId);
        if (response) {
          product.value = response;
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    } else {
      console.error('Product-id could not be converted to a number');
    }
  });

  watch(
    product,
    (newValue) => {
      if (newValue?.title) {
        title.value = `${newValue.title} - TeleShop`;
      }
    },
    { immediate: true }
  );
</script>

<template>
  <div
    class="h-100 w-100 d-flex flex-column flex-md-row ga-12 mx-auto pa-6"
    style="max-width: 1250px"
  >
    <div class="h-100 w-100 w-md-50 d-flex align-center">
      <v-img :src="product?.image" height="400"></v-img>
    </div>
    <div class="w-100 w-md-50 d-flex flex-column ga-6 my-auto">
      <h1 class="text-h6 text-sm-h5 text-md-h4 font-weight-bold">
        {{ product?.title }}
      </h1>
      <div class="d-flex flex-row align-center ga-3">
        <v-rating
          :model-value="product?.rating.rate"
          length="5"
          density="comfortable"
          readonly
          half-increments
          color="pink-darken-3"
          active-color="pink-darken-4"
          empty-icon="fa-regular fa-star"
          full-icon="fa-solid fa-star"
        ></v-rating>
        <span class="text-h6 font-weight-bold">{{ product?.rating.rate }}</span>
        <span class="text-body-2 text-medium-emphasis">
          ({{ product?.rating.count }} ratings)
        </span>
      </div>
      <p>{{ product?.description }}</p>
      <div class="font-weight-bold">
        <v-icon icon="fa-solid fa-tag" class="mr-1"></v-icon>
        {{ product?.category }}
      </div>
      <div
        class="d-flex justify-space-between align-center pa-3 mb-6 mb-md-0 bg-pink-darken-4 rounded-pill elevation-1"
      >
        <span class="ml-4 text-h4 font-weight-bold">
          ${{ product?.price }}
        </span>
        <v-btn
          size="x-large"
          variant="flat"
          class="text-body-1 font-weight-bold text-pink-darken-4 bg-white rounded-pill"
          @click.prevent="handleAddToCart"
        >
          Add to cart
        </v-btn>
      </div>
    </div>
  </div>
</template>
