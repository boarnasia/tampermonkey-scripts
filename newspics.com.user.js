// ==UserScript==
// @name         NewsPics UI Enhancement
// @namespace    http://yamashita109.pw/
// @version      0.2
// @description  Make NewsPics better.
// @author       Boarnasia <masato.uehara.1975@gmail.com>
// @match        https://newspicks.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==



(function() {
    'use strict'

    if (window.location.pathname.match(/^\/news\//)) return

    // ヘッダの固定
    if ($('.page-title').length) {
        $('.page-title').addClass('breadcrumbs')
        $('.left-block').css({marginTop: 32})
    }

    // リンクの追加処理
    const get_links = () => {
        const links = $(`.menu .theme_menu a.menu-item`)
        const ret = []
        for(let i=0; i<links.length; i++) {
            ret.push(links[i])
        }
        return ret
    }
    const links = get_links()

    const elm_logo = $(`a.logo`)
    const c = $(`<div></div>`)
    c.attr({style: `display: flex;justify-content: center;align-items: center;height: 50px; width: 400px;`})
    c.addClass("logo clear-index-cache")
    elm_logo.before(c)
    elm_logo.remove()

    const a_style = `color: white;
        width: 40px;
        display: block;
        text-align: center;
        font-size: 200%;
    `

    const loc = window.location
    let prev, next
    prev = links[links.length - 1]
    next = links[0]

    const idx = links.findIndex(item => item.href === window.location.href)
    if (idx == 0) {
        next = links[idx + 1]
    } else if (idx > 0) {
        prev = links[idx - 1]
        if (idx < (links.length-1)) {
            next = links[idx + 1]
        }
    }

    c.append($(`<a href="${prev.href}" title="${prev.text}" style="${a_style}">&laquo;</a>`))
    c.append($(`<a href="/"><img style="margin-top: 0;" src="/images/logo_type.598a50a8.png"></a>`))
    c.append($(`<a href="${next.href}" title="${next.text}" style="${a_style}">&raquo;</a>`))
})();
