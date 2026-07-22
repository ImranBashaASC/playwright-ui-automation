
# Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.40.1-jammy

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose a port if your app runs a server (optional)
# EXPOSE 3000

# The default command to run tests
CMD ["npx", "playwright", "test"]
