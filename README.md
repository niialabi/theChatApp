# The ChatApp

theChatApp is a modern and feature-rich chat application designed specifically for small and medium-sized businesses. It provides a seamless communication platform that enables teams to collaborate effectively, streamline workflows, and enhance productivity.

## Overview

theChatApp is built with a focus on simplicity, scalability, and efficiency. It offers a user-friendly interface that allows team members to engage in real-time conversations, share files, and collaborate on projects seamlessly. Whether you're working remotely or in the office, theChatApp ensures that your team stays connected and aligned.

## Key Features

- **Real-time Messaging**: Engage in instant messaging with individual team members or group conversations, allowing for seamless communication and collaboration.
- **Notifications**: Stay informed with customizable notifications for mentions, message replies, and important updates, ensuring you never miss a beat.
- **Search Functionality**: Quickly find and retrieve important conversations, files, or messages using the powerful search feature.
- **User Management**: Easily add, remove, or manage team members, ensuring your organization's data remains secure and accessible only to authorized individuals.
- **(TO BE IMPLEMENTED LATER) Project Management**: Organize and manage your team's projects, tasks, and deadlines within the chat application, ensuring everyone stays on the same page.
- **(TO BE IMPLEMENTED LATER) File Sharing**: Share documents, images, and other files with ease, facilitating efficient collaboration and information exchange.

## Getting Started

Follow these steps to set up and run theChatApp locally:

### Prerequisites

Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/) (v14.x or later)
- [Redis](https://redis.io/) (for session management and real-time messaging)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/niialabi/theChatApp.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd theChatApp
    ```

3. **Set up the backend**:
    - Change to the backend directory:
      ```bash
      cd backend
      ```
    - Install backend dependencies:
      ```bash
      npm install
      ```

4. **Start Redis**:
    Ensure Redis is running in the background. You can start Redis using:
    ```bash
    redis-server
    ```
    (Refer to the [Redis documentation](https://redis.io/documentation) for more detailed instructions on starting Redis on your operating system.)

5. **Start the backend server**:
    ```bash
    npm run start-server
    ```

6. **Set up the frontend**:
    - Navigate back to the root directory:
      ```bash
      cd ..
      ```
    - Change to the frontend directory:
      ```bash
      cd frontend
      ```
    - Install frontend dependencies:
      ```bash
      npm install
      ```

7. **Start the frontend application**:
    ```bash
    npm start
    ```

### Testing the Application

To test the application, open your web browser and navigate to:
```
http://localhost:3000
```
You should see the ChatApp interface, where you can start using the chat functionalities.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. We welcome all improvements and fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or need further assistance, feel free to open an issue in the repository or contact the maintainers.

Stay tuned for more updates as we continue to develop and enhance theChatApp to meet the communication needs of small and medium-sized businesses.

Happy coding!