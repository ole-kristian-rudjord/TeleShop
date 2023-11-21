export {};

declare global {
  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }

  interface CartItem {
    productId: number;
    count: number;
  }

  interface UseCartReturn {
    cart: Ref<CartItem[]>;
    addToCart: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    numberOfCartItems: ComputedRef<number>;
  }
}
