/* ===================================================================
 * Dazzle - Main JS
 *
 * ------------------------------------------------------------------- */ 

(function($) {

    "use strict";

    var cfg = {     
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc' // mailchimp url
    },  

    $WIN = $(window);   

   // Add the User Agent to the <html>
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    
    /* Preloader 
     * -------------------------------------------------- */
    var ssPreloader = function() {
        $WIN.on('load', function() {    
            $('html, body').animate({ scrollTop: 0 }, 'normal');
            $("#preloader").delay(500).fadeOut('slow');
        });
    };


    /* Mobile Menu
     * ---------------------------------------------------- */ 
    var ssMobileMenu = function() {
        var toggleButton = $('.header-menu-toggle'),
          nav = $('#header-nav-wrap');

        toggleButton.on('click', function(event){
            event.preventDefault();
            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $(window).resize(function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        $('#header-nav-wrap').find('a').on("click", function() {  
            if (nav.hasClass('mobile')) {           
                toggleButton.toggleClass('is-clicked'); 
                nav.slideToggle();          
            }     
        });
    }; 


    /* FitVids
     * ---------------------------------------------------- */
    var ssFitVids = function() {
        $(".fluid-video-wrapper").fitVids();
    }; 


    /* Owl Carousel
     * ------------------------------------------------------ */
    var ssOwlCarousel = function() {
        $(".owl-carousel").owlCarousel({    
            loop: false,
            nav: false,
            autoHeight: true,
            items: 3,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                1024: { items: 3 }
            }
        });
    };

    /* Highlight current section
     * ------------------------------------------------------ */
    var ssWaypoints = function() {
        var sections = $("section"),
        navigation_links = $(".header-main-nav li a");  

        sections.waypoint( {
           handler: function(direction) {
               var active_section;
                active_section = $('section#' + this.element.id);
                if (direction === "up") active_section = active_section.prev();
                var active_link = $('.header-main-nav li a[href="#' + active_section.attr("id") + '"]');            
                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");
            }, 
            offset: '25%'
        });
    };


    /* Smooth Scrolling
     * ------------------------------------------------------ */
    var ssSmoothScroll = function() {
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            e.preventDefault();
            e.stopPropagation();      
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing', function () {
                window.location.hash = target;
            });
        });
    };


    /* Dark Mode Toggle (Novo)
     * ------------------------------------------------------ */
    var ssDarkMode = function() {
        var toggle = $('#dark-mode-toggle'),
            icon = toggle.find('i'),
            body = $('body'),
            currentTheme = localStorage.getItem('theme');

        // Inicialização: Verifica se já existe uma preferência salva
        if (currentTheme === 'dark') {
            body.addClass('dark-mode');
            icon.removeClass('fa-moon-o').addClass('fa-sun-o');
        }

        toggle.on('click', function(e) {
            e.preventDefault();
            
            if (body.hasClass('dark-mode')) {
                body.removeClass('dark-mode');
                icon.removeClass('fa-sun-o').addClass('fa-moon-o');
                localStorage.setItem('theme', 'light');
            } else {
                body.addClass('dark-mode');
                icon.removeClass('fa-moon-o').addClass('fa-sun-o');
                localStorage.setItem('theme', 'dark');
            }
        });
    };


    /* Placeholder Plugin Settings
     * ------------------------------------------------------ */
    var ssPlaceholder = function() {
        $('input, textarea, select').placeholder();  
    };


    /* Alert Boxes
     ------------------------------------------------------- */
    var ssAlertBoxes = function() {
        $('.alert-box').on('click', '.close', function() {
          $(this).parent().fadeOut(500);
        }); 
    };      
    

    /* Animate On Scroll
     * ------------------------------------------------------ */
    var ssAOS = function() {
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });
    };


    /* AjaxChimp
     * ------------------------------------------------------ */
    var ssAjaxChimp = function() {
        $('#mc-form').ajaxChimp({
            language: 'es',
            url: cfg.mailChimpURL
        });

        $.ajaxChimp.translations.es = {
          'submit': 'Submitting...',
          0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
          1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
          2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
          3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
          4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
          5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
        } 
    };


    /* Back to Top
     * ------------------------------------------------------ */
    var ssBackToTop = function() {
        var pxShow  = 500,
        fadeInTime  = 400,
        fadeOutTime = 400,
        goTopButton = $("#go-top");

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };  

  
    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {
        ssPreloader();
        ssMobileMenu();
        ssFitVids();
        ssOwlCarousel();
        ssWaypoints();
        ssSmoothScroll();
        ssPlaceholder();
        ssAlertBoxes();
        ssAOS();        
        ssAjaxChimp();
        ssBackToTop();
        ssDarkMode(); // Ativa o sistema de modo escuro
    })();

})(jQuery);


/* ===================================================================
 * SISTEMAS ADICIONAIS (FORA DA IIFE PARA ACESSO GLOBAL)
 * =================================================================== */

// Sistema de conteúdo features
function showContent(feature) {
    document.querySelectorAll('.feature-box').forEach(box => {
        box.classList.remove('active');
    });
    
    document.querySelectorAll('.content-item').forEach(item => {
        item.classList.remove('active');
    });
    
    event.currentTarget.classList.add('active');
    document.getElementById(`content-${feature}`).classList.add('active');
}

// Sistema de áudio (simulação)
function playAudio(feature) {
    const audioPlayers = {
        'flashcards': { duration: '1:45', text: 'Reproduzindo Flashcards...' },
        'galeria': { duration: '2:15', text: 'Reproduzindo Galeria...' },
        'linha-tempo': { duration: '1:55', text: 'Reproduzindo Linha do Tempo...' },
        'lembretes': { duration: '1:30', text: 'Reproduzindo Lembretes...' }
    };

    const audioInfo = audioPlayers[feature];
    const progressBar = document.getElementById(`progress-${feature}`);
    const timeDisplay = document.getElementById(`time-${feature}`);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;
        timeDisplay.textContent = `0:${progress < 10 ? '0' + progress : progress} / ${audioInfo.duration}`;
        
        if (progress >= 100) {
            clearInterval(interval);
            timeDisplay.textContent = `0:00 / ${audioInfo.duration}`;
            progressBar.style.width = '0%';
        }
    }, (parseInt(audioInfo.duration.split(':')[1]) * 1000) / 100);

    console.log(`Áudio: ${audioInfo.text}`);
}

// Sistema de daltonismo
function aplicarFiltroDaltonismo(tipo) {
    const body = document.body;
    body.classList.remove(
        'filtro-protanopia',
        'filtro-deuteranopia',
        'filtro-tritanopia',
        'filtro-acromatopsia'
    );

    if (tipo !== 'original') {
        body.classList.add('filtro-' + tipo);
    }
}

// Event Listeners para botões de áudio e tabs
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.audio-btn').forEach(button => {
        button.addEventListener('click', function(e) { e.stopPropagation(); });
    });

    document.querySelectorAll('.feature-box').forEach(button => {
      button.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        const color = this.getAttribute('data-color');
        
        document.querySelectorAll('.feature-box').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.content-item').forEach(content => content.classList.remove('active'));
        
        this.classList.add('active');
        const targetContent = document.getElementById(`content-${target}`);
        if (targetContent) {
            targetContent.classList.add('active');
            document.querySelector('.features-content').setAttribute('data-active-color', color);
        }
      });
    });
});