'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'

interface TaskFormProps {
  onSubmit: (task: {
    title: string
    dueDate?: Date
    priority?: 'high' | 'medium' | 'low'
  }) => void
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low' | ''>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title.trim()) return

    onSubmit({
      title,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority: priority || undefined
    })

    setTitle('')
    setDueDate('')
    setPriority('')
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="mb-6 p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-xl"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
            placeholder="新しいタスクを入力"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="datetime-local"
            value={dueDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
          />
          <motion.select
            whileFocus={{ scale: 1.01 }}
            value={priority}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => 
              setPriority(e.target.value as 'high' | 'medium' | 'low' | '')}
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
          >
            <option value="">優先度を選択</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </motion.select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 shadow-lg shadow-blue-500/30"
          >
            追加
          </motion.button>
        </div>
      </div>
    </motion.form>
  )
} 