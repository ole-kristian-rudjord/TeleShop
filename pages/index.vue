<script setup lang="ts">
  type SortFunctionType = {
    [key: string]: (a: Product, b: Product) => number;
  };

  const sortFunctions: SortFunctionType = {
    'Title | A-Z': (a: Product, b: Product) => a.title.localeCompare(b.title),
    'Title | Z-A': (a: Product, b: Product) => b.title.localeCompare(a.title),
    'Category | A-Z': (a: Product, b: Product) =>
      a.category.localeCompare(b.category),
    'Category | Z-A': (a: Product, b: Product) =>
      b.category.localeCompare(a.category),
    'Price | low to high': (a: Product, b: Product) => a.price - b.price,
    'Price | high to low': (a: Product, b: Product) => b.price - a.price,
    'Rating | low to high': (a: Product, b: Product) =>
      a.rating.rate - b.rating.rate,
    'Rating | high to low': (a: Product, b: Product) =>
      b.rating.rate - a.rating.rate,
  };

  const sortOptions = Object.keys(sortFunctions);
  const allProducts = ref<Product[]>([]);

  const sortBy = ref(sortOptions[0]);
  const search = ref('');
  const categories = ref<{ name: string; selected: boolean }[]>([]);
  const maxPrice = ref(0);
  const priceRange = ref([0, 0]);
  const ratingRange = ref([0, 5]);

  const drawer = ref(false);

  const lowerCaseIncludes = (text: string, search: string) =>
    text.toLowerCase().includes(search.toLowerCase());

  const filteredProducts = computed(() => {
    const selectedCategories = new Set(
      categories.value.filter((c) => c.selected).map((c) => c.name)
    );

    return allProducts.value
      .filter(
        (product) =>
          (search.value === '' ||
            lowerCaseIncludes(product.title, search.value) ||
            lowerCaseIncludes(product.description, search.value)) &&
          product.price >= priceRange.value[0] &&
          product.price <= priceRange.value[1] &&
          product.rating.rate >= ratingRange.value[0] &&
          product.rating.rate <= ratingRange.value[1] &&
          selectedCategories.has(product.category)
      )
      .sort(sortFunctions[sortBy.value] ?? ((a, b) => 0));
  });

  const handleSelectCategory = (category: string) => {
    categories.value.forEach((c) => {
      c.selected = c.name === category;
    });
  };

  const resetFilters = () => {
    sortBy.value = sortOptions[0];
    search.value = '';
    categories.value.forEach((category) => {
      category.selected = true;
    });
    priceRange.value = [0, maxPrice.value];
    ratingRange.value = [0, 5];
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
  <div class="d-flex flex-row">
    <v-navigation-drawer rail permanent>
      <v-list-item
        prepend-icon="fa-solid fa-filter"
        :active="drawer"
        variant="plain"
        class="py-4 text-pink-darken-4"
        @click="drawer = !drawer"
      >
      </v-list-item>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="drawer" width="300">
      <v-row class="ma-0 pa-4 pt-6">
        <v-col cols="12">
          <v-select
            v-model="sortBy"
            label="Sort by"
            :items="sortOptions"
            variant="outlined"
            density="comfortable"
            hide-details
            color="pink-darken-4"
          ></v-select>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="search"
            label="Search"
            variant="outlined"
            density="comfortable"
            hide-details
            color="pink-darken-4"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <div class="text-body-2">Categories</div>
          <v-checkbox
            v-for="(category, index) in categories"
            :key="index"
            v-model="category.selected"
            :label="category.name"
            density="comfortable"
            hide-details
            false-icon="fa-regular fa-square"
            true-icon="fa-regular fa-square-check"
            color="pink-darken-4"
          ></v-checkbox>
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
            color="pink-darken-4"
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
            color="pink-darken-4"
          >
          </v-range-slider>
        </v-col>

        <v-col cols="12">
          <v-btn
            variant="flat"
            color="pink-darken-4"
            class="w-100"
            @click="resetFilters"
          >
            Reset
          </v-btn>
        </v-col>
      </v-row>
    </v-navigation-drawer>

    <div
      class="d-flex flex-wrap justify-center ga-3 ga-sm-5 px-3 px-sm-5 py-3 py-sm-9"
    >
      <product-card
        v-for="(product, index) in filteredProducts"
        :key="index"
        :product="product"
        @select-category="handleSelectCategory"
      ></product-card>
    </div>
  </div>
</template>
