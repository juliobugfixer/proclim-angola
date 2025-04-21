/*===================================CONTADOR=======================================*/
function startCounters() {
  const counters = document.querySelectorAll(".container-estatisticas .estatistica .contador");
  const limits = [300, 10, 500,1];

  counters.forEach((counter, index) => {
    let start = 0;
    const limit = limits[index];
    const increment = Math.ceil(limit / 100);
    const interval = setInterval(() => {
      start += increment;
      if (start >= limit) {
        start = limit;
        clearInterval(interval);
        counter.style.color = "#028DD0";
      }
      counter.textContent = `${start}`;
    }, 35);
  });
}

function isSectionVisible(section) {
  const rect = section.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

function handleCounters() {
  const section = document.querySelector(".container-estatisticas");

  if (isSectionVisible(section)) {
    startCounters();
    document.removeEventListener("scroll", handleCounters); 
  }
}

window.addEventListener("load", handleCounters);

document.addEventListener("scroll", handleCounters);
  

  /*===================================MENU HAMBURGUER=======================================*/
  function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
}
window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


  /*=====================================LOADING=============================================*/
const sections = document.querySelectorAll('.overlay');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    observer.observe(section);
});


   