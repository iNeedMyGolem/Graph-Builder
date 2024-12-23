# Graph Builder Application

## Overview
The Graph Builder application is a web-based tool that allows users to create, manipulate, and visualize graph structures. Users can add nodes (circle or rectangle), create edges between nodes, and manage graph elements through a user-friendly interface. The application is built with React and Next.js, utilizing TypeScript for type safety, and can be deployed using Docker.

## Features
- Add and delete nodes with customizable labels (limited to 12 characters).
- Create edges between nodes with a "deletable" functionality.
- Prevent self-loop edges (edges from a node to itself).
- Highlight selected nodes and edges for better visualization.
- Interactive user interface with real-time graph updates.

---

## Prerequisites

Before running the application, ensure that you have the following installed on your system:

1. **Node.js** (v16 or later) - [Download here](https://nodejs.org/)
2. **npm** or **yarn** - Installed with Node.js by default.
3. **Docker** (if you plan to run the application in a container) - [Download here](https://www.docker.com/)

---

## Local Setup

### Clone the Repository
```bash
git clone https://github.com/iNeedMyGolem/Graph-Builder.git
cd Graph-Builder
```

### Install Dependencies
Install the necessary dependencies using npm or yarn:
```bash
yarn install
```

### Start the Development Server
To run the application locally, use the following command:
```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

---

## Docker Setup

### Build the Docker Image
Create a Docker image for the application using the provided `Dockerfile`:
```bash
docker-compose build --no-cache
```

### Run the Docker Container
Run the Docker container:
```bash
docker-compose up
```

The application will now be available at `https://localhost:8080` or `http://localhost:8081`.

This application uses a self-signed SSL certificate for HTTPS support.
---

## Scripts

### Development
```bash
yarn run dev
```
Starts the development server.

### Build
```bash
yarn run build
```
Builds the application for production.

### Start
```bash
yarn start
```
Runs the application in production mode. Ensure that you have built the application first.
