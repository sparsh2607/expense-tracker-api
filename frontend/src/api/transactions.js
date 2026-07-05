import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTransactions = async (filters = {}) => {
  const response = await api.get("/transactions", {
    params: filters,
  });
  return response.data;
};

export const createTransaction = async (transactionData) => {
  const response = await api.post("/transactions", transactionData);
  return response.data;
};

export const updateTransaction = async (id, transactionData) => {
  const response = await api.patch(`/transactions/${id}`, transactionData);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};

export const getSummary = async () => {
  const response = await api.get("/summary");
  return response.data;
};

export const getCategorySummary = async () => {
  const response = await api.get("/summary/categories");
  return response.data;
};