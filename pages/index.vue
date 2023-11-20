<script setup lang="ts">
  const allProducts = ref<Product[]>([]);

  const maxPrice = ref(0);

  const search = ref('');
  const priceRange = ref([0, 0]);
  const ratingRange = ref([0, 5]);
  const categories = ref<{ name: string; selected: boolean }[]>([]);

  const filteredProducts = computed(() => {
    const selectedCategories = new Set(
      categories.value.filter((c) => c.selected).map((c) => c.name)
    );

    return allProducts.value.filter(
      (product) =>
        (search.value === '' ||
          product.title.toLowerCase().includes(search.value.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(search.value.toLowerCase())) &&
        product.price >= priceRange.value[0] &&
        product.price <= priceRange.value[1] &&
        product.rating.rate >= ratingRange.value[0] &&
        product.rating.rate <= ratingRange.value[1] &&
        selectedCategories.has(product.category)
    );
  });

  const handleSelectCategory = (category: string) => {
    categories.value.forEach((c) => {
      c.selected = c.name === category;
    });
  };

  onMounted(async () => {
    try {
      const productsResponse = await getAllProducts();
      if (productsResponse) {
        allProducts.value = productsResponse;

        maxPrice.value = Math.max(...allProducts.value.map((p) => p.price));
        priceRange.value = [0, maxPrice.value];
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    try {
      const categoriesResponse = await getAllCategories();
      if (categoriesResponse) {
        categories.value = categoriesResponse.map((category) => ({
          name: category,
          selected: true,
        }));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  });
</script>

<template>
  <v-navigation-drawer width="300">
    <v-row class="px-6 pt-8">
      <v-col cols="12">
        <v-text-field
          v-model="search"
          label="Search"
          variant="outlined"
          hide-details
        ></v-text-field>
      </v-col>

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
          v-model="category.selected"
          :label="category.name"
          hide-details
          false-icon="fa-regular fa-square"
          true-icon="fa-regular fa-square-check"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-navigation-drawer>

  <product-card
    v-for="(product, index) in filteredProducts"
    :key="index"
    :product="product"
    @select-category="handleSelectCategory"
  ></product-card>
</template>
