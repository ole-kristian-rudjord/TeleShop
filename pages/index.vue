<script setup lang="ts">
  const allProducts = ref<Product[]>([]);

  const maxPrice = ref(0);

  const priceRange = ref([0, 0]);
  const ratingRange = ref([0, 5]);
  const categories = ref<{ name: string; selected: boolean }[]>([]);

  onMounted(async () => {
    try {
      const response = await getAllProducts();
      if (response) {
        allProducts.value = response;

        maxPrice.value = Math.max(...allProducts.value.map((p) => p.price));
        priceRange.value = [0, maxPrice.value];

        const uniqueCategories = new Set(
          allProducts.value.map((product) => product.category)
        );
        categories.value = Array.from(uniqueCategories).map((category) => ({
          name: category,
          selected: false,
        }));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  });
</script>

<template>
  <v-navigation-drawer width="300">
    <v-row class="px-6 pt-8">
      <v-col cols="12">
        <div class="text-body-2">
          Price ({{ priceRange[0] }} - {{ priceRange[1] }})
        </div>
        <v-range-slider
          v-model="priceRange"
          :min="0"
          :max="maxPrice"
          :step="0.01"
          hide-details
        >
        </v-range-slider>
      </v-col>

      <v-col cols="12">
        <div class="text-body-2">
          Rating ({{ ratingRange[0] }} - {{ ratingRange[1] }})
        </div>
        <v-range-slider
          v-model="ratingRange"
          :min="0"
          :max="5"
          :step="0.1"
          hide-details
        >
        </v-range-slider>
      </v-col>

      <v-col cols="12">
        <div class="text-body-2">Categories</div>
        <v-checkbox
          v-for="(category, index) in categories"
          :key="index"
          :label="category.name"
          v-model="category.selected"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-navigation-drawer>

  <product-card
    v-for="(product, index) in allProducts"
    :key="index"
    :product="product"
  ></product-card>
</template>

<style scoped lang="scss"></style>
