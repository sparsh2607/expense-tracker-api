from datetime import date
from enum import Enum
from typing import Optional

from pydantic import field_validator
from sqlmodel import Field, SQLModel


class TransactionType(str, Enum):
    income = "income"
    expense = "expense"


class TransactionBase(SQLModel):
    title: str = Field(min_length=2, max_length=100)
    amount: float = Field(gt=0, le=10_000_000)
    category: str = Field(min_length=2, max_length=50)
    transaction_type: TransactionType
    description: Optional[str] = Field(default=None, max_length=250)
    transaction_date: date = Field(default_factory=date.today)

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: str) -> str:
        value = value.strip()

        if not value:
            raise ValueError("Title cannot be empty")

        return value

    @field_validator("category")
    @classmethod
    def validate_category(cls, value: str) -> str:
        value = value.strip()

        if not value:
            raise ValueError("Category cannot be empty")

        return value.title()

    @field_validator("description")
    @classmethod
    def validate_description(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value

        value = value.strip()

        if not value:
            return None

        return value

    @field_validator("transaction_date")
    @classmethod
    def validate_transaction_date(cls, value: date) -> date:
        if value > date.today():
            raise ValueError("Transaction date cannot be in the future")

        return value


class Transaction(TransactionBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class TransactionCreate(TransactionBase):
    pass


class TransactionRead(TransactionBase):
    id: int


class TransactionUpdate(SQLModel):
    title: Optional[str] = Field(default=None, min_length=2, max_length=100)
    amount: Optional[float] = Field(default=None, gt=0, le=10_000_000)
    category: Optional[str] = Field(default=None, min_length=2, max_length=50)
    transaction_type: Optional[TransactionType] = None
    description: Optional[str] = Field(default=None, max_length=250)
    transaction_date: Optional[date] = None

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value

        value = value.strip()

        if not value:
            raise ValueError("Title cannot be empty")

        return value

    @field_validator("category")
    @classmethod
    def validate_category(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value

        value = value.strip()

        if not value:
            raise ValueError("Category cannot be empty")

        return value.title()

    @field_validator("description")
    @classmethod
    def validate_description(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value

        value = value.strip()

        if not value:
            return None

        return value

    @field_validator("transaction_date")
    @classmethod
    def validate_transaction_date(cls, value: Optional[date]) -> Optional[date]:
        if value is None:
            return value

        if value > date.today():
            raise ValueError("Transaction date cannot be in the future")

        return value