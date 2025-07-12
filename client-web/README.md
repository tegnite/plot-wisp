This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Running with Docker

This project is configured to run in Docker for both development and production environments.

### Development

The development environment uses `docker-compose` for a seamless experience with hot-reloading.

1.  **Build and run the container:**

    ```bash
    docker-compose up --build
    ```

2.  **Access the application:**

    Open [http://localhost:3000](http://localhost:3000) in your browser. Changes to the source code will be automatically reflected.

### Production

The production container simulates the environment used for deployment.

1.  **Build the production image:**

    ```bash
    docker build -t client-web:production .
    ```

2.  **Run the production container:**

    ```bash
    docker run -d -p 3000:3000 --name client-web-prod client-web:production
    ```

3.  **Access the application:**

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
