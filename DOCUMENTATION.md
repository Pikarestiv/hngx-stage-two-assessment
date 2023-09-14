# Person API Documentation

## API Endpoints

### POST /api

Creates a new person. The name and email must be unique, and the name is case insensitive.

**Request Body:**

```json
{
  "name": "string",
  "age": "number", // Optional
  "email": "string" // Optional
}
```


**Response:**

```json
{
  "person": {
    "_id": "string",
    "name": "string",
    "age": "number",
    "email": "string"
  },
  "message": "User created successfully",
}
```


### GET /api/:name

Fetches the details of a person by their name. The name is case insensitive.

**Response:**

```json
{
  "person": {
    "_id": "string",
    "name": "string",
    "age": "number",
    "email": "string"
  },
  "message": "User found",
}
```


### PUT /api/:name

Updates the details of a person by their name. The name is case insensitive.

**Request Body:**

```json
{
  "name": "string",
  "age": "number",
  "email": "string"
}
```


**Response:**

```json
{
  "person": {
    "_id": "string",
    "name": "string",
    "age": "number",
    "email": "string"
  },
  "message": "User details updated successfully",
}
```


### DELETE /api/:name

Deletes a person by their name. The name is case insensitive.

**Response:**

```json
{
  "message": "Person deleted successfully"
}
```


## Error Handling

If an error occurs, the API will respond with an error message in the following format:

```json
{
  "message": "string"
}
```


## Assumptions

The following assumptions were made:  

1. Multiple users cannot have the same email (E-mail address is unique).
2. Multiple users cannot have the same name (name is unique).
3. Name is case insensitive.
4. Only name is mandatory, other fields are optional.











