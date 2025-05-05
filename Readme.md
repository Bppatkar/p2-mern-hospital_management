🏥 Clinic API – Route Documentation
Base URL:
# server

## Folder Structure

![image](https://github.com/user-attachments/assets/4b91816b-7b5b-41db-808c-e7defebb8eb4)




# API Testing with Postman

This document provides a guide for testing the Patient, Doctor, and Appointment API endpoints using Postman. The base URL for all API requests is `http://localhost:8000/api/v1`.

## Getting Started

1.  **Install Postman:** If you haven't already, download and install Postman from [https://www.postman.com/downloads/](https://www.postman.com/downloads/).
2.  **Import Collection (Optional):** You can manually create the requests as described below, or you can potentially import a Postman Collection if one is available.

## Patients Routes (`/api/v1/patients`)

### 1. Get All Patients

* **Method:** `GET`
* **URL:** `http://localhost:8000/api/v1/patients/`
* **Body Required:** No

**Steps in Postman:**

1.  Create a new request.
2.  Select the `GET` method.
3.  Enter the URL: `http://localhost:8000/api/v1/patients/`
4.  Click **Send**.

**Expected Response:** A JSON array of all patient objects.

### 2. Add a Patient

* **Method:** `POST`
* **URL:** `http://localhost:8000/api/v1/patients/add`
* **Body Required:** Yes (JSON)

**Steps in Postman:**

1.  Create a new request.
2.  Select the `POST` method.
3.  Enter the URL: `http://localhost:8000/api/v1/patients/add`
4.  Go to the **Body** tab.
5.  Select the **raw** option and choose **JSON** from the dropdown.
6.  Enter the following JSON payload (you can modify the values):

    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "phoneNumber": "9876543210",
        "dateOfBirth": "1990-01-01",
        "address": "New York"
    }
    ```
7.  Click **Send**.

**Expected Response:** A JSON object representing the newly added patient, likely including a unique ID.

### 3. Update a Patient

* **Method:** `PATCH`
* **URL:** `http://localhost:8000/api/v1/patients/update/:id`
* **Body Required:** Yes (JSON)

**Steps in Postman:**

1.  Create a new request.
2.  Select the `PATCH` method.
3.  Replace `:id` in the URL with the actual ID of the patient you want to update (e.g., `http://localhost:8000/api/v1/patients/update/66375797b4c0fce98dfc78f4`).
4.  Go to the **Body** tab.
5.  Select the **raw** option and choose **JSON** from the dropdown.
6.  Enter the JSON payload with the fields you want to update (e.g., to update only the phone number):

    ```json
    {
        "name": "maria lofte crow",
        "email": "mariaLofteUAE@yahoo.com",
        "phoneNumber": "9888111555",
        "dateOfBirth": "1992-11-01",
        "address": "SWE"
    }
    ```
7.  Click **Send**.

**Expected Response:** A JSON object representing the updated patient.

### 4. Delete a Patient

* **Method:** `DELETE`
* **URL:** `http://localhost:8000/api/v1/patients/delete/:id`
* **Body Required:** No

**Steps in Postman:**

1.  Create a new request.
2.  Select the `DELETE` method.
3.  Replace `:id` in the URL with the actual ID of the patient you want to delete (e.g., `http://localhost:8000/api/v1/patients/delete/66375797b4c0fce98dfc78f4`).
4.  Click **Send**.

**Expected Response:** A success message or status code indicating that the patient has been deleted.

## Doctors Routes (`/api/v1/doctors`)

The testing process for the Doctors routes is very similar to the Patients routes. Simply replace `/patients/` with `/doctors/` in the URLs and use the corresponding request bodies.

### 1. Get All Doctors

* **Method:** `GET`
* **URL:** `http://localhost:8000/api/v1/doctors/`

### 2. Add a Doctor

* **Method:** `POST`
* **URL:** `http://localhost:8000/api/v1/doctors/add`
* **Body (Example):**

    ```json
    {
        "name": "Dr. Smith",
        "email": "drsmith@example.com",
        "phoneNumber": "9123456789",
        "specialization": "Cardiologist",
        "experience" : 1
    }
    ```

### 3. Update a Doctor

* **Method:** `PATCH`
* **URL:** `http://localhost:8000/api/v1/doctors/update/:id`
* **Body (Example - updating specialization):**

    ```json
    {
        "name": "Dr. Smith jha",
        "email": "drsmithjha@example.com",
        "phoneNumber": "9128955555",
        "specialization": "Cardiologist",
        "experience" : 5
    }
    ```

### 4. Delete a Doctor

* **Method:** `DELETE`
* **URL:** `http://localhost:8000/api/v1/doctors/delete/:id`

## Appointments Routes (`/api/v1/appointments`)

Follow the same pattern for testing the Appointments routes, replacing `/patients/` with `/appointments/` in the URLs and using the provided request body structure.

### 1. Get All Appointments

* **Method:** `GET`
* **URL:** `http://localhost:8000/api/v1/appointments/`

### 2. Add Appointment

* **Method:** `POST`
* **URL:** `http://localhost:8000/api/v1/appointments/add`
* **Body (Example):**

    ```json
    {
        "patientName": "maria lofte crow",
        "doctorName": "Dr. Smith jha",
        "appointmentDate": "2025-05-07",
        "appointmentTime": "14:30",
        "appointmentType": "consultation",
        "doctorId": "68187a0f7aa72cf543209b15",
        "patientId": "681877787aa72cf543209b0b",
        "prescription": "Check blood pressure"
    }
    ```

    **Note:** You will need valid `patientId` and `doctorId` values for this request to succeed. You can obtain these IDs by first adding patients and doctors. The `appointmentDate` should be in ISO 8601 format.

### 3. Update Appointment

* **Method:** `PATCH`
* **URL:** `http://localhost:8000/api/v1/appointments/update/:id`
* **Body (Example - updating the description):**

    ```json
    {
        "appointmentDate": "2025-05-12",
        "appointmentTime": "14:30",
        "appointmentType": "video",
        "prescription": "normal checkup"
    }
    ```

### 4. Delete Appointment

* **Method:** `DELETE`
* **URL:** `http://localhost:8000/api/v1/appointments/delete/:id`

## Important Considerations

* **Server Setup:** Ensure that your backend server is running and accessible at `http://localhost:8000`.
* **Path Parameters:** Remember to replace the `:id` placeholder in the `UPDATE` and `DELETE` requests with the actual IDs of the resources you want to modify or delete.
* **Request Bodies:** Pay close attention to the required request body for `POST` and `PATCH` requests. Ensure the JSON structure and data types match the API specifications.
* **Error Handling:** While this guide focuses on successful requests, remember to observe how the API handles errors (e.g., invalid input, resource not found) by sending malformed requests or trying to access non-existent resources.
* **Authentication/Authorization:** These routes do not explicitly mention authentication or authorization. In a real-world scenario, you might need to include headers (e.g., API keys, tokens) in your requests for secure access.
* **Data Dependencies:** Be aware that some operations might depend on others. For example, you need to add a patient and a doctor before you can create an appointment.
