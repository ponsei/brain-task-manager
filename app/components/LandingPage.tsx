'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-700">
      {/* ヘッダー */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">脳汁が出るタスク管理</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signIn('github')}
            className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            ログイン
          </motion.button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2 className="text-5xl font-bold mb-8 text-white">
              タスクを達成するたび<br />
              <span className="text-yellow-400">脳汁ドバドバ</span>
            </h2>
            <p className="text-xl mb-12 text-white/80">
              パチンコのような快感と達成感を組み合わせた、<br />
              中毒性MAXのタスク管理アプリ
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white"
            >
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">タスクの80%が完了</h3>
              <p className="text-white/80">ゲーミフィケーションで、タスク完了率が大幅に向上</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white"
            >
              <div className="text-3xl mb-4">⚡️</div>
              <h3 className="text-xl font-bold mb-2">生産性が1.5倍に</h3>
              <p className="text-white/80">達成感の演出で、モチベーションが持続的に向上</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white"
            >
              <div className="text-3xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-2">継続率95%以上</h3>
              <p className="text-white/80">ゲーム要素により、習慣化をサポート</p>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signIn('github')}
            className="bg-yellow-400 text-gray-900 px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-yellow-300 transition-colors"
          >
            無料で始める
          </motion.button>
          <p className="text-white/60 mt-4 text-sm">
            GitHubアカウントで即座にログイン
          </p>
        </div>
      </div>

      {/* 新しい悩みセクション */}
      <div className="bg-white/10 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              あなたがタスク管理できないのは、<br />
              <span className="text-yellow-400">刺激が足りない</span>からです
            </h2>

            <div className="space-y-6 mb-16">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">😫</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      普通のタスク管理では続かない...
                    </h3>
                    <p className="text-white/80">
                      ToDo リストを作っても、刺激が足りずに途中で挫折してしまう
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">😔</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      達成感が感じられない
                    </h3>
                    <p className="text-white/80">
                      タスクを完了しても、次のタスクが待っているだけで充実感がない
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🤔</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      タスクが楽しくない
                    </h3>
                    <p className="text-white/80">
                      作業自体が義務的で、やらされている感が強い
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">
                脳汁が出るタスク管理で、毎日が快感に変わります！
              </h3>
              <p className="text-white/80 mb-8">
                パチンコのような演出と報酬システムで、<br />
                タスク達成が病みつきになる新しい体験を。
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signIn('github')}
                className="bg-yellow-400 text-gray-900 px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-yellow-300 transition-colors"
              >
                無料で始める
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 