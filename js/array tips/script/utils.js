/**
 * Created by hantiantian on 2017/6/16 0016.
 */

/**
 * 事件选择弹框
 */
var $$ = Dom7, T7 = Template7;

var utils = {
    /**
     * 弹框
     * @param option
     * option={
     *      name:弹框的name决定了出现哪一种弹框
     *      title:弹框名称;
     *      data:传入的数据;
     *      callback:回调函数，视具体用途命名,xzsdCallback,xzxxCallback
     * }
     */
    showDialog: function (option) {
        var $body = $$('body');

        var dialogStr = '';
        //选择时间段,8:00~18:00,半小时间隔
        if (option.name == 'xzsd') {
            dialogStr = '<div class="dialog-wrap" id="dialogWrapBox">'
                + '<div class="dialog-ljyy-xzsd-box" id="dialogLjyyXzsdBox">'
                + '<div class="dialog-xzsd-title">'
                + '<span>' + option.title + '</span>'
                + '<a href="javascript:;" class="dialog-xzsd-close js-close"><i class="mlr5-rem"></i></a>'
                + '</div>'
                + '<div class="xzsd-box row no-gutter">';
            dialogStr = dialogStr + '<div id="1" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="1">'
                + '<span class="xzsd-label  black-58">' + "8:00-8:30" + '</span>'
                + '</div>'
                + '<div id="2" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="2">'
                + '<span class="xzsd-label  black-58">' + "8:30-9:00" + '</span>'
                + '</div>'
                + '<div id="3" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="3">'
                + '<span class="xzsd-label  black-58">' + "9:00-9:30" + '</span>'
                + '</div>'
                + '<div id="4" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="4">'
                + '<span class="xzsd-label  black-58">' + "9:30-10:00" + '</span>'
                + '</div>'
                + '<div id="5" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="5">'
                + '<span class="xzsd-label black-58">' + "10:00-10:30" + '</span>'
                + '</div>'
                + '<div id="6" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="6">'
                + '<span class="xzsd-label black-58">' + "10:30-11:00" + '</span>'
                + '</div>'
                + '<div id="7" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="7">'
                + '<span class="xzsd-label black-58">' + "11:00-11:30" + '</span>'
                + '</div>'
                + '<div id="8" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="8">'
                + '<span class="xzsd-label black-58">' + "11:30-12:00" + '</span>'
                + '</div>'
                + '<div id="9" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="9">'
                + '<span class="xzsd-label black-58">' + "12:00-12:30" + '</span>'
                + '</div>'
                + '<div id="10" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="10">'
                + '<span class="xzsd-label  black-58">' + "12:30-13:00" + '</span>'
                + '</div>'
                + '<div id="11" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="11">'
                + '<span class="xzsd-label black-58">' + "13:00-13:30" + '</span>'
                + '</div>'
                + '<div id="12" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="12">'
                + '<span class="xzsd-label black-58">' + "13:30-14:00" + '</span>'
                + '</div>'
                + '<div id="13" class="xzsd-item col-50 no-border  js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="13">'
                + '<span class="xzsd-label  black-58">' + "14:00-14:30" + '</span>'
                + '</div>'
                + '<div id="14" class="xzsd-item col-50 no-border  js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="14">'
                + '<span class="xzsd-label  black-58">' + "14:30-15:00" + '</span>'
                + '</div>'
                + '<div id="15" class="xzsd-item col-50 no-border  js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="15">'
                + '<span class="xzsd-label  black-58">' + "15:00-15:30" + '</span>'
                + '</div>'
                + '<div id="16" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="16">'
                + '<span class="xzsd-label  black-58">' + "15:30-16:00" + '</span>'
                + '</div>'
                + '<div id="17" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="17">'
                + '<span class="xzsd-label  black-58">' + "16:00-16:30" + '</span>'
                + '</div>'
                + '<div id="18" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="18">'
                + '<span class="xzsd-label  black-58">' + "16:30-17:00" + '</span>'
                + '</div>'
                + '<div id="19" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="19">'
                + '<span class="xzsd-label  black-58">' + "17:00-17:30" + '</span>'
                + '</div>'
                + '<div id="20" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="20">'
                + '<span class="xzsd-label  black-58">' + "17:30-18:00" + '</span>'
                + '</div>'
                + '<div id="21" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="21">'
                + '<span class="xzsd-label  black-58">' + "18:00-18:30" + '</span>'
                + '</div>'
                + '<div id="22" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="22">'
                + '<span class="xzsd-label  black-58">' + "18:30-19:00" + '</span>'
                + '</div>'
                + '<div id="23" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="23">'
                + '<span class="xzsd-label  black-58">' + "19:00-19:30" + '</span>'
                + '</div>'
                + '<div id="24" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="24">'
                + '<span class="xzsd-label  black-58">' + "19:30-20:00" + '</span>'
                + '</div>'
                + '<div id="25" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="25">'
                + '<span class="xzsd-label  black-58">' + "20:00-20:30" + '</span>'
                + '</div>'
                + '<div id="26" class="xzsd-item col-50 no-border js-xzsd">'
                + '<input class="hide" name="xzsd" type="checkbox" value="26">'
                + '<span class="xzsd-label  black-58">' + "20:30-21:00" + '</span>'
                + '</div>'
                + '</div>'
                + '<div class="dialog-ljyy-btn-box">'
                + '<a href="javascript:;" class="orange-btn js-xzsd-confirm">' + "确定" + '</a>'
                + '</div></div></div></div>';

            $body.append(dialogStr);

            /**
             * 选择时间段，可多选,但必须连续。
             * 如果灰显，点击不响应
             * 点击 复选框转改为checked，背景色变为蓝色。
             */
            var $el = $$('#dialogWrapBox');
            $el.on('click', '.js-xzsd', function () {
                var $checkedObjs = $$('input[type="checkbox"][name="xzsd"][checked="true"]');
                if ($$(this).find('input').attr('checked') == 'true') {
                    //取消选中操作
                    var currKey = $$(this).find('input').val();
                    if ($checkedObjs.length < 3) {
                        $$(this).find('input').attr("checked", 'false');
                        $$(this).removeClass('xzsd-bkg-org');
                        $$(this).find('span').removeClass('black-org');
                    } else {
                        var currIndex = parseInt($$(this).find('input').val());
                        var frontIndex = currIndex - 1;
                        var afterIndex = currIndex + 1;
                        if ($$('#' + frontIndex).find('input').attr('checked') == 'true' &&
                            $$('#' + afterIndex).find('input').attr('checked') == 'true') {
                            //清空全部已选
                            $checkedObjs.each(function (index, domEle) {
                                var $currEl = $$('#' + domEle.value);
                                $currEl.find('input').attr("checked", 'false');
                                $currEl.removeClass('xzsd-bkg-org');
                                $currEl.find('span').removeClass('black-org');
                            });
                        } else {
                            $$(this).find('input').attr("checked", 'false');
                            $$(this).removeClass('xzsd-bkg-org');
                            $$(this).find('span').removeClass('black-org');
                        }
                    }
                } else {
                    //选中操作
                    if ($checkedObjs.length == 0) {
                        $$(this).find('input').attr("checked", 'true');
                        $$(this).addClass('xzsd-bkg-org');
                        $$(this).find('span').addClass('black-org');
                    } else {
                        var currIndex = parseInt($$(this).find('input').val());
                        var frontIndex = currIndex - 1;
                        var afterIndex = currIndex + 1;
                        var currVal = $$('#' + currIndex).find('.xzsd-label').html().split('-');
                        var frontVal = $$('#' + frontIndex).find('.xzsd-label').html();
                        var afterVal = $$('#' + afterIndex).find('.xzsd-label').html();
                        //支持多选
                        if (currVal.length == 2 && (
                                ($$('#' + frontIndex).find('input').attr('checked') == 'true' && frontVal && frontVal.split('-').length == 2 && frontVal.split('-')[1] == currVal[0]) ||
                                ($$('#' + afterIndex).find('input').attr('checked') == 'true' && afterVal && afterVal.split('-').length == 2 && afterVal.split('-')[0] == currVal[1])
                            )) {
                            $$(this).find('input').attr("checked", 'true');
                            $$(this).addClass('xzsd-bkg-org');
                            $$(this).find('span').addClass('black-org');

                        } else {
                            //清空其他全部已选
                            $checkedObjs.each(function (index, domEle) {
                                var $currEl = $$('#' + domEle.value);
                                $currEl.find('input').attr("checked", 'false');
                                $currEl.removeClass('xzsd-bkg-org');
                                $currEl.find('span').removeClass('black-org');
                            });
                            //选中当前
                            $$(this).find('input').attr("checked", 'true');
                            $$(this).addClass('xzsd-bkg-org');
                            $$(this).find('span').addClass('black-org');
                        }
                    }
                }
            });

            //点击关闭弹框
            $$('.js-close').on('click', function () {
                $el.remove();
            });
            //点击确认关闭弹框
            $$('.orange-btn').on('click', function () {
                var $checkedObjs = $$('input[type="checkbox"][name="xzsd"][checked="true"]');
                //获取相邻的兄弟节点
                if ($checkedObjs.length != 0) {
                    //算出选择的时间长度
                    var firstIndex = $checkedObjs[0].value;
                    var lastIndex = $checkedObjs[$checkedObjs.length - 1].value;
                    console.log(firstIndex + "--" + lastIndex);
                    var firstTime = $$('#' + firstIndex).find('.xzsd-label').html();
                    var lastTime = $$('#' + lastIndex).find('.xzsd-label').html();
                    console.log("最终选择时段:" + firstTime + "--" + lastTime);
                    var _firstTime = firstTime.split('-')[0];
                    var _lastTime = lastTime.split('-')[1];
                    var choosedTime = _firstTime + '-' + _lastTime;
                    $el.remove();
                    var returnOption = {value: choosedTime};
                    option.xzsdCallback && option.xzsdCallback(returnOption);
                }
            });
        }
        //选择信息弹框,{key:'1',value:'待选信息'}
        if (option.name == 'xzxx') {
            dialogStr = '<div class="dialog-wrap" id="dialogWrapBox">'
                + '<div class="dialog-xzxx-box">'
                + '<div class="dialog-xzxx-title">'
                + '<span>' + option.title + '</span>'
                + '<a href="javascript:;" class="dialog-xzxx-close js-close"><i class="mlr5-rem"></i></a>'
                + '</div>';

            dialogStr += '<div>' +
                '<ul>';
            $$.each(option.data, function (index, value) {
                dialogStr = dialogStr + '<li class="dialog-info-item" data-key="' + value.key + '" data-value="' + value.name + '"><a href="#">' + value.name + '</a></li>';
            });
            dialogStr += '</ul></div>';
            dialogStr += '</div></div>';
            $body.append(dialogStr);

            var $el = $$('#dialogWrapBox');

            //选中信息操作
            $el.on('click', '.dialog-info-item', function () {
                var _key = $$(this).data("key");
                var _value = $$(this).data("value");
                var returnOption = {
                    returnKey: _key,
                    returnValue: _value
                };
                $el.remove();
                option.xzxxCallback && option.xzxxCallback(returnOption);
            });
            //关闭弹框
            $$('.js-close').on('click', function () {
                console.log("------remove信息选择弹框.");
                $el.remove();
            });
        }
    },
    getNowDate: function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        return year + '-' + month + '-' + day;
    },
    getNowDateAndWeeks: function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        var dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var week = date.getDay();
        return year + '-' + month + '-' + day + " (" + dayNames[week] + ")";
    },
    /**
     * 读秒消失
     */
    toastDialog: function (text, time, callback) {
        var el = '<div class="dialog-wrap2">'
            + '<div class="dialog-content">'
            + '<div class="dialog-msg">' + text + '</div>' + '</div>'
            + '</div>';
        var $el = $$(el);
        $$('body').append($el);
        setTimeout(function () {
            $el.remove();
            callback && callback();
        }, time ? time : 1500);
    }
};
