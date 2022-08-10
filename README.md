# surge-internship-assignment
## This Project is a Simple Note Management system using MERN stack.

1.This project has two user roles Admin and Student.
2.Admin can create new users in to the system by providing only email and account type(admin or student) but if admin want to add additional data he can add those data.
3.After creating a user system send a email to user with email, temporary password and the login link.
4.When user logged in to the system first time using that credentials system asks for register(fill user information) and create a new password.
5.After registering system will redirect to the login page and user can logged in to the system using new password.
6.Admin can view all users in a pagination list and search using name, id, email.
7.Admin can view specific user information in a popup.
8.Student can create, delete, update, view notes belongs to them.
9.Student can view all notes belongs to them in a pagination list and search using title.
10.Notes has title and description.

## Sample Login Details

### Admin

1. name = John , email = john@doe.com , password = 123@Testing
2. name = Michael , email = Michael@Walker.com , password = 123@Testing

## Getting Started

To run project follow these simple example steps.

### Start Using Docker

1. Go to the root folder

2. Start Docker image
   ```sh
   docker-compose up
   ```

3. View frontend in the browser

   Defualt (http://localhost:3000) or in the terminal , a link will desplay to the frontend.


### Add Admins Seeds to the Database

1. Go to the backend folder
   ```sh
   cd backend
   ```

2. Run seeds.js file
   ```sh
   npm run seed
   ```

### Start Without Using Docker

#### Backend side

1. Go to backend folder
   ```sh
   cd backend
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Start the server
   ```sh
   npm start
   ```

#### Frontend side

1. Go to backend folder
   ```sh
   cd frontend
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Start the server
   ```sh
   npm start
   ```
4. View frontend in the browser

   Defualt (http://localhost:3000) or in the terminal , a link will desplay to the frontend.
