# NID API Documentation

## Overview

The NID (National ID) API is a mock/fake API endpoint that simulates fetching person details from a National ID database. This API generates consistent fake data based on the provided NID number, making it useful for testing and development purposes.

**Base URL:** `/api/nid`

**Version:** 1.0.0

---

## Table of Contents

- [Endpoints](#endpoints)
  - [GET /api/nid](#get-apinid)
  - [POST /api/nid](#post-apinid)
- [Request Parameters](#request-parameters)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Data Generation Logic](#data-generation-logic)
- [Usage Examples](#usage-examples)
- [Integration Guide](#integration-guide)

---

## Endpoints

### GET /api/nid

Retrieves fake person details based on the provided NID number via query parameters.

**URL:** `/api/nid?nid={nid_number}`

**Method:** `GET`

**Authentication:** Not required (for testing purposes)

**Query Parameters:**

| Parameter | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| `nid`     | string | Yes      | National ID number (10, 13, or 17 digits) |

**Example Request:**

```bash
GET /api/nid?nid=1234567890
```

---

### POST /api/nid

Retrieves fake person details based on the provided NID number via request body.

**URL:** `/api/nid`

**Method:** `POST`

**Authentication:** Not required (for testing purposes)

**Content-Type:** `application/json`

**Request Body:**

| Field | Type   | Required | Description                               |
| ----- | ------ | -------- | ----------------------------------------- |
| `nid` | string | Yes      | National ID number (10, 13, or 17 digits) |

**Example Request:**

```bash
POST /api/nid
Content-Type: application/json

{
  "nid": "1234567890"
}
```

---

## Request Parameters

### NID Number Format

The NID number must follow Bangladesh National ID card format:

- **Old Format:** 10 digits (e.g., `1234567890`)
- **New Format (Smart Card):** 13 digits (e.g., `1234567890123`)
- **New Format (Extended):** 17 digits (e.g., `12345678901234567`)

**Validation Regex:** `/^\d{10}$|^\d{13}$|^\d{17}$/`

**Examples of Valid NIDs:**

- `1234567890` ✅
- `1234567890123` ✅
- `12345678901234567` ✅

**Examples of Invalid NIDs:**

- `123456789` ❌ (9 digits)
- `abcd567890` ❌ (contains letters)
- `123-456-7890` ❌ (contains hyphens)

---

## Response Format

### Success Response

**Status Code:** `200 OK`

**Response Structure:**

```json
{
  "success": true,
  "data": {
    "nidNumber": "string",
    "name": "string",
    "nameInBangla": "string",
    "dob": "string (YYYY-MM-DD)",
    "gender": "string (male|female)",
    "bloodGroup": "string (A+|A-|B+|B-|AB+|AB-|O+|O-)",
    "maritalStatus": "string (single|married|divorced|widowed)",
    "fatherName": "string",
    "motherName": "string",
    "phone": "string",
    "email": "string",
    "addressLine1": "string",
    "addressLine2": "string",
    "city": "string",
    "state": "string",
    "postalCode": "string",
    "country": "string",
    "presentAddress": {
      "division": "string",
      "district": "string",
      "upazila": "string",
      "postOffice": "string",
      "postCode": "string",
      "address": "string"
    },
    "permanentAddress": {
      "division": "string",
      "district": "string",
      "upazila": "string",
      "postOffice": "string",
      "postCode": "string",
      "address": "string"
    },
    "photo": "string (URL)",
    "issueDate": "string (YYYY-MM-DD)",
    "expiryDate": "string (YYYY-MM-DD)"
  }
}
```

### Response Fields Description

| Field                   | Type    | Description                                         |
| ----------------------- | ------- | --------------------------------------------------- |
| `success`               | boolean | Indicates if the request was successful             |
| `data`                  | object  | Contains all person details                         |
| `data.nidNumber`        | string  | The NID number provided in the request              |
| `data.name`             | string  | Full name of the person                             |
| `data.nameInBangla`     | string  | Name in Bengali (currently same as English)         |
| `data.dob`              | string  | Date of birth in YYYY-MM-DD format                  |
| `data.gender`           | string  | Gender (male or female)                             |
| `data.bloodGroup`       | string  | Blood group (A+, A-, B+, B-, AB+, AB-, O+, O-)      |
| `data.maritalStatus`    | string  | Marital status (single, married, divorced, widowed) |
| `data.fatherName`       | string  | Father's full name                                  |
| `data.motherName`       | string  | Mother's full name                                  |
| `data.phone`            | string  | Phone number with country code (+880)               |
| `data.email`            | string  | Email address                                       |
| `data.addressLine1`     | string  | Address line 1 (House and Road number)              |
| `data.addressLine2`     | string  | Address line 2 (Area)                               |
| `data.city`             | string  | City name                                           |
| `data.state`            | string  | State/District name                                 |
| `data.postalCode`       | string  | Postal code                                         |
| `data.country`          | string  | Country code (BD for Bangladesh)                    |
| `data.presentAddress`   | object  | Present address details                             |
| `data.permanentAddress` | object  | Permanent address details                           |
| `data.photo`            | string  | URL to generated avatar image                       |
| `data.issueDate`        | string  | NID issue date                                      |
| `data.expiryDate`       | string  | NID expiry date                                     |

---

## Error Handling

### Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "error": "string",
  "message": "string"
}
```

### Common Errors

#### 1. Missing NID Number

**Status Code:** `400 Bad Request`

**Response:**

```json
{
  "success": false,
  "error": "NID number is required",
  "message": "Please provide a valid NID number"
}
```

**Cause:** No NID parameter provided in GET request or request body in POST request.

---

#### 2. Invalid NID Format

**Status Code:** `400 Bad Request`

**Response:**

```json
{
  "success": false,
  "error": "Invalid NID format",
  "message": "NID must be 10, 13, or 17 digits"
}
```

**Cause:** NID number doesn't match the required format (not 10, 13, or 17 digits).

---

#### 3. Internal Server Error

**Status Code:** `500 Internal Server Error`

**Response:**

```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Failed to fetch NID details"
}
```

**Cause:** Unexpected error during processing.

---

## Data Generation Logic

### Consistency

The API uses a **deterministic algorithm** to generate fake data:

- The same NID number will **always** return the same person details
- Data is generated using the NID as a seed value
- This ensures consistent testing and development experience

### Generation Process

1. **Seed Creation:** NID string is converted to a numeric seed by summing character codes
2. **Deterministic Random:** Seed is used to generate consistent "random" values
3. **Data Selection:** Values are selected from predefined arrays using the seeded random function

### Data Sources

The API generates data from the following predefined lists:

**First Names:**

- Mohammad, Abdul, Md, Ahmed, Fatima, Ayesha, Kamal, Rahim, Jamal, Nasrin, Shakib, Tasnim, Rafiq, Sultana, Hasan

**Last Names:**

- Rahman, Hossain, Ahmed, Ali, Khan, Islam, Uddin, Begum, Chowdhury, Akter, Kabir, Sultana, Hassan, Mahmud, Miah

**Cities:**

- Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, Barisal, Rangpur, Mymensingh, Comilla, Narayanganj

**Blood Groups:**

- A+, A-, B+, B-, AB+, AB-, O+, O-

**Phone Prefixes (Bangladesh):**

- 017, 018, 019, 016, 015, 013

### Generated Values

- **Age:** Generated between 18-80 years
- **Phone:** Bangladesh format (+880 followed by operator code and number)
- **Email:** Generated from name (lowercase) + @example.com
- **Address:** House number, road number, and area
- **Photo:** Avatar generated using [DiceBear API](https://dicebear.com) with NID as seed
- **Dates:** Issue date and expiry date based on current year

---

## Usage Examples

### Example 1: Using cURL (GET)

```bash
curl "http://localhost:3000/api/nid?nid=1234567890"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "nidNumber": "1234567890",
    "name": "Mohammad Rahman",
    "nameInBangla": "Mohammad Rahman",
    "dob": "1985-03-15",
    "gender": "male",
    "bloodGroup": "B+",
    "maritalStatus": "married",
    "fatherName": "Abdul Khan",
    "motherName": "Fatima Begum",
    "phone": "+8801712345678",
    "email": "mohammad.rahman@example.com",
    "addressLine1": "House 45, Road 12",
    "addressLine2": "Mirpur",
    "city": "Dhaka",
    "state": "Dhaka",
    "postalCode": "1216",
    "country": "BD",
    "presentAddress": {
      "division": "Dhaka",
      "district": "Dhaka",
      "upazila": "Mirpur",
      "postOffice": "Mirpur",
      "postCode": "1216",
      "address": "House 45, Road 12, Mirpur"
    },
    "permanentAddress": {
      "division": "Dhaka",
      "district": "Dhaka",
      "upazila": "Mirpur",
      "postOffice": "Mirpur",
      "postCode": "1216",
      "address": "House 45, Road 12, Mirpur"
    },
    "photo": "https://api.dicebear.com/7.x/avataaars/svg?seed=1234567890",
    "issueDate": "2015-01-01",
    "expiryDate": "2035-12-31"
  }
}
```

---

### Example 2: Using cURL (POST)

```bash
curl -X POST http://localhost:3000/api/nid \
  -H "Content-Type: application/json" \
  -d '{"nid": "1234567890123"}'
```

---

### Example 3: Using JavaScript (Fetch API)

```javascript
// GET Request
async function fetchNIDDetails(nid) {
  try {
    const response = await fetch(`/api/nid?nid=${nid}`);
    const data = await response.json();

    if (data.success) {
      console.log("Person Details:", data.data);
      return data.data;
    } else {
      console.error("Error:", data.error);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
}

// Usage
fetchNIDDetails("1234567890");
```

```javascript
// POST Request
async function fetchNIDDetailsPost(nid) {
  try {
    const response = await fetch("/api/nid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nid }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("Person Details:", data.data);
      return data.data;
    } else {
      console.error("Error:", data.error);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
}

// Usage
fetchNIDDetailsPost("1234567890");
```

---

### Example 4: Using Axios

```javascript
import axios from "axios";

// GET Request
async function getNIDDetails(nid) {
  try {
    const response = await axios.get("/api/nid", {
      params: { nid },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
}

// POST Request
async function postNIDDetails(nid) {
  try {
    const response = await axios.post("/api/nid", { nid });
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
}

// Usage
getNIDDetails("1234567890")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

---

### Example 5: React Component Integration

```typescript
import { useState } from "react";

interface NIDData {
  nidNumber: string;
  name: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  // ... other fields
}

export function NIDLookup() {
  const [nid, setNid] = useState("");
  const [data, setData] = useState<NIDData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    if (!nid) {
      setError("Please enter a NID number");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(`/api/nid?nid=${nid}`);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to fetch NID details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="text" value={nid} onChange={(e) => setNid(e.target.value)} placeholder="Enter NID number" />
      <button onClick={handleLookup} disabled={loading}>
        {loading ? "Loading..." : "Lookup"}
      </button>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="details">
          <h3>{data.name}</h3>
          <p>NID: {data.nidNumber}</p>
          <p>DOB: {data.dob}</p>
          <p>Gender: {data.gender}</p>
          <p>Blood Group: {data.bloodGroup}</p>
          <p>Phone: {data.phone}</p>
          <p>Email: {data.email}</p>
          <img src={data.photo} alt="Profile" />
        </div>
      )}
    </div>
  );
}
```

---

## Integration Guide

### Step 1: Basic Integration

```typescript
// services/nid.service.ts
export class NIDService {
  private baseURL = "/api/nid";

  async lookup(nid: string) {
    const response = await fetch(`${this.baseURL}?nid=${nid}`);
    return response.json();
  }

  async verify(nid: string) {
    const result = await this.lookup(nid);
    return result.success;
  }
}
```

### Step 2: Form Autofill

```typescript
// Example: Auto-fill user registration form
async function autoFillFromNID(nid: string) {
  const response = await fetch(`/api/nid?nid=${nid}`);
  const result = await response.json();

  if (result.success) {
    const { data } = result;

    // Fill form fields
    document.getElementById("name").value = data.name;
    document.getElementById("dob").value = data.dob;
    document.getElementById("gender").value = data.gender;
    document.getElementById("bloodGroup").value = data.bloodGroup;
    document.getElementById("phone").value = data.phone;
    document.getElementById("email").value = data.email;
    document.getElementById("address").value = data.addressLine1;
    document.getElementById("city").value = data.city;
    document.getElementById("postalCode").value = data.postalCode;
    document.getElementById("fatherName").value = data.fatherName;
    document.getElementById("motherName").value = data.motherName;
  }
}
```

### Step 3: Validation Helper

```typescript
// utils/nid-validator.ts
export function validateNID(nid: string): boolean {
  const nidRegex = /^\d{10}$|^\d{13}$|^\d{17}$/;
  return nidRegex.test(nid);
}

export function getNIDFormat(nid: string): string {
  if (!validateNID(nid)) return "invalid";

  switch (nid.length) {
    case 10:
      return "old";
    case 13:
      return "smart-card";
    case 17:
      return "extended";
    default:
      return "invalid";
  }
}
```

---

## Performance

- **Response Time:** ~500ms (simulated delay)
- **Consistency:** Same NID always returns same data
- **Rate Limiting:** Not implemented (add if needed for production)

---

## Security Considerations

⚠️ **Important:** This is a **mock API for testing purposes only**.

### Production Recommendations:

1. **Authentication:** Implement proper authentication/authorization
2. **Rate Limiting:** Add rate limiting to prevent abuse
3. **Encryption:** Use HTTPS in production
4. **Data Privacy:** Never expose real NID data through such endpoints
5. **Access Control:** Restrict access to authorized users only
6. **Audit Logging:** Log all NID lookup requests
7. **Input Sanitization:** Additional validation and sanitization

---

## Testing

### Unit Test Example

```typescript
describe("NID API", () => {
  it("should return consistent data for same NID", async () => {
    const nid = "1234567890";
    const response1 = await fetch(`/api/nid?nid=${nid}`);
    const response2 = await fetch(`/api/nid?nid=${nid}`);

    const data1 = await response1.json();
    const data2 = await response2.json();

    expect(data1).toEqual(data2);
  });

  it("should validate NID format", async () => {
    const response = await fetch("/api/nid?nid=123"); // Invalid
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });
});
```

---

## Changelog

### Version 1.0.0 (2025-11-08)

- Initial release
- GET and POST endpoints
- Deterministic fake data generation
- Bangladesh NID format validation
- Comprehensive error handling

---

## Support

For issues or questions, please contact the development team or create an issue in the project repository.

---

## License

This API is part of the Vaccine Lab project and is intended for development and testing purposes only.
