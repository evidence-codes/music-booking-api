# Use official Node.js LTS version
FROM node:18

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the entire project into the container
COPY . .

# Build TypeScript files
RUN npm run build

# Expose the port Render will use
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
