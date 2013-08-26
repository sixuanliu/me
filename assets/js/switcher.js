// Style Switcher http://sam.zoy.org/wtfpl/
/*global Cookies:false */

(function($) {
  'use strict';

  // If IE7, return
  if (document.all && !document.querySelector) {
    return;
  }
  // Not works under file://
  if (location.protocol === 'file:') {
    return;
  }

  var $colors, $navbarFixed, $noNavbarInverse;
  var $body = $('body');
  var $navbar = $body.find('> .navbar').eq(0);
  var $CSSLinks = $('link[href*="assets/css/bootstrap"]')
                    .add('link[href$="assets/css/flexslider.css"]');
  var rootPath = $CSSLinks[0].href
                   .replace(location.protocol + '//' + location.host, '')
                   .replace(/assets\/css.*/, '');
  var cookieOptions = {path: rootPath, expires: 2592000 /* 30 days*/};
  var navbarFixedTooltipA = 'Switch to .navbar-fixed-top';
  var navbarFixedTooltipB = 'Switch to .navbar-static-top';
  var noNavbarInverseTooltipA = 'Add .navbar-inverse';
  var noNavbarInverseTooltipB = 'Remove .navbar-inverse';

  $.get(rootPath + 'assets/js/switcher.html', init);

  function init(html) {
    var $switcher = $('#switcher');

    if ($switcher.length === 1) {
      $('#switcher').html(html);

      $colors = $('#switcher-colors');
      $navbarFixed = $('#switcher-navbar-fixed');
      $noNavbarInverse = $('#switcher-no-navbar-inverse');

      addTooltip($navbarFixed, navbarFixedTooltipA);
      addTooltip($noNavbarInverse, noNavbarInverseTooltipA);

      setupEvents();
    }
    restoreSettings();
  }

  function addTooltip($el, title) {
    $el.tooltip({title: title, placement: 'bottom', delay: 200});
  }

  function setupEvents() {

    $('#switcher-settings').on('click', '> a', function() {
      $(this).toggleClass('active');
    });

    $('#switcher-switcher').click(function() {
      $('#switcher').toggleClass('active');
    });

    $colors.on('click', '> li', function() {
      var $this = $(this);
      var newColor = $this.data('color');

      if ($this.hasClass('active')) {
        return;
      } else {
        $this.addClass('active').siblings('.active').removeClass('active');
      }

      changeCSSFiles(newColor);
      changeActiveColorIcon(newColor);

      Cookies.set('color', newColor, cookieOptions);
    });

    $navbarFixed.click(function(_, fakeClick) {
      var tooltipTitle, navbarFixed;

      $body.toggleClass('has-navbar-fixed-top');
      $navbar.toggleClass('navbar-static-top').toggleClass('navbar-fixed-top');
      if ($navbar.hasClass('navbar-static-top')) {
        tooltipTitle = navbarFixedTooltipA;
        navbarFixed = 'n';
      } else {
        tooltipTitle = navbarFixedTooltipB;
        navbarFixed = 'y';
      }
      if (!fakeClick) {
        $body.scrollspy('refresh');
      }
      $(this).attr('data-original-title', tooltipTitle);
      Cookies.set('navbarFixed', navbarFixed, cookieOptions);
    });

    $noNavbarInverse.click(function() {
      var tooltipTitle, navbarInverse;

      $navbar.toggleClass('navbar-inverse');
      if (!$navbar.hasClass('navbar-inverse')) {
        tooltipTitle = noNavbarInverseTooltipA;
        navbarInverse = 'n';
      } else {
        tooltipTitle = noNavbarInverseTooltipB;
        navbarInverse = 'y';
      }
      $(this).attr('data-original-title', tooltipTitle);
      Cookies.set('navbarInverse', navbarInverse, cookieOptions);
    });
  }

  function changeCSSFiles(newColor) {
    var cssDir;

    if (newColor === 'default') {
      cssDir = 'css';
    } else {
      cssDir = 'css-' + newColor;
    }

    $CSSLinks.each(function() {
      var $this = $(this);
      var fileName = $this.attr('href').match(/[\-a-z]*.css$/)[0];
      $this.attr('href', rootPath + 'assets/' + cssDir + '/' + fileName);
    });
  }

  function changeActiveColorIcon(newColor) {
    $colors.find('i.icon-ok-sign').attr('class', 'icon-sign-blank');
    $('#switcher-colors-' + newColor).addClass('active')
      .find('i').attr('class', 'icon-ok-sign');
  }

  function restoreSettings() {
    var defaults = {
      navbarFixed: 'n',
      navbarInverse: 'n',
      color: 'default'
    };
    var navbarFixed = Cookies.get('navbarFixed') || defaults.navbarFixed;
    var navbarInverse = Cookies.get('navbarInverse') || defaults.navbarInverse;
    var color = Cookies.get('color') || defaults.color;

    if ($navbarFixed && navbarFixed !== defaults.navbarFixed) {
      $navbarFixed.trigger('click', true);
    }
    if ($noNavbarInverse && navbarInverse !== defaults.navbarInverse) {
      $noNavbarInverse.click();
    }
    if (color !== defaults.color) {
      changeCSSFiles(color);
      if ($colors) {
        changeActiveColorIcon(color);
      }
    }
  }
})(jQuery);
