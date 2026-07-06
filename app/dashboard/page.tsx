'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Tab = 'dashboard' | 'orders' | 'downloads' | 'addresses' | 'account';

type User = {
  name: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User>({ name: 'Guest', email: '' });
  const [tab, setTab] = useState<Tab>('dashboard');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('hof_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      const parts = (parsed.name || '').split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
      setEmail(parsed.email || '');
    }
  }, []);

  function logout() {
    sessionStorage.removeItem('hof_user');
    router.push('/');
  }

  function saveAccount() {
    const newName = `${firstName} ${lastName}`.trim();
    const updated = { name: newName, email };
    sessionStorage.setItem('hof_user', JSON.stringify(updated));
    setUser(updated);
    alert('Changes saved!');
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'account', label: 'Account Details' },
  ];

  return (
    <div className="bg-[#f4f3f0] min-h-screen pt-[100px] pb-20">
      {/* Breadcrumb */}
      <div className="px-6 md:px-8 py-3 text-xs text-[#777] border-b border-black/10 bg-white">
        <Link href="/" className="hover:text-(--color-gold)">Home</Link>
        <span className="mx-1.5">›</span>
        My Account
      </div>

      <main className="max-w-5xl mx-auto px-6 md:px-8 mt-8 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-start">
        {/* Sidebar */}
        <aside className="bg-white border border-black/10">
          <div className="px-5 py-4 bg-[#111] text-white">
            <div className="font-(family-name:--font-display) text-base font-semibold tracking-wide">{user.name}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">{user.email}</div>
          </div>
          <ul>
            {tabs.map((t) => (
              <li key={t.id} className="border-b border-black/10 last:border-b-0">
                <button
                  onClick={() => setTab(t.id)}
                  className={`w-full text-left px-5 py-3.5 text-[13.5px] font-medium transition-colors ${
                    tab === t.id ? 'bg-(--color-gold) text-white' : 'text-[#222] hover:bg-[#f9f7f4] hover:text-(--color-gold)'
                  }`}
                >
                  {t.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={logout}
                className="w-full text-left px-5 py-3.5 text-[13.5px] font-medium text-[#222] hover:bg-[#f9f7f4] hover:text-(--color-gold) transition-colors"
              >
                Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* Content */}
        <div className="bg-white border border-black/10 px-7 py-8 text-sm leading-relaxed text-[#555]">
          {tab === 'dashboard' && (
            <div>
              <p>
                Hello <strong className="text-[#222] font-medium">{user.name}</strong> (not{' '}
                <strong className="text-[#222] font-medium">{user.name}</strong>?{' '}
                <button onClick={logout} className="text-(--color-gold) hover:underline">Log out</button>)
              </p>
              <br />
              <p>
                From your account dashboard you can view your{' '}
                <button onClick={() => setTab('orders')} className="text-(--color-gold) hover:underline">recent orders</button>,
                manage your{' '}
                <button onClick={() => setTab('addresses')} className="text-(--color-gold) hover:underline">shipping and billing addresses</button>,
                and{' '}
                <button onClick={() => setTab('account')} className="text-(--color-gold) hover:underline">edit your password and account details</button>.
              </p>
            </div>
          )}

          {tab === 'orders' && (
            <div>
              <h2 className="font-(family-name:--font-display) text-xl font-semibold text-[#222] mb-5">My Orders</h2>
              <div className="flex flex-col items-center justify-center py-14 gap-3.5 text-center">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d8d5d0" strokeWidth="1">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <p className="font-(family-name:--font-display) text-lg font-semibold text-[#222]">No orders yet</p>
                <p className="text-xs text-[#777] max-w-[280px]">
                  You haven&apos;t placed any orders. Start shopping to see your orders here.
                </p>
                <Link
                  href="/shop"
                  className="mt-1.5 inline-block bg-(--color-gold) text-white px-6 py-2.5 text-xs font-medium rounded-sm hover:bg-(--color-accent) transition-colors"
                >
                  Browse Collections
                </Link>
              </div>
            </div>
          )}

          {tab === 'downloads' && (
            <div>
              <h2 className="font-(family-name:--font-display) text-xl font-semibold text-[#222] mb-5">Downloads</h2>
              <div className="text-center py-12 text-[#777] text-sm">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d8d5d0" strokeWidth="1" className="mx-auto mb-3.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <p>No downloads available.</p>
              </div>
            </div>
          )}

          {tab === 'addresses' && (
            <div>
              <h2 className="font-(family-name:--font-display) text-xl font-semibold text-[#222] mb-2">Addresses</h2>
              <p className="text-xs text-[#777] mb-5">
                The following addresses will be used on the checkout page by default.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Billing Address', 'Shipping Address'].map((title) => (
                  <div key={title} className="border border-black/10 px-5 py-4.5 text-[13px] leading-relaxed">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#777] mb-2.5">{title}</div>
                    <strong className="text-[#222]">{user.name}</strong>
                    <br />
                    House 12, Street 4
                    <br />
                    Havelian, KPK
                    <br />
                    Pakistan
                    <br />
                    +92 3175639776
                    <br />
                    <a href="#" className="inline-block mt-3 text-xs text-(--color-gold) hover:underline">Edit</a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'account' && (
            <div>
              <h2 className="font-(family-name:--font-display) text-xl font-semibold text-[#222] mb-5">Account Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4.5">
                <div>
                  <label className="block text-sm text-[#444] mb-1.5">First Name</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#444] mb-1.5">Last Name</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                  />
                </div>
              </div>
              <div className="mb-4.5">
                <label className="block text-sm text-[#444] mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                />
              </div>

              <hr className="border-black/10 my-6" />
              <div className="text-xs font-semibold uppercase tracking-wide text-[#777] mb-4">Password Change</div>

              <div className="space-y-4.5 mb-2">
                <div>
                  <label className="block text-sm text-[#444] mb-1.5">Current Password</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep unchanged"
                    className="w-full px-3.5 py-2.5 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#444] mb-1.5">New Password</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep unchanged"
                    className="w-full px-3.5 py-2.5 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#444] mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep unchanged"
                    className="w-full px-3.5 py-2.5 border border-black/15 rounded-sm text-sm outline-none focus:border-(--color-gold) focus:ring-2 focus:ring-(--color-gold)/10"
                  />
                </div>
              </div>

              <button
                onClick={saveAccount}
                className="mt-3 bg-(--color-gold) text-white px-7 py-2.5 text-sm font-medium rounded-sm hover:bg-(--color-accent) transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}