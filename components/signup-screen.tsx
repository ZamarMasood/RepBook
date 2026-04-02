"use client"

import { useState, useRef, useEffect } from "react"
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react"
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

export function SignupScreen() {
  // Step 1 state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Step 2 state
  const [studioName, setStudioName] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")

  // Step control
  const [step, setStep] = useState(1)

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

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--color-bare)",
        display: "flex",
        justifyContent: "center",
        fontFamily: FONT,
        overflow: "auto",
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 448,
          margin: "auto 0",
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

        {/* Stepper */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor: "#7FAF9B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: 11,
                fontFamily: FONT,
              }}
            >
              {step === 2 ? <Check size={12} strokeWidth={3} /> : "1"}
            </div>
            <span
              style={{
                color: "#2B2B2B",
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: 12,
                lineHeight: "16px",
              }}
            >
              Account
            </span>
          </div>

          <div style={{ width: 28, height: 1, backgroundColor: "#D0D0D0" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor: step === 2 ? "#4A6580" : "#E8E8E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: step === 2 ? "#FFFFFF" : "#BDBDBD",
                fontWeight: 500,
                fontSize: 11,
                fontFamily: FONT,
              }}
            >
              2
            </div>
            <span
              style={{
                color: step === 2 ? "#2B2B2B" : "#BDBDBD",
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: 12,
                lineHeight: "16px",
              }}
            >
              Profile
            </span>
          </div>
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
            {step === 1 ? "Create your account" : "Set up your profile"}
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
            {step === 1 ? "Set up your credentials" : "Help us personalise your experience"}
          </p>
        </div>

        {/* Step 1: Account Form */}
        {step === 1 && (
          <form onSubmit={handleContinue} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
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
              disabled={!email || !password || !confirmPassword}
              style={{
                width: "100%",
                height: 48,
                borderRadius: 8,
                backgroundColor: "#4A6580",
                color: "#FFFFFF",
                border: "none",
                cursor: !email || !password || !confirmPassword ? "default" : "pointer",
                opacity: !email || !password || !confirmPassword ? 0.5 : 1,
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
        )}

        {/* Step 2: Profile Form */}
        {step === 2 && (
          <form onSubmit={handleCreateAccount} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Studio Name */}
            <div>
              <label style={labelStyle}>Studio Name</label>
              <input
                type="text"
                placeholder="Body Balance Studio"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#4A6580")}
                onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
              />
            </div>

            {/* City / State */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>City</label>
                <input
                  type="text"
                  placeholder="San Francisco"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#4A6580")}
                  onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
                />
              </div>
              <div>
                <label style={labelStyle}>State</label>
                <input
                  type="text"
                  placeholder="California"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#4A6580")}
                  onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
                />
              </div>
            </div>

            {/* Back + Create Account Buttons */}
            <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  width: 100,
                  height: 48,
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
                type="submit"
                disabled={!studioName || !city || !state}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: "#4A6580",
                  color: "#FFFFFF",
                  border: "none",
                  cursor: (!studioName || !city || !state) ? "default" : "pointer",
                  opacity: (!studioName || !city || !state) ? 0.5 : 1,
                  fontSize: 14,
                  fontFamily: FONT,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                Create Account
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}

        {/* Sign in link */}
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
          Already have an account?{" "}
          <Link
            href="/"
            style={{
              color: "#4A6580",
              fontWeight: 500,
              textDecoration: "underline",
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
