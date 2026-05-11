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
    <div className="border p-4 rounded">
      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-32 object-cover mb-2"
        />
        <h2 className="font-bold">{title}</h2>
        <p>${price.toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default BookCard;
