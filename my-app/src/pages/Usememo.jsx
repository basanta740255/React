import React, { useState, useMemo } from "react";

const initialProducts = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999 },
  { id: 2, name: "Shoes", category: "Clothing", price: 59 },
  { id: 3, name: "Phone", category: "Electronics", price: 799 },
  { id: 4, name: "Shirt", category: "Clothing", price: 19 },
  { id: 5, name: "Watch", category: "Accessories", price: 199 },
  { id: 6, name: "Headphones", category: "Electronics", price: 129 },
  { id: 7, name: "Sunglasses", category: "Accessories", price: 89 },
  { id: 8, name: "Jacket", category: "Clothing", price: 119 },
];

function ProductTable() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
  });

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return sorted;
  }, [searchTerm, sortOrder, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (
    
      newProduct.name &&
      newProduct.category &&
      newProduct.price
    ) {
      // Add new product to the products array
      setProducts((prev) => [
        ...prev,
        {
         
          name: newProduct.name,
          category: newProduct.category,
          price: parseFloat(newProduct.price),
        },
      ]);

      // Clear form fields
      setNewProduct({
        
        name: "",
        category: "",
        price: "",
      });
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
      
      <div>
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.button}>
        Add Product
      </button>
    </form>

      <h1>Product Table</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
        style={styles.input}
      />

      <button onClick={handleSortChange} style={styles.button}>
        Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProducts.map((product) => (
            <tr key={product.id}>
              <td style={styles.td}>{product.name}</td>
              <td style={styles.td}>{product.category}</td>
              <td style={styles.td}>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

     
      
    </div>
  );
}

// Styles for the component
const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    width: "calc(33% - 10px)",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px 0",
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
    border: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  form: {
    marginTop: "20px",
  },
};

export default ProductTable;
