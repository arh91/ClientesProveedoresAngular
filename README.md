<h1 align="center">Welcome to ClientesProveedoresAngular 👋</h1>
<p>
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img alt="License: MIT " src="https://img.shields.io/badge/License-MIT -yellow.svg" />
  </a>
</p>

## Description
Project built with Angular 17.3 that works with a local SQLite database to store customer and supplier information for a company, 
and a server to handle CRUD operations with that database.

## Features
- Customer Management: Add, update, view, and delete customer data.
- Supplier Management:** Add, update, view, and delete supplier information.
- CRUD Operations: All data is stored and managed in a local SQLite database.
- User Interface: Built using Angular for a dynamic and responsive web application.
- Backend: A Node.js server handling database operations and API requests.


## Prerequisites
To run this project, you will need to have the following installed:

- Node.js (version 14 or later)
- npm (Node Package Manager)
- Angular CLI (for development purposes)
- SQLite (for the local database)


## Setup

### 1. Clone the Repository

```sh
git clone https://github.com/arh91/ClientesProveedoresAngular.git
```

### 2. Install dependencies for both frontend and backend

- Install dependencies for the Angular frontend:

```sh
cd frontend
npm install
```

- Install dependencies for the Node.js backend:
  
 ```sh
 cd ../backend
 npm install
 ```

### 3. Configure SQLite Database
Make sure your SQLite database is correctly set up in the backend directory. 
You may need to create a database file (if not provided) and set up tables for customers and suppliers.

### 4. Run the application

To start the Angular application, run:
```sh
npm start
```

### 5. Access the Application
Once both the backend and frontend are running, open your browser and navigate to http://localhost:4200 to start managing clients and suppliers.


## Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.


## Code scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.


## Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.


## Running unit tests
Run ng test to execute the unit tests via Karma.


## Running end-to-end tests
Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


## Usage
You can perform the following operations on the client and supplier data:

- Create: Add new client or supplier records.
- Read: View the list of existing clients and suppliers.
- Update: Edit details of clients or suppliers.
- Delete: Remove client or supplier records.


## Technologies used
- Frontend: Angular (for the user interface)
- Backend: Node.js with Express
- Database: SQLite (local database for storing client and supplier data)


## Author

👤 **arh91**


## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />
Feel free to check [issues page](https://github.com/arh91/Gestion-Usuarios-Backend/issues). 


## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

This project is [MIT ](https://opensource.org/licenses/MIT) licensed.




