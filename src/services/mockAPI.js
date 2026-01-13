import { products } from "../data/products";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Trae productos (todos o por categoría)
export async function getProducts(categoryId) {
  await wait(700);

  if (!categoryId) return products;

  return products.filter((p) => p.category === categoryId);
}

// Trae 1 producto por ID
export async function getProductById(itemId) {
  await wait(700);

  const found = products.find((p) => p.id === Number(itemId));
  return found; // puede ser undefined si no existe
}
