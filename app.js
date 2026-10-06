const categories = [
  {id:'face-eye', n:'01', name:'Face & Eye Care', sub:'Targeted Treatments', products:['Lash Serum']},
  {id:'soap-bars', n:'02', name:'Artisan Soap Bars', sub:'Natural Cleansing', products:['Soap Lavender','Soap Chamomile']},
  {id:'body-care', n:'03', name:'Body Care & Moisturization', sub:'Hydration & Exfoliation', products:['Lavender Scrub','Lavender Body Butter','Body Oil Lavender']},
  {id:'plant-oils', n:'04', name:'Pure Plant & Carrier Oils', sub:'Cold-Pressed Collection', products:['Cold Press Almond Oil','Cold Press Sesame Oil','Cold Press Castor Oil']},
  {id:'fragrance', n:'05', name:'Fragrance & Perfumery', sub:'Signature Scents', products:['White Musk Perfume and Pure Essence']}
];
const products = [
  {id:'lash-serum', name:'Lash Serum', cat:'Face & Eye Care', catId:'face-eye', desc:'A focused botanical ritual for lashes and delicate eye care.', price:22, image:null, badge:'NEW'},
  {id:'soap-lavender', name:'Soap Lavender', cat:'Artisan Soap Bars', catId:'soap-bars', desc:'A gentle handmade cleansing bar with a calming lavender character.', price:9, image:null, badge:'HANDMADE'},
  {id:'soap-chamomile', name:'Soap Chamomile', cat:'Artisan Soap Bars', catId:'soap-bars', desc:'A soft artisanal cleanse crafted for a comforting daily ritual.', price:9, image:null, badge:'HANDMADE'},
  {id:'lilac-valley-scrub', name:'Lavender Scrub — Lilac Valley', cat:'Body Care & Moisturization', catId:'body-care', desc:'A rich lavender body scrub for an exfoliating, sensorial ritual.', price:24, image:'assets/lilac-scrub-premium.png', gallery:['assets/lilac-scrub-premium.png','assets/lilac-scrub-hand.png','assets/lilac-campaign.png'], badge:'BEST SELLER'},
  {id:'lavender-body-butter', name:'Lavender Body Butter', cat:'Body Care & Moisturization', catId:'body-care', desc:'Deeply comforting moisture with a naturally aromatic lavender profile.', price:26, image:null},
  {id:'body-oil-lavender', name:'Body Oil Lavender', cat:'Body Care & Moisturization', catId:'body-care', desc:'A silky botanical oil designed to seal in softness after bathing.', price:24, image:null},
  {id:'almond-oil', name:'Cold Press Almond Oil', cat:'Pure Plant & Carrier Oils', catId:'plant-oils', desc:'Pure cold-pressed plant oil for skin, hair and wellness rituals.', price:16, image:null, badge:'COLD-PRESSED'},
  {id:'sesame-oil', name:'Cold Press Sesame Oil', cat:'Pure Plant & Carrier Oils', catId:'plant-oils', desc:'In-house cold-pressed sesame oil with a naturally nourishing profile.', price:16, image:null, badge:'COLD-PRESSED'},
  {id:'castor-oil', name:'Cold Press Castor Oil', cat:'Pure Plant & Carrier Oils', catId:'plant-oils', desc:'A versatile cold-pressed oil for beauty and self-care routines.', price:16, image:null, badge:'COLD-PRESSED'},
  {id:'white-musk', name:'White Musk Perfume & Pure Essence', cat:'Fragrance & Perfumery', catId:'fragrance', desc:'A clean, captivating layering ritual pairing body splash and pure essence.', price:28, image:'assets/crystal-musk.png', badge:'SIGNATURE'}
];

const state = { cart: JSON.parse(localStorage.getItem('soglam-cart')||'[]'), wishlist:new Set(), qty:1, activeCategory:'all' };
const main = document.getElementById('main');
const overlay = document.getElementById('overlay');
const cartDrawer = document.getElementById('cartDrawer');
const mobileMenu = document.getElementById('mobileMenu');
const searchPanel = document.getElementById('searchPanel');
const quickView = document.getElementById('quickView');
const toast = document.getElementById('toast');

const money = v => `$${v.toFixed(2)}`;
const byId = id => products.find(p=>p.id===id);
const placeholder = (p, cls='') => `<div class="product-placeholder ${cls}"><div><span class="placeholder-mark">✦</span><small>Official SoGlam product photo required for ${p.name}</small></div></div>`;
const imageOrPlaceholder = p => p.image ? `<img src="${p.image}" alt="${p.name}">` : placeholder(p);

function productCard(p){
  return `<article class="product-card reveal" data-product="${p.id}">
    <div class="product-media">
      ${p.image?`<img src="${p.image}" alt="${p.name}">`:placeholder(p)}
      ${p.badge?`<span class="badge">${p.badge}</span>`:''}
      <button class="wishlist-heart" data-wish="${p.id}" aria-label="Save ${p.name}">${state.wishlist.has(p.id)?'♥':'♡'}</button>
    </div>
    <div class="product-info">
      <span class="category">${p.cat}</span>
      <h3><a href="#product/${p.id}">${p.name}</a></h3>
      <p>${p.desc}</p>
      <div class="product-bottom"><strong>${money(p.price)}</strong><button class="quick-btn" data-quick="${p.id}">Quick view</button></div>
      <button class="btn primary add-card" data-add="${p.id}">Add to cart</button>
    </div>
  </article>`;
}

function homePage(){
  const catImage = {'face-eye':null,'soap-bars':'assets/lilac-campaign.png','body-care':'assets/lilac-scrub-premium.png','plant-oils':'assets/impact-reference.png','fragrance':'assets/crystal-musk.png'};
  return `<div class="page home-page">
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">NATURAL BEAUTY • MADE IN LEBANON</span>
          <h1 class="display">Safe in <em>Mother Nature's</em> Hands</h1>
          <p class="lede">Discover artisan natural body care born from local Lebanese soil. From in-house cold-pressed seed oils to soothing botanical soaps, experience pure beauty crafted with purpose.</p>
          <div class="button-row"><a class="btn primary" href="#shop">Shop the Collection</a><a class="btn secondary" href="#story">Our Farm-to-Skin Story</a></div>
          <div class="trust-line"><span>Vegan</span><span>Handmade</span><span>Locally Sourced</span></div>
        </div>
        <div class="hero-visual" id="heroVisual">
          <div class="leaf one"></div><div class="leaf two"></div><div class="gold-orbit"></div>
          <div class="hero-photo-wrap" id="heroProduct"><img class="hero-photo" src="assets/lilac-scrub-premium.png" alt="Real SoGlam Lilac Valley body scrub photograph"></div>
          <div class="hero-label">Pure • Local • Handcrafted</div>
        </div>
      </div>
    </section>

    <div class="trust-strip"><div class="trust-grid"><span>Vegan</span><span>Handmade</span><span>Made in Lebanon</span><span>Cold-Pressed In-House</span><span>Locally Sourced</span></div></div>

    <section class="section"><div class="container">
      <div class="section-head reveal"><div><span class="eyebrow">SHOP BY RITUAL</span><h2 class="h2">Nature, Made Personal.</h2></div><p class="muted">Five intentional collections designed around how you care for skin, body, hair and scent.</p></div>
      <div class="category-grid">${categories.map((c,i)=>{
        const img=catImage[c.id]; return `<a class="category-card reveal" href="#shop?category=${c.id}">${img?`<img src="${img}" alt="${c.name}">`:`<div class="category-placeholder"><div class="cat-copy"><span>${c.n}</span><h3>${c.name}</h3><small>${c.sub}</small></div></div>`}${img?`<div class="cat-copy"><span>${c.n} • ${c.sub}</span><h3>${c.name}</h3><small>Explore collection →</small></div>`:''}</a>`
      }).join('')}</div>
    </div></section>

    <section class="section-tight"><div class="container">
      <div class="section-head reveal"><div><span class="eyebrow">CUSTOMER FAVORITES</span><h2 class="h2">Our Most-Loved Rituals</h2></div><a class="text-link" href="#shop">View all products →</a></div>
      <div class="product-grid">${products.filter(p=>p.image).concat(products.filter(p=>!p.image).slice(0,1)).map(productCard).join('')}</div>
    </div></section>

    <section class="campaign reveal"><img src="assets/lilac-campaign.png" alt="SoGlam Lilac Valley campaign"><div class="campaign-copy"><span class="eyebrow" style="color:#d9c888">EDITORIAL RITUAL</span><h2 class="h2">Escape to Lilac Valley.</h2><p>Handcrafted tranquility, inspired by nature. Discover a lavender ritual created to soften the body and quiet the senses.</p><div class="button-row"><a class="btn secondary" style="border-color:#d9c888;color:#fff" href="#product/lilac-valley-scrub">Explore Lilac Valley</a></div></div></section>

    <section class="section"><div class="container">
      <div class="story-intro reveal"><div><span class="eyebrow">OUR ROOTS</span><h2 class="h2">Rooted in Love.<br>Built for Every Home.</h2><p class="big-quote">“True luxury shouldn't come with chemical compromises.”</p></div><div class="story-copy"><p>What began as a personal creation born from love has grown into a promise to every family we serve. At SoGlam, we believe that true luxury shouldn't come with chemical compromises.</p><p>That is why we do things differently—owning every single step of our production right here in Lebanon.</p><a class="text-link" href="#story">Read our full story →</a></div></div>
      <div class="journey">
        <div class="journey-row reveal"><div class="num">01</div><h3>In-House Cold-Pressed Extraction</h3><p>We operate our own cold-press extraction machinery to process pure, nutrient-dense seed and plant oils in-house.</p></div>
        <div class="journey-row reveal"><div class="num">02</div><h3>Local Farmer Partnerships</h3><p>We source herbs and botanicals directly from trusted local Lebanese farmers, supporting freshness and agricultural communities.</p></div>
        <div class="journey-row reveal"><div class="num">03</div><h3>Certified Standards</h3><p>Our clean-beauty commitment has been recognized through programs including Berytech TRI Idealab and Green Women-Led.</p></div>
      </div>
    </div></section>

    <section class="section-tight"><div class="container"><div class="about-grid">
      <div class="about-image reveal"><img src="assets/lilac-scrub-hand.png" alt="Real SoGlam Lilac Valley scrub outdoors"></div>
      <div class="reveal"><span class="eyebrow">WHO IS SOGLAM</span><h2 class="h2">Beauty Born from Nature.</h2><p class="lede">Since 2019, SoGlam has celebrated the natural wonders of our planet through vegan, handmade and clean beauty created with respect for Mother Earth.</p><p class="muted">Organic essential oils, natural cold-pressed oils, local sourcing and in-house production come together in every ritual.</p><div class="stats-grid"><div class="stat"><strong>2019</strong><span>Since</span></div><div class="stat"><strong>Vegan</strong><span>Plant-minded</span></div><div class="stat"><strong>Handmade</strong><span>Crafted locally</span></div><div class="stat"><strong>Clean</strong><span>Beauty</span></div><div class="stat"><strong>In-house</strong><span>Production</span></div><div class="stat"><strong>Local</strong><span>Sourcing</span></div></div></div>
    </div></div></section>

    <section class="section values"><div class="container"><div class="section-head reveal"><div><span class="eyebrow">OUR VALUES</span><h2 class="h2">Care, from source to skin.</h2></div></div><div class="value-grid">
      <article class="value-card reveal"><div class="value-icon">I</div><h3>Ingredients</h3><p>Our rigorous selection criteria guarantees purity, quality and integrity.</p></article>
      <article class="value-card reveal"><div class="value-icon">S</div><h3>Sustainability</h3><p>We're committed to reducing our impact on the planet.</p></article>
      <article class="value-card reveal"><div class="value-icon">C</div><h3>Customer Relationship</h3><p>Because if we do not understand and listen to our customers deeply and genuinely, we cannot truly serve them.</p></article>
    </div></div></section>

    <section class="section"><div class="container"><div class="impact-grid">
      <div class="impact-photo reveal"><img src="assets/impact-reference.png" alt="SoGlam impact reference"></div>
      <div class="reveal"><span class="eyebrow">PURPOSE BEYOND PRODUCT</span><h2 class="h2">Our Impact</h2><div class="impact-list">
        <div class="impact-item"><span>01</span><div><h4>Environmental Responsibility</h4><p>Promoting sustainability through all-natural and clean beauty practices.</p></div></div>
        <div class="impact-item"><span>02</span><div><h4>Economic Empowerment</h4><p>Supporting local artisans and communities in Lebanon through handmade products.</p></div></div>
        <div class="impact-item"><span>03</span><div><h4>Clean Beauty Advocacy</h4><p>Raising awareness and demand for cleaner beauty products.</p></div></div>
      </div></div>
    </div></div></section>

    <section class="statement"><div class="container reveal"><p>Let's come together to redefine beauty through natural beauty practices, where <em>integrity</em>, <strong>positivity</strong>, and <em>trust</em> are our guiding principles.</p></div></section>

    <section class="section"><div class="container"><div class="recognition reveal"><div><span class="eyebrow">TRUST & CREDIBILITY</span><h2 class="h2">Proudly Recognized & Certified By</h2></div><div class="badge-grid"><div class="recognition-card"><span>Winner</span><strong>Green Women-Led Program</strong></div><div class="recognition-card"><span>Graduate</span><strong>Berytech TRI Idealab</strong></div><div class="recognition-card"><span>Selected</span><strong>Francophone Showcase</strong></div></div></div></div></section>

    <section class="section newsletter"><div class="container"><div class="newsletter-inner reveal"><div><span class="eyebrow">THE SOGLAM LETTER</span><h2 class="h2">Stay Close to Nature</h2><p class="muted">Join the SoGlam community for product launches, rituals and natural beauty inspiration.</p></div><form class="newsletter-form" onsubmit="event.preventDefault();showToast('Welcome to the SoGlam community.');"><input type="email" required placeholder="Your email address" aria-label="Email address"><button class="btn primary">Subscribe</button></form></div></div></section>
  </div>`;
}

function shopPage(){
  const qs = new URLSearchParams(location.hash.split('?')[1]||'');
  state.activeCategory = qs.get('category') || 'all';
  let list = products.filter(p=>state.activeCategory==='all'||p.catId===state.activeCategory);
  return `<div class="page"><section class="page-hero"><div class="container"><span class="eyebrow">THE COLLECTION</span><h1 class="display">Shop SoGlam</h1><p class="lede">Botanical rituals, handcrafted with purpose. Explore natural care made in Lebanon.</p></div></section>
  <section class="section-tight"><div class="container">
    <div class="shop-toolbar"><div class="category-tabs"><button class="chip ${state.activeCategory==='all'?'active':''}" data-filter="all">All</button>${categories.map(c=>`<button class="chip ${state.activeCategory===c.id?'active':''}" data-filter="${c.id}">${c.name}</button>`).join('')}</div><div style="display:flex;gap:8px"><button class="btn secondary filter-btn-mobile">Filters</button><select class="sort-select" id="sortSelect"><option value="featured">Featured</option><option value="newest">Newest</option><option value="low">Price Low to High</option><option value="high">Price High to Low</option></select></div></div>
    <div class="shop-layout"><aside class="filters"><div class="filter-group"><h4>Category</h4>${categories.map(c=>`<label><input type="checkbox" data-checkcat="${c.id}" ${state.activeCategory===c.id?'checked':''}> ${c.name}</label>`).join('')}</div><div class="filter-group"><h4>Product Type</h4><label><input type="checkbox"> Treatment</label><label><input type="checkbox"> Cleansing</label><label><input type="checkbox"> Moisturization</label><label><input type="checkbox"> Cold-Pressed Oil</label><label><input type="checkbox"> Fragrance</label></div><div class="filter-group"><h4>Highlights</h4><label><input type="checkbox"> Best Sellers</label><label><input type="checkbox"> New Products</label></div><div class="filter-group"><h4>Price</h4><label><input type="checkbox"> Under $20</label><label><input type="checkbox"> $20–$30</label><label><input type="checkbox"> $30+</label></div></aside><div class="shop-grid" id="shopGrid">${list.map(productCard).join('')}</div></div>
  </div></section></div>`;
}

function productPage(id){
  const p = byId(id) || products[3]; const gallery = p.gallery || (p.image?[p.image]:[]);
  return `<div class="page"><section class="product-page"><div class="container"><div class="breadcrumbs"><a href="#home">Home</a> / <a href="#shop">Shop</a> / ${p.cat} / ${p.name}</div><div class="pdp-grid">
    <div><div class="gallery-main" id="galleryMain">${p.image?`<img src="${p.image}" alt="${p.name}">`:placeholder(p)}</div>${gallery.length?`<div class="gallery-thumbs">${gallery.map(src=>`<button data-gallery="${src}"><img src="${src}" alt="${p.name}"></button>`).join('')}</div>`:''}</div>
    <div class="pdp-info"><span class="eyebrow">${p.cat}</span><h1 class="h2">${p.name}</h1><div class="rating">★★★★★ <span class="muted">(review placeholder)</span></div><div class="price">${money(p.price)}</div><p class="lede">${p.desc}</p><p class="muted">A premium SoGlam ritual crafted with a clean, natural approach and made with care in Lebanon.</p>
      <div class="pdp-actions"><div class="qty"><button data-qty="minus">−</button><span id="qtyValue">1</span><button data-qty="plus">+</button></div><button class="btn primary" data-add="${p.id}">Add to Cart</button></div><div class="pdp-secondary"><button class="btn dark" data-add="${p.id}" data-buy>Buy Now</button><button class="btn secondary" data-wish="${p.id}">${state.wishlist.has(p.id)?'Saved ♥':'Add to Wishlist ♡'}</button></div>
      <div class="accordion"><details open><summary>Product Details</summary><p>${p.desc} Exact commercial product copy can be connected to the product database.</p></details><details><summary>Benefits</summary><p>Designed for a sensorial, ingredient-led beauty ritual. Replace with approved claims for each product.</p></details><details><summary>Ingredients</summary><p>Use the official approved ingredient list for this product.</p></details><details><summary>How to Use</summary><p>Apply according to the official SoGlam usage guidance.</p></details><details><summary>Storage / Care</summary><p>Store according to the approved product care instructions.</p></details><details><summary>Shipping & Delivery</summary><p>Local delivery details and thresholds appear here.</p></details></div>
    </div>
  </div></div></section>
  <section class="section-tight" style="background:var(--white)"><div class="container"><div class="section-head"><div><span class="eyebrow">COMPLETE THE RITUAL</span><h2 class="h2">You May Also Like</h2></div></div><div class="product-grid">${products.filter(x=>x.id!==p.id).slice(0,4).map(productCard).join('')}</div></div></section><div class="sticky-mobile-cart"><div><small>${p.name}</small><strong style="display:block">${money(p.price)}</strong></div><button class="btn primary" data-add="${p.id}">Add to Cart</button></div></div>`;
}

function aboutPage(){ return `<div class="page content-page"><section class="page-hero"><div class="container"><span class="eyebrow">ABOUT SOGLAM</span><h1 class="display">Nature Has Always Known the Way.</h1><p class="lede">A Lebanese clean-beauty story built around ingredient integrity, in-house craft and respect for Mother Earth.</p></div></section><section class="section"><div class="container"><div class="editorial-grid"><div class="about-image reveal"><img src="assets/about-reference.png" alt="Who is SoGlam brand material"></div><div class="reveal"><span class="eyebrow">SINCE 2019</span><h2 class="h2">Who Is SoGlam?</h2><p class="lede">SoGlam is a beauty brand celebrating the natural wonders of our planet. Since 2019, the brand has created vegan, handmade and clean products with respect for Mother Earth.</p><p class="muted">Products use organic essential oils and natural cold-pressed organic oils. Quality, sustainability, authenticity and in-house production sit at the heart of the brand.</p><div class="stats-grid"><div class="stat"><strong>Vegan</strong><span>Mindful formulas</span></div><div class="stat"><strong>Handmade</strong><span>In Lebanon</span></div><div class="stat"><strong>Clean</strong><span>Beauty philosophy</span></div><div class="stat"><strong>Local</strong><span>Ingredient sourcing</span></div><div class="stat"><strong>In-House</strong><span>Production</span></div><div class="stat"><strong>2019</strong><span>Founded</span></div></div></div></div></div></section><section class="section values"><div class="container"><div class="section-head"><div><span class="eyebrow">OUR PHILOSOPHY</span><h2 class="h2">Three promises behind every ritual.</h2></div></div><div class="value-grid"><div class="value-card"><div class="value-icon">I</div><h3>Ingredients</h3><p>Our rigorous selection criteria guarantees purity, quality and integrity.</p></div><div class="value-card"><div class="value-icon">S</div><h3>Sustainability</h3><p>We're committed to reducing our impact on the planet.</p></div><div class="value-card"><div class="value-icon">C</div><h3>Customer Relationship</h3><p>Listening deeply and genuinely helps us serve people better.</p></div></div></div></section><section class="section"><div class="container"><div class="recognition"><div><span class="eyebrow">RECOGNITION</span><h2 class="h2">Quality with proof.</h2></div><div class="badge-grid"><div class="recognition-card"><span>Winner</span><strong>Green Women-Led Program</strong></div><div class="recognition-card"><span>Graduate</span><strong>Berytech TRI Idealab</strong></div><div class="recognition-card"><span>Selected</span><strong>Francophone Showcase</strong></div></div></div></div></section></div>`; }

function storyPage(){ return `<div class="page content-page"><section class="page-hero"><div class="container"><span class="eyebrow">OUR STORY</span><h1 class="display">From a Personal Creation to a Local Beauty Ritual.</h1><p class="lede">A story of love, Lebanese ingredients, hands-on production and a cleaner idea of luxury.</p></div></section><section class="section"><div class="container"><div class="editorial-grid"><div><span class="eyebrow">01 — THE BEGINNING</span><h2 class="h2">Rooted in Love.</h2><p class="lede">What began as a personal creation born from love grew into a promise to every family SoGlam serves.</p><p class="muted">The belief was simple: true luxury should not come with chemical compromises.</p></div><div class="about-image"><img src="assets/lilac-scrub-premium.png" alt="Real SoGlam Lilac Valley product"></div></div><div class="journey"><div class="journey-row"><div class="num">02</div><h3>Handmade Local Brand</h3><p>Products are crafted with a focus on natural beauty, authenticity and a personal touch.</p></div><div class="journey-row"><div class="num">03</div><h3>In-House Production</h3><p>SoGlam operates its own cold-press extraction machinery for pure seed and plant oils.</p></div><div class="journey-row"><div class="num">04</div><h3>Farmer Partnerships</h3><p>Herbs and botanicals are sourced from trusted local Lebanese farmers.</p></div><div class="journey-row"><div class="num">05</div><h3>Clean Beauty Mission</h3><p>Vegan, handmade and clean products are created with respect for Mother Earth.</p></div><div class="journey-row"><div class="num">06</div><h3>Community Impact</h3><p>Supporting artisans, agriculture and a stronger culture of sustainable beauty in Lebanon.</p></div></div></div></section><section class="statement"><div class="container"><p>Pure ingredients. Local hands. A slower, more intentional way to make <em>beauty</em>.</p></div></section></div>`; }

function contactPage(){ return `<div class="page"><section class="page-hero"><div class="container"><span class="eyebrow">CONTACT</span><h1 class="display">Let's Stay Connected.</h1><p class="lede">Questions, orders or collaborations — reach out to the SoGlam team.</p></div></section><section class="section"><div class="container"><div class="contact-grid"><div><span class="eyebrow">SOGLAM LEBANON</span><h2 class="h2">We're here to help.</h2><p><a class="text-link" href="mailto:SO_GLAM@OUTLOOK.COM">SO_GLAM@OUTLOOK.COM</a></p><p><a class="text-link" href="tel:+96176739911">+961 76 739 911</a></p><p>SOGLAM.ONLINE</p><div class="mini-badges"><span>Instagram</span><span>Facebook</span><span>TikTok</span></div></div><form class="contact-form" onsubmit="event.preventDefault();showToast('Message sent — thank you.');"><div class="field"><label>Name</label><input required></div><div class="field"><label>Email</label><input type="email" required></div><div class="field"><label>Phone (optional)</label><input></div><div class="field"><label>Subject</label><input required></div><div class="field full"><label>Message</label><textarea required></textarea></div><div class="field full"><button class="btn primary">Send Message</button></div></form></div></div></section></div>`; }

function cartPage(){
  const items = state.cart.map(ci=>({...ci,p:byId(ci.id)})).filter(x=>x.p);
  const subtotal=items.reduce((s,x)=>s+x.p.price*x.qty,0);
  return `<div class="page"><section class="page-hero"><div class="container"><span class="eyebrow">YOUR RITUAL</span><h1 class="display">Shopping Bag</h1></div></section><section class="section-tight"><div class="container"><div class="cart-page-grid"><div>${items.length?items.map(x=>`<div class="cart-line">${x.p.image?`<img src="${x.p.image}" alt="${x.p.name}">`:`<div class="placeholder-mini">✦</div>`}<div><span class="eyebrow">${x.p.cat}</span><h3 class="h3">${x.p.name}</h3><small>Qty ${x.qty}</small><br><button class="quick-btn" data-remove="${x.p.id}">Remove</button></div><strong>${money(x.p.price*x.qty)}</strong></div>`).join(''):`<div class="editorial-card"><h3 class="h3">Your bag is empty.</h3><p class="muted">Discover a ritual made for you.</p><a class="btn primary" href="#shop">Shop the Collection</a></div>`}</div><aside class="summary-card"><span class="eyebrow">ORDER SUMMARY</span><div class="total-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="total-row"><span>Shipping</span><span>${subtotal>=50?'Free':'Calculated at checkout'}</span></div><div class="total-row"><span>Total</span><strong>${money(subtotal)}</strong></div><a class="btn primary full" href="#checkout">Proceed to Checkout</a><p class="muted" style="font-size:11px">Simple, secure checkout. Guest checkout available.</p></aside></div></div></section></div>`;
}

function checkoutPage(){ const subtotal=state.cart.reduce((s,x)=>{const p=byId(x.id);return s+(p?p.price*x.qty:0)},0); return `<div class="page"><section class="page-hero"><div class="container"><span class="eyebrow">SECURE CHECKOUT</span><h1 class="display">Complete Your Order</h1><div class="checkout-progress"><span class="active">Information</span><span>→</span><span>Shipping</span><span>→</span><span>Payment</span></div></div></section><section class="section-tight"><div class="container"><div class="checkout-layout"><form id="checkoutForm"><div class="checkout-step"><h3>1. Contact Information</h3><div class="checkout-fields"><div class="field full"><label>Email</label><input type="email" required></div><div class="field"><label>First name</label><input required></div><div class="field"><label>Last name</label><input required></div><div class="field full"><label>Phone</label><input required></div></div></div><div class="checkout-step"><h3>2. Shipping Address</h3><div class="checkout-fields"><div class="field"><label>Country</label><input value="Lebanon" required></div><div class="field"><label>City</label><input required></div><div class="field"><label>Area</label><input required></div><div class="field"><label>Street</label><input required></div><div class="field"><label>Building</label><input required></div><div class="field"><label>Floor</label><input></div><div class="field full"><label>Additional details</label><input></div></div></div><div class="checkout-step"><h3>3. Delivery Method</h3><label class="radio-card"><input type="radio" name="delivery" checked> Local Delivery <span style="margin-left:auto">${subtotal>=50?'FREE':'Calculated'}</span></label></div><div class="checkout-step"><h3>4. Payment Method</h3><label class="radio-card"><input type="radio" name="payment" checked> Cash on Delivery</label><label class="radio-card"><input type="radio" name="payment"> Online Payment</label></div><button class="btn primary full" type="submit">Place Order</button></form><aside class="summary-card"><span class="eyebrow">ORDER SUMMARY</span>${state.cart.map(x=>{const p=byId(x.id);return p?`<div class="total-row" style="padding:10px 0"><span>${p.name} × ${x.qty}</span><strong>${money(p.price*x.qty)}</strong></div>`:''}).join('')}<div class="total-row"><span>Total</span><strong>${money(subtotal)}</strong></div></aside></div></div></section></div>`; }

function confirmationPage(){ return `<div class="page"><section class="section" style="min-height:70vh;display:grid;place-items:center"><div class="container" style="text-align:center;max-width:800px"><span class="eyebrow">ORDER CONFIRMED</span><h1 class="display">Thank You — Your Ritual Is On Its Way.</h1><p class="lede" style="margin:0 auto 24px">We've received your order. A confirmation and delivery details would appear here in the production experience.</p><p><strong>Order #SG-${Math.floor(10000+Math.random()*89999)}</strong></p><a class="btn primary" href="#shop">Continue Shopping</a></div></section></div>`; }

function route(){
  const raw=location.hash.replace(/^#/,'')||'home'; const path=raw.split('?')[0];
  if(path==='home') main.innerHTML=homePage();
  else if(path==='shop') main.innerHTML=shopPage();
  else if(path.startsWith('product/')) main.innerHTML=productPage(path.split('/')[1]);
  else if(path==='about') main.innerHTML=aboutPage();
  else if(path==='story') main.innerHTML=storyPage();
  else if(path==='contact') main.innerHTML=contactPage();
  else if(path==='cart') main.innerHTML=cartPage();
  else if(path==='checkout') main.innerHTML=checkoutPage();
  else if(path==='confirmation') main.innerHTML=confirmationPage();
  else main.innerHTML=homePage();
  window.scrollTo({top:0,behavior:'instant'}); bindDynamic(); initReveal(); initHeroParallax();
}

function bindDynamic(){
  document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{addToCart(b.dataset.add,state.qty); if(b.dataset.buy){location.hash='#checkout'}});
  document.querySelectorAll('[data-wish]').forEach(b=>b.onclick=()=>{toggleWishlist(b.dataset.wish); if(b.closest('.pdp-info')) route(); else b.textContent=state.wishlist.has(b.dataset.wish)?'♥':'♡'});
  document.querySelectorAll('[data-quick]').forEach(b=>b.onclick=()=>openQuick(b.dataset.quick));
  document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{removeFromCart(b.dataset.remove); route()});
  document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{location.hash=`#shop${b.dataset.filter==='all'?'':`?category=${b.dataset.filter}`}`});
  document.querySelectorAll('[data-checkcat]').forEach(c=>c.onchange=()=>{if(c.checked) location.hash=`#shop?category=${c.dataset.checkcat}`});
  const sort=document.getElementById('sortSelect'); if(sort) sort.onchange=()=>sortGrid(sort.value);
  document.querySelectorAll('[data-gallery]').forEach(b=>b.onclick=()=>{const im=document.querySelector('#galleryMain img'); if(im) im.src=b.dataset.gallery});
  document.querySelectorAll('[data-qty]').forEach(b=>b.onclick=()=>{state.qty=Math.max(1,state.qty+(b.dataset.qty==='plus'?1:-1)); const v=document.getElementById('qtyValue'); if(v)v.textContent=state.qty});
  const form=document.getElementById('checkoutForm'); if(form) form.onsubmit=e=>{e.preventDefault();state.cart=[];saveCart();location.hash='#confirmation'};
}
function sortGrid(mode){
  const grid=document.getElementById('shopGrid'); if(!grid)return; let list=[...grid.querySelectorAll('.product-card')].map(el=>byId(el.dataset.product));
  if(mode==='low')list.sort((a,b)=>a.price-b.price); if(mode==='high')list.sort((a,b)=>b.price-a.price); if(mode==='newest')list.sort((a,b)=>(b.badge==='NEW')-(a.badge==='NEW'));
  grid.innerHTML=list.map(productCard).join('');bindDynamic();initReveal();
}
function addToCart(id,qty=1){const item=state.cart.find(x=>x.id===id); if(item)item.qty+=qty; else state.cart.push({id,qty}); saveCart(); showToast(`${byId(id).name} added to your bag.`);}
function removeFromCart(id){state.cart=state.cart.filter(x=>x.id!==id);saveCart();}
function saveCart(){localStorage.setItem('soglam-cart',JSON.stringify(state.cart));updateCartUI();}
function toggleWishlist(id){state.wishlist.has(id)?state.wishlist.delete(id):state.wishlist.add(id);showToast(state.wishlist.has(id)?'Saved to wishlist.':'Removed from wishlist.');}
function updateCartUI(){const count=state.cart.reduce((s,x)=>s+x.qty,0);document.getElementById('cartCount').textContent=count;renderCartDrawer();}
function renderCartDrawer(){const el=document.getElementById('cartItems'); if(!el)return; const subtotal=state.cart.reduce((s,x)=>{const p=byId(x.id);return s+(p?p.price*x.qty:0)},0); el.innerHTML=state.cart.length?state.cart.map(x=>{const p=byId(x.id);if(!p)return'';return `<div class="cart-mini">${p.image?`<img src="${p.image}" alt="${p.name}">`:`<div class="placeholder-thumb">✦</div>`}<div><small>${p.cat}</small><h4>${p.name}</h4><small>Qty ${x.qty}</small></div><div><strong>${money(p.price*x.qty)}</strong><button data-mini-remove="${p.id}">×</button></div></div>`}).join(''):`<p class="muted">Your bag is empty.</p>`; document.getElementById('cartSubtotal').textContent=money(subtotal); const pct=Math.min(100,(subtotal/50)*100);document.getElementById('shippingProgress').style.width=pct+'%';document.getElementById('shippingText').textContent=subtotal>=50?'You unlocked free local delivery.':`Add ${money(50-subtotal)} for free local delivery.`;el.querySelectorAll('[data-mini-remove]').forEach(b=>b.onclick=()=>removeFromCart(b.dataset.miniRemove));}
function openQuick(id){const p=byId(id); document.getElementById('quickViewContent').innerHTML=`<div class="quick-grid"><div>${p.image?`<img src="${p.image}" alt="${p.name}">`:placeholder(p)}</div><div class="quick-content"><button class="icon-btn close-btn" data-close>×</button><span class="eyebrow">${p.cat}</span><h2 class="h2">${p.name}</h2><div class="price">${money(p.price)}</div><p class="muted">${p.desc}</p><button class="btn primary full" data-add="${p.id}">Add to Cart</button><a class="text-link" style="margin-top:18px" href="#product/${p.id}" data-close>View full details →</a></div></div>`;openLayer(quickView);bindDynamic();bindClosers();}
function openLayer(el){closeLayers();el.classList.add('open');el.setAttribute('aria-hidden','false');overlay.classList.add('show');document.body.classList.add('no-scroll')}
function closeLayers(){[cartDrawer,mobileMenu,searchPanel,quickView].forEach(el=>{el.classList.remove('open');el.setAttribute('aria-hidden','true')});overlay.classList.remove('show');document.body.classList.remove('no-scroll')}
function bindClosers(){document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeLayers)}
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),2200)}
function initReveal(){const els=[...document.querySelectorAll('.reveal')]; if(!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'));return} const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});els.forEach(e=>io.observe(e));}
function initHeroParallax(){const visual=document.getElementById('heroVisual'), product=document.getElementById('heroProduct'); if(!visual||!product)return;visual.onmousemove=e=>{const r=visual.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;product.style.transform=`translate(${x*6}px,${y*5}px)`};visual.onmouseleave=()=>product.style.transform='';}

categories.forEach(c=>{});
document.getElementById('megaLinks').innerHTML=categories.map(c=>`<div class="mega-cat"><span>${c.n}</span><h4>${c.name}</h4><small>${c.sub}</small>${c.products.map(name=>`<a href="#shop?category=${c.id}">${name}</a>`).join('')}</div>`).join('');
document.getElementById('mobileShopLinks').innerHTML=categories.map(c=>`<a href="#shop?category=${c.id}" data-close>${c.name}</a>`).join('');

document.getElementById('shopMenuBtn').onclick=e=>{e.stopPropagation();const m=document.getElementById('megaMenu');m.classList.toggle('open');document.getElementById('shopMenuBtn').setAttribute('aria-expanded',m.classList.contains('open'));};
document.addEventListener('click',e=>{if(!e.target.closest('.mega-menu')&&!e.target.closest('#shopMenuBtn'))document.getElementById('megaMenu').classList.remove('open')});
document.getElementById('cartBtn').onclick=()=>openLayer(cartDrawer);document.getElementById('menuBtn').onclick=()=>openLayer(mobileMenu);document.getElementById('searchBtn').onclick=()=>{openLayer(searchPanel);setTimeout(()=>document.getElementById('searchInput').focus(),100)};overlay.onclick=closeLayers;bindClosers();
document.getElementById('checkoutBtn').onclick=()=>{closeLayers();location.hash='#checkout'};
document.getElementById('searchInput').oninput=e=>{const q=e.target.value.toLowerCase().trim();const r=products.filter(p=>!q||(`${p.name} ${p.cat} ${p.desc}`).toLowerCase().includes(q)).slice(0,6);document.getElementById('searchResults').innerHTML=r.map(p=>`<a class="search-result" href="#product/${p.id}" data-close><span>${p.cat}</span><strong>${p.name}</strong><small>${money(p.price)}</small></a>`).join('');bindClosers();};
window.addEventListener('scroll',()=>document.getElementById('siteHeader').classList.toggle('scrolled',scrollY>15));
window.addEventListener('hashchange',()=>{closeLayers();state.qty=1;route()});
route();updateCartUI();
