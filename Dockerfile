# Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Install browsers
RUN npx playwright install --with-deps

# Expose a port if your app needs it (e.g., for a web server)
# EXPOSE 3000

# Command to run tests
CMD ["npm", "test"]
