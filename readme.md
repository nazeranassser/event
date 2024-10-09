
# EventAt Documentation

## Introduction
**EventAt** is a platform that brings event organizers and attendees together. Users can browse, book, and create events easily while managing their preferences.

### Purpose
The purpose of EventAt is to provide a seamless experience for users to find and participate in events that match their interests, and to offer event organizers a platform to promote and manage their events.

## Requirements
To set up and run EventAt, you'll need the following:
- **JSON Server** for data handling
- **Node.js** and **npm** for package management
- A modern web browser (like Chrome, Firefox, or Edge)

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/eventat.git
   ```
2. Navigate to the project directory:
   ```
   cd eventat
   ```
3. Install the required dependencies:
   ```
   npm install
   ```
4. Start the JSON server:
   ```
   json-server --watch db.json --port 3000
   ```

## Features
- **Event Browsing**: Users can search for events and filter by category.
- **Event Booking**: Users can book seats for available events.
- **Event Creation**: Organizers can create and promote their own events.
- **Category Filtering**: Users can filter events by categories like Technology, Business, Food, Cultural, Sport, and more.

## Data Structure
- **Events**:
  ```json
  {
    "id": 1,
    "title": "Photography Workshop",
    "category": "Technology",
    "startTime": "2024-10-10T10:00:00Z",
    "location": "Amman, Jordan",
    "bookedSeats": 10,
    "totalSeats": 50,
    "organizerId": 1
  }
  ```

## API Documentation
### Event Endpoints
- **GET /events**: Fetch all events.
- **POST /events**: Create a new event.
- **PUT /events/{id}**: Update an event.
- **DELETE /events/{id}**: Delete an event.

### User Endpoints
- **GET /users**: Fetch all users.
- **POST /users**: Register a new user.

## UI Guide
- **Homepage**: Displays promoted events happening soon.
- **Event Detail Page**: Shows detailed information about a selected event.
- **Create Event Page**: Allows users to add new events to the platform.

## Common Issues
1. **Server not starting**: Ensure that JSON Server is installed and the command is run in the correct directory.
2. **Data not updating**: Check the API endpoint and payload format.

## Future Enhancements
- **Mobile App Integration**: To extend accessibility to mobile users.
- **Payment Gateway**: To allow users to book paid events.

## Developer Guide
### Contribution Guidelines
1. Fork the repository.
2. Create a new branch for your feature.
3. Submit a pull request with a description of your changes.

## Contact
For questions, contact us at: [alhajjaj0shams@gmail.com](mailto:alhajjaj0shams@gmail.com).
