export type TaskStatus = 'todo' | 'in_progress' | 'completed'

export interface Task {
  id: string
  title: string
  completed: boolean
  userId: string
  dueDate?: Date
  priority?: 'high' | 'medium' | 'low'
  status: TaskStatus
  createdAt: Date
  updatedAt: Date
}

export type TaskUpdateInput = {
  title?: string
  completed?: boolean
  dueDate?: Date | null
  priority?: 'high' | 'medium' | 'low'
  status?: TaskStatus
} 