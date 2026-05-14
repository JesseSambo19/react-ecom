import React, { useState } from "react";

interface Author {
  name: string;
  // Add other relevant fields as needed
  isFollowing: boolean; // Example field to track if the user is following this author
  image: string; // Example field for author's image
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5"); // Example API endpoint
        const data = await response.json();

        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false, // Default to not following
          image: user.picture.medium, // Example image field
        }));
        // Assuming the API returns an array of authors in data.results
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author,
      ),
    );
  };

  return (
    <div className="bg-white p-4 sm:p-5 mx-2 sm:mx-5 mt-4 sm:mt-[5rem] border w-full sm:w-[23rem] rounded">
      <h2 className="text-lg sm:text-xl font-bold mb-5">Top Sellers</h2>

      <ul>
        {authors.map((author, index) => (
          <li
            key={index}
            className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3 sm:gap-0"
          >
            <section className="flex justify-start items-center gap-3 flex-1 min-w-0">
              <img
                src={author.image}
                alt={author.name}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <span className="text-sm sm:text-base truncate">{author.name}</span>
            </section>

            <button
              onClick={() => handleFollowClick(index)}
              className={`py-1 px-3 rounded text-sm sm:text-base flex-shrink-0 ${author.isFollowing ? "bg-red-500 text-white" : "bg-black text-white"}`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellers;
