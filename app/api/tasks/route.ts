import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    console.log('Fetching tasks for userId:', userId)
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    console.log('Found tasks:', tasks)
    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const { title, userId, dueDate, priority } = await request.json()
  
  try {
    const task = await prisma.task.create({
      data: {
        title,
        userId,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        priority
      },
    })
    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const { id, completed, dueDate, priority } = await request.json()
  
  try {
    const task = await prisma.task.update({
      where: { id },
      data: { 
        completed,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        priority
      },
    })
    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'Task ID is required' }, { status: 400 })
  }

  try {
    await prisma.task.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
} 