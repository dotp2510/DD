import  { useState } from 'react'
import { Link } from "react-router"
import { useAuth } from "../hooks/useAuth"
import Loader from "../components/Loader"
import { useNavigate } from 'react-router'

function Login() {
    const navigate = useNavigate()
    const { loading, handleLogin } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
      const sucess = await  handleLogin({ email, password })
        // wire up real auth logic here
        navigate("/")


    }
    if(loading){
        return( <Loader></Loader>)
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
                    <h1 className="font-display text-[32px] sm:text-[40px] md:text-[48px] font-normal leading-[1.1] tracking-[-0.4px] text-ink mb-3 break-words">
                        Sign in
                    </h1>
                    <p className="font-serif text-[15px] sm:text-[16px] leading-[24px] tracking-[0.09px] text-body mb-8 sm:mb-10">
                        Enter your credentials below to access your account.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
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
                            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-2">
                                <label
                                    htmlFor="password"
                                    className="block font-sans text-sm font-bold tracking-[0.4px] text-ink"
                                >
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="font-sans text-sm font-bold text-link hover:underline"
                                >
                                    Forgot?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
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

                        <button
                            type="submit"
                            className="w-full min-h-[44px] bg-ink text-white rounded-none py-3.5 font-sans text-[16px] font-bold tracking-[0.3px] hover:bg-ink-soft active:bg-ink-soft transition-colors"
                        >
                            Continue
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
                        Don&apos;t have an account?{' '}
                        <Link to="/signup" className="font-bold text-ink hover:text-link">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Login