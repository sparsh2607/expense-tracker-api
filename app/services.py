from datetime import date
from unicodedata import category
from sqlmodel import Session, select
from app.models import Transaction, TransactionCreate, TransactionUpdate, TransactionType


class TransactionService:
    def __init__(self, session: Session):
        self.session = session

    def create_transaction(self, transaction_data: TransactionCreate) -> Transaction:
        transaction = Transaction.model_validate(transaction_data)

        self.session.add(transaction)
        self.session.commit()
        self.session.refresh(transaction)

        return transaction

    def get_all_transactions(
        self,
        category: str | None = None,
        transaction_type: TransactionType | None = None,
        start_date: date | None = None,
        end_date: date | None = None
    ) -> list[Transaction]:
        statement = select(Transaction)

        if category:
            statement = statement.where(Transaction.category == category)

        if transaction_type:
            statement = statement.where(Transaction.transaction_type == transaction_type)

        if start_date:
            statement = statement.where(Transaction.transaction_date >= start_date)

        if end_date:
            statement = statement.where(Transaction.transaction_date <= end_date)

        return self.session.exec(statement).all()

    def get_transaction_by_id(self, transaction_id: int) -> Transaction | None:
        return self.session.get(Transaction, transaction_id)

    def update_transaction(
        self,
        transaction_id: int,
        transaction_data: TransactionUpdate
    ) -> Transaction | None:
        transaction = self.session.get(Transaction, transaction_id)

        if not transaction:
            return None

        update_data = transaction_data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(transaction, key, value)

        self.session.add(transaction)
        self.session.commit()
        self.session.refresh(transaction)

        return transaction

    def delete_transaction(self, transaction_id: int) -> bool:
        transaction = self.session.get(Transaction, transaction_id)

        if not transaction:
            return False

        self.session.delete(transaction)
        self.session.commit()

        return True

    def get_financial_summary(self) -> dict:
        transactions = self.get_all_transactions()

        total_income = sum(
            transaction.amount
            for transaction in transactions
            if transaction.transaction_type == TransactionType.income
        )

        total_expense = sum(
            transaction.amount
            for transaction in transactions
            if transaction.transaction_type == TransactionType.expense
        )

        balance = total_income - total_expense

        return {
            "total_income": total_income,
            "total_expense": total_expense,
            "balance": balance,
            "total_transactions": len(transactions)
        }
    def get_category_summary(self) -> dict:
        transactions = self.get_all_transactions()

        category_summary = {}

        for transaction in transactions:
            if transaction.transaction_type == TransactionType.expense:
                category = transaction.category

                if category not in category_summary:
                    category_summary[category] = 0

                category_summary[category] += transaction.amount

        return {
            "category_wise_expenses": category_summary
        }

    def get_monthly_summary(self, year: int, month: int) -> dict:
        transactions = self.get_all_transactions()

        monthly_transactions = [
            transaction
            for transaction in transactions
            if transaction.transaction_date.year == year
            and transaction.transaction_date.month == month
        ]

        total_income = sum(
            transaction.amount
            for transaction in monthly_transactions
            if transaction.transaction_type == TransactionType.income
        )

        total_expense = sum(
            transaction.amount
            for transaction in monthly_transactions
            if transaction.transaction_type == TransactionType.expense
        )

        balance = total_income - total_expense

        return {
            "year": year,
            "month": month,
            "total_income": total_income,
            "total_expense": total_expense,
            "balance": balance,
            "total_transactions": len(monthly_transactions)
        }