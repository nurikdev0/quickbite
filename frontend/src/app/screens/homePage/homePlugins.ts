// Home page jQuery plugins (from the HTML template's main.js).
// Lives in the bundle (content-hashed) instead of public/js so browsers can
// never run a stale cached copy. Slick/isotope move React-owned DOM nodes, so
// only call initHomePlugins AFTER the home data has rendered, and call
// destroyHomePlugins on unmount.

const arrows = {
  nextArrow: '<i class="far fa-long-arrow-right nextArrow"></i>',
  prevArrow: '<i class="far fa-long-arrow-left prevArrow"></i>',
};

// slidesToShow for breakpoints 1400, 1200, 992, 768, 576
const responsive = (counts: number[], hideArrowsOnMobile = true) =>
  [1400, 1200, 992, 768, 576].map((breakpoint, i) => ({
    breakpoint,
    settings: {
      slidesToShow: counts[i],
      ...(hideArrowsOnMobile && breakpoint === 576 ? { arrows: false } : {}),
    },
  }));

const getJQuery = (): any => {
  const $ = (window as any).jQuery;
  return $ && $.fn && $.fn.slick ? $ : null;
};

export function initHomePlugins(): boolean {
  const $ = getJQuery();
  if (!$) return false;

  //======menu fix js======
  const $menu = $(".main_menu");
  const navoff = $menu.length ? $menu.offset().top : 0;
  $(window)
    .off("scroll.homeMenu")
    .on("scroll.homeMenu", function (this: Window) {
      if ($(this).scrollTop() > navoff) $(".main_menu").addClass("menu_fix");
      else $(".main_menu").removeClass("menu_fix");
    });

  //=========NICE SELECT=========
  if ($.fn.niceSelect) $(".select_js").niceSelect();

  //=======OFFER ITEM SLIDER======
  $(".offer_item_slider:not(.slick-initialized)").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: false,
    arrows: true,
    ...arrows,
    responsive: responsive([2, 2, 2, 1, 1]),
  });

  //*==========ISOTOPE==============
  if ($.fn.isotope) $(".grid").isotope({});

  //=======TEAM SLIDER======
  $(".team_slider:not(.slick-initialized)").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: false,
    arrows: true,
    ...arrows,
    responsive: responsive([3, 3, 2, 2, 1]),
  });

  //=======DOWNLOAD SLIDER======
  $(".download_slider_item:not(.slick-initialized)").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    arrows: false,
    responsive: responsive([3, 2, 3, 2, 1], false),
  });

  //=======BLOG SLIDER======
  $(".blog_slider:not(.slick-initialized)").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: false,
    arrows: true,
    ...arrows,
    responsive: responsive([3, 2, 2, 1, 1]),
  });

  //*=======SCROLL BUTTON=======
  $(".scroll_btn")
    .off("click.home")
    .on("click.home", () => {
      $("html, body").animate({ scrollTop: 0 }, 300);
    });
  $(window)
    .off("scroll.homeBtn")
    .on("scroll.homeBtn", function (this: Window) {
      if ($(this).scrollTop() > 500) $(".scroll_btn").fadeIn();
      else $(".scroll_btn").fadeOut();
    });

  //======wow js=======
  const w = window as any;
  if (w.WOW && !w.__wowStarted) {
    new w.WOW().init();
    w.__wowStarted = true;
  }

  //=======SMALL DEVICE MENU ICON======
  $(".navbar-toggler")
    .off("click.home")
    .on("click.home", () => $(".navbar-toggler").toggleClass("show"));

  return true;
}

export function destroyHomePlugins(): void {
  const $ = getJQuery();
  if (!$) return;

  $(window).off("scroll.homeMenu scroll.homeBtn");
  $(".scroll_btn").off("click.home");
  $(".navbar-toggler").off("click.home");

  $(".slick-initialized").slick("unslick");

  const $grid = $(".grid");
  if ($grid.data("isotope")) $grid.isotope("destroy");

  $(".select_js").each(function (this: HTMLElement) {
    if ($(this).next(".nice-select").length) $(this).niceSelect("destroy");
  });
}
