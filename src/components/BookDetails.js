import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [formView, setFormView] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    headline: "",
    comment: "",
    rating: "5",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://kukufmbackend-production.up.railway.app/api/writeReview?bookId=${
          params.bookId
        }&customerId=${localStorage.getItem("kukufm-login-id")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      ).then((res) => res.json());

      setProduct((prev) => {
        const newProduct = JSON.parse(JSON.stringify(prev));
        const newReview = {
          rating: input.rating,
          comment: input.comment,
          headline: input.headline,
          reviewTime: new Date().toISOString(),
          customer: {
            firstname: localStorage.getItem("kukufm-login-name"),
          },
        };
        newProduct.rating =
          (parseInt(newProduct.rating) + parseInt(input.rating)) /
          (newProduct.reviews.length + 1);
        newProduct.reviews.push(newReview);
        return newProduct;
      });
      setFormView(false);
    } catch (error) {
      console.log("Error submitting review", error);
    }
  };

  const handleReviewClick = () => {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    setFormView(!formView);
  };

  const getBookDetails = async () => {
    try {
      const response = await fetch(
        `https://kukufmbackend-production.up.railway.app/api/book/find?id=${params.bookId}`
      ).then((res) => res.json());

      setProduct(response);
    } catch (error) {
      console.log("Error getting book details", error);
    }
  };

  useEffect(() => {
    getBookDetails();
    const loggedInstatus = localStorage.getItem("kukufm-login") ? true : false;
    setLoggedIn(loggedInstatus);
  }, []);

  return (
    <>
      <section className="overflow-hidden text-gray-100">
        {product && (
          <div className="container px-5 pt-32 pb-4 mx-auto sm:py-24">
            <div className="flex flex-wrap items-center mx-auto lg:max-w-5xl">
              <img
                alt={product.title}
                className="rounded w-[300px] h-[500px]"
                src={`data:image/png;base64,${product.image}`}
              />

              <div className="relative w-full h-[500px] mt-6 lg:w-2/3 lg:pl-10 lg:py-6 lg:mt-0">
                <h2 className="relative text-lg tracking-widest text-slate-500 title-font">
                  {product.writer}
                </h2>
                <h1 className="mb-1 text-3xl font-medium text-slate-900 title-font">
                  {product.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <span className="text-xs mr-3 font-semibold px-2.5 py-0.5 rounded bg-cyan-900 bg-opacity-80 text-gray-100">
                      {product.rating === "NaN" ? 0 : product.rating}
                    </span>
                  </span>
                </div>
                <p className="leading-relaxed text-slate-500 text-justify">
                  {product.description}
                </p>

                <div className="flex items-baseline my-4">
                  <span className="text-2xl text-slate-900 before:mr-1 before:content-['$'] font-medium text-gray-100 title-font">
                    {product.price}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleReviewClick}
                  class="absolute bottom-px right-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Add a review
                </button>
              </div>
            </div>
            <div className="flex flex-col flex-wrap mx-auto border-t border-gray-700 lg:max-w-5xl">
              <h2 className="my-2 text-sm tracking-widest text-gray-500 title-font">
                Recent Reviews
              </h2>
              {formView && (
                <>
                  {" "}
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="headline"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="headline"
                        id="headline"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Give a heading"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="comment"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Comment
                      </label>
                      <textarea
                        name="comment"
                        id="comment"
                        maxLength={200}
                        placeholder="Write your review..."
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div>
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
                        name="rating"
                        step={1}
                        onChange={handleChange}
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
                    <div className="w-full flex flex-col justify-center items-center">
                      <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </>
              )}
              {product.reviews &&
                product.reviews.length > 0 &&
                product.reviews.map(
                  (
                    {
                      customer: { firstname },
                      reviewTime,
                      rating,
                      comment,
                      headline,
                    },
                    index
                  ) => (
                    <div
                      key={index}
                      className="flex justify-between content-center py-4 border-b border-gray-700"
                    >
                      <div className="w-full grid grid-cols-4 grid-rows-1 gap-4">
                        <div className="flex flex-wrap items-start content-center col-span-2">
                          <p className="w-40 truncate sm:w-60 text-slate-800">
                            {firstname}
                          </p>
                          <div className="flex flex-col items-center justify-between w-full space-y-2 sm:flex-row">
                            <p className="text-xs text-gray-500">
                              {reviewTime.substring(0, 10)}{" "}
                            </p>
                            <span className="text-xs mr-3 font-semibold px-2.5 py-0.5 rounded bg-cyan-900 bg-opacity-80 text-gray-100">
                              {rating}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <p className="text-2xl font-semibold text-green-600 text-justify">
                            {headline}
                          </p>
                          <p className="text-md text-slate-800 text-justify">
                            {comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default BookDetails;
