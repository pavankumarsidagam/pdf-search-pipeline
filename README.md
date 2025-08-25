# 📚 PDF Ingestion & Search API (Node.js + Express + Meilisearch)

This project provides a backend service for ingesting parsed PDF data and making it searchable using Meilisearch.

It is designed to:

- Parse and store PDF content in MongoDB.
- Make ingested content easily searchable with Meilisearch.
- Provide secure REST APIs for managing and querying documents.

The service is already deployed on Render 🚀

## 🔑 Key Features

- 📄 **PDF Ingestion** → Upload and store parsed PDF data in MongoDB.
- ⚡ **Search Functionality** → Query documents using Meilisearch’s lightning-fast full-text search.
- 🔐 **JWT Authentication** → Protect sensitive routes with secure JSON Web Tokens.
- 🗄️ **MongoDB Storage** → Persist parsed PDF metadata and references.
- 🌐 **REST API** → Simple and developer-friendly endpoints for ingestion and search.

## 📂 Project Structure

```
pdf-ingestion-search-api/
├── src/
│   ├── config/        # Configuration (DB, Meilisearch, JWT)
│   ├── controllers/   # Request handling logic
│   ├── models/        # MongoDB models
│   ├── routes/        # API endpoints
│   ├── services/      # Business logic (PDF parsing, search)
│   └── utils/         # Helpers & utilities
├── .env.example       # Example environment variables
├── package.json       # Dependencies & scripts
├── README.md          # Project documentation
```

## 🚀 Quick Start

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/pdf-ingestion-search-api.git
cd pdf-ingestion-search-api
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Environment Variables

Copy `.env.example` → `.env` and update values. If you have a local MongoDB instance, use the local connection string. Otherwise, use MongoDB Atlas for a cloud-hosted database.

Example `.env` configuration:

```
# Use this for MongoDB Atlas (cloud-hosted)
MONGO_URI=mongodb+srv://<your-db-url>
# OR use this for local MongoDB
# MONGO_URI=mongodb://localhost:27017/pdf-search-pipeline
MEILI_URL=https://meili--meilisearch--6y7qslcbcmz5.code.run
MEILI_MASTER_KEY=F121523A
API_SECRET_KEY=F121523A
PORT=5000
```

### 4️⃣ Run Locally
```bash
npm run dev
```

Now visit 👉 [http://localhost:5000/api](http://localhost:5000/api)

## 📖 API Documentation

You can explore how the APIs work via our documentation here:  
👉 [API Docs](http://localhost:5000/api)

Some key endpoints:

- `POST /api/ingest` → Upload and store parsed PDF data.
- `GET /api/search?q=keyword` → Search for documents.

## 🐳 Deployment with Docker (Optional)

Easily containerize and deploy:

```bash
docker build -t pdf-ingestion-api .
docker run -p 5000:5000 pdf-ingestion-api
```

## 🛠️ Tech Stack

- **Node.js + Express** → API framework
- **MongoDB** → Database for storing parsed PDFs
- **Meilisearch** → Fast full-text search engine
- **JWT** → Secure authentication
- **Docker** → Containerization & deployment

## 🤝 Contributing

Contributions are welcome! Please open issues and submit pull requests.

## 📜 License

This project is licensed under the MIT License.
