# Use Node.js LTS (can override with build-arg)
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}

# Set working directory
WORKDIR /app

# Copy only package files first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app (respects .dockerignore)
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
