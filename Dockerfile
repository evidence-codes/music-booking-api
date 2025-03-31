# Use an official Node.js image as base
FROM node:18

# Set the working directory inside the container
WORKDIR /src

# Copy the entire project first
COPY . .

# Install dependencies
RUN npm install

# Expose the port the service runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
