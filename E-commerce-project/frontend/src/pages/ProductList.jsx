import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-600">No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-700">Price: ₹{product.price}</p>
              </Link>
              <Link to={`/products/${product._id}`}>Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;