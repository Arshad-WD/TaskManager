
BACKEND:
    Nodejs + Express 
    PostgreSQL
    JWT
    bcrypt
    Primsa or Sequelize(ORM)

FRONTEND:
    NextJS

ADDITIONAL FEATURE:
    redis(caching)
    Docker ()
    Winston (logs)



API DESING:
    AUTH:
        POST  /api/v1/auth/register
        POST  /api/v1/auth/login

    TASK:   
        GET  /api/v1/tasks
        POST  /api/v1/tasks
        PUT  /api/v1/tasks/:id
        DELETE  /api/v1/tasks/:id

    ADMIN:
        GET     /api/v1/admin/users



DATABASE DESIGN
Users:
    id
    email
    password
    role

TASKS:
    id
    title
    description
    userId(FK)

VALIDATION:
    joi Or ZOD


FRONTEND:
    Pages:
        Register
        Login
        Dashboard

    Features:
        Store JWT in localStorage
        Attach token in headers
        Show API responses

SWAGGER:
    swager-ui-express


LIBRARIES USED:
    EXPRESS
    CORS
    DOTENV
    JSONWEBTOKEN
    BCRYPT
    PRISMA
    @PRISMA/CLIENT
    ZOD - validation
    MORGAN - security header
    HELMET - logs