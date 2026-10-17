'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share2, Sparkles, Compass, User, PlusCircle, Send, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default function Home() {
  const supabase = createClient()
  const [posts, setPosts] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [showHeart, setShowHeart] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [content, setContent] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    checkUser()
    fetchPosts()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*, profiles(username, avatar_url)')
      .order('created_at', { ascending: false })
    
    if (data && data.length > 0) {
      setPosts(data)
    } else {
      setPosts([
        {
          id: '1',
          content: 'Welcome to Unsocial 2.0! Create an account and share your first post! 🚀✨',
          likes_count: 142,
          profiles: { username: 'mdparvez_dev' }
        }
      ])
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !user) return
    setPosting(true)

    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      content,
      media_url: mediaUrl || null
    })

    if (!error) {
      setContent('')
      setMediaUrl('')
      setIsModalOpen(false)
      fetchPosts()
    }
    setPosting(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center pb-24">
      <header className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-black bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Unsocial 2.0
        </h1>
        <div className="flex items-center space-x-3">
          {user ? (
            <button onClick={handleLogout} className="text-zinc-400 hover:text-rose-400 p-1">
              <LogOut className="w-5 h-5" />
            </button>
          ) : (
            <Link href="/login" className="text-xs bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-full font-semibold">
              Log In
            </Link>
          )}
        </div>
      </header>

      <div className="w-full max-w-md px-4 mt-4 space-y-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center p-3.5 space-x-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 p-[2px]">
                <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center font-bold text-xs">
                  {post.profiles?.username?.[0]?.toUpperCase() || 'U'}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide">{post.profiles?.username || 'user'}</p>
                <p className="text-[10px] text-zinc-400">Live Post</p>
              </div>
            </div>

            <div className="relative bg-zinc-950 p-6 min-h-[180px] flex flex-col items-center justify-center cursor-pointer select-none">
              {post.media_url && (
                <img src={post.media_url} alt="Post media" className="w-full max-h-80 object-cover rounded-xl mb-3" />
              )}
              <p className="text-zinc-200 text-center font-medium text-sm z-10 leading-relaxed">
                {post.content}
              </p>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center space-x-4">
                <button><Heart className="w-6 h-6 text-zinc-300 hover:text-rose-500" /></button>
                <button><MessageCircle className="w-6 h-6 text-zinc-300" /></button>
                <button><Share2 className="w-6 h-6 text-zinc-300" /></button>
              </div>
              <p className="text-xs font-bold text-zinc-200">{post.likes_count || 0} likes</p>
            </div>
          </motion.div>
        ))}
      </div>

      {user && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-20 right-6 bg-gradient-to-r from-rose-500 to-purple-600 p-3.5 rounded-full shadow-2xl text-white z-40 active:scale-95"
        >
          <PlusCircle className="w-7 h-7" />
        </button>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-5 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-zinc-200">Create New Post</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-xs text-zinc-400">Cancel</button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-3">
                <textarea
                  rows={3}
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
                />
                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  disabled={posting || !content.trim()}
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-purple-600 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{posting ? 'Posting...' : 'Post'}</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 w-full max-w-md bg-zinc-900/90 backdrop-blur-lg border-t border-zinc-800 py-3 px-8 flex justify-between items-center z-50">
        <button className="text-rose-500"><Sparkles className="w-6 h-6" /></button>
        <button className="text-zinc-400 hover:text-zinc-100"><Compass className="w-6 h-6" /></button>
        <Link href={user ? "#" : "/login"} className="text-zinc-400 hover:text-zinc-100"><User className="w-6 h-6" /></Link>
      </nav>
    </main>
  )
}
