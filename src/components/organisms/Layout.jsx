import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import CartDrawer from "@/components/organisms/CartDrawer";
import { useCart } from "@/hooks/useCart";

function Layout() {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const handleCheckout = () => {
    // Checkout logic implementation
    console.log('Proceeding to checkout with items:', cartItems);
    closeCartDrawer();
    // Add your checkout logic here
  };

  // Context value to pass to child routes
  const outletContext = {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCartDrawer,
    closeCartDrawer,
    isCartDrawerOpen,
    handleCheckout,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onOpenCart={openCartDrawer} />

      {/* Main Content */}
      <main>
        <Outlet context={outletContext} />
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={closeCartDrawer}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default Layout;