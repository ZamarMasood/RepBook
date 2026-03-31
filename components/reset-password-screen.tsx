"use client"

import { useState, useRef, useEffect } from "react"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import Link from "next/link"

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
  height: 48,
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

export function ResetPasswordScreen() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const [passwordCursor, setPasswordCursor] = useState<number | null>(null)
  const [confirmCursor, setConfirmCursor] = useState<number | null>(null)

  useEffect(() => {
    if (passwordCursor !== null && passwordRef.current && !showPassword) {
      passwordRef.current.setSelectionRange(passwordCursor, passwordCursor)
    }
  }, [password, passwordCursor, showPassword])

  useEffect(() => {
    if (confirmCursor !== null && confirmPasswordRef.current && !showConfirmPassword) {
      confirmPasswordRef.current.setSelectionRange(confirmCursor, confirmCursor)
    }
  }, [confirmPassword, confirmCursor, showConfirmPassword])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const isFormEmpty = !password || !confirmPassword

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
        paddingTop: 62,
        paddingBottom: 62,
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
            Create new Password
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
            Set up your new password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Password */}
          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                ref={passwordRef}
                type="text"
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div>
            <label style={labelStyle}>Confirm Password</label>
            <div style={{ position: "relative" }}>
              <input
                ref={confirmPasswordRef}
                type="text"
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={showConfirmPassword ? confirmPassword : "*".repeat(confirmPassword.length)}
                onChange={(e) =>
                  handleMaskedInput(e, confirmPassword, setConfirmPassword, setConfirmCursor, showConfirmPassword)
                }
                style={{ ...inputStyle, padding: "4px 40px 4px 12px" }}
                onFocus={(e) => (e.target.style.borderColor = "#4A6580")}
                onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {showConfirmPassword ? <EyeOff size={16} color="#BDBDBD" /> : <Eye size={16} color="#BDBDBD" />}
              </button>
            </div>
          </div>

          {/* Continue Button */}
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
            Continue
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Back to sign in link */}
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
          <Link
            href="/"
            style={{
              color: "#828282",
              fontWeight: 400,
              textDecoration: "none",
            }}
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
