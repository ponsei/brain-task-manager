'use client'

import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'

interface RewardAnimationProps {
  show: boolean
  points: number
  message: string
}

export default function RewardAnimation({ show, points, message }: RewardAnimationProps) {
  useEffect(() => {
    if (show) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-lg shadow-xl text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-2">{message}</h2>
            <p className="text-2xl text-white">+{points} ポイント獲得！</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 