// ==UserScript==
// @name         One key delete weibo
// @namespace    http://weibo.com/quxm
// @version      0.1
// @description  Delete your weibo by one key
// @author       shell_ming
// @match        weibo.com/*
// @grant        none
// @require https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

(function () {
  var $weibo = $('[action-type="feed_list_item"]');

  function getWeibo () {
    // 更新
    $weibo = $('[action-type="feed_list_item"]')
    if ($weibo && $weibo.length) {
      $weibo.each(function (e) {
        addDelBtn($(this));
      });
    }
  }

  function addDelBtn (dom) {
    // 防止重复删除
    if (!dom.find('[data-del]').length) return
      var mid = dom.attr('mid');
    var $link = $('<span style="font-size:25px; color: red; cursor: pointer;" data-del=' + mid + '>删除</span>');
    $link.click(function () {
      // 删除删除请求
      del(mid);
    });
    dom.find('.face').append($link);
  }
  
  function del (mid) {
    var data = { mid: mid };
    // 发送删除请求
    $.post('http://weibo.com/aj/mblog/del?ajwvr=6', data, function (res) {
      if (res.code == '100000') {
        $('[data-del=' + mid + ']').html('删除成功').off('click');
      } else {
        $('[data-del=' + mid + ']').html('删除失败')
      }
    });
  }
  
  getWeibo();
  setInterval(getWeibo, 10000);
})();
