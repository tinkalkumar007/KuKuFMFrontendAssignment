import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KUKUFM from "../images/kukufm.jpg";
import { toast } from "react-hot-toast";

const Register = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    Address1: "",
    Address2: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      input.firstName === "" ||
      input.lastName === "" ||
      input.email === "" ||
      input.password === "" ||
      input.Address1 === "" ||
      input.Address2 === "" ||
      input.phone === "" ||
      input.city === "" ||
      input.state === "" ||
      input.country === "" ||
      input.zipcode === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await fetch(
        "https://kukufmbackend-production.up.railway.app/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
      navigate("/login");
      toast.success("Register");
    } catch (error) {
      console.log("Error register", error);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 pt-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white rounded-lg"
          >
            <img className="w-20 h-10 rounded-lg" src={KUKUFM} alt="logo" />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <div className="flex mb-2 justify-between items-center">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      value={input.firstName}
                      name="firstName"
                      id="firstName"
                      className="bg-gray-50 w-64 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="First Name"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex mb-2 justify-between items-center">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={input.lastName}
                      id="lastName"
                      className="bg-gray-50 w-64 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Last Name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex mb-2 justify-between items-center">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={input.email}
                      id="email"
                      className="bg-gray-50 w-64 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex mb-2 justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={input.password}
                      id="password"
                      className="bg-gray-50 w-64 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Password"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex mb-2 justify-between items-center">
                    <label
                      htmlFor="Address1"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      name="Address1"
                      value={input.Address1}
                      id="Address1"
                      className="bg-gray-50 w-64 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Address Line 1"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex mb-2 justify-between items-center">
                    <label
                      htmlFor="Address2"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="Address2"
                      value={input.Address2}
                      id="Address2"
                      className="bg-gray-50 w-64 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Address Line 2"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex mb-2 justify-between items-center">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={input.phone}
                      id="phone"
                      className="bg-gray-50 w-64 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Phone"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex justify-between mb-2">
                    <div className="">
                      <label
                        htmlFor="city"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={input.city}
                        id="city"
                        className="bg-gray-50 w-40 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="City"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="state"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        State
                      </label>
                      <input
                        type="tel"
                        name="state"
                        value={input.state}
                        id="state"
                        className="bg-gray-50 w-40 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="State"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="">
                      <label
                        htmlFor="country"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={input.country}
                        id="country"
                        className="bg-gray-50 w-40 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Country"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="zipcode"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Zipcode
                      </label>
                      <input
                        type="number"
                        name="zipcode"
                        value={input.zipcode}
                        id="zipcode"
                        className="bg-gray-50 w-40 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Zipcode"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col justify-center items-center">
                  <button
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign up
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                      onClick={() => navigate("/login")}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
