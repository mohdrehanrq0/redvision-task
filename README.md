# Frontend Task

## Installation guide

### 1. Clone the Repository

To get started, clone the repository using the following command:

```bash
    git clone https://github.com/mohdrehanrq0/redvision-task-frontend.git
```

## 2. Install Dependencies and Start the Application

Navigate to the redvision-task-frontend folder in your terminal and run the following commands:

**Note:** Go to `/utils/httpClient.ts` and uncomment line 4 i.e `const BASE_URL = "http://localhost:4000/api/v1/";` and comment line 5 i.e `const BASE_URL = "https://redvision-task-backend-production.up.railway.app/api/v1/";` because this URL is deployed url.

```bash
npm i
npm run dev
```

The application will be running at `http://localhost:3000`

## Feture

This application includes a role-based authorization system. Users can have one of two roles: `admin` or `user`.

**Note:** By default, a newly registered user is assigned the user role. The `admin` role can be assigned via MongoDB Compass due to time constraints that prevented the creation of an `admin` authorization screen.

## User Features

* **User Authentication:** Users can register, login and logout to the application.
* **Home Page:** The home page displays the latest blogs.
* **Session Management:** Once logged in, the user's access token is stored in cookies for 90 days.
* **Enhanced UX:** Toast notifications are implemented for better user experience.
* **Blog Viewing:** Clicking on a blog will redirect the user to a detailed blog page, accessible via a slug-based URL.
* **State Management:** Global context is used with useContext and useReducer hooks to manage user data when logged in.
* **API Management:** The application uses an httpClient file that contains Axios interceptor code for better API call management, token handling, and error management.

## Admin Features

* **All User Features:** The admin has access to all features available to regular users.
* **Blog Management:** The admin can add and delete blogs using a form within the application.
