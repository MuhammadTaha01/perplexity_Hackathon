import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Planet from '../components/Planet' // make sure this path is correct

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('http://0.0.0.0:8080/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('refresh_token', data.refresh_token)
        navigate('/')
      } else {
        setError(data.message || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen pt-20 bg-space-dark">
      {/* Background planet animation on right */}
      <div className="absolute -right-32 bottom-1/3 opacity-30 pointer-events-none select-none">
        <Planet size="2xl" color="orange" duration={50} reverse={true} />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-md">
        <h1 className="mb-12 text-center text-4xl font-extrabold text-space-accent">
          Welcome Back
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-card bg-space-gray-900/80 p-8 rounded-lg border border-space-gray-700 shadow-lg"
        >
          {error && (
            <div className="mb-6 rounded border border-red-600 bg-red-900/60 p-3 text-red-400">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-space-gray-300 font-medium"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-space-gray-700 bg-space-gray-900 px-4 py-2 text-space-gray-200 outline-none focus:border-space-accent/50"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-space-gray-300 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-space-gray-700 bg-space-gray-900 px-4 py-2 text-space-gray-200 outline-none focus:border-space-accent/50"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="glow-button w-full rounded-md bg-space-accent py-3 text-lg font-semibold text-space-dark transition-colors duration-300 hover:bg-space-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
