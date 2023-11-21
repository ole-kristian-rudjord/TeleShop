export default async (): Promise<CartItem[]> => {
  const cart = sessionStorage.getItem('cartItems');
  return cart ? JSON.parse(cart) : [];
};
