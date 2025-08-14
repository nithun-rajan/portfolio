// Smooth scroll for on-page nav links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if(id.length > 1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior:'smooth', block:'start' });
    }
  });
});

// Tiny intersection reveal (progressive)
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('reveal');
  });
},{ threshold: 0.12 });
document.querySelectorAll('.t-item, .card').forEach(el=>io.observe(el));
