import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Clock, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Resto
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Experience the finest cuisine delivered right to your doorstep
        </p>
        <Link
          to="/menu"
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          View Our Menu
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <ChefHat className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
          <p className="text-gray-600">
            Our dishes are crafted by experienced chefs using the finest ingredients
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Clock className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
          <p className="text-gray-600">
            Fast and reliable delivery to ensure your food arrives hot and fresh
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Star className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Top Rated</h3>
          <p className="text-gray-600">
            Consistently rated 5 stars by our satisfied customers
          </p>
        </div>
      </div>

      <div className="relative h-96 rounded-xl overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Visit Us Today</h2>
            <p className="text-xl mb-6">Experience the ambiance and flavors</p>
            <Link
              to="/menu"
              className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;