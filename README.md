# Quickare API

## Overview

Quickare API is a backend service built with Fastify and TypeScript. It provides APIs for managing hospital data and other related functionalities. The project is designed with scalability, maintainability, and developer productivity in mind.

## Features

- **Fastify server**: High-performance HTTP server framework.
- **TypeScript support**: Strongly typed codebase for better developer experience.
- **Environment variable management**: Configuration using dotenv.
- **Linting**: Code quality checks with ESLint.
- **Testing**: Unit and integration tests with Jest.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: Version 16 or higher.
- **pnpm**: A fast, disk space-efficient package manager.

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd quickare_api_test

# Install dependencies
pnpm install
```

### Configuration

1. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your environment-specific variables.

### Development

Start the development server:

```bash
pnpm run dev
```

The server will start on the port specified in your `.env` file (default: `3000`).

### Build

Compile the TypeScript code to JavaScript:

```bash
pnpm run build
```

The compiled output will be available in the `dist/` directory.

### Testing

Run the test suite:

```bash
pnpm test
```

This will execute all unit and integration tests using Jest.

### Linting

Check the code for linting errors:

```bash
pnpm run lint
```

## Folder Structure

The project is organized as follows:

- `src/` - Source code
  - `fetching/` - Modules for data fetching
  - `hospitals/` - Modules for hospital-related functionality
- `tests/` - Test cases for the application
- `dist/` - Compiled output (generated after build)
- `docs/` - Documentation files

## Scripts

The following scripts are available in the `package.json`:

- `dev`: Start the development server
- `build`: Compile TypeScript to JavaScript
- `test`: Run tests with Jest
- `lint`: Run ESLint

## API Documentation

### Endpoints

#### Hospitals

- **GET /hospitals**: Retrieve a list of hospitals.
- **POST /hospitals**: Add a new hospital.
- **GET /hospitals/:id**: Retrieve details of a specific hospital.
- **PUT /hospitals/:id**: Update hospital details.
- **DELETE /hospitals/:id**: Delete a hospital.

Refer to the `docs/hospitals.md` file for detailed API documentation.

## License

This project is licensed under the GPLv3 License. See the `LICENSE` file for details.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and concise messages.
4. Submit a pull request.

## Support

For any issues or questions, please open an issue in the repository or contact the maintainers.