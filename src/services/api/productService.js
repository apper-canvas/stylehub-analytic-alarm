import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class ProductService {
  constructor() {
    this.tableName = 'product_c';
    this.apperClient = null;
  }

  // Initialize ApperClient
  getClient() {
    if (!this.apperClient) {
      this.apperClient = getApperClient();
    }
    return this.apperClient;
  }

  // Get all products
  async getAll() {
    try {
      const client = this.getClient();
      if (!client) throw new Error("ApperClient not initialized");

      const response = await client.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        pagingInfo: { limit: 100, offset: 0 }
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform database fields to frontend format
      return response.data.map(this.transformProduct);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      toast.error("Failed to load products");
      return [];
    }
  }

  // Get product by ID
  async getById(id) {
    try {
      const client = this.getClient();
      if (!client) throw new Error("ApperClient not initialized");

      const response = await client.getRecordById(this.tableName, id, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error("Product not found");
      }

      return this.transformProduct(response.data);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error.message);
      toast.error("Failed to load product");
      throw error;
    }
  }

  // Transform database product to frontend format
  transformProduct(dbProduct) {
    return {
      Id: dbProduct.Id,
      title: dbProduct.title_c || dbProduct.Name || '',
      category: dbProduct.category_c || '',
      subcategory: dbProduct.subcategory_c || '',
      brand: dbProduct.brand_c || '',
      price: dbProduct.price_c || 0,
      originalPrice: dbProduct.original_price_c || dbProduct.price_c || 0,
      discount: dbProduct.discount_c || 0,
      images: this.parseArray(dbProduct.images_c) || [],
      sizes: this.parseArray(dbProduct.sizes_c) || [],
      colors: this.parseArray(dbProduct.colors_c) || [],
      description: dbProduct.description_c || '',
      rating: dbProduct.rating_c || 0,
      reviewCount: dbProduct.review_count_c || 0,
      inStock: dbProduct.in_stock_c || false,
      tags: this.parseArray(dbProduct.tags_c) || []
    };
  }

  // Helper to parse comma-separated strings or JSON arrays
  parseArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    
    try {
      // Try parsing as JSON first
      return JSON.parse(value);
    } catch {
      // Fall back to comma-separated string
      return value.split(',').map(item => item.trim()).filter(Boolean);
    }
  }

  // Get products by category
  async getByCategory(category) {
    try {
      const client = this.getClient();
      if (!client) throw new Error("ApperClient not initialized");

      const response = await client.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [{
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [category]
        }],
        pagingInfo: { limit: 100, offset: 0 }
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data.map(this.transformProduct);
    } catch (error) {
      console.error("Error fetching products by category:", error.message);
      toast.error("Failed to load category products");
      return [];
    }
  }

  // Search products
  async search(query) {
    try {
      const client = this.getClient();
      if (!client) throw new Error("ApperClient not initialized");

      const response = await client.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {
                  "fieldName": "title_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ],
              "operator": "OR"
            },
            {
              "conditions": [
                {
                  "fieldName": "brand_c", 
                  "operator": "Contains",
                  "values": [query]
                }
              ],
              "operator": "OR"
            },
            {
              "conditions": [
                {
                  "fieldName": "category_c",
                  "operator": "Contains", 
                  "values": [query]
                }
              ],
              "operator": "OR"
            }
          ]
        }],
        pagingInfo: { limit: 100, offset: 0 }
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data.map(this.transformProduct);
    } catch (error) {
      console.error("Error searching products:", error.message);
      toast.error("Failed to search products");
      return [];
    }
  }

  // Get featured products (high ratings)
  async getFeatured() {
    try {
      const client = this.getClient();
      if (!client) throw new Error("ApperClient not initialized");

      const response = await client.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [{
          "FieldName": "rating_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [4.5]
        }],
        pagingInfo: { limit: 8, offset: 0 }
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data.map(this.transformProduct);
    } catch (error) {
      console.error("Error fetching featured products:", error.message);
      toast.error("Failed to load featured products");
      return [];
    }
  }

  // Get sale items (with discounts)
  async getSaleItems() {
    try {
      const client = this.getClient();
      if (!client) throw new Error("ApperClient not initialized");

      const response = await client.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [{
          "FieldName": "discount_c",
          "Operator": "GreaterThan",
          "Values": [0]
        }],
        pagingInfo: { limit: 50, offset: 0 }
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data.map(this.transformProduct);
    } catch (error) {
      console.error("Error fetching sale items:", error.message);
      toast.error("Failed to load sale items");
      return [];
    }
  }

  // Create product
  async create(productData) {
    try {
      const client = this.getClient();
      if (!client) throw new Error("ApperClient not initialized");

      const response = await client.createRecord(this.tableName, {
        records: [{
          Name: productData.title || productData.name,
          title_c: productData.title,
          category_c: productData.category,
          subcategory_c: productData.subcategory,
          brand_c: productData.brand,
          price_c: productData.price,
          original_price_c: productData.originalPrice,
          discount_c: productData.discount,
          images_c: Array.isArray(productData.images) ? JSON.stringify(productData.images) : productData.images,
          sizes_c: Array.isArray(productData.sizes) ? JSON.stringify(productData.sizes) : productData.sizes,
          colors_c: Array.isArray(productData.colors) ? JSON.stringify(productData.colors) : productData.colors,
          description_c: productData.description,
          rating_c: productData.rating,
          review_count_c: productData.reviewCount,
          in_stock_c: productData.inStock,
          tags_c: Array.isArray(productData.tags) ? JSON.stringify(productData.tags) : productData.tags
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results && response.results.length > 0) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success("Product created successfully!");
          return this.transformProduct(successful[0].data);
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating product:", error.message);
      toast.error("Failed to create product");
      return null;
    }
  }

  // Update product
  async update(id, productData) {
    try {
      const client = this.getClient();
      if (!client) throw new Error("ApperClient not initialized");

      const updateData = { Id: id };
      
      // Only include fields that are being updated
      if (productData.title !== undefined) updateData.title_c = productData.title;
      if (productData.category !== undefined) updateData.category_c = productData.category;
      if (productData.subcategory !== undefined) updateData.subcategory_c = productData.subcategory;
      if (productData.brand !== undefined) updateData.brand_c = productData.brand;
      if (productData.price !== undefined) updateData.price_c = productData.price;
      if (productData.originalPrice !== undefined) updateData.original_price_c = productData.originalPrice;
      if (productData.discount !== undefined) updateData.discount_c = productData.discount;
      if (productData.images !== undefined) updateData.images_c = Array.isArray(productData.images) ? JSON.stringify(productData.images) : productData.images;
      if (productData.sizes !== undefined) updateData.sizes_c = Array.isArray(productData.sizes) ? JSON.stringify(productData.sizes) : productData.sizes;
      if (productData.colors !== undefined) updateData.colors_c = Array.isArray(productData.colors) ? JSON.stringify(productData.colors) : productData.colors;
      if (productData.description !== undefined) updateData.description_c = productData.description;
      if (productData.rating !== undefined) updateData.rating_c = productData.rating;
      if (productData.reviewCount !== undefined) updateData.review_count_c = productData.reviewCount;
      if (productData.inStock !== undefined) updateData.in_stock_c = productData.inStock;
      if (productData.tags !== undefined) updateData.tags_c = Array.isArray(productData.tags) ? JSON.stringify(productData.tags) : productData.tags;

      const response = await client.updateRecord(this.tableName, {
        records: [updateData]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results && response.results.length > 0) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success("Product updated successfully!");
          return this.transformProduct(successful[0].data);
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating product:", error.message);
      toast.error("Failed to update product");
      return null;
    }
  }

  // Delete product
  async delete(id) {
    try {
      const client = this.getClient();
      if (!client) throw new Error("ApperClient not initialized");

      const response = await client.deleteRecord(this.tableName, {
        RecordIds: [id]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results && response.results.length > 0) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success("Product deleted successfully!");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting product:", error.message);
      toast.error("Failed to delete product");
      return false;
    }
  }
}

export const productService = new ProductService();