# frontend/Dockerfile

# Use Node.js base image for building the app
FROM node:18 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build files to the Nginx server
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
