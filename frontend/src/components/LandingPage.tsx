import React from "react";
import { Link } from "react-router-dom";
import backgroundPic from "../assets/ruralbg.jpg";
import "../styles/list.css";
// @ts-ignore
import ThreeScene from "../assets/ThreeScene"; // Assume ThreeScene is your Three.js component

const LandingPage = () => {
  return (
    <div className="relative  h-screen w-screen overflow-hidden ">
      {/* relative positioning */}
      <ThreeScene />
      <div className="absolute top-0 left-0 w-full h-full overflow-y-auto bg-black bg-opacity-30">
        {/* absolute positioning, full size and scrollable */}
        <div className="flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 mt-20 text-white">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-5xl">
            Accessible Education for Rural India
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {/* Description of your website/app */}
          </p>
          <div className="mt-10 mb-4 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-flex sm:align-middle">
              <Link to="/topics">
                <button className="flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                  Explore a New Learning Experience
                </button>
              </Link>
            </div>
          </div>

          {/* <div className="flex flex-wrap justify-around overflow-y-auto mt-32 pb-10 max-h-[calc(100%-10rem)] w-full"> */}
          {/* Insert statistics */}
          <div className="grid md:grid-cols-2 gap-5 overflow-y-auto mt-32 pb-10 max-h-[calc(100%-10rem)] w-full">
            <div className="mt-10 max-w-prose mx-auto">
              <h2 className="text-3xl font-bold mb-4">Statistics:</h2>
              <ul className="list-disc list-inside text-xl text-gray-200">
                <li className="max-w-lg">
                  According to a 2018 report by Pratham, only 63% of children in
                  rural Karnataka were enrolled in school.
                </li>
                <li className="max-w-lg">
                  The same report found that only 47% of children in rural
                  Karnataka who were enrolled in school were learning at the
                  expected level.
                </li>
                <li className="max-w-lg">
                  A 2019 report by UNICEF found that 22% of children in rural
                  Karnataka were involved in child labor.
                </li>
              </ul>
            </div>
            {/* Insert challenges */}
            <div className="mt-10 max-w-prose mx-auto">
              <h2 className="text-3xl font-bold mb-4">Challenges:</h2>
              <ul className="custom-list text-xl text-gray-200">
                <li>Poverty</li>
                <li>Child labor</li>
                <li>Gender inequality</li>
                <li>Lack of modern infrastructure</li>
                <li>Lack of access to quality education</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
