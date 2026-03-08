# 🌸 Kalapriya Flower Decor — Full Stack Application

A production-ready event management website with React frontend, Node.js/Express backend, MongoDB database, and Cloudinary image hosting.

---

## 📁 Project Structure

```
kalapriya/
├── backend/
│   ├── src/
│   │   ├── server.js          ← Express app entry point
│   │   ├── routes/
│   │   │   ├── auth.js        ← Login / JWT verify
│   │   │   ├── gallery.js     ← Image CRUD + Cloudinary upload
│   │   │   └── enquiry.js     ← Contact form + email notify
│   │   ├── models/
│   │   │   ├── Image.js       ← MongoDB image schema
│   │   │   └── Enquiry.js     ← MongoDB enquiry schema
│   │   ├── middleware/
│   │   │   └── auth.js        ← JWT protect middleware
│   │   └── config/
│   │       ├── cloudinary.js  ← Cloudinary + Multer setup
│   │       └── seed.js        ← DB seed script
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx            ← React Router setup
    │   ├── pages/
    │   │   ├── PublicSite.jsx ← Full public website
    │   │   ├── AdminLogin.jsx ← Admin login page
    │   │   └── AdminDashboard.jsx ← Protected admin panel
    │   ├── components/
    │   │   └── ProtectedRoute.jsx ← Route guard
    │   ├── context/
    │   │   └── AuthContext.jsx ← Global auth state
    │   └── services/
    │       └── api.js         ← All Axios API calls
    ├── index.html
    ├── vite.config.js
    ├── .env.example
    └── package.json
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free) — https://cloud.mongodb.com
- Cloudinary account (free) — https://cloudinary.com

---

### Step 1 — Clone / Set up Backend

```bash
cd backend
cp .env.example .env
# Fill in your values in .env (see below)
npm install
npm run dev
```

Backend runs at: `http://localhost:5000`

---

### Step 2 — Set up Frontend

```bash
cd frontend
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

### Step 3 — Seed Database (optional)

```bash
cd backend
npm run seed
```

---

## ⚙️ Environment Variables

### Backend `.env`

| Variable | Description | Where to get |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | https://cloud.mongodb.com → Connect → Drivers |
| `JWT_SECRET` | Random secret string | Use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `CLOUDINARY_CLOUD_NAME` | Your cloud name | https://cloudinary.com → Dashboard |
| `CLOUDINARY_API_KEY` | API key | Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | API secret | Cloudinary Dashboard |
| `ADMIN_USERNAME` | Admin login username | Choose your own |
| `ADMIN_PASSWORD` | Admin login password | Choose a strong password |
| `EMAIL_USER` | Gmail address | Your Gmail |
| `EMAIL_PASS` | Gmail App Password | https://myaccount.google.com/apppasswords |
| `EMAIL_TO` | Where enquiry emails go | Your business email |
| `CLIENT_URL` | Frontend URL (for CORS) | `http://localhost:5173` locally |

### Frontend `.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number with country code (e.g. `919845600000`) |

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | ❌ | Admin login → returns JWT |
| GET | `/api/auth/verify` | ✅ | Check if token valid |
| POST | `/api/auth/logout` | ✅ | Logout |

### Gallery
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/gallery` | ❌ | Get all images grouped by category |
| GET | `/api/gallery?category=Reception` | ❌ | Filter by category |
| GET | `/api/gallery/stats` | ✅ | Image count per category |
| POST | `/api/gallery` | ✅ | Upload image (file or URL) |
| PATCH | `/api/gallery/:id` | ✅ | Update caption/order |
| DELETE | `/api/gallery/:id` | ✅ | Delete from DB + Cloudinary |

### Enquiries
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/enquiries` | ❌ | Submit enquiry + email notify |
| GET | `/api/enquiries` | ✅ | Get all enquiries (paginated) |
| PATCH | `/api/enquiries/:id` | ✅ | Update status / notes |
| DELETE | `/api/enquiries/:id` | ✅ | Delete enquiry |

---

## ☁️ Production Deployment

### Deploy Backend → Render (Free)

1. Go to https://render.com and sign up
2. Click **New → Web Service**
3. Connect your GitHub repo
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add all environment variables from `.env`
6. Set `CLIENT_URL` to your Vercel frontend URL

### Deploy Frontend → Vercel (Free)

1. Go to https://vercel.com and sign up
2. Click **Add New → Project**
3. Import your GitHub repo
4. Set:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables:
   - `VITE_API_URL` = your Render backend URL + `/api`
   - `VITE_WHATSAPP_NUMBER` = your WhatsApp number

### Custom Domain (~₹800/year)

1. Buy `kalapriyaflowers.com` at https://namecheap.com or https://godaddy.com
2. In Vercel → Project Settings → Domains → Add domain
3. Update DNS records as instructed by Vercel
4. Done! SSL is automatic.

---

## 💰 Cost Summary

| Service | Plan | Cost |
|---|---|---|
| MongoDB Atlas | Free (512MB) | ₹0/month |
| Cloudinary | Free (25GB storage, 25GB bandwidth) | ₹0/month |
| Render (Backend) | Free (spins down after 15min idle) | ₹0/month |
| Render Starter | Always-on backend | ~₹600/month |
| Vercel (Frontend) | Free | ₹0/month |
| Domain (.com/year) | — | ~₹800/year |
| **Total (free tier)** | | **~₹800/year** |
| **Total (production)** | | **~₹8,000/year** |

---

## 🔐 Security Features

- JWT authentication with expiry
- Rate limiting (100 req/15min global, 10 login attempts/15min)
- Helmet.js security headers
- CORS restricted to frontend domain
- Input validation on all routes
- File type + size validation on uploads
- MongoDB injection protection via Mongoose

---

## 📞 Support

Admin credentials set in your `.env`:
- Username: value of `ADMIN_USERNAME`
- Password: value of `ADMIN_PASSWORD`

Admin panel: `https://yourdomain.com/admin`
