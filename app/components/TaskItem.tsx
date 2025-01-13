'use client'

import React from 'react'
import { Task } from '@/types/task'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const getTimeRemaining = () => {
    if (!task.dueDate) return null
    const now = new Date()
    const due = new Date(task.dueDate)
    const diff = due.getTime() - now.getTime()
    
    if (diff < 0) return '期限切れ'
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 24) return `残り${hours}時間`
    
    const days = Math.floor(hours / 24)
    return `残り${days}日`
  }

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'bg-red-100'
      case 'medium': return 'bg-yellow-100'
      case 'low': return 'bg-green-100'
      default: return 'bg-gray-100'
    }
  }

  return (
    <li className={`mb-2 p-4 rounded-lg ${getPriorityColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="h-5 w-5"
          />
          <div>
            <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </span>
            {task.dueDate && (
              <p className="text-sm text-gray-600">
                {getTimeRemaining()}
              </p>
            )}
            {task.priority && (
              <span className="text-sm text-gray-600 ml-2">
                優先度: {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          削除
        </button>
      </div>
    </li>
  )
} 