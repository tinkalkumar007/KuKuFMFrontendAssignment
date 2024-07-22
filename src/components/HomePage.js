import { useEffect, useState } from "react";
import { Book } from ".";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState({
    genre: "null",
    author: "null",
    rating: 0,
  });

  const handleFilterChange = (event, filter) => {
    console.log(event.target.value);
    console.log(filter);
    const filterValue = event.target.value;
    setFilterValues((prev) => {
      return {
        ...prev,
        [filter]: filterValue,
      };
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("kukufm-login-name");
    localStorage.removeItem("kukufm-login-id");
    localStorage.removeItem("kukufm-login");
    setLoggedIn(false);
  };

  const getBooks = async () => {
    try {
      const response = await fetch(
        `https://kukufmbackend-production.up.railway.app/api/book/findAll?writer=${filterValues.author}&genre=${filterValues.genre}&ratings=${filterValues.rating}`
      ).then((response) => response.json());
      console.log(response);
      setData(response);
      setBooks(response);
    } catch (error) {
      console.log("Error getting books", error);
    }
  };

  useEffect(() => {
    getBooks();
    const loggedInstatus = localStorage.getItem("kukufm-login") ? true : false;
    setLoggedIn(loggedInstatus);
  }, [filterValues]);

  return (
    <>
      <section className="pt-4">
        <div className="relative mb-4">
          <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Books..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <div className="absolute top-2 right-36">
            {loggedIn ? (
              <>
                <span className="mr-2">Welcome</span>
                <span className="mr-4">
                  {localStorage.getItem("kukufm-login-name")}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-1 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  onClick={() => navigate("/login")}
                  className="mr-4 cursor-pointer hover:text-blue hover:underline"
                >
                  Login
                </a>
                <a
                  onClick={() => navigate("/register")}
                  className="cursor-pointer hover:text-blue hover:underline"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
        <section className="flex ">
          <aside className="w-72 p-4 pl-16">
            <div className="max-w-sm mx-auto">
              <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an category
              </label>
              <select
                id="genre"
                onChange={(event) => handleFilterChange(event, "genre")}
                value={filterValues.genre}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a category</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Science">Science</option>
                <option value="Drama">Drama</option>
                <option value="Psycology">Psychology</option>
              </select>
            </div>

            <div className="max-w-sm mx-auto my-4">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Author
              </label>
              <select
                id="countries"
                onChange={(event) => handleFilterChange(event, "author")}
                value={filterValues.author}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose an Author</option>
                <option value="Erin Morgenstern">Erin Morgenstern</option>
                <option value="Ernest Cline">Ernest Cline</option>
                <option value="Khaled Hosseini">Khaled Hosseini</option>
                <option value="Markus Zusak">Markus Zusaki</option>
              </select>
            </div>

            <div className="relative my-4">
              <label
                htmlFor="labels-range-input"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Ratings
              </label>
              <input
                id="labels-range-input"
                type="range"
                min="1"
                max="5"
                step={1}
                value={filterValues.rating}
                onChange={(event) => handleFilterChange(event, "rating")}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  1
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  2
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  3
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  4
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  5
                </span>
              </div>
            </div>
          </aside>
          <div className="grid grid-cols-4 gap-6 mx-auto">
            {data.map((book) => (
              <Book key={book.bookId} item={book} />
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default HomePage;
