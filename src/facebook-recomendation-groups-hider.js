// ==UserScript==
// @name         Facebook おすすめのグループ非表示スクリプト
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Facebookのフィード上に表示される「おすすめのグループ」セクションを自動的に非表示にします。
// @author       Masato Uehara <masato.uehara.1975@gmail.com>
// @match        https://*.facebook.com/*
// @updateURL    https://raw.githubusercontent.com/boarnasia/tampermonkey-scripts/master/src/facebook-recomendation-groups-hider.js
// @downloadURL  https://raw.githubusercontent.com/boarnasia/tampermonkey-scripts/master/src/facebook-recomendation-groups-hider.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 「おすすめのグループ」を特定して非表示にする関数
    function hideSuggestedGroups() {
        // 画面内のすべての h3, span, div 要素からキーワードを探す
        const elements = document.querySelectorAll('h3, span, div');

        elements.forEach(el => {
            // テキストが「おすすめのグループ」に一致するかチェック
            if (el.textContent.trim() === 'おすすめのグループ') {
                // Facebookのフィードの各カード（単位）となる親要素まで遡る
                // ※HTML構造の変更に備え、一般的なフィードユニットやセクションの親を探します
                let container = el.closest('[role="feed"] > div, [data-pagelet^="FeedUnit"]');

                // 特定の属性で見つからない場合、安全策として7階層上の親要素をターゲットにする
                if (!container) {
                    let parent = el;
                    for (let i = 0; i < 7; i++) {
                        if (parent && parent.parentElement) {
                            parent = parent.parentElement;
                        }
                    }
                    container = parent;
                }

                // 対象の要素を非表示にする
                if (container && container.style.display !== 'none') {
                    container.style.display = 'none';
                    console.log('Facebook "Suggested Groups" section hidden successfully.');
                }
            }
        });
    }

    // ページ読み込み時に実行
    hideSuggestedGroups();

    // スクロール等によるコンテンツの追加（動的読み込み）を監視して実行
    const observer = new MutationObserver(() => {
        hideSuggestedGroups();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();