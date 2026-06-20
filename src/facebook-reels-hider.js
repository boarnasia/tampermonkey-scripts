// ==UserScript==
// @name         Facebook リール非表示スクリプト
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Facebookのフィード上に表示されるリールセクションを自動的に非表示にします。
// @author       Masato Uehara <masato.uehara.1975@gmail.com>
// @match        https://*.facebook.com/*
// @updateURL    https://raw.githubusercontent.com/boarnasia/tampermonkey-scripts/main/src/facebook-reels-hider.js
// @downloadURL  https://raw.githubusercontent.com/boarnasia/tampermonkey-scripts/main/src/facebook-reels-hider.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // リールセクションを特定して非表示にする関数
    function hideFacebookReels() {
        // 現在のFacebookの構造で「リール」のヘッダーやテキストが含まれる要素を探索
        const elements = document.querySelectorAll('h3, span, div');

        elements.forEach(el => {
            // テキストが「リール」または「Reels」に一致するかチェック
            if (el.textContent.trim() === 'リール' || el.textContent.trim() === 'Reels') {
                // 最も近いフィードのカード（セクション）の親要素を探す
                // ※FacebookのHTML構造は頻繁に変わるため、多め（8階層上まで）に遡れるようにしています
                let container = el.closest('[role="feed"] > div, [data-pagelet^="FeedUnit"]');

                // 特定の属性で見つからない場合、一般的なセクション要素まで遡る
                if (!container) {
                    let parent = el;
                    for (let i = 0; i < 7; i++) {
                        if (parent && parent.parentElement) {
                            parent = parent.parentElement;
                        }
                    }
                    container = parent;
                }

                // 対象のセクションを非表示にする
                if (container && container.style.display !== 'none') {
                    container.style.display = 'none';
                    console.log('Facebook Reels section hidden successfully.');
                }
            }
        });
    }

    // ページの読み込み時と、スクロールによる動的コンテンツ追加時に実行
    hideFacebookReels();

    const observer = new MutationObserver(() => {
        hideFacebookReels();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();