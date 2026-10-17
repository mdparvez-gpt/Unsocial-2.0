'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Sparkles, Mail, Lock, User as UserIcon } from 'lucide-react'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const supabase = createClient()
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      })

      if (error) {
        setErrorMsg(error.message)
      } else {
        // Create profile in profiles table
        if (data.user) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            username: username,
            full_name: username
          })
        }
        router.push('/')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setErrorMsg(error.message)
      } else {
        router.push('/')
      }
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-rose-500/20 to-purple-500/20 border border-rose-500/30 rounded-2xl mb-2">
            <Sparkles className="w-8 h-8 text-rose-500 animate-pulse" />
          </div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-xs text-zinc-400">
            {isSignUp ? 'Join Unsocial 2.0 today' : 'Log in to continue sharing moments'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <UserIcon className="w-5 h-5 text-zinc-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-xs focus:outline-none focus:border-rose-500 text-zinc-200"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="w-5 h-5 text-zinc-500 absolute left-3.5 top-3.5" />
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-xs focus:outline-none focus:border-rose-500 text-zinc-200"
            />
          </div>

          <div className="relative">
            <Lock className="w-5 h-5 text-zinc-500 absolute left-3.5 top-3.5" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-xs focus:outline-none focus:border-rose-500 text-zinc-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-purple-600 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setErrorMsg('')
            }}
            className="text-xs text-zinc-400 hover:text-zinc-200"
          >
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <span className="text-rose-400 font-bold underline">
              {isSignUp ? 'Log In' : 'Sign Up'}
            </span>
          </button>
        </div>
      </div>
    </main>
  )
}
