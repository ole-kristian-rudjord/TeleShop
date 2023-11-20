export default async (): Promise<string[]> => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};
