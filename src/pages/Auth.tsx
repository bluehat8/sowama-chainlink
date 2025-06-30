"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Lock, Mail, LogIn, UserPlus } from "lucide-react"
import { FcGoogle } from 'react-icons/fc';

import supabase from "../supabaseClient"

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState<boolean>(true)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignIn) {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      if (error) alert(error.message)
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!")
        return
      }
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      })
      if (error) {
        alert(error.message)
      } else {
        alert("Check your email for a verification link!")
      }
    }
  }

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    })
    if (error) {
      alert(`Error signing in with Google: ${error.message}`)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url('/hero.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay para oscurecer el fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-teal-900/30 backdrop-blur-sm" />

      <div
        className={`auth-container relative ${isSignIn ? "" : "right-panel-active"}`}
        style={{
          width: "950px",
          minHeight: "650px",
        }}
      >
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="glass-card p-8 w-full max-w-lg"
          >
            <img src="/logo.svg" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-center text-white">Create Account</h1>

            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="glass-button flex items-center gap-2 px-4 py-2 text-white hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <FcGoogle className="w-4 h-4" />
                </div>
                <span>Sign up with Google</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center mb-4">
              <div className="border-t border-white/30 w-full"></div>
              <span className="bg-black/20 backdrop-blur-sm px-4 text-white/80 text-sm rounded-full">
                or
              </span>
              <div className="border-t border-white/30 w-full"></div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-white/60 w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="glass-input w-full pl-10 pr-4 py-3 text-white placeholder-white/60"
                    required
                  />
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="glass-input w-full px-4 py-3 text-white placeholder-white/60"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-white/60 w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="glass-input w-full pl-10 pr-4 py-3 text-white placeholder-white/60"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-white/60 w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="glass-input w-full pl-10 pr-4 py-3 text-white placeholder-white/60"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-white/60 w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="glass-input w-full pl-10 pr-4 py-3 text-white placeholder-white/60"
                  required
                />
              </div>

              <p className="text-xs text-white/70 mt-2">
                Use 8 or more characters with a mix of letters, numbers & symbols
              </p>

              <button
                type="submit"
                className="glass-button-primary w-full py-3 px-4 font-medium flex items-center justify-center gap-2 text-white hover:bg-gradient-to-r hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </button>
              <p className="mt-4 text-center text-sm text-white/80 md:hidden">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignIn(true)}
                  className="font-semibold text-emerald-300 hover:text-emerald-200 transition-colors bg-transparent border-none p-0"
                >
                  Sign In
                </button>
              </p>
            </div>
          </motion.form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <motion.form
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="glass-card p-8 w-full max-w-lg z-10"
          >
            <img src="/logo.svg" alt="Logo" className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-6 text-center text-white">Sign in</h1>

            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="glass-button flex items-center gap-2 px-4 py-2 text-white hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <FcGoogle className="w-4 h-4" />
                </div>
                <span>Sign in with Google</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-white/30 w-full"></div>
              <span className="bg-black/20 backdrop-blur-sm px-4 text-white/80 text-sm rounded-full">
                or
              </span>
              <div className="border-t border-white/30 w-full"></div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-white/60 w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="glass-input w-full pl-10 pr-4 py-3 text-white placeholder-white/60"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-white/60 w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="glass-input w-full pl-10 pr-4 py-3 text-white placeholder-white/60"
                  required
                />
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors">
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                className="glass-button-primary w-full py-3 px-4 font-medium flex items-center justify-center gap-2 text-white hover:bg-gradient-to-r hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
              <p className="mt-4 text-center text-sm text-white/80 md:hidden">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignIn(false)}
                  className="font-semibold text-emerald-300 hover:text-emerald-200 transition-colors bg-transparent border-none p-0"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </motion.form>
        </div>

        {/* Overlay Panels */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-white glass-overlay-content"
              >
                <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                <p className="mb-6 text-white/90">To keep connected with us please login with your personal info</p>
                <button
                  onClick={() => setIsSignIn(true)}
                  className="glass-button-outline px-8 py-3 font-medium transition-all duration-300 hover:bg-white/20"
                >
                  Sign In
                </button>
              </motion.div>
            </div>
            <div className="overlay-panel overlay-right">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-white glass-overlay-content"
              >
                <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
                <p className="mb-6 text-white/90">Enter your personal details and start your journey with us</p>
                <button
                  onClick={() => setIsSignIn(false)}
                  className="glass-button-outline px-8 py-3 font-medium transition-all duration-300 hover:bg-white/20"
                >
                  Sign Up
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
