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
npm run dev  

---

## 📡 API Endpoints

| Method | Endpoint        | Description            |
|--------|----------------|------------------------|
| GET    | /trees         | Fetch all trees        |
| POST   | /trees         | Save new tree          |
| PUT    | /trees/{id}    | Update existing tree   |

---

## 📸 Screenshots
<img width="1322" height="897" alt="image" src="https://github.com/user-attachments/assets/8342c79a-7c6a-452e-8403-2ce1aa913531" />
<img width="1381" height="781" alt="image" src="https://github.com/user-attachments/assets/0e86bc63-cd6b-40d6-b15d-36538c19798d" />
<img width="1406" height="905" alt="image" src="https://github.com/user-attachments/assets/78819f45-c22e-4ef2-b33c-637e6dd265da" />
<img width="1381" height="781" alt="image" src="https://github.com/user-attachments/assets/5972496b-3e45-443d-ac2c-b9e1ef14e787" />




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
