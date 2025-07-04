# CampusJunction

CampusJunction is a web application for college students to buy and sell products online. It facilitates various services such as buying and selling projects, hiring tutors, and lost and found services.

## Features

- User Registration and Authentication
- Email Verification
- Buy and Sell Products
- Hire Tutors
- Lost and Found Services

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance running
- Git installed

### Backend Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/LokeshVrma/CampusJunction.git
    cd backend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` file** in the root directory and add the following variables:
    ```env
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_SERVICE=gmail
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_password
    CLOUDINARY_CLOUD_NAME=secret
    CLOUDINARY_API_KEY=secret
    CLOUDINARY_API_SECRET=secret
    ```

4. **Run the backend server**:
    ```sh
    cd backend && node --watch app.js
    ```

### Frontend Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/LokeshVrma/CampusJunction.git
    cd frontend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` file** in the root directory and add the following variable:
    ```env
    REACT_APP_API_BASE_URL=http://localhost:5000
    ```

4. **Run the frontend development server**:
    ```sh
    npm start
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries or support, please contact us at campusjunction73@gmail.com.
