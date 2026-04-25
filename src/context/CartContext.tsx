"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  handleBulkOrder: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("silver-spoon-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        React.startTransition(() => {
          setCart(parsedCart);
        });
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("silver-spoon-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    React.startTransition(() => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    React.startTransition(() => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    React.startTransition(() => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    });
  };

  const clearCart = () => {
    React.startTransition(() => {
      setCart([]);
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleBulkOrder = () => {
    const WHATSAPP_NUMBER = "+919876543210";
    let message = "Hi Silver Spoon By AC Jewellers, I would like to place a bulk order for the following items:\n\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (Qty: ${item.quantity})\n`;
    });

    message += "\nPlease let me know the total weight and pricing for these items.";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        handleBulkOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
