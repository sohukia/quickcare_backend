# Hospitals API Feature

This module provides endpoints and utilities for managing and retrieving hospital data, including sorting, filtering, and searching hospitals based on various criteria.

## Endpoints

### 1. `GET /api/hospitals`
Returns a paginated and scored list of all hospitals.

**Query Parameters:**
- `page` (optional, default: 0): Page number (0-based).
- `limit` (optional, default: all): Number of hospitals per page.

**Response:**
```json
{
  "hospitals": [ ... ],
  "page": 0,
  "limit": 10,
  "total": 18
}
```

---

### 2. `GET /api/hospitals/:emergency`
Returns a paginated and scored list of hospitals filtered by emergency type (speciality).

**Path Parameters:**
- `emergency`: The emergency type or speciality (e.g., `cardiology`, `trauma`, `general`).

**Query Parameters:**
- `page` (optional)
- `limit` (optional)

**Response:** Same as above.

---

### 3. `POST /api/hospitals/search`
Searches hospitals by name.

**Request Body:**
```json
{
  "query": "Hospital A"
}
```

**Response:**
Array of hospitals matching the query, sorted by score.

---

## Utilities

- **Sorting:** Hospitals are scored based on wait time, travel time, public/private status, and number of specialties.
- **Pagination:** Results can be paginated using `page` and `limit` query parameters.
- **Filtering:** Filter hospitals by emergency type (speciality).
- **Formatting:** Utility to format travel time from milliseconds to `h m s` format.

---

## Data Model

See `hospitals.model.ts` for TypeScript interfaces describing the hospital data structure.

---

## Example Usage

- To get the top 5 hospitals for `cardiology` emergencies:
  ```
  GET /api/hospitals/cardiology?limit=5
  ```

- To search for hospitals with "Saint" in the name:
  ```
  POST /api/hospitals/search
  {
    "query": "Saint"
  }
  ```

---

## Development

- All logic is implemented in TypeScript.
- See `hospitals.controller.ts` for route handlers.
- See `hospitals.service.ts` for sorting, filtering, and pagination logic.
- See `hospitals.utils.ts` for utility functions.

