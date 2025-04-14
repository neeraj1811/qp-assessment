# Use node:18-alpine as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# App can run with:
# npm start
# npm run start_uat

# Start the application using npm start
CMD ["npm","start"]