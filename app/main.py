from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, status
from sqlmodel import Session

from app.database import create_db_and_tables, get_session
from app.models import TransactionCreate, TransactionRead, TransactionUpdate, TransactionType
from app.services import TransactionService
from datetime import date


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(
    title="Expense Tracker API",
    description="A REST API to manage income, expenses, and financial summaries.",
    version="1.0.0",
    lifespan=lifespan
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://spendwise-expense-tracker-kohl.vercel.app",
        "https://spendwise-expense-tracker-19b29tctp-sparsh2607s-projects.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Expense Tracker API",
        "docs": "/docs"
    }


@app.post(
    "/transactions",
    response_model=TransactionRead,
    status_code=status.HTTP_201_CREATED
)
def create_transaction(
    transaction_data: TransactionCreate,
    session: Session = Depends(get_session)
):
    service = TransactionService(session)
    return service.create_transaction(transaction_data)


@app.get("/transactions", response_model=list[TransactionRead])
def get_all_transactions(
    category: str | None = None,
    transaction_type: TransactionType | None = None,
    start_date: date | None = None,
    end_date: date | None = None,
    session: Session = Depends(get_session)
):
    if start_date and end_date and start_date > end_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="start_date cannot be greater than end_date"
        )

    service = TransactionService(session)

    return service.get_all_transactions(
        category=category,
        transaction_type=transaction_type,
        start_date=start_date,
        end_date=end_date
    )


@app.get("/transactions/{transaction_id}", response_model=TransactionRead)
def get_transaction(
    transaction_id: int,
    session: Session = Depends(get_session)
):
    service = TransactionService(session)
    transaction = service.get_transaction_by_id(transaction_id)

    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )

    return transaction


@app.patch("/transactions/{transaction_id}", response_model=TransactionRead)
def update_transaction(
    transaction_id: int,
    transaction_data: TransactionUpdate,
    session: Session = Depends(get_session)
):
    service = TransactionService(session)
    transaction = service.update_transaction(transaction_id, transaction_data)

    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )

    return transaction


@app.delete("/transactions/{transaction_id}")
def delete_transaction(
    transaction_id: int,
    session: Session = Depends(get_session)
):
    service = TransactionService(session)
    deleted = service.delete_transaction(transaction_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )

    return {
        "message": "Transaction deleted successfully"
    }


@app.get("/summary")
def get_summary(session: Session = Depends(get_session)):
    service = TransactionService(session)
    return service.get_financial_summary()
@app.get("/summary/categories")
def get_category_summary(session: Session = Depends(get_session)):
    service = TransactionService(session)
    return service.get_category_summary()


@app.get("/summary/monthly/{year}/{month}")
def get_monthly_summary(
    year: int,
    month: int,
    session: Session = Depends(get_session)
):
    current_year = date.today().year
    current_month = date.today().month

    if year < 2000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Year must be 2000 or later"
        )

    if year > current_year:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Year cannot be in the future"
        )

    if month < 1 or month > 12:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Month must be between 1 and 12"
        )

    if year == current_year and month > current_month:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Month cannot be in the future"
        )

    service = TransactionService(session)
    return service.get_monthly_summary(year, month)