# SpendWise - Full Stack Expense Tracker

SpendWise is a full-stack expense tracker application built with **FastAPI**, **SQLite**, **React**, **Vite**, **Tailwind CSS**, and **Recharts**.

It helps users track income, expenses, categories, transactions, and financial summaries through a clean modern dashboard.

---

## Features

### Backend Features

- Add income and expense transactions
- View all transactions
- View a single transaction by ID
- Update transactions
- Delete transactions
- Filter transactions by category
- Filter transactions by transaction type
- Filter transactions by date range
- View overall financial summary
- View category-wise expense summary
- View monthly financial summary
- SQLite database integration
- Input validation
- Error handling
- Pytest-based API testing
- Interactive Swagger UI documentation

### Frontend Features

- Modern dashboard UI
- Income, expense, balance, and transaction summary cards
- Add transaction form
- Category-wise spending chart
- Recent transactions table
- Delete transaction feature
- Premium dark UI
- Rupee-based branding logo
- Fully connected with FastAPI backend

---

## Tech Stack

### Backend

- Python
- FastAPI
- SQLModel
- SQLite
- Pydantic
- Pytest

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Recharts
- Lucide React

---

## Project Structure

```text
expense-tracker-api/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── services.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── transactions.js
│   │   │
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   ├── TransactionTable.jsx
│   │   │   └── CategoryChart.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── tests/
│   ├── __init__.py
│   └── test_transactions.py
│
├── requirements.txt
├── README.md
└── .gitignore
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/expense-tracker-api.git
cd expense-tracker-api
```

Replace `your-username` with your GitHub username.

---

## Backend Setup

Create a virtual environment:

```bash
python3 -m venv .venv
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Run the backend server:

```bash
fastapi dev app/main.py
```

Backend will run at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Run the frontend development server:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Home route |
| POST | `/transactions` | Create a new transaction |
| GET | `/transactions` | Get all transactions |
| GET | `/transactions/{transaction_id}` | Get a transaction by ID |
| PATCH | `/transactions/{transaction_id}` | Update a transaction |
| DELETE | `/transactions/{transaction_id}` | Delete a transaction |
| GET | `/summary` | Get overall financial summary |
| GET | `/summary/categories` | Get category-wise expense summary |
| GET | `/summary/monthly/{year}/{month}` | Get monthly financial summary |

---

## Query Filters

Filter transactions by category:

```text
GET /transactions?category=Food
```

Filter transactions by transaction type:

```text
GET /transactions?transaction_type=expense
```

Filter transactions by date range:

```text
GET /transactions?start_date=2026-07-01&end_date=2026-07-31
```

Use multiple filters together:

```text
GET /transactions?category=Food&transaction_type=expense
```

---

## Sample Transaction Request

```json
{
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "transaction_type": "expense",
  "description": "College lunch",
  "transaction_date": "2026-07-05"
}
```

---

## Sample Transaction Response

```json
{
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "transaction_type": "expense",
  "description": "College lunch",
  "transaction_date": "2026-07-05",
  "id": 1
}
```

---

## Sample Summary Response

```json
{
  "total_income": 10000,
  "total_expense": 1350,
  "balance": 8650,
  "total_transactions": 4
}
```

---

## Validation Rules

- Title must be between 2 and 100 characters
- Amount must be greater than 0
- Amount cannot be more than 1 crore
- Category must be between 2 and 50 characters
- Transaction date cannot be in the future
- Description cannot exceed 250 characters
- Transaction type must be either `income` or `expense`

---

## Running Tests

This project uses **Pytest** for backend API testing.

Run tests using:

```bash
pytest
```

The test suite checks:

- Home route
- Create transaction
- Get all transactions
- Get single transaction
- Update transaction
- Delete transaction
- Financial summary
- Invalid transaction validation

---

## Screenshots

Create a `screenshots` folder in the root directory and add your dashboard screenshot as:

```text
screenshots/dashboard.png
```

Then this image will appear below:

![Dashboard](screenshots/dashboard.png)

---

## Environment Notes

The frontend connects to the backend using this API base URL:

```text
http://127.0.0.1:8000
```

Make sure the backend server is running before using the frontend.

---

## Future Improvements

- Edit transaction feature
- Frontend filters
- Monthly spending chart
- CSV export
- User authentication
- JWT login system
- PostgreSQL support
- Budget limit feature
- Docker support
- Deployment on Render, Railway, or Vercel

---

## Author

Built by **Sparsh Gahoi**.

---

## License

This project is open-source and available under the MIT License.
