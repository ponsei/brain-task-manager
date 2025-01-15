'use client'

import React from 'react'
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import { Task, TaskStatus } from '@/types/task'
import StrictModeDroppable from './StrictModeDroppable'

interface KanbanBoardProps {
  tasks: Task[]
  onTaskCreate: (task: { 
    title: string
    dueDate?: Date
    priority?: 'high' | 'medium' | 'low'
  }) => void
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void
  onTaskDelete: (taskId: string) => void
}

export default function KanbanBoard({
  tasks,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
}: KanbanBoardProps) {
  const columns = {
    todo: {
      title: 'Todo',
      items: tasks.filter(task => task.status === 'todo')
    },
    in_progress: {
      title: '進行中',
      items: tasks.filter(task => task.status === 'in_progress')
    },
    completed: {
      title: '完了',
      items: tasks.filter(task => task.status === 'completed')
    }
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result
    const taskId = result.draggableId
    const task = tasks.find(t => t.id === taskId)
    
    if (!task) return

    const newStatus = destination.droppableId as TaskStatus
    const isCompleted = newStatus === 'completed'

    onTaskUpdate(taskId, {
      status: newStatus,
      completed: isCompleted
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TaskForm onSubmit={onTaskCreate} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">
                  {column.title}{' '}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({column.items.length})
                  </span>
                </h2>
              </div>
              <StrictModeDroppable droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="p-4 min-h-[calc(100vh-20rem)] overflow-y-auto"
                  >
                    {column.items.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-3"
                          >
                            <TaskItem
                              task={task}
                              onToggle={() => onTaskUpdate(task.id, {
                                completed: !task.completed,
                                status: !task.completed ? 'completed' : 'todo'
                              })}
                              onDelete={() => onTaskDelete(task.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
} 