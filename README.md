

## Getting Started 🚀

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [Docker](https://www.docker.com/) (for PostgreSQL)
- [pnpm](https://pnpm.io/) (package manager)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp example.env .env
   ```
   Update the `.env` file with your configuration. For PostgreSQL, use these connection strings:
   ```env
   DB_PRISMA_URL="postgresql://emmo:emmo@localhost:5432/emmo?schema=public"
   DB_URL_NON_POOLING="postgresql://emmo:emmo@localhost:5432/emmo?schema=public&connection_limit=1"
   ```

4. **Start PostgreSQL with Docker**
   ```bash
   docker-compose up -d
   ```
   This will start a PostgreSQL container with:
   - Database name: `emmo`
   - Username: `emmo`
   - Password: `emmo`
   - Port: `5432`

5. **Set up the database**
   ```bash
   pnpm prisma db push
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```
   The application will be available at `http://localhost:3000`

### Docker Commands

- **Start PostgreSQL:**
  ```bash
  docker-compose up -d
  ```

- **Stop PostgreSQL:**
  ```bash
  docker-compose down
  ```

- **View PostgreSQL logs:**
  ```bash
  docker-compose logs postgres
  ```

- **Reset Database (removes all data):**
  ```bash
  docker-compose down -v
  docker-compose up -d
  ```

### Or Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmoinulmoin%2Fchadnext&env=DB_PRISMA_URL,DB_URL_NON_POOLING,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,NEXTAUTH_SECRET,NEXT_PUBLIC_APP_URL,RESEND_API_KEY,UPLOADTHING_SECRET,UPLOADTHING_APP_ID,UPLOADTHING_URL)

