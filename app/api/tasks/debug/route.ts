import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { Task, TaskStatus } from '@/types/task'

export async function GET(request: Request) {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    }) as Task[]

    return new NextResponse(JSON.stringify({
      totalTasks: tasks.length,
      tasksByStatus: {
        todo: tasks.filter(t => t.status === 'todo').length,
        in_progress: tasks.filter(t => t.status === 'in_progress').length,
        completed: tasks.filter(t => t.status === 'completed').length
      },
      tasks
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch debug info' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
} 