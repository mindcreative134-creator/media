import { useState } from 'react'
import { Link, Zap, ShieldCheck, PlayCircle, Instagram, Facebook, Music2, Twitter, Download } from 'lucide-react'

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState<any>(null)
  const [error, setError] = useState('')
  const [view, setView] = useState('home') // home, history, api, premium

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleFetch = async () => {
    if (!url) return
    setLoading(true)
    setError('')
    setMetadata(null)
    try {
      // Mock API call for now, will connect to backend once running
      console.log('Fetching:', url)
      const response = await fetch(`${API_BASE_URL}/fetch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setMetadata(data)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch media')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 backdrop-blur-xl bg-[#06092f]/80 shadow-[0_40px_60px_-5px_rgba(227,227,255,0.06)]">
        <div className="flex items-center gap-4">
          <button className="text-[#90abff] hover:bg-[#1b2055] transition-colors p-2 rounded-lg active:scale-90">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#90abff] to-[#af88ff] font-headline">SMMF</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/20">
            <img src="https://avatar.vercel.sh/smmf" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-5xl mx-auto">
        {view === 'home' && (
          <>
            {/* Hero Section */}
            <section className="mb-16 mt-8 relative">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
              <div className="absolute top-0 -right-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>
              
              <div className="relative z-10 text-left md:text-center">
                <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                  Your Content, <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Reimagined.</span>
                </h2>
                <p className="font-body text-on-surface-variant text-lg max-w-xl md:mx-auto mb-12">
                  High-performance media extraction across every major social ecosystem. Paste. Fetch. Preserve.
                </p>

                <div className="max-w-3xl md:mx-auto space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex flex-col md:flex-row gap-4 p-2 bg-surface-container-lowest rounded-[2rem] border border-outline-variant/10 shadow-2xl overflow-hidden">
                      <input 
                        type="text" 
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste your social link here..."
                        className="flex-grow bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 py-4 px-6 text-xl font-medium outline-none"
                      />
                      <button 
                        onClick={handleFetch}
                        disabled={loading}
                        className="signature-gradient text-on-primary-fixed px-10 py-4 rounded-full font-headline font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_8px_32px_rgba(144,171,255,0.3)] disabled:opacity-50"
                      >
                        {loading ? 'Fetching...' : 'Fetch Media'}
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-error-container/20 border border-error/20 text-error text-center">
                      {error}
                    </div>
                  )}

                  {metadata && (
                    <div className="mt-12 bg-surface-container-high rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative aspect-video md:aspect-square">
                          <img src={metadata.thumbnail} alt={metadata.title} className="w-full h-full object-cover" />
                          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-mono">
                            {metadata.duration ? `${Math.floor(metadata.duration / 60)}:${(metadata.duration % 60).toString().padStart(2, '0')}` : 'HQ'}
                          </div>
                        </div>
                        <div className="md:w-2/3 p-8 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                                {metadata.platform}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 line-clamp-2">{metadata.title}</h3>
                            <p className="text-on-surface-variant text-sm line-clamp-3 mb-6">
                              {metadata.description || 'No description available for this post.'}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {metadata.formats && metadata.formats.slice(0, 4).map((f: any, i: number) => (
                              <a 
                                key={i}
                                href={f.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl border border-outline-variant/10 hover:border-primary/40 transition-all group"
                              >
                                <div>
                                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">{f.ext}</p>
                                  <p className="text-sm font-bold">{f.resolution || 'Direct Link'}</p>
                                </div>
                                <Download size={20} className="text-primary group-hover:scale-110 transition-transform" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-8 pt-4">
                    <div className="flex items-center gap-2 text-primary font-label text-xs uppercase tracking-widest opacity-80">
                      <Zap size={14} /> Fast Download
                    </div>
                    <div className="w-1 h-1 rounded-full bg-outline-variant/30"></div>
                    <div className="flex items-center gap-2 text-tertiary font-label text-xs uppercase tracking-widest opacity-80">
                      <ShieldCheck size={14} /> Secured by SMMF
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Platforms */}
            <section className="mb-20">
              <h3 className="font-headline text-on-surface-variant text-sm font-bold uppercase tracking-[0.2em] mb-8 text-center">Compatible Ecosystems</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
                {[
                  { name: 'YouTube', icon: <PlayCircle size={32} /> },
                  { name: 'Instagram', icon: <Instagram size={32} /> },
                  { name: 'Facebook', icon: <Facebook size={32} /> },
                  { name: 'TikTok', icon: <Music2 size={32} /> },
                  { name: 'X (Twitter)', icon: <Twitter size={32} /> }
                ].map((platform) => (
                  <div key={platform.name} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-surface-container-high hover:bg-surface-container-highest transition-all duration-300 group cursor-pointer border border-outline-variant/5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-surface-bright group-hover:scale-110 transition-transform">
                      <span className="text-on-surface-variant group-hover:text-primary transition-colors">
                        {platform.icon}
                      </span>
                    </div>
                    <span className="font-label text-xs font-semibold text-on-surface-variant">{platform.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {view === 'premium' && (
          <section className="py-12 animate-in fade-in duration-500">
            <div className="text-center mb-16">
              <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                Elevate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Workflow</span>
              </h1>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-medium">
                Switch to premium for lightning-fast speeds and professional API access. No ads, just pure performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-8">
              {/* Free Plan */}
              <div className="bg-surface-container-high rounded-[2rem] p-8 flex flex-col border border-outline-variant/10 relative overflow-hidden">
                <div className="mb-8">
                  <h3 className="font-headline text-2xl font-bold mb-2">Free</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-on-surface">$0</span>
                    <span className="text-on-surface-variant font-medium">/ forever</span>
                  </div>
                </div>
                <div className="space-y-6 mb-12 flex-grow text-sm">
                  {[
                    { label: 'Limited downloads', sub: '5 per day', icon: <Download size={20}/> },
                    { label: 'Ads included', sub: 'Standard experience', icon: <Zap size={20}/> },
                    { label: 'Normal speed', sub: 'Shared bandwidth', icon: <ShieldCheck size={20}/> }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-on-surface">{item.label}</p>
                        <p className="text-xs text-on-surface-variant">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 rounded-full border border-outline-variant text-primary font-bold hover:bg-surface-container-highest transition-all active:scale-95">
                  Current Plan
                </button>
              </div>

              {/* Premium Plan */}
              <div className="signature-gradient rounded-[2rem] p-8 flex flex-col relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(144,171,255,0.3)] md:scale-105 z-10 transition-transform">
                <div className="absolute top-6 right-6 bg-surface-container-lowest text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </div>
                <div className="mb-8">
                  <h3 className="font-headline text-2xl font-bold text-on-primary-fixed mb-2">Premium</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-on-primary-fixed">$9.99</span>
                    <span className="text-on-primary-fixed/70 font-medium">/ month</span>
                  </div>
                </div>
                <div className="space-y-6 mb-12 flex-grow text-sm">
                  {[
                    { label: 'Unlimited downloads', sub: 'No daily caps', icon: <Zap size={20}/> },
                    { label: 'Zero Ads', sub: 'Pure editorial interface', icon: <ShieldCheck size={20}/> },
                    { label: 'Ultra-Fast speed', sub: 'Priority server routing', icon: <Zap size={20}/> },
                    { label: 'Full API Access', sub: 'Integrate into your app', icon: <Link size={20}/> }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-on-primary-fixed">
                      <div className="w-10 h-10 rounded-2xl bg-on-primary-fixed/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-semibold">{item.label}</p>
                        <p className="text-xs opacity-70">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-5 rounded-full bg-surface-container-lowest text-primary font-extrabold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                  Upgrade Now
                </button>
              </div>
            </div>
          </section>
        )}

        {view === 'history' && (
          <section className="py-12 animate-in fade-in duration-500">
            <h2 className="font-headline text-3xl font-bold mb-10 pl-4 border-l-4 border-primary">Download History</h2>
            <div className="space-y-4">
              <div className="p-8 text-center bg-surface-container-high rounded-[2rem] border border-outline-variant/10">
                <p className="text-on-surface-variant font-medium">Your history is currently empty. Start fetching to see it here!</p>
              </div>
            </div>
          </section>
        )}

        {view === 'api' && (
          <section className="py-12 animate-in fade-in duration-500">
            <div className="text-center mb-16">
              <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                SMMF <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Engine</span> API
              </h1>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-medium">
                The most stable social media scraper API. Zero maintenance, maximum reliability. Professional grade.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-surface-container-high rounded-[2rem] p-8 border border-outline-variant/10">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Zap size={20} className="text-primary" /> Active API Key
                  </h3>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-grow w-full font-mono bg-surface-container-highest p-4 rounded-xl border border-outline-variant/10 text-on-surface-variant break-all">
                      sk_live_51Mxxxxxxxxxxxxxxxxxxxx
                    </div>
                    <button className="whitespace-nowrap px-8 py-4 rounded-full bg-primary text-on-primary font-bold active:scale-95 transition-all">
                      Regenerate
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-on-surface-variant/60">
                    Keep your API key secret. Use it in the <code>X-API-Key</code> header for all requests.
                  </p>
                </div>

                <div className="bg-surface-container-high rounded-[2rem] p-8 border border-outline-variant/10">
                  <h3 className="text-xl font-bold mb-6">Service Health</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Instagram Scraper', status: 'Operational', color: 'bg-green-500' },
                      { name: 'YouTube Engine', status: 'Operational', color: 'bg-green-500' },
                      { name: 'TikTok API', status: 'Operational', color: 'bg-green-500' },
                      { name: 'Playwright Fallback', status: 'Operational', color: 'bg-green-500' }
                    ].map((svc) => (
                      <div key={svc.name} className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl border border-outline-variant/10">
                        <span className="font-medium">{svc.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${svc.color} animate-pulse`}></span>
                          <span className="text-xs font-bold opacity-70 uppercase tracking-tighter">{svc.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-surface-container-high rounded-[2rem] p-8 border border-outline-variant/10">
                  <h3 className="text-xl font-bold mb-6">Usage Stats</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span>Daily Requests</span>
                        <span className="text-primary">42 / 100</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="p-4 bg-surface-container-highest rounded-2xl text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1">Success</p>
                        <p className="text-xl font-bold text-green-500">99.8%</p>
                      </div>
                      <div className="p-4 bg-surface-container-highest rounded-2xl text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1">Latency</p>
                        <p className="text-xl font-bold text-primary">1.2s</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="signature-gradient rounded-[2rem] p-8 text-on-primary-fixed shadow-lg">
                  <h3 className="font-bold text-lg mb-2">Need more power?</h3>
                  <p className="text-sm opacity-80 mb-6">Our Enterprise tier offers dedicated scrapers and 1M+ requests per month.</p>
                  <button className="w-full py-4 rounded-full bg-surface-container-lowest text-primary font-bold">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#06092f]/90 backdrop-blur-lg rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        {[
          { id: 'home', icon: 'home', label: 'Home' },
          { id: 'history', icon: 'history', label: 'History' },
          { id: 'api', icon: 'api', label: 'API' },
          { id: 'premium', icon: 'workspace_premium', label: 'Premium' }
        ].map((btn) => (
          <button 
            key={btn.id}
            onClick={() => setView(btn.id)}
            className={`flex flex-col items-center justify-center px-5 py-2 rounded-2xl transition-all active:scale-95 ${
              view === btn.id ? 'bg-[#1b2055] text-[#90abff]' : 'text-[#e3e3ff]/40 hover:text-[#af88ff]'
            }`}
          >
            <span className="material-symbols-outlined">{btn.icon}</span>
            <span className="font-body text-[10px] font-medium tracking-wide">{btn.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
