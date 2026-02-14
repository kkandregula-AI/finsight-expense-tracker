"use client";

import { useEffect, useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import AuthForm from "@/components/AuthForm";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [expenses, setExpenses] = useState<any[]>([]);

  // 🔐 Listen to Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Real-time Firestore listener
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(data);
    });

    return () => unsubscribe();
  }, [user]);

  // ➕ Add Expense
  const handleAddExpense = async (expense: any) => {
    if (!user) return;

    try {
      await addDoc(collection(db, "expenses"), {
        ...expense,
        userId: user.uid,
      });
    } catch (err) {
      console.error("Failed to add expense:", err);
      alert("Error adding expense. Check permissions.");
    }
  };

  // ❌ Delete Expense
  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
      alert("Error deleting expense. Check permissions.");
    }
  };

  // 📊 Summary
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const now = new Date();
  const thisMonthTotal = expenses
    .filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);

  // =============================
  // 🔹 Landing Page (if not logged in)
  // =============================
  if (!user) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* LEFT */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-700 to-emerald-600 text-white flex flex-col justify-center items-center md:items-start px-8 md:px-16 py-10">
          <img
            src="/logo.png"
            alt="FinSight Logo"
            className="h-24 md:h-32 w-auto object-contain"
          />
          <p className="text-sm md:text-base text-white/80 mt-2">
            Track Smart. Spend Smarter.
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6 md:p-10">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Login to Continue
            </h2>
            <AuthForm />
          </div>
        </div>
      </div>
    );
  }

  // =============================
  // 🔹 Dashboard (if logged in)
  // =============================
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* LEFT PANEL */}
      <div className="w-full md:w-2/5 bg-gradient-to-br from-indigo-700 to-emerald-600 text-white p-6 md:p-10 flex flex-col">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <img
              src="/logo.png"
              alt="FinSight Logo"
              className="h-14 md:h-16 w-auto object-contain mb-1"
            />
            <p className="text-sm md:text-base text-white/80">
              Track Smart. Spend Smarter.
            </p>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white text-sm md:text-base"
          >
            Logout
          </button>
        </div>

        {/* Add Expense Form */}
        <ExpenseForm onAdd={handleAddExpense} />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-3/5 p-4 md:p-8 overflow-y-auto">
        {/* Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <p className="text-gray-500 text-sm">Total Expenses</p>
            <p className="text-2xl font-bold">₹ {total}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">This Month</p>
            <p className="text-2xl font-bold text-indigo-600">
              ₹ {thisMonthTotal}
            </p>
          </div>
        </div>

        {/* Expense List */}
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses added yet.</p>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-white rounded-xl shadow p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4"
            >
              <div>
                <p className="font-semibold">₹ {expense.amount}</p>
                <p className="text-gray-600 text-sm">
                  {expense.category} — {expense.description || "-"}
                </p>
                <p className="text-gray-500 text-xs">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <button
                className="text-red-600 hover:underline mt-2 md:mt-0"
                onClick={() => handleDeleteExpense(expense.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
