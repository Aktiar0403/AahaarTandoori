import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [menuCategories, setMenuCategories] = useState([
    {
      id: '1',
      name: 'Biriyani & Rice',
      items: [
        {
          id: '1',
          name: 'Chicken Biryani',
          description: 'Fragrant basmati rice cooked with tender chicken and aromatic spices',
          price: 220,
          halfPrice: 120,
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d96f?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Biriyani & Rice'
        },
        {
          id: '2',
          name: 'Hyderabad Biryani',
          description: 'Authentic Hyderabadi dum biryani with rich flavors and tender meat',
          price: 250,
          halfPrice: 130,
          image: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Biriyani & Rice'
        },
        {
          id: '3',
          name: 'Mutton Biryani',
          description: 'Succulent mutton pieces cooked with fragrant rice and spices',
          price: 280,
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Biriyani & Rice'
        },
        {
          id: '4',
          name: 'Paneer Biryani',
          description: 'Flavorful biryani with soft paneer cubes and aromatic rice',
          price: 180,
          image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Biriyani & Rice'
        },
        {
          id: '5',
          name: 'Egg Biryani',
          description: 'Delicious biryani with boiled eggs and special spices',
          price: 160,
          image: 'https://images.unsplash.com/photo-1598214886806-c87ed84e5a1b?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Biriyani & Rice'
        }
      ]
    },
    {
      id: '2',
      name: 'Rice',
      items: [
        {
          id: '6',
          name: 'Plain Rice',
          description: 'Steamed basmati rice',
          price: 90,
          image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Rice'
        },
        {
          id: '7',
          name: 'Jeera Rice',
          description: 'Basmati rice tempered with cumin seeds',
          price: 120,
          image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Rice'
        },
        {
          id: '8',
          name: 'Veg Fried Rice',
          description: 'Stir-fried rice with fresh vegetables',
          price: 130,
          image: 'https://images.unsplash.com/photo-1603133872878-684f270fb8f5?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Rice'
        },
        {
          id: '9',
          name: 'Egg Fried Rice',
          description: 'Fried rice with scrambled eggs and vegetables',
          price: 160,
          image: 'https://images.unsplash.com/photo-1641865750370-645fb8c6e5b4?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Rice'
        },
        {
          id: '10',
          name: 'Chicken Fried Rice',
          description: 'Flavorful fried rice with tender chicken pieces',
          price: 180,
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Rice'
        },
        {
          id: '11',
          name: 'Mix Fried Rice',
          description: 'Special fried rice with chicken, eggs, and vegetables',
          price: 220,
          image: 'https://images.unsplash.com/photo-1603133872642-9dbe4d25887e?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Rice'
        }
      ]
    },
    {
      id: '3',
      name: 'Roti & Breads',
      items: [
        {
          id: '12',
          name: 'Plain Roti',
          description: 'Traditional Indian whole wheat bread',
          price: 10,
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Roti & Breads'
        },
        {
          id: '13',
          name: 'Butter Roti',
          description: 'Soft roti with fresh butter',
          price: 15,
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Roti & Breads'
        },
        {
          id: '14',
          name: 'Tandoori Roti',
          description: 'Traditional Indian bread baked in clay tandoor',
          price: 15,
          image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Roti & Breads'
        },
        {
          id: '15',
          name: 'Butter Naan',
          description: 'Leavened bread with butter',
          price: 60,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Roti & Breads'
        },
        {
          id: '16',
          name: 'Garlic Naan',
          description: 'Soft naan bread topped with fresh garlic and herbs',
          price: 70,
          image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Roti & Breads'
        },
        {
          id: '17',
          name: 'Paneer Kulcha',
          description: 'Stuffed bread with spiced paneer filling',
          price: 100,
          image: 'https://images.unsplash.com/photo-1555949969-aa4bd76539d0?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Roti & Breads'
        }
      ]
    },
    {
      id: '4',
      name: 'Paratha',
      items: [
        {
          id: '18',
          name: 'Aloo Paratha',
          description: 'Whole wheat bread stuffed with spiced potatoes',
          price: 60,
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Paratha'
        },
        {
          id: '19',
          name: 'Onion Paratha',
          description: 'Flaky paratha stuffed with seasoned onions',
          price: 70,
          image: 'https://images.unsplash.com/photo-1633945274417-ab438e34b372?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Paratha'
        },
        {
          id: '20',
          name: 'Paneer Paratha',
          description: 'Paratha filled with spiced cottage cheese',
          price: 80,
          image: 'https://images.unsplash.com/photo-1555949969-aa4bd76539d0?ixlib=rb-4.0.3&w=400',
          available: true,
          category: 'Paratha'
        }
      ]
    }
  ]);

  const addMenuItem = (categoryId, newItem) => {
    setMenuCategories(prev =>
      prev.map(category =>
        category.id === categoryId
          ? { ...category, items: [...category.items, newItem] }
          : category
      )
    );
  };

  const updateMenuItem = (itemId, updatedItem) => {
    setMenuCategories(prev =>
      prev.map(category => ({
        ...category,
        items: category.items.map(item =>
          item.id === itemId ? { ...item, ...updatedItem } : item
        )
      }))
    );
  };

  const deleteMenuItem = (itemId) => {
    setMenuCategories(prev =>
      prev.map(category => ({
        ...category,
        items: category.items.filter(item => item.id !== itemId)
      }))
    );
  };

  const toggleItemAvailability = (itemId) => {
    setMenuCategories(prev =>
      prev.map(category => ({
        ...category,
        items: category.items.map(item =>
          item.id === itemId ? { ...item, available: !item.available } : item
        )
      }))
    );
  };

  const getAllItems = () => {
    return menuCategories.flatMap(category => category.items);
  };

  const value = {
    menuCategories,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    getAllItems,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};