"use client";

import { useState, useEffect } from "react";
import PageTransition from "../components/PageTransiction";

export default function ContactPage() {
  const [visibleInputs, setVisibleInputs] = useState<number>(0);

  useEffect(() => {
    const delayAnimation = () => {
      Array.from({ length: 3 }).forEach((_, index) => {
        setTimeout(() => {
          setVisibleInputs((prev) => prev + 1);
        }, index * 300);
      });
    };
    delayAnimation();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white px-6 py-8 md:py-16 flex flex-col items-center justify-center">
        {/* Title Section */}
        <div className="flex justify-center mt-7 mb-10 items-center w-full md:mb-16">
          <div className="relative pl-1 pr-1 inline-block overflow-hidden text-center">
            <span className="absolute bottom-0 left-0 w-full h-[6px] bg-white animate-border"></span>
            <span className="absolute inset-0 bg-white opacity-0 animate-fillBackground"></span>
            <h1 className="text-5xl mix-blend-difference uppercase md:text-8xl font-bold mt-2 mb-2 md: tracking-widest">
              Contact me
            </h1>
          </div>
        </div>

        {/* Contact Form */}
        <form className="w-full space-y-6 md:w-[728px]">
          {/* Name Input */}
          <div
            className={`transition-all duration-700 ease-in-out transform ${
              visibleInputs > 0 ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              required
              autoComplete="name"
              className="w-full px-4 py-3 bg-transparent border-b-2 border-white text-white  outline-none transition duration-300 focus:scale-105 focus:shadow-lg"
            />
          </div>

          {/* Email Input */}
          <div
            className={`transition-all duration-700 ease-in-out transform ${
              visibleInputs > 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-transparent  border-b-2 border-white  text-white outline-none transition duration-300 focus:scale-105 focus:shadow-lg"
            />
          </div>

          {/* Message Input */}
          <div
            className={`transition-all duration-700 ease-in-out transform ${
              visibleInputs > 2 ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              rows={4}
              required
              className="w-full px-4 py-3 bg-transparent  border-b-2 border-white  text-white outline-none transition duration-300 focus:scale-105 focus:shadow-lg"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 mt-8 bg-white rounded-sm text-black  font-bold transform hover:bg-gray-300 hover:rounded-lg transition-all duration-500 ease-in-out"
          >
            Send Message
          </button>
        </form>
      </div>
    </PageTransition>
  );
}
