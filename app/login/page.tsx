'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type View = 'login' | 'forgot-step1' | 'forgot-step2';

export default function LoginPage() {
  const router = useRouter();
  const [view, setView] = useState<View>('login');
  const [showPw, setShowPw] = useState(false);
  const [showRegPw, setShowRegPw] = useState(false);
  const [loginMsg, setLoginMsg] = useState<{ text: string; type: 'error' | 'success' } | null>(null);
  const [registerMsg, setRegisterMsg] = useState<{ text: string; type: 'error' | 'success' } | null>(null);
  const [forgotMsg, setForgotMsg] = useState<{ text: string; type: 'error' | 'success' } | null>(null);
  const [foundEmail, setFoundEmail] = useState('');
  const [foundPassword, setFoundPassword] = useState('');
  const [redirecting, setRedirecting] = useState<string | null>(null);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (!email || !password) {
      setLoginMsg({ text: 'Please fill in all required fields.', type: 'error' });
      return;
    }
    const stored = localStorage.getItem('hof_user_' + email);
    if (!stored) {
      setLoginMsg({ text: 'No account found with this email. Please register first.', type: 'error' });
      return;
    }
    const userData = JSON.parse(stored);
    if (userData.password !== password) {
      setLoginMsg({ text: 'Incorrect password. Please try again.', type: 'error' });
      return;
    }

    sessionStorage.setItem('hof_user', JSON.stringify({ name: userData.name, email: userData.email }));
    setRedirecting('Login successful — redirecting to your account…');
    setTimeout(() => router.push('/dashboard'), 1200);
  }

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (!username || !email || !password) {
      setRegisterMsg({ text: 'Please fill in all required fields.', type: 'error' });
      return;
    }
    if (password.length < 6) {
      setRegisterMsg({ text: 'Password must be at least 6 characters.', type: 'error' });
      return;
    }
    if (localStorage.getItem('hof_user_' + email)) {
      setRegisterMsg({ text: 'This email is already registered. Please login.', type: 'error' });
      return;
    }

    localStorage.setItem('hof_user_' + email, JSON.stringify({ name: username, email, password }));
    setRedirecting('Registration successful — please login to continue…');
    setTimeout(() => {
      setRedirecting(null);
      setView('login');
    }, 1500);
  }

  function handleFindAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();

    if (!email) {
      setForgotMsg({ text: 'Please enter your email address.', type: 'error' });
      return;
    }
    const stored = localStorage.getItem('hof_user_' + email);
    if (!stored) {
      setForgotMsg({ text: 'No account found with this email address.', type: 'error' });
      return;
    }
    const userData = JSON.parse(stored);
    setFoundEmail(email);
    setFoundPassword(userData.password);
    setView('forgot-step2');
  }

  function handleSaveNewPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const newPass = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
    const confirmPass = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

    if (!newPass) return;
    if (newPass.length < 6) return;
    if (newPass !== confirmPass) return;

    const userData = JSON.parse(localStorage.getItem('hof_user_' + foundEmail) || '{}');
    userData.password = newPass;
    localStorage.setItem('hof_user_' + foundEmail, JSON.stringify(userData));

    setRedirecting('Password updated — please login with new password…');
    setTimeout(() => {
      setRedirecting(null);
      setView('login');
      setLoginMsg({ text: 'Password updated! Please login with new password.', type: 'success' });
    }, 1500);
  }

  return (
    <div className="bg-[#f4f3f0] min-h-screen pt-[100px] pb-20 px-6 md:px-8 relative">
      {redirecting && (
        <div className="fixed inset-0 z-[999] bg-white/95 flex flex-col items-center justify-center gap-4">
          <div className="w-9 h-9 border-[3px] border-[#d8d5d0] border-t-(--color-gold) rounded-full animate-spin" />
          <p className="text-sm text-[#555] tracking-wide">{redirecting}</p>
        </div>
      )}

      <main className="max-w-5xl mx-auto">
        {view === 'login' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
            {/* Login */}
            <div className="md:pr-12 md:border-r border-black/10">
              <h2 className="text-sm font-light tracking-widest uppercase text-[#555] mb-8 pb-3 border-b border-black/10">
                Login
              </h2>
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm text-[#444] mb-1.5">
                    Email address <span className="text-[#c0392b]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3.5 py-2.5 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#444] mb-1.5">
                    Password <span className="text-[#c0392b]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      name="password"
                      required
                      className="w-full px-3.5 py-2.5 pr-10 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-(--color-gold)"
                    >
                      {showPw ? '🙈' : '👁'}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <button type="submit" className="bg-(--color-gold) text-white px-7 py-3 text-sm font-medium rounded-sm hover:bg-(--color-accent) transition-colors">
                    Log in
                  </button>
                  <label className="flex items-center gap-2 text-sm text-[#555] cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5 accent-(--color-gold)" /> Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setView('forgot-step1')}
                  className="block text-sm text-(--color-gold) hover:underline"
                >
                  Lost your password?
                </button>
                {loginMsg && (
                  <p className={`px-3.5 py-2.5 rounded-sm text-sm ${loginMsg.type === 'error' ? 'bg-[#fdf0ef] text-[#c0392b] border border-[#f5c6c5]' : 'bg-[#eaf6f0] text-[#1e6b46] border border-[#a8dcc0]'}`}>
                    {loginMsg.text}
                  </p>
                )}
              </form>
            </div>

            {/* Register */}
            <div className="md:pl-12">
              <h2 className="text-sm font-light tracking-widest uppercase text-[#555] mb-8 pb-3 border-b border-black/10">
                Register
              </h2>
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="block text-sm text-[#444] mb-1.5">
                    Username <span className="text-[#c0392b]">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    required
                    className="w-full px-3.5 py-2.5 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#444] mb-1.5">
                    Email address <span className="text-[#c0392b]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3.5 py-2.5 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#444] mb-1.5">
                    Password <span className="text-[#c0392b]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPw ? 'text' : 'password'}
                      name="password"
                      required
                      className="w-full px-3.5 py-2.5 pr-10 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPw(!showRegPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-(--color-gold)"
                    >
                      {showRegPw ? '🙈' : '👁'}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#777] leading-relaxed">
                  Your personal data will be used to support your experience throughout this website.{' '}
                  <a href="#" className="text-(--color-gold)">Privacy policy</a>.
                </p>
                <button type="submit" className="bg-(--color-gold) text-white px-7 py-3 text-sm font-medium rounded-sm hover:bg-(--color-accent) transition-colors">
                  Register
                </button>
                {registerMsg && (
                  <p className={`px-3.5 py-2.5 rounded-sm text-sm ${registerMsg.type === 'error' ? 'bg-[#fdf0ef] text-[#c0392b] border border-[#f5c6c5]' : 'bg-[#eaf6f0] text-[#1e6b46] border border-[#a8dcc0]'}`}>
                    {registerMsg.text}
                  </p>
                )}
              </form>
            </div>
          </div>
        )}

        {view === 'forgot-step1' && (
          <div className="max-w-md mx-auto">
            <h2 className="text-sm font-light tracking-widest uppercase text-[#555] mb-8 pb-3 border-b border-black/10">
              Reset Password
            </h2>
            <p className="text-sm text-[#777] leading-relaxed mb-6">
              Enter your registered email address. We will show your current password and give you the option to set a new one.
            </p>
            <form onSubmit={handleFindAccount} className="space-y-5">
              <div>
                <label className="block text-sm text-[#444] mb-1.5">
                  Email address <span className="text-[#c0392b]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3.5 py-2.5 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <button type="submit" className="bg-(--color-gold) text-white px-7 py-3 text-sm font-medium rounded-sm hover:bg-(--color-accent) transition-colors">
                  Find My Account
                </button>
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="border border-black/15 text-[#555] px-7 py-3 text-sm font-medium rounded-sm hover:border-(--color-gold) hover:text-(--color-gold) transition-colors"
                >
                  Back to Login
                </button>
              </div>
              {forgotMsg && (
                <p className="px-3.5 py-2.5 rounded-sm text-sm bg-[#fdf0ef] text-[#c0392b] border border-[#f5c6c5]">
                  {forgotMsg.text}
                </p>
              )}
            </form>
          </div>
        )}

        {view === 'forgot-step2' && (
          <div className="max-w-md mx-auto">
            <h2 className="text-sm font-light tracking-widest uppercase text-[#555] mb-8 pb-3 border-b border-black/10">
              Account Found
            </h2>
            <p className="text-sm text-[#777] leading-relaxed mb-6">
              Your account has been found. You can see your current password below, set a new password, or skip and login with your existing password.
            </p>

            <div className="bg-[#f9f7f4] border border-black/15 px-4 py-3.5 rounded-sm mb-5">
              <p className="text-xs text-[#777] mb-1">Your current password is:</p>
              <strong className="text-base text-[#222] tracking-wide">{foundPassword}</strong>
            </div>

            <form onSubmit={handleSaveNewPassword} className="space-y-5">
              <div>
                <label className="block text-sm text-[#444] mb-1.5">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password (optional)"
                  className="w-full px-3.5 py-2.5 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                />
              </div>
              <div>
                <label className="block text-sm text-[#444] mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  className="w-full px-3.5 py-2.5 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <button type="submit" className="bg-(--color-gold) text-white px-7 py-3 text-sm font-medium rounded-sm hover:bg-(--color-accent) transition-colors">
                  Save New Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setView('login');
                  }}
                  className="border border-black/15 text-[#555] px-7 py-3 text-sm font-medium rounded-sm hover:border-(--color-gold) hover:text-(--color-gold) transition-colors"
                >
                  Skip & Login
                </button>
              </div>
            </form>

            <button
              type="button"
              onClick={() => setView('forgot-step1')}
              className="mt-4 text-sm text-[#777] hover:text-(--color-gold)"
            >
              ← Try different email
            </button>
          </div>
        )}
      </main>
    </div>
  );
}