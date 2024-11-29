import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: "", quantity: "", description: "" });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleUpdateProduct = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/products/${id}`, editingProduct);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/products", newProduct);
            setNewProduct({ name: "", quantity: "", description: "" });
            fetchProducts();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="product-list-container">
            <h1>Product List</h1>

            {/* Add Product Form */}
            <div className="add-product-form">
                <h2>Add Product</h2>
                <form onSubmit={handleAddProduct}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        required
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={newProduct.quantity}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })
                        }
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, description: e.target.value })
                        }
                    ></textarea>
                    <button type="submit">Add Product</button>
                </form>
            </div>

            {/* Product Table */}
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.description}</td>
                            <td>
                                <button
                                    onClick={() => handleEditProduct(product)}
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Product Form */}
            {editingProduct && (
                <div className="edit-product-form">
                    <h2>Edit Product</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateProduct(editingProduct.id);
                        }}
                    >
                        <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, name: e.target.value })
                            }
                            required
                        />
                        <input
                            type="number"
                            value={editingProduct.quantity}
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    quantity: parseInt(e.target.value),
                                })
                            }
                            required
                        />
                        <textarea
                            value={editingProduct.description}
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    description: e.target.value,
                                })
                            }
                        ></textarea>
                        <button type="submit">Update Product</button>
                        <button onClick={() => setEditingProduct(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ProductList;
