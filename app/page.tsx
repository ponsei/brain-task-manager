'use client'

import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Task } from '@/types/task'
import TaskItem from './components/TaskItem'
import TaskForm from './components/TaskForm'
import RewardAnimation from './components/RewardAnimation'
import LandingPage from './components/LandingPage'
import { motion, AnimatePresence } from 'framer-motion'

// エラー処理の型定義を追加
type ErrorType = Error | null

export default function Page(): JSX.Element {
  const { data: session, status } = useSession()
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputTask, setInputTask] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showReward, setShowReward] = useState(false)
  const [rewardPoints, setRewardPoints] = useState(0)

  // データ取得関数を修正
  const fetchTasks = async (userEmail: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(`/api/tasks?userId=${encodeURIComponent(userEmail)}`)
      
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format')
      }

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(errorData.error || 'Failed to fetch tasks')
      }

      const data = await response.json()
      console.log('Fetched tasks:', data)
      setTasks(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Detailed error:', error)
      setError('タスクの取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  // セッション状態の監視
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchTasks(session.user.email)
    } else if (status === 'unauthenticated') {
      setTasks([])
      setIsLoading(false)
    }
  }, [session?.user?.email, status])

  // 再試行機能の追加
  const handleRetry = () => {
    if (session?.user?.email) {
      fetchTasks(session.user.email)
    }
  }

  // エラー表示
  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm"
          >
            <p className="text-red-400">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRetry}
              className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
            >
              再試行
            </motion.button>
          </motion.div>
        </div>
      </main>
    )
  }

  // ログイン状態の確認を修正
  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </main>
    )
  }

  if (status === 'unauthenticated') {
    return <LandingPage />
  }

  // タスク更新時の保存は削除（データベースに保存されるため）

  const handleAddTask = async (taskData: {
    title: string
    dueDate?: Date
    priority?: 'high' | 'medium' | 'low'
  }) => {
    if (!session) return

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...taskData,
          userId: session.user?.email || '',
        }),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }
      const newTask = await response.json()
      setTasks([...tasks, newTask])
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const handleToggle = async (id: string) => {
    const taskToUpdate = tasks.find(task => task.id === id)
    if (!taskToUpdate) return

    try {
      const response = await fetch('/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          completed: !taskToUpdate.completed,
        }),
      })
      const updatedTask = await response.json()

      // タスク完了時の演出
      if (!taskToUpdate.completed) {
        setShowReward(true)
        const points = calculatePoints(taskToUpdate)
        setRewardPoints(points)
        setTimeout(() => setShowReward(false), 3000)
      }

      setTasks(tasks.map(task =>
        task.id === id ? updatedTask : task
      ))
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  // ポイント計算関数
  const calculatePoints = (task: Task) => {
    let points = 100  // 基本ポイント
    
    // 期限内完了ボーナス
    if (task.dueDate && new Date() <= new Date(task.dueDate)) {
      points += 50
    }
    
    // 優先度ボーナス
    if (task.priority === 'high') points += 30
    
    return points
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/tasks?id=${id}`, {
        method: 'DELETE',
      })
      setTasks(tasks.filter(task => task.id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            タスク管理
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signOut()}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
          >
            ログアウト
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <TaskForm onSubmit={handleAddTask} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {tasks.map((task: Task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <RewardAnimation 
        show={showReward} 
        points={rewardPoints}
        message="タスク完了！"
      />
    </main>
  )
} 