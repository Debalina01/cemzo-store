import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load products. Please try again.');
        setLoading(false);
      });
  }, []);


  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
  
      <header className="header">
        <div className="header-container">
          <h1 className="brand-name">Cemzo Store</h1>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

   
      <main className="main-content">
        <h2 className="section-title">Our Products</h2>

  
        {loading && <p className="status-message">Loading products...</p>}

        
        {error && <p className="status-message error-message">{error}</p>}

    
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="status-message">No products found.</p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-category">{product.category}</p>
                  <div className="product-details">
                    <span className="product-price">${product.price}</span>
                    <span className="product-rating">★ {product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
