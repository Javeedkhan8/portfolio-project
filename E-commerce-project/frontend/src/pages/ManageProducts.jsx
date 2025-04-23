import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../services/productService";
import { toast } from "react-toastify";

const initialFormState = {
  name: "",
  price: "",
  description: "",
  category: "",
  image: "",
  countInStock: "",
};


const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authorized. Please login.");
      return;
    }

    try{
    if (isEditing) {
      const updated = await updateProduct(editingId, form,token);
      setProducts(
        products.map((p) => (p._id === editingId ? updated : p))
      );
      toast.success("Product updated successfully!");
    } else {
      const created = await createProduct(form,token);
      setProducts([...products, created]);
    }
    setForm(initialFormState);
    setIsEditing(false);
    setEditingId(null);
  } catch (error){
    console.error("Error submitting product:", error);
    alert("Something went wrong. Please try again.");
  }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setIsEditing(true);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="block w-full p-2 border rounded mb-2"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="block w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="block w-full p-2 border rounded mb-2"
        />
        <input
  name="category"
  value={form.category}
  onChange={handleChange}
  placeholder="Category"
  className="block w-full p-2 border rounded mb-2"
/>

<input
  name="image"
  value={form.image}
  onChange={handleChange}
  placeholder="Image URL"
  className="block w-full p-2 border rounded mb-2"
/>

<input
  name="countInStock"
  value={form.countInStock}
  onChange={handleChange}
  placeholder="Count in Stock"
  type="number"
  className="block w-full p-2 border rounded mb-2"
/>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isEditing ? "Update Product" : "Create Product"}
        </button>
      </form>

      {/* List */}
      {products.map((product) => (
        <div
          key={product._id}
          className="p-3 border rounded mb-2 flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>${product.price}</p>
            <p className="text-sm text-gray-500">{product.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(product)}
              className="text-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProducts;
