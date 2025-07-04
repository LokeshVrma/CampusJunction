FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Use 'serve' to serve the build
FROM node:18-alpine

# Install 'serve' globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy build folder from previous stage
COPY --from=build /app/build ./build

# Expose port 3000
EXPOSE 3000

# Start the React app with serve
CMD ["serve", "-s", "build", "-l", "3000"]