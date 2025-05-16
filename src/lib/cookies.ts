import { UserRole } from "@/types/types"
import Cookies from "js-cookie"

// Cookie expiration in days
const COOKIE_EXPIRATION = 7

export interface UserData {
  _id: string
  name: string
  email: string
  avatarUrl?: string;
  role: UserRole;
}

export const setCookies = (token: string, userData: UserData) => {
  // Set secure HttpOnly cookies on production
  const options = {
    expires: COOKIE_EXPIRATION,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  }

  // Store token
  Cookies.set("token", token, options)

  // Store user data as JSON
  Cookies.set("userData", JSON.stringify(userData), options)
}

export const getCookies = () => {
  const token = Cookies.get("token")
  const userDataString = Cookies.get("userData")

  let userData: UserData | null = null

  if (userDataString) {
    try {
      userData = JSON.parse(userDataString)
    } catch (e) {
      console.error("Error parsing user data from cookie", e)
    }
  }

  return { token, userData }
}

export const clearCookies = () => {
  Cookies.remove("token")
  Cookies.remove("userData")
}

export const isAuthenticated = () => {
  const { token } = getCookies()
  return !!token
}
