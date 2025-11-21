import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();

  const featuredItems = [
    {
      id: '1',
      name: 'Chicken Biryani',
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d96f?ixlib=rb-4.0.3&w=400',
      price: 220,
    },
    {
      id: '2',
      name: 'Butter Naan',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=400',
      price: 60,
    },
    {
      id: '3',
      name: 'Paneer Tikka',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&w=400',
      price: 180,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.restaurantName}>AAHAAR TANDOORI</Text>
          <Text style={styles.userInfo}>
            {user?.role === 'admin' ? 'Admin Panel' : `Logged in as ${user?.mobileNumber}`}
          </Text>
        </View>
        <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartCount}>{getCartItemCount()}</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Banner */}
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&w=800' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Authentic Indian Cuisine</Text>
          <Text style={styles.heroSubtitle}>Experience the rich flavors of traditional Indian cooking</Text>
          <TouchableOpacity 
            style={styles.heroButton}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.heroButtonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>50+</Text>
          <Text style={styles.statLabel}>Dishes</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>15min</Text>
          <Text style={styles.statLabel}>Avg. Delivery</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>4.8★</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      {/* Featured Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Items</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredItems.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.featuredItem}
              onPress={() => navigation.navigate('Menu')}
            >
              <Image source={{ uri: item.image }} style={styles.featuredImage} />
              <Text style={styles.featuredName}>{item.name}</Text>
              <Text style={styles.featuredPrice}>₹{item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categories}>
          <TouchableOpacity 
            style={styles.category}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.categoryText}>Biryani</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.category}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.categoryText}>Breads</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.category}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.categoryText}>Rice</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.category}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.categoryText}>Paratha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c52c28',
  },
  userInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  cartIcon: {
    backgroundColor: '#c52c28',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
  hero: {
    height: 200,
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: '#c52c28',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  heroButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c52c28',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featuredItem: {
    marginRight: 15,
    width: 150,
  },
  featuredImage: {
    width: 150,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  featuredPrice: {
    fontSize: 14,
    color: '#c52c28',
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default HomeScreen;