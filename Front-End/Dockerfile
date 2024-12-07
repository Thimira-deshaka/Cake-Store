# Use official Node.js image as base
FROM node:16

# Set the working directory inside the container to /app (since package.json is in the root of frontend)
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port for React app (default is 5173 for Vite)
EXPOSE 5173

# Command to run the React app (this assumes you're using Vite or the default start command)
CMD ["npm", "start"]
