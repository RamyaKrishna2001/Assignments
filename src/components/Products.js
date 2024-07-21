import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [products, setProducts] = useState([]);

  const handleNumberChange = (event) => {
    setSelectedNumber(Number(event.target.value));
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data.slice(0, selectedNumber));
    } catch (error) {
      console.error("Error fetching the products:", error);
    }
  };

  const clearProducts = () => {
    setProducts([]);
  };

  useEffect(() => {
    document.title =
      selectedNumber === 1
        ? `${selectedNumber} Product`
        : `${selectedNumber} Products`;
  }, [selectedNumber]);

  return (
    <div className="container mt-1">
      <h2>Fetch Products</h2>
      <div className="mb-3">
        <label htmlFor="product-select" className="form-label">
          Select Number of Products:
        </label>
        <select
          id="product-select"
          className="form-select"
          value={selectedNumber}
          onChange={handleNumberChange}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} Products
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-primary me-2"
        onClick={fetchProducts}
        data-test="fetch-button"
      >
        Fetch Products
      </button>
      <button
        className="btn btn-danger"
        onClick={clearProducts}
        data-test="clear-button"
      >
        Clear
      </button>
      <div className="mt-4">
        {products.length > 0 && (
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th id="id-column">ID</th>
                <th id="title-column">Title</th>
                <th id="price-column">Price</th>
                <th id="description-column">Description</th>
                <th id="category-column">Category</th>
                <th id="image-column">Image</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td id="id">{product.id}</td>
                  <td id="title">{product.title}</td>
                  <td id="price">${product.price}</td>
                  <td id="description">{product.description}</td>
                  <td id="category">{product.category}</td>
                  <td id="image">
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ width: "50px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
