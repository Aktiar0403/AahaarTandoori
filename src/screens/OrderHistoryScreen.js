// src/screens/OrderTrackingScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const OrderTrackingScreen = ({ route, navigation }) => {
  const { order } = route.params || {};
  const [progress] = useState(new Animated.Value(0));
  
  const orderStages = [
    { status: 'confirmed', label: 'Order Confirmed', time: '2 min ago' },
    { status: 'preparing', label: 'Preparing Food', time: 'Currently' },
    { status: 'cooking', label: 'Cooking', time: 'Next' },
    { status: 'ready', label: 'Ready for Pickup', time: 'Estimated 15 min' },
    { status: 'delivered', label: 'Delivered', time: 'Estimated 30 min' },
  ];

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0.4, // 40% progress (confirmed -> preparing)
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2d1b0e']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <Text style={styles.orderNumber}>Order #{(order?.id || '123456').slice(-6)}</Text>
        <Text style={styles.estimatedTime}>Estimated delivery: 30-45 minutes</Text>
      </LinearGradient>

      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Order Status</Text>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View 
              style={[
                styles.progressFill,
                {
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          
          {/* Progress Steps */}
          <View style={styles.progressSteps}>
            {orderStages.map((stage, index) => (
              <View key={stage.status} style={styles.stepContainer}>
                <View style={[
                  styles.stepDot,
                  index <= 1 ? styles.activeDot : styles.inactiveDot
                ]}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <View style={styles.stepInfo}>
                  <Text style={[
                    styles.stepLabel,
                    index <= 1 ? styles.activeText : styles.inactiveText
                  ]}>
                    {stage.label}
                  </Text>
                  <Text style={styles.stepTime}>{stage.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Order Details */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Time</Text>
            <Text style={styles.detailValue}>{new Date().toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery Address</Text>
            <Text style={styles.detailValue}>
              {order?.deliveryAddress || '123 Food Street, Mumbai'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Method</Text>
            <Text style={styles.detailValue}>Cash on Delivery</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Amount</Text>
            <Text style={styles.detailValue}>₹{order?.total || '0'}</Text>
          </View>
        </View>
      </View>

      {/* Contact Support */}
      <View style={styles.supportSection}>
        <Text style={styles.sectionTitle}>Need Help?</Text>
        <View style={styles.supportCard}>
          <Text style={styles.supportText}>
            Your order is being prepared with care. If you have any questions about your order:
          </Text>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
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
    padding: 30,
    paddingTop: 80,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#d4af37',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderNumber: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 4,
  },
  estimatedTime: {
    color: '#8b7355',
    fontSize: 14,
  },
  progressSection: {
    padding: 20,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBackground: {
    width: '100%',
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 40,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#d4af37',
    borderRadius: 2,
  },
  progressSteps: {
    width: '100%',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  stepDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activeDot: {
    backgroundColor: '#d4af37',
  },
  inactiveDot: {
    backgroundColor: '#333',
  },
  stepNumber: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepInfo: {
    flex: 1,
  },
  stepLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activeText: {
    color: '#d4af37',
  },
  inactiveText: {
    color: '#8b7355',
  },
  stepTime: {
    color: '#8b7355',
    fontSize: 14,
  },
  detailsSection: {
    padding: 20,
  },
  detailsCard: {
    backgroundColor: '#2d1b0e',
    borderRadius: 15,
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  detailLabel: {
    color: '#8b7355',
    fontSize: 14,
  },
  detailValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  supportSection: {
    padding: 20,
  },
  supportCard: {
    backgroundColor: '#2d1b0e',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  supportText: {
    color: '#8b7355',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  supportButton: {
    backgroundColor: '#d4af37',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  supportButtonText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OrderTrackingScreen;