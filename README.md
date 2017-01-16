    需要 Greasemonkey 插件
    @name         One key delete weibo
    @namespace    http://weibo.com/quxm
    @version      0.1
    @description  Delete your weibo by one key
    @author       shell_ming
    @match        weibo.com/*
    @grant        none
    @require https://code.jquery.com/jquery-2.1.4.min.js


```javascript
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

(function() {
    var $weibo = [];
    function getWeibo() {
        if( $('[action-type="feed_list_item"]').length> 0){
            $weibo =  $('[action-type="feed_list_item"]');
            console.log( $weibo);
            $weibo.each(function(e){
                addDelBtn($(this));
            });
        }
    }
    function addDelBtn(dom) {
        console.log(dom.find('[data-del]').length);
        if(dom.find('[data-del]').length !== 0){
            return ;
        }
        var mid = dom.attr('mid');
        var $link = $('<span style="font-size:25px; color: red; cursor: pointer;" data-del='+mid+'>删除</span>');
        $link.click(function(){
            del(mid);
        });
        dom.find('.face').append($link);
    }
    function del(mid){
        var data = {mid:mid};
        $.post('http://weibo.com/aj/mblog/del?ajwvr=6',data,function(res){
            if(res.code=='100000'){
                $('[data-del='+mid+']').html('删除成功').off('click');
            }
        });
    }
    getWeibo();
    setInterval(getWeibo, 10000);
})();
```
