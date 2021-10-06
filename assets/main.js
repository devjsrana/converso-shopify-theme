// Put your application javascript here


$(function () {


    // console.log("Javascript loaded");

    var topNav = $('#topNav');
    var mainNav = $('#mainNav');

    var sidebar = $('#sidebar');
    var search = $('#search');
    var cart = $('#cart');
    var inquire = $('#inquire');
    var mainView = $('main');

    $('#navTogglerBtnOpen').click(() => {
        topNav.addClass('nav-open');
        openMainnav();
        noScrollActive();
    })

    $('#navTogglerBtnClose').click(() => {
        topNav.removeClass('nav-open');
        closeMainnav();
        closeSidebar();
        noScrollInactive();
    })


    function openMainnav() {
        mainNav.addClass('show');

    }
    function closeMainnav() {
        mainNav.removeClass('show');

    }


    function noScrollActive() {
        $('body').addClass('noscroll');
    }
    function noScrollInactive() {
        $('body').removeClass('noscroll');
    }




    search.click(() => {
        sidebar.removeClass('query-cart');
        sidebar.removeClass('query-inquire');
        if (sidebar.hasClass("open")) {
            if (sidebar.hasClass('query-search')) {
                closeSidebar();
            }
            else {
                sidebar.addClass('query-search');
                openSidebar();
            }
        } else {
            sidebar.addClass('query-search');
            openSidebar();
        }

    })

    cart.click(() => {
        sidebar.removeClass('query-search');
        sidebar.removeClass('query-inquire');
        if (sidebar.hasClass("open")) {
            if (sidebar.hasClass('query-cart')) {
                closeSidebar();
            }
            else {
                sidebar.addClass('query-cart');
                getCartList();//this function define in cart_management.js file
                openCartBar();
            }
        } else {
            sidebar.addClass('query-cart');
            getCartList();//this function define in cart_management.js file
            openCartBar();
        }

    })

    inquire.click(() => {
        sidebar.removeClass('query-search');
        sidebar.removeClass('query-cart');
        if (sidebar.hasClass("open") && sidebar.hasClass("query-inquire")) {
            closeSidebar();
        }
        else if (sidebar.hasClass("open")) {
            sidebar.addClass('query-inquire');
        }
        else {
            sidebar.addClass('query-inquire');
            openSidebar();
        }
    })

    openCartBar = () => {
        sidebar.removeClass('query-search');
        sidebar.removeClass('query-inquire');
        sidebar.addClass('query-cart');
        openSidebar();
    }

    function openSidebar() {
        sidebar.addClass('open');
        mainView.addClass('moveleft');
        topNav.addClass('open-sidebar');
    }
    function closeSidebar() {
        sidebar.removeClass('open');
        mainView.removeClass('moveleft');
        topNav.removeClass('open-sidebar');

        sidebar.removeClass('query-search');
        sidebar.removeClass('query-cart');
        sidebar.removeClass('query-inquire');
    }











    $('.hero-slider').owlCarousel({
        loop: true,
        items: 1,
        autoplay: true
    })
    $('.product-slider__slider').owlCarousel({
        loop: true,
        items: 1,
        center: true,
        dots: false,
        // autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            }
        }
    })

    var owl = $('.product-slider__slider');
    $('#product-slider__prevArrow').click(function () {
        owl.trigger('prev.owl.carousel');
    })
    $('#product-slider__nextArrow').click(function () {
        owl.trigger('next.owl.carousel');
    })

    $('.product-slider__slider .item').click((e) => {
        var getValue = e.target.attributes[2].value;
        // console.log(getValue);

        $('.product-gallery-fullscreen').addClass('open');
        $('.product-fullscreen-slider__slider').trigger("to.owl.carousel", [getValue, 100, true]);

        $('body').addClass('noscroll');
    })




    $('.product-fullscreen-slider__slider').owlCarousel({
        loop: false,
        items: 1,
        dots: false
    })
    var fowl = $('.product-fullscreen-slider__slider');
    $('#product-fullscreen-slider__prevArrow').click(function () {
        fowl.trigger('prev.owl.carousel');
    })
    $('#product-fullscreen-slider__nextArrow').click(function () {
        fowl.trigger('next.owl.carousel');
    })





    $('.product-fullscreen-close-button').click(() => {
        $('.product-gallery-fullscreen').removeClass('open');
        $('body').removeClass('noscroll');
    })











    // SET YEAR IN FOOTER SECTION
    var fYear = $('.footer__year');
    var d = new Date();
    var n = d.getFullYear();

    fYear.html(n);




    //get instagram feeds
    getInsta = (url) => {
        $.ajax({
            url: url+"?__a=1",
            type: 'get',
            success: function (response) {
     
                posts = response.graphql.user.edge_owner_to_timeline_media.edges;
                posts_html = '';
                for (var i = 0; i < 12; i++) {
                    url = posts[i].node.display_url;
                    likes = posts[i].node.edge_liked_by.count;
                    comments = posts[i].node.edge_media_to_comment.count;
                    post_url = 'https://www.instagram.com/p/' + posts[i].node.shortcode;
    
                    posts_html += '<div class="col-md-4">' + '<a target="_blank" href="' + post_url + '"><div class="post">' +
                        '<div class="image" style="background-image:url(' + url + ');"></div>' +
                        '<ul>' +
                        '<li><i class="fa fa-heart"></i> ' + likes + '</li>' +
                        '<li><i class="fa fa-comment"></i> ' + comments + '</li>' +
                        '</ul></div></a></div>';
                    ;
    
                }
                $("#instafeed").html(posts_html);
            }
        });
    }


});