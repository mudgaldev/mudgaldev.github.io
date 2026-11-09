import { useState } from 'react'
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Heart, Leaf, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react'
import { categories, products } from './data/products.js'
import logo from '../assets/logo/cb logo.png'

const formatPrice = (amount) => `₹${amount.toLocaleString('en-IN')}`

function App() {
  const [activeCategory, setActiveCategory] = useState('Everything')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [favorites, setFavorites] = useState([])

  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'Everything' || product.category === activeCategory
    const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const cartItems = products.filter((product) => cart[product.id])
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  const cartTotal = cartItems.reduce((total, product) => total + product.price * cart[product.id], 0)

  const changeQuantity = (productId, amount) => {
    setCart((current) => {
      const quantity = (current[productId] || 0) + amount
      if (quantity <= 0) {
        const next = { ...current }
        delete next[productId]
        return next
      }
      return { ...current, [productId]: quantity }
    })
  }

  const toggleFavorite = (productId) => {
    setFavorites((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId])
  }

  const scrollToShop = () => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="announcement flex items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium tracking-wide">
        <Leaf size={13} aria-hidden="true" />
        <span>Good food, grown close. Free delivery on orders over ₹799.</span>
        <ArrowRight size={13} aria-hidden="true" />
      </div>

      <header className="site-header sticky top-0 z-30 border-b border-ink/10 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-5 py-4 md:px-10">
          <a href="#home" className="brand flex shrink-0 items-center gap-2" aria-label="Carrot and Bean home">
            <img src={logo} alt="Carrot Beans" className="h-[54px] w-[100px] object-contain" />
            <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">Good food, good mood</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Main navigation">
            <a className="nav-link" href="#shop">The shop</a>
            <a className="nav-link" href="#story">Our way</a>
            <a className="nav-link" href="#footer">Say hello</a>
          </nav>

          <div className="flex items-center gap-3">
            <label className="search-box hidden items-center gap-2 rounded-full border border-ink/15 px-3 py-2 sm:flex">
              <Search size={16} className="text-muted" aria-hidden="true" />
              <input aria-label="Search the menu" className="w-32 bg-transparent text-xs outline-none placeholder:text-muted" placeholder="Find something good" value={search} onChange={(event) => setSearch(event.target.value)} />
            </label>
            <button type="button" className="cart-trigger relative flex h-10 items-center gap-2 rounded-full bg-leaf px-4 text-sm font-semibold text-white transition hover:bg-leaf-dark" onClick={() => setCartOpen(true)} aria-label={`Open basket, ${cartCount} items`}>
              <ShoppingBag size={17} aria-hidden="true" /><span className="hidden sm:inline">Bag</span><span className="cart-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-[0.95fr_1.05fr] md:px-10 md:pb-24 md:pt-16">
          <div className="hero-copy relative z-10 py-4 md:py-10">
            <p className="eyebrow mb-5 flex items-center gap-2 text-xs font-bold uppercase"><span className="eyebrow-dot" /> A little local goodness</p>
            <h1 className="font-display max-w-[680px] text-[clamp(3.2rem,7.2vw,6.8rem)] leading-[0.94]">A little joy,<br />a lot of <span className="text-terracotta">good.</span></h1>
            <p className="mt-6 max-w-md text-base leading-7 text-muted md:text-lg">Thoughtful vegetarian plates and small-batch sweets, made fresh with the good stuff.</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button onClick={scrollToShop} className="primary-button flex items-center gap-3 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta-dark">Find your favourite <ArrowRight size={16} /></button>
              <a href="#story" className="text-sm font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink">A bit about us</a>
            </div>
            <div className="mt-12 flex items-center gap-3 border-t border-ink/10 pt-5 text-sm text-muted">
              <span className="flex -space-x-2" aria-hidden="true"><span className="avatar bg-sage">A</span><span className="avatar bg-peach">M</span><span className="avatar bg-yellow">S</span></span>
              <span><strong className="text-ink">Made with care</strong> in our neighbourhood kitchen</span>
            </div>
          </div>

          <div className="hero-visual relative min-h-[350px] overflow-hidden rounded-[8px] md:min-h-[560px]">
            <img className="hero-image absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=90" alt="A colourful bowl of fresh vegetables, grains and greens" />
            <div className="hero-caption absolute bottom-5 left-5 flex items-center gap-3 rounded-[6px] bg-paper px-4 py-3 md:bottom-7 md:left-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-leaf"><Leaf size={20} /></span>
              <span className="text-xs leading-5"><strong className="block text-sm">Fresh from our kitchen</strong>Made today, enjoyed today</span>
            </div>
            <span className="hero-sticker absolute right-5 top-5 flex h-[82px] w-[82px] rotate-6 flex-col items-center justify-center rounded-full bg-yellow text-center text-[10px] font-bold uppercase leading-4 text-leaf md:right-7 md:top-7">Good things<br />inside <Heart size={13} className="mt-1" /></span>
          </div>
        </section>

        <section className="category-band border-y border-ink/10 bg-white/50" aria-label="Shop by category">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-ink/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-10">
            <button className="category-tile group flex items-center justify-between gap-4 py-5 text-left sm:pr-7 md:py-7" onClick={() => { setActiveCategory('Meals'); scrollToShop() }}><span><span className="block text-xs font-semibold uppercase text-muted">From the kitchen</span><strong className="font-display mt-1 block text-2xl">Veggie meals</strong></span><span className="category-icon bg-sage text-leaf"><ArrowDownRight size={21} /></span></button>
            <button className="category-tile group flex items-center justify-between gap-4 py-5 text-left sm:px-7 md:py-7" onClick={() => { setActiveCategory('Sweets'); scrollToShop() }}><span><span className="block text-xs font-semibold uppercase text-muted">A little treat</span><strong className="font-display mt-1 block text-2xl">Something sweet</strong></span><span className="category-icon bg-peach text-terracotta"><ArrowDownRight size={21} /></span></button>
            <button className="category-tile group flex items-center justify-between gap-4 py-5 text-left sm:pl-7 md:py-7" onClick={() => { setActiveCategory('Snacks'); scrollToShop() }}><span><span className="block text-xs font-semibold uppercase text-muted">For the in-between</span><strong className="font-display mt-1 block text-2xl">Little bites</strong></span><span className="category-icon bg-yellow text-leaf"><ArrowDownRight size={21} /></span></button>
          </div>
        </section>

        <section id="shop" className="shop-section mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="eyebrow mb-3 text-xs font-bold uppercase">Made fresh, just for you</p><h2 className="font-display text-4xl leading-none md:text-5xl">The good stuff</h2></div>
            <div className="mobile-search flex items-center gap-2 rounded-full border border-ink/15 px-3 py-2 sm:hidden"><Search size={16} className="text-muted" /><input aria-label="Search the menu" className="w-full bg-transparent text-sm outline-none placeholder:text-muted" placeholder="Find something good" value={search} onChange={(event) => setSearch(event.target.value)} /></div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products by category">
              {categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`filter-pill rounded-full px-4 py-2 text-xs font-semibold transition ${activeCategory === category ? 'bg-leaf text-white' : 'border border-ink/15 text-ink hover:border-leaf'}`}>{category}</button>)}
            </div>
          </div>

          {visibleProducts.length ? <div className="product-grid grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <article key={product.id} className="product-card group">
                <div className="product-image-wrap relative aspect-[1.25] overflow-hidden rounded-[6px] bg-sage">
                  <img className="product-image h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" src={product.image} alt={product.name} loading="lazy" />
                  {product.label && <span className="absolute left-3 top-3 rounded-full bg-paper px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide">{product.label}</span>}
                  <button className={`favorite-button absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper transition ${favorites.includes(product.id) ? 'text-terracotta' : 'text-ink hover:text-terracotta'}`} onClick={() => toggleFavorite(product.id)} aria-label={`${favorites.includes(product.id) ? 'Remove' : 'Add'} ${product.name} ${favorites.includes(product.id) ? 'from' : 'to'} favourites`}><Heart size={17} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} /></button>
                </div>
                <div className="flex items-start justify-between gap-3 pt-4">
                  <div><p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-muted">{product.category}</p><h3 className="font-display text-[22px] leading-tight">{product.name}</h3><p className="mt-1.5 text-sm text-muted">{product.description}</p></div>
                  <span className="shrink-0 pt-5 text-sm font-bold">{formatPrice(product.price)}</span>
                </div>
                <button className="add-button mt-4 flex w-full items-center justify-center gap-2 rounded-[4px] border border-leaf px-4 py-2.5 text-sm font-semibold text-leaf transition hover:bg-leaf hover:text-white" onClick={() => changeQuantity(product.id, 1)}><Plus size={15} /> Add to bag</button>
              </article>
            ))}
          </div> : <div className="py-16 text-center"><p className="font-display text-3xl">Nothing on the menu just yet.</p><p className="mt-2 text-sm text-muted">Try another search or category.</p><button className="mt-5 text-sm font-semibold underline underline-offset-4" onClick={() => { setSearch(''); setActiveCategory('Everything') }}>Show everything</button></div>}
          <div className="mt-14 border-t border-ink/10 pt-6 text-center text-sm text-muted">A little different every day, because good things are made fresh.</div>
        </section>

        <section id="story" className="story-section bg-leaf px-5 py-16 text-paper md:px-10 md:py-20">
          <div className="mx-auto grid max-w-[1280px] items-center gap-8 md:grid-cols-[1fr_auto]">
            <div><p className="mb-3 text-xs font-bold uppercase tracking-wide text-yellow">A note from our kitchen</p><h2 className="font-display max-w-3xl text-4xl leading-tight md:text-6xl">Good food should feel good, all the way around.</h2><p className="mt-5 max-w-xl text-sm leading-6 text-white/75 md:text-base">We cook with seasonal produce, make things in small batches, and keep every plate completely vegetarian. Simple as that.</p></div>
            <a href="#shop" className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 transition hover:bg-white hover:text-leaf" aria-label="Explore the menu"><ArrowRight size={22} /></a>
          </div>
        </section>
      </main>

      <footer id="footer" className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between md:px-10">
        <a href="#home" className="font-bold text-ink">carrot<span className="text-terracotta">&</span>bean</a>
        <p>Vegetarian by nature. Made with care, every day.</p>
        <a href="mailto:hello@carrotandbean.example" className="font-semibold text-ink hover:text-terracotta">hello@carrotandbean.example</a>
      </footer>

      {cartOpen && <div className="cart-layer fixed inset-0 z-50" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}>
        <aside className="cart-drawer absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-paper shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5"><div><p className="text-xs font-semibold uppercase text-muted">Your picks</p><h2 id="cart-title" className="font-display text-3xl">The bag <span className="font-sans text-sm font-medium text-muted">({cartCount})</span></h2></div><button onClick={() => setCartOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5" aria-label="Close basket"><X size={20} /></button></div>
          {cartItems.length ? <>
            <div className="flex-1 overflow-y-auto px-6">
              {cartItems.map((product) => <div key={product.id} className="flex gap-4 border-b border-ink/10 py-5"><img src={product.image} alt="" className="h-20 w-20 rounded-[4px] object-cover" /><div className="flex min-w-0 flex-1 flex-col justify-between"><div><h3 className="font-display text-lg leading-tight">{product.name}</h3><p className="mt-1 text-xs text-muted">{formatPrice(product.price)}</p></div><div className="flex items-center gap-3"><button className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15" onClick={() => changeQuantity(product.id, -1)} aria-label={`Remove one ${product.name}`}><Minus size={13} /></button><span className="text-sm font-semibold">{cart[product.id]}</span><button className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15" onClick={() => changeQuantity(product.id, 1)} aria-label={`Add one ${product.name}`}><Plus size={13} /></button></div></div><strong className="text-sm">{formatPrice(product.price * cart[product.id])}</strong></div>)}
            </div>
            <div className="border-t border-ink/10 px-6 py-5"><div className="mb-4 flex justify-between text-sm"><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div><p className="mb-4 flex items-center gap-2 text-xs text-muted"><Check size={14} className="text-leaf" /> Taxes included. Delivery calculated at checkout.</p><button className="flex w-full items-center justify-center gap-2 rounded-full bg-terracotta py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta-dark" onClick={() => window.alert('Checkout will be set up in a later step.')}>Continue to checkout <ChevronDown size={16} className="-rotate-90" /></button></div>
          </> : <div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sage text-leaf"><ShoppingBag size={26} /></span><h3 className="font-display text-3xl">Room for something good.</h3><p className="mt-2 text-sm text-muted">Your bag is empty for now. Take a look around.</p><button className="mt-6 flex items-center gap-2 rounded-full bg-leaf px-5 py-3 text-sm font-semibold text-white" onClick={() => { setCartOpen(false); scrollToShop() }}>Browse the menu <ArrowRight size={15} /></button></div>}
        </aside>
      </div>}
    </div>
  )
}

export default App