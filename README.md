# MindMesh

MindMesh is a feature-rich full-stack video conferencing application that facilitates real-time communication through high-quality video, audio, and chat capabilities. Built with the MERN stack and WebRTC, it offers a seamless and secure virtual meeting experience similar to Zoom.

## 🚀 Features

- **Real-time Video & Audio Calls**: Low-latency communication using WebRTC and Socket.io.
- **Secure Authentication**: User registration and login system protected with authentication.
- **Meeting History**: Track past meetings and call logs.
- **Chat During Calls**: Real-time messaging functionality within the video meeting interface.
- **Screen Sharing**: Ability to share your screen with other participants.
- **Responsive Design**: Built with Material UI for a polished, mobile-friendly interface.
- **Multiple Participants**: Support for multi-user video conferencing.

## 🛠️ Tech Stack

### Frontend
- **React**: Dynamic user interface construction.
- **Material UI (MUI)**: Modern and responsive component library.
- **Socket.io Client**: Real-time event-based communication.

### Backend
- **Node.js & Express**: Robust server-side runtime and framework.
- **MongoDB & Mongoose**: NoSQL database for flexible data storage.
- **Socket.io**: Real-time bidirectional data transfer.
- **WebRTC**: Native implementation for peer-to-peer media streaming.
- **Bcrypt**: Password hashing for security.

## ⚙️ Installation & Setup

Follow these steps to get a local copy up and running.

### Prerequisites
- Node.js installed on your machine.
- MongoDB installed or a MongoDB Atlas connection string.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/MindMesh.git
cd MindMesh
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

**Environment Configuration:**
Ensure you have a `.env` file in the `backend/` directory with the following variable:
```env
MONGO_URL=your_mongodb_connection_string
PORT=8000
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd ../frontend
npm install
```

Start the frontend application:
```bash
npm start
```

## 📖 Usage
1. Open your browser and go to `http://localhost:3000`.
2. Register or Login to your account.
3. Start a new meeting to generate a unique meeting URL.
4. Share the URL with others to join the conference.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
