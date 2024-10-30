# SpotNet

## Project Overview

This project is a user management system that will allow users to interact with the Spotify API. It uses a RESTful API architecture to facilitate interactions with user data stored in a MongoDB database, as well as fetching and managing data from the Spotify API.

### Features
- Create user Accounts- Create new user accounts with Spotify integration
- Retrieve user information and Spotify playlists
- Update existing user profiles and linked Spotify accounts
- Delete user accounts
- User data validation and error handling
- Fetch and display users' Spotify playlists and favorite tracks
- Search for Songs Albums and Genres
- Create custom user lists
 ***Features will be added to this document as they are developed***

### Functionality
The application provides endpoints for various operations on user data, ensuring secure and efficient management of user information. It supports operations like:
- **GET** `/users` - Fetch all users
- **GET** `/user/:name` - Fetch a user by username
- **PATCH** `/user/:name` - Update a user's information
- **DELETE** `/user/:name` - Delete a user by username
- **POST** `/user` - Crete a new user 
## Prerequisites

System requirements:
- **Node.js**: Version 14.x or later
- **MongoDB**: Version 4.x or later
- **NPM**: Version 6.x or later
- **Express.js**: Version 4.x or later
- **Spotify API Access**: Register your application on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) to obtain your client ID and client secret.
- A web browser
- Postman or a similar tool (for testing the API endpoints)

## Getting Started

To get a working version of the project up and running on your local machine, follow these instructions:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/GonzalezEzequiel-FS-1/contacts.git
   cd contacts

2. Install Dependencies Make sure you have Node.js and npm installed, then run:
    ```bash
    npm install

3. Set Up Environment Variables Create a .env file in the root of your project directory and define the necessary environment variables, such as:

    ```plaintext
    PORT=3069
    MONGODB_URI=mongodb://localhost:27017/your-database-name
    SPOTIFY_CLIENT_ID=your_spotify_client_id
    SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
4. Start the Server Run the following command to start your server:
    ```bash
    npm start
5. Access the Application Open your web browser and navigate to:
    ```bash
    http://localhost:3069
## Links
    Local Development URL: http://localhost:3069
    GitHub Repository: https://github.com/ePortfolios/WDV339-Spotify-Project
    Spotify API Documentation: Spotify Developer
### License

This project is licensed under the MIT License

### Key Updates
1. **SpotNet**: Added a specific title reflecting the Spotify integration.
2. **Overview and Features**: Updated the project description and features to include Spotify API functionality.
3. **Functionality**: Added details about fetching Spotify playlists and managing user favorites.
4. **Prerequisites**: Added information on registering for the Spotify API and obtaining client credentials.
5. **Environment Variables**: Included Spotify-specific environment variables.

### Next Steps
- **Testing and More Testing**: I've got to make sure that all endpoints are working as expected and document any specifics about the Spotify API integration.
- **Further customization**: A web UI will be built for user interaction.



