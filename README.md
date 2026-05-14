# Seat Reservation System

This project is a practical assignment for an Object-Oriented Programming (C++) course. Its primary objective is to integrate a C++ algorithm into a modern web application using WebAssembly technology. The current stage of the project includes a fully prepared infrastructure and user interface, ready for the upcoming algorithm deployment.

## Technical Architecture

* **User Interface:** Built with the Next.js framework and deployed on the Vercel platform. The initial component structure and base data were generated using the v0 tool.
* **Data Management:** The Supabase platform is utilized as a PostgreSQL database. Real-time functionality ensures instantaneous seat status updates across different clients.
* **Security:** Requests are handled via RPC (Remote Procedure Call) functions with a Row-Level Locking mechanism to prevent race conditions and double bookings.
* **Computation Layer:** A best-seat search algorithm written in C++ (currently in development).

## Functionality

* **Seat Viewing and Reservation:** An interactive arena map allows users to select and reserve seats.
* **User Data:** Contact information (email and phone number) is collected during reservation. The system does not perform user authentication, and data validation is limited to basic email syntax checking (@ symbol), consistent with the requirements of an academic prototype.
* **Best Seat Selection:** Currently, a TypeScript code simulation is active. In the final version, this part will be replaced by the C++ algorithm compiled into WebAssembly (WASM).

## Project Goal and C++ Integration

The main focus of this project is to demonstrate the application of Object-Oriented Programming principles in C++ to solve optimization problems (seat grouping, best visibility calculations).

The current result serves as systemic preparation:
1. Preparation of data structures (JSON format between JS and C++).
2. Ensuring stability of backend transactions.
3. Creation of a frontend logical pipeline into which the WASM module will be inserted.

## Setup

1. Install dependencies:
   ```bash
   npm install

2. Configure environment variables in .env.local:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY

3. Generate production build:
   ```bash
   npm run dev

4. Generate production build:
   ```bash
   npm run build
   
