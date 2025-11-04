import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-surface">
      <div className="text-center px-6 py-12 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Large 404 Icon */}
          <div className="relative">
            <div className="text-8xl font-bold text-primary/20 select-none">404</div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <ApperIcon name="Search" size={48} className="text-primary/40" />
            </motion.div>
          </div>

          {/* Error Message */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-secondary">
              Oops! Page Not Found
            </h1>
            <p className="text-secondary/70 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back to shopping!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link to="/">
              <Button className="w-full sm:w-auto">
                <ApperIcon name="Home" size={16} className="mr-2" />
                Go Home
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" className="w-full sm:w-auto">
                <ApperIcon name="ShoppingBag" size={16} className="mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>

          {/* Popular Links */}
          <div className="pt-6 border-t border-secondary/10">
            <p className="text-sm text-secondary/60 mb-3">Popular Pages:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/category/men" className="text-sm text-primary hover:underline">
                Men's Fashion
              </Link>
              <Link to="/category/women" className="text-sm text-primary hover:underline">
                Women's Fashion
              </Link>
              <Link to="/search" className="text-sm text-primary hover:underline">
                Search
              </Link>
              <Link to="/wishlist" className="text-sm text-primary hover:underline">
                Wishlist
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;