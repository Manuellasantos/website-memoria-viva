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
   // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);

	
	/* Preloader 
	 * -------------------------------------------------- */
	var ssPreloader = function() {

		$WIN.on('load', function() {	

			// force page scroll position to top at page refresh
			$('html, body').animate({ scrollTop: 0 }, 'normal');

         // will fade out the whole preloader DIV that covers the website.
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
  			items: 3
		});

	};  	


  /* Highlight the current section in the navigation bar
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

		// Mailchimp translation
		//
		//  Defaults:
		//	 'submit': 'Submitting...',
		//  0: 'We have sent you a confirmation email',
		//  1: 'Please enter a value',
		//  2: 'An email address must contain a single @',
		//  3: 'The domain portion of the email address is invalid (the portion after the @: )',
		//  4: 'The username portion of the email address is invalid (the portion before the @: )',
		//  5: 'This email address looks fake or invalid. Please enter a real email address'

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

		var pxShow  = 500,         // height on which the button will show
		fadeInTime  = 400,         // how slow/fast you want the button to show
		fadeOutTime = 400,         // how slow/fast you want the button to hide
		scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		goTopButton = $("#go-top")

		// Show or hide the sticky footer button
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

	})();
 

})(jQuery);

      // Sistema de conteúdo features
        function showContent(feature) {
            // Remove a classe active de todos os boxes e content items
            document.querySelectorAll('.feature-box').forEach(box => {
                box.classList.remove('active');
            });
            
            document.querySelectorAll('.content-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Adiciona a classe active ao box clicado e ao content correspondente
            event.currentTarget.classList.add('active');
            document.getElementById(`content-${feature}`).classList.add('active');
        }

        // Sistema de áudio (simulação)
        function playAudio(feature) {
            const audioPlayers = {
                'flashcards': {
                    duration: '1:45',
                    text: 'Flashcards de Memória - Esta funcionalidade utiliza exercícios interativos baseados na técnica de repetição espaçada para fortalecer o reconhecimento de pessoas importantes...'
                },
                'galeria': {
                    duration: '2:15', 
                    text: 'Galeria Afetiva - Um espaço organizado e seguro para reviver momentos especiais através de fotos, vídeos e áudios que fortalecem as conexões emocionais...'
                },
                'linha-tempo': {
                    duration: '1:55',
                    text: 'Linha do Tempo - Reconstrua e preserve a história de vida através de uma linha do tempo interativa com eventos marcantes e narrativas pessoais...'
                },
                'lembretes': {
                    duration: '1:30',
                    text: 'Lembretes Diários - Sistema de alertas visuais e sonoros para ajudar na organização do dia a dia e promover autonomia com segurança...'
                }
            };

            const audioInfo = audioPlayers[feature];
            
            // Simular reprodução de áudio
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

            // Em uma implementação real, aqui você usaria a Web Audio API
            console.log(`Reproduzindo áudio: ${audioInfo.text}`);
        }

        // Adiciona interação aos botões de áudio
        document.querySelectorAll('.audio-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Impede que o clique no botão active o box
            });
        });

// Sistema de tabs
document.querySelectorAll('.feature-box').forEach(button => {
  button.addEventListener('click', function() {
    const target = this.getAttribute('data-target');
    const color = this.getAttribute('data-color');
    
    // Remove active de todos
    document.querySelectorAll('.feature-box').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    
    document.querySelectorAll('.content-item').forEach(content => {
      content.classList.remove('active');
      content.hidden = true;
    });
    
    // Adiciona active ao clicado
    this.classList.add('active');
    this.setAttribute('aria-selected', 'true');
    
    const targetContent = document.getElementById(`content-${target}`);
    if (targetContent) {
      targetContent.classList.add('active');
      targetContent.hidden = false;
      
      // Atualiza a cor do conteúdo principal
      document.querySelector('.features-content').setAttribute('data-active-color', color);
    }
  });
});

// Sistema de áudio
document.querySelectorAll('.play-btn').forEach(button => {
  button.addEventListener('click', function() {
    const audioType = this.getAttribute('data-audio');
    // Aqui você implementaria a reprodução real do áudio
    console.log('Reproduzindo áudio:', audioType);
  });
});