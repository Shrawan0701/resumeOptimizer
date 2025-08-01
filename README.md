# 🧠 AI Resume Optimizer & Roast App

An intelligent resume analysis and improvement platform built with **React**, **Spring Boot**, **PostgreSQL**, and **Ollama AI**. It allows users to upload resumes, optimize them based on job title or full job description, receive ATS scores, and even get witty roast-style feedback!

---

##  Features

- 📄 Upload PDF Resume
- 💼 Enter Job Title or Full Job Description
- ⚙️ AI-Driven Resume Optimization using Ollama
- 📊 ATS Match Scoring (out of 100)
- 🧾 Downloadable Optimized Resume Summary (PDF)
- 🔥 Resume Roast Feature (Honest, Friendly, Brutal tone)
- 🧠 AI: Ollama (LLM-powered via local or remote server)
- 🗃️ Database: PostgreSQL for analytics
- ☁️ Deployment-Ready (Frontend + Backend + Ollama)

---

## Project URLs'
- Project URL:- https://re-vamp-liart.vercel.app/
- Backend URL:- https://resume-optimizer-wixu.onrender.com
- Backend Code:- https://github.com/Shrawan0701/resume-backend
- Proxy Code:- https://github.com/Shrawan0701/ollama-proxy

---

##  Tech Stack

| Layer        | Technology                 |
|--------------|----------------------------|
| Frontend     | React, JavaScript, Axios     |
| Backend      | Java Spring Boot           |
| Database     | PostgreSQL                 |
| AI Engine    | Ollama (LLM, run locally or on cloud) |
| PDF Parsing  | Apache Tika                |
| PDF Export   | iText                      |
| Deployment   | Render|
| Proxy        | Express.js |

---

---

## 🧪 How It Works

1. **User uploads resume (PDF)**
2. **Optional**: Enters job title or full job description
3. Backend:
   - Extracts text with Apache Tika
   - Sends resume + JD to Ollama for improvement
   - Calculates ATS score (keyword match %)
   - Stores analytics in PostgreSQL
   - Returns optimized resume summary (PDF Base64)
4. Optionally, user can request **resume roast** (fun/witty critique)

---

## 🧑‍💻 Local Development

### 1. Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL
- Ollama (local or remote)

---

### 2. Backend Setup 
```bash
cd server
./mvnw clean install
# Set env vars in application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/resume_db
ollama.api.url=http://localhost:11434  # or remote proxy

# Run the app
./mvnw spring-boot:run
```
### 3. Frontend Setup
```bash
cd client
npm install
VITE_API_BASE_URL=http://localhost:3001  

npm run dev
```

### 4. Proxy Setup
```bash
cd proxy
npm install
VITE_API_BASE_URL=http://localhost:11434
node index.js
```




### Contact
Feel free to connect or reach out if you have questions about this project!

Email: shrawanrw07@gmail.com

LinkedIn Profile: https://www.linkedin.com/in/shrawanwandhekar/
