# Backend API Integration Guide

For backend developers implementing the Me Apomuden API endpoints.

## Overview

The frontend is ready to connect to a backend API at `NEXT_PUBLIC_API_URL` (default: `http://localhost:8000/api/v1`).

**All endpoints require Bearer token authentication:**
```
Authorization: Bearer {token}
```

## API Endpoints (Frontend Expected)

### 1. Measurements

#### Create Measurement
```
POST /measurements
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "type": "blood_pressure" | "glucose",
  "systolic": 120,           // Required for BP
  "diastolic": 80,           // Required for BP
  "heartRate": 72,           // Optional for BP
  "glucoseLevel": 98,        // Required for glucose
  "notes": "After breakfast",
  "measuredAt": "2024-01-15T10:30:00Z"
}

Response (201 Created):
{
  "success": true,
  "data": {
    "id": "meas_123abc",
    "serverId": "db_uuid_456",
    "type": "blood_pressure",
    "systolic": 120,
    "diastolic": 80,
    "heartRate": 72,
    "notes": "After breakfast",
    "measuredAt": "2024-01-15T10:30:00Z",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}

Response (400 Bad Request):
{
  "success": false,
  "error": "Invalid blood pressure reading"
}
```

#### Get Measurements
```
GET /measurements?type=blood_pressure&startDate=2024-01-01&endDate=2024-01-31&limit=50&offset=0
Authorization: Bearer {token}

Query Parameters:
- type: "blood_pressure" | "glucose" (optional)
- startDate: ISO8601 (optional)
- endDate: ISO8601 (optional)
- limit: number (default 50)
- offset: number (default 0)

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": "meas_123abc",
      "type": "blood_pressure",
      "systolic": 120,
      "diastolic": 80,
      "heartRate": 72,
      "notes": "After breakfast",
      "measuredAt": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    // ... more measurements
  ]
}
```

#### Update Measurement
```
PUT /measurements/{id}
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "notes": "Updated notes",
  // ... other updatable fields
}

Response (200 OK):
{
  "success": true,
  "data": {
    "id": "meas_123abc",
    // ... updated measurement
  }
}
```

#### Delete Measurement
```
DELETE /measurements/{id}
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": null
}
```

#### Batch Sync (Priority)
```
POST /measurements/sync
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "measurements": [
    {
      "id": 1,                    // Local DB ID
      "serverId": undefined,      // undefined = new, string = update
      "data": {
        "type": "blood_pressure",
        "systolic": 120,
        "diastolic": 80,
        "notes": "Morning reading",
        "measuredAt": "2024-01-15T10:30:00Z"
      }
    },
    {
      "id": 2,
      "serverId": "db_uuid_789",
      "data": {
        "type": "glucose",
        "glucoseLevel": 110,
        "measuredAt": "2024-01-15T12:00:00Z"
      }
    }
  ]
}

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,                    // Local ID
      "serverId": "db_uuid_123"   // NEW - return this to update local record
    },
    {
      "id": 2,
      "serverId": "db_uuid_789"   // Confirm existing
    }
  ]
}

Important:
- This endpoint handles CREATE and UPDATE in one request
- Return serverIds for all records
- Frontend will map: local ID → serverId for future syncs
- Max 100 measurements per request
```

#### Get Health Statistics
```
GET /health-stats?period=30d&type=blood_pressure
Authorization: Bearer {token}

Query Parameters:
- period: "7d" | "30d" | "90d" (default 30d)
- type: "blood_pressure" | "glucose" (default both)

Response (200 OK):
{
  "success": true,
  "data": {
    "average": 125,
    "min": 110,
    "max": 145,
    "trend": "up" | "down" | "stable",
    "dataPoints": 28
  }
}
```

### 2. Medications

#### Create Medication
```
POST /medications
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "name": "Metformin",
  "dosage": "500mg",
  "frequency": "twice daily",
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-12-31T00:00:00Z",  // Optional
  "instructions": "Take with food"     // Optional
}

Response (201 Created):
{
  "success": true,
  "data": {
    "id": "med_123abc",
    "name": "Metformin",
    "dosage": "500mg",
    "frequency": "twice daily",
    "startDate": "2024-01-01T00:00:00Z",
    "instructions": "Take with food",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Medications
```
GET /medications?status=active
Authorization: Bearer {token}

Query Parameters:
- status: "active" | "archived" (optional, default active)

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": "med_123abc",
      "name": "Metformin",
      "dosage": "500mg",
      "frequency": "twice daily",
      "startDate": "2024-01-01T00:00:00Z",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Update Medication
```
PUT /medications/{id}
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "endDate": "2024-06-30T00:00:00Z"  // Mark as discontinued
}

Response (200 OK):
{
  "success": true,
  "data": { /* updated medication */ }
}
```

#### Delete Medication
```
DELETE /medications/{id}
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": null
}
```

### 3. Medication Adherence

#### Record Adherence
```
POST /medication-adherence
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "medicationId": "med_123abc",
  "date": "2024-01-15",
  "taken": true,
  "notes": "Took with breakfast"  // Optional
}

Response (201 Created):
{
  "success": true,
  "data": {
    "id": "adh_123abc",
    "medicationId": "med_123abc",
    "date": "2024-01-15",
    "taken": true,
    "notes": "Took with breakfast",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Adherence History
```
GET /medication-adherence/{medicationId}?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": "adh_123abc",
      "date": "2024-01-15",
      "taken": true,
      "notes": "Took with breakfast"
    }
  ]
}
```

### 4. User Profile

#### Get Profile
```
GET /profile
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "data": {
    "userId": "user_123",
    "firstName": "Kwame",
    "lastName": "Mensah",
    "dateOfBirth": "1980-05-15",
    "gender": "male",
    "bloodType": "O+",
    "phone": "+233123456789",
    "language": "en",          // en, tw, ga, dag, ee, fat
    "literacyLevel": "high",   // high, medium, low
    "medicalHistory": "Hypertension, Diabetes Type 2",
    "allergies": "Penicillin",
    "emergencyContact": "Jane Mensah",
    "emergencyContactPhone": "+233987654321",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Update Profile
```
PUT /profile
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "firstName": "Kwame",
  "literacyLevel": "high",
  "language": "tw",
  // ... any updatable fields
}

Response (200 OK):
{
  "success": true,
  "data": { /* updated profile */ }
}
```

### 5. Health Insights (AI - Phase 2)

#### Get Health Insights
```
GET /insights?days=30&type=blood_pressure
Authorization: Bearer {token}

Query Parameters:
- days: number (default 30)
- type: "blood_pressure" | "glucose" (optional)

Response (200 OK):
{
  "success": true,
  "data": {
    "trends": [
      {
        "type": "blood_pressure",
        "trend": "up",
        "percentage": 12,
        "message": "Blood pressure increased 12% over last 30 days"
      }
    ],
    "recommendations": [
      "Increase exercise frequency",
      "Reduce sodium intake",
      "Check medication compliance"
    ],
    "alerts": [
      {
        "type": "critical",
        "title": "Critical Reading Detected",
        "message": "BP reading of 185/95 on 2024-01-15"
      }
    ]
  }
}
```

**Note**: This endpoint will integrate with Gemini AI in Phase 2.

### 6. Feedback

#### Submit Feedback
```
POST /feedback
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "type": "helpful" | "not_helpful" | "irrelevant",
  "relatedInsightId": "ins_123abc",  // Optional
  "notes": "This recommendation helped me reduce salt"
}

Response (201 Created):
{
  "success": true,
  "data": {
    "id": "feed_123abc",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

## Error Handling

All error responses follow this format:

```
{
  "success": false,
  "error": "Human-readable error message",
  "code": "ERROR_CODE",      // Optional
  "details": {               // Optional
    "field": ["error message"]
  }
}
```

### Common HTTP Status Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | Success | GET, PUT, DELETE succeeded |
| 201 | Created | POST succeeded |
| 400 | Bad Request | Invalid data validation |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | User doesn't own resource |
| 404 | Not Found | Resource doesn't exist |
| 429 | Rate Limited | Too many requests |
| 500 | Server Error | Internal error |

## Authentication

### Token Generation
Frontend stores token from login endpoint (not included here):
```
POST /auth/login
{
  "phone": "+233123456789",
  "pin": "1234"  // or password
}
```

### Token Storage
```javascript
// Frontend saves token
localStorage.setItem('auth_token', token);

// API client injects on all requests
headers.Authorization = `Bearer ${token}`
```

### Token Refresh (if needed)
Implement 401 handling to refresh token:
```
Frontend receives 401
→ Calls POST /auth/refresh with refresh_token
→ Gets new access_token
→ Retries original request
```

## Rate Limiting

Implement rate limiting to prevent abuse:

```
- 100 requests per minute per user
- Return 429 status with Retry-After header

Response Headers:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705324200
Retry-After: 60
```

## Data Validation

### Blood Pressure Ranges
- Systolic: 40-300 mmHg
- Diastolic: 20-200 mmHg
- Heart Rate: 30-200 BPM (optional)

### Glucose Ranges
- Fasting: 70-100 mg/dL (normal)
- Random: 70-140 mg/dL (normal)
- Critical low: < 70 mg/dL
- Critical high: > 400 mg/dL

### Validation Examples
```typescript
// Systolic validation
if (systolic < 40 || systolic > 300) {
  throw new Error('Invalid systolic reading');
}

// Required fields
if (!type || !measuredAt) {
  throw new Error('Missing required fields');
}
```

## Batch Operations

### Batch Sync Strategy
The frontend uses batch sync for efficiency:

```
1. Collect all unsync items (typically 1-10)
2. Send POST /measurements/sync with array
3. Expect array response with serverIds
4. Update local records with serverIds
5. Mark as synced (synced: 1)
6. Remove from sync queue
```

**Why batch?**
- Reduces API calls (1 batch vs 10 individual)
- Better error handling
- Atomic operations
- Lower latency

## Offline Considerations

### What Happens Offline
1. Measurement saved locally (IndexedDB)
2. Added to sync queue
3. When online → automatic sync
4. Max retry: 5 attempts

### What You Must Handle
- Creating same measurement multiple times (idempotency)
- Updated timestamps (local vs server)
- Concurrent edits (conflict resolution)
- Deleted items that don't exist on server

### Idempotency Strategy
```
Frontend sends: POST /measurements/sync
{
  "measurements": [{
    "id": 1,
    "serverId": undefined,
    "data": { /* measurement */ }
  }]
}

Backend logic:
if (serverId) {
  // Update existing
  UPDATE measurements SET ... WHERE id = serverId
} else {
  // Create new
  INSERT INTO measurements (...)
}

// Return serverIds so frontend maps them
return [{ id: 1, serverId: "db_uuid_123" }]
```

## CORS Configuration

Frontend is at: `http://localhost:3000`
Backend should accept:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

For production:
```
Access-Control-Allow-Origin: https://meapomuden.com
```

## Testing the Integration

### Manual Testing
```bash
# 1. Start frontend
npm run dev
# → http://localhost:3000

# 2. Go offline (DevTools > Network > Offline)
# 3. Add a measurement
# 4. Check IndexedDB
# 5. Go online
# 6. Verify sync request in Network tab
# 7. Check server database for record
```

### Automated Testing
```javascript
// Frontend test
test('Sync queue adds on offline', async () => {
  const queue = await db.getSyncQueueForUser(userId);
  expect(queue).toHaveLength(1);
  expect(queue[0].entity).toBe('measurement');
});

// Backend test
test('Batch sync creates measurements', async () => {
  const response = await api.post('/measurements/sync', {
    measurements: [
      { id: 1, serverId: undefined, data: {...} }
    ]
  });
  
  expect(response.status).toBe(200);
  expect(response.data.data[0].serverId).toBeDefined();
});
```

## Monitoring

### What to Monitor
1. **Sync Success Rate**: Track successful vs failed syncs
2. **Error Types**: What errors are most common?
3. **Offline Duration**: How long users are offline?
4. **API Response Times**: Track endpoint latencies
5. **Data Integrity**: Verify no duplicate measurements

### Example Monitoring
```python
# Backend monitoring
POST /metrics
{
  "event": "measurement_synced",
  "userId": "user_123",
  "count": 5,
  "duration_ms": 250,
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

**API Version**: 1.0  
**Last Updated**: 2024  
**Status**: Ready for Implementation
