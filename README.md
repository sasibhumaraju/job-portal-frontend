

# 🧑‍💼 Job Portal – Full Stack Production-Ready Application

🚀 **Live App:** [https://jobspoortal.web.app](https://jobspoortal.web.app)  
🌐 **Backend API (Spring Boot + PostgreSQL):** Hosted on Railway

This is a **production-ready Job Portal** where job seekers can apply for jobs and recruiters can manage applications. Built with a scalable architecture and modern full-stack technologies.


## 🔧 Tech Stack

### 🔙 Backend
- **Java 17 + Spring Boot**
- **Spring Data JPA**
- **PostgreSQL** (deployed on Railway)
- **DTO Pattern & Deep Mapping**
- **Layered Architecture** – Controller, Service, Repository
- **RESTful APIs**
- **CORS Configured** for frontend integration
- **UUID as Primary Keys**



### 🔜 Frontend
- **React.js**
- **Vite**
- **Axios for API calls**
- **Deployed on Firebase Hosting**



## ✅ Key Features

### 👨‍💻 For Job Seekers
- Apply to job postings
- Add expected salary & comments
- View application history

### 🧑‍💼 For Recruiters
- View applicants per job post
- See details of each application
- Filter applications by job/user



## 📂 Folder Structure (Backend)
```

* controller/
* service/
* model/
* DTO/
* mapper/
* repository/
* resources/application.properties

```



## 📡 Example API Endpoints

- `GET /api/v1/applies/{id}`
- `GET /api/v1/applies/job-postings/{jobId}/app-users/{userId}`
- `POST /api/v1/applies`
- `GET /api/v1/applies/app-users/{userId}`
- `GET /api/v1/applies/job-postings/{jobId}`
- `PUT /api/v1/applies/{id}`
- `DELETE /api/v1/applies/{id}`



## 🔐 Concepts Used in Backend

- Entity relationships using `@ManyToOne`
- Deep DTO transformation using Mapper classes
- Null-safe database access with `Optional`
- Spring Boot dependency injection with `@Service` and `@Autowired`
- RESTful design principles
- Configuration-based PostgreSQL deployment for production



## 🚀 Deployed & In Use

This project is **not just a prototype** — it's live, integrated, tested, and already being used by test users. Designed to reflect real-world hiring workflows.



## 📬 Contact

**Sashi Kumar Raju Bhumaraju**  
[LinkedIn](https://www.linkedin.com/in/sasibhumaraju/)  
📩 Open to backend or full-stack opportunities!



## ⭐️ If you like this project...
Feel free to fork, star ⭐, or contribute with ideas and features!
```

