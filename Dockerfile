# Use the official Playwright image which comes with all the necessary dependencies.
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Set the default command to run when the container starts
CMD ["npm", "test"]
