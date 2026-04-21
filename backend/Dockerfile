# Use Node.js 18 alpine as base
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Final stage
FROM node:18-alpine

WORKDIR /app

# Copy from builder
COPY --from=builder /app ./

# Expose port
EXPOSE 5000

# Set environment variables for production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
