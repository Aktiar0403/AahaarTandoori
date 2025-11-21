// src/screens/HomeScreen.js - Premium boutique design
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { getCartItemCount } = useCart();

  const featuredItems = [
    {
      id: '1',
      name: 'Chicken Biryani',
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d96f?ixlib=rb-4.0.3&w=400',
      price: 220,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Butter Naan',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=400',
      price: 60,
      rating: 4.6,
    },
    {
      id: '3',
      name: 'Paneer Tikka',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&w=400',
      price: 180,
      rating: 4.7,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Premium Header */}
      <LinearGradient
        colors={['#1a1a1a', '#2d1b0e']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome to</Text>
            <Text style={styles.restaurantName}>AAHAAR TANDOORI</Text>
            <Text style={styles.userInfo}>
              {user?.role === 'admin' ? 'Admin Dashboard' : `Enjoy authentic flavors, ${user?.mobileNumber}`}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.cartIcon}
            onPress={() => navigation.navigate('Cart')}
          >
            <View style={styles.cartBadge}>
              <Text style={styles.cartCount}>{getCartItemCount()}</Text>
            </View>
            <Text style={styles.cartIconText}>🛒</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&w=800' }}
          style={styles.heroImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.heroGradient}
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Authentic Indian Cuisine</Text>
          <Text style={styles.heroSubtitle}>Experience the rich flavors of traditional tandoori cooking</Text>
          <TouchableOpacity 
            style={styles.heroButton}
            onPress={() => navigation.navigate('Menu')}
          >
            <LinearGradient
              colors={['#d4af37', '#b8941f']}
              style={styles.buttonGradient}
            >
              <Text style={styles.heroButtonText}>Explore Menu</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Features */}
      <View style={styles.features}>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>⚡</Text>
          <Text style={styles.featureTitle}>Fast Delivery</Text>
          <Text style={styles.featureSubtitle}>30-45 min</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>👑</Text>
          <Text style={styles.featureTitle}>Premium Quality</Text>
          <Text style={styles.featureSubtitle}>Fresh Ingredients</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>💰</Text>
          <Text style={styles.featureTitle}>Best Price</Text>
          <Text style={styles.featureSubtitle}>Value for Money</Text>
        </View>
      </View>

      {/* Featured Items */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Chef's Special</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
          {featuredItems.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.featuredCard}
              onPress={() => navigation.navigate('Menu')}
            >
              <Image source={{ uri: item.image }} style={styles.featuredImage} />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredName}>{item.name}</Text>
                <View style={styles.featuredMeta}>
                  <Text style={styles.featuredPrice}>₹{item.price}</Text>
                  <View style={styles.rating}>
                    <Text style={styles.ratingIcon}>⭐</Text>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.quickAddButton}>
                  <Text style={styles.quickAddText}>Quick Add</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categories}>
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Menu')}
          >
            <LinearGradient
              colors={['#2d1b0e', '#1a1a1a']}
              style={styles.categoryGradient}
            >
              <Text style={styles.categoryIcon}>🍛</Text>
              <Text style={styles.categoryName}>Biryani</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Menu')}
          >
            <LinearGradient
              colors={['#2d1b0e', '#1a1a1a']}
              style={styles.categoryGradient}
            >
              <Text style={styles.categoryIcon}>🫓</Text>
              <Text style={styles.categoryName}>Breads</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Menu')}
          >
            <LinearGradient
              colors={['#2d1b0e', '#1a1a1a']}
              style={styles.categoryGradient}
            >
              <Text style={styles.categoryIcon}>🍚</Text>
              <Text style={styles.categoryName}>Rice</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Menu')}
          >
            <LinearGradient
              colors={['#2d1b0e', '#1a1a1a']}
              style={styles.categoryGradient}
            >
              <Text style={styles.categoryIcon}>🥘</Text>
              <Text style={styles.categoryName}>Paratha</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Promotional Banner */}
      <View style={styles.promoBanner}>
        <LinearGradient
          colors={['#d4af37', '#b8941f']}
          style={styles.promoGradient}
        >
          <View style={styles.promoContent}>
            <View>
              <Text style={styles.promoTitle}>Special Offer</Text>
              <Text style={styles.promoSubtitle}>Get 20% off on your first order</Text>
            </View>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>ORDER NOW</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#d4af37',
    fontFamily: 'System',
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  userInfo: {
    fontSize: 14,
    color: '#8b7355',
    marginTop: 4,
  },
  cartIcon: {
    position: 'relative',
    padding: 10,
  },
  cartBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#d4af37',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  cartCount: {
    color: '#1a1a1a',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartIconText: {
    fontSize: 24,
  },
  hero: {
    height: 300,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroContent: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#d4af37',
    fontSize: 16,
    marginBottom: 20,
  },
  heroButton: {
    borderRadius: 25,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  buttonGradient: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  heroButtonText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#2d1b0e',
    borderRadius: 15,
    marginTop: 20,
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    color: '#d4af37',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureSubtitle: {
    color: '#8b7355',
    fontSize: 12,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  seeAllText: {
    color: '#d4af37',
    fontSize: 14,
    fontWeight: '600',
  },
  featuredScroll: {
    marginHorizontal: -5,
  },
  featuredCard: {
    width: 280,
    backgroundColor: '#2d1b0e',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 160,
  },
  featuredContent: {
    padding: 15,
  },
  featuredName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredPrice: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    color: '#8b7355',
    fontSize: 14,
  },
  quickAddButton: {
    backgroundColor: '#d4af37',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quickAddText: {
    color: '#1a1a1a',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 100,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  categoryGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  promoBanner: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  promoGradient: {
    padding: 25,
  },
  promoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoTitle: {
    color: '#1a1a1a',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  promoSubtitle: {
    color: '#1a1a1a',
    fontSize: 14,
  },
  promoButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  promoButtonText: {
    color: '#d4af37',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeScreen;