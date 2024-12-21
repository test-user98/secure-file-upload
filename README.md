Here’s the updated documentation draft with the additional points you provided:

---
**NOTE: ADMIN EMAIL AND PASSWD: 
sipanijai@gmail.com / 123456**

## File Management API

This API provides a robust file management system with functionality for uploading, downloading, and sharing files. Role-based access control (RBAC) ensures that users can access only the features appropriate to their roles.

### Features
- **File Upload**: Users can upload files to the system.
- **File Download**: Files can be downloaded by authorized users or via shareable links.
- **File Sharing**: Files can be shared using secure links with an expiration time.
- **Role-Based Access Control (RBAC)**: Three roles are supported:
  - **Admin**: 
    - View all files uploaded by all users.
    - Delete any file.
  - **Regular User**: 
    - Upload and download files.
    - Share files with guests via shareable links.
  - **Guest**:
    - Download files shared via links, subject to expiration.
  - **Register**
    user can register, has an OTP sent via email, with 5mins expiration
    Using JWY for authorisation of user.

### Getting Started
#### Prerequisites
- **Node.js**: Install Node.js version >= 18.18.

#### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Install dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```

### Endpoints

#### Authentication
1. **Login**: 
   - **Endpoint**: `/api/login`
   - **Method**: `POST`
   - **Description**: Authenticates the user and returns a JWT token.
   - **Request Body**:
     ```json
     {
       "username": "string",
       "password": "string"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "string"
     }
     ```

#### File Management
2. **Upload File**:
   - **Endpoint**: `/api/files/upload`
   - **Method**: `POST`
   - **Description**: Uploads a file.
   - **Authorization**: Regular users and Admins.
3. **Download File**:
   - **Endpoint**: `/api/files/download/:fileId`
   - **Method**: `GET`
   - **Description**: Downloads a file by its ID.
   - **Authorization**: Based on role and sharing permissions.
4. **Share File**:
   - **Endpoint**: `/api/files/share`
   - **Method**: `POST`
   - **Description**: Generates a secure, shareable link with an expiration time.
   - **Authorization**: Regular users only.
5. **View All Files**:
   - **Endpoint**: `/api/files/all`
   - **Method**: `GET`
   - **Description**: Lists all files in the system.
   - **Authorization**: Admin only.
6. **Delete File**:
   - **Endpoint**: `/api/files/delete/:fileId`
   - **Method**: `DELETE`
   - **Description**: Deletes a file by its ID.
   - **Authorization**: Admin only.

### Notes
- **Shareable Links**: Guests can access files only through links with set expiration times.
- **RBAC Enforcement**: The system ensures strict enforcement of permissions based on user roles.

--- 

Let me know if there’s anything else to add or adjust!
