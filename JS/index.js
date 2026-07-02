// スクロールトリガー読み込み
gsap.registerPlugin(ScrollTrigger);

// ヘッダーメニューの開閉
jQuery("#js-button-drawer").on("click", function () {
  jQuery(this).toggleClass("is-checked");
  jQuery("#js-drawer").toggleClass("is-open");
  jQuery("body").toggleClass("is-fixed");
});

// スムーススクロール
jQuery('a[href^="#"]')
  .not(".js-mail-link")
  .on("click", function (e) {
    e.preventDefault();
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

// ページ移行でヘッダー分の高さを加味し移動
jQuery(window).on("load", function () {
  const hash = window.location.hash;

  if (hash) {
    const target = jQuery(hash);

    if (target.length) {
      const headerHeight = jQuery(".header").outerHeight();
      const position = target.offset().top - headerHeight;

      jQuery("html, body").scrollTop(position);
    }
  }
});

jQuery('#js-drawer a[href^="#"]').on("click", function (e) {
  jQuery("#js-button-drawer").removeClass("is-checked");
  jQuery("#js-drawer").removeClass("is-open");
  jQuery("body").removeClass("is-fixed");
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

  $(".js-copy-mail").on("click", async function () {
    const $button = $(this);

    try {
      await navigator.clipboard.writeText(fullEmail);
      $button.text("コピー済み");
    } catch (error) {
      const tempInput = $("<input>").val(fullEmail).appendTo("body").select();
      document.execCommand("copy");
      tempInput.remove();
      $button.text("コピー済み");
    }

    setTimeout(() => {
      $button.text("コピー");
    }, 1500);
  });
});
