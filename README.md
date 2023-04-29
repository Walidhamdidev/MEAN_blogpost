# Node.js API Endpoint

The API endpoint is `/api/articles`.

## API Methods

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/`      | Get all articles |
| `GET`  | `/:id`   | Get an article by ID |
| `POST` | `/`      | Create a new article |
| `PUT`  | `/:id`   | Update an article by ID |
| `DELETE` | `/:id`   | Delete an article by ID |


The API endpoint is `/api/articles`.

## API Methods

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/`      | Get all articles |
| `GET`  | `/:id`   | Get an article by ID |
| `POST` | `/`      | Create a new article |
| `PUT`  | `/:id`   | Update an article by ID |
| `DELETE` | `/:id`   | Delete an article by ID |








# Angular Blog Post Project

This is an Angular web application for managing blog posts, including user authentication and author profile pages.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install the required dependencies.
3. Start the development server by running `ng serve`.
4. Navigate to `http://localhost:4200` in your web browser to view the application.

## API Endpoints

The following API endpoints are available:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/author/singin` | Login a user |
| `POST` | `/api/author/signup` | Register a new user |
| `GET`  | `/api/articles` | Get all articles |
| `GET`  | `/api/articles/:id` | Get an article by ID |
| `POST` | `/api/articles` | Create a new article |
| `PUT`  | `/api/articles/:id` | Update an article by ID |
| `DELETE` | `/api/articles/:id` | Delete an article by ID |
| `GET`  | `/api/authors/:id` | Get author profile by ID |
| `PUT`  | `/api/authors/:id` | Update author profile by ID |

## Request/Response Formats

### Login User

**Request**

POST /api/auth/login
Content-Type: application/json

{
"email": "user@example.com",
"password": "password123"
}



**Response**

HTTP/1.1 200 OK
Content-Type: application/json

{
"user": {
"id": "abc123",
"name": "John Doe",
"email": "user@example.com"
},
"token": "xyz456"
}

### Create Article

**Request**

POST /api/articles
Content-Type: application/json
Authorization: Bearer xyz456

{
"title": "New Article",
"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
"authorId": "abc123",
"tags": ["angular", "javascript"]
}


**Response**

HTTP/1.1 201 Created
Content-Type: application/json

{
"id": "def789",
"title": "New Article",
"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
"authorId": "abc123",
"tags": ["angular", "javascript"]
}


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE)
