# AI Backend API Documentation

Welcome to the AI Backend API! This document outlines how the API works, available endpoints, and how to use it in your application.

## Overview
This is a production-ready Node.js backend using Express, TypeScript, and MongoDB. It integrates with an AI service (like Ollama) to provide several endpoints ranging from chat features to specialized functionalities like resume building and code review.

### Base URL
When running locally with the default configuration, the API is available at:
```
https://api.pixoralabz.tech/api
```

### Swagger Documentation
For an interactive interface and detailed schema definitions, you can visit the Swagger dashboard (when the server is running):
```
https://api.pixoralabz.tech/api/docs
```

---

## Authentication

Authentication is required for all AI endpoints. The API uses JSON Web Tokens (JWT). You need to register/login to obtain a token and pass it in the `Authorization` header for AI-related requests.

### 1. Register User
Creates a new user and returns an authentication token (and a refresh token).

- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```

### 2. Login User
Logs in an existing user and returns an authentication token (and a refresh token).

- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```

### 3. Refresh Token
Refreshes the current session (Requires standard Auth Bearer token in the header depending on implementation specifics).

- **Endpoint**: `/auth/refresh`
- **Method**: `POST`
- **Headers**:
  ```
  Authorization: Bearer <your-current-token>
  ```

---

## AI Endpoints

All AI endpoints require authentication. Include your token in the headers of your request:
**Header format**: `Authorization: Bearer <your_jwt_token>`

*Note: Rate limiting is applied to all AI endpoints to prevent abuse.*

### 1. Basic Chat
Send a message to the AI and get a response.

- **Endpoint**: `/ai/chat`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "message": "Hello, how are you today?"
  }
  ```

### 2. Text Suggestions
Get text completion or suggestions based on an input string.

- **Endpoint**: `/ai/suggestions`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "text": "Once upon a time in a digital landscape"
  }
  ```

### 3. General Analysis
Analyze a given prompt/data.

- **Endpoint**: `/ai/analyze`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "prompt": "Analyze the sentiment of this text: I am extremely happy today!"
  }
  ```

### 4. ATS Resume Checker
Analyzes a resume against a job description to give an ATS compatibility score and feedback.

- **Endpoint**: `/ai/resume/ats`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "resumeText": "Experienced software engineer with 5 years...",
    "jobDescription": "We are looking for a Senior Developer proficient in Node.js..."
  }
  ```

### 5. Build Resume
Generates a structured resume based on provided profile details.

- **Endpoint**: `/ai/resume/build`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Jane Doe",
    "skills": ["JavaScript", "TypeScript", "Node.js"],
    "education": ["B.S. Computer Science"],
    "experience": ["Backend Dev at Google", "Intern at Apple"]
  }
  ```

### 6. Cover Letter Generator
Generates a tailored cover letter given the resume and job description.

- **Endpoint**: `/ai/cover-letter`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "jobTitle": "Backend Developer",
    "company": "Tech Innovators Inc.",
    "resume": "My resume content here...",
    "jobDescription": "Full job description text..."
  }
  ```

### 7. Code Review
Pass a snippet of code and get a detailed code review, catching bugs or suggesting optimizations.

- **Endpoint**: `/ai/code-review`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "code": "function add(a, b) { return a - b; }",
    "language": "javascript"
  }
  ```

### 8. Startup Idea Validator / Expander
Submit a startup idea to get feedback, business models, or further expansions.

- **Endpoint**: `/ai/startup-idea`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "idea": "An app that uses AI to write your daily emails"
  }
  ```

---

## Error Handling
The API employs a centralized error handling middleware. If something goes wrong, you will typically receive a JSON response structured like this:

```json
{
  "success": false,
  "message": "Specific error message here",
  "stack": "..." // (Only given in non-production environments)
}
```

Validation errors (from bad request formats) usually respond with `400 Bad Request` and an array of errors specifying which fields are failing validation.

## Health Check
To check if the API container/process is running successfully:

- **Endpoint**: `/health` (Notice `https://api.pixoralabz.tech/health` directly, without `/api`)
- **Method**: `GET`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Server is healthy"
  }
  ```
