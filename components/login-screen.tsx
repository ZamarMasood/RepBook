"use client"

import { useState, useRef, useEffect } from "react"
import { Eye, EyeOff, ArrowRight, ArrowLeft, X, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useAppStore } from "@/lib/store"

const FONT = "var(--font-roboto), Roboto, sans-serif"

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#2B2B2B",
  fontFamily: FONT,
  fontWeight: 600,
  fontSize: 13,
  lineHeight: "18px",
  marginBottom: 6,
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 44,
  borderRadius: 8,
  border: "0.8px solid #E0E0E0",
  padding: "4px 12px",
  fontSize: 14,
  fontFamily: FONT,
  fontWeight: 400,
  color: "#2B2B2B",
  backgroundColor: "#FFFFFF",
  outline: "none",
  boxSizing: "border-box",
}

export function LoginScreen() {
  const { login } = useAppStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Forgot password modal state
  const [forgotOpen, setForgotOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotStep, setForgotStep] = useState<"form" | "sent">("form")

  const passwordRef = useRef<HTMLInputElement>(null)
  const [passwordCursor, setPasswordCursor] = useState<number | null>(null)

  useEffect(() => {
    if (passwordCursor !== null && passwordRef.current && !showPassword) {
      passwordRef.current.setSelectionRange(passwordCursor, passwordCursor)
    }
  }, [password, passwordCursor, showPassword])

  const handleMaskedInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    currentValue: string,
    setValue: (v: string) => void,
    setCursor: (c: number) => void,
    isVisible: boolean
  ) => {
    if (isVisible) {
      setValue(e.target.value)
      return
    }

    const input = e.target
    const newVal = input.value
    const cursor = input.selectionStart ?? newVal.length
    const diff = newVal.length - currentValue.length

    setCursor(cursor)

    if (diff > 0) {
      const inserted = newVal.slice(cursor - diff, cursor)
      setValue(currentValue.slice(0, cursor - diff) + inserted + currentValue.slice(cursor - diff))
    } else if (diff < 0) {
      setValue(currentValue.slice(0, cursor) + currentValue.slice(cursor - diff))
    } else if (newVal.length === currentValue.length && newVal !== "*".repeat(currentValue.length)) {
      let i = 0
      while (i < newVal.length && newVal[i] === "*") i++
      let j = newVal.length - 1
      while (j >= 0 && newVal[j] === "*") j--
      if (i <= j) {
        const replacement = newVal.slice(i, j + 1)
        setValue(currentValue.slice(0, i) + replacement + currentValue.slice(j + 1))
      }
    }
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    login("user1")
  }

  const isFormEmpty = !email || !password

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#F5F3F0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT,
        overflow: "auto",
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 448,
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: "#4A6580",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 18,
              fontFamily: FONT,
            }}
          >
            R
          </div>
          <span
            style={{
              color: "#4A6580",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 32,
              lineHeight: "32px",
              letterSpacing: 0,
            }}
          >
            Repbook
          </span>
        </div>

        {/* Heading + Subtitle */}
        <div>
          <h1
            style={{
              color: "#2B2B2B",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 28,
              lineHeight: "34px",
              letterSpacing: 0,
              margin: 0,
            }}
          >
            Welcome back
          </h1>
          <p
            style={{
              color: "#828282",
              fontFamily: FONT,
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "22px",
              margin: "4px 0 0 0",
            }}
          >
            Log in to your RepBook workspace
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Email */}
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="sarah@studio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#4A6580")}
              onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
            />
          </div>

          {/* Password */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label
                style={{
                  color: "#2B2B2B",
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 13,
                  lineHeight: "18px",
                }}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email)
                  setForgotStep("form")
                  setForgotOpen(true)
                }}
                style={{
                  color: "#4A6580",
                  fontFamily: FONT,
                  fontWeight: 500,
                  fontSize: 12,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Forgot password?
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <input
                ref={passwordRef}
                type="text"
                autoComplete="current-password"
                placeholder="Min. 8 characters"
                value={showPassword ? password : "*".repeat(password.length)}
                onChange={(e) => handleMaskedInput(e, password, setPassword, setPasswordCursor, showPassword)}
                style={{ ...inputStyle, padding: "4px 40px 4px 12px" }}
                onFocus={(e) => (e.target.style.borderColor = "#4A6580")}
                onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={16} color="#BDBDBD" /> : <Eye size={16} color="#BDBDBD" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isFormEmpty}
            style={{
              width: "100%",
              height: 48,
              borderRadius: 8,
              backgroundColor: "#4A6580",
              color: "#FFFFFF",
              border: "none",
              cursor: isFormEmpty ? "default" : "pointer",
              opacity: isFormEmpty ? 0.5 : 1,
              fontSize: 14,
              fontFamily: FONT,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 6,
            }}
          >
            Sign In
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Sign up link */}
        <p
          style={{
            textAlign: "center",
            margin: 0,
            fontSize: 13,
            fontFamily: FONT,
            fontWeight: 400,
            color: "#828282",
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            style={{
              color: "#4A6580",
              fontWeight: 500,
              textDecoration: "underline",
            }}
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {forgotOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
          onClick={() => setForgotOpen(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 398,
              backgroundColor: "#F5F3F0",
              borderRadius: 16,
              border: "1.6px solid #E5E7EB",
              padding: 24,
              boxSizing: "border-box",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setForgotOpen(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <X size={18} color="#828282" />
            </button>

            {forgotStep === "form" ? (
              <>
                {/* Reset Password Form */}
                <h2
                  style={{
                    color: "#2B2B2B",
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 20,
                    lineHeight: "26px",
                    margin: 0,
                  }}
                >
                  Reset password
                </h2>
                <p
                  style={{
                    color: "#828282",
                    fontFamily: FONT,
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: "20px",
                    margin: "4px 0 0 0",
                  }}
                >
                  We&apos;ll send a reset link to your email
                </p>

                <div style={{ marginTop: 24 }}>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    placeholder="sarah@studio.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#4A6580")}
                    onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
                  />
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                  <button
                    type="button"
                    onClick={() => setForgotOpen(false)}
                    style={{
                      width: 100,
                      height: 44,
                      borderRadius: 8,
                      backgroundColor: "#FFFFFF",
                      color: "#2B2B2B",
                      border: "0.8px solid #E0E0E0",
                      cursor: "pointer",
                      fontSize: 14,
                      fontFamily: FONT,
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgotStep("sent")}
                    disabled={!forgotEmail}
                    style={{
                      flex: 1,
                      height: 44,
                      borderRadius: 8,
                      backgroundColor: "#4A6580",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: !forgotEmail ? "default" : "pointer",
                      opacity: !forgotEmail ? 0.5 : 1,
                      fontSize: 14,
                      fontFamily: FONT,
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    Send reset link
                    <ArrowRight size={14} />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Check Your Inbox */}
                <div style={{ textAlign: "center", paddingTop: 8 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      backgroundColor: "#E8F5EE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <CheckCircle size={28} color="#7FAF9B" />
                  </div>

                  <h2
                    style={{
                      color: "#2B2B2B",
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 18,
                      lineHeight: "24px",
                      margin: 0,
                    }}
                  >
                    Check your inbox
                  </h2>

                  <p
                    style={{
                      color: "#2B2B2B",
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 16,
                      margin: "20px 0 0 0",
                    }}
                  >
                    Reset link sent!
                  </p>

                  <p
                    style={{
                      color: "#828282",
                      fontFamily: FONT,
                      fontWeight: 400,
                      fontSize: 13,
                      lineHeight: "20px",
                      margin: "8px 0 0 0",
                    }}
                  >
                    We&apos;ve sent a password reset link to
                  </p>

                  <p
                    style={{
                      color: "#4A6580",
                      fontFamily: FONT,
                      fontWeight: 600,
                      fontSize: 14,
                      margin: "4px 0 0 0",
                    }}
                  >
                    {forgotEmail}
                  </p>

                  <p
                    style={{
                      color: "#828282",
                      fontFamily: FONT,
                      fontWeight: 400,
                      fontSize: 12,
                      margin: "16px 0 0 0",
                    }}
                  >
                    Didn&apos;t get it? Check your spam folder or{" "}
                    <button
                      type="button"
                      onClick={() => setForgotStep("form")}
                      style={{
                        color: "#2B2B2B",
                        fontFamily: FONT,
                        fontWeight: 600,
                        fontSize: 12,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        textDecoration: "underline",
                      }}
                    >
                      try again
                    </button>
                  </p>

                  <button
                    type="button"
                    onClick={() => setForgotOpen(false)}
                    style={{
                      width: "100%",
                      height: 44,
                      borderRadius: 8,
                      backgroundColor: "#4A6580",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14,
                      fontFamily: FONT,
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      marginTop: 24,
                    }}
                  >
                    <ArrowLeft size={14} />
                    Back to sign in
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
