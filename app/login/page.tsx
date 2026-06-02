import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = await searchParams;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 600 }}>Admin Login</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'transparent', color: 'inherit' }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'transparent', color: 'inherit' }} 
            />
          </div>
          <button 
            formAction={login} 
            style={{ 
              marginTop: '1rem', 
              padding: '0.75rem', 
              background: 'var(--accent)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          {message && <p style={{ color: 'red', marginTop: '1rem', fontSize: '0.875rem' }}>{message}</p>}
        </form>
      </div>
    </main>
  )
}
