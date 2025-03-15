import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  // Categorias com nomes diferentes
  const categories = [
    {
      id: 1,
      name: "Lanches",
      image: "https://via.placeholder.com/80?text=Lanches",
    },
    {
      id: 2,
      name: "Japonesa",
      image: "https://via.placeholder.com/80?text=Japonesa",
    },
    {
      id: 3,
      name: "Italiana",
      image: "https://via.placeholder.com/80?text=Italiana",
    },
    {
      id: 4,
      name: "Bebidas",
      image: "https://via.placeholder.com/80?text=Bebidas",
    },
  ];

  // Lojas disponíveis
  const stores = [
    {
      id: 1,
      name: "Pizza do Zé",
      image: "https://via.placeholder.com/150?text=Pizza",
      description: "Melhor pizza da cidade",
    },
    {
      id: 2,
      name: "Sushi do Kazu",
      image: "https://via.placeholder.com/150?text=Sushi",
      description: "Sushis fresquinhos e saborosos",
    },
    {
      id: 3,
      name: "Bibigo Burguer's",
      image: "https://via.placeholder.com/150?text=Burguer",
      description: "Combos incríveis para você",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header com Título */}
      <Text style={styles.headerTitle}>BibigoFood</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="heart-outline" size={16} color="#000" />
          <Text style={styles.filterText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="time-outline" size={16} color="#000" />
          <Text style={styles.filterText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="person-outline" size={16} color="#000" />
          <Text style={styles.filterText}>Following</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButtonIcon}>
          <MaterialIcons name="menu" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: "https://via.placeholder.com/300x150.png?text=Banner",
            }}
            style={styles.bannerImage}
          />
        </View>

        {/* Categorias */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <View key={category.id} style={styles.categoryItem}>
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{category.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Lojas */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Lojas</Text>
          <View style={styles.productGrid}>
            {stores.map((store) => (
              <TouchableOpacity
                key={store.id}
                style={styles.productCard}
                onPress={() => router.push(`/store/${store.id}`)} // Navega para a loja específica
              >
                <Image
                  source={{ uri: store.image }}
                  style={styles.productImage}
                />
                <Text style={styles.productBrand}>{store.name}</Text>
                <Text style={styles.productTitle}>{store.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => router.push("/homepage")}>
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/favorites")}>
          <Ionicons name="heart-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/cart")}>
          <Ionicons name="cart-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
  headerTitle: { fontSize: 16, textAlign: "center", marginBottom: 10 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
  },
  searchInput: { marginLeft: 10, flex: 1 },
  filtersContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
    alignItems: "center",
  },
  filterButtonIcon: {
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 20,
    marginLeft: "auto",
  },
  filterText: { marginLeft: 5 },
  bannerContainer: { marginHorizontal: 20, marginVertical: 10 },
  bannerImage: { width: "100%", height: 150, borderRadius: 10 },
  sectionContainer: { marginVertical: 10, marginHorizontal: 20 },
  sectionTitle: { fontSize: 18, marginBottom: 10 },
  categoryItem: { alignItems: "center", marginRight: 15 },
  categoryImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 5 },
  categoryText: { fontSize: 14 },
  productGrid: { flexDirection: "row", justifyContent: "space-between" },
  productCard: {
    width: "30%",
    marginBottom: 10,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  productBrand: { fontSize: 12, color: "#888" },
  productTitle: { fontSize: 14, fontWeight: "bold" },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});
