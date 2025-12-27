# Authentication Guide

## Overview

The GearGuard application now includes authentication functionality for both regular users and maintenance teams. All routes are protected - users must log in before accessing the application.

## Features

### Login & Signup
- **Login Page**: Users can sign in with email and password
- **Signup Page**: New users can create accounts as either:
  - **Regular User**: For employees who use equipment
  - **Maintenance Team**: For maintenance team members

### Authentication Flow
1. Users visit the application
2. If not authenticated, they are redirected to `/login`
3. After successful login/signup, they are redirected to `/dashboard`
4. All routes are protected - unauthenticated users cannot access any pages
5. Logout clears the session and redirects to login

## Demo Credentials

### Existing Users (for testing):
- **Regular User:**
  - Email: `user@example.com`
  - Password: `password123`

- **Maintenance Team:**
  - Email: `team@example.com`
  - Password: `password123`

## User Roles

### Regular User (`user`)
- Can access all features of the application
- Can view and manage equipment
- Can create maintenance requests
- Can view reports and calendar

### Maintenance Team (`maintenance_team`)
- Has access to all features
- Can view and manage maintenance requests
- Can be assigned to equipment maintenance
- Can view team-specific information

## Frontend-Only Implementation

This is a **frontend-only** authentication system:
- User credentials are stored in-memory (mock database)
- Authentication state is persisted in localStorage
- No backend API calls are made
- **Important**: This is for demo/development purposes only

### For Production:
- Replace mock authentication with real backend API
- Implement secure password hashing
- Add JWT token management
- Implement proper session management
- Add password reset functionality
- Add email verification

## Files Created/Modified

### New Files:
- `src/store/authStore.ts` - Authentication state management
- `src/pages/Login.tsx` - Login page component
- `src/pages/Signup.tsx` - Signup page component
- `src/components/ProtectedRoute.tsx` - Route protection component

### Modified Files:
- `src/App.tsx` - Added auth routes and protected all main routes
- `src/components/Layout.tsx` - Added user info and logout button

## Usage

### To Login:
1. Navigate to `/login` (or the app will redirect you there)
2. Enter your email and password
3. Click "Sign in"
4. You'll be redirected to the dashboard

### To Signup:
1. Navigate to `/signup` (or click "Don't have an account? Sign up" on login page)
2. Choose account type (User or Team)
3. Fill in the required information
4. Enter password (minimum 6 characters)
5. Confirm password
6. Click "Sign up"
7. You'll be automatically logged in and redirected to the dashboard

### To Logout:
1. Click the "Logout" button in the top navigation bar
2. You'll be redirected to the login page

## Authentication State

The authentication state is managed using Zustand with persistence:
- User information is stored in localStorage
- Session persists across page refreshes
- Logout clears the stored authentication data

## Security Notes

⚠️ **This is a frontend-only demo implementation!**

For production use, you MUST:
1. Implement backend authentication
2. Never store passwords in plain text
3. Use secure password hashing (bcrypt, argon2, etc.)
4. Implement JWT tokens or session-based auth
5. Add CSRF protection
6. Implement rate limiting
7. Add password strength requirements
8. Implement email verification
9. Add two-factor authentication (optional but recommended)

