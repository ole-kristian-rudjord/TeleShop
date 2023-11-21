export default async (productId: number) => {
  const cart = sessionStorage.getItem('cartItems');
  let cartItems: CartItem[] = cart ? JSON.parse(cart) : [];

  const productIndex = cartItems.findIndex(
    (item) => item.productId === productId
  );

  if (productIndex !== -1) {
    if (cartItems[productIndex].count > 1) {
      cartItems[productIndex].count--;
    } else {
      cartItems.splice(productIndex, 1);
    }

    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
};
