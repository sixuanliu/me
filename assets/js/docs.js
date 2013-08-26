// Modified from Bootstrap

// Documentation JavaScript

!function ($) {

  $(function(){

    var $bsDocsSidebar = $('.bs-docs-sidebar')

    // Disable certain links in docs
    $('body > .container [href="#"]').click(function (e) {
      e.preventDefault()
    })

    // Not to close mega menu when clicking inside
    $('.dropdown-menu[class*="span"]').click(function(event) {
      event.stopPropagation()
    })

    // side bar
    setTimeout(function () {
      $('.bs-docs-sidenav').affix({
        offset: {
          top: function () { return $bsDocsSidebar.offset().top }
        , bottom: 144
        }
      })
    }, 100)

    // make code pretty
    window.prettyPrint && prettyPrint()

    // add tipsies to grid for scaffolding
    if ($('#gridSystem').length) {
      $('#gridSystem').tooltip({
          selector: '.show-grid > [class*="span"]'
        , title: function () { return $(this).width() + 'px' }
      })
    }

    // tooltip demo
    $('.tooltip-demo').tooltip({
      selector: "a[data-toggle=tooltip]"
    })

    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    // popover demo
    $("a[data-toggle=popover]")
      .popover()
      .click(function(e) {
        e.preventDefault()
      })

    // button state demo
    $('#fat-btn')
      .click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000)
      })

    // carousel demo
    $('#myCarousel').carousel()
  })
}(window.jQuery)
