import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showCart, setShowCart] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    quantity: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      const productToAdd = {
        id: Date.now(),
        ...newProduct,
        price: parseFloat(newProduct.price),
        quantity: parseInt(newProduct.quantity)
      };

      setProducts(prev => [...prev, productToAdd]);
      setNewProduct({
        name: '',
        price: '',
        description: '',
        category: '',
        quantity: ''
      });
    }
  };

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    let updatedCart;
    if (existingProduct) {
      updatedCart = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    alert('Product added to cart!');
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
      setCartItems(cartItems.filter(item => item.id !== productId));
    }
  };

  const viewCart = () => {
    navigate('/cart');
  };

  return (
    <div className="container">
      <style>
        {`
          :root {
            --primary-color: #4A90E2;
            --success-color: #2ECC71;
            --text-color: #2C3E50;
            --background-color: #F5F7FA;
            --card-background: #FFFFFF;
            --border-radius: 10px;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            --transition: all 0.3s ease;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            background-color: var(--background-color);
            min-height: 100vh;
          }

          h1 {
            font-size: 2.5rem;
            color: var(--text-color);
            margin-bottom: 2rem;
            text-align: center;
            font-weight: 700;
          }

          h2 {
            font-size: 2rem;
            color: var(--text-color);
            font-weight: 600;
          }

          .product-form {
            background: var(--card-background);
            padding: 2rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            margin-bottom: 3rem;
            transition: var(--transition);
          }

          .product-form:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }

          .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .form-group {
            display: flex;
            flex-direction: column;
          }

          .form-group.full-width {
            grid-column: span 2;
          }

          .form-group label {
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            color: var(--text-color);
            font-weight: 500;
          }

          .form-group input,
          .form-group textarea {
            padding: 0.8rem;
            border: 2px solid #E0E5EC;
            border-radius: var(--border-radius);
            transition: var(--transition);
            font-size: 1rem;
          }

          .form-group input:focus,
          .form-group textarea:focus {
            border-color: var(--primary-color);
            outline: none;
            box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
          }

          .btn {
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-weight: 600;
            transition: var(--transition);
          }

          .btn-primary {
            background-color: var(--primary-color);
            color: white;
          }

          .btn-primary:hover {
            background-color: #357ABD;
            transform: translateY(-2px);
          }

          .btn-success {
            background-color: var(--success-color);
            color: white;
          }

          .btn-success:hover {
            background-color: #27AE60;
            transform: translateY(-2px);
          }

          .full-width {
            width: 100%;
          }

          .products-section {
            margin-top: 4rem;
          }

          .products-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
          }

          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }

          .product-card {
            background: var(--card-background);
            padding: 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            transition: var(--transition);
            position: relative;
            overflow: hidden;
          }

          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }

          .product-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to right, var(--primary-color), var(--success-color));
          }

          .product-card h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: var(--text-color);
          }

          .product-card .description {
            color: #666;
            margin-bottom: 1rem;
            line-height: 1.5;
          }

          .product-card .category {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }

          .product-card .price {
            color: var(--primary-color);
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }

          .product-card .stock {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }

          @media (max-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr;
            }

            .form-group.full-width {
              grid-column: auto;
            }

            .products-header {
              flex-direction: column;
              gap: 1rem;
              text-align: center;
            }

            .container {
              padding: 1rem;
            }

            h1 {
              font-size: 2rem;
            }

            h2 {
              font-size: 1.5rem;
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .product-card {
            animation: fadeIn 0.5s ease-out;
          }
        `}
      </style>

      <h1>Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
          
          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>

      <div className="products-section">
        <div className="products-header">
          <h2>Available Products</h2>
          <div className="cart-controls">
           
            <button onClick={viewCart} className="btn btn-success">
              View Cart
            </button>
          </div>
        </div>

        {showCart && cartItems.length > 0 && (
          <div className="cart-preview">
            <h3>Cart Items</h3>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">${item.price}</span>
                    <span className="cart-item-quantity">Qty: {item.quantity}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-card-header">
                <h3>{product.name}</h3>
               
              </div>
              <p className="description">{product.description}</p>
              <p className="category">Category: {product.category}</p>
              <p className="price">${product.price}</p>
              <p className="stock">Stock: {product.quantity}</p>
              <button
                onClick={() => addToCart(product)}
                className="btn btn-primary full-width"
              >
                Add to Cart
              </button>
              <br /><br />
              <button 
                  onClick={() => deleteProduct(product.id)} 
                  className="btn btn-primary   "
                  title="Delete product"
                 >
                  Delete
                </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;