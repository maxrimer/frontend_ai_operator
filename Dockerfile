# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Accept build arguments for environment variables
ARG NODE_ENV=production
ARG VITE_BASE_URL
ARG VITE_API_URL
ARG VITE_APP_TITLE
ARG VITE_MSW_ENABLED

# Set environment variables for build
ENV NODE_ENV=$NODE_ENV
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_TITLE=$VITE_APP_TITLE
ENV VITE_MSW_ENABLED=$VITE_MSW_ENABLED

# Build the application
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 