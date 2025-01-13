export interface Task {
  id: string
  title: string
  completed: boolean
  userId: string
  dueDate?: Date | string
  priority?: 'high' | 'medium' | 'low'
  reward: number
  streak: number
  createdAt: Date
  updatedAt: Date
} 