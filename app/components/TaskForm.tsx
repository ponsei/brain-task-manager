'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

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
  const [dueTime, setDueTime] = useState('')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low' | ''>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title.trim()) return

    let finalDueDate: Date | undefined = undefined
    if (dueDate) {
      finalDueDate = new Date(dueDate)
      if (dueTime) {
        const [hours, minutes] = dueTime.split(':')
        finalDueDate.setHours(parseInt(hours), parseInt(minutes))
      }
    }

    onSubmit({
      title,
      dueDate: finalDueDate,
      priority: priority || undefined
    })

    setTitle('')
    setDueDate('')
    setDueTime('')
    setPriority('')
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex flex-col space-y-4">
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
          placeholder="新しいタスクを入力"
          required
        />
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2 flex-1 min-w-[280px]">
            <div className="relative flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                  placeholder="期限日を選択"
                />
              </div>
            </div>
            <div className="relative w-32">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ClockIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="time"
                  value={dueTime}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDueTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-stretch">
            <motion.select
              whileFocus={{ scale: 1.01 }}
              value={priority}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                setPriority(e.target.value as 'high' | 'medium' | 'low' | '')}
              className="w-40 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            >
              <option value="" className="text-gray-500">優先度を選択</option>
              <option value="high" className="text-gray-900">🔥 高優先</option>
              <option value="medium" className="text-gray-900">⚡️ 中優先</option>
              <option value="low" className="text-gray-900">🎯 低優先</option>
            </motion.select>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              追加
            </motion.button>
          </div>
        </div>
      </div>
    </motion.form>
  )
} 