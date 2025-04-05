---

# 👨‍💼 Employee Management Web Application

## 📌 Overview  
The **Employee Management Web Application** is a secure, responsive platform developed to streamline employee data handling for administrators. It supports complete **CRUD operations** (Create, Read, Update, Delete) and integrates user authentication to ensure data integrity and access control.

> 🚀 Built during my internship at **Prodigy InfoTech**, this project sharpened my full-stack development skills and provided real-world exposure to backend logic, database integration, and user-centric design.

---

## ✨ Features

- 🔐 **User Authentication**  
  Secure login system with **password hashing** and **session management** using `bcryptjs` and `express-session`.

- 📄 **Employee CRUD Operations**  
  - **Create**: Add new employee records.  
  - **Read**: View all employees or search by name, email, or department.  
  - **Update**: Modify employee details quickly.  
  - **Delete**: Remove records safely with confirmation.

- 🔎 **Data Validation**  
  Prevents duplicate entries using checks on **email** and **phone numbers**.

- 📱 **Responsive Design**  
  Optimized for desktops, tablets, and mobile devices using EJS templates and modern styling.

- 🔔 **Alerts & Notifications**  
  Real-time flash messages for user feedback on login, actions, and errors.

---

## 🧰 Tech Stack

| Layer       | Technology                |
|-------------|---------------------------|
| **Frontend** | HTML, CSS, EJS             |
| **Backend**  | Node.js, Express.js        |
| **Database** | MySQL                      |
| **Middleware** | body-parser, CORS, express-session |

---

## ⚙️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Antony-Ouseppachan/PRODIGY_FS_02.git
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd employee-management-app
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Configure MySQL Database**
   - Create two databases:
     - `employee`
     - `user_auth`
   - Inside `employee`, create a table named `employees` with appropriate columns like `id`, `name`, `email`, `phone`, `department`, etc.
   - In `user_auth`, ensure a `users` table exists to store login credentials.

5. **Update Database Connection in `server.js`**
   ```js
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

6. **Start the Application**
   ```bash
   npm start
   ```

7. **Access in Browser**
   Open `http://localhost:5000` in your web browser.

---

## 🧪 Usage

- **Login** with valid admin credentials stored in the database.
  > ⚠️ _Note: Registration is not enabled since this app is designed for internal administrative use only._

- Once logged in, use the interface to:
  - Add a new employee
  - Search for specific employees
  - Edit or delete employee records
  - Log out securely

---

## 📜 License  
This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for more details.

---

## 🙏 Acknowledgments

- Special thanks to **Prodigy InfoTech** for providing a supportive internship experience and the opportunity to work on real-world projects.
- Gratitude to the **open-source community** for the tools and resources that made this project possible.

---
