import redis from "@/lib/redis"

const EXPIRY_SECONDS = 5 * 60 // 5 minutes

export async function setEmailToken(sessionId: string, email: string, accessToken: string) {
  try {
    const value = JSON.stringify({ email, accessToken })
    await redis.setex(`session:${sessionId}`, EXPIRY_SECONDS, value)
  } catch (error) {
    console.log(error)
  }
}

export async function getEmailToken(sessionId: string) {
  const data = await redis.get(`session:${sessionId}`)
  if (!data) return null
  try {
    return JSON.parse(data as string) as { email: string; accessToken: string }
  } catch {
    return null
  }
}

export async function deleteEmailToken(sessionId: string) {
  await redis.del(`session:${sessionId}`)
}
