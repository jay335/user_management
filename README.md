This project is a User Management System implemented as part of a Laravel interview assignment. The application demonstrates the integration of Laravel for backend API services and React for the frontend. It adheres to industry-standard design patterns such as DAO (Data Access Object), BO (Business Object), and Service Layer while implementing caching and validations

Objective
To design and implement a User Management System that allows creating, updating, deleting, and retrieving user records while incorporating robust validations, efficient caching, and a modular architecture.

Technologies Used
Frontend
Framework: React
State Management: React Hooks
Styling: CSS (modular styling for components)
Hosting: Netlify
Framework: Laravel
Database: MySQL
Caching: Laravel Cache (file-based)
Validation: Laravel Form Requests
API Testing: Postman
Features
CRUD Operations:

Create, Read, Update, and Delete users.
Validation rules applied to ensure data integrity.
Modular Architecture:

DAO: Handles direct database interactions.
BO: Encapsulates business logic.
Service Layer: Bridges controllers and BO for clean code structure.
Controllers: Handles HTTP requests and returns responses.
Validation:

Applied at the request level using Laravel Form Request.
Ensures fields like email and password meet requirements.
Unique email validation while updating user records.
Caching:

Uses Laravel's caching mechanism for optimized performance.
Reduces redundant database queries by storing user data in cache.
Cache invalidation implemented for user updates and deletions.
Frontend Features:

User-friendly interface.
Responsive design.
Properly styled tables for displaying user data.
Pop-up notifications for success messages.
API Endpoints
Base URL
http://localhost:8001/api

Endpoints
HTTP Method	Endpoint	Description
GET	        /users	    Retrieve all users
POST	    /users	    Create a new user
GET	       /users/{id}	Retrieve a single user
PUT	       /users/{id}	Update an existing user
DELETE	   /users/{id}	Delete an existing user

Frontend Pages
1. All Users
Displays a table of all users, including name, email, created_at, and updated_at.
Includes buttons for editing and deleting users.
A button to navigate to the "Create User" page.
2. Create User
A form for creating new users.
Validation for fields:
Name: Required
Email: Required and unique
Password: Required with a minimum length of 8 characters.
3. Edit User
Pre-filled form for updating an existing user's details.
Email validation ignores the current user’s email during updates.

Data Caching:
User data is cached using Cache::remember to optimize performance.
Cache Invalidation:
Cache is cleared automatically on user creation, update, or deletion





