
# Digital Pronunciation Modifier (DPM)

## Overview
This application is designed to help users improve their pronunciation by allowing them to record their speech, which is then processed by a backend correction algorithm to fix potential grammatical errors. The corrected audio is sent back to the user for review. This application consists of two main components:
- **Frontend**: An Angular application which provides the user interface for recording and playing audio.
- **Backend**: An Express.js application using Prisma for database interactions, which handles audio processing and user management.

## Technology Stack
- **Frontend**: Angular 18, Tailwind CSS
- **Backend**: Node.js, Express.js, Prisma ORM

## Getting Started

### Prerequisites
- Node.js (Version 14 or higher recommended)
- Angular CLI

### Setup

#### Frontend
1. Navigate to the `dpm` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   ng serve
   ```
4. The Angular application will be available at `http://localhost:4200`.

#### Backend
1. Navigate to the `express` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up the database using Prisma:
   ```
   npm run prisma
   ```
4. Start the backend server:
   ```
   npm start
   ```
5. The Express server will be running on `http://localhost:3000`.

## Features

### Frontend
- Record audio via browser
- Play recorded audio
- Send audio and user email to backend

### Backend
- Receive audio and user email
- Process audio to correct errors (to be implemented)
- Send corrected audio back to frontend

## Future Work
- Implement the audio correction algorithm using advanced audio processing libraries.
- Enhance user authentication and management.
- Optimize the application for scalability and security.

