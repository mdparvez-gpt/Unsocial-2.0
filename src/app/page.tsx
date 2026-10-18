'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share2, Sparkles, Compass, User, PlusCircle, Send } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [likes, setLikes] = useState(142)
  const [liked, setLiked] = useState(false)
  const [showHeart, setShowHeart] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true)
      setLikes(likes + 1)
    }
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 800)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center pb-24">
      {/* Header */}
      <header className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-black bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Unsocial 2.0
        </h1>
        <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
      </header>

      {/* Main Feed Content */}
      <div className="w-full max-w-md px-4 mt-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* User Bar */}
          <div className="flex items-center p-3.5 space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 p-[2px]">
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center font-bold text-xs">
                M
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">mdparvez_dev</p>
              <p className="text-[10px] text-zinc-400">Dhaka • Just now</p>
            </div>
          </div>

          {/* Post Content */}
          <div 
            onDoubleClick={handleDoubleTap}
            className="relative bg-zinc-950 p-6 min-h-[200px] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
          >
            <p className="text-zinc-200 text-center font-medium text-sm z-10 leading-relaxed">
              🚀 Welcome to Unsocial 2.0! Building an awesome social app live from mobile using Next.js & Supabase! ✨
            </p>

            <AnimatePresence>
              {showHeart && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                >
                  <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-2xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="p-4 space-y-2">
            <div className="flex items-center space-x-4">
              <motion.button whileTap={{ scale: 0.75 }} onClick={handleLike}>
                <Heart className={`w-6 h-6 transition-colors ${liked ? 'text-rose-500 fill-rose-500' : 'text-zinc-300'}`} />
              </motion.button>
              <motion.button whileTap={{ scale: 0.75 }}>
                <MessageCircle className="w-6 h-6 text-zinc-300" />
              </motion.button>
              <motion.button whileTap={{ scale: 0.75 }}>
                <Share2 className="w-6 h-6 text-zinc-300" />
              </motion.button>
            </div>
            <p className="text-xs font-bold text-zinc-200">{likes} likes</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-zinc-900/90 backdrop-blur-lg border-t border-zinc-800 py-3 px-8 flex justify-between items-center z-50">
        <button className="text-rose-500"><Sparkles className="w-6 h-6" /></button>
        <button className="text-zinc-400 hover:text-zinc-100"><Compass className="w-6 h-6" /></button>
        <button className="text-zinc-400 hover:text-zinc-100"><User className="w-6 h-6" /></button>
      </nav>
    </main>
  )
}
