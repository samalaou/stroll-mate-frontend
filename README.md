# Stroll Mate (Frontend)

This repository contains the frontend of **Stroll Mate**, a walking buddy app designed to help users find companions for walks and explore new routes. The app integrates Google Maps and generates random circular walking paths based on a user’s input location.

The backend repository (Express API) for this app can be found [here](https://github.com/samalaou/stroll-mate-backend).

## Features

- Google Maps integration for map-based interactions.
- Generate random circular walking routes from a given location.
- User authentication and profile management.
- Connect with other users to find walking buddies.


## Instructions

To run in your computer, follow these steps:
- clone 
- install dependencies: `npm install`
- create a `.env` file with the following environment variables
    - VITE_SERVER_URL: URL of the backend API (e.g., http://localhost:5005 or the deployed backend URL).
- add your google api key to the index.html file
- run the application: `npm run dev`

## Demo

A demo of the app can be found [here](https://strollmate.netlify.app/)

## Todo

- Improve Walk Path Generation: Add options for users to customize the paths
    - distance
    - time limite
- Implement quiet path option
- Add Notifications: : Implement notifications for walk requests and messages
- Enable real-time chat between users within the app.