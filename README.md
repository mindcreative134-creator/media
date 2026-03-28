# SMMF - Social Media Media Fetcher

A premium, self-hosted social media media fetcher platform with an API selling system.

## 🚀 Quick Setup

### 1. Prerequisites
- Python 3.9+
- Node.js 18+
- MongoDB (Local or Atlas)

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python -m playwright install chromium
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Environment Variables
Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017
SECRET_KEY=your_super_secret_key_here
```

### 5. Initialize Database (Optional)
```bash
python scripts/init_db.py
```

### 6. Run the Application
**Backend:**
```bash
python main.py
```
**Frontend:**
```bash
npm run dev
```

## 🛠 Features
- **Direct Scraping**: No external APIs.
- **API Selling**: Integrated key management.
- **Premium UI**: Velocity Blue design system.
- **Dynamic Content**: Playwright fallback for IG/TikTok.

## 📄 License
MIT
