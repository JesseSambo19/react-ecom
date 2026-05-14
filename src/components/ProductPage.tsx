import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "./LoadingSpinner";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  //   category: string;
  //   thumbnail: string;
  images: string[];
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (id != undefined) {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
          console.log("Fetched product data:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
          setLoading(false);
          navigate("/"); // Redirect to home if product not found
        });
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner fullScreen size="large" />;
  }

  if (!product) {
    return (
      <div className="p-5 w-[60%] text-center text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="w-full md:w-[60%] p-4 sm:p-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded text-sm sm:text-base"
      >
        Back
      </button>

      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full sm:w-[80%] md:w-[50%] h-auto mb-5"
      />
      <h1 className="text-xl sm:text-2xl mb-4 font-bold">{product.title}</h1>
      <p className="mb-4 text-gray-700 w-full sm:w-[90%] md:w-[70%] text-sm sm:text-base">
        {product.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
        <p className="text-sm sm:text-base">Price: ${product.price.toFixed(2)}</p>
        <p className="text-sm sm:text-base">Rating: {product.rating}</p>
      </div>
    </div>
  );
};

export default ProductPage;
