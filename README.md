# Practical Test

## Time Allowed: 5 hrs

### Submission Criteria: 
- All tasks must be submitted on or before the time allocated for the test.
- For the backend tasks, push your code to your Git repository and include the link in your email response.
- For the frontend task, push your code to your Git repository and also make the login page accessible via a demo URL.
- Share the repository and demo links for both frontend and backend tasks via email.

### Requirements:
- The use of ChatGPT, Gemini, Blackbox, or any other AI models is strictly prohibited.
- Google searches are allowed.
- You will be given JSON Data to work with for the Backend tasks.

---

## Backend

### Test Data
- **Staff Data**: `staff.json`
- **Loan Data**: `loans.json`

### Tasks

Create an `Express` + `Node.js` RESTful API application that performs the following functions.

#### 1. Authentication API
- **`/login`**: 
  - Logs in the user using basic authentication.
  - Use JWT for role-based authentication.
- **`/logout`**: 
  - Clears the user’s session.

#### 2. Loan Management API (Protected Endpoints)
- **`/loans`**: 
  - Fetch all loans.
  - A normal staff can fetch all loans, but the applicant’s `totalLoan` must not be visible.
  - Only the `admin` and `superadmin` roles can see the `totalLoan` of the applicant.
- **`/loans?status={‘pending’, ‘active’}`**: 
  - Filter loans based on their `status` (either `pending` or `active`).
- **`/loans/:userEmail/get`**: 
  - Fetch the loans for a particular user by email.
  - If there are no loans registered by the user, return an empty array: `{loans: []}`.
- **`/loans/expired`**: 
  - Fetch all loans where the `maturityDate` is in the past.
- **`/loan/:loanId/delete`**: 
  - Delete a loan data.
  - Only a `superadmin` can perform this action. This should be forbidden for other staff members.

### Global Middlewares
Use global middlewares where necessary, including but not limited to:
- `globalErrorFilter`
- `globalAuthMiddleware`
- `morgan` for logging
- `throttleApi` for rate-limiting API calls
- `CORS` (Cross-Origin Resource Sharing)

---

## Frontend (Optional)
Develop the login page using **Vue.js** based on the provided [Figma design](<link_to_figma_design>).

- The login page should allow users to log in using their credentials (username, password).
- Implement basic validation for the fields (username, password).
- You should push the code to your Git repository and share the demo link for accessing the page.

---

## Instructions:

1. **Backend Implementation:**
   - Set up an Express server with the necessary routes.
   - Implement JWT-based authentication for login and session management.
   - Ensure that protected endpoints (like `/loans` and `/loan/:loanId/delete`) are only accessible to the appropriate users (normal staff, admin, superadmin).
   - Implement validation and error handling for all API endpoints.
   - Add middlewares such as `morgan` for logging, `CORS` for cross-origin requests, and rate-limiting (if necessary).

2. **Frontend (Optional):**
   - Develop the login page using Vue.js based on the provided Figma design.
   - Ensure the page is responsive and looks similar to the provided design.
   - Include basic form validation.

---

## Submission Instructions:
1. For **Backend**:
   - Push your backend code to your GitHub repository.
   - Include the repository link in your email response.
   
2. For **Frontend**:
   - Push your frontend code to your GitHub repository.
   - Deploy your login page on a platform like Vercel, Netlify, or Heroku and include the demo link in your email response.

3. Make sure your code is well-commented and follows best practices.

---

Good luck! 😊

