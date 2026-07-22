# Use the official Playwright image which comes with browsers and dependencies
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# By default, the image has browsers installed. If you need to force it, uncomment the next line.
# RUN npx playwright install --with-deps

# Set the default command to run when the container starts
CMD ["npm", "test"]
