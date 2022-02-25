(function (Framework7, T7, $$, moment) {
    'use strict';

    function currency(value) {
        var f1 = value;
        var f2 = (Math.round((f1 - 0) * 100)) / 100;
        f2 = Math.floor(f2) == f2 ? f2 + ".00"
         	: (Math.floor(f2 * 10) == f2 * 10) ? f2 + '0' : f2;
        f2 = String(f2);
        var r = /(\d+)(\d{3})/;
        var fs = String(f2);
        while (r.test(f2)) {
            f2 = f2.replace(r, '$1' + ',' + '$2');
        }
        return f2;
    }

    T7.registerHelper('currency', function (value) {
        return currency(value);
    });

    var myApp = new Framework7({
        animateNavBackIcon: true,
        template7Pages: true,
        modalButtonOk: '确定',
        modalButtonCancel: '取消',
        cache: true,
        scroller: "auto",
        modalTitle: "",
        // pushState: isDingTalk()
        pushState: false
    });
    var client = getClientInfo();
    console.log("-----client");
    console.log(client);
    if (!client) {
        myApp.alert("获取客户信息出错!");
        return;
    }
    myApp.clientInfo = client;
    var urls = {
            'xyk': __config.Host + __config.servletPath
        },
        req, xykApi, isIos7 = getIosVersion();

    window.isIos7 = isIos7;

    req = function (url, params, success) {
        var data = {
            method: '',
            param: '{}'
        };
        console.log("-----data:");
        console.log(data);
        params.param = params.param || {};
        params.param = JSON.stringify(params.param);
        for (var p in params) {
            data[p] = params[p];
        }
        // console.log("---req:");
        // console.log(data);
        return $$.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'jsonp',
            timeout: 25 * 1000,
            beforeSend: function () {},
            complete: function () {},
            success: function (result) {
                console.log("---resp:");
                console.log(result);
                var re = result,
                    res = {};
                if (re) {
                    if (typeof (re) == 'string') {
                        try {
                            res = JSON.parse(re);
                        } catch (error) {
                            myApp.alert("ERROR:" + re);
                            myApp.hideIndicator();
                            console.log("ERROR:" + error);
                        }
                    } else if (typeof (body) == 'object') {
                        res = re;
                    }
                    //accesstoken授权过期
                    if (res.errorCode == '401110') {
                        myApp.alert("授权过期，请重试加载页面", function () {
                            if (is_weixn()) {
                                WeixinJSBridge.call('closeWindow');
                            } else {
                                wanxiao.closeAppWeb();
                            }
                        });
                    }

                    var body = res.body,
                        d = {};
                    if (body) {
                        if (typeof (body) == 'string') {
                            try {
                                d = JSON.parse(body);
                            } catch (error) {
                                myApp.alert("ERROR:" + body);
                                myApp.hideIndicator();
                            }
                        } else if (typeof (body) == 'object') {
                            d = body;
                        }
                        success(d);
                    } else {
                        success(res);
                    }
                }
            },
            error: function (xhr, status) {
                myApp.alert("服务器返回异常:" + xhr.status);
                myApp.hideIndicator();
            }
        })

    };

    xykApi = {
        // 员工卡基本信息
        main: function (param, success) {
            req(urls.xyk, {
                method: 'USER_INFO',
                param: param,
                accessToken: myApp.clientInfo.accessToken
            }, success);
        },
        // 会议室列表
        getMeeingRoomList: function (param, success) {
            req(urls.xyk, {
                method: 'GetMeetingPlace',
                param: param,
                accessToken: myApp.clientInfo.accessToken,
                customerCode: myApp.clientInfo.customerCode
            }, success);
        },
        // 会议室信息
        getMeeingRoomInfo: function (param, success) {
            req(urls.xyk, {
                method: 'getMeettingListByPlaceid',
                param: param,
                accessToken: myApp.clientInfo.accessToken,
                customerCode: myApp.clientInfo.customerCode
            }, success);
        },
        // 会议信息查询
        getMeeingInfo: function (param, success) {
            req(urls.xyk, {
                method: 'getMeettingList',
                param: param,
                accessToken: myApp.clientInfo.accessToken,
                customerCode: myApp.clientInfo.customerCode
            }, success);
        },
        // 与会人员查询
        getMeeingPersonList: function (param, success) {
            req(urls.xyk, {
                method: 'getMeettingPersonList',
                param: param,
                accessToken: myApp.clientInfo.accessToken,
                customerCode: myApp.clientInfo.customerCode
            }, success);
        },
        // 添加会议
        addMeeting: function (param, success) {
            req(urls.xyk, {
                method: 'AddMeetingInfo',
                param: param,
                accessToken: myApp.clientInfo.accessToken,
                customerCode: myApp.clientInfo.customerCode
            }, success);
        },
        // 修改会议
        editMeeting: function (param, success) {
            req(urls.xyk, {
                method: 'EditMeetingInfo',
                param: param,
                accessToken: myApp.clientInfo.accessToken,
                customerCode: myApp.clientInfo.customerCode
            }, success);
        },
        // 删除会议
        delMeeting: function (param, success) {
            req(urls.xyk, {
                method: 'DelMeetingInfo',
                param: param,
                accessToken: myApp.clientInfo.accessToken,
                customerCode: myApp.clientInfo.customerCode
            }, success);
        },
        // 按name,outid模糊查询人员
        searchPeople: function (param, success) {
            req(urls.xyk, {
                method: 'GetCustomersByOutidName',
                param: param,
                accessToken: myApp.clientInfo.accessToken,
                customerCode: myApp.clientInfo.customerCode
            }, success);
        },
        //获取部门信息
        getDepartment: function (param, success) {
            req(urls.xyk, {
                method: 'GetMeetingDeptInfo',
                param: param,
                accessToken: myApp.clientInfo.accessToken,
                customerCode: myApp.clientInfo.customerCode
            }, success);
        }
    };

    window._xykApi = xykApi;
    window.myApp = window._myApp = myApp;
    //判断是否来自员工卡
    window.isSubApp = myApp.clientInfo.isSubApp;
    // 获取通过url后缀传递的参数
    function getClientInfo() {
        var _s = window.location.search,
            attr = {};
        if (_s.indexOf("?") >= 0) {
            _s = _s.substring(1);
            var arry = _s.split("&");
            for (var i = 0; i < arry.length; i++) {
                var item = arry[i];
                attr[item.split("=")[0]] = decodeURIComponent(item.split("=")[1]);
            }
        } else {
            return;
        }
        return attr;
    }

    function orderByMonth(data, key) {
        var year = {};
        var unclaimed = 0; // 未领款总计
        for (var k = 0; k < data.length; k++) {
            var item = data[k];
            /*
             * if(item.opdt){ var day =moment(item[key]); day = day.toDate();
             *
             * var _y = day.getFullYear(), _m = day.getMonth();
             *
             *
             * if(!year[_y]){ var _arry = []; for(var i=0;i<12;i++){
             * _arry[i]=[]; } year[_y] = _arry; } year[_y][_m].push(item); }
             */
            if (item.status == 1) { // 未领款
                unclaimed = unclaimed + (item.opfare - 0)

                if (item.opdt) {
                    var day = moment(item[key]);
                    day = day.toDate();

                    var _y = day.getFullYear(),
                        _m = day.getMonth();

                    if (!year[_y]) {
                        var _arry = [];
                        for (var i = 0; i < 12; i++) {
                            _arry[i] = [];
                        }
                        year[_y] = _arry;
                    }
                    year[_y][_m].push(item);
                }
            }

        }

        var keys = Object.keys(year);
        if (keys.length > 1)
            keys = keys.reverse();

        var d = [];
        for (var j = 0; j < keys.length; j++) {
            var _tem = year[keys[j]],
                leng = _tem.length;
            for (var t = leng - 1; t >= 0; t--) {
                if (_tem[t].length > 0) {
                    d.push({
                        month: j > 0 ? keys[j] + "-" + (t + 1) : t + 1,
                        total: _tem[t].length,
                        items: _tem[t]
                    })
                }
            }

        }

        return {
            unclaimed: unclaimed,
            items: d
        };
    }

    var getMonthStartEndDay = function (num) {
        if (!/\d+/.test(num)) {
            num = 4;
        }
        var format = "YYYY-MM-DD",
            data = [];

        for (var i = 0; i < num; i++) {
            var m = moment().subtract(i, 'M'),
                year = m.year(),
                month = m
                .month() >= 9 ? m.month() + 1 : "0" + (m.month() + 1);
            var beginDate = year + "-" + month + "-01",
                endDate = m.endOf(
                    'month').format("YYYY-MM-DD");

            var obj = {
                beginDate: beginDate,
                endDate: endDate,
                text: year + "年" + (m.month() + 1) + "月",
                month: (m.month() + 1)
            };

            data.push(obj);
        }
        return data;
    }

    window.orderByMonth = orderByMonth;
    window.getMonthStartEndDay = getMonthStartEndDay;
    window.currency = currency;

    /**
     * 检测 是否是IOS 7 版本 不支持localstorage
     *
     * @returns {boolean}
     */
    function getIosVersion() {
        var ios7 = false;
        if (myApp.device.ios) {
            var v = myApp.device.osVersion;
            if (/^7\.\d+/.test(v)) {
                ios7 = true;
            }
        }
        return ios7;
    }

})(Framework7, Template7, Dom7, moment);