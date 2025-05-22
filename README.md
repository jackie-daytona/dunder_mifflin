```markdown
# Dunder Mifflin Database Management System

## Overview

Dunder Mifflin is a mid-size paper supply company headquartered in New York, NY, with thirteen regional branches spread across the North-Eastern US and 300 employees. The company serves a total of about 5,000 clients at any given time. It is a publicly traded company that brings in an average of $48 million in revenue each year, with a profit margin of 3%. Facing competition from large national chains like Staples and Office Depot, Dunder Mifflin needs a functional and responsive database management system in order to streamline processes. This system will be used to manage each Branch’s Employees, Departments, Customers, Products, and Invoices, and will allow for efficient data entry by employees. Dunder Mifflin hopes this system will increase profit margins by allowing employees to spend more time building customer relationships, and less time on data entry.

## Project Structure

```

root
├── client/ # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── components/
│       └── pages/
├── server/ # Express backend
│   ├── models/
│   ├── routes/
│   └── server.js

````

## Frontend

- Built using React with React Router for client-side routing.
- Main entry point: `client/src/App.js`
- Styling handled with CSS and Google Fonts.
- The frontend provides pages for Home, Topics, Packers management, and supports Create and Edit forms.
- Navigation component handles site navigation.
- Responsive design with mobile-first CSS and media queries.
- Uses state hooks to manage game data and pass it between components.

## Backend

- Built using Node.js and Express.
- API endpoints provide CRUD operations on Packers-related data.
- Server code is located in the `server/` folder, with separated folders for `models` and `routes`.
- The backend handles data storage and retrieval to support frontend operations.
- Includes middleware for JSON parsing and CORS handling.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/dunder-mifflin-dbms.git
````

2. Install dependencies for server:

```bash
cd server
npm install
```

3. Install dependencies for client:

```bash
cd ../client
npm install
```

4. Set up environment variables:

* Create a `.env` file in the `server` directory with any required configuration (e.g., database URL).

5. Run the backend server:

```bash
cd ../server
npm start
```

6. Run the frontend client:

```bash
cd ../client
npm start
```

## Usage

* Access the frontend at `http://localhost:3000`.
* Use the navigation bar to explore different pages including Packers management.
* The app allows creating, reading, updating, and deleting Packers game data.
* All data interactions are synchronized between frontend and backend.

## Features

* Responsive design for different device sizes.
* React Router for seamless navigation without full page reloads.
* State management using React Hooks.
* Backend API built with Express, organized with models and routes.
* Separation of concerns between frontend and backend for maintainability.

## Technologies Used

* React
* React Router DOM
* Node.js
* Express
* CSS3 and Google Fonts
* JavaScript (ES6+)

## Future Improvements

* Add authentication and user roles.
* Improve error handling on the frontend.
* Connect to a real database instead of in-memory or file-based storage.
* Add tests for both frontend and backend components.
* Deploy to a cloud platform.

---

## Citations

* Node application based on:

  * Date: 12/02/2024
  * Source: CS 340 nodejs starter app
  * URL: [https://github.com/osu-cs340-ecampus/nodejs-starter-app](https://github.com/osu-cs340-ecampus/nodejs-starter-app)

* Navigation bar copied from:

  * Date: 12/02/2024
  * Source: Bootstrap documentation
  * URL: [https://getbootstrap.com/docs/5.3/components/navbar/](https://getbootstrap.com/docs/5.3/components/navbar/)
