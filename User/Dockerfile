# Use Node.js official image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3001
EXPOSE 3001

# Run the app
CMD ["npm", "start"]
