// ==UserScript==
// @name         YouTube Shorts 非表示スクリプト
// @namespace    http://yamashita109.com/
// @version      1.1
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

  let isThrottled = false;

  // 非表示にするメイン処理
  const hideShorts = () => {
    // 1. ショート動画へのリンク（/shorts/）を持つすべての要素を検索
    const shortsLinks = document.querySelectorAll(
      'a[href*="/shorts/"], a[href^="/shorts"]',
    );

    shortsLinks.forEach((link) => {
      // 【重要】ショート動画の「棚（セクション全体）」があれば、最優先で棚ごと非表示にする
      const shelfElement = link.closest(
        "ytd-reel-shelf-renderer, ytd-rich-shelf-renderer, ytd-rich-section-renderer",
      );
      if (shelfElement) {
        shelfElement.style.setProperty("display", "none", "important");
        return; // 棚ごと消した場合は、その中の個別動画の処理はスキップ
      }

      // 【個別】検索結果や関連動画に単体で紛れ込んだショート動画カードを非表示にする
      const videoElement = link.closest(
        "ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer, ytd-grid-video-renderer, ytd-reel-item-renderer",
      );
      if (videoElement) {
        videoElement.style.setProperty("display", "none", "important");
      }
    });

    // 2. 左ナビゲーションメニューなどの「ショート」タブを非表示にする
    const sidebarLinks = document.querySelectorAll(
      'ytd-guide-entry-renderer a[href*="/shorts"], ytd-mini-guide-entry-renderer a[href*="/shorts"]',
    );
    sidebarLinks.forEach((link) => {
      const sidebarItem = link.closest(
        "ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer",
      );
      if (sidebarItem) {
        sidebarItem.style.setProperty("display", "none", "important");
      }
    });

    // 3. テキストに「ショート」や「Shorts」が含まれる棚の最終チェック（文字判定による補網）
    const genericShelves = document.querySelectorAll(
      "ytd-reel-shelf-renderer, ytd-rich-shelf-renderer, ytd-rich-section-renderer",
    );
    genericShelves.forEach((shelf) => {
      const text = shelf.innerText || "";
      if (text.includes("ショート") || text.toLowerCase().includes("shorts")) {
        shelf.style.setProperty("display", "none", "important");
      }
    });
  };

  // DOM変化を検知した時のコールバック
  const observerCallback = () => {
    // すでに実行待ちのフレームがある場合はスキップ（ブラウザの負荷を激減させる）
    if (isThrottled) return;
    isThrottled = true;

    // 次の描画タイミング（1/60秒以内）でまとめて1回だけ実行
    requestAnimationFrame(() => {
      hideShorts();
      isThrottled = false;
    });
  };

  // 監視のセットアップ
  const observer = new MutationObserver(observerCallback);

  const init = () => {
    hideShorts(); // 初回実行

    // body要素全体を対象に、子要素や階層の変化を監視開始
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  // bodyが存在するか確認して実行
  if (document.body) {
    init();
  } else {
    window.addEventListener("DOMContentLoaded", init);
  }
})();
