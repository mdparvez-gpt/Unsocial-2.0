'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share2, Sparkles, Compass, User } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(142)
  const [showHeart, setShowHeart] = useState(false)

  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true)
      setLikesCount(prev => prev + 1)
    }
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 800)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center pb-20">
      <header className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-black bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Unsocial 2.0
        </h1>
        <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
      </header>

      <div className="w-full max-w-md px-4 mt-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="flex items-center p-3.5 space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 p-[2px]">
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center font-bold text-xs">
                U
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">mdparvez_dev</p>
              <p className="text-[10px] text-zinc-400">Running on Termux • Just now</p>
            </div>
          </div>

          <div 
            onDoubleClick={handleDoubleTap}
            className="relative bg-zinc-950 aspect-square flex items-center justify-center cursor-pointer select-none overflow-hidden"
          >
            <div className="text-center p-6">
              <Sparkles className="w-16 h-16 text-rose-500 mx-auto mb-3 animate-bounce" />
              <p className="text-zinc-300 font-medium text-sm">Welcome to Unsocial 2.0</p>
              <p className="text-xs text-zinc-500 mt-1">Double tap to like this post!</p>
            </div>

            <AnimatePresence>
              {showHeart && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-2xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button 
                  whileTap={{ scale: 0.75 }}
                  onClick={() => {
                    setLiked(!liked)
                    setLikesCount(liked ? likesCount - 1 : likesCount + 1)
                  }}
                >
                  <Heart className={`w-6 h-6 transition-colors ${liked ? 'text-rose-500 fill-rose-500' : 'text-zinc-300'}`} />
                </motion.button>
                <motion.button whileTap={{ scale: 0.75 }}>
                  <MessageCircle className="w-6 h-6 text-zinc-300" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.75 }}>
                  <Share2 className="w-6 h-6 text-zinc-300" />
                </motion.button>
              </div>
            </div>

            <p className="text-xs font-bold text-zinc-200">{likesCount} likes</p>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <span className="font-bold mr-2 text-zinc-100">mdparvez_dev</span>
              Building Unsocial 2.0 directly from mobile using Next.js & Supabase! 🚀✨
            </p>
          </div>
        </motion.div>
      </div>

      <nav className="fixed bottom-0 w-full max-w-md bg-zinc-900/90 backdrop-blur-lg border-t border-zinc-800 py-3 px-8 flex justify-between items-center z-50">
        <button className="text-rose-500"><Sparkles className="w-6 h-6" /></button>
        <button className="text-zinc-400 hover:text-zinc-100"><Compass className="w-6 h-6" /></button>
        <button className="text-zinc-400 hover:text-zinc-100"><User className="w-6 h-6" /></button>
      </nav>
    </main>
  )
}
