import prisma from "@/app/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { formatCurrency } from "@/app/lib/utils";
import { UUID } from "crypto";

export async function fetchCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return categories;
}

export async function fetchCategory(id: UUID) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return category;
}

export async function fetchAccounts() {
  const accounts = await prisma.account.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return accounts;
}

export async function fetchAccount(id: UUID) {
  const account = await prisma.account.findUnique({
    where: {
      id,
    },
  });

  return account;
}

export async function fetchTransactions() {
  noStore
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return transactions;
}

export async function fetchTransaction(id: UUID) {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
  });

  return transaction;
}

export async function fetchTransactionsByAccount(accountId: UUID) {
  const transactions = await prisma.transaction.findMany({
    where: {
      accountId: accountId,
    },
    orderBy: {
      date: "desc",
    },
  });

  return transactions.map((transaction) => ({
    ...transaction,
    amount: formatCurrency(transaction.amount),
  }));
}

export async function fetchTransactionsByCategory(categoryId: UUID) {
  const transactions = await prisma.transaction.findMany({
    where: {
      categoryId: categoryId,
    },
    orderBy: {
      date: "desc",
    },
  });
  return transactions.map((transaction) => ({
    ...transaction,
    amount: formatCurrency(transaction.amount),
    }));
}

export async function fetchTransactionsByCategoryAndAccount(
  categoryId: UUID,
  accountId: UUID
) {
  const transactions = await prisma.transaction.findMany({
    where: {
      categoryId: categoryId,
      accountId: accountId,
    },
    orderBy: {
      date: "desc",
    },
  });
  return transactions;
}

export async function fetchPayees() {
  const payees = await prisma.payee.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return payees;
}

export async function fetchPayee(id: UUID) {
  const payee = await prisma.payee.findUnique({
    where: {
      id,
    },
  });

  return payee;
}

export async function fetchBudgetPosts() {
  const budgetPosts = await prisma.budgetPost.findMany({
    orderBy: {
      from: "desc",
    },
  });

  return budgetPosts;
}

export async function fetchBudgetPostsForMonth(month: Date) {
  const budgetPosts = await prisma.budgetPost.findMany({
    where: {
      from: {
        lte: month,
      },
      to: {
        gte: month,
      },
    },
    orderBy: {
      from: "desc",
    },
  });

  return budgetPosts;
}