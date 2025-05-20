#!/bin/bash

# Install dependencies
npm install

# Create production build
npm run build

# Create S3 bucket if it doesn't exist
aws s3 mb s3://crm-frontend --region us-east-1

# Upload build files to S3
aws s3 sync build/ s3://crm-frontend --delete

# Create CloudFront distribution
aws cloudfront create-distribution \
    --origin-domain-name crm-frontend.s3.amazonaws.com \
    --default-root-object index.html 