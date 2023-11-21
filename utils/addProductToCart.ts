export default async (productId: number) => {
  const cart = sessionStorage.getItem('cartItems');
  let cartItems: CartItem[] = cart ? JSON.parse(cart) : [];

  const existingProduct = cartItems.find(
    (item) => item.productId === productId
  );

  if (existingProduct) {
    existingProduct.count++;
  } else {
    cartItems.push({ productId: productId, count: 1 });
  }

  sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
};
