# Resume Builder – Full Stack Web Application

# Overview

The Resume Builder is a full-stack web application that allows users to create, edit, preview, and manage professional resumes online. The application provides a user-friendly interface for entering resume details and securely stores data using a backend API and database.

This project was built to demonstrate full-stack development skills, including frontend development, backend APIs, authentication, and database integration.

-----------------------------------------------------------------------------------------------------------------

# UI Scope & Feature Availability

This project focuses primarily on the Resume Builder functionality.
Some UI elements (such as landing page navigation links, testimonials interactions, and demo buttons) are part of the template design and are not fully functional by design.

The core functional flow of the application is:

 => User authentication (register / login)
 => Creating, editing, and managing resumes
 => Previewing and downloading resumes

Other UI sections are included for presentation and layout purposes only and may be implemented in future iterations.
----------------------------------------------------------------------------------------------------------------

 # Teck Stack

# Frontend
React (Vite)
JavaScript (ES6)
Tailwind CSS
Axios (API communication)
Redux Toolkit (state management)

# Backend

Node.js
Express.js
MongoDB (with Mongoose)
JWT Authentication
RESTful APIs
Multer (file upload)
ImageKit (image handling)
OpenAI API (AI-powered features)

------------------------------------------------------------------------------------------

# Key Features

User authentication (signup & login)
Create, edit, and save resumes
Multiple resume templates
Real-time resume preview
AI-assisted resume content generation
Image upload for profile pictures
Secure API with JWT authentication
Responsive and clean UI


-------------------------------------------------------------------------------------------

# Frontend Architecture
      
client/                               # Frontend (React + Vite)
└── src/
    ├── app/
    │   ├── features/                  # Redux store & slices
    │   │   └── authSlice.js
    │   └── store.js
    │
    ├── assets/
    │   ├── assets.js                # Images and static assets
    │   ├── dummy_profile.png
    │   ├── favicon.ico
    │   └── logo.svg
    │
    ├── configs/
    │   └── api.js
    │
    ├── components/
    │   ├── home/                      # Landing page components  
    │   │   ├── Banner.jsx
    │   │   ├── CallToAction.jsx
    │   │   ├── Features.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Hero.jsx
    │   │   ├── Testimonial.jsx
    │   │   └── Title.jsx
    │   │
    │   ├── templates/                 # Resume templates
    │   │   ├── ClassicTemplate.jsx
    │   │   ├── MinimalImageTemplate.jsx
    │   │   ├── MinimalTemplate.jsx
    │   │   └── ModernTemplate.jsx
    │   │
    │   ├── ColorPicker.jsx
    │   ├── EducationForm.jsx
    │   ├── ExperienceForm.jsx
    │   ├── Loader.jsx
    │   ├── Navbar.jsx
    │   ├── PersonalInfoForm.jsx
    │   ├── ProfessionalSummaryForm.jsx
    │   ├── ProjectForm.jsx
    │   ├── ResumePreview.jsx
    │   ├── SkillForm.jsx
    │   └── TemplateSelector.jsx
    │
    ├── pages/                     # Application pages
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── Dashboard.jsx
    │   ├── ResumeBuilder.jsx
    │   ├── Preview.jsx
    │   └── Layout.jsx
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css


# Backend Architecture
    server/
├── configs/
│   ├── ai.js               # OpenAI / AI feature configuration
│   ├── db.js               # MongoDB connection setup
│   ├── imageKit.js         # ImageKit configuration
│   └── multer.js           # File upload configuration (Multer)
│
├── controllers/
│   ├── aiController.js     # AI-related request logic
│   ├── resumeController.js # Resume CRUD logic
│   └── userController.js   # Auth + user actions logic
│
├── middlewares/
│   └── authMiddleware.js   # JWT protection middleware
│
├── models/
│   ├── Resume.js           # Resume schema/model
│   └── User.js             # User schema/model
│
├── routes/
│   ├── aiRoutes.js         # AI endpoints
│   ├── resumeRoutes.js     # Resume endpoints
│   └── userRoutes.js       # Auth/user endpoints
│
├── server.js               # Main Express entry point
├── package.json
├── package-lock.json
└── .env                    # Backend environment variables (not committed)


# Backend Flow 

server.js starts the Express app and connects everything

routes/ defines the API endpoints (URLs)

controllers/ contains the actual logic for each endpoint

models/ defines MongoDB data shapes (User, Resume)

middlewares/ protects endpoints using JWT auth

configs/ stores setup files (DB, AI, image upload, etc.)


----------------------------------------------------
Backedn url in AWS =>   http://resume-builder-backend-env.eba-3hzmbfh2.us-east-1.elasticbeanstalk.com/