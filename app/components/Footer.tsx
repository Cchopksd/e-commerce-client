"use client";
import React from "react";
import {
  CreditCard,
  Smartphone,
  QrCode,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Clock,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin-dashboard")) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">About Us</h3>
            <p className="text-sm leading-relaxed mb-4">
              We are committed to providing the best shopping experience with
              secure payment options and quality products.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-500 transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Payment Methods
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">Credit/Debit Cards</p>
                  <p className="text-sm text-gray-400">Visa, Mastercard, JCB</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <QrCode className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium">PromptPay</p>
                  <p className="text-sm text-gray-400">
                    Scan QR to pay instantly
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-medium">Mobile Banking</p>
                  <p className="text-sm text-gray-400">
                    All major Thai banks supported
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <p>+66 2 123 4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <p>support@example.com</p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <p>123 Sukhumvit Road, Bangkok 10110</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shopping Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Icons */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {/* Replace these divs with actual payment method logos */}
            <div className="bg-white p-2 rounded-md w-12 h-8"></div>
            <div className="bg-white p-2 rounded-md w-12 h-8"></div>
            <div className="bg-white p-2 rounded-md w-12 h-8"></div>
            <div className="bg-white p-2 rounded-md w-12 h-8"></div>
            <div className="bg-white p-2 rounded-md w-12 h-8"></div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>© 2024 Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
