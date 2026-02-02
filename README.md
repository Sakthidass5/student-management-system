# student-management-system

student-management-system/

│── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Student.js
│   │   └── AuditLog.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── students.js
│   │   ├── excel.js
│   │   └── analytics.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── audit.js
│   └── utils/
│       └── upload.js
│   └── .env




frontend/src/
├── api/
│   └── axios.js
├── redux/
│   └── authSlice.js
├── components/
│   ├── StudentForm.js
│   ├── StudentList.js
│   ├── Dashboard.js
│   └── AuditLogs.js
├── pages/
│   ├── Login.js
│   └── Students.js
├── App.js
└── index.js


backend/
  controllers/
    authController.js
    studentController.js
  models/
    User.js
    Student.js
    AuditLog.js
  routes/
    authRoutes.js
    studentRoutes.js
  middlewares/
    authMiddleware.js
    roleMiddleware.js
    errorHandler.js
  services/
    excelService.js
    dashboardService.js
  utils/
    logger.js
    db.js
  config/
    env.js
  app.js
  server.js


frontend/
  src/
    components/
      Navbar.jsx
      FormInput.jsx
      Button.jsx
    pages/
      LoginPage.jsx
      RegisterPage.jsx
      Dashboard.jsx
      StudentsPage.jsx
    hooks/
      useAuth.js
      useStudents.js
    redux/
      authSlice.js
      studentSlice.js
    api/
      authApi.js
      studentApi.js
    utils/
      validationSchemas.js
    App.js
    index.js



Cluster0


Password S6XTjV7n50IgmNJ0

Username reachasdass_db_user




src/
 ├── components/        # Reusable UI (Navbar, Button…)
 ├── pages/             # Page-level components
 │    ├── Dashboard.jsx
 │    ├── StudentsPage.jsx
 │    ├── LoginPage.jsx
 │    └── RegisterPage.jsx
 ├── routes/            # Route guards
 │    ├── ProtectedRoute.jsx
 │    └── AuthRoute.jsx
 ├── redux/             # Redux slices
 ├── api/               # API calls
 └── App.js             # Router setup
