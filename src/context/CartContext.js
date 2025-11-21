import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (item, quantity = 1, portion = 'full') => {
    setCartItems(prev => {
      const existingItem = prev.find(
        cartItem => cartItem.id === item.id && cartItem.portion === portion
      );
      
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id && cartItem.portion === portion
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity, portion }];
      }
    });
  };

  const removeFromCart = (itemId, portion) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === itemId && item.portion === portion)
    ));
  };

  const updateQuantity = (itemId, portion, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, portion);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId && item.portion === portion
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.portion === 'half' && item.halfPrice ? item.halfPrice : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: Date.now().toString(),
      items: [...cartItems],
      total: getCartTotal(),
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...orderDetails,
    };
    
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const value = {
    cartItems,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    placeOrder,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};