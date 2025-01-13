'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react'

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
    <form onSubmit={handleSubmit} className="mb-4 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="新しいタスクを入力"
          required
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={priority}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => 
            setPriority(e.target.value as 'high' | 'medium' | 'low' | '')}
          className="border p-2 rounded"
        >
          <option value="">優先度を選択</option>
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          追加
        </button>
      </div>
    </form>
  )
} 