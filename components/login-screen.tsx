"use client"

import { testUsers } from "@/lib/data"
import { useAppStore } from "@/lib/store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export function LoginScreen() {
  const { login } = useAppStore()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl tracking-tight mb-2">
          <span className="font-medium text-foreground">rep</span>
          <span className="font-serif italic text-muted-foreground">book</span>
        </h1>
        <p className="text-muted-foreground">
          Select an account to continue
        </p>
      </div>

      <div className="grid gap-4 w-full max-w-md">
        {testUsers.map((user) => {
          const initials = `${user.firstName[0]}${user.lastName[0]}`
          return (
            <Card
              key={user.id}
              className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
              onClick={() => login(user.id)}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-12 w-12 bg-accent">
                  <AvatarFallback className="text-sm font-medium bg-accent text-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {user.studioName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.city}, {user.state}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {user.email}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <p className="mt-8 text-sm text-muted-foreground text-center max-w-sm">
        These are test accounts with pre-populated data. Click on either account to explore the app.
      </p>
    </div>
  )
}
