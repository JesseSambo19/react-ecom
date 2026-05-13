import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

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

  useEffect(() => {
    if (id != undefined) {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          console.log("Fetched product data:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
          navigate("/"); // Redirect to home if product not found
        });
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>

      <img
        src={product.images[0]}
        alt={product.title}
        className="w-[50%] h-auto mb-5"
      />
      <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
      <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
      <div className="flex">
        <p>Price: ${product.price.toFixed(2)}</p>
        <p className="ml-10">Rating: {product.rating}</p>
      </div>
    </div>
  );
};

export default ProductPage;
