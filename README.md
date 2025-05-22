# Dunder Mifflin Inventory & Sales Management App

A full-stack CRUD web application for managing Dunder Mifflin’s internal operations, including branches, employees, customers, invoices, and products.

## Tech Stack

**Frontend**

* HTML, CSS, JavaScript
* Bootstrap 5 for responsive design
* Handlebars.js for templating
* AJAX (Vanilla JavaScript / XMLHttpRequest)

**Backend**

* Node.js with Express.js
* MySQL database
* REST-like routing and logic for all entities
* Environment variables for secure DB configuration

## Features

* Full CRUD functionality for:

  * Branches
  * Employees
  * Customers
  * Departments
  * Invoices
  * Invoice Items (junction table)
  * Products
* Dynamic table updates using AJAX
* Modularized structure for scalable development
* Clean UI with responsive styling
* Inline deletion and form-based record creation

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/dunder-mifflin-app.git
   cd dunder-mifflin-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up the Database**

   * Create a MySQL database using the schema in `/db/schema.sql`
   * Populate it with seed data from `/db/sample_data.sql`

4. **Configure Environment Variables**
   Create a `.env` file:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=dunder_mifflin
   ```

5. **Start the App**

   ```bash
   node app.js
   ```

   Visit `http://localhost:3000` in your browser.

---

## CRUD Examples

### Branches

* **Read**: Displayed in a table using Handlebars.
* **Create**: AJAX form sends a POST request to `/add-branch-ajax`.
* **Delete**: Inline "Delete" button triggers an AJAX call to remove a branch.
* **Update**: (If implemented) handled via a modal or inline edit form.

### add\_branch.js

Handles the "Add Branch" form submission. Submits data via AJAX to the backend and updates the DOM by adding a new table row without refreshing the page.

### delete\_branch.js

Handles delete actions via `onclick` handlers in the table. Sends a DELETE request to remove the branch and updates the page accordingly.

---

## Folder Structure

```
.
├── app.js
├── /db
│   ├── schema.sql
│   ├── sample_data.sql
├── /public
│   ├── /css
│   ├── /js
│   │   ├── add_branch.js
│   │   ├── delete_branch.js
│   │   └── ...
├── /views
│   ├── /layouts
│   ├── branches.hbs
│   └── ...
├── /routes
│   ├── branches.js
│   └── ...
├── /models
│   ├── db-connector.js
│   └── ...
├── package.json
└── README.md
```

---

## Credits

* Based on the [OSU CS 340 Node.js Starter App](https://github.com/osu-cs340-ecampus/nodejs-starter-app)
* Built as a school project for Oregon State University

---
