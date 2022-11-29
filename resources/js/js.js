(function ($) {

    function behaviors() {

        $('select')
            .once('select2')
            .select2({
                dropdownAutoWidth: true,
                width: 'auto'
            });


        $('.slider-block .owl-carousel')
            .once()
            .owlCarousel({
                items: 1,
                nav: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                loop: true
            });


        $('.doctors-grid.owl-carousel')
            .once(function () {
                let $this = $(this);
                let columns = $this.attr('data-columns') || 4;

                $this.owlCarousel({
                    responsive: {
                        0: {
                            items: 1,
                        },
                        770: {
                            items: parseInt(columns)
                        }
                    },
                    margin: 30,
                    nav: false,
                    dots: false,
                    loop: true
                });
            });


        $('.carousel-nav a')
            .once()
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);
                let block = $this.closest('[data-block]');
                let carousel = block.find('.owl-carousel');

                console.log(carousel);

                $this.hasClass('next') ? carousel.trigger('next.owl.carousel', [300]) : carousel.trigger('prev.owl.carousel', [300]);
            });


        $('.news-grid.owl-carousel')
            .once()
            .owlCarousel({
                responsive: {
                    0: {
                        items: 1,
                    },
                    770: {
                        items: 4
                    }
                },
                margin: 30,
                nav: false,
                dots: false,
                loop: true,
                stagePadding: 10
            });


        $('.reviews-block .owl-carousel')
            .once()
            .owlCarousel({
                nav: false,
                dots: false,
                loop: true,
                responsive: {
                    0: {
                        items: 1,
                        margin: 40,
                        stagePadding: 20
                    },
                    770: {
                        center: true,
                        autoWidth: true,
                    }
                },
            });


        $('.reviews-block-2 .owl-carousel')
            .once()
            .owlCarousel({
                items: 1,
                nav: false,
                dots: false,
                loop: true,
                stagePadding: 20,
                margin: 40
            });


        $('.contacts-block .how-reach-toggle')
            .once()
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('[data-block]')
                    .toggleClass('how-reach-visible');
            });


        $('.sidebar-menu-block .toggle')
            .once()
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('li')
                    .toggleClass('open')
                    .children('ul')
                    .slideToggle('fast');
            });


        $('[data-scroll-to]')
            .once('scroll-to')
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);
                let selector = $this.attr('data-scroll-to');
                let offsetTop = $(selector).offset().top;

                $('body, html').animate({
                    scrollTop: offsetTop + 'px'
                }, 400);
            });


        $('.prices-page .items .item .name')
            .once()
            .click(function () {
                let $this = $(this);
                let item = $this.closest('.item');
                let wrapper = item.closest('.items');
                let items = wrapper.find('.item');

                items
                    .not(item)
                    .find('.list')
                    .stop()
                    .slideUp('fast');

                item
                    .find('.list')
                    .stop()
                    .slideToggle('fast');
            });


        $('.doctor-filters-form')
            .once()
            .on('updateResults', function () {
                let $this = $(this);

                let work = $this.find('select[name="work"]').val() || '';
                let name = $this.find('input[name="name"]').val() || '';

                let doctors = $('[data-doctors] .doctors-grid-item');

                doctors.each(function () {
                    let item = $(this);
                    let properties = item.data('properties');

                    let visible = (
                        (!work || properties['work'].includes(work)) &&
                        (!name || properties['name'].toLowerCase().indexOf(name.toLowerCase()) >= 0)
                    );

                    visible ? item.removeClass('invisible') : item.addClass('invisible');
                });
            });


        $('.doctor-filters-form select[name="work"]')
            .once()
            .change(function () {
                $(this)
                    .closest('form')
                    .trigger('updateResults');
            });


        $('.doctor-filters-form input[name="name"]')
            .once()
            .keyup(function () {
                let $this = $(this);
                let timeout = $this.data('timeout');

                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(function () {
                    $this
                        .closest('form')
                        .trigger('updateResults');
                }, 300);
            });


        $('body.yandex-maps-ready .contacts-block .map')
            .once(function () {
                let $this = $(this);
                let coords = $this.data('coords');
                let id = 'contacts-block-map';

                $this.attr('id', id);

                let map = new ymaps.Map(id, {
                    center: coords,
                    zoom: 12,
                    controls: ['zoomControl']
                });

                map.behaviors.disable('scrollZoom');

                let placemark = new ymaps.Placemark(
                    coords,
                    {},
                    {
                        iconLayout: 'default#image',
                        iconImageHref: '/img/placemark.png?v2',
                        iconImageSize: [60, 60],
                        iconImageOffset: [-30, -60]
                    }
                );

                map
                    .geoObjects
                    .add(placemark);
            });


        $('.mobile-menu li.has-dropdown > a')
            .once()
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('li')
                    .toggleClass('open');
            });


        $('[data-mobile-menu-toggle]')
            .once()
            .click(function (e) {
                e.preventDefault();

                $('body').toggleClass('mobile-menu-visible');
            });


        $('.sidebar-sale-block .owl-carousel')
            .once()
            .owlCarousel({
                items: 1,
                margin: 20,
                nav: false,
                dots: false,
                loop: true
            });


        $('.sidebar-menu-block [data-toggle]')
            .once()
            .click(function () {
                $(this)
                    .closest('[data-block]')
                    .find('[data-inner]')
                    .stop()
                    .slideToggle('fast');
            });


        $('.reviews-grid-item .text [data-toggle]')
            .once()
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('.reviews-grid-item')
                    .toggleClass('open');
            });

    }


    ymaps.ready(function () {
        $('body').addClass('yandex-maps-ready');

        behaviors();
    });


    $(document).ready(function () {
        behaviors();
    });


    $(document).ajaxComplete(function () {
        behaviors();
    });

})(jQuery);