import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Book, Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";
import LoadingSpinner from "./LoadingSpinner";

const MainContext = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const itemsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
        //   console.log("Fetched data:", response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory,
      );

      //   console.log(filteredProducts);
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice,
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice,
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    switch (filter) {
      case "cheap":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filteredProducts;
  };

  //   const filteredProducts = getFilteredProducts();
  const filteredProducts = getFilteredProducts();
  console.log("Filtered products:", filteredProducts);

  const totalProducts = 100; // This should ideally come from the API response
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - (currentPage - 1)));
    }

    if (currentPage + 2 > totalPages) {
      startPage = Math.min(1, endPage - (2 - totalPages - currentPage));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <section className="w-full md:w-[55rem] lg:w-[55rem] xl:w-[55rem] p-3 sm:p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative mb-3 sm:mb-5 mt-3 sm:mt-5 w-full sm:w-auto">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="border px-3 sm:px-4 py-2 rounded-full flex items-center cursor-pointer text-sm sm:text-base w-full sm:w-auto justify-center">
              <Tally3 className="mr-2 w-4 h-4" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded mt-1 w-full sm:w-40 z-10">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-3 sm:px-4 py-2 w-full text-left hover:bg-gray-200 text-sm"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block px-3 sm:px-4 py-2 w-full text-left hover:bg-gray-200 text-sm"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block px-3 sm:px-4 py-2 w-full text-left hover:bg-gray-200 text-sm"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-5">
          {/* BookCard */}
          {loading ? (
            <div className="col-span-full">
              <LoadingSpinner size="medium" />
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <BookCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.thumbnail}
                price={product.price}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              No products found
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-3">
          {/* previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-3 sm:px-4 py-2 mx-1 rounded-full text-sm sm:text-base disabled:opacity-50 w-full sm:w-auto"
          >
            Previous
          </button>

          {/* page numbers */}
          <div className="flex flex-wrap justify-center gap-1">
            {getPaginationButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`border px-2 sm:px-4 py-2 rounded-full text-sm sm:text-base ${
                  currentPage === page ? "bg-black text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border px-3 sm:px-4 py-2 mx-1 rounded-full text-sm sm:text-base disabled:opacity-50 w-full sm:w-auto"
          >
            Next
          </button>
        </div>
        {/* 1,2,3,4,5 */}
        {/* next */}
      </div>
    </section>
  );
};

export default MainContext;
