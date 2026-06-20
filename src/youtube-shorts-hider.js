// ==UserScript==
// @name         Youtube Shorts 非表示スクリプト
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  YouTubeの画面からショート動画（Shorts）のセクションや動画を非表示にします。
// @author       Masato Uehara <masato.uehara.1975@gmail.com>
// @match        https://www.youtube.com/*
// @updateURL    https://raw.githubusercontent.com/boarnasia/tampermonkey-scripts/master/src/youtube-shorts-hider.js
// @downloadURL  https://raw.githubusercontent.com/boarnasia/tampermonkey-scripts/master/src/youtube-shorts-hider.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 非表示にする処理
    const hideShorts = () => {
        // 1. ホーム画面などの「ショート」セクション全体を非表示にする
        const shelves = document.querySelectorAll('ytd-rich-shelf-renderer, ytd-reel-shelf-renderer');
        shelves.forEach(shelf => {
            if (shelf.querySelector('[is-shorts]') || shelf.innerText.includes('ショート') || shelf.innerText.toLowerCase().includes('shorts')) {
                shelf.style.display = 'none';
            }
        });

        // 2. 検索結果や関連動画に紛れ込む個別のショート動画を非表示にする
        const videoRenderers = document.querySelectorAll('ytd-video-renderer, ytd-rich-item-renderer, ytd-compact-video-renderer');
        videoRenderers.forEach(item => {
            const link = item.querySelector('a[href*="/shorts/"]');
            if (link) {
                item.style.display = 'none';
            }
        });

        // 3. ナビゲーションメニュー（サイドバー）の「ショート」タブを非表示にする
        const sidebarItems = document.querySelectorAll('ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer');
        sidebarItems.forEach(item => {
            const link = item.querySelector('a[href*="/shorts"]');
            if (link) {
                item.style.display = 'none';
            }
        });
    };

    // YouTubeはSPA（画面遷移時に再読込しない）かつ動的読み込みのため、MutationObserverで監視
    const observer = new MutationObserver(() => {
        hideShorts();
    });

    // 監視の開始
    window.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        hideShorts();
    });
})();