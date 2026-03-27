"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"

export function ProfilePage() {
  const router = useRouter()
  const { currentUser, logout, setCurrentUser } = useAppStore()

  const [firstName, setFirstName] = useState(currentUser?.firstName || "")
  const [lastName, setLastName] = useState(currentUser?.lastName || "")
  const [studioName, setStudioName] = useState(currentUser?.studioName || "")
  const [city, setCity] = useState(currentUser?.city || "")
  const [state, setState] = useState(currentUser?.state || "")
  const [email, setEmail] = useState(currentUser?.email || "")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  if (!currentUser) return null

  const initials = `${currentUser.firstName[0]}${currentUser.lastName[0]}`

  const handleSaveProfile = () => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        firstName,
        lastName,
        studioName,
        city,
        state,
      })
    }
  }

  const handleUpdateEmail = () => {
    if (currentUser && email) {
      setCurrentUser({
        ...currentUser,
        email,
      })
    }
  }

  const handleUpdatePassword = () => {
    if (newPassword && newPassword === confirmPassword) {
      // In a real app, this would update the password
      alert("Password updated successfully (demo only)")
      setNewPassword("")
      setConfirmPassword("")
    } else if (newPassword !== confirmPassword) {
      alert("Passwords do not match")
    }
  }

  const handleSignOut = () => {
    logout()
    router.push("/")
  }

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      logout()
      router.push("/")
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl mb-1">
          <span className="font-medium text-foreground">Profile </span>
          <span className="font-serif italic text-muted-foreground">
            & Settings
          </span>
        </h1>
      </div>

      {/* Profile Card */}
      <Card className="mb-6">
        <CardHeader>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Your Profile
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Avatar className="h-14 w-14 bg-accent">
              <AvatarFallback className="text-lg font-medium bg-accent text-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p className="text-muted-foreground">{currentUser.studioName}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                First Name
              </Label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Name
              </Label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Studio Name */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Studio Name
            </Label>
            <Input
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                City
              </Label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                State
              </Label>
              <Input value={state} onChange={(e) => setState(e.target.value)} />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Card */}
      <Card className="mb-6">
        <CardHeader>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Account
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Email Address
            </Label>
            <div className="flex gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleUpdateEmail}>
                Update Email
              </Button>
            </div>
          </div>

          <hr className="border-border" />

          {/* Password */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                New Password
              </Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Confirm Password
              </Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleUpdatePassword}>Update Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <p className="text-xs font-medium text-destructive uppercase tracking-wider">
            Danger Zone
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground">Delete Account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data. This cannot be
                undone.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleDeleteAccount}
              className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSignOut}
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
