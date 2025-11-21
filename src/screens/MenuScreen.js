import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import { useCart } from '../context/CartContext';

const MenuScreen = () => {
  const { menuCategories } = useMenu();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCategories = menuCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'all' || category.id === selectedCategory)
    ),
  })).filter(category => category.items.length > 0);

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
        </View>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.itemActions}>
          {item.halfPrice && (
            <TouchableOpacity
              style={styles.portionButton}
              onPress={() => addToCart(item, 1, 'half')}
            >
              <Text style={styles.portionText}>Half: ₹{item.halfPrice}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.portionButton, styles.fullButton]}
            onPress={() => addToCart(item, 1, 'full')}
          >
            <Text style={[styles.portionText, styles.fullText]}>
              {item.halfPrice ? 'Full' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
        {!item.available && (
          <Text style={styles.unavailableText}>Currently Unavailable</Text>
        )}
      </View>
    </View>
  );

  const renderCategory = ({ item: category }) => (
    <View style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{category.name}</Text>
      <FlatList
        data={category.items}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search menu items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilter}>
        <TouchableOpacity
          style={[styles.categoryTab, selectedCategory === 'all' && styles.activeCategoryTab]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text style={[styles.categoryTabText, selectedCategory === 'all' && styles.activeCategoryTabText]}>
            All
          </Text>
        </TouchableOpacity>
        {menuCategories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryTab, selectedCategory === category.id && styles.activeCategoryTab]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[styles.categoryTabText, selectedCategory === category.id && styles.activeCategoryTabText]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Menu Items */}
      <FlatList
        data={filteredCategories}
        renderItem={renderCategory}
        keyExtractor={category => category.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 20,
    paddingTop: 80,
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  categoryFilter: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  activeCategoryTab: {
    backgroundColor: '#c52c28',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeCategoryTabText: {
    color: '#fff',
  },
  menuList: {
    padding: 20,
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
    padding: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c52c28',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 18,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 10,
  },
  portionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  fullButton: {
    backgroundColor: '#c52c28',
    borderColor: '#c52c28',
  },
  portionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  fullText: {
    color: '#fff',
  },
  unavailableText: {
    color: '#dc3545',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 5,
  },
});

export default MenuScreen;