#RedVision Technology Task

##Installation guide

###1. Clone the Repository

To get started, clone the repository using the following command:


```bash
    git clone https://github.com/mohdrehanrq0/redvision-task-frontend.git
```

##2. Install Dependencies and Start the Application

Navigate to the redvision-task-frontend folder in your terminal and run the following commands:

```bash
npm i
npm run dev
```

The application will be running at `http://localhost:3000`

##Feture

This application includes a role-based authorization system. Users can have one of two roles: `admin` or `user`.

Note: By default, a newly registered user is assigned the user role. The `admin` role can be assigned via MongoDB Compass due to time constraints that prevented the creation of an `admin` authorization screen.

##User Features

* **User Authentication:** Users can register and log in to the application.
* **Home Page:** The home page displays the latest blogs.
* **Session Management:** Once logged in, the user's access token is stored in cookies for 90 days.
* **Enhanced UX:** Toast notifications are implemented for better user experience.
* **Blog Viewing:** Clicking on a blog will redirect the user to a detailed blog page, accessible via a slug-based URL.