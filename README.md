# Chat-App

A full-stack real-time communication platform built with React, Express, MongoDB, Stream Chat, and Stream Video.

## Features

### Authentication

* User Registration
* User Login
* Secure JWT Authentication
* HTTP-only Cookies
* Protected Routes
* User Logout

### User Onboarding

* Profile Creation
* Bio Setup
* Country Selection
* Native Language Selection
* Learning Language Selection

### Social Features

* User Recommendations
* Friend Requests
* Accept Friend Requests
* Friends List
* Notifications

### Real-Time Messaging

* One-to-One Chat
* Stream Chat Integration
* Real-Time Message Delivery
* Persistent Chat Channels

### Video Calling

* One-to-One Video Calls
* Camera Controls
* Microphone Controls
* Stream Video Integration

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* DaisyUI
* React Hot Toast
* Stream Chat React SDK
* Stream Video React SDK

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser
* Stream Chat API

---

## Project Structure

```text
Chat-App/
│
├── backend/
│   ├── src/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   ├── Models/
│   │   ├── Routes/
│   │   ├── lib/
│   │   └── Server.js
│   │
│   └── package.json
│
├── frontend/
│   └── Chat/
│       ├── src/
│       │   ├── Pages/
│       │   ├── Components/
│       │   ├── Context/
│       │   └── lib/
│       │
│       └── package.json
│
└── README.md
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5001

MONGO_URI=your_mongodb_connection_string

JWT_SECRET_KEY=your_jwt_secret

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

NODE_ENV=development
```

### Frontend (.env)

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/ShakthiKondamoni/Chat-App.git

cd Chat-App
```

---

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

Server runs on:

```text
http://localhost:5001
```

---

### Frontend Setup

```bash
cd frontend/Chat

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/signup

POST /api/auth/login

POST /api/auth/logout

POST /api/auth/onboard

GET /api/auth/me
```

### Users

```http
GET /api/users

GET /api/users/friends

POST /api/users/Friend-requests/:id

PUT /api/users/Friend-requests/:id/accept

GET /api/users/Friend-requests

GET /api/users/outgoing-friend-requests
```

### Chat

```http
GET /api/chat/token
```

### Video

```http
GET /api/video/token
```

---

## Future Improvements

* Group Chats
* Group Video Calls
* Online / Offline Presence
* Typing Indicators
* Read Receipts
* Call Notifications
* Screen Sharing
* Message Reactions
* File Sharing
* Voice Messages

---

## Screenshots

Add screenshots of:

* Login Page
* Signup Page
* Home Page
* Chat Interface
* Video Call Interface

---

## Author

**Kondamoni Shakthi**

* GitHub: https://github.com/ShakthiKondamoni
* LinkedIn: https://www.linkedin.com/in/kondamoni-shakthi/

---


