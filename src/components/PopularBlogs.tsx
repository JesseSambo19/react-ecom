import { MessageCircle, ThumbsUp } from "lucide-react";
import React from "react";

const PopularBlogs = () => {
  const blogs = [
    {
      title: "My Amazing Blog Title 1",
      author: "John",
      likes: 120,
      comments: 45,
    },
    {
      title: "My Amazing Blog Title 2",
      author: "Jane",
      likes: 95,
      comments: 30,
    },
    {
      title: "My Amazing Blog Title 3",
      author: "Bob",
      likes: 80,
      comments: 25,
    },
    {
      title: "My Amazing Blog Title 4",
      author: "Alice",
      likes: 70,
      comments: 20,
    },
  ];
  return (
    <div className="bg-white p-4 sm:p-5 w-full sm:w-[23rem] my-4 border ml-0 sm:ml-5 rounded">
      <h2 className="text-lg sm:text-xl font-bold mb-5">Popular Blogs</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li
            key={index}
            className="mb-4"
          >
            <div className="flex justify-between items-start">
              <span className="font-bold mb-2 text-sm sm:text-base break-words">{blog.title}</span>
            </div>
            <span className="text-xs sm:text-sm text-gray-600">
              Published by {blog.author}
            </span>
            <div className="flex items-center mt-2 gap-3">
              <MessageCircle size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm text-gray-500">
                {blog.likes}
              </span>
              <ThumbsUp size={16} />
              <span className="text-gray-500 mr-2 ml-2">{blog.comments}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlogs;
