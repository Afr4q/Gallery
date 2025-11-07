// Basic interactions: click to open full image, and scroll-to-top
/*
  Dynamic gallery loader
  - Expects a file `images.json` in the same folder containing an array of relative image paths (e.g. ["src/img1.jpg","src/img2.jpg"]).
  - Use the provided Node script `generate-images-json.js` to create it from your `src/` folder.
*/
document.addEventListener('DOMContentLoaded', async function () {
  const gallery = document.getElementById('gallery')
  const toTop = document.getElementById('toTop')

  // Scroll to top button behavior
  toTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}))
  function checkScroll(){
    if(window.scrollY > 200) toTop.style.opacity = '1'; else toTop.style.opacity = '0.25';
  }
  checkScroll(); window.addEventListener('scroll', checkScroll);

  // Try to load images.json
  let images = []
  try {
    const res = await fetch('images.json', {cache:'no-store'})
    if (!res.ok) throw new Error('images.json not found')
    images = await res.json()
  } catch (err) {
    // Fallback: try some default names (if user didn't generate images.json)
    console.warn('Could not load images.json — falling back to scanning 1..100 with src/ prefix. Run `node generate-images-json.js` to generate images.json.')
    for (let i=1;i<=100;i++){ images.push(`src/${i}.jpg`) }
  }

  // create gallery items
  images.forEach((src, idx) => {
    const item = document.createElement('div')
    item.className = 'item'
    item.tabIndex = 0

    const img = document.createElement('img')
    img.src = src
    img.alt = `Photo ${idx+1}`
    img.loading = 'lazy'

    const caption = document.createElement('div')
    caption.className = 'caption'
    caption.textContent = '' // placeholder if you want filename or metadata

    item.appendChild(img)
    // optional caption: uncomment if needed
    // item.appendChild(caption)
    gallery.appendChild(item)

    // click / keyboard open in lightbox
    function openLB(){ openLightbox(idx) }
    item.addEventListener('click', openLB)
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLB() } })
  })

  // Lightbox logic
  const lb = document.getElementById('lightbox')
  const lbImage = document.getElementById('lbImage')
  const lbClose = document.getElementById('lbClose')
  const lbNext = document.getElementById('lbNext')
  const lbPrev = document.getElementById('lbPrev')
  let current = -1

  function openLightbox(i){
    if (i < 0 || i >= images.length) return
    current = i
    lbImage.src = images[current]
    lbImage.alt = `Photo ${current+1}`
    lb.setAttribute('aria-hidden','false')
    document.body.style.overflow = 'hidden'
    lb.focus()
  }

  function closeLightbox(){ lb.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; current = -1 }
  function nextImage(){ if (current < images.length-1) openLightbox(current+1) }
  function prevImage(){ if (current > 0) openLightbox(current-1) }

  lbClose.addEventListener('click', closeLightbox)
  lbNext.addEventListener('click', nextImage)
  lbPrev.addEventListener('click', prevImage)
  lb.addEventListener('click', (e)=>{ if(e.target === lb) closeLightbox() })

  window.addEventListener('keydown', (e)=>{
    if (lb.getAttribute('aria-hidden') === 'false'){
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
  })

})
