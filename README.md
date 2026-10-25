# MaliCrest

MaliCrest is a property management application designed to simplify rent payment tracking and rent auditing. The project aims to help property managers and landlords manage rental payments more efficiently and maintain clear financial records.

## Features

- **User Authentication:** User registration and login.
- **Password Reset:** Password reset functionality with frontend validation and backend verification.
- **Rent Payment Management:** Support for managing and tracking rent payments.
- **Rent Auditing:** Maintain records that help track and verify rental transactions.

## Technology Stack

### Backend
- Laravel (PHP)
- MySQL
- Laravel Sanctum for API authentication

### Frontend
- React
- JavaScript (ES6+)
- Tailwind CSS

## Project Structure

The application is divided into two main parts:

- `backend/` — Laravel REST API and database operations.
- `frontend/` — React user interface.

## Getting Started

### Prerequisites

Install the following before running the project:

- PHP and Composer
- Node.js and npm
- MySQL
- Laravel-compatible local development environment, such as XAMPP

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install PHP dependencies:

   ```bash
   composer install
   ```

3. Create your environment file:

   ```bash
   cp .env.example .env
   ```

   On Windows, you can copy `.env.example` to `.env` manually.

4. Generate the application key:

   ```bash
   php artisan key:generate
   ```

5. Configure your database credentials in `.env`.

6. Run database migrations:

   ```bash
   php artisan migrate
   ```

7. Start the Laravel development server:

   ```bash
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Testing

Run backend tests with:

```bash
php artisan test
```

Run frontend tests using the test command configured in the frontend's `package.json`, if available.

## Project Status

MaliCrest is under active development, with the initial focus on authentication, rent payment management, and rent auditing.

## Future Improvements

- Landlord and property manager dashboards.
- Rental unit and tenant management.
- Improved rent payment reports and audit trails.
- Additional authentication and account security improvements.

## License

No license has been specified yet.
