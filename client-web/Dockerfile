# Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build the application
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time arguments
ARG NEXT_PUBLIC_CLIENT_API_URL
ARG NEXT_SERVER_API_URL

# Set environment variables for the build
ENV NEXT_PUBLIC_CLIENT_API_URL=$NEXT_PUBLIC_CLIENT_API_URL
ENV NEXT_SERVER_API_URL=$NEXT_SERVER_API_URL

RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Set runtime environment variables
ARG NEXT_PUBLIC_CLIENT_API_URL
ARG NEXT_SERVER_API_URL
ENV NEXT_PUBLIC_CLIENT_API_URL=$NEXT_PUBLIC_CLIENT_API_URL
ENV NEXT_SERVER_API_URL=$NEXT_SERVER_API_URL


COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port Next.js will run on
EXPOSE 3000

# The default start command for Next.js will use the PORT environment variable
CMD ["npm", "run", "start"]
