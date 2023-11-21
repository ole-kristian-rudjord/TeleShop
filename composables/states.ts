interface CartState {
  items: CartItem[];
}

const cartState = reactive<CartState>({ items: [] });

export const useCart = () => {
  const loadCart = () => {
    if (process.client) {
      const cartString = sessionStorage.getItem('cart');
      cartState.items = cartString ? JSON.parse(cartString) : [];
    }
  };

  const saveCart = () => {
    if (process.client) {
      sessionStorage.setItem('cart', JSON.stringify(cartState.items));
    }
  };

  const getCartItems = computed(() => cartState.items);

  const addToCart = (productId: number) => {
    const existingProduct = cartState.items.find(
      (item) => item.productId === productId
    );
    if (existingProduct) {
      existingProduct.count++;
    } else {
      cartState.items.push({ productId, count: 1 });
    }
    saveCart();
  };

  const removeFromCart = (productId: number) => {
    const productIndex = cartState.items.findIndex(
      (item) => item.productId === productId
    );
    if (productIndex !== -1) {
      if (cartState.items[productIndex].count > 1) {
        cartState.items[productIndex].count--;
      } else {
        cartState.items.splice(productIndex, 1);
      }
      saveCart();
    }
  };

  const deleteProductFromCart = (productId: number) => {
    const productIndex = cartState.items.findIndex(
      (item) => item.productId === productId
    );
    if (productIndex !== -1) {
      cartState.items.splice(productIndex, 1);
      saveCart();
    }
  };

  const numberOfCartItems = computed(() =>
    cartState.items.reduce((total, item) => total + item.count, 0)
  );

  loadCart();

  return {
    getCartItems,
    addToCart,
    removeFromCart,
    deleteProductFromCart,
    numberOfCartItems,
  };
};
