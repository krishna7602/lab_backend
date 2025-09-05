# Bio Lab Website Backend

This is the backend API for the Bio Lab Website of **NIT Jalandhar**, developed with **Node.js**, **Express**, and **MongoDB**. It provides endpoints to manage users, admin, publications, people (students/faculty), announcements, and useful links.  

---

## Table of Contents

- [Features](#features)  
- [Technologies](#technologies)  
- [Setup Instructions](#setup-instructions)  
- [API Endpoints](#api-endpoints)  
- [Testing](#testing)  
- [Contribution Guidelines](#contribution-guidelines)  

---

## Features

- **Admin authentication:** Superadmin/editor roles with JWT-based auth.  
- **User management:** Register, login, logout, change email/password.  
- **People management:** Add/delete PhD Scholars, M.Tech Students, faculty.  
- **Publications:** Add, delete publications.  
- **Announcements:** Add/delete important and normal announcements.  
- **Useful Links:** Add/delete external resource links.  
- **Secure file uploads:** Avatar and cover images uploaded to Cloudinary.  

---

## Technologies

- Node.js  
- Express.js  
- MongoDB & Mongoose  
- JWT for authentication  
- Cloudinary for image storage  
- Multer for file uploads  

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/Bio_lab.git
cd Bio_lab

2. Install dependencies

npm install

Create .env file in the root directory with the following variables:

PORT=5000
MONGO_URI=<Your MongoDB URI>
ACCESS_TOKEN_SECRET=<Your access token secret>
REFRESH_TOKEN_SECRET=<Your refresh token secret>
CLOUDINARY_CLOUD_NAME=<Cloudinary cloud name>
CLOUDINARY_API_KEY=<Cloudinary API key>
CLOUDINARY_API_SECRET=<Cloudinary API secret>


Run the server

npm run dev


Server will run at http://localhost:5000.

API Endpoints
Admin
Method	Endpoint	Description
POST	/api/v1/admin/register	Register a new admin
POST	/api/v1/admin/login	Login as admin
POST	/api/v1/admin/logout	Logout admin
Users
Method	Endpoint	Description
POST	/api/v1/users/register	Register a new user
POST	/api/v1/users/login	User login
POST	/api/v1/users/logout	Logout user
People
Method	Endpoint	Description
POST	/api/v1/people/addstudent	Add PhD/M.Tech/Other
POST	/api/v1/people/deletestudent/:id	Delete student by ID
Publications
Method	Endpoint	Description
POST	/api/v1/publications/add	Add a publication
POST	/api/v1/publications/delete/:id	Delete publication by ID
Announcements
Method	Endpoint	Description
POST	/api/v1/announcements/add	Add an announcement
POST	/api/v1/announcements/delete/:id	Delete announcement by ID
Useful Links
Method	Endpoint	Description
POST	/api/v1/usefullinks/addlink	Add a link
POST	/api/v1/usefullinks/deletelink/:id	Delete link by ID

Note: All POST endpoints require admin JWT token in Authorization: Bearer <token> header.

Testing

Use Postman or Insomnia for testing API endpoints.

Sample JSON for adding a person:
{
  "name": "John Doe",
  "role": "PhD Scholar",
  "category": "PhD Scholar",
  "bio": "Research in Bioinformatics",
  "imageUrl": "https://example.com/avatar.jpg",
  "email": "john.doe@example.com",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe"
  }
}

Sample JSON for adding a publication:
{
  "title": "Paper A: Fast alignment",
  "authors": "R. Mondal et al.",
  "journal": "Bioinformatics",
  "year": 2024,
  "description": "A fast alignment algorithm for large-scale genomic data",
  "link": "https://example.com/paperA"
}

Sample JSON for adding an announcement:
{
  "title": "5th International Conference on Bioenergy",
  "date": "6th - 9th October 2025",
  "link": "https://icrabr.com/",
  "important": true
}

Sample JSON for adding a useful link:
{
  "name": "Ministry of New and Renewable Energy",
  "url": "https://mnre.gov.in/",
  "category": "Government"
}

Contribution Guidelines

Fork the repository and create your branch:

git checkout -b feature/<feature-name>


Make your changes and commit:

git commit -m "Add <feature-name>"
