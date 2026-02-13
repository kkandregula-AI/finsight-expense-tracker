# FinSight 💰

A modern, real-time expense tracking application built with Next.js and Firebase.

Live Demo (after deployment):  
👉 https://xpense-trackr-nine.vercel.app

---

## 🚀 Features

- 🔐 Firebase Authentication (User Scoped Data)
- ⚡ Real-time Expense Updates (Firestore onSnapshot)
- 📅 Date-based Expense Tracking
- 📊 Smart Dashboard Metrics (Total & Monthly Summary)
- 🎨 Fintech-inspired Clean UI
- 🔒 Firestore Security Rules (User Data Isolation)

---

## 🛠 Tech Stack

- Next.js 14 (App Router)
- Firebase Authentication
- Firestore Database
- Tailwind CSS
- Vercel Deployment

---

## 🔧 Local Setup

1. Clone the repository

```bash
git clone https://github.com/kkandregula-AI/finsight-expense-tracker.git
cd finsight-expense-tracker

2. Install dependencies
npm install


3. Create a .env.local file in the root directory and add:
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

4. Run the development server
Run the development server
Visit: http://localhost:3000

🔐 Security
Firestore rules enforce per-user access control


Environment variables secured via .env.local


No secrets committed to GitHub



📌 Future Enhancements
📊 Category-wise charts


✏️ Edit expense feature


📄 CSV / PDF export


💳 Subscription integration (Stripe)


📱 Mobile-first PWA upgrade



👨‍💻 Author
Krishnamurthy Kandregula
 AI / Product Engineering Enthusiast
