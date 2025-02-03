# 📓 NoteSync Backend

Welcome to the NoteSync Backend repository! This project provides the backend API endpoints for the NoteSync application, enabling seamless synchronization of notes across multiple devices.

## 📋 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Demo](#demo)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## 📖 Introduction

The NoteSync Backend is a RESTful API built to handle the creation, retrieval, updating, and deletion of notes. It serves as the backbone for the NoteSync application, ensuring that users' notes are always up-to-date and accessible from any device.

## ✨ Features

- **Create Notes**: Add new notes with ease.
- **Retrieve Notes**: Access your notes from anywhere.
- **Update Notes**: Modify existing notes.
- **Delete Notes**: Remove notes that are no longer needed.
- **User Authentication**: Secure user authentication and authorization.
- **Synchronization**: Real-time synchronization of notes across devices.

## 🛠️ Installation

To get started with the NoteSync Backend, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/tanishkagupta2207/NoteSync_Backend.git
    cd NoteSync-Backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary environment variables:
    ```env
    REACT_APP_DB_URL=your_database_url
    REACT_APP_JWT_SECRET=your_jwt_secret
    ```

4. **Run the server:**
    ```bash
    node index.js
    ```

## 🚀 Usage

Once the server is running, you can access the API endpoints at `http://localhost:5000`. Use tools like Postman or cURL to interact with the API.

## 📡 API Endpoints

Here are some of the key API endpoints available:

- **POST /api/auth/createUser**: Register a new user.
- **POST /api/auth/login**: Authenticate a user and obtain a token.
- **POST /api/auth/getUser**: Retrieve a user Details.
- **POST /api/notes/addNote**: Create a new note.
- **GET /api/notes/fetchAllNotes**: Retrieve all notes.
- **PUT /api/notes/updateNote/:id**: Update a specific note by ID.
- **DELETE /api/notes/deleteNote/:id**: Delete a specific note by ID.

## 🎥 Demo

Check out our live demo [here](#).

## 🤝 Contributing

We welcome contributions to the NoteSync Backend project! If you have any ideas, bug reports, or pull requests, please feel free to submit them. Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## 🙏 Acknowledgements

- **MongoDB Atlas** for providing the database hosting.
- **React** for the awesome library.
- **Bootstrap** for the responsive design framework.
- **CodeWithHarry** for the helpful tutorials and guidance.

Happy Coding! 🎉