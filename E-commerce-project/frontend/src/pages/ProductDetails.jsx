import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useNavigate } from "react-router-dom";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  const handleBuyNow = () => {
    navigate(`/buy/${product._id}`);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyInCart = cart.find(item => item._id === product._id);
    
    if (!isAlreadyInCart) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
    } else {
      alert("Product already in cart");
    }
  };
  

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );


  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-6">
            ₹{product.price}
          </p>
          <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
           >
           Add to Cart
          </button>
          <button
             onClick={handleBuyNow}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition ml-4"
            >
    Buy Now
  </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
