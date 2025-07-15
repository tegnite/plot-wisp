# Plot Wisp

This is a monorepo for the Plot Wisp application, containing the Next.js client and the Node.js server.

## Project Structure

-   `client-web`: The Next.js frontend application.
-   `server`: The Node.js backend server.

## Getting Started

This project uses Docker and Docker Compose to orchestrate the development environment.

### Prerequisites

-   [Docker Desktop](https://www.docker.com/products/docker-desktop)

### Development

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/tegnite/plot-wisp.git
    cd plot-wisp
    ```

2.  **Environment Variables:**

    -   **Server:** Create a `.env` file in the `server` directory. Add the variables.
    -   **Client:** Create a `.env` file in the `client-web` directory. Add the variables.

3.  **Build and run the containers:**

    ```bash
    docker-compose up --build --watch
    ```

    or

    ```bash
    docker compose up --build --watch
    ```

    This command will build the Docker images for both the client and server and start the containers in detached mode.

    -   The client will be available at [http://localhost:3000](http://localhost:3000).
    -   The server will be available at [http://localhost:8000](http://localhost:8000).

4.  **Viewing Logs:**

    To view the logs for all services:

    ```bash
    docker-compose logs -f
    ```

    To view the logs for a specific service:

    ```bash
    docker-compose logs -f <service_name>  # e.g., web or server
    ```

5.  **Stopping the containers:**

    ```bash
    docker-compose down
    ```

### Production

For production, you will need to build and run the containers separately.

#### Server

1.  **Build the production image:**

    ```bash
    cd server
    docker build -t plot-wisp-server:production .
    ```

2.  **Run the production container:**

    ```bash
    docker run -p 8000:8000 --name plot-wisp-server-prod plot-wisp-server:production
    ```

#### Client

1.  **Build the production image:**

    ```bash
    cd client-web
    docker build -t plot-wisp-client:production .
    ```

2.  **Run the production container:**

    ```bash
    docker run -p 3000:3000 --name plot-wisp-client-prod plot-wisp-client:production
    ```
