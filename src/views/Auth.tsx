import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Mail, Lock, User, Phone, CheckCircle, Shield } from 'lucide-react';

interface AuthProps {
  initialMode?: 'login' | 'signup';
}

export const Auth: React.FC<AuthProps> = ({ initialMode = 'login' }) => {
  const { login, signup, navigateTo, forgotPassword, resetPassword, authLoading } = useApp();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'reset'>(initialMode);
  
  // Login form fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPIN, setLoginPIN] = useState('');
  
  // Signup form fields
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signupPIN, setSignupPIN] = useState('');
  const [confirmPIN, setConfirmPIN] = useState('');
  const [role, setRole] = useState<'patient' | 'caregiver'>('patient');

  // Forgot password form fields
  const [forgotEmail, setForgotEmail] = useState('');

  // Reset password form fields
  const [resetToken, setResetToken] = useState('');
  const [resetPINVal, setResetPINVal] = useState('');
  const [resetConfirmPIN, setResetConfirmPIN] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateLogin = () => {
    const errs: { [key: string]: string } = {};
    if (!loginEmail) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(loginEmail)) errs.email = 'Email is invalid';
    
    if (!loginPIN) errs.pin = 'PIN is required';
    else if (!/^\d{4}$/.test(loginPIN)) errs.pin = 'PIN must be exactly 4 digits';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateSignup = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.name = 'Full name is required';
    
    if (!signupEmail) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(signupEmail)) errs.email = 'Email is invalid';
    
    if (!phone) errs.phone = 'Phone number is required';
    
    if (!signupPIN) errs.pin = 'PIN is required';
    else if (!/^\d{4}$/.test(signupPIN)) errs.pin = 'PIN must be exactly 4 digits';
    
    if (signupPIN !== confirmPIN) errs.confirmPIN = 'PINs do not match';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin()) {
      setErrors({});
      try {
        await login('patient', loginEmail, loginPIN);
      } catch (err: any) {
        setErrors({ form: err.message || 'Login failed. Please verify your credentials.' });
      }
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignup()) {
      setErrors({});
      try {
        await signup(fullName, signupEmail, phone, role, signupPIN);
      } catch (err: any) {
        setErrors({ form: err.message || 'Registration failed. Please try again.' });
      }
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setErrors({ email: 'Email is required' });
      return;
    } else if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
      setErrors({ email: 'Email is invalid' });
      return;
    }
    setErrors({});
    try {
      const success = await forgotPassword(forgotEmail);
      if (success) {
        setMode('reset');
      }
    } catch (err: any) {
      setErrors({ form: err.message || 'Failed to request PIN reset. Please try again.' });
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};
    if (!resetToken.trim()) errs.token = 'Reset token/code is required';
    if (!resetPINVal) errs.pin = 'New PIN is required';
    else if (!/^\d{4}$/.test(resetPINVal)) errs.pin = 'PIN must be exactly 4 digits';
    if (resetPINVal !== resetConfirmPIN) errs.confirmPIN = 'PINs do not match';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      const success = await resetPassword(resetToken, resetPINVal);
      if (success) {
        setMode('login');
        // Clear fields
        setResetToken('');
        setResetPINVal('');
        setResetConfirmPIN('');
      }
    } catch (err: any) {
      setErrors({ form: err.message || 'Failed to reset PIN. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center">
          <div 
            onClick={() => navigateTo('landing')} 
            className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-brand-500/20 cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            <Heart size={24} className="text-white fill-current animate-pulse-slow" />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-brand-navy">
            {mode === 'login' && 'Welcome back to CareSync'}
            {mode === 'signup' && 'Create your CareSync account'}
            {mode === 'forgot' && 'Reset your PIN'}
            {mode === 'reset' && 'Enter new PIN'}
          </h2>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            {mode === 'login' && "Sign in to track medications and update caregivers"}
            {mode === 'signup' && "AI-powered scheduling, reports, and medical assistance"}
            {mode === 'forgot' && "Enter your email to request a PIN reset code"}
            {mode === 'reset' && "Enter the code you received along with your new PIN"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
          {mode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {errors.form && (
                <div className="bg-rose-50 border border-rose-100 text-rose-700 p-3.5 rounded-xl text-xs font-bold leading-normal">
                  {errors.form}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email address</label>
                <div className="relative">
                  <Mail size={16} className="text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={loginEmail}
                    disabled={authLoading}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={`
                      w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm outline-none transition-all
                      ${errors.email ? 'border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'}
                      ${authLoading ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                    placeholder="name@domain.com"
                  />
                </div>
                {errors.email && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">4-Digit PIN</label>
                <div className="relative">
                  <Lock size={16} className="text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={loginPIN}
                    disabled={authLoading}
                    maxLength={4}
                    onChange={(e) => setLoginPIN(e.target.value.replace(/\D/g, ''))}
                    className={`
                      w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm outline-none transition-all
                      ${errors.pin ? 'border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'}
                      ${authLoading ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                    placeholder="e.g. 1234"
                  />
                </div>
                {errors.pin && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.pin}</p>}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    disabled={authLoading}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-slate-300 rounded disabled:opacity-50"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-500 font-semibold">
                    Remember me
                  </label>
                </div>

                <div className="text-xs">
                  <button 
                    type="button"
                    disabled={authLoading}
                    onClick={() => { setMode('forgot'); setErrors({}); }}
                    className="font-bold text-brand-500 hover:text-brand-600 disabled:opacity-50"
                  >
                    Forgot your PIN?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 px-4 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 transition-all flex items-center justify-center"
              >
                {authLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  'Log In'
                )}
              </button>

              {/* DEMO BYPASS SHORTCUTS (Mandatory Hackathon Demo Goal) */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Demo Quick Access</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={authLoading}
                  onClick={() => login('patient', 'arjun@caresync.com')}
                  className="py-2.5 px-3 bg-brand-50 hover:bg-brand-100/80 border border-brand-200 text-brand-700 text-xs font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue as Patient
                </button>
                <button
                  type="button"
                  disabled={authLoading}
                  onClick={() => login('caregiver', 'priya@caresync.com')}
                  className="py-2.5 px-3 bg-cyan-50 hover:bg-cyan-100/80 border border-cyan-200 text-cyan-700 text-xs font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue as Caregiver
                </button>
              </div>
            </form>
          ) : mode === 'signup' ? (
            /* SIGNUP FORM */
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              {errors.form && (
                <div className="bg-rose-50 border border-rose-100 text-rose-700 p-3.5 rounded-xl text-xs font-bold leading-normal">
                  {errors.form}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full name</label>
                <div className="relative">
                  <User size={16} className="text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={fullName}
                    disabled={authLoading}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="Arjun Kumar"
                  />
                </div>
                {errors.name && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email address</label>
                <div className="relative">
                  <Mail size={16} className="text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={signupEmail}
                    disabled={authLoading}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="arjun@example.com"
                  />
                </div>
                {errors.email && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone number</label>
                <div className="relative">
                  <Phone size={16} className="text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    value={phone}
                    disabled={authLoading}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                {errors.phone && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.phone}</p>}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Select Role</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={authLoading}
                    onClick={() => setRole('patient')}
                    className={`
                      py-3 border rounded-xl font-bold text-xs flex flex-col items-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                      ${role === 'patient' 
                        ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm' 
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-500'}
                    `}
                  >
                    <CheckCircle size={16} className={role === 'patient' ? 'text-brand-500' : 'text-slate-300'} />
                    <span>I am a Patient</span>
                  </button>
                  
                  <button
                    type="button"
                    disabled={authLoading}
                    onClick={() => setRole('caregiver')}
                    className={`
                      py-3 border rounded-xl font-bold text-xs flex flex-col items-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                      ${role === 'caregiver' 
                        ? 'border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm' 
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-500'}
                    `}
                  >
                    <Shield size={16} className={role === 'caregiver' ? 'text-cyan-500' : 'text-slate-300'} />
                    <span>I am a Caregiver</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">4-Digit PIN</label>
                <div className="relative">
                  <Lock size={16} className="text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={signupPIN}
                    disabled={authLoading}
                    maxLength={4}
                    onChange={(e) => setSignupPIN(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="e.g. 1234"
                  />
                </div>
                {errors.pin && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.pin}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Confirm PIN</label>
                <div className="relative">
                  <Lock size={16} className="text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={confirmPIN}
                    disabled={authLoading}
                    maxLength={4}
                    onChange={(e) => setConfirmPIN(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="e.g. 1234"
                  />
                </div>
                {errors.confirmPIN && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.confirmPIN}</p>}
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 px-4 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 transition-all flex items-center justify-center"
              >
                {authLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Registering...</span>
                  </div>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>
          ) : mode === 'forgot' ? (
            /* FORGOT PASSWORD FORM */
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              {errors.form && (
                <div className="bg-rose-50 border border-rose-100 text-rose-700 p-3.5 rounded-xl text-xs font-bold leading-normal">
                  {errors.form}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email address</label>
                <div className="relative">
                  <Mail size={16} className="text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={forgotEmail}
                    disabled={authLoading}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className={`
                      w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm outline-none transition-all
                      ${errors.email ? 'border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'}
                      ${authLoading ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                    placeholder="name@domain.com"
                  />
                </div>
                {errors.email && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.email}</p>}
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 px-4 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 transition-all flex items-center justify-center"
              >
                {authLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Requesting Reset...</span>
                  </div>
                ) : (
                  'Send Reset Code'
                )}
              </button>
            </form>
          ) : (
            /* RESET PASSWORD FORM */
            <form onSubmit={handleResetSubmit} className="space-y-4">
              {errors.form && (
                <div className="bg-rose-50 border border-rose-100 text-rose-700 p-3.5 rounded-xl text-xs font-bold leading-normal">
                  {errors.form}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Reset Token / Code</label>
                <div className="relative">
                  <Mail size={16} className="text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={resetToken}
                    disabled={authLoading}
                    onChange={(e) => setResetToken(e.target.value)}
                    className={`
                      w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm outline-none transition-all
                      ${errors.token ? 'border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'}
                      ${authLoading ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                    placeholder="Enter reset token or code"
                  />
                </div>
                {errors.token && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.token}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">New 4-Digit PIN</label>
                <div className="relative">
                  <Lock size={16} className="text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={resetPINVal}
                    disabled={authLoading}
                    maxLength={4}
                    onChange={(e) => setResetPINVal(e.target.value.replace(/\D/g, ''))}
                    className={`
                      w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm outline-none transition-all
                      ${errors.pin ? 'border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'}
                      ${authLoading ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                    placeholder="e.g. 1234"
                  />
                </div>
                {errors.pin && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.pin}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Confirm New PIN</label>
                <div className="relative">
                  <Lock size={16} className="text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={resetConfirmPIN}
                    disabled={authLoading}
                    maxLength={4}
                    onChange={(e) => setResetConfirmPIN(e.target.value.replace(/\D/g, ''))}
                    className={`
                      w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm outline-none transition-all
                      ${errors.confirmPIN ? 'border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'}
                      ${authLoading ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                    placeholder="e.g. 1234"
                  />
                </div>
                {errors.confirmPIN && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.confirmPIN}</p>}
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 px-4 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 transition-all flex items-center justify-center"
              >
                {authLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Resetting PIN...</span>
                  </div>
                ) : (
                  'Reset PIN'
                )}
              </button>
            </form>
          )}

          {/* Toggle login/signup mode link */}
          <div className="text-center mt-5 text-xs text-slate-500 font-semibold">
            {mode === 'login' && (
              <p>
                Don't have an account?{' '}
                <button 
                  onClick={() => { setMode('signup'); setErrors({}); }}
                  disabled={authLoading}
                  className="font-bold text-brand-500 hover:text-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create one now
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button 
                  onClick={() => { setMode('login'); setErrors({}); }}
                  disabled={authLoading}
                  className="font-bold text-brand-500 hover:text-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sign in here
                </button>
              </p>
            )}
            {(mode === 'forgot' || mode === 'reset') && (
              <p>
                Remembered your PIN?{' '}
                <button 
                  onClick={() => { setMode('login'); setErrors({}); }}
                  disabled={authLoading}
                  className="font-bold text-brand-500 hover:text-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
