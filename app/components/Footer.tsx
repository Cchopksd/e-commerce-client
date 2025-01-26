import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are a company dedicated to providing the best service in the
              industry. Our mission is to make your life easier with our
              innovative solutions.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:text-white">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="/services" className="hover:text-white">
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to get the latest updates and news.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white rounded-l-lg p-2 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg p-2">
                Subscribe
              </button>
            </form>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="text-gray-400">
              <li className="mb-2">123 Main Street, City, Country</li>
              <li className="mb-2">Email: info@example.com</li>
              <li className="mb-2">Phone: +123 456 7890</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright and Social Media */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
