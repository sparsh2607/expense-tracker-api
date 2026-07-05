from datetime import date
from enum import Enum
from typing import Optional

from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field


app = FastAPI(
    title="Expense Tracker API",
    description="A simple API to track income and expenses",
    version="1.0.0"
)


class TransactionType(str, Enum):
    income = "income"
    expense = "expense"


class TransactionCreate(BaseModel):
    title: str
    amount: float = Field(gt=0)
    category: str
    transaction_type: TransactionType
    description: Optional[str] = None
    transaction_date: date = Field(default_factory=date.today)


class TransactionRead(TransactionCreate):
    id: int


class TransactionUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = Field(default=None, gt=0)
    category: Optional[str] = None
    transaction_type: Optional[TransactionType] = None
    description: Optional[str] = None
    transaction_date: Optional[date] = None


transactions: list[TransactionRead] = []
next_id = 1


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
def create_transaction(transaction: TransactionCreate):
    global next_id

    new_transaction = TransactionRead(
        id=next_id,
        **transaction.model_dump()
    )

    transactions.append(new_transaction)
    next_id += 1

    return new_transaction


@app.get("/transactions", response_model=list[TransactionRead])
def get_all_transactions():
    return transactions


@app.get("/transactions/{transaction_id}", response_model=TransactionRead)
def get_transaction(transaction_id: int):
    for transaction in transactions:
        if transaction.id == transaction_id:
            return transaction

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Transaction not found"
    )


@app.patch("/transactions/{transaction_id}", response_model=TransactionRead)
def update_transaction(
    transaction_id: int,
    transaction_data: TransactionUpdate
):
    for index, transaction in enumerate(transactions):
        if transaction.id == transaction_id:
            update_data = transaction_data.model_dump(exclude_unset=True)

            updated_transaction = transaction.model_copy(update=update_data)
            transactions[index] = updated_transaction

            return updated_transaction

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Transaction not found"
    )


@app.delete("/transactions/{transaction_id}")
def delete_transaction(transaction_id: int):
    for index, transaction in enumerate(transactions):
        if transaction.id == transaction_id:
            transactions.pop(index)

            return {
                "message": "Transaction deleted successfully"
            }

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Transaction not found"
    )


@app.get("/summary")
def get_summary():
    total_income = 0
    total_expense = 0

    for transaction in transactions:
        if transaction.transaction_type == TransactionType.income:
            total_income += transaction.amount
        elif transaction.transaction_type == TransactionType.expense:
            total_expense += transaction.amount

    balance = total_income - total_expense

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "balance": balance,
        "total_transactions": len(transactions)
    }