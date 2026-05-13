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
    <div className="bg-white p-5 w-[23rem] mt-4 boder ml-5 rounded">
      <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li
            key={index}
            className="mb-4"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold mb-2">{blog.title}</span>
            </div>
            <span className="text-sm text-gray-600">
              Published by {blog.author}
            </span>
            <div className="flex items-center mt-2">
              <MessageCircle size={16} />
              <span className="text-gray-500 mr-5 ml-1">
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
