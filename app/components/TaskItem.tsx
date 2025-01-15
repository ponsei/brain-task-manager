'use client'

import React, { useEffect } from 'react'
import { Task } from '@/types/task'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const getFormattedDateTime = () => {
    if (!task.dueDate) return null
    const date = new Date(task.dueDate)
    return format(date, 'M月d日(E) HH:mm', { locale: ja })
  }

  const getTimeRemaining = () => {
    if (!task.dueDate) return null
    const now = new Date()
    const due = new Date(task.dueDate)
    const diff = due.getTime() - now.getTime()
    
    if (diff < 0) return '期限切れ'
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 24) {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      return `残り${hours}時間${minutes}分`
    }
    
    const days = Math.floor(hours / 24)
    return `残り${days}日`
  }

  const getPriorityColor = () => {
    if (task.completed) return 'from-gray-100 to-gray-50'
    switch (task.priority) {
      case 'high': return 'from-rose-50 to-white'
      case 'medium': return 'from-amber-50 to-white'
      case 'low': return 'from-emerald-50 to-white'
      default: return 'from-blue-50 to-white'
    }
  }

  const getPriorityBorder = () => {
    if (task.completed) return 'border-gray-200'
    switch (task.priority) {
      case 'high': return 'border-rose-200'
      case 'medium': return 'border-amber-200'
      case 'low': return 'border-emerald-200'
      default: return 'border-blue-200'
    }
  }

  const getPriorityIcon = () => {
    switch (task.priority) {
      case 'high': return '🔥'
      case 'medium': return '⚡️'
      case 'low': return '🎯'
      default: return '📌'
    }
  }

  const [prevCompleted, setPrevCompleted] = React.useState(task.completed)

  useEffect(() => {
    if (task.completed && !prevCompleted) {
      const audio = new Audio('/complete.mp3')
      audio.volume = 0.3
      audio.play()
    }
    setPrevCompleted(task.completed)
  }, [task.completed])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group mb-4 rounded-xl border ${getPriorityBorder()} bg-gradient-to-r ${getPriorityColor()} p-4 shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <motion.label 
            className="relative flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="peer h-5 w-5 rounded-full border-2 border-gray-300 checked:border-blue-500 checked:bg-blue-500 transition-colors duration-200 cursor-pointer appearance-none"
            />
            <AnimatePresence>
              {task.completed && (
                <motion.svg
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute h-3 w-3 text-white pointer-events-none"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 12 12"
                  stroke="currentColor"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.2 }}
                    d="M2 6l3 3 5-5"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.label>
          <div className="flex flex-col flex-1 min-w-0">
            <span className={`text-lg font-medium truncate ${task.completed ? 'text-gray-400' : 'text-gray-900'} transition-all duration-200`}>
              {task.title}
            </span>
            {task.dueDate && (
              <motion.div 
                className="flex items-center space-x-2 mt-1"
                whileHover={{ scale: 1.02 }}
              >
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  task.completed ? 'bg-gray-100 text-gray-500' :
                  'bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors duration-200'
                }`}>
                  ⏰ {getFormattedDateTime()} ({getTimeRemaining()})
                </span>
                {!task.completed && task.priority && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                    ${task.priority === 'high' ? 'bg-rose-50 text-rose-700' : 
                      task.priority === 'medium' ? 'bg-amber-50 text-amber-700' : 
                      'bg-emerald-50 text-emerald-700'}`}>
                    {getPriorityIcon()} {task.priority === 'high' ? '高優先' : task.priority === 'medium' ? '中優先' : '低優先'}
                  </span>
                )}
              </motion.div>
            )}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 ml-4 px-3 py-1.5 rounded-lg text-sm text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all duration-200"
        >
          削除
        </motion.button>
      </div>
    </motion.div>
  )
} 