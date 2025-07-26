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

## With docker-compose

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

## With devcontainers

Developing inside a container can streamline your workflow and ensure consistency.

1.  **Prerequisites:**
    *   [Docker Desktop](https://www.docker.com/products/docker-desktop)
    *   [Visual Studio Code](https://code.visualstudio.com/)
    *   [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code.

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/tegnite/plot-wisp.git
    cd plot-wisp
    ```

3.  **Environment Variables:**
    *   **Server:** Create a `.env` file in the `server` directory. You can copy from `.env.example`.
    *   **Client:** Create a `.env` file in the `client-web` directory. You can copy from `.env.example`.

4.  **Open in Dev Container:**
    *   Open the project folder in VS Code.
    *   Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
    *   Run the command: **Dev Containers: Reopen in Container**.
    *   VS Code will use the configuration in `.devcontainer/base/devcontainer.json` to build and start the container.

5.  **Using a Custom Dev Container Configuration:**
    This project supports multiple dev container configurations. You can create your own to personalize your development environment.
    *   Create a new folder inside the `.devcontainer` directory (e.g., `.devcontainer/your-name`).
    *   Inside your new folder, create a `devcontainer.json` file.
    *   It is recommended to copy the contents of `.devcontainer/base/devcontainer.json` as a starting point to ensure you have all the necessary project settings. You can then add your personal customizations (themes, extensions, settings, etc.) on top of it, like in the example at `.devcontainer/meowveloper/devcontainer.json`.
    *   When you run the **Dev Containers: Reopen in Container** command, VS Code will detect multiple configurations and will prompt you to choose which one to use. Select your custom configuration from the list.

6.  **Running the Development Servers:**
    Once VS Code has connected to the dev container, you can open terminals directly within VS Code. These terminals will be inside the container.

    *   **Start the server:**
        Open a new terminal.
        ```bash
        cd server
        npm run dev
        ```

    *   **Start the client:**
        Open another new terminal.
        ```bash
        cd client-web
        npm run dev
        ```

7.  **Accessing a Running Container (from outside VS Code):**
    If you need to access a container from your local terminal (not from within VS Code), you can use `docker exec`.

    *   First, list the running containers to find their names:
        ```bash
        docker ps
        ```
        Look for names like `plot-wisp-server-1` and `plot-wisp-web-1`.

    *   To open an interactive shell in the server container:
        ```bash
        docker exec -it <server_container_name> ash
        ```
        (Use `plot-wisp-server-1` or the name you found).

    *   Once inside, you can run commands. The workspace is mounted, so you can navigate to the project directories.
        ```sh
        # Inside the container
        cd /workspaces/plot-wisp/server
        npm install
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
