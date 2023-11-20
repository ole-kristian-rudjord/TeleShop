<script setup lang="ts">
  const products = fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((json) => console.log(json));
</script>

<template>
  {{ products }}
</template>
