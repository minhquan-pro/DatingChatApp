export type User = {
  id: string
  name: string
  age: number
  bio: string
  image: string
  interests: string[]
}

export type Message = {
  id: string
  matchId: string
  text: string
  /** ISO timestamp */
  sentAt: string
  fromMe: boolean
}

export type MatchItem = {
  id: string
  user: User
  lastMessagePreview: string
  lastMessageAt: string
}
