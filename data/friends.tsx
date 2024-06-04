export const Friends: Friend[] = [
  {
    title: 'Example',
    description: 'Test',
    website: 'https://google.com',
    avatar: '/img/logo.png',
  },
]

export type Friend = {
  title: string
  description: string
  website: string
  avatar?: string
}
