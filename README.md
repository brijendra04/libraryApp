# E-Library Web Application

Welcome to the **E-Library Web Application**! This project is designed to provide users with a seamless and intuitive platform for accessing, searching, and managing a vast collection of reading materials.

---

## Features

### 1. User Authentication
- Secure and personalized access for all users.
- Sign-up, login, and logout functionalities.

### 2. Advanced Search and Filter
- Search for books and resources by title, author, or category.
- Filter results by genre, publication year, and more.

### 3. Theme Customization
- Toggle between light and dark modes for a personalized reading experience.

### 4. Email Subscription
- Subscribe via email to receive updates and newsletters.
- Prevents duplicate subscriptions with backend validation.

---

## Technologies Used

### Frontend
- React.js
- HTML5 & CSS3
- JavaScript (ES6+)

### Backend
- Node.js with Express.js
- MongoDB for database management

### Additional Tools
- Postman for API testing
- GitHub for version control

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v14 or later)
- npm (Node Package Manager)
- MongoDB (local or cloud-based)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/brijendra04/libraryApp.git
   cd Frontend
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the MongoDB database:
   - Start your MongoDB server.
   - Update the database connection string in the backend (`server.js`).

4. Run the application:
   - Start the backend server:
     ```bash
     node run start
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## Project Structure
```
.
├── frontend
│   ├── public
│   └── src
│       ├── components
│       │   ├── About.jsx
│       │   ├── Subscribe.jsx
│       └── App.js
├── backend
│   ├── models
│   │   └── Subscription.js
│   ├── routes
│   │   └── subscribe.js
│   └── server.js
└── README.md
```

---

## API Endpoints

### 1. Subscribe Endpoint
**POST** `/api/subscribe`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Responses:**
- **201:** Subscription successful.
- **400:** Invalid email or duplicate subscription.
- **500:** Internal server error.

---

## Contribution Guidelines
We welcome contributions from the community! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your branch.
4. Open a pull request describing your changes.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact
For any queries or issues, feel free to reach out:
- **Email:** brijendra.developer@gmail.com
- **LinkedIn:** [Brijendra's LinkedIn](https://www.linkedin.com/in/brijendra30/)
- **GitHub:** [Brijendra's GitHub](https://github.com/brijendra04)

---

Thank you for exploring the E-Library Web Application! Happy reading! 📚

