// スクロールトリガー読み込み
gsap.registerPlugin(ScrollTrigger);

// ヘッダーメニューの開閉
jQuery("#js-button-drawer").on("click", function () {
  jQuery(this).toggleClass("is-checked");
  jQuery("#js-drawer").toggleClass("is-open");
  jQuery("body").toggleClass("is-fixed");
});

jQuery('a[href^="#"]').on("click", function (e) {
  const speed = 600;
  const id = jQuery(this).attr("href");
  const target = jQuery(id === "#" ? "html" : id);
  const headerHeight = jQuery(".header").outerHeight();
  const position = jQuery(target).offset().top - headerHeight;
  jQuery("html,body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing",
  );
});

jQuery('#js-drawer a[href^="#"]').on("click", function (e) {
  jQuery("#js-button-drawer").removeClass("is-checked");
  jQuery("#js-drawer").removeClass("is-open");
});

// FV アニメーション
for (let i = 0; i < 200; i++) {
  const dot = document.createElement("div");
  dot.classList.add("fv__particle");
  document.querySelector(".fv").appendChild(dot);

  gsap.fromTo(
    dot,
    { x: 0, y: 0, z: 0, opacity: 1 },
    {
      x: gsap.utils.random(-window.innerWidth, window.innerWidth),
      y: gsap.utils.random(-window.innerHeight, window.innerHeight),
      opacity: 0,
      duration: 15,
      ease: "power3.out",
    },
  );
}
$(".fv__heading").delay(2000).fadeIn(1500);

// スクロールトリガーを使ったタイトルのアニメーション
gsap.utils.toArray(".section__head").forEach((head) => {
  gsap.from(head, {
    y: 50,
    opacity: 0,
    duration: 3,
    scrollTrigger: {
      trigger: head,
      start: "top 80%",
    },
  });
});

// スクロールするとヘッダーに背景がつく
ScrollTrigger.create({
  start: 300,
  onEnter: () => $(".header").addClass("is-show"),
  onLeaveBack: () => $(".header").removeClass("is-show"),
});

// メールアドレスの漏洩対策
$(function () {
  const user = "yousui1105";
  const domain = "gmail.com";
  const fullEmail = user + "@" + domain;

  $(".js-mail-link").attr("href", "mailto:" + fullEmail);

  $(".js-mail-text").text(fullEmail);
});