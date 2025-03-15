import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

// Tipos
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Category {
  name: string;
  products: Product[];
}

interface Store {
  id: string;
  name: string;
  categories: Category[];
}

export default function StorePage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [store, setStore] = useState<Store | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [observation, setObservation] = useState("");

  const storesData: Store[] = [
    {
      id: "1",
      name: "Pizza do Zé",
      categories: [
        {
          name: "Entradas",
          products: [
            {
              id: "1",
              name: "Bruschetta",
              description: "Pão italiano com tomate, manjericão e azeite.",
              price: 12,
              image: "https://via.placeholder.com/150?text=Bruschetta",
            },
            {
              id: "2",
              name: "Anéis de Cebola",
              description: "Cebolas empanadas e fritas, crocantes por fora.",
              price: 15,
              image: "https://via.placeholder.com/150?text=Cebola",
            },
          ],
        },
        {
          name: "Pratos Principais",
          products: [
            {
              id: "3",
              name: "Pizza Margherita",
              description: "Molho de tomate, mozzarella e manjericão fresco.",
              price: 30,
              image: "https://via.placeholder.com/150?text=Margherita",
            },
            {
              id: "4",
              name: "Pizza Pepperoni",
              description: "Pizza com fatias generosas de pepperoni.",
              price: 35,
              image: "https://via.placeholder.com/150?text=Pepperoni",
            },
          ],
        },
        {
          name: "Combos",
          products: [
            {
              id: "5",
              name: "Combo Família",
              description: "2 pizzas grandes + 1 refrigerante 2L.",
              price: 80,
              image: "https://via.placeholder.com/150?text=ComboFamilia",
            },
            {
              id: "6",
              name: "Combo Casal",
              description: "2 pizzas médias + 2 bebidas.",
              price: 60,
              image: "https://via.placeholder.com/150?text=ComboCasal",
            },
          ],
        },
        {
          name: "Bebidas",
          products: [
            {
              id: "7",
              name: "Refrigerante 2L",
              description: "Coca-Cola, Guaraná ou Fanta.",
              price: 10,
              image: "https://via.placeholder.com/150?text=Refrigerante",
            },
            {
              id: "8",
              name: "Suco Natural",
              description: "Sabores: laranja, abacaxi ou limão.",
              price: 12,
              image: "https://via.placeholder.com/150?text=Suco",
            },
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
            {
              id: "9",
              name: "Sunomono",
              description: "Salada de pepino japonês com molho agridoce.",
              price: 10,
              image: "https://via.placeholder.com/150?text=Sunomono",
            },
            {
              id: "10",
              name: "Shimeji na manteiga",
              description: "Cogumelos shimeji salteados na manteiga.",
              price: 18,
              image: "https://via.placeholder.com/150?text=Shimeji",
            },
          ],
        },
        {
          name: "Pratos Principais",
          products: [
            {
              id: "11",
              name: "Sushi Combo",
              description: "20 peças de sushi variados.",
              price: 55,
              image: "https://via.placeholder.com/150?text=SushiCombo",
            },
            {
              id: "12",
              name: "Temaki de Salmão",
              description: "Cone de alga com recheio de salmão fresco e arroz.",
              price: 25,
              image: "https://via.placeholder.com/150?text=Temaki",
            },
          ],
        },
        {
          name: "Combos",
          products: [
            {
              id: "13",
              name: "Combo Especial Kazu",
              description: "40 peças + 2 temakis + 2 bebidas.",
              price: 120,
              image: "https://via.placeholder.com/150?text=ComboKazu",
            },
            {
              id: "14",
              name: "Combo Light",
              description: "20 peças vegetarianas + chá verde.",
              price: 90,
              image: "https://via.placeholder.com/150?text=ComboLight",
            },
          ],
        },
        {
          name: "Bebidas",
          products: [
            {
              id: "15",
              name: "Chá Verde",
              description: "Bebida tradicional japonesa, quente ou gelado.",
              price: 8,
              image: "https://via.placeholder.com/150?text=ChaVerde",
            },
            {
              id: "16",
              name: "Sakê",
              description: "Bebida alcoólica tradicional do Japão.",
              price: 18,
              image: "https://via.placeholder.com/150?text=Sake",
            },
          ],
        },
      ],
    },

    {
      id: "3",
      name: "Bibigo Burguer's",
      categories: [
        {
          name: "Entradas",
          products: [
            {
              id: "17",
              name: "Batata Frita",
              description: "Batata crocante com toque de sal.",
              price: 15,
              image: "https://via.placeholder.com/150?text=BatataFrita",
            },
            {
              id: "18",
              name: "Nuggets de Frango",
              description: "Porção de 10 unidades com molho especial.",
              price: 20,
              image: "https://via.placeholder.com/150?text=Nuggets",
            },
          ],
        },
        {
          name: "Pratos Principais",
          products: [
            {
              id: "19",
              name: "XXX-BIBIGO FAT",
              description: "X-TUDO x3 com mais o que tiver na barraca.",
              price: 45.90,
              image: "https://via.placeholder.com/150?text=Cheeseburger",
            },
            {
              id: "20",
              name: "Duplo Bacon Burger",
              description: "Hambúrguer duplo com bacon crocante.",
              price: 35,
              image: "https://via.placeholder.com/150?text=BaconBurger",
            },
            {
              id: "21",
              name: "X-Ratão",
              description: "Hambúrguer duplo com bacon crocante, molho surpresa e ingredientes adicionais surpresas.",
              price: 35,
              image: "https://via.placeholder.com/150?text=BaconBurger",
            },
          ],
        },
        {
          name: "Combos",
          products: [
            {
              id: "22",
              name: "Combo Top",
              description: "Burger + Batata + Refrigerante.",
              price: 45,
              image: "https://via.placeholder.com/150?text=ComboTop",
            },
            {
              id: "23",
              name: "Combo Família",
              description: "2 Burgers + 2 Batatas + 2 Refrigerantes.",
              price: 85,
              image: "https://via.placeholder.com/150?text=ComboFamilia",
            },
          ],
        },
        {
          name: "Bebidas",
          products: [
            {
              id: "24",
              name: "Refrigerante Lata",
              description: "Coca-Cola, Pepsi, Guaraná ou Fanta.",
              price: 8,
              image: "https://via.placeholder.com/150?text=RefrigeranteLata",
            },
            {
              id: "25",
              name: "Milkshake de Chocolate",
              description: "Milkshake cremoso de chocolate.",
              price: 15,
              image: "https://via.placeholder.com/150?text=Milkshake",
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    const foundStore = storesData.find((store) => store.id === id);
    if (foundStore) {
      setStore(foundStore);
    } else {
      router.back();
    }
  }, [id]);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setObservation("");
    setModalVisible(true);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    console.log("Adicionando ao carrinho:", {
      ...selectedProduct,
      observation,
    });

    setModalVisible(false);
  };

  if (!store) {
    return (
      <View style={styles.container}>
        <Text>Carregando loja...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>{"<"} Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.storeTitle}>{store.name}</Text>
        </View>

        {/* Categorias e Produtos */}
        {store.categories.map((category: Category) => (
          <View key={category.name} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.name}</Text>

            {category.products.map((product: Product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleOpenModal(product)}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productDescription}>
                    {product.description}
                  </Text>
                  <Text style={styles.productPrice}>
                    R$ {product.price.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Image
                  source={{ uri: selectedProduct.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                <Text style={styles.modalDescription}>
                  {selectedProduct.description}
                </Text>
                <Text style={styles.modalPrice}>
                  R$ {selectedProduct.price.toFixed(2)}
                </Text>

                <TextInput
                  style={styles.noteInput}
                  placeholder="Observação (ex: sem cebola)"
                  value={observation}
                  onChangeText={setObservation}
                />

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddToCart}
                >
                  <Text style={styles.addButtonText}>
                    Adicionar ao Carrinho
                  </Text>
                </TouchableOpacity>

                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelText}>Cancelar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  backText: { fontSize: 16, color: "#E53935" },
  storeTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 20 },
  categoryContainer: { marginBottom: 30, paddingHorizontal: 20 },
  categoryTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  productImage: { width: 100, height: 100 },
  productInfo: { flex: 1, padding: 10 },
  productName: { fontSize: 16, fontWeight: "bold" },
  productDescription: { fontSize: 14, color: "#666", marginVertical: 5 },
  productPrice: { fontSize: 16, fontWeight: "bold", color: "#E53935" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: { width: 200, height: 200, borderRadius: 10, marginBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  modalDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  modalPrice: { fontSize: 18, color: "#E53935", marginBottom: 10 },
  noteInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    width: "100%",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#E53935",
    paddingVertical: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  cancelText: { color: "#666", marginTop: 15 },
});
