"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

interface Props {
  onLogout?: () => void; // Optional callback for logout
}

export default function AuthForm({ onLogout }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  // Login with Email/Password
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    setLoadingLogin(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      if (e.code === "auth/user-not-found") {
        alert("New user detected. Please click Register first.");
      } else if (e.code === "auth/wrong-password") {
        alert("Incorrect password. Try again.");
      } else {
        alert(e.message);
      }
    } finally {
      setLoadingLogin(false);
    }
  };

  // Sign Up / Register
  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    setLoadingRegister(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registered successfully! You can now login.");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoadingRegister(false);
    }
  };

  // Login with Google
  const handleGoogle = async () => {
    setLoadingGoogle(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoadingGoogle(false);
    }
  };

  // Logout (optional callback to dashboard)
  const handleLogout = async () => {
    await signOut(auth);
    if (onLogout) onLogout();
  };

  return (
    <div className="flex flex-col space-y-3">
      {/* Email/Password Inputs */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        disabled={loadingGoogle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        disabled={loadingGoogle}
      />

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        disabled={loadingLogin || loadingRegister || loadingGoogle}
      >
        {loadingLogin ? "Logging in..." : "Login"}
      </button>

      {/* Register Button */}
      <button
        onClick={handleSignup}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        disabled={loadingLogin || loadingRegister || loadingGoogle}
      >
        {loadingRegister ? "Registering..." : "Sign Up"}
      </button>

      {/* Google Login */}
      <button
        onClick={handleGoogle}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        disabled={loadingLogin || loadingRegister || loadingGoogle}
      >
        {loadingGoogle ? "Signing in with Google..." : "Login with Google"}
      </button>

      {/* Optional Logout Button */}
      {onLogout && (
        <button
          onClick={handleLogout}
          className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          Logout
        </button>
      )}
    </div>
  );
}
