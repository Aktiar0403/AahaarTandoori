import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useMenu } from '../context/MenuContext';

const AdminScreen = () => {
  const { user, logout } = useAuth();
  const { menuCategories, updateMenuItem, toggleItemAvailability, addMenuItem } = useMenu();
  const [activeTab, setActiveTab] = useState('menu');
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    halfPrice: '',
    category: '1',
  });

  const handleSaveItem = () => {
    if (!newItem.name || !newItem.price) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const itemData = {
      id: Date.now().toString(),
      name: newItem.name,
      description: newItem.description,
      price: parseInt(newItem.price),
      halfPrice: newItem.halfPrice ? parseInt(newItem.halfPrice) : undefined,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=400',
      available: true,
      category: menuCategories.find(cat => cat.id === newItem.category)?.name || 'Biriyani & Rice',
    };

    addMenuItem(newItem.category, itemData);
    setNewItem({
      name: '',
      description: '',
      price: '',
      halfPrice: '',
      category: '1',
    });
    Alert.alert('Success', 'Menu item added successfully');
  };

  const handleUpdateItem = (itemId, field, value) => {
    updateMenuItem(itemId, { [field]: value });
  };

  const renderMenuManagement = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Add New Item</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={newItem.name}
          onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newItem.description}
          onChangeText={(text) => setNewItem({ ...newItem, description: text })}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={newItem.price}
          onChangeText={(text) => setNewItem({ ...newItem, price: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Half Price (optional)"
          keyboardType="numeric"
          value={newItem.halfPrice}
          onChangeText={(text) => setNewItem({ ...newItem, halfPrice: text })}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleSaveItem}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Manage Menu Items</Text>
      {menuCategories.map(category => (
        <View key={category.id} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          {category.items.map(item => (
            <View key={item.id} style={styles.menuItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>
                  {item.halfPrice ? `₹${item.halfPrice}/₹${item.price}` : `₹${item.price}`}
                </Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <View style={styles.itemActions}>
                <Switch
                  value={item.available}
                  onValueChange={() => toggleItemAvailability(item.id)}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={item.available ? '#c52c28' : '#f4f3f4'}
                />
                <Text style={styles.availabilityText}>
                  {item.available ? 'Available' : 'Unavailable'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );

  const renderOrdersManagement = () => (
    <View style={styles.tabContent}>
      <Text style={styles.comingSoon}>Orders Management - Coming Soon</Text>
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.tabContent}>
      <Text style={styles.comingSoon}>Analytics - Coming Soon</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Admin Panel</Text>
          <Text style={styles.subtitle}>Welcome, {user?.mobileNumber}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'menu' && styles.activeTab]}
          onPress={() => setActiveTab('menu')}
        >
          <Text style={[styles.tabText, activeTab === 'menu' && styles.activeTabText]}>
            Menu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'orders' && styles.activeTab]}
          onPress={() => setActiveTab('orders')}
        >
          <Text style={[styles.tabText, activeTab === 'orders' && styles.activeTabText]}>
            Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'analytics' && styles.activeTab]}
          onPress={() => setActiveTab('analytics')}
        >
          <Text style={[styles.tabText, activeTab === 'analytics' && styles.activeTabText]}>
            Analytics
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'menu' && renderMenuManagement()}
      {activeTab === 'orders' && renderOrdersManagement()}
      {activeTab === 'analytics' && renderAnalytics()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#c52c28',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#c52c28',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  form: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#c52c28',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categorySection: {
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#c52c28',
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
  },
  itemActions: {
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  comingSoon: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 50,
  },
});

export default AdminScreen;