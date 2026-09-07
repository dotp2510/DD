import {Link } from "react-router"
import { useState } from 'react'
import { useAuth } from "../hooks/useAuth"
import Loader from "../components/Loader"
import { useNavigate } from "react-router"

function Signup() {
    const navigate = useNavigate()
    const {loading , handleRegister}= useAuth()
  const [username, setuserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit =async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!agreed) {
      setError('You must agree to the terms to continue.')
      return
    }

    // wire up real auth logic here
  await  handleRegister({ username, email, password })
    navigate("/")
    

  }
  if(loading){
    return ( <Loader></Loader>)
  }

  return (
    <main className="min-h-screen w-full bg-white flex flex-col overflow-x-hidden">
      {/* Masthead band */}
      <div className="border-b border-hairline px-4 py-3 sm:px-6 md:px-10">
        <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.4px] text-ink text-center">
          PROJECT-13-GENAI
        </p>
      </div>

      {/* Form section */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6 sm:py-14 md:py-5">
        <div className="w-full max-w-[420px]">
          <h1 className="font-display text-[32px] sm:text-[40px] md:text-[48px] font-normal leading-[1.1] tracking-[-0.4px] text-ink mb-2 break-words">
            Create your account
          </h1>
          <p className="font-serif text-[15px] sm:text-[16px] leading-[24px] tracking-[0.09px] text-body mb-8 sm:mb-2"> 
            Fill in your details below to get started.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block font-sans text-sm font-bold tracking-[0.4px] text-ink mb-2"
              >
                User name
              </label>
              <input
                id="username"
                type="text"
                required
                autoComplete="name"
                value={username}
                onChange={(e) => setuserName(e.target.value)}
                placeholder="Jordan Lee"
                className="w-full min-w-0 border border-ink rounded-none px-4 py-3 font-sans text-[16px] sm:text-[17px] text-ink placeholder:text-body focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-sans text-sm font-bold tracking-[0.4px] text-ink mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full min-w-0 border border-ink rounded-none px-4 py-3 font-sans text-[16px] sm:text-[17px] text-ink placeholder:text-body focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-sans text-sm font-bold tracking-[0.4px] text-ink mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full min-w-0 border border-ink rounded-none pl-4 pr-16 py-3 font-sans text-[16px] sm:text-[17px] text-ink placeholder:text-body focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 font-sans text-sm font-bold text-ink px-1 py-2"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block font-sans text-sm font-bold tracking-[0.4px] text-ink mb-2"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full min-w-0 border border-ink rounded-none px-4 py-3 font-sans text-[16px] sm:text-[17px] text-ink placeholder:text-body focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 border border-ink rounded-none accent-black"
              />
              <span className="font-sans text-sm text-body leading-snug">
                I agree to the{' '}
                <a href="#" className="font-bold text-ink hover:text-link">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-bold text-ink hover:text-link">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            {error && (
              <p className="font-sans text-sm text-red-600 break-words" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full min-h-[44px] bg-ink text-white rounded-none py-3.5 font-sans text-[16px] font-bold tracking-[0.3px] hover:bg-ink-soft active:bg-ink-soft transition-colors"
            >
              Create account
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="h-px flex-1 bg-hairline" />
            <span className="font-sans text-xs text-body shrink-0">OR</span>
            <div className="h-px flex-1 bg-hairline" />
          </div>

          <button
            type="button"
            className="w-full min-h-[44px] border border-ink text-ink rounded-none py-3.5 font-sans text-[16px] font-bold tracking-[0.3px] hover:bg-canvas-soft active:bg-canvas-soft transition-colors"
          >
            Continue with Google
          </button>

          <p className="font-sans text-sm text-body text-center mt-8 sm:mt-10">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-ink hover:text-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Signup