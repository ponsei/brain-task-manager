import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'
import type { TaskStatus } from '@/types/task'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return new NextResponse(JSON.stringify(tasks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch tasks' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function POST(request: Request) {
  try {
    const { title, userId, dueDate, priority, status } = await request.json()
    
    const task = await prisma.task.create({
      data: {
        title,
        userId,
        completed: false,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        priority,
        reward: 0,
        streak: 0,
        status: 'todo',
      },
    })

    return new NextResponse(JSON.stringify(task), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Create task error:', error)
    return new NextResponse(JSON.stringify({ error: 'Failed to create task' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, completed, dueDate, priority } = await request.json()
    
    if (status && !['todo', 'in_progress', 'completed'].includes(status)) {
      return new NextResponse(JSON.stringify({ error: 'Invalid status value' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    const task = await prisma.task.update({
      where: { id },
      data: {
        completed,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        priority,
        status,
      },
    })

    return new NextResponse(JSON.stringify(task), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Update task error:', error)
    return new NextResponse(JSON.stringify({ error: 'Failed to update task' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return new NextResponse(JSON.stringify({ error: 'Task ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    await prisma.task.delete({
      where: { id },
    })

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to delete task' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}