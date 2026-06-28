// ==UserScript==
// @name         YouTube Shorts 非表示スクリプト
// @namespace    http://yamashita109.com/
// @version      1.2
// @description  MutationObserverで動的に出現するショート動画を確実に検知。requestAnimationFrameで負荷を抑えつつ完全に非表示にします。
// @author       Masato Uehara
// @updateURL    https://raw.githubusercontent.com/boarnasia/tampermonkey-scripts/main/src/youtube-shorts-hider.js
// @downloadURL  https://raw.githubusercontent.com/boarnasia/tampermonkey-scripts/main/src/youtube-shorts-hider.js
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  // 1. 静的なCSS注入（あらかじめ分かっている専用要素を最速で非表示にしてちらつきを防ぐ）
  const injectCSS = () => {
    if (document.getElementById("hide-shorts-style")) return;
    const style = document.createElement("style");
    style.id = "hide-shorts-style";
    style.textContent = `
      /* 検索結果ページのショート専用棚 */
      ytd-reel-shelf-renderer,
      /* トップページのショート専用棚(属性指定) */
      ytd-rich-shelf-renderer[is-shorts],
      /* サイドバーのショートタブ等 */
      ytd-guide-entry-renderer:has(a[href*="/shorts"]),
      ytd-mini-guide-entry-renderer:has(a[href*="/shorts"]),
      yt-tab-shape[tab-title="Shorts"],
      yt-tab-shape[tab-title="ショート"] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  };

  let isThrottled = false;

  // 2. 動的・複合的な構造の非表示メイン処理
  const hideShorts = () => {

    // ----------------------------------------------------
    // 対応①：トップページ（ホーム画面などのグリッド構造）への対応
    // ----------------------------------------------------
    // ショートの棚を見つけたら、その親である「行（セクション全体）」ごと非表示にして空白を残さない
    const topPageShelves = document.querySelectorAll('ytd-rich-shelf-renderer');
    topPageShelves.forEach((shelf) => {
      const text = shelf.innerText || "";
      if (shelf.hasAttribute('is-shorts') || text.includes("ショート") || text.toLowerCase().includes("shorts")) {
        const parentSection = shelf.closest('ytd-rich-section-renderer');
        if (parentSection) {
          parentSection.style.setProperty("display", "none", "important");
        } else {
          shelf.style.setProperty("display", "none", "important");
        }
      }
    });

    // ----------------------------------------------------
    // 対応②：検索結果ページ（およびその他のリスト構造）への対応
    // ----------------------------------------------------
    // 検索結果に挿入される様々な形式の棚を、タグ名およびタイトルテキストで判定して丸ごと非表示にする
    const searchPageShelves = document.querySelectorAll('ytd-reel-shelf-renderer, grid-shelf-view-model, ytd-shelf-renderer');
    searchPageShelves.forEach((shelf) => {
      if (shelf.tagName.toLowerCase() === 'ytd-reel-shelf-renderer') {
        // ショート専用のタグは無条件で非表示
        shelf.style.setProperty("display", "none", "important");
      } else {
        // それ以外の汎用棚は「ショート/Shorts」の文字が含まれる場合のみ非表示
        const text = shelf.innerText || "";
        if (text.includes("ショート") || text.toLowerCase().includes("shorts")) {
          shelf.style.setProperty("display", "none", "important");
        }
      }
    });

    // ----------------------------------------------------
    // 対応③：個別動画（検索結果や関連動画、登録チャンネルに単体で混ざるもの）
    // ----------------------------------------------------
    // サムネイルにショートマークがある、またはURLに /shorts/ を含む単体動画のカードを非表示にする
    const individualShorts = document.querySelectorAll('[overlay-style="SHORTS"], a[href*="/shorts/"], a[href^="/shorts"]');
    individualShorts.forEach((target) => {
      const videoCard = target.closest(
        "ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer, ytd-grid-video-renderer, ytd-reel-item-renderer, ytm-shorts-lockup-view-model-v2"
      );
      if (videoCard) {
        videoCard.style.setProperty("display", "none", "important");
      }
    });
  };

  // 3. 監視メカニズム（MutationObserver + requestAnimationFrame）
  const observerCallback = () => {
    if (isThrottled) return;
    isThrottled = true;

    requestAnimationFrame(() => {
      hideShorts();
      isThrottled = false;
    });
  };

  const observer = new MutationObserver(observerCallback);

  const init = () => {
    injectCSS();  // CSSを先行注入
    hideShorts(); // 初回実行

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  if (document.body) {
    init();
  } else {
    window.addEventListener("DOMContentLoaded", init);
  }
})();