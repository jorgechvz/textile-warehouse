# Stitchtly App using LoRaWAN Network

## Overview

Stitchtly is a **Textile Inventory Management Application** built to utilize **LoRaWAN (Long Range Wide Area Network)** for product tracking and monitoring. The app allows users to manage product inventories, monitor stock levels, and receive notifications when stock runs low. It integrates a LoRaWAN network for transmitting data from physical product scanners to a gateway, which then forwards the information to the LoRa server. The application communicates with the LoRa server via an API to retrieve and update stock data in real-time.

---

### Key Features:

- **LoRaWAN Integration**: Uses LoRaWAN technology to transmit product scan data from nodes (connected to scanners) to a gateway, and then to the LoRa server.
- **Real-time Inventory Updates**: When a product is scanned, the stock is automatically reduced by 1 in the inventory.
- **Low Stock Notifications**: The app sends email notifications to the admin or warehouse manager when the stock level of a product reaches a predefined threshold.
- **Dashboard Interface**: A user-friendly dashboard allows admins and managers to monitor stock levels, recent transactions, and overall product statistics.
- **Built with React**: The frontend of the application is built using **React**, providing a modern and responsive interface.
- **Backend in NestJS or Express**: The backend is planned to be implemented using **NestJS** or **Express**, facilitating API interactions and business logic.

---

## Technology Stack

### Frontend:

- **React**: The frontend is developed using React, offering a dynamic user interface with real-time data updates.
- **TanStack Query (React Query)**: Used to handle API requests and data fetching efficiently.
- **TypeScript**: Ensures type safety across the application for both frontend and backend.

### Backend:

- **NestJS** or **Express** (Planned): The backend will be built using **NestJS** or **Express** to handle API requests, manage database interactions, and process business logic.

### Database:

- The database system will store product information, stock levels, and user data. It could be implemented using any relational database like **PostgreSQL** or a NoSQL database like **MongoDB**.

### LoRaWAN Integration:

- **LoRa Nodes and Gateways**: Physical product scanners connected to **LoRa nodes** will send data to a **LoRaWAN gateway**, which forwards the data to the **LoRa server**.
- **LoRa Server API**: The application communicates with the LoRa server via its API to retrieve product scan data and update inventory.

### Email Notifications:

- **Email Service**: When a product's stock level falls below a set threshold, the application will trigger an email notification to the admin or the assigned personnel.

---

## How the System Works

1. **Scanning a Product**: A product is scanned using a scanner connected to a **LoRa node**.
2. **Data Transmission**: The data is sent from the LoRa node to the **LoRaWAN gateway** and then forwarded to the **LoRa server**.
3. **Receiving Data**: The server receives the scanned product data through the LoRa server's API and updates the corresponding stock in the database.
4. **Stock Update**: The stock for the scanned product is automatically reduced by 1.
5. **Low Stock Notification**: If the stock of a product reaches a predefined threshold, the system triggers an email notification to the admin.
6. **Real-time Monitoring**: Admins can monitor stock levels, recent transactions, and other statistics through a dashboard.

--- 

## Features to be Implemented

- **Product Management**: Add, edit, and remove products from the inventory.
- **Stock Tracking**: Automatically track stock levels and reflect changes in real time.
- **User Management**: Role-based access control for admins and other users.
- **Email Notifications**: Automatic email alerts when stock levels reach the minimum threshold.
- **LoRa Server Integration**: Fetch real-time scan data from the LoRa server API to update stock.
- **Reports and Analytics**: Generate reports on inventory status, product movements, and low stock trends.

---

## Bar code scanner mobile app

If you want to use the mobile app to scan barcodes to update inventory, you can download the app from here (for now, only Android is supported):

- [Stitchtly BarScanner Android App](https://expo.dev/accounts/jorgechvz98/projects/stitchtly-barscanner/builds/683545fb-a67b-443d-9975-231ca283102e)

--- 

## Getting Started

### Prerequisites:

- **Node.js**: Ensure you have Node.js installed (v20+ recommended).
- **npm** or **yarn**: Use npm or yarn for managing dependencies.
- **LoRa Server API Access**: You'll need access to the LoRa server's API to retrieve product scan data.

### Installation:

1. Clone the repository:

   ```bash
   git clone https://github.com/jorgechvz/textile-warehouse.git
   ```

2. Install dependencies for the frontend:

   ```bash
   cd frontend
   npm install
   npm run build
   ```

3. Start the React app:

   ```bash
   npm run dev
   ```

4. (Backend Setup to be done once implemented with NestJS or Express).

### Backend Setup (Coming Soon):

- The backend will handle API requests, manage inventory, and process email notifications. The backend can be implemented using NestJS or Express based on the project's requirements.

### Environment Variables:
****
Ensure you have the following environment variables configured:

- LORA_API_URL: The base URL for the LoRaWAN server API.
- EMAIL_SERVICE_API_KEY: API key for the email service to send notifications.
- DATABASE_URL: The connection string for the database.

### API Endpoints

- GET /api/products: Fetch all products from the inventory.
- POST /api/products/scan: Update stock when a product is scanned (data retrieved from LoRa server).
- POST /api/notifications: Send email notifications when stock is low.

### Future Enhancements

- Detailed Analytics: Visualize inventory trends and generate predictive analytics.
- Chatbot Integration: Allow customers to communicate with the app through a chatbot.

### License

This project is licensed under the MIT License.
