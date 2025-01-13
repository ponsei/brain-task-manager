export interface Task {
  id: string
  title: string
  completed: boolean
  userId: string
  dueDate?: Date
  priority?: 'high' | 'medium' | 'low'
  reward: number
  streak: number
  createdAt: Date
  updatedAt: Date
} 