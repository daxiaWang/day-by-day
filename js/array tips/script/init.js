(function (Framework7, $$, T7, xykApi, myApp) {
    var mainView = myApp.addView('#mainView', {
        dynamicNavbar: true,
        domCache: true
    });

    $$(document).on('pageBeforeInit', function (e) {
        var page = e.detail.page;
        pageBeforeInit(page);
    });

    $$(document).on('pageAfterAnimation', function (e) {
        var page = e.detail.page;
        pageAfterAnimation(page);
    });

    $$(document).on('pageBeforeAnimation', function (e) {
        var page = e.detail.page;
        pageBeforeAnimation(page);
    });
    $$(document).on('pageAfterBack', function (e) {
        var page = e.detail.page;
    });

    $$(document).on('pageReinit', function (e) {
        var page = e.detail.page;
        if (page.name === 'home') {
            localStorage.removeItem("peopleList");
        }
        if (page.name === 'applyMeeting' && page.fromPage.name === 'addPeople') {
            applyMeeting.renderPeople();
        }
        if (page.name === 'editMeeting' && page.fromPage.name === 'addPeople') {
            editMeeting.renderPeople();
        }
    });

    $$('div.navbar').removeClass('navbar-hidden');

    // 会议室列表
    var home = {
        // 设置上拉加载 最多条数
        MAX_ITEM: 100,
        // 当前条数
        items: 0,
        // 每次请求的条数(第一次获取全部)
        pagesize: 20,
        // 当月是否全部加载 或者 是否是最后一页(包含 当前条数大于设置的最大条数)
        isLast: false,
        init: function () {
            window.sessionStorage.setItem("time", '40')
            window.sessionStorage.setItem("startTime", '10:00:00')
            window.sessionStorage.setItem("endTime", '17:00:00')

            this.getUserInfo();
            // this.bindData();
            this.bindEvent();
            this.addBackListen();
        },
        bindData: function () {
            var that = this;
            that.initParams();
            that.getMeetingRoomList();
        },
        initParams: function (params) {
            var that = this;
            this.items = 0;
            this.isLast = false;
            params = params || {};
            params['pageSize'] = that.pagesize;
            params['pageNumber'] = 1;
            params['customerCode'] = myApp.clientInfo.customerCode;
            params['customerid'] = myApp.clientInfo.customerid;
            this.params = params;
            localStorage.removeItem("peopleList");
        },

        closePage: function () {
            if (window.isSubApp) {
                window.history.back();
            } else {
                if (isDingTalk()) {
                    dd.biz.navigation.close({
                        onSuccess: function (result) {},
                        onFail: function (err) {
                            console.log(err);
                        }
                    })
                } else if (is_weixn()) {
                    WeixinJSBridge.call('closeWindow');
                } else {
                    window.history.back();
                }
            }
        },
        addBackListen: function () {
            var that = this;
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener("popstate", that.closePage, false); //false阻止默认事件
            }
        },
        removeBackListen: function () {
            var that = this;
            window.removeEventListener("popstate", that.closePage, false); //false阻止默认事件
            console.log("removeBackListen");
        },

        getUserInfo: function () {
            var that = this;
            console.log("用户基本信息请求：");
            _xykApi.main({}, function (result) {
                console.log("用户基本信息：");
                console.log(result);
                for (var obj in result) {
                    myApp.clientInfo[obj] = result[obj];
                }
                that.bindData();
            })
        },
        getMeetingRoomList: function (append, callback) {

            typeof append == 'function' && (callback = append, append = false);
            var that = this;
            this.params || this.initParams();
            var p = {};
            for (var i in that.params) p[i] = that.params[i];
            p['beginIndex'] = that.items;
            p['pageNumber'] = this.params['pageNumber']++;
            p['placeName'] = "";
            myApp.showIndicator();
            _xykApi.getMeeingRoomList(p, function (result) {
                console.log(result);
                if (result._result) {
                    that.items = that.items + result.data.length;
                    that.render(result.data, append);
                    callback && callback(result);
                } else {
                    myApp.alert(result._message);
                }
                myApp.hideIndicator();
            });
        },
        getRoomList: function (value) {
            var p = {
                customerCode: myApp.clientInfo.customerCode,
                customerid: myApp.clientInfo.customerid,
                pageSize: 200,
                pageNumber: 1,
                placeName: value
            };
            myApp.showIndicator();
            _xykApi.getMeeingRoomList(p, function (result) {
                console.log("会议室列表");
                console.log(result);
                if (result.data) {
                    var $all = $$('#meetingRoomlist_box').find(".media-list ul");
                    if (result.data.length <= 0) {
                        //查询无果
                        var nothingHtml = '<li><div class="content-block">' +
                            '<div class="content-inner">' +
                            '<div class="content-title" style="text-align:center;height: 30px;line-height: 30px;">未查询到会议室信息</div>' +
                            '</div></div></li>';

                        $all.html(nothingHtml);
                    } else {
                        var d = {
                            items: result.data
                        };
                        var AllContent = tplManager.renderTplById('meetingRoomListTpl', d);
                        $all.html(AllContent);
                    }
                }
                myApp.hideIndicator();
            });
        },
        render: function (data, append) {
            var that = this,
                $all = $$('#meetingRoomlist_box').find(".media-list ul");

            if (that.items == 0) { // 说明没有会议室记录
                var tip = '<div class="content-block" style="padding: 0;">' +
                    ' <div class="content-block-inner" style="margin-left: 0;">暂时还没有会议室信息</div>' +
                    '</div>';
                $all.html(tip);
            } else {
                var isFirstLoad = that.items > that.pagesize ? false : true;
                var _d = {
                    isFirstLoad: isFirstLoad,
                    items: data
                };
                var AllContent = tplManager.renderTplById('meetingRoomListTpl', _d);
                if (!!append) {
                    $all.append(AllContent);
                } else {
                    $all.html(AllContent);
                }
            }

            if (data && (data.length < that.pagesize)) {
                // 断开对应的加载绑定
                that.detachScroll();
            } else {
                that.showLoadMore(true);
            }
            $all.show();
            // myApp.getScroller().refresh();
            myApp.hideIndicator();
        },
        /**
         * 断开 加载更多
         */
        detachScroll: function () {
            var that = this,
                iscroll = $$("#meetingRoomlist_box");;
            that.isLast = true;
            // 加载完毕，则注销无限加载事件，以防不必要的加载
            myApp.detachInfiniteScroll(iscroll);

            that.showLoadMore(false);
        },
        /**
         * 打开 加载更多
         */
        attchScroll: function () {
            var that = this,
                iscroll = $$("#meetingRoomlist_box");;
            that.isLast = false;
            myApp.attachInfiniteScroll(iscroll);
        },
        // 显示或隐藏 加载更多图标
        showLoadMore: function (flag) {
            var load = $$("#meetingRoomlist_box").find(".infinite-scroll-preloader");
            if (flag) {
                load.show();
            } else {
                load.hide();
            }
        },
        bindEvent: function () {
            var that = this;
            var timer = null;
            var tigVal = "";
            var ptrContent = $$("#meetingRoomlist_box");
            ptrContent.on('refresh', function (e) {
                //todo 增加搜索框置空
                mySearchbar.clear();
                setTimeout(function () {
                    var _p = that.params;
                    that.initParams(_p); // 刷新
                    that.getMeetingRoomList(function () {
                        ptrContent.scrollTop(0);
                        myApp.pullToRefreshDone();
                    });
                    // 打开加载更多(之前可能断开)
                    that.attchScroll();
                }, 500);
            });

            var iscroll = $$("#meetingRoomlist_box"),
                loading = false;
            iscroll.on('infinite', function () {
                if (loading) return;
                loading = true;
                setTimeout(function () {
                    that.getMeetingRoomList(true, function () {
                        if (that.items > that.MAX_ITEM) {
                            that.detachScroll();
                        }
                        loading = false;
                    });
                }, 500);
            });

            //获取搜索框输入的内容进行搜索
            // var mySearchbar = myApp.searchbar('.searchbar', {
            //     searchList: '.list-block-search',
            //     searchIn: '.item-title',
            //     customSearch: true,
            //     onSearch: function () {
            //         if (that.timer) {
            //             clearTimeout(this.timer);
            //         }
            //         //节流，防止频繁请求
            //         that.timer = setTimeout(function () {
            //             var seaechValue = mySearchbar.query;
            //             if (seaechValue !== '') {
            //                 if (that.tigVal === seaechValue) {
            //                     //do nothng
            //                     return;
            //                 }
            //                 that.tigVal = seaechValue;
            //                 that.getRoomList(seaechValue);
            //             }
            //         }, 500)
            //     }
            // });

            $$(".searchbar-confirm-index").on("click", function () {
                var seaechValue = $$("#indexSearchInput").val();
                console.log(seaechValue);
                console.log("seaechValue" + seaechValue);
                that.getRoomList(seaechValue);
            });

            //会议室详情
            $$(document).on('click', '#meetingRoomlist li', function () {
                var thisli = $$(this);
                var context = {
                    placeid: thisli.data("placeid"),
                    placename: thisli.data("placename"),
                    address: thisli.data("address"),
                    contains: thisli.data("contains"),
                    beizhu: thisli.data("beizhu"),
                    termname: thisli.data("termname")
                };
                console.log("-----context");
                console.log(context);
                mainView.router.loadPage({
                    url: 'tpl/applyMeetingRoom.html',
                    // pageName: 'applyMeetingRoom',
                    context: context
                });
            });
            //我的会议
            $$('.myMeeting').on('click', function () {
                myApp.closeModal();
                mainView.router.loadPage({
                    url: 'tpl/myMeeting.html'
                });
            });
            //我发起的会议
            $$('.myMeetingFq').on('click', function () {
                myApp.closeModal();
                mainView.router.loadPage({
                    url: 'tpl/myMeetingFq.html'
                });
            });
            //我审批的会议
            $$('.myApprove').on('click', function () {
                myApp.closeModal();
                mainView.router.loadPage({
                    url: 'tpl/myApprove.html'
                });
            });
        }
    };
    //编辑会议
    var editMeeting = {
        init: function () {
            this.initParams();
        },
        initParams: function () {
            var that = this;
            var placeid = $$('.edit-apply-info').data('placeid');
            var date = $$('.edit-apply-info').data('date');
            that.getRoomMeeting(date, placeid, true);
            that.getPeopleList();
            that.bindEvent();
        },
        renderPeople: function () {
            var peopleList = JSON.parse(localStorage.getItem("peopleList")) || new Array();
            var names = "";
            var userIds = "";
            var outids = "";
            for (var i = 0; i < peopleList.length; i++) {
                if (i < (peopleList.length - 1)) {
                    names += peopleList[i].name + ",";
                    userIds += peopleList[i].userid + ",";
                    outids += peopleList[i].outid + ",";
                } else {
                    names += peopleList[i].name;
                    userIds += peopleList[i].userid;
                    outids += peopleList[i].outid;
                }
            }
            $$('.chry').find('span').text(names);
            $$('.chry').attr("data-userids", userIds);
            $$('.chry').attr("data-outids", outids);
        },
        initApplyTimeStatus: function () {
            var time = $$('.edit-apply-info').data('time');
            var times = time.split("-");
            var $checkObj = $$('input[type="checkbox"][name="xzsd"]');
            var firstId, lastId;
            $checkObj.each(function (index, domEle) {
                var $currEl = $$('#' + domEle.value);
                var firstTime = $currEl.find('span').data("sdlabel").split("-")[0];
                var lastTime = $currEl.find('span').data("sdlabel").split("-")[1];
                if (firstTime === times[0]) {
                    firstId = domEle.value;
                }
                if (lastTime === times[1]) {
                    lastId = domEle.value;
                }
            });
            for (var j = parseInt(firstId); j < parseInt(lastId) + 1; j++) {
                var $currEl = $$('#' + j);
                $currEl.removeClass('time-bkg-gray');
                $currEl.addClass('time-bkg-blue');
                $currEl.find('input').attr("checked", 'true');
                $currEl.find('span').text("选定");
            }
        },
        bindEvent: function () {
            var that = this;
            //会议日期选择.点击日期，出现日期选择器
            var calendarDateFormat = myApp.calendar({
                input: '#edit-apply-date',
                dateFormat: 'yyyy-mm-dd (DD)',
                monthPickerTemplate: '<div class="picker-calendar-month-picker">' +
                    '<a href="#" class="link icon-only picker-calendar-prev-month">' +
                    '<i class="icon icon-prev"></i>' +
                    '</a>' +
                    '<span class="current-month-value"></span>' +
                    '<a href="#" class="link icon-only picker-calendar-next-month">' +
                    '<i class="icon icon-next"></i>' +
                    '</a>' +
                    '</div>',
                yearPickerTemplate: '<div class="picker-calendar-year-picker">' +
                    '<a href="#" class="link icon-only picker-calendar-prev-year">' +
                    '<i class="icon icon-prev "></i>' +
                    '</a>' +
                    '<span class="current-year-value"></span>' +
                    '<a href="#" class="link icon-only picker-calendar-next-year">' +
                    '<i class="icon icon-next "></i>' +
                    '</a>' +
                    '</div>',
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
                dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                closeOnSelect: true,
                onDayClick: function (p, dayContainer, year, month, day) {
                    var thismonth = parseInt(month) + 1;
                    // var newMonth = thismonth < 10 ? '0' + thismonth : thismonth;
                    var newDay = day < 10 ? '0' + day : day;
                    var newtime = year + "-" + thismonth + "-" + newDay;

                    var placeId = $$('.edit-apply-info').data('placeid');
                    that.clearFormStatus();
                    that.getRoomMeeting(newtime, placeId, false);
                }
            });
            var $el = $$('#roomTimeBox');
            $el.on('click', '.js-choose-room', function () {
                var $checkedObjs = $$('input[type="checkbox"][name="xzsd"][checked="true"]');
                if ($$(this).hasClass('time-bkg-gray')) {
                    //已预约状态，不允许进行选中操作。
                } else {
                    if ($$(this).find('input').attr('checked') == 'true') {
                        //取消选中状态
                        var currKey = $$(this).find('input').val();
                        if ($checkedObjs.length < 3) {
                            $$(this).find('input').attr("checked", 'false');
                            $$(this).removeClass('time-bkg-blue');
                            $$(this).find('span').text("空闲");
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
                                    $currEl.removeClass('time-bkg-blue');
                                    $currEl.find('span').text("空闲");
                                });
                            } else {
                                $$(this).find('input').attr("checked", 'false');
                                $$(this).removeClass('time-bkg-blue');
                                $$(this).find('span').text("空闲");
                            }
                        }

                    } else {
                        if ($checkedObjs.length === 0) {
                            $$(this).find('input').attr("checked", 'true');
                            $$(this).addClass('time-bkg-blue');
                            $$(this).find('span').text("选定");
                        } else {
                            var currIndex = parseInt($$(this).find('input').val());
                            var frontIndex = currIndex - 1;
                            var afterIndex = currIndex + 1;
                            var currVal = $$('#' + currIndex).find('span').data("sdlabel").split('-');
                            var frontVal = $$('#' + frontIndex).find('span').data("sdlabel");
                            var afterVal = $$('#' + afterIndex).find('span').data("sdlabel");
                            //支持多选
                            if (currVal.length == 2 && (
                                    ($$('#' + frontIndex).find('input').attr('checked') == 'true' && frontVal && frontVal.split('-').length === 2 && frontVal.split('-')[1] == currVal[0]) ||
                                    ($$('#' + afterIndex).find('input').attr('checked') == 'true' && afterVal && afterVal.split('-').length === 2 && afterVal.split('-')[0] == currVal[1])
                                )) {
                                $$(this).find('input').attr("checked", 'true');
                                $$(this).addClass('time-bkg-blue');
                                $$(this).find('span').text("选定");
                            } else {
                                //清空其他全部已选
                                $checkedObjs.each(function (index, domEle) {
                                    var $currEl = $$('#' + domEle.value);
                                    $currEl.find('input').attr("checked", 'false');
                                    $currEl.removeClass('time-bkg-blue');
                                    $currEl.find('span').text("空闲");
                                });
                                //选中当前
                                $$(this).find('input').attr("checked", 'true');
                                $$(this).addClass('time-bkg-blue');
                                $$(this).find('span').text("预定");
                            }
                        }
                    }
                }
            });

            /**
             * 修改与会人员
             */
            $$('.edit-chry').on('click', function () {
                mainView.router.loadPage({
                    url: 'tpl/addPeople.html?v=2'
                });
            });
            /**
             * 确认修改
             */
            $$('.edit-ok-btn').on('click', function () {
                var $checkedObjs = $$('input[type="checkbox"][name="xzsd"][checked="true"]');
                //获取相邻的兄弟节点
                if ($checkedObjs.length !== 0) {
                    //算出选择的时间长度
                    var firstIndex = $checkedObjs[0].value;
                    var lastIndex = $checkedObjs[$checkedObjs.length - 1].value;
                    console.log(firstIndex + "--" + lastIndex);
                    var firstTime = $$('#' + firstIndex).find('span').data("sdlabel");
                    var lastTime = $$('#' + lastIndex).find('span').data("sdlabel");
                    console.log("最终选择时段:" + firstTime + "--" + lastTime);
                    var _firstTime = firstTime.split('-')[0];
                    var _lastTime = lastTime.split('-')[1];
                    var meetingid = $$('.edit-apply-info').data('id');
                    var hymc = $$('.edit-apply-info').find('.edit-meeting-name').val();
                    var hycontent = $$('.edit-apply-info').find('.edit-meeting-content').val();
                    var hytheme = $$('.edit-apply-info').find('.edit-meeting-theme').val();
                    var hys = $$('.edit-apply-info').data('placeid');
                    var hyrq = $$('#edit-apply-date').val().split(' ')[0];
                    var sTime = _firstTime;
                    var eTime = _lastTime;
                    var yhry = $$('.chry').data("userids") || "";

                    if (hymc === null || hymc === undefined || hymc === '') {
                        myApp.alert("请填写会议名称");
                        return false;
                    }
                    if (hytheme === null || hytheme === undefined || hytheme === '') {
                        myApp.alert("请填写会议主题");
                        return false;
                    }
                    if (hycontent === null || hycontent === undefined || hycontent === '') {
                        hycontent = " ";
                    }
                    var p = {
                        meetingid: meetingid,
                        meetingname: hymc,
                        placeid: hys,
                        planstartdate: hyrq,
                        planstart: sTime,
                        planend: eTime,
                        sponsor: myApp.clientInfo.customerid,
                        userids: yhry,
                        customerCode: myApp.clientInfo.customerCode,
                        theme: hytheme,
                        meetcontent: hycontent
                    };
                    myApp.confirm("确认提交?", function () {
                        myApp.showIndicator();
                        _xykApi.editMeeting(p, function (result) {
                            console.log(result);
                            if (result.data[0].flag === 100) {
                                localStorage.removeItem("peopleList");
                                myApp.alert(result.data[0].msg, function () {
                                    window.location.reload();
                                });
                            } else {
                                myApp.alert(result.data[0].msg);
                            }
                            myApp.hideIndicator();
                        });
                    });

                } else {
                    myApp.alert("请选择预约时间");
                }

            });
        },
        /**
         * 获取当前会议室，某一天使用状态
         */
        getRoomMeeting: function (date, placeid, isFirst) {
            var that = this;
            var p = {
                placeid: placeid,
                date: date,
                xh: myApp.clientInfo.outid,
                customerCode: myApp.clientInfo.customerCode
            };
            myApp.showIndicator();
            _xykApi.getMeeingRoomInfo(p, function (result) {
                console.log(result);
                var meetingList = result.data;
                if (meetingList.length !== 0) {
                    var timeList = new Array();
                    for (var i = 0; i < meetingList.length; i++) {
                        var meetingDate = meetingList[i].agreeddate.split(" ")[0];
                        meetingDate = meetingDate.replace(/\//g, "-");
                        var meetingTime = meetingList[i].time;
                        var p = {
                            "fqr": meetingList[i].fqrxm,
                            "meetingDate": meetingDate,
                            "meetingTime": meetingTime
                        };
                        timeList.push(p);
                    }
                    console.log("预约时间列表：");
                    console.log(timeList);
                    that.updateFormStatus(timeList);
                    if (date === $$('.edit-apply-info').data("date")) {
                        that.initApplyTimeStatus();
                    }
                } else { //今天本会议室还没有被预约
                }
                myApp.hideIndicator();
            });
        },
        /**
         * 根据当天会议室预约情况，更新页面会议预约状态
         * @param data
         */
        updateFormStatus: function (data) {
            for (var i = 0; i < data.length; i++) {
                var times = data[i].meetingTime.split("-");
                var $checkObj = $$('input[type="checkbox"][name="xzsd"]');
                var firstId, lastId;
                $checkObj.each(function (index, domEle) {
                    var $currEl = $$('#' + domEle.value);
                    var firstTime = $currEl.find('span').data("sdlabel").split("-")[0];
                    var lastTime = $currEl.find('span').data("sdlabel").split("-")[1];
                    if (firstTime === times[0]) {
                        firstId = domEle.value;
                    }
                    if (lastTime === times[1]) {
                        lastId = domEle.value;
                    }
                });
                for (var j = parseInt(firstId); j < parseInt(lastId) + 1; j++) {
                    var $currEl = $$('#' + j);
                    $currEl.addClass('time-bkg-gray');
                    $currEl.find('span').text(data[i].fqr + "预定");
                }
            }
        },
        clearFormStatus: function () {
            var $checkObj = $$('input[type="checkbox"][name="xzsd"]');
            $checkObj.each(function (index, domEle) {
                var $currEl = $$('#' + domEle.value);
                $currEl.find('input').removeAttr("checked");
                $currEl.removeClass('time-bkg-gray');
                $currEl.removeClass('time-bkg-blue');
                $currEl.find('span').text("空闲");
            });
        },
        getPeopleList: function () {
            //当前会议编号
            var id = $$('.edit-apply-info').data('id');
            //当前会议issee
            var issee = '1';
            //获取与会人员信息
            var p = {
                count: 500,
                beginIndex: 0,
                id: id, //会议编号
                issee: issee,
                xh: myApp.clientInfo.outid,
                userid: myApp.clientInfo.outid,
                customerCode: myApp.clientInfo.customerCode
            };
            console.log("----查询与会人员传入参数");
            console.log(p);
            myApp.showIndicator();
            _xykApi.getMeeingPersonList(p, function (result) {
                console.log(result);
                if (result._result) {
                    var data = result.data;
                    console.log("与会人员");
                    var names = "";
                    var userIds = "";
                    var outids = "";
                    for (var i = 0; i < data.length; i++) {
                        data[i]['isChecked'] = true;
                        data[i]['name'] = data[i].xm;
                        data[i]['outid'] = data[i].outid;
                        data[i]['deptname'] = data[i].bm;
                        data[i]['userid'] = data[i].userid.toString();
                        if (i < (data.length - 1)) {
                            names += data[i].xm + ",";
                            userIds += data[i].userid + ",";
                            outids += data[i].xh + ",";
                        } else {
                            names += data[i].xm;
                            userIds += data[i].userid;
                            outids += data[i].xh;
                        }
                    }
                    localStorage.setItem("peopleList", JSON.stringify(data));
                    $$('.chry').find('span').text(names);
                    $$('.chry').attr("data-userids", userIds);
                    $$('.chry').attr("data-outids", outids);
                } else {
                    myApp.alert(result._message);
                }
                myApp.hideIndicator();
            });
        }
    };

    //添加与会人员
    var addPeople = {
        init: function () {
            this.initParam();
            this.bindEvent();
            this.getDepartmentList();
        },
        initParam: function () {
            $$('.deptTitle').html(myApp.clientInfo.schoolname);
        },
        render: function (param) {
            var memberListHtml = tplManager.renderTplById('memberListTpl', param);
            $$('#memberList').html(memberListHtml);
        },
        getPerson: function (p) {
            var that = this;
            var param = {
                outidname: p, //查询的工号或姓名
                customerCode: myApp.clientInfo.customerCode,
                deptid: 0
            };
            myApp.showIndicator();
            _xykApi.searchPeople(param, function (result) {
                if (result._result) {
                    if (result.data.length <= 0) {
                        //查询无果
                        var nothingHtml = '<li><div class="content-block">' +
                            '<div class="content-inner">' +
                            '<div class="content-title" style="text-align:center;height: 30px;line-height: 30px;">未查询到人员</div>' +
                            '</div></div></li>';
                        $$('#memberList').html(nothingHtml);
                    } else {
                        var data = result.data;
                        var peopleList = JSON.parse(localStorage.getItem("peopleList")) || new Array();
                        for (var i = 0; i < peopleList.length; i++) {
                            for (var j = 0; j < data.length; j++) {
                                if (data[j].userid === peopleList[i].userid) {
                                    data[j].isChecked = true;
                                }
                            }
                        }
                        var p = {
                            items: data
                        };
                        that.render(p);
                    }
                    myApp.hideIndicator();
                } else {
                    myApp.alert(result._message);
                    myApp.hideIndicator();
                }
            });
        },

        bindEvent: function () {
            var that = this;
            //获取搜索框输入的内容进行搜索
            // var mySearchbar = myApp.searchbar('.search-people', {
            //     searchList: '.list-block-search',
            //     searchIn: '.item-title',
            //     customSearch: false,
            //     onSearch: function () {
            //         var seaechValue = mySearchbar.query;
            //         if (seaechValue !== '') {
            //             that.getPerson(seaechValue);
            //         }
            //     }
            // });
            $$(".searchbar-confirm-user").on("click", function () {
                var seaechValue = $$("#userSearchInput").val();
                console.log(seaechValue);
                if (seaechValue) {
                  console.log("seaechValue" + seaechValue);
                  that.getPerson(seaechValue);
                }
            });
            $$("#memberList").on('click', '.choose-people', function () {
                var $this = $$(this);
                var peopleList = JSON.parse(localStorage.getItem("peopleList")) || new Array();
                var people = {
                    name: $this.data('name'),
                    outid: $this.data('gh'),
                    deptname: $this.data('deptname'),
                    userid: $this.data('userid')
                };
                if ($this.hasClass('add-btn')) {
                    people['isChecked'] = true;
                    peopleList.push(people);
                    localStorage.setItem("peopleList", JSON.stringify(peopleList));
                    $this.removeClass('add-btn');
                    $this.addClass('remove-btn');
                    $this.html("移除");
                } else if ($this.hasClass('remove-btn')) {
                    for (var i = 0; i < peopleList.length; i++) {
                        if (peopleList[i].userid === people.userid) {
                            console.log("index:" + i);
                            peopleList.splice(i, 1);
                        }
                    }
                    localStorage.setItem("peopleList", JSON.stringify(peopleList));
                    $this.removeClass('remove-btn');
                    $this.addClass('add-btn');
                    $this.html("添加");
                }

                /*  var $li = '<li>' +
                      '<div class="item-content">' +
                      '<div class="item-inner">' +
                      '<div class="item-title-row">' +
                      '<div class="item-title people-name">' + people.name + '</div>' +
                      '</div>' +
                      '<div class="item-subtitle">' +
                      '<span class="people-outid">' + people.outid + '</span>' +
                      '<span class="people-department">' + people.deptname + '</span>' +
                      '</div>' +
                      '</div>' +
                      '<div class="item-media">' +
                      '<div class="remove-btn" data-gh="' + people.outid + '"data-name=" ' + people.name + '" data-department=" ' + people.deptname + '" data-userid="' + people.userid + '">移除</div>' +
                      '</div> </div>' +
                      '</li>';
                  $$('#choosed-people').find('ul').append($li);*/
            });

            /**
             * 根据末级部门编号查部门下的员工
             */
            $$(document).on('click', '.last-item', function () {
                var $thisli = $$(this);
                var deptid = $thisli.data("id");
                var deptname = $thisli.data("deptname");
                var thisParents = $thisli.parents('.parent-accordion');
                var str = myApp.clientInfo.schoolname;
                if (thisParents.length > 0) {
                    for (var i = thisParents.length; i > 0; i--) {
                        var dept = $$('.parent-accordion').data("deptname");
                        str = str + '>' + dept;
                    }
                }
                str = str + ">" + deptname;
                var p = {
                    "customerid": myApp.clientInfo.customerid,
                    "outidname": "",
                    "deptid": deptid
                };
                myApp.showIndicator();
                _xykApi.searchPeople(p, function (result) {
                    if (result._result) {
                        var data = result.data;
                        var peopleList = JSON.parse(localStorage.getItem("peopleList")) || new Array();
                        for (var i = 0; i < peopleList.length; i++) {
                            for (var j = 0; j < data.length; j++) {
                                if (data[j].userid === peopleList[i].userid) {
                                    data[j].isChecked = true;
                                }
                            }
                        }
                        console.log("----");
                        console.log(data);
                        var p = {
                            peopleList: data,
                            depts: str
                        };
                        mainView.router.loadPage({
                            url: 'tpl/deptPeople.html',
                            context: p
                        })
                    } else {
                        myApp.alert(result._message);
                    }
                    myApp.hideIndicator();
                })
            });

            $$('.dept-list-box').on('click', function () {
                $$('#memberList').html(" ");
            });
            /**
             * 查看已选中人员
             */
            $$('.has-choosed').on('click', function () {
                $$('#memberList').html(" ");
                var peopleList = JSON.parse(localStorage.getItem("peopleList")) || new Array();
                var p = {
                    peopleList: peopleList
                };
                if (peopleList.length === 0) {
                    p['isNobody'] = true;
                } else {
                    p['isNobody'] = false;
                }
                mainView.router.loadPage({
                    url: 'tpl/hasChoosedPeople.html',
                    context: p
                });
            });
            /**
             * 确认选中人员
             */
            $$('.choosed-ok-btn').on('click', function () {
                mainView.router.back();
            });

        },
        unique: function (list) {
            var arr = [];
            for (var i = 0; i < list.length; i++) {
                if (i === 0) arr.push(list[i]);
                b = false;
                if (arr.length > 0 && i > 0) {
                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j].outid === list[i].outid) {
                            b = true;
                            //break;
                        }
                    }
                    if (!b) {
                        arr.push(list[i]);
                    }
                }
            }
            return arr;
        },
        getDepartmentList: function () {
            var p = {}
            myApp.showIndicator();
            _xykApi.getDepartment(p, function (result) {
                console.log("企业组织结构");
                console.log(result);
                if (result._result) {
                    var html = tplManager.renderTplById('deptmentListTpl', result.data);
                    $$('.dept-list').html(html);
                    myApp.hideIndicator();
                } else {
                    myApp.hideIndicator();
                    myApp.alert(result._message);
                }
            });
        }
    };
    var deptPeople = {
        init: function () {
            this.bindEvent()
        },
        bindEvent: function () {
            $$(".deptpeople-list").on('click', '.choose-people', function () {
                var $this = $$(this);
                var peopleList = JSON.parse(localStorage.getItem("peopleList")) || new Array();
                var people = {
                    name: $this.data('name'),
                    outid: $this.data('gh'),
                    deptname: $this.data('deptname'),
                    userid: $this.data('userid')
                };
                if ($this.hasClass('add-btn')) {
                    people['isChecked'] = true;
                    peopleList.push(people);
                    localStorage.setItem("peopleList", JSON.stringify(peopleList));
                    $this.removeClass('add-btn');
                    $this.addClass('remove-btn');
                    $this.html("移除");
                } else if ($this.hasClass('remove-btn')) {
                    for (var i = 0; i < peopleList.length; i++) {
                        if (peopleList[i].userid === people.userid) {
                            console.log("index:" + i);
                            peopleList.splice(i, 1);
                        }
                    }
                    localStorage.setItem("peopleList", JSON.stringify(peopleList));
                    $this.removeClass('remove-btn');
                    $this.addClass('add-btn');
                    $this.html("添加");
                }
            });
        }
    };

    var hasChoosedPeople = {
        init: function () {
            this.bindEvent()
        },
        bindEvent: function () {
            $$(".choosed-people-list").on('click', '.choose-people', function () {
                var $this = $$(this);
                var peopleList = JSON.parse(localStorage.getItem("peopleList")) || new Array();
                var people = {
                    name: $this.data('name'),
                    outid: $this.data('gh'),
                    deptname: $this.data('deptname'),
                    userid: $this.data('userid')
                };
                if ($this.hasClass('add-btn')) {
                    people['isChecked'] = true;
                    peopleList.push(people);
                    localStorage.setItem("peopleList", JSON.stringify(peopleList));
                    $this.removeClass('add-btn');
                    $this.addClass('remove-btn');
                    $this.html("移除");
                } else if ($this.hasClass('remove-btn')) {
                    for (var i = 0; i < peopleList.length; i++) {
                        if (peopleList[i].userid === people.userid) {
                            console.log("index:" + i);
                            peopleList.splice(i, 1);
                        }
                    }
                    localStorage.setItem("peopleList", JSON.stringify(peopleList));
                    $this.removeClass('remove-btn');
                    $this.addClass('add-btn');
                    $this.html("添加");
                }
            });
        }
    };
    //我的会议列表
    var myMeeting = {
        init: function () {
            this.initParam();
            this.bindEvent();
        },
        initParam: function () {
            var that = this;
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var date = d.getDate();
            var day = d.getDay(); //返回一周中的某一天
            var week = that.getWeek(day);
            var newdate = date < 10 ? '0' + date : date;
            var st = year + "-" + month + "-" + newdate + " " + "(" + week + ")";
            var time = year + "-" + month + "-" + date;
            // console.log(time);
            $$("#meeting-calendar").val(st);
            that.getMeetingList(time);
        },
        bindEvent: function () {
            var that = this;
            //点击日期，出现日期选择器
            var calendarDateFormat = myApp.calendar({
                input: '#meeting-calendar',
                dateFormat: 'yyyy-mm-dd (DD)',
                monthPickerTemplate: '<div class="picker-calendar-month-picker">' +
                    '<a href="#" class="link icon-only picker-calendar-prev-month">' +
                    '<i class="icon icon-prev "></i>' +
                    '</a>' +
                    '<span class="current-month-value"></span>' +
                    '<a href="#" class="link icon-only picker-calendar-next-month">' +
                    '<i class="icon icon-next "></i>' +
                    '</a>' +
                    '</div>',
                yearPickerTemplate: '<div class="picker-calendar-year-picker">' +
                    '<a href="#" class="link icon-only picker-calendar-prev-year">' +
                    '<i class="icon icon-prev "></i>' +
                    '</a>' +
                    '<span class="current-year-value"></span>' +
                    '<a href="#" class="link icon-only picker-calendar-next-year">' +
                    '<i class="icon icon-next "></i>' +
                    '</a>' +
                    '</div>',
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
                dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                closeOnSelect: true,
                onDayClick: function (p, dayContainer, year, month, day) {
                    var thismonth = parseInt(month) + 1;
                    var newMonth = thismonth < 10 ? '0' + thismonth : thismonth;
                    var newDay = day < 10 ? '0' + day : day;
                    var newtime = year + "-" + newMonth + "-" + newDay;
                    console.log(newtime);
                    that.getMeetingList(newtime);
                }
            });
            //会议详情跳转
            $$('.myMeeting-list').on('click', 'li', function () {
                var $thisli = $$(this);
                // var meetdate = $thisli.data("meetdate");
                var id = $thisli.data("id");
                var issee = $thisli.data("issee");
                var time = $thisli.data("time");
                var allnum = $thisli.data("allnum");
                var nocome = $thisli.data("nocome");
                var address = $thisli.data("address");
                var fqrxm = $thisli.data("fqrxm");
                var title = $thisli.data("title");
                var ifagreed = $thisli.data("ifagree");
                var reson = $thisli.data("reson");
                var meetdate = $$('#meeting-calendar').val().split(' ')[0];
                var context = {
                    id: id,
                    meetdate: meetdate,
                    issee: issee,
                    time: time,
                    address: address,
                    fqrxm: fqrxm,
                    allnum: allnum,
                    nocome: nocome,
                    title: title,
                    ifagreed: ifagreed,
                    reson: reson
                };
                console.log("---context");
                console.log(context);

                if (issee == '0') {
                    mainView.router.loadPage({
                        url: 'tpl/detailMeeting.html',
                        context: context
                    });
                } else if (issee == '1') {
                    mainView.router.loadPage({
                        url: 'tpl/myDetailMeeting.html',
                        context: context
                    });
                }
            });
        },
        //获取会议列表 我参与的
        getMeetingList: function (date) {
            var that = this;
            var p = {};
            p['date'] = date;
            p['enddate'] = date;//新增
            p['xh'] = myApp.clientInfo.outid;
            p['customerCode'] = myApp.clientInfo.customerCode;
            myApp.showIndicator();
            _xykApi.getMeeingInfo(p, function (result) {
                console.log(result);
                var data = result.data;
                if (result._result) {
                    var list = [];
                    for(var i=0;i<data.length;i++){
                        // ISSEE=1是申请跟主持，0是参与
                        if(data[i].issee==="0"){
                            list.push(data[i]);
                        }
                    }
                    data = list;
                    if (data.length > 0) {
                        var _d = {
                            items: data
                        };
                        var myMeetingList = tplManager.renderTplById('myMeetingListTpl', _d);
                        $$('.myMeeting-list').find('ul').html(myMeetingList);
                    } else {
                        var tip = '<div class="content-block" style="padding: 0;">' +
                            ' <div class="content-block-inner" style="margin-left: 0;">今天暂时没有要参加的会议</div>' +
                            '</div>';
                        $$('.myMeeting-list').find('ul').html(tip);
                    }
                    myApp.hideIndicator();
                } else {
                    myApp.alert(result._message);
                    myApp.hideIndicator();
                }
            });
        },
        getWeek: function (num) {
            var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            return weeks[num];
        }
    };
    //我发起的会议列表
    var myMeetingFq = {
        init: function () {
            this.initParam();
            this.bindEvent();
        },
        initParam: function () {
            var that = this;
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var date = d.getDate();
            var day = d.getDay(); //返回一周中的某一天
            var week = that.getWeek(day);
            var newdate = date < 10 ? '0' + date : date;
            var st = year + "-" + month + "-" + newdate + " " + "(" + week + ")";
            var time = year + "-" + month + "-" + date;
            // console.log(time);
            $$("#meeting-calendar").val(st);
            that.getMeetingList(time);
        },
        bindEvent: function () {
            var that = this;
            //点击日期，出现日期选择器
            var calendarDateFormat = myApp.calendar({
                input: '#meeting-calendar',
                dateFormat: 'yyyy-mm-dd (DD)',
                monthPickerTemplate: '<div class="picker-calendar-month-picker">' +
                    '<a href="#" class="link icon-only picker-calendar-prev-month">' +
                    '<i class="icon icon-prev "></i>' +
                    '</a>' +
                    '<span class="current-month-value"></span>' +
                    '<a href="#" class="link icon-only picker-calendar-next-month">' +
                    '<i class="icon icon-next "></i>' +
                    '</a>' +
                    '</div>',
                yearPickerTemplate: '<div class="picker-calendar-year-picker">' +
                    '<a href="#" class="link icon-only picker-calendar-prev-year">' +
                    '<i class="icon icon-prev "></i>' +
                    '</a>' +
                    '<span class="current-year-value"></span>' +
                    '<a href="#" class="link icon-only picker-calendar-next-year">' +
                    '<i class="icon icon-next "></i>' +
                    '</a>' +
                    '</div>',
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
                dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                closeOnSelect: true,
                onDayClick: function (p, dayContainer, year, month, day) {
                    var thismonth = parseInt(month) + 1;
                    var newMonth = thismonth < 10 ? '0' + thismonth : thismonth;
                    var newDay = day < 10 ? '0' + day : day;
                    var newtime = year + "-" + newMonth + "-" + newDay;
                    console.log(newtime);
                    that.getMeetingList(newtime);
                }
            });
            //会议详情跳转
            $$('.myMeeting-list').on('click', 'li a', function () {
                var $thisli = $$(this);
                // var meetdate = $thisli.data("meetdate");
                var id = $thisli.data("id");
                var issee = $thisli.data("issee");
                var time = $thisli.data("time");
                var allnum = $thisli.data("allnum");
                var nocome = $thisli.data("nocome");
                var address = $thisli.data("address");
                var fqrxm = $thisli.data("fqrxm");
                var title = $thisli.data("title");
                var ifagreed = $thisli.data("ifagree");
                var reson = $thisli.data("reson");
                var meetdate = $$('#meeting-calendar').val().split(' ')[0];
                var context = {
                    id: id,
                    meetdate: meetdate,
                    issee: issee,
                    time: time,
                    address: address,
                    fqrxm: fqrxm,
                    allnum: allnum,
                    nocome: nocome,
                    title: title,
                    ifagreed: ifagreed,
                    reson: reson
                };
                console.log("---context");
                console.log(context);

                if (issee == '0') {
                    mainView.router.loadPage({
                        url: 'tpl/detailMeeting.html',
                        context: context
                    });
                } else if (issee == '1') {
                    mainView.router.loadPage({
                        url: 'tpl/myDetailMeeting.html',
                        context: context
                    });
                }
            });
            //编辑会议
            $$('.myMeeting-list').on('click', '.edit-btn', function () {
                var $this = $$(this);
                var context = {
                    placeid: $this.data("placeid"),
                    id: $this.data("id"), //会议id
                    content: $this.data("content"),
                    theme: $this.data("theme"),
                    title: $this.data("title"),
                    time: $this.data("time"),
                    date: $$("#meeting-calendar").val().split(' ')[0],
                    dateText: $$("#meeting-calendar").val()
                };
                console.log(context);
                mainView.router.loadPage({
                    url: 'tpl/editMeeting.html',
                    context: context
                });
            });
            //删除会议
            $$('.myMeeting-list').on('click', '.clear-btn', function () {
                var $this = $$(this);
                //获取父元素 li
                var $thisLi = $this.parents('li');
                if ($thisLi.length === 0) return;
                if ($thisLi.length > 1) $thisLi = $$($thisLi[0]);
                myApp.confirm("确认删除?", function () {
                    var id = $this.data("id");
                    var p = {
                        meetingid: id,
                        customerCode: myApp.clientInfo.customerCode
                    };
                    myApp.showIndicator();
                    _xykApi.delMeeting(p, function (result) {
                        console.log(result);
                        if (result.data[0].flag === 100) {
                            myApp.alert(result.data[0].msg, function () {
                                $thisLi.remove();
                            });
                        } else {
                            myApp.alert(result.data[0].msg);
                        }
                        myApp.hideIndicator();
                    });
                });
            });
        },
        //获取会议列表 我发起的
        getMeetingList: function (date) {
            var that = this;
            var p = {};
            p['date'] = date;
            p['enddate'] = date;//新增
            p['xh'] = myApp.clientInfo.outid;
            p['customerCode'] = myApp.clientInfo.customerCode;
            myApp.showIndicator();
            _xykApi.getMeeingInfo(p, function (result) {
                console.log(result);
                var data = result.data;
                if (result._result) {
                    var list = [];
                    for(var i=0;i<data.length;i++){
                        // ISSEE=1是申请跟主持，0是参与
                        if(data[i].issee==="1"){
                            list.push(data[i]);
                        }
                    }
                    data = list;
                    if (data.length > 0) {
                        var _d = {
                            items: data
                        };
                        var myMeetingList = tplManager.renderTplById('myMeetingListFqTpl', _d);
                        $$('.myMeeting-list').find('ul').html(myMeetingList);
                    } else {
                        var tip = '<div class="content-block" style="padding: 0;">' +
                            ' <div class="content-block-inner" style="margin-left: 0;">今天暂时没有要参加的会议</div>' +
                            '</div>';
                        $$('.myMeeting-list').find('ul').html(tip);
                    }
                    myApp.hideIndicator();
                } else {
                    myApp.alert(result._message);
                    myApp.hideIndicator();
                }
            });
        },
        getWeek: function (num) {
            var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            return weeks[num];
        }
    };
    //会议详情(会议发起人)
    var myDetailMeeting = {
        //设置加载 最多条数
        MAX_ITEM: 100,
        //当前条数
        items: 0,
        //每次请求的条数(第一次获取全部)
        pageSize: 20,
        //当月是否全部加载  或者  是否是最后一页(包含 当前条数大于设置的最大条数)
        isLast: true,
        init: function () {
            this.initParams();
            this.bindData();
            this.bindEvent();
        },
        bindData: function () {
            // this.getMeetinInfo();
            this.getPeopleList();
        },
        initParams: function (params) {
            var that = this;
            this.items = 0;
            this.isLast = false;

            params = params || {};
            params['beginIndex'] = 0;
            params['count'] = that.pageSize;

            this.params = params;
        },
        render: function (data, append) {
            var that = this,
                $all = $$(".meetingMembers").find("ul");
            if (that.items == 0) { //说明没有会议人员
                var tip = '<div class="content-block">' +
                    ' <div class="content-block-inner tips">无与会人员信息</div>' +
                    '</div>';
                $all.html(tip);
            } else if (data && data.length > 0) {
                var _d = {
                    items: data
                };
                var AllContent = tplManager.renderTplById('myPersonListTpl', _d);
                if (!!append) {
                    $all.append(AllContent);
                    myApp.hideIndicator();
                } else {
                    $all.html(AllContent);
                    myApp.hideIndicator();
                }
            }
            $$('#meetingPersonList').find('li').each(function (index) {
                $$(this).find('.item-num').text(index + 1);
            });

            if (data && (data.length < that.pageSize)) {
                that.showLoadMore(false);

            } else {
                that.showLoadMore(true);
            }
            //$all.show();
            myApp.hideIndicator();
        },
        getPeopleList: function (append, callback) {
            myApp.showIndicator();
            typeof append == 'function' && (callback = append, append = false);
            var that = this;

            this.params || this.initParams();
            var p = {};
            for (var i in that.params) p[i] = that.params[i];

            var id = $$('#meetingInfo').data("id");
            var issee = $$('#meetingInfo').data("issee");

            p['beginIndex'] = this.params['beginIndex']++;
            p['id'] = id;
            p['issee'] = issee;
            p['xh'] = myApp.clientInfo.outid;
            p['customerCode'] = myApp.clientInfo.customerCode;
            myApp.showIndicator();
            _xykApi.getMeeingPersonList(p, function (result) {
                if (result.data) {
                    that.items = that.items + result.data.length;
                    that.render(result.data, append);
                    callback && callback(result);
                    myApp.hideIndicator();
                } else {
                    //  myApp.alert(JSON.stringify(result));
                    myApp.hideIndicator();
                }
            });
        },
        //显示或隐藏 加载更多图标
        showLoadMore: function (flag) {
            var load = $$(".infinite-scroll-preloader");
            if (flag) {
                load.show();
            } else {
                load.hide();
            }
        },
        // 断开 加载更多
        detachScroll: function () {
            var that = this,
                iscroll = $$("#PersonList");

            that.isLast = true;
            // 加载完毕，则注销无限加载事件，以防不必要的加载
            myApp.detachInfiniteScroll(iscroll);

            that.showLoadMore(false);
        },
        /**
         * 打开 加载更多
         */
        attchScroll: function () {
            var that = this,
                iscroll = $$("#PersonList");
            that.isLast = false;
            myApp.attachInfiniteScroll(iscroll);
        },
        // 显示或隐藏 加载更多图标
        showLoadMore: function (flag) {
            var load = $$("#PersonList").find('.infinite-scroll-preloader');
            if (flag) {
                load.show();
            } else {
                load.hide();
            }
        },
        bindEvent: function () {
            var that = this;
            var ptrContent = $$('#PersonList');
            var top = $$("#myDetailBox");
            ptrContent.on('refresh', function () {
                setTimeout(function () {
                    that.initParams();
                    that.getPeopleList(function () {
                        top.scrollTop(0);
                        myApp.pullToRefreshDone();
                    });
                }, 500);
            });

            var iscroll = $$("#myDetailBox"),
                loading = false;
            iscroll.on('infinite', function (e) {
                if (loading) return;
                loading = true;
                setTimeout(function () {
                    that.getPeopleList(true, function () {
                        if (that.items > that.MAX_ITEM) {
                            that.showLoadMore(false);
                        }
                        loading = false;
                    });
                }, 500);
            });

            $$(document).on('click', '.comback', function () {
                mainView.router.back();
            });
        },

        getMeetinInfo: function () {
            var meetdate = $$('#meetingInfo').data("meetdate");

            var p = {
                xh: myApp.clientInfo.outid,
                date: meetdate,
                customerCode: myApp.clientInfo.customerCode
            };
            myApp.showIndicator();
            _xykApi.getMeeingInfo(p, function (result) {
                console.log(result);
                if (result._result) {
                    if (result.data && result.data.length > 0) {
                        var d = {
                            items: result.data
                        };
                        var meetingInfoHtml = tplManager.renderTplById('meetingInfoTpl', d);
                        $$("#meetingInfo").html(meetingInfoHtml);
                        var meetingTitleHtml = tplManager.renderTplById('meetingTitleTpl', d);
                        $$("#meetTitleDiv").html(meetingTitleHtml);
                    }
                    myApp.hideIndicator();
                } else {
                    myApp.alert(result._message);
                    myApp.hideIndicator();
                }

            });
        }
    };
    var detailMeeting = {
        //设置加载 最多条数
        MAX_ITEM: 100,
        //当前条数
        items: 0,
        //每次请求的条数(第一次获取全部)
        pageSize: 20,
        //当月是否全部加载  或者  是否是最后一页(包含 当前条数大于设置的最大条数)
        isLast: true,
        init: function () {
            this.initParams();
            this.bindData();
            this.bindEvent();
        },
        bindData: function () {
            //    this.getMeetinInfo();
            this.getPeopleList();
        },
        initParams: function (params) {
            var that = this;
            this.items = 0;
            this.isLast = false;
            params = params || {};
            params['beginIndex'] = 0;
            params['count'] = that.pageSize;
            this.params = params;
        },

        render: function (data, append) {
            var that = this,
                $all = $$(".meetingMembers").find("ul");
            if (that.items == 0) { //说明没有会议人员
                myApp.alert("没有与会人员信息！");
            } else if (data && data.length > 0) {
                var _d = {
                    items: data
                };
                var AllContent = tplManager.renderTplById('personListTpl', _d);
                if (!!append) {
                    $all.append(AllContent);
                    myApp.hideIndicator();
                } else {
                    $all.html(AllContent);
                    myApp.hideIndicator();
                }
            }
            /* $$('li:first-child').find('.meetingstate').css('display', 'inline');
             $$('#meetingPersonList').find('li').each(function (index) {
                 $$(this).children(":first-child").text(index + 1);
             });
 */
            $$('#meetingPersonList').find('li').each(function (index) {
                $$(this).find('.item-num').text(index + 1);
            });
            if (data && (data.length < that.pageSize)) {
                that.showLoadMore(false);
            } else {
                that.showLoadMore(true);
            }
            //$all.show();
            myApp.hideIndicator();
        },
        getPeopleList: function (append, callback) {
            typeof append == 'function' && (callback = append, append = false);
            var that = this;
            this.params || this.initParams();
            var p = {};
            for (var i in that.params) p[i] = that.params[i];
            var id = $$('#meetingInfo').data("id");
            var issee = $$('#meetingInfo').data("issee");
            p['beginIndex'] = this.params['beginIndex']++;
            p['id'] = id;
            p['issee'] = issee;
            p['xh'] = myApp.clientInfo.outid;
            p['customerCode'] = myApp.clientInfo.customerCode;
            myApp.showIndicator();
            _xykApi.getMeeingPersonList(p, function (result) {
                if (result.data) {
                    that.items = that.items + result.data.length;
                    that.render(result.data, append);
                    callback && callback(result);
                    myApp.hideIndicator();
                } else {
                    myApp.hideIndicator();
                }
            });
        },
        //显示或隐藏 加载更多图标
        showLoadMore: function (flag) {
            var load = $$(".infinite-scroll-preloader");
            if (flag) {
                load.show();
            } else {
                load.hide();
            }
        },
        bindEvent: function () {
            var that = this;
            var ptrContent = $$('#PersonList');

            var top = $$("#detailBox");
            ptrContent.on('refresh', function () {
                setTimeout(function () {
                    that.initParams();
                    that.getPeopleList(function () {
                        top.scrollTop(0);
                        myApp.pullToRefreshDone();
                    });

                }, 500);
            });

            var iscroll = $$("#detailBox"),
                loading = false;
            iscroll.on('infinite', function (e) {
                if (loading) return;
                loading = true;
                setTimeout(function () {
                    that.getPeopleList(true, function () {
                        if (that.items > that.MAX_ITEM) {
                            that.showLoadMore(false);
                        }
                        loading = false;
                    });
                }, 500);
            });

            $$(document).on('click', '.comback', function () {
                mainView.router.back();
            });
        },

        getMeetinInfo: function () {
            var meetdate = $$('#meetingInfo').data("meetdate");
            var p = {
                xh: myApp.clientInfo.outid,
                date: meetdate,
                customerCode: myApp.clientInfo.customerCode
            };
            myApp.showIndicator();
            _xykApi.getMeeingInfo(p, function (result) {
                console.log(result);
                if (result._result) {
                    if (result.data && result.data.length > 0) {
                        var d = {
                            items: result.data
                        };
                        var meetingInfoHtml = tplManager.renderTplById('meetingInfoTpl', d);
                        $$("#meetingInfo").html(meetingInfoHtml);
                        var meetingTitleHtml = tplManager.renderTplById('meetingTitleTpl', d);
                        $$("#meetTitleDiv").html(meetingTitleHtml);
                    }
                } else {
                    myApp.alert(result._message);
                }
                myApp.hideIndicator();
            });
        }
    };
    //我审批的会议列表
    var myApprove = {
        init: function () {
            this.initParam();
            this.bindEvent();
        },
        initParam: function () {
            var that = this;
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var date = d.getDate();
            var day = d.getDay(); //返回一周中的某一天
            var week = that.getWeek(day);
            var newdate = date < 10 ? '0' + date : date;
            var st = year + "-" + month + "-" + newdate + " " + "(" + week + ")";
            var time = year + "-" + month + "-" + date;
            // console.log(time);
            $$("#approve-calendar").val(st);
            that.getMeetingList(time);
        },
        bindEvent: function () {
            var that = this;
            //点击日期，出现日期选择器
            var calendarDateFormat = myApp.calendar({
                input: '#approve-calendar',
                dateFormat: 'yyyy-mm-dd (DD)',
                monthPickerTemplate: '<div class="picker-calendar-month-picker">' +
                    '<a href="#" class="link icon-only picker-calendar-prev-month">' +
                    '<i class="icon icon-prev "></i>' +
                    '</a>' +
                    '<span class="current-month-value"></span>' +
                    '<a href="#" class="link icon-only picker-calendar-next-month">' +
                    '<i class="icon icon-next "></i>' +
                    '</a>' +
                    '</div>',
                yearPickerTemplate: '<div class="picker-calendar-year-picker">' +
                    '<a href="#" class="link icon-only picker-calendar-prev-year">' +
                    '<i class="icon icon-prev "></i>' +
                    '</a>' +
                    '<span class="current-year-value"></span>' +
                    '<a href="#" class="link icon-only picker-calendar-next-year">' +
                    '<i class="icon icon-next "></i>' +
                    '</a>' +
                    '</div>',
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
                dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                closeOnSelect: true,
                onDayClick: function (p, dayContainer, year, month, day) {
                    var thismonth = parseInt(month) + 1;
                    var newMonth = thismonth < 10 ? '0' + thismonth : thismonth;
                    var newDay = day < 10 ? '0' + day : day;
                    var newtime = year + "-" + newMonth + "-" + newDay;
                    console.log(newtime);
                    that.getMeetingList(newtime);
                }
            });
            //会议详情跳转
            $$('.myApprove-list').on('click', 'li a', function () {
                var $thisli = $$(this);
                // var meetdate = $thisli.data("meetdate");
                var id = $thisli.data("id");
                var issee = $thisli.data("issee");
                var time = $thisli.data("time");
                var allnum = $thisli.data("allnum");
                var nocome = $thisli.data("nocome");
                var address = $thisli.data("address");
                var fqrxm = $thisli.data("fqrxm");
                var title = $thisli.data("title");
                var ifagreed = $thisli.data("ifagree");
                var reson = $thisli.data("reson");
                var meetdate = $$('#approve-calendar').val().split(' ')[0];
                var context = {
                    id: id,
                    meetdate: meetdate,
                    issee: issee,
                    time: time,
                    address: address,
                    fqrxm: fqrxm,
                    allnum: allnum,
                    nocome: nocome,
                    title: title,
                    ifagreed: ifagreed,
                    reson: reson
                };
                console.log("---context");
                console.log(context);

                // if (issee == '0') {
                //     mainView.router.loadPage({
                //         url: 'tpl/detailMeeting.html',
                //         context: context
                //     });
                // } else if (issee == '1') {
                    mainView.router.loadPage({
                        url: 'tpl/myDetailApprove.html',
                        context: context
                    });
                // }
            });
            //通过会议
            $$('.myApprove-list').on('click', '.pass-btn', function () {
                var $this = $$(this);
                // var context = {
                //     placeid: $this.data("placeid"),
                //     id: $this.data("id"), //会议id
                //     content: $this.data("content"),
                //     theme: $this.data("theme"),
                //     title: $this.data("title"),
                //     time: $this.data("time"),
                //     date: $$("#approve-calendar").val().split(' ')[0],
                //     dateText: $$("#approve-calendar").val()
                // };
                // console.log(context);
                myApp.confirm("确认通过吗?", function () {
                    var id = $this.data("id");
                    var p = {
                        meetingid: id,
                        customerCode: myApp.clientInfo.customerCode
                    };
                    myApp.showIndicator();
                    // _xykApi.delMeeting(p, function (result) {
                    //     console.log(result);
                    //     if (result.data[0].flag === 100) {
                    //         myApp.alert(result.data[0].msg, function () {
                    //             $thisLi.remove();
                    //         });
                    //     } else {
                    //         myApp.alert(result.data[0].msg);
                    //     }
                    //     myApp.hideIndicator();
                    // });
                });
                // mainView.router.loadPage({
                //     url: 'tpl/editMeeting.html',
                //     context: context
                // });
            });
            //拒绝会议
            $$('.myApprove-list').on('click', '.refuse-btn', function () {
                var $this = $$(this);
                //获取父元素 li
                var $thisLi = $this.parents('li');
                // if ($thisLi.length === 0) return;
                // if ($thisLi.length > 1) $thisLi = $$($thisLi[0]);

                myApp.prompt("请输填写拒绝理由?", function (value) {
                    var id = $this.data("id");
                    var p = {
                        meetingid: id,
                        customerCode: myApp.clientInfo.customerCode
                    };
                    myApp.alert('Your input is "' + value + '". You clicked Ok button');
                    // myApp.showIndicator();
                    // _xykApi.delMeeting(p, function (result) {
                    //     console.log(result);
                    //     if (result.data[0].flag === 100) {
                    //         myApp.alert(result.data[0].msg, function () {
                    //             $thisLi.remove();
                    //         });
                    //     } else {
                    //         myApp.alert(result.data[0].msg);
                    //     }
                    //     myApp.hideIndicator();
                    // });
                });
            });
        },
        //获取会议列表 我发起的
        getMeetingList: function (date) {
            var that = this;
            var p = {};
            p['date'] = date;
            p['enddate'] = date;//新增
            p['xh'] = myApp.clientInfo.outid;
            p['customerCode'] = myApp.clientInfo.customerCode;
            myApp.showIndicator();
            _xykApi.getMeeingInfo(p, function (result) {
                console.log(result);
                var data = result.data;
                if (result._result) {
                    var list = [];
                    for(var i=0;i<data.length;i++){
                        // ISSEE=1是申请跟主持，0是参与
                        if(data[i].issee==="1"){
                            list.push(data[i]);
                        }
                    }
                    data = list;
                    if (data.length > 0) {
                        var _d = {
                            items: data
                        };
                        var myApproveList = tplManager.renderTplById('myApproveListTpl', _d);
                        $$('.myApprove-list').find('ul').html(myApproveList);
                    } else {
                        var tip = '<div class="content-block" style="padding: 0;">' +
                            ' <div class="content-block-inner" style="margin-left: 0;">今天暂时没有要审批的会议</div>' +
                            '</div>';
                        $$('.myApprove-list').find('ul').html(tip);
                    }
                    myApp.hideIndicator();
                } else {
                    myApp.alert(result._message);
                    myApp.hideIndicator();
                }
            });
        },
        getWeek: function (num) {
            var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            return weeks[num];
        }
    };

    var myDetailApprove = {
        //设置加载 最多条数
        MAX_ITEM: 100,
        //当前条数
        items: 0,
        //每次请求的条数(第一次获取全部)
        pageSize: 20,
        //当月是否全部加载  或者  是否是最后一页(包含 当前条数大于设置的最大条数)
        isLast: true,
        init: function () {
            this.initParams();
            this.bindData();
            this.bindEvent();
        },
        bindData: function () {
            // this.getMeetinInfo();
            this.getPeopleList();
        },
        initParams: function (params) {
            var that = this;
            this.items = 0;
            this.isLast = false;

            params = params || {};
            params['beginIndex'] = 0;
            params['count'] = that.pageSize;

            this.params = params;
        },
        render: function (data, append) {
            var that = this,
                $all = $$(".meetingMembers").find("ul");
            if (that.items == 0) { //说明没有会议人员
                var tip = '<div class="content-block">' +
                    ' <div class="content-block-inner tips">无与会人员信息</div>' +
                    '</div>';
                $all.html(tip);
            } else if (data && data.length > 0) {
                var _d = {
                    items: data
                };
                var AllContent = tplManager.renderTplById('myPersonListTpl', _d);
                if (!!append) {
                    $all.append(AllContent);
                    myApp.hideIndicator();
                } else {
                    $all.html(AllContent);
                    myApp.hideIndicator();
                }
            }
            $$('#meetingPersonList').find('li').each(function (index) {
                $$(this).find('.item-num').text(index + 1);
            });

            if (data && (data.length < that.pageSize)) {
                that.showLoadMore(false);

            } else {
                that.showLoadMore(true);
            }
            //$all.show();
            myApp.hideIndicator();
        },
        getPeopleList: function (append, callback) {
            myApp.showIndicator();
            typeof append == 'function' && (callback = append, append = false);
            var that = this;

            this.params || this.initParams();
            var p = {};
            for (var i in that.params) p[i] = that.params[i];

            var id = $$('#meetingInfo').data("id");
            var issee = $$('#meetingInfo').data("issee");

            p['beginIndex'] = this.params['beginIndex']++;
            p['id'] = id;
            p['issee'] = issee;
            p['xh'] = myApp.clientInfo.outid;
            p['customerCode'] = myApp.clientInfo.customerCode;
            myApp.showIndicator();
            _xykApi.getMeeingPersonList(p, function (result) {
                if (result.data) {
                    that.items = that.items + result.data.length;
                    that.render(result.data, append);
                    callback && callback(result);
                    myApp.hideIndicator();
                } else {
                    //  myApp.alert(JSON.stringify(result));
                    myApp.hideIndicator();
                }
            });
        },
        //显示或隐藏 加载更多图标
        showLoadMore: function (flag) {
            var load = $$(".infinite-scroll-preloader");
            if (flag) {
                load.show();
            } else {
                load.hide();
            }
        },
        // 断开 加载更多
        detachScroll: function () {
            var that = this,
                iscroll = $$("#PersonList");

            that.isLast = true;
            // 加载完毕，则注销无限加载事件，以防不必要的加载
            myApp.detachInfiniteScroll(iscroll);

            that.showLoadMore(false);
        },
        /**
         * 打开 加载更多
         */
        attchScroll: function () {
            var that = this,
                iscroll = $$("#PersonList");
            that.isLast = false;
            myApp.attachInfiniteScroll(iscroll);
        },
        // 显示或隐藏 加载更多图标
        showLoadMore: function (flag) {
            var load = $$("#PersonList").find('.infinite-scroll-preloader');
            if (flag) {
                load.show();
            } else {
                load.hide();
            }
        },
        bindEvent: function () {
            var that = this;
            var ptrContent = $$('#PersonList');
            var top = $$("#myDetailBox");
            ptrContent.on('refresh', function () {
                setTimeout(function () {
                    that.initParams();
                    that.getPeopleList(function () {
                        top.scrollTop(0);
                        myApp.pullToRefreshDone();
                    });
                }, 500);
            });

            var iscroll = $$("#myDetailBox"),
                loading = false;
            iscroll.on('infinite', function (e) {
                if (loading) return;
                loading = true;
                setTimeout(function () {
                    that.getPeopleList(true, function () {
                        if (that.items > that.MAX_ITEM) {
                            that.showLoadMore(false);
                        }
                        loading = false;
                    });
                }, 500);
            });

            $$(document).on('click', '.comback', function () {
                mainView.router.back();
            });
        },

        getMeetinInfo: function () {
            var meetdate = $$('#meetingInfo').data("meetdate");

            var p = {
                xh: myApp.clientInfo.outid,
                date: meetdate,
                customerCode: myApp.clientInfo.customerCode
            };
            myApp.showIndicator();
            _xykApi.getMeeingInfo(p, function (result) {
                console.log(result);
                if (result._result) {
                    if (result.data && result.data.length > 0) {
                        var d = {
                            items: result.data
                        };
                        var meetingInfoHtml = tplManager.renderTplById('meetingInfoTpl', d);
                        $$("#meetingInfo").html(meetingInfoHtml);
                        var meetingTitleHtml = tplManager.renderTplById('meetingTitleTpl', d);
                        $$("#meetTitleDiv").html(meetingTitleHtml);
                    }
                    myApp.hideIndicator();
                } else {
                    myApp.alert(result._message);
                    myApp.hideIndicator();
                }

            });
        }
    };

    /***
     * 会议室预约
     * @param page
     */
    var applyMeetingRoom = {
        init: function () {
            this.initParams();
            this.getRoomList()
            this.bindEvent();
        },
        initParams: function () {
            var that = this;
            var today = utils.getNowDateAndWeeks();
            $$('#apply-date').val(today);
            
            var thisDate = utils.getNowDate();
            var placeId = $$('.room-name').data("placeid");
            this.getRoomMeeting(thisDate, placeId);
        },
        getRoomList: function() {
            var today = moment().format("YYYY/MM/DD")

            var limitStartTime = window.sessionStorage.getItem('startTime')
            var limitEndTime = window.sessionStorage.getItem('endTime')
console.log("limitStartTime", limitStartTime, "limitEndTime", limitEndTime)

            var startTime = new Date(today + ' ' + limitStartTime)
            var endTime = new Date(today + ' ' + limitEndTime)

            var limitTimeNum = (endTime - startTime) / 1000 / 60 / 60

            console.log("startTime", startTime, "endTime", endTime, '限制时间相隔：', limitTimeNum)


            
            var dataList = []
            var limitStartTimeHour = parseInt(limitStartTime.split(":")[0])
            for(var i = 0; i <= limitTimeNum; i++) {
                dataList.push({
                    time: limitStartTimeHour + i,
                    endTime: limitStartTimeHour + i + 1,
                    index: i+'1',
                    lastIndex: i+'2'
                })
            }
            console.log("dataList", dataList)
            var _d = {
                items: dataList
            };
            var roomTable = tplManager.renderTplById('roomTableTpl', _d );
             $$('#roomTable').html(roomTable);


        },
        /**
         * 获取当前会议室，某一天使用状态
         */
        getRoomMeeting: function (date, placeid) {
            var that = this;
            //TODO 调接口，查询会议室使用状态
            var p = {
                placeid: placeid,
                date: date,
                xh: myApp.clientInfo.outid,
                customerCode: myApp.clientInfo.customerCode
            };
            console.log("---请求数据");
            console.log(p);
            myApp.showIndicator();
            _xykApi.getMeeingRoomInfo(p, function (result) {
                console.log("会议室信息");
                console.log(result);
                if (result._result) {
                    var meetingList = result.data;
                    // if (meetingList.length !== 0) {
                        var timeList = new Array();
                        for (var i = 0; i < meetingList.length; i++) {
                            var meetingDate = meetingList[i].agreeddate.split(" ")[0];
                            meetingDate = meetingDate.replace(/\//g, "-");
                            var meetingTime = meetingList[i].time;
                            var p = {
                                "fqr": meetingList[i].fqrxm,
                                "meetingDate": meetingDate,
                                "meetingTime": meetingTime
                            };
                            timeList.push(p);
                        }
                        console.log("预约时间列表：");
                        console.log(timeList);
                        that.updateFormStatus(timeList,date);
                    // } else { //今天本会议室还没有被预约
                    // }
                } else {
                    myApp.alert(result._result);
                }
                myApp.hideIndicator();
            });
        },

        checkIsOutTime(date){
            console.log("====123====", date)
            var $checkObj = $$('input[type="checkbox"][name="xzsd"]');
            console.log("====123==== ++++++++", $checkObj)
            $checkObj.each(function (index, domEle) {
                var $currEl = $$('#' + domEle.value);
                var firstTime = $currEl.find('span').data("sdlabel").split("-")[0];
                var itemTime = date.replace("-","/")+" "+firstTime;
                console.log("firstTime", firstTime, itemTime)
                if(new Date(itemTime).getTime()<=new Date().getTime()){
                    $currEl.addClass('time-bkg-gray');
                    $currEl.find('span').text('过期');
                }
            })
        },

        /**
         * 根据当天会议室预约情况，更新页面会议预约状态
         * @param data
         */
        updateFormStatus: function (data,date) {
            this.checkIsOutTime(date);
            for (var i = 0; i < data.length; i++) {
                var times = data[i].meetingTime.split("-");
                var $checkObj = $$('input[type="checkbox"][name="xzsd"]');
                var firstId, lastId;
                $checkObj.each(function (index, domEle) {
                    var $currEl = $$('#' + domEle.value);
                    var firstTime = $currEl.find('span').data("sdlabel").split("-")[0];
                    var lastTime = $currEl.find('span').data("sdlabel").split("-")[1];
                    if (firstTime === times[0]) {
                        firstId = domEle.value;
                    }
                    if (lastTime === times[1]) {
                        lastId = domEle.value;
                    }
                });
                for (var j = parseInt(firstId); j < parseInt(lastId) + 1; j++) {
                    var $currEl = $$('#' + j);
                    $currEl.addClass('time-bkg-gray');
                    $currEl.find('span').text(data[i].fqr + "预定");
                }
            }
        },
        clearFormStatus: function () {
            var $checkObj = $$('input[type="checkbox"][name="xzsd"]');
            $checkObj.each(function (index, domEle) {
                var $currEl = $$('#' + domEle.value);
                $currEl.find('input').removeAttr("checked");
                $currEl.removeClass('time-bkg-gray');
                $currEl.removeClass('time-bkg-blue');
                $currEl.find('span').text("空闲");
            });
        },
        bindEvent: function () {
            var that = this;
            //会议日期选择.点击日期，出现日期选择器
            var calendarDateFormat = myApp.calendar({
                input: '#apply-date',
                dateFormat: 'yyyy-mm-dd (DD)',
                monthPickerTemplate: '<div class="picker-calendar-month-picker">' +
                    '<a href="#" class="link icon-only picker-calendar-prev-month">' +
                    '<i class="icon icon-prev "></i>' +
                    '</a>' +
                    '<span class="current-month-value"></span>' +
                    '<a href="#" class="link icon-only picker-calendar-next-month">' +
                    '<i class="icon icon-next "></i>' +
                    '</a>' +
                    '</div>',
                yearPickerTemplate: '<div class="picker-calendar-year-picker">' +
                    '<a href="#" class="link icon-only picker-calendar-prev-year">' +
                    '<i class="icon icon-prev "></i>' +
                    '</a>' +
                    '<span class="current-year-value"></span>' +
                    '<a href="#" class="link icon-only picker-calendar-next-year">' +
                    '<i class="icon icon-next "></i>' +
                    '</a>' +
                    '</div>',
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
                dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                closeOnSelect: true,
                onDayClick: function (p, dayContainer, year, month, day) {
                    var thismonth = parseInt(month) + 1;
                    var newMonth = thismonth < 10 ? '0' + thismonth : thismonth;
                    var newDay = day < 10 ? '0' + day : day;
                    var newtime = year + "-" + newMonth + "-" + newDay;
                    console.log(newtime);
                    var placeId = $$('.room-name').data("placeid");
                    that.clearFormStatus();
                    that.getRoomMeeting(newtime, placeId);
                }
            });
            var $el = $$('#roomTimeBox');
            $el.on('click', '.js-choose-room', function () {
                var $checkedObjs = $$('input[type="checkbox"][name="xzsd"][checked="true"]');
                if ($$(this).hasClass('time-bkg-gray')) {
                    //已预约状态，不允许进行选中操作。

                } else {
                    if ($$(this).find('input').attr('checked') == 'true') {
                        //取消选中状态
                        var currKey = $$(this).find('input').val();
                        if ($checkedObjs.length < 3) {
                            $$(this).find('input').attr("checked", 'false');
                            $$(this).removeClass('time-bkg-blue');
                            $$(this).find('span').text("空闲");
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
                                    $currEl.removeClass('time-bkg-blue');
                                    $currEl.find('span').text("空闲");
                                });
                            } else {
                                $$(this).find('input').attr("checked", 'false');
                                $$(this).removeClass('time-bkg-blue');
                                $$(this).find('span').text("空闲");
                            }
                        }

                    } else {
                        if ($checkedObjs.length === 0) {
                            $$(this).find('input').attr("checked", 'true');
                            $$(this).addClass('time-bkg-blue');
                            $$(this).find('span').text("选定");
                        } else {
                            var currIndex = parseInt($$(this).find('input').val());
                            var frontIndex = currIndex - 1;
                            var afterIndex = currIndex + 1;
                            var currVal = $$('#' + currIndex).find('span').data("sdlabel").split('-');
                            var frontVal = $$('#' + frontIndex).find('span').data("sdlabel");
                            var afterVal = $$('#' + afterIndex).find('span').data("sdlabel");
                            //支持多选
                            if (currVal.length == 2 && (
                                    ($$('#' + frontIndex).find('input').attr('checked') == 'true' && frontVal && frontVal.split('-').length === 2 && frontVal.split('-')[1] == currVal[0]) ||
                                    ($$('#' + afterIndex).find('input').attr('checked') == 'true' && afterVal && afterVal.split('-').length === 2 && afterVal.split('-')[0] == currVal[1])
                                )) {
                                $$(this).find('input').attr("checked", 'true');
                                $$(this).addClass('time-bkg-blue');
                                $$(this).find('span').text("选定");
                            } else {
                                //清空其他全部已选
                                $checkedObjs.each(function (index, domEle) {
                                    var $currEl = $$('#' + domEle.value);
                                    $currEl.find('input').attr("checked", 'false');
                                    $currEl.removeClass('time-bkg-blue');
                                    $currEl.find('span').text("空闲");
                                });
                                //选中当前
                                $$(this).find('input').attr("checked", 'true');
                                $$(this).addClass('time-bkg-blue');
                                $$(this).find('span').text("预定");
                            }
                        }
                    }
                }
            });

            /**
             * 确认预约
             */
            $$('.ok-btn').on('click', function () {
                var meetingDate = $$('#apply-date').val();
                console.log(meetingDate);
                meetingDate = meetingDate.split(" ")[0];

                var placeId = $$('.room-name').data("placeid");
                var $checkedObjs = $$('input[type="checkbox"][name="xzsd"][checked="true"]');
                //获取相邻的兄弟节点
                if ($checkedObjs.length !== 0) {
                    //算出选择的时间长度
                    var firstIndex = $checkedObjs[0].value;
                    var lastIndex = $checkedObjs[$checkedObjs.length - 1].value;
                    console.log(firstIndex + "--" + lastIndex);
                    var firstTime = $$('#' + firstIndex).find('span').data("sdlabel");
                    var lastTime = $$('#' + lastIndex).find('span').data("sdlabel");
                    console.log("最终选择时段:" + firstTime + "--" + lastTime);
                    var _firstTime = firstTime.split('-')[0];
                    var _lastTime = lastTime.split('-')[1];
                    var choosedTime = _firstTime + '-' + _lastTime;
                    var context = {
                        "startTime": _firstTime,
                        "endTime": _lastTime,
                        "meetingDate": meetingDate,
                        "placeId": placeId,
                        "fqroutid": myApp.clientInfo.outid,
                        "fqrxm": myApp.clientInfo.name
                    };
                    console.log(context);
                    mainView.router.loadPage({
                        url: 'tpl/applyMeeting.html',
                        // pageName: 'applyMeeting',
                        context: context
                    });

                } else {
                    myApp.alert("请选择预约时间");
                }

            });
        }
    };

    var applyMeeting = {
        init: function () {
            this.bindEvent();
        },
        renderPeople: function () {
            var peopleList = JSON.parse(localStorage.getItem("peopleList")) || new Array();
            var names = "";
            var userIds = "";
            var outids = "";
            for (var i = 0; i < peopleList.length; i++) {
                if (i < (peopleList.length - 1)) {
                    names += peopleList[i].name + ",";
                    userIds += peopleList[i].userid + ",";
                    outids += peopleList[i].outid + ",";
                } else {
                    names += peopleList[i].name;
                    userIds += peopleList[i].userid;
                    outids += peopleList[i].outid;
                }
            }
            $$('.chry').find('span').text(names);
            $$('.chry').attr("data-userids", userIds);
            $$('.chry').attr("data-outids", outids);
        },
        bindEvent: function () {
            $$('.add-chry').on('click', function () {
                mainView.router.loadPage({
                    url: 'tpl/addPeople.html?v=2',
                    // context: context
                });
            });

            /**
             * 确认预约
             */
            $$('.apply-ok-btn').on('click', function () {
                var $this = $$(this);
                var hyrq = $this.data("meetingdate");
                var sTime = $this.data("starttime");
                var eTime = $this.data("endtime");
                var hymc = $$('.meeting-name').val();
                var hys = $this.data("placeid");
                var theme = $$('.meeting-theme').val();
                var content = $$('.apply-meeting-content').val();
                var yhry = $$('.chry').data("userids") || "";


                if (hymc === null || hymc === undefined || hymc === '') {
                    myApp.alert("请填写会议名称");
                    return false;
                }
                if (theme === null || theme === undefined || theme === '') {
                    myApp.alert("请填写会议主题");
                    return false;
                }
                if (content === null || content === undefined || content === '') {
                    content = " ";
                }
                var p = {
                    meetingname: hymc,
                    placeid: hys,
                    planstartdate: hyrq,
                    planstart: sTime,
                    planend: eTime,
                    sponsor: myApp.clientInfo.customerid,
                    userids: yhry,
                    customerCode: myApp.clientInfo.customerCode,
                    theme: theme,
                    meetcontent: content
                };
                myApp.confirm("确认提交?", function () {
                    console.log("---新建会议信息:");
                    console.log(p);
                    myApp.showIndicator();
                    _xykApi.addMeeting(p, function (result) {
                        console.log(result);
                        if (result._result) {
                            if (result.data[0].flag === 100) {
                                localStorage.removeItem("peopleList");
                                mainView.router.loadPage({
                                    url: 'tpl/success.html'
                                });
                            } else {
                                myApp.alert(result.data[0].msg);
                            }
                        } else {
                            myApp.alert(result._message);
                        }
                        myApp.hideIndicator();
                    });
                });
            });
        }
    };

    success = {
        init: function () {
            this.bindEvent();
        },
        bindEvent: function () {
            /**
             * 返回首页
             */
            $$('.back-home').on('click', function () {
                window.location.reload();
                // if (isDingTalk()) {
                //     var baseUrl = document.URL.split("#")[0]
                //     window.location.href = baseUrl;
                // } else {
                //     window.location.reload();
                // }
            });
        }
    };

    function pageBeforeInit(page) {
        var name = page.name,
            query = page.query,
            from = page.from;
        console.log("pageBeforeInit:");
        console.log(page);
        switch (name) {
            case 'home':
                home.init();
                break;
            case 'editMeeting':
                if (isDingTalk()) {
                    home.removeBackListen();
                }

                editMeeting.init();
                break;
            case 'addPeople':
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                addPeople.init(query);
                break;
            case 'deptPeople':
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                deptPeople.init();
                break;
            case 'hasChoosedPeople':
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                hasChoosedPeople.init();
                break;
            case 'myMeeting':
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                myMeeting.init();
                break;
            case 'myMeetingFq':
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                myMeetingFq.init();
                break;
            case 'myDetailMeeting':
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                myDetailMeeting.init();
                break;
            case 'detailMeeting':
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                detailMeeting.init();
                break;
            case 'applyMeetingRoom':
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                applyMeetingRoom.init();
                break;
            case 'applyMeeting':
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                applyMeeting.init();
                break;
            case 'success':
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                success.init();
                break;
            case 'searchPeople':
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                searchPeople.init();
                break;
            case 'myApprove': 
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                myApprove.init();
                break;
            case 'myDetailApprove': 
                if (isDingTalk()) {
                    home.removeBackListen();
                }
                myDetailApprove.init();
                break;
        }
    }

    function pageBeforeAnimation(page) {
        var name = page.name,
            query = page.query,
            from = page.from;
        console.log("pageBeforeAnimation:");
        console.log(page);
    }

    function pageAfterAnimation(page) {
        console.log("pageAfterAnimation:");
        console.log(page);
        var name = page.name;
        if (name == 'home') {
            home.addBackListen();
        }
    }

    home.init();
})(Framework7, Dom7, Template7, _xykApi, window._myApp);