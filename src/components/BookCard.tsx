import React from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, price, image }) => {
  return (
    <div className="border p-2 sm:p-4 rounded hover:shadow-lg transition-shadow">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-24 sm:h-32 object-cover mb-2 rounded"
        />
        <h2 className="font-bold text-sm sm:text-base line-clamp-2">{title}</h2>
        <p className="text-sm sm:text-base text-green-600 font-semibold">${price.toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default BookCard;
