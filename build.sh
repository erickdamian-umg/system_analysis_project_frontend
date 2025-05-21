#!/bin/bash

# Set Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=512"

# Clean install dependencies
rm -rf node_modules
npm ci

# Build the application
npm run build

# If build fails, try with production flag
if [ $? -ne 0 ]; then
  echo "First build attempt failed, trying with production flag..."
  NODE_ENV=production npm run build
fi 