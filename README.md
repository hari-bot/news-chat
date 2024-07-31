# NewsChat

NewsChat is a real-time chat application integrated with a news viewing feature. Users can join chat rooms, send and receive messages, and browse news articles from various sources. Built with React, Express, and Socket.io, NewsChat provides a seamless experience for both chatting and staying updated with the latest news.

## Features

- **Real-Time Chat**: Send and receive messages instantly using Socket.io.
- **Chat Rooms**: Create, join, and manage chat rooms.
- **Message History**: Fetch and display previous messages in a chat room.
- **News Viewing**: View and save news articles from various sources.
- **Save News**: Save  news articles based on intrest.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hari-bot/news-chat.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd newschat
   ```

3. **Install dependencies**:

   - For the client (React):
     ```bash
     cd client
     npm install
     ```

   - For the server (Express):
     ```bash
     cd ../server
     npm install
     ```

4. **Setup environment variables**:

   - For the server, create a `.env` file in the `server` directory with the following variables:
     ```plaintext
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

   - For the client, you might need to set up API keys for news sources or any other configurations required.

5. **Start the server**:
   ```bash
   cd server
   npm start
   ```

6. **Start the client**:
   ```bash
   cd ../client
   npm start
   ```

## Usage

### Chat

1. **Create a Room**: Click on the "Create Room" button in the sidebar and enter a name for the new room.

2. **Join a Room**: Click on a chat room from the list to join and start chatting.

3. **Send a Message**: Type a message in the input field and click "Send" to send it to the selected room.

### News

1. **View News**: Browse through the list of news articles available on the News section of the app.

2. **Search News**: Use the search functionality to find articles based on keywords.

3. **Save News**: Save articles for later reference.

## API Endpoints

### Chat

- **Get Chat Rooms**: `GET http://localhost:5000/api/chats/chatrooms`
- **Get Messages for a Room**: `GET http://localhost:5000/api/chats/messages/{roomId}`
- **Post a Message**: `POST http://localhost:5000/api/chats/message/`
  - **Body**:
    ```json
    {
      "chatRoomId": "id",
      "message": "Hello, this is a test message!"
    }
    ```

### News

- **Get News Articles**: `GET http://localhost:5000/api/news/articles`
- **Search News**: `GET http://localhost:5000/api/news/search?q={query}`
- **Save News Article**: `POST http://localhost:5000/api/news/save`
  - **Body**:
    ```json
    {
      "articleId": "id",
      "title": "Article Title",
      "content": "Article Content",
      "source": "News Source"
    }
    ```

## Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
