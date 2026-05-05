# 🌳 Nested Tag Tree Web App

A full-stack web application that allows users to create, edit, and manage a recursive nested tag tree structure with dynamic UI updates and backend persistence.

---

## 🔗 GitHub Repository
👉https://github.com/Sayantan0007/Ai-Monk_labs-project

---

## ✨ Features

- 🔁 Recursive nested tree rendering
- ➕ Add child nodes dynamically
- 🔄 Auto-convert `data → children` when adding child
- 📝 Editable tag name (press Enter to save)
- ✏️ Editable data fields
- 🔽 Collapse / Expand any node (recursive)
- 📤 Export tree as clean JSON
- 💾 Save & update tree via backend API
- 📥 Load saved trees from database

---

## 🧠 Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- FastAPI (Python)
- SQLAlchemy

### Database
- MySQL

---

## 🏗️ Project Structure
Ai-monk-lab/
├── client/ui-aimonk # React frontend
├── server # FastAPI backend
├── screenshots # UI images
├── README.md
└── .gitignore

---

## ⚙️ Setup Instructions

### 🔹 Backend

cd server  
python -m venv venv  
venv\Scripts\activate  
pip install -r requirements.txt  
uvicorn main:app --reload  

---

### 🔹 Frontend

cd client/ui-aimonk  
npm install  
npm start  

---

## 📡 API Endpoints

| Method | Endpoint        | Description            |
|--------|----------------|------------------------|
| GET    | /trees         | Fetch all trees        |
| POST   | /trees         | Save new tree          |
| PUT    | /trees/{id}    | Update existing tree   |

---

## 📸 Screenshots

<img width="1849" height="886" alt="image" src="https://github.com/user-attachments/assets/3801ea08-ef51-479b-b04d-60f2e326b375" />
<img width="1898" height="895" alt="image" src="https://github.com/user-attachments/assets/258d6c66-8b0b-499c-bb6f-2859f89ced97" />
<img width="1898" height="895" alt="image" src="https://github.com/user-attachments/assets/bc0d7fc3-f568-498f-ab71-e0425cc4f9f9" />




---

## 🧠 Key Implementation Details

- Recursive component (`TagView`) used for rendering nested structure
- State is managed using controlled updates
- Clean JSON export logic implemented
- Backend stores tree as JSON format

---

## 🙌 Author

Sayantan Mondal
https://github.com/Sayantan0007
