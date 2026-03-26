# User Directory Dashboard - Frontend Assignment from BuyerForeSight

## Overview

This project is a **User Directory Dashboard** built using a modern frontend framework (React). It fetches user data from a public API and presents it in an interactive and user-friendly interface.

The application allows users to browse, search, sort, and view detailed information about individuals in the directory.

---

## API Used
```
https://jsonplaceholder.typicode.com/users
```
---

## Features

### 1. Dashboard

* Displays a list of users in a **table/grid layout**
* Shows the following user details:

  * Name
  * Email
  * Phone
  * Company

---

### 2. Search Functionality

* Users can search by:

  * Name
  * Email
* Search is implemented on the **client-side**
* Results update dynamically as the user types

---

### 3. Sorting

* Users can sort data by:

  * Name
  * Company
* Supports:

  * Ascending order
  * Descending order

---

### 4. User Detail Page

* Clicking on a user row navigates to a **detail view**
* Displays complete user information, including:

  * Name
  * Username
  * Email
  * Phone
  * Website
  * Address (street, suite, city, zipcode)
  * Company details

---

## Tech Stack

* Framework: React 
* Styling: CSS / Tailwind / Bootstrap (optional)
* Routing: React Router 
* State Management: useState / useEffect

---

## Installation & Setup

1. Clone the repository

```
git clone <your-repo-link>
```

2. Navigate to project folder

```
cd user-directory-dashboard
```

3. Install dependencies

```
npm install
```

4. Start the development server

```
npm run dev
```

---

## Future Improvements

* Pagination for large datasets
* Debounced search for performance optimization
* Responsive design for mobile devices
* Error handling and loading states
* Unit and integration testing

---

## Conclusion

This project demonstrates core frontend skills including:

* API integration
* State management
* Routing
* UI/UX design
* Data filtering and sorting

It serves as a solid foundation for building scalable and interactive dashboards.
