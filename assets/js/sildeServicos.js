
  /*========================================SLIDE SERVIÇOS====================================================*/
  document.addEventListener("DOMContentLoaded", function () {
    const carrossel = document.getElementById("carrosselContainer");
    const slides = Array.from(carrossel.children);
    const totalSlides = slides.length;
    let index = 0;
    let isTransitioning = false;

    function obterQuantidadeVisivel() {
        return window.innerWidth > 768 ? 3 : 1; 
    }

    function ajustarLargura() {
        const qtdVisivel = obterQuantidadeVisivel();
        const larguraCartao = carrossel.offsetWidth / qtdVisivel;
        slides.forEach(slide => slide.style.flex = `0 0 ${100 / qtdVisivel}%`);
        return larguraCartao;
    }

    function mudarSlide(direcao) {
        if (isTransitioning) return;
        isTransitioning = true;

        const qtdVisivel = obterQuantidadeVisivel();
        const larguraCartao = ajustarLargura();
        index += direcao * qtdVisivel;


        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - qtdVisivel;

        carrossel.style.transition = "transform 0.8s ease-in-out";
        carrossel.style.transform = `translateX(-${index * larguraCartao}px)`;

        setTimeout(() => isTransitioning = false, 800);
    }

    document.querySelector(".anterior").addEventListener("click", () => mudarSlide(-1));
    document.querySelector(".proximo").addEventListener("click", () => mudarSlide(1));

    setInterval(() => mudarSlide(1), 6000);

    window.addEventListener("resize", ajustarLargura);
    ajustarLargura();
});
