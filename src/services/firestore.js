import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// 🔹 Traer todos los productos (o por categoría)
export async function getProducts(categoryId) {
  const productsRef = collection(db, "products");

  const q = categoryId
    ? query(productsRef, where("category", "==", categoryId))
    : productsRef;

  const snapshot = await getDocs(q);

  // 👇 ESTE LOG ES EL PASO 1
  console.log("🔥 Firestore docs:", snapshot.docs.length);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// 🔹 Traer un producto por ID
export async function getProductById(itemId) {
  const docRef = doc(db, "products", itemId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}
