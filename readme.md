# 🚀 Else AI

    An AI-Powered Web Application (Gemini-like Experience)

   




# ✨ Overview

Else AI is a modern AI-powered web application inspired by Gemini.
It provides intelligent text and image-based responses using a scalable React + FastAPI architecture and integrates multiple AI and cloud services.

The project is designed with clean architecture, async operations, and production-ready practices.

# 🧠 Key Features

 - ⚛️ Modern React UI with TypeScript

 - ⚡ FastAPI backend with async APIs

 - 🧠 AI-powered text & image responses

 - ☁️ Cloudinary integration for media uploads

 - ✂️ ClipDrop integration for image processing

 - 🔗 External Graph API for AI intelligence

 - 🔄 Smooth frontend–backend communication

 - 🎨 Responsive and clean UI

 
# 🏗️ Tech Stack


## Frontend

 - React.js

 - TypeScript

 - Vite

 - Tailwind CSS

 - Axios

 - React Router

 - Radix UI

 - React Hot Toast

## Backend

 - FastAPI

 - SQLAlchemy

 - Pydantic

 - Uvicorn

 - Python-dotenv

 - Passlib & Argon2 (security)

 - Integrations

 - Cloudinary

 - ClipDrop

 - Groq API (AI)

 - ClipDrop API



# 📁 Project Structure

```

else-ai/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md

```

# ⚙️ Installation & Setup

### 🔹 Prerequisites

   - Node.js (v18+ recommended)

- Python (v3.10+)

 #    Git

# 🖥️ Frontend Setup

```

cd frontend
npm install
npm run dev

```


# 📍 App will run on:

```

http://localhost:5173

```

# 🛠️ Backend Setup


### Create Virtual Environment

```

cd backend
python -m venv venv

```

### Activate Virtual Environment

### Windows

```

venv\Scripts\activate

```

# Mac / Linux

```

source venv/bin/activate

```

# Install Dependencies

```

pip install -r requirements.txt

```

# Run Server

```

uvicorn app.main:app --reload

```


# 📍 API will run on:

```

http://localhost:8081

```

# 📍 Swagger Docs:

```

http://localhost:8081/docs

```

# 🔐 Environment Variables

Create a .env file in the backend directory:

```

CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name

CLIPDROP_API_KEY=your_clipdrop_key
GRAPH_API_KEY=your_graph_api_key

```




# 👨‍💻 My Contribution

 - Designed frontend UI using React & TypeScript

 - Built FastAPI backend with async APIs

 - Integrated AI and cloud services

 - Handled media upload & processing

 - Managed full frontend–backend communication

 - Followed clean architecture principles

# 🚀 Future Enhancements


 - Streaming AI responses

 - User chat history dashboard

 - Caching & performance optimization

 - Deployment using Docker & CI/CD

# 🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

Developed by:  Sai Chaitanya Koduri
Trumio Email Id: SaiChaitanya.Kodur@ust.trumio.ai
Ust Email id: 304506@ust.com
