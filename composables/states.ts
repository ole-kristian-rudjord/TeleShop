export const useCart = (): UseCartReturn => {
  const cart = ref<CartItem[]>([]);

  const loadCart = () => {
    if (process.client) {
      const cartString = sessionStorage.getItem('cart');
      cart.value = cartString ? JSON.parse(cartString) : [];
    }
  };

  const saveCart = () => {
    sessionStorage.setItem('cart', JSON.stringify(cart.value));
  };

  const addToCart = (productId: number) => {
    const existingProduct = cart.value.find(
      (item) => item.productId === productId
    );

    if (existingProduct) {
      existingProduct.count++;
    } else {
      cart.value.push({ productId, count: 1 });
    }

    saveCart();
  };

  const removeFromCart = (productId: number) => {
    const productIndex = cart.value.findIndex(
      (item) => item.productId === productId
    );

    if (productIndex !== -1) {
      const product = cart.value[productIndex];
      if (product.count > 1) {
        product.count--;
      } else {
        cart.value.splice(productIndex, 1);
      }
    }

    saveCart();
  };

  const numberOfCartItems = computed(() =>
    cart.value.reduce((total, item) => total + item.count, 0)
  );

  loadCart();

  return { cart, addToCart, removeFromCart, numberOfCartItems };
};
