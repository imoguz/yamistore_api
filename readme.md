# YamiStore Project

Welcome to the backend application of my e-commerce platform. This document provides an overview and documentation for the backend of the yamistore website. This project is a shopping website API built using NodeJS, ExpressJS, MongoDB and Mongoose. It includes banner, brand, cart, category, color, size, variant, store, variant, wishlis and a specialized user model for Google login integration. The project also utilizes technologies such as JWT for authentication, Nodemailer for email services, and logger for logging.

## Table of Contents

- [Models](#models)
- [Authentication](#authentication)
- [Advanced Querying](#advanced-querying)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [API Documentation](#api-documentations)
- [Contributing](#contributing)
- [Setup](#setup)

## Models

Our backend consists of the following models:

1. **Banner**: Represents banners for promotions and advertisements.
2. **Brand**: Represents product brands.
3. **Cart**: Manages user shopping carts.
4. **Category**: Organizes products into different categories.
5. **Color**: Represents colors available for products.
6. **Size**: Represents sizes available for products.
7. **Variant**: Manages product variants including color, size, and availability.
8. **Store**: Represents different stores or vendors.
9. **Wishlist**: Manages user wishlists.
10. **User**: Manages user accounts and authentication includes a specialized user model for Google login integration.

## Authentication

The project uses JSON Web Tokens (JWT) for user authentication and authorization. The user model is extended to support Google login.

## Advanced-Querying

The project provides advanced querying capabilities for efficient data retrieval.

## Technologies Used

- **MongoDB and Mongoose**: The project uses MongoDB as the database and Mongoose as the ODM (Object Data Modeling) library for Node.js and MongoDB.

- **NodeJS**: Node.js is a JavaScript runtime that allows developers to execute server-side code, facilitating the building of scalable and efficient network applications.

- **ExpressJS**: Express is used as the web application framework to build robust and scalable APIs.

- **JWT (JSON Web Tokens)**: JSON Web Tokens are employed for secure authentication and authorization processes.

- **Nodemailer**: Nodemailer is integrated for email services, allowing the application to send emails for various functionalities.

- **Logger**: A logging mechanism is implemented using a logger for tracking and managing application logs effectively.

## API Endpoints

The backend provides the following API endpoints:

- **Product**
  - GET `yamistore/products`
  - POST `yamistore/products`
  - GET `yamistore/products/:id`
  - PUT `yamistore/products/:id`
  - DELETE `yamistore/products/:id`

... (Repeat similar sections for other models)

## API Documentation

The API documentation is available in various formats:

- Swagger
- ReDoc
- JSON

Explore the API documentation for a detailed understanding of available endpoints and functionalities.

Feel free to clone the repository and customize the project according to your requirements.

## Contributing

We welcome contributions from the community. If you find any issues or have suggestions for improvement, please feel free to open an issue or create a pull request.

## Setup

1. Clone the repository: `git clone https://github.com/imoguz/yamistorebackend.git`
2. Navigate to the backend directory: `cd yamistorebackend`
3. Install dependencies: `npm install`
4. Configure environment variables (see `.env.example` for reference).
5. Start the server: `npm start`
