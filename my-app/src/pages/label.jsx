import React, { useState, useEffect } from "react";

export default function LoadMore() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (skipValue) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=4&skip=${skipValue}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();

      if (skipValue === 0) {
        setProducts(data.products); // Reset products for initial load
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]); // Append new products
      }

      setHasMore(data.products.length === 4); // Check if there are more products
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(skip);
  }, [skip]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + 4); // Trigger a new fetch with updated skip value
  };

  if (loading && skip === 0 && products.length === 0) {
    return <div className="text-center text-lg font-semibold">Loading ...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Products</h1>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={product.thumbnail}
                alt={product.title || "Product Image"}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No products available</div>
      )}

      {loading && skip > 0 && (
        <p className="text-center text-lg font-semibold">Loading ...</p>
      )}

      {!loading && hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-gray-600 mt-4">
          No more products available
        </p>
      )}
    </div>
  );
}
