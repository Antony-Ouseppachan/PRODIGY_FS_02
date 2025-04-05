# Employee Management Web Application

## Overview
The Employee Management Web Application is a robust platform designed for administrators to efficiently manage employee records. This application allows for the execution of CRUD (Create, Read, Update, Delete) operations on employee data while ensuring secure access through authentication mechanisms.

## Features
- **User  Authentication**: Secure login system with password hashing and session management.
- **CRUD Operations**:
  - **Create**: Add new employee records.
  - **Read**: View all employee records or search for specific employees.
  - **Update**: Modify existing employee records.
  - **Delete**: Remove employee records.
- **Data Validation**: Checks for existing email addresses and phone numbers to prevent duplicates.
- **Responsive Design**: User-friendly interface accessible across various devices.
- **Alerts and Notifications**: Flash messages for user feedback on operations.

## Technology Stack
- **Frontend**: HTML, CSS, EJS
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Middleware**: Body-parser, CORS, Express-session

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Antony-Ouseppachan/PRODIGY_FS_02.git
   ```
2. Navigate to the project directory:
   ```bash
   cd employee-management-app
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Set up your MySQL database:
   - Create two databases: `employee` and `user_auth`.
   - Ensure the `employees` table is created in the `employee` database.
5. Update the database connection details in `server.js`:
   ```javascript
   const dbEmployee = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "your_mysql_password",
       database: "employee"
   });

   const dbAuth = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'your_mysql_password',
       database: 'user_auth'
   });
   ```
6. Start the server:
   ```bash
   npm start
   ```
7. Open your browser and navigate to `http://localhost:5000`.

## Usage
- Access the application through the browser.
- Use the login page to authenticate as an administrator[Note:You must have your credentials stored in the database to log in, as the website does not support registration for outsiders since it is not a commercial platform].
- Perform CRUD operations on employee records from the landing page.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to the contributors and the open-source community for their support and resources.

---

Feel free to customize the README file with your specific repository details, such as the repository link, your name, and any additional information relevant to your project!
