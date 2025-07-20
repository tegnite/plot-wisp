# Start from the official devcontainers base image
FROM node:24-alpine3.21


# Update the package list and install git
# --no-install-recommends reduces the image size
RUN apk update && apk add --no-cache git

# Clean up the apt cache to save space
RUN rm -rf /var/cache/apk/*
