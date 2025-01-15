'use client'

import React from 'react'
import { Task } from '@/types/task'
import { motion } from 'framer-motion'

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
      case 'high': return 'from-red-500/20 to-red-500/10'
      case 'medium': return 'from-yellow-500/20 to-yellow-500/10'
      case 'low': return 'from-green-500/20 to-green-500/10'
      default: return 'from-gray-500/20 to-gray-500/10'
    }
  }

  const getPriorityBorder = () => {
    switch (task.priority) {
      case 'high': return 'border-red-500/30'
      case 'medium': return 'border-yellow-500/30'
      case 'low': return 'border-green-500/30'
      default: return 'border-gray-500/30'
    }
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`mb-4 rounded-xl border ${getPriorityBorder()} bg-gradient-to-r ${getPriorityColor()} backdrop-blur-sm p-4 shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="h-5 w-5 rounded-md border-2 border-gray-300 checked:border-blue-500 checked:bg-blue-500 transition-colors duration-200 cursor-pointer"
            />
            {task.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-white text-xs">✓</span>
              </motion.div>
            )}
          </div>
          <div className="flex flex-col">
            <span className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </span>
            <div className="flex items-center space-x-2 mt-1">
              {task.dueDate && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ⏰ {getTimeRemaining()}
                </span>
              )}
              {task.priority && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'}`}>
                  🎯 {task.priority === 'high' ? '高優先' : task.priority === 'medium' ? '中優先' : '低優先'}
                </span>
              )}
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 rounded-lg text-sm text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          削除
        </motion.button>
      </div>
    </motion.li>
  )
} 