# Dunder Mifflin Database Management System

## Overview

**Dunder Mifflin** is a mid-size paper supply company headquartered in New York, NY, with thirteen regional branches spread across the North-Eastern US and 300 employees. The company serves a total of about 5,000 clients at any given time. It is a publicly traded company that brings in an average of \$48 million in revenue each year, with a profit margin of 3%.

Facing competition from large national chains like Staples and Office Depot, Dunder Mifflin needs a functional and responsive database management system in order to streamline processes. This system will be used to manage each Branch’s Employees, Departments, Customers, Products, and Invoices, and will allow for efficient data entry by employees. Dunder Mifflin hopes this system will increase profit margins by allowing employees to spend more time building customer relationships and less time on data entry.

---

## Features

* Manage Branches, Employees, Departments, Customers, Products, and Invoices
* Responsive user interface for efficient data entry
* CRUD (Create, Read, Update, Delete) operations for all key entities
* Role-based data access (if implemented)
* Search and filter capabilities to quickly locate records
* Data validation to reduce input errors
* Consistent design using Bootstrap for usability and responsiveness

---

## Installation

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dunder-mifflin-dbms.git
   cd dunder-mifflin-dbms/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables in `.env` (database URL, ports, etc).

4. Run the server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the React development server:

   ```bash
   npm start
   ```

---

## Usage

* Open your browser and go to `http://localhost:3000` (or the port configured in your React app).
* Use the navigation bar to access Branches, Employees, Departments, Customers, Products, and Invoices.
* Use forms to add, edit, or delete records.
* Utilize search/filter features to find specific data quickly.
* The system updates the database in real-time through API calls to the Express backend.

---

## Technologies Used

* **Frontend:** React, React Router, Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** (Your DBMS here, e.g., MySQL, PostgreSQL, MongoDB)
* **Other:** Axios or Fetch API for HTTP requests

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Citations

* **Node application**
  Date: 12/02/2024
  Based on: CS 340 Node.js Starter App
  Source: [https://github.com/osu-cs340-ecampus/nodejs-starter-app](https://github.com/osu-cs340-ecampus/nodejs-starter-app)

* **Navigation Bar**
  Date: 12/02/2024
  Copied from: Bootstrap documentation
  Source: [https://getbootstrap.com/docs/5.3/components/navbar/](https://getbootstrap.com/docs/5.3/components/navbar/)

---
