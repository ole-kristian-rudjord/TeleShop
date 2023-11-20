<script setup lang="ts">
  defineProps<{
    product: Product;
  }>();

  defineEmits<{
    (e: 'selectCategory', category: string): void;
  }>();
</script>

<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props"
        max-width="400"
        class="pa-4 rounded-xl ma-4 bg-foreground border"
        :class="isHovering ? 'elevation-4' : 'elevation-0'"
      >
        <div class="d-flex justify-center w-100 pa-4 mb-2 bg-white rounded-xl">
          <v-img :src="product.image" height="200" width="200"></v-img>
        </div>
        <v-card-item class="py-0">
          <v-card-title class="pb-1">{{ product.title }}</v-card-title>
          <v-card-subtitle
            class="d-flex justify-space-between align-center py-0 mb-2"
          >
            <v-rating
              :model-value="product.rating.rate"
              length="5"
              size="x-small"
              density="comfortable"
              readonly
              half-increments
              color="pink-darken-3"
              active-color="pink-darken-4"
              empty-icon="fa-regular fa-star"
              full-icon="fa-solid fa-star"
            ></v-rating>
            <v-btn
              size="small"
              variant="text"
              class="text-lowercase rounded-pill"
              @click.prevent="$emit('selectCategory', product.category)"
            >
              {{ product.category }}
            </v-btn>
          </v-card-subtitle>
        </v-card-item>
        <v-card-text class="product-card__text py-0 mb-4">
          {{ product.description }}
        </v-card-text>
        <v-card-actions
          class="d-flex justify-space-between bg-pink-darken-4 rounded-pill elevation-1"
        >
          <div class="ml-4 text-body-1 font-weight-bold">
            ${{ product.price }}
          </div>
          <v-btn
            variant="flat"
            class="px-4 text-body-1 font-weight-bold text-pink-darken-4 bg-white rounded-pill"
          >
            Add to cart
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-hover>
</template>

<style scoped lang="scss">
  .product-card__text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
