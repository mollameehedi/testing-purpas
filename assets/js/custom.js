'use strict';
$(document).ready(function () {
    // top menu scroll handler
    function top_menu_handler() {
        var scrolltotop = $(window).scrollTop();
        // making fixed top navbar
        if (scrolltotop > 100) {
            $('.main-navbar').addClass('header-scrolled');
        } else {
            $('.main-navbar').removeClass('header-scrolled');
        }
    }

    //add background color on navbar collapse on responsive size function
    function top_menu_event_handler() {
        var innerwidth = $(window).outerWidth();
        if (innerwidth < 992) {
            $(".navbar-collapse").addClass("collapse-nav");
        } else {
            $(".navbar-collapse").removeClass("collapse-nav");
        }
    }

    // full vertical slider mouse and keyboard controller function
    function slider_handler(state) {
        slider_controller = state;
        if (state) {
            // change slider on mousewheel for chrome and IE
            $(document).on('mousewheel onmousewheel', function (e) {
                if (e.originalEvent.wheelDelta / 120 > 0) {
                    $('.vertical-slider').slick('slickPrev');
                } else {
                    $('.vertical-slider').slick('slickNext');
                }
            });
            // change slider on mousewheel for Firefox
            $(document).on('wheel', function (e) {
                if (e.originalEvent.deltaY < 0) {
                    $('.vertical-slider').slick('slickPrev');
                } else {
                    $('.vertical-slider').slick('slickNext');
                }
            });
            // change slider on keyboard(up and down)
            $(document).on('keydown', function (e) {
                if (e.keyCode === 40 || e.keyCode === 38 || e.which === 40 || e.which === 38) {
                    e.preventDefault();
                    (e.keyCode === 38 || e.which === 38) ? $('.vertical-slider').slick('slickNext') :
                        $('.vertical-slider').slick('slickPrev');
                }
            });
            // make it off on responsive sizes
        } else {
            $(document).off('mousewheel onmousewheel wheel keydown');
        }
    };

    // calling top menu scroll handler function
    top_menu_handler();
    $(window).on("load resize scroll", function (e) {
        top_menu_handler();
    });

    //add background color on navbar collapse on responsive size calling function
    top_menu_event_handler();
    $(window).on("resize", function () {
        top_menu_event_handler();
    });

    // navbar dropdown shows on click on mobiles and tablets
    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');
        return false;
    });

    // navbar actions (login , cart) dropdown
    $(document).on("click", '.header__btn-dropdown', function (e) {
        e.preventDefault();
        // fetch the target - trigger
        var target = $(this).attr('data-target');
        // state of the target (false: hide)
        var state = $('#' + target).attr('data-collapse');
        // hide all targets
        $('.dropdown-wrapper').attr('data-collapse', 'false').hide();
        if (state == 'false') { // trigger target is not shown - normal
            // show target menu
            $('#actionsDropdown #' + target).attr('data-collapse', 'true').slideDown(120);
        }
    });

    // navbar actions on click
    $('body').click(function (evt) {
        var target = $(evt.target);
        if (!target.parents('.dropdown-wrapper').length && !target.parents('.header__btn').length) {
            $('.dropdown-wrapper').attr('data-collapse', 'false').hide();
        }
    });

    // navbar search box
    $(document).on("click", ".header-search__btn", function () {
        $('.header-search__box').fadeToggle();
    });

    //range slider default setting
    var rangeSliderSetting = {
        type: "double",
        force_edges: true,
        prettify_enabled: false,
        skin: "dark",
    };
    $('#standard-price').ionRangeSlider(jQuery.extend({}, rangeSliderSetting, {
        min: 0,
        max: 1000,
        from: 200,
        to: 700,
        postfix: ' $ ',
    }));

    // collapsed nav filter options
    $(document).on("click", ".bs-canvas-close, .bs-canvas-overlay", function () {
        var elm = $(this).hasClass('bs-canvas-close') ? $(this).closest('.bs-canvas') : $('.bs-canvas');
        elm.removeClass('mr-0 ml-0');
        $('.bs-canvas-overlay').remove();
        $('body').css('overflow', '');
        return false;
    });
    $(document).on("click", ".pull-bs-canvas-left", function () {
        $('body').prepend('<div class="bs-canvas-overlay bg-dark position-fixed w-100 h-100"></div>');
        $('body').css('overflow', 'hidden');
        $('.bs-canvas-left').addClass('ml-0');
        return false;
    });

    // initializing the nice select plugin
    $('select').niceSelect();

    // back to top button
    var btn = $('#backToTop');
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, '500');
    });
    // end back to top button

    // item shop quantity select box
    $(document).on("click", ".quantity__minus", function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $(document).on("click", ".quantity__plus", function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    // product color select
    $(document).on("click", ".color-list .color_item", function () {
        var value = $(this).attr("data-value");
        $('#colorInput').val(value);
        $(".color-list .color_item").removeClass("selected");
        $(this).addClass("selected");
    })

    // product size select
    $(document).on("click", ".size-list .size_item", function () {
        var value = $(this).attr("data-value");
        $('#sizeInput').val(value);
        $(".size-list .size_item").removeClass("selected");
        $(this).addClass("selected");
    })

    // product lightbox gallery
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

    // product main gallery with thumbnails
    $('.gallery-main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: true,
        asNavFor: '.gallery-nav'
    });


    // product vertical thumbnails gallery
    $('.gallery-nav--vr').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.gallery-main',
        vertical: true,
        infinite: true,
        arrows: false,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                vertical: false,
                arrows: true,
            }
        }]
    });


    // product horizontal thumbnails gallery
    $('.gallery-nav--hr').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.gallery-main',
        focusOnSelect: true,
        infinite: true,
        arrows: true,
    });

    // hero header slider
    $('#heroHeaderCarousel').slick({
        dots: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
    });

    // social media slider
    $('.social-media-slider').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });

    // testimonials slider
    $('.testimonial-slider').slick({
        slidesToShow: 1,
        arrows: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false,
                dots: true,
            }
        }]
    });

    // banner with slider
    $('.banner-slider').slick({
        slidesToShow: 1,
        arrows: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    // single post with slider
    $('.single-post-slider').slick({
        slidesToShow: 1,
        arrows: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    // sidebar banner slider
    $('.sidebar-banner-slider').slick({
        slidesToShow: 1,
        arrows: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 2000,
    });

    // full vertical slider
    $('.vertical-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        draggable: true,
        arrows: false,
        dots: true,
        infinite: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                vertical: false,
                verticalSwiping: false,
                arrows: true,
                dots: false,
            }
        }]
    });

    // team slider
    $('.team-slider').slick({
        slidesToShow: 4,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // full vertical slider mouse and keyboard controller calling function
    if ($('.vertical-slider').length) {
        var slider_controller = false;
        $(window).on('load resize', function () {
            if ($(window).innerWidth() > 991) {
                if (!slider_controller) slider_handler(true);
            } else {
                if (slider_controller) slider_handler(false);
            }
        });

    }

    // size guid table dynamically change on CM and INCH metrics
    $('.dynamic-size-table .table-metrics input').on('change', function () {
        var componenet_el = $(this).closest('.dynamic-size-table');
        var target_unit = componenet_el.find('input.unit_change_handler:checked').val();

        // fetch all cell value
        componenet_el.find('table td.value').each(function (index) {
            var output_arr = [];

            // split mixed cell values
            $.each($(this).text().split('-'), function (key, value) {
                var new_value = 0;
                if (target_unit == 'CM') {
                    new_value = Math.round(value * 2.54);
                } else {
                    new_value = Math.round(value / 2.54);
                }
                output_arr.push(new_value);
            });

            // merge output cell value
            $(this).text(output_arr.join('-'));

        });
    });

    // video player____play/pause on click
    var mainvideoplaylist = [];
    $('.blog-post-video video, .blog-post-video button').on("click", function () {
        var vidid = $(this).attr('data-vid');

        if ($(this).is("button")) {
            var btn_el = $(this);
            var video_el = $(this).closest(".blog-post-video").find('video');
        } else {
            var btn_el = $(this).closest(".blog-post-video").find('button');
            var video_el = $(this);
        }

        if ($.inArray(vidid, mainvideoplaylist) < 0) {
            mainvideoplaylist.push(vidid);
            document.getElementById(vidid).play();
            video_el.prop("controls", true);
            btn_el.fadeOut();

        } else {
            mainvideoplaylist.splice($.inArray(vidid, mainvideoplaylist), 1);
            document.getElementById(vidid).pause();
            video_el.prop("controls", false);
            btn_el.fadeIn();
        }
    });

    // show and hide password form input
    $(document).on('click', '.showhidepassword', function () {
        var el = $(this).closest(".password-box").find('input');
        if (el.attr('type') == 'password') {
            el.attr('type', 'text');
            $('i', this).removeClass('fa-eye-slash').addClass('fa-eye');
        } else {
            el.attr('type', 'password');
            $('i', this).removeClass('fa-eye').addClass('fa-eye-slash');
        }
    });

    // coming soon page countdown plugin
    $(function () {
        $('#countdown').countdown({
            year: 2021, // YYYY Format
            month: 10, // 1-12
            day: 5, // 1-31
            hour: 0, // 24 hour format 0-23
            minute: 0, // 0-59
            second: 0, // 0-59
            digitWidth: 30,
            digitHeight: 40.15
        });
    });

    // price table switch monthly/annually
    $(document).on('change', '#customSwitch', function () {
        var ptprefix = (this.checked) ? 'y' : 'm';
        var ptperiodlabel = (this.checked) ? '/annually' : '/monthly';

        $('.price-table .period').text(ptperiodlabel);


        for (var i = 1; i <= 3; i++) {
            $('.price-table__row > div:nth-child(' + i + ') .amount').text(pricetable[ptprefix]['p' + i].price);
            $('.price-table__row > div:nth-child(' + i + ') .plan-btn').attr("href", pricetable[ptprefix]['p' + i].link);
        }

    });

    //modal pop up show on load
    setTimeout(function () {
        $('#myModalSubscribe').modal('show');
    }, 2000);

    //loader
    $('.loader-wrapper').delay(500).queue(function () {
        $(this).remove();
    });
});