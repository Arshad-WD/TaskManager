# Primetrade.ai | Institutional Trading Terminal

Primetrade.ai is a high-fidelity, industrial-grade task management and telemetry terminal designed for high-stakes financial operations. Built with a "Kinetic Obsidian" design philosophy, it features a glassmorphic aesthetic, real-time data synchronization, and institutional-grade security.

## 🌐 Live Deployment

- **Terminal Frontend (Vercel)**: [https://task-manager-five-pi-89.vercel.app/login](https://task-manager-five-pi-89.vercel.app/login)
- **Matrix API Engine (Render)**: [https://taskmanager-p4zn.onrender.com.app](https://taskmanager-p4zn.onrender.com.app)

## 🚀 Technical Stack

### Backend Infrastructure
- **Base**: Node.js & Express (ESM)
- **Database**: PostgreSQL (hosted on Neon) managed via Prisma ORM
- **Security**: JWT Authentication, Bcrypt password hashing, Helmet.js headers, and global Rate Limiting
- **Caching**: Valkey performance layer for dashboard responsiveness
- **Documentation**: Integrated Swagger UI for API exploration

### Frontend Architecture
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4.0 (utilizing the Kinetic Obsidian design tokens)
- **Icons**: Lucide React for consistent, high-fidelity iconography
- **State Management**: Optimistic UI updates for zero-latency user interaction

## ✨ Key Features

- **Command Dashboard**: A centralized hub for active task execution threads.
- **Optimistic Execution**: Task status toggles and deletions happen instantaneously on the UI, syncing with the database in the background.
- **System Telemetry**: A high-fidelity analytics panel visualizing node latency, execution volume, and network anomalies.
- **Admin Control Panel**: Restricted access view for managing registered system operators and clearance levels.
- **Responsive Sidebar**: A persistent, glassmorphic navigation system with role-based link visibility.

## 🛰️ Route Manifest

### Frontend Viewstates
- `/` -> Gateway Entry (Auto-redirect to login)
- `/login` -> System Authentication Terminal
- `/register` -> New Node Identity Creation
- `/dashboard` -> Primary Task Control Center
- `/dashboard/analytics` -> Real-time System Telemetry
- `/dashboard/admin` -> Restricted Operator Manifest (Admin Only)

### Backend API Endpoints (`/api/v1`)
- `POST /auth/register` -> Register a new operator node
- `POST /auth/login` -> Authorize portal access
- `GET /tasks` -> Retrieve active user threads
- `POST /tasks` -> Initialize new task parameters
- `PUT /tasks/:id` -> Modify task status (Toggle execution)
- `DELETE /tasks/:id` -> Terminate and scrub task record
- `GET /admin/users` -> Global operator review (Restricted)
- `GET /docs` -> Interactive API Documentation (Swagger)

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js (v18+)
- A PostgreSQL database (Neon recommended)
- A Valkey instance (hosted or local)
### 2. Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file based on the environment requirements:
   ```env
   DATABASE_URL="your-postgresql-url"
   JWT_SECRET="your-secure-secret"
   VALKEY_URL="your-valkey-connection-string"
   PORT=5000
   ```
4. Push the database schema: `npm run db:push`
5. Start the engine: `npm run dev`

### 3. Frontend Setup
1. `cd frontend`
2. `npm install`
3. Start the terminal UI: `npm run dev`
4. Access the portal at `http://localhost:3000`

## 🐳 Docker Orchestration

The entire Primetrade ecosystem is containerized for rapid deployment.

1. **Build and Launch**:
   ```bash
   docker-compose up --build
   ```
   This command will spin up the Node.js API, the Next.js Web Portal, and a local Redis/Valkey instance, linking them automatically.

## 🔑 Test Credentials (Administrator)

To explore the restricted Admin Panel and full Telemetry features, use the following clearance:

- **Identity**: `admin@primetrade.ai`
- **Passkey**: `admin123`

---