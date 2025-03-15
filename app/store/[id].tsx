import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function StorePage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Simulação de lojas com produtos diferentes
  const storesData = [
    {
      id: "1",
      name: "Pizza do Zé",
      categories: [
        {
          name: "Entradas",
          products: [
            { id: "1", name: "Bruschetta", price: 12 },
            { id: "2", name: "Focaccia", price: 15 },
          ],
        },
        {
          name: "Pratos Principais",
          products: [
            { id: "3", name: "Pizza Margherita", price: 30 },
            { id: "4", name: "Pizza Pepperoni", price: 35 },
          ],
        },
        {
          name: "Combos",
          products: [
            { id: "5", name: "Combo Família", price: 80 },
          ],
        },
        {
          name: "Bebidas",
          products: [
            { id: "6", name: "Refrigerante 2L", price: 10 },
            { id: "7", name: "Suco Natural", price: 12 },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Sushi do Kazu",
      categories: [
        {
          name: "Entradas",
          products: [
            { id: "1", name: "Sunomono", price: 10 },
            { id: "2", name: "Missoshiru", price: 8 },
          ],
        },
        {
          name: "Pratos Principais",
          products: [
            { id: "3", name: "Sashimi Combo", price: 50 },
            { id: "4", name: "Sushi Combo", price: 60 },
          ],
        },
        {
          name: "Combos",
          products: [
            { id: "5", name: "Combo Especial Kazu", price: 120 },
          ],
        },
        {
          name: "Bebidas",
          products: [
            { id: "6", name: "Sakê", price: 25 },
            { id: "7", name: "Chá Verde", price: 7 },
          ],
        },
      ],
    },
  ];

  const [store, setStore] = useState<any>(null);
  const [notes, setNotes] = useState<{ [productId: string]: string }>({});

  useEffect(() => {
    const foundStore = storesData.find((store) => store.id === id);
    if (foundStore) {
      setStore(foundStore);
    } else {
      router.back();
    }
  }, [id]);

  if (!store) {
    return (
      <View style={styles.container}>
        <Text>Carregando loja...</Text>
      </View>
    );
  }

  const handleAddToCart = (product: any) => {
    const note = notes[product.id] || "";
    console.log(`Adicionando ${product.name} ao carrinho com observação: ${note}`);
    // Aqui você ligaria com o Context de Carrinho futuramente!
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>{"<"} Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.storeTitle}>{store.name}</Text>
      </View>

      {/* Categorias e Produtos */}
      {store.categories.map((category: any) => (
        <View key={category.name} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.name}</Text>

          {category.products.map((product: any) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
              </View>

              {/* Observação */}
              <TextInput
                style={styles.noteInput}
                placeholder="Observação (ex: sem cebola)"
                value={notes[product.id] || ""}
                onChangeText={(text) => setNotes({ ...notes, [product.id]: text })}
              />

              {/* Adicionar */}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(product)}
              >
                <Text style={styles.addButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: "#E53935",
  },
  storeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  categoryContainer: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productName: { fontSize: 16 },
  productPrice: { fontSize: 16, fontWeight: "bold", color: "#E53935" },
  noteInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#E53935",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
});
