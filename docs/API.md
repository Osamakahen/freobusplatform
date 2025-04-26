# FreoBus Platform API Documentation

## Overview
This document provides comprehensive documentation for the FreoBus Platform API, including wallet integration, marketplace operations, and deployment endpoints.

## Authentication
All API endpoints require authentication using a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Wallet API

### Connect Wallet
```http
POST /api/wallet/connect
```
Connects a user's wallet to the platform.

**Request Body:**
```json
{
  "provider": "metamask" | "walletconnect",
  "chainId": number
}
```

**Response:**
```json
{
  "address": "string",
  "chainId": number,
  "isConnected": boolean
}
```

### Get Wallet Balance
```http
GET /api/wallet/balance
```
Retrieves the wallet balance for the connected address.

**Response:**
```json
{
  "balance": "string",
  "currency": "string"
}
```

### Send Transaction
```http
POST /api/wallet/transaction
```
Sends a transaction from the connected wallet.

**Request Body:**
```json
{
  "to": "string",
  "value": "string",
  "data": "string"
}
```

**Response:**
```json
{
  "hash": "string",
  "status": "pending" | "success" | "failed"
}
```

## Marketplace API

### List Items
```http
GET /api/marketplace/items
```
Retrieves a list of available items in the marketplace.

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `category`: string (optional)
- `sort`: string (optional)

**Response:**
```json
{
  "items": [
    {
      "id": "string",
      "name": "string",
      "price": "string",
      "seller": "string",
      "category": "string"
    }
  ],
  "total": number,
  "page": number,
  "limit": number
}
```

### Create Listing
```http
POST /api/marketplace/listings
```
Creates a new listing in the marketplace.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": "string",
  "category": "string",
  "imageUrl": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "status": "pending" | "active" | "sold"
}
```

## Deployment API

### Health Check
```http
GET /api/health
```
Checks the health status of the platform and its services.

**Response:**
```json
{
  "status": "healthy" | "degraded" | "unhealthy",
  "services": {
    "wallet": {
      "status": "up" | "down",
      "responseTime": number
    },
    "marketplace": {
      "status": "up" | "down",
      "responseTime": number
    }
  }
}
```

### Metrics
```http
GET /api/metrics
```
Retrieves platform metrics.

**Query Parameters:**
- `startTime`: string (ISO timestamp)
- `endTime`: string (ISO timestamp)
- `metric`: string (optional)

**Response:**
```json
{
  "metrics": [
    {
      "name": "string",
      "value": number,
      "timestamp": "string"
    }
  ]
}
```

## Error Responses

All API endpoints may return the following error responses:

```json
{
  "error": {
    "code": number,
    "message": "string",
    "details": object
  }
}
```

Common error codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

API requests are rate-limited to prevent abuse:
- 100 requests per minute per IP address
- 1000 requests per hour per authenticated user

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1625097600
``` 