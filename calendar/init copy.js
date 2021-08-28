// Initialize your app
(function (Framework7, $$, T7, invokFrontApi, locationAuth) {
  localStorage.removeItem("allow");
  localStorage.removeItem("attendParam");
  // Add views
  var view1 = myApp.addView("#view-1", {
    dynamicNavbar: true,
    domCache: true,
    // pushState:true
  });
  var view2 = myApp.addView("#view-2", {
    dynamicNavbar: true,
    domCache: true,
    // pushState: true
  });
  var view3 = myApp.addView("#view-3", {
    dynamicNavbar: true,
    domCache: true,
    // pushState: true
  });

  $$(document).on("pageBeforeInit", function (e) {
    var page = e.detail.page;
    pageBeforeInit(page);
    //初始化日历选择
    new Jdate({
      el: "#startDate",
      format: "YYYY/MM/DD",
      beginYear: 2000,
      endYear: 2100,
    });
    new Jdate({
      el: "#endDate",
      format: "YYYY/MM/DD",
      beginYear: 2000,
      endYear: 2100,
    });
    new Jdate({
      el: "#startTime",
      format: "YYYY/MM/DD hh:mm",
      beginYear: 2000,
      endYear: 2100,
    });
    new Jdate({
      el: "#endTime",
      format: "YYYY/MM/DD hh:mm",
      beginYear: 2000,
      endYear: 2100,
    });
  });

  $$(document).on("pageAfterAnimation", function (e) {
    var page = e.detail.page;
    pageAfterAnimation(page);
  });

  $$(document).on("pageBeforeAnimation", function (e) {
    var page = e.detail.page;
    pageBeforeAnimation(page);
  });
  $$(document).on("pageBack", function (e) {
    console.log("pageBack:");
    console.log(e);
  });
  $$(document).on("pageAfterBack", function (e) {
    var page = e.detail.page;
    var beforePage = e.detail.fromPage;
  });
  var sysInit = {
    init: function () {
      this.getWXInfo();
    },
    getWXInfo: function () {
      var that = this;
      var param = {};
      var params = {
        method: "WX_BASE_INFO",
        param: param,
      };
      myApp.showIndicator();
      invokFrontApi.WXInfo(params, function (result) {
        console.log("玩校基本信息");
        console.log(result);
        if (result) {
          myApp.hideIndicator();
          if (result.headimg) {
            localStorage.setItem("customPic", result.headimg);
            localStorage.setItem("dptName", result.school_name);

            $$(".user-pic").find("img").attr("src", result.headimg);
            $$(".user-name").html(result.name);
            $$(".user-job").html(result.school_name);
            localStorage.setItem("client", JSON.stringify(result));
            that.getSysParam();
          }
        }
      });
    },
    getSysParam: function () {
      var params = {};
      invokFrontApi.getAttendanceSysParam(params, function (res) {
        console.log("移动考勤系统参数：111111111111111111");
        console.log(res);
        // //测试数据
        // res = {
        //     "_message": "ullamco aliqua",
        //     "_result": true,
        //     "data": [
        //         {
        //             "apply": true,
        //             "clock": true,
        //             "collect": true
        //         },
        //     ],
        //     "totalCount": -25837889.898178414
        // }
        if (res._result) {
          var data = res.data[0];
          //若只开起打卡或三种均不开启，默认只显示打卡界面
          if (
            data.clock == true ||
            (data.clock == false &&
              data.apply == false &&
              data.collect == false)
          ) {
            clockInOrOut.init();
            //只开通了打卡，隐藏下方导航栏
            if (data.apply == true || data.collect == true) {
              console.log("data.apply == true || data.collect == true", $$(".tabbar-labels"))
              $$(".tabbar-labels").show();
              $$(".tab-kq").show();
              if (data.apply == true) {
                if (data.mobilesubmodule) {
                  $$(".tab-apply").attr(
                    "mobilesubmodule",
                    data.mobilesubmodule
                  );
                }
                $$(".tab-apply").show();
              }
              if (data.collect == true) {
                $$(".tab-count").show();
              }
            } else {
              $$(".clock-page-content").attr("style", "padding-bottom:0px");
            }
          } else {
            //修改默认active页
            if (data.apply == true) {
              $$("#view-1").removeClass("active");
              $$(".tab-kq").removeClass("active");
              $$("#view-2").addClass("active");
              $$(".tab-apply").addClass("active");
              console.log(data.mobilesubmodule);
              if (data.mobilesubmodule) {
                $$(".tab-apply").attr("mobilesubmodule", data.mobilesubmodule);
              }
              applyHome.init();
              if (data.collect == true) {
                $$(".tabbar-labels").show();
                $$(".tab-apply").show();
                $$(".tab-count").show();
              }
            } else if (data.collect == true) {
              $$("#view-1").removeClass("active");
              $$(".tab-kq").removeClass("tab-kq");
              $$("#view-3").addClass("active");
              $$(".tab-count").addClass("active");
              countHome.init();
            }
          }
        } else {
          myApp.alert(res._message);
        }
      });
    },
  };

  /**
   * 首页-上班打卡
   * @type {{init: init, getLocation: getLocation, bindEvent: bindEvent}}
   */
  var clockInOrOut = {
    imgArr: [],
    maxNum: 1,
    init: function () {
      this.addBackListen();
      this.initParam();
      this.getAttendanceParam();
      this.bindEvent();
    },
    initParam: function () {
      var today = timeUtils.getNowFormatDateAndWeek();
      $$(".sign-in-datetime").html(today);
      this.getTime();
      this.getClockType();
    },
    /**
     * 首页走秒
     */
    getTime: function () {
      setInterval(function () {
        var now = timeUtils.getNowTime();
        $$(".now-time").html(now);
      }, 1000);
    },
    getClockType: function () {
      $$.ajax({
        url: "api/GetClockType.json",
        dataType: "json",
        success: function (result) {
          console.log("补卡类型：");
          console.log(result);
          if (result) {
            localStorage.setItem("clockType", JSON.stringify(result.data));
            myApp.hideIndicator();
          }
        },
      });
    },
    initLocation: function () {
      var that = this;
      console.log(locationAuth);
      if (locationAuth.getLocation) {
        that.getLocation();
      } else {
        console.log("locationAuth未加载完毕！");
        setTimeout(function () {
          that.initLocation();
        }, 500);
      }
    },
    getLocation: function () {
      var that = this;
      locationAuth.getLocation(function (res) {
        console.log("初始化获取位置信息：");
        console.log(res);
        if (typeof res === "string") {
          res = JSON.parse(res);
        }
        var attendParam = JSON.parse(localStorage.getItem("attendParam"));
        var checkData = {
          myPlace: {
            lat: res.bd_lat,
            lng: res.bd_lng,
          },
          kqPlace: attendParam.place, //单考勤点，圆形考勤区域
          kqArea: attendParam.area, //20200303 多考勤点不规则考勤区域
          maxDistance: attendParam.validscope,
        };
        that.getDistance(checkData);
      });
    },
    showDialogBox: function (html) {
      $$(".clock-page-content").append(html);
    },
    /**
     * 计算当前定位与考勤点距离 单位：米
     * @param param
     * {
     *   myPlace:{lat:"",lng:""},
     *   kqPlace:[{ "placeid":"1","longitude":"200","latitude":"300"},{ "placeid":"2","longitude":"200","latitude":"300"}],
     *   kqArea: [{"areaId": 1,"placeList": [{"lng": "","lat": ""},{"lng": "","lat": ""}]}]
     * }
     */
    getDistance: function (param) {
      console.log("计算距离数据：");
      console.log(param);
      //判断是否存在考勤点，如果没有考勤点，直接外勤打卡
      if (
        param.kqPlace.length == 0 &&
        (!param.kqArea || param.kqArea.length == 0)
      ) {
        //20200303 增加判断是否有不规则考勤区域
        console.log("未设置考勤点");
        var attendParam = JSON.parse(localStorage.getItem("attendParam"));
        console.log("是否开启外勤打开：" + attendParam.isOutClock);
        if (attendParam.isOutClock && attendParam.isOutClock == "3") {
          console.log("禁止外勤打卡");
          $$("#no-out-click-box").show();
          $$("#normal-click-box").hide();
          $$("#out-click-box").hide();
        } else {
          console.log("考勤范围外，外勤打卡");
          $$("#out-click-box").show();
          $$("#normal-click-box").hide();
          $$("#no-out-click-box").hide();
        }
        //单考勤点，圆形考勤区域
      } else if (param.kqPlace.length > 0) {
        console.log("######圆形考勤范围处理");
        var thePlace = null; //考勤范围内打卡的考勤点
        var places = param.kqPlace;
        for (var i = 0; i < places.length; i++) {
          var distance = GetDistance(
            param.myPlace.lat,
            param.myPlace.lng,
            places[i].latitude,
            places[i].longitude
          );
          var maxDistance = param.maxDistance;
          if (typeof maxDistance == "string") {
            maxDistance = parseFloat(maxDistance);
            console.log(
              "max-distance转换后:" + typeof maxDistance + "," + maxDistance
            );
          }
          console.log("距离差:" + distance);
          if (distance <= maxDistance) {
            console.log("#####圆形考勤范围内，正常打卡");
            // 确定考勤点
            thePlace = places[i];
            $$("#out-click-box").hide();
            $$("#normal-click-box").show();
            $$(".normal-click-tips").show();
            $$("#normal-click-tips").show();
            break;
          } else {
            //如果仍不在最后一个考勤点范围内；
            //20200303 add 如果仍不在最后一个考勤范围内，判断是否有不规则考勤区域，如果有，判断是否在不规则考勤，没有设置外勤打卡或禁止打卡
            if (i == places.length - 1) {
              //多考勤点，不规则考勤区域
              if (param.kqArea && param.kqArea.length > 0) {
                console.log(
                  "#######圆形区域对比完毕进入不规则区域考勤范围对比"
                );
                var areaList = param.kqArea;
                var myPoint = new BMap.Point(
                  param.myPlace.lng,
                  param.myPlace.lat
                );
                for (var j = 0; j < areaList.length; j++) {
                  var overLays = new Array();
                  var placeList = areaList[j].placeList;
                  for (var k = 0; k < placeList.length; k++) {
                    overLays.push(
                      new BMap.Point(placeList[k].lng, placeList[k].lat)
                    );
                  }
                  //区域内
                  if (ptInPolygon(myPoint, overLays)) {
                    console.log("#######不规则区域考勤范围内，正常打卡");
                    // 确定考勤点/区域
                    thePlace = {
                      placeid: areaList[j].areaId,
                      longitude: placeList[0].lng,
                      latitude: placeList[0].lat,
                    };
                    $$("#out-click-box").hide();
                    $$("#normal-click-box").show();
                    $$(".normal-click-tips").show();
                    $$("#normal-click-tips").show();
                    break;
                  } else {
                    //区域外
                    if (j == areaList.length - 1) {
                      var attendParam = JSON.parse(
                        localStorage.getItem("attendParam")
                      );
                      console.log(
                        "是否开启外勤打开：" + attendParam.isOutClock
                      );
                      if (
                        attendParam.isOutClock &&
                        attendParam.isOutClock == "3"
                      ) {
                        console.log("######不规则考勤范围外禁止外勤打卡");
                        $$("#no-out-click-box").show();
                        $$("#normal-click-box").hide();
                        $$("#out-click-box").hide();
                      } else {
                        console.log("#######不规则考勤范围外，外勤打卡");
                        $$("#out-click-box").show();
                        $$("#normal-click-box").hide();
                        $$("#no-out-click-box").hide();
                      }
                    }
                  }
                }
              } else {
                /**
                 * 20190806 新增：根据是否开启外勤参数
                 * 未开启：禁止外勤打开
                 * 开启：允许外勤打卡
                 * 兼容前置接口老版本：默认允许外勤打卡
                 **/
                var attendParam = JSON.parse(
                  localStorage.getItem("attendParam")
                );
                // console.log("是否开启外勤打开：" + attendParam.isOutClock);
                if (attendParam.isOutClock && attendParam.isOutClock == "3") {
                  console.log(
                    "####圆形考勤范围外禁止外勤打卡，无不规则考勤范围"
                  );
                  $$("#no-out-click-box").show();
                  $$("#normal-click-box").hide();
                  $$("#out-click-box").hide();
                } else {
                  console.log(
                    "#####圆形考勤范围外，外勤打卡，无不规则考勤范围"
                  );
                  $$("#out-click-box").show();
                  $$("#normal-click-box").hide();
                  $$("#no-out-click-box").hide();
                }
              }
            }
          }
        }
      } else {
        var areaList = param.kqArea;
        var myPoint = new BMap.Point(param.myPlace.lng, param.myPlace.lat);
        for (var j = 0; j < areaList.length; j++) {
          var overLays = new Array();
          var placeList = areaList[j].placeList;
          for (var k = 0; k < placeList.length; k++) {
            overLays.push(new BMap.Point(placeList[k].lng, placeList[k].lat));
          }
          console.info("区域内吗", ptInPolygon(myPoint, overLays));
          //区域内
          if (ptInPolygon(myPoint, overLays)) {
            console.log("########不规则区域考勤范围内，正常打卡");
            // 确定考勤点/区域
            thePlace = {
              placeid: areaList[j].areaId,
              longitude: placeList[0].lng,
              latitude: placeList[0].lat,
            };
            $$("#out-click-box").hide();
            $$("#normal-click-box").show();
            $$(".normal-click-tips").show();
            $$("#normal-click-tips").show();
            break;
          } else {
            //区域外
            if (j == areaList.length - 1) {
              var attendParam = JSON.parse(localStorage.getItem("attendParam"));
              console.log("是否开启外勤打开：" + attendParam.isOutClock);
              if (attendParam.isOutClock && attendParam.isOutClock == "3") {
                console.log("#####不规则考勤范围外，禁止外勤打卡");
                $$("#no-out-click-box").show();
                $$("#normal-click-box").hide();
                $$("#out-click-box").hide();
              } else {
                console.log("######不规则考勤范围外，外勤打卡");
                $$("#out-click-box").show();
                $$("#normal-click-box").hide();
                $$("#no-out-click-box").hide();
              }
            }
          }
        }
      }
      localStorage.setItem("allow", true);
      return thePlace;
    },
    /**
     * 获取审批人信息
     */
    getLeaderInfo: function (param) {
      var that = this;
      var client = JSON.parse(localStorage.getItem("client"));
      var p = {
        outid: client.outid,
        startdate: param.startTime,
        enddate: param.endTime,
        billtype: param.billtype,
        lorotype: param.lorotype,
      };
      console.log("获取审批人信息传参：");
      console.log(p);
      myApp.showIndicator();
      invokFrontApi.getLeader(p, function (result) {
        myApp.hideIndicator();
        console.log("审批人信息：");
        console.log(result);
        if (result._result) {
          if (result.totalCount == 0) {
            var _p = {
              leaderOutid: "0",
              dateTime: param.startTime,
              placeName: param.placeName,
            };
            that.upRecord(_p);
          } else {
            var optionData = {
              name: "xzspr",
              title: "审批人",
              data: result.data,
              xzxxCallback: function (returnOption) {
                console.log("选中的审批人：");
                console.log(returnOption);
                var _p = {
                  leaderOutid: returnOption.returnOutid,
                  dateTime: param.startTime,
                  placeName: param.placeName,
                  processid: returnOption.returnProcessId,
                  approvalroleid: returnOption.returnRoleId,
                };
                that.upRecord(_p);
              },
            };
            showWrap.showDialog(optionData);
          }
        } else {
          myApp.alert(result._message);
        }
      });
    },
    //获取移动考勤打卡参数
    getAttendanceParam: function () {
      var that = this;
      var client = JSON.parse(localStorage.getItem("client"));
      var p = {
        outid: client.outid,
      };
      myApp.showIndicator();
      invokFrontApi.getAttendanceParam(p, function (result) {
        myApp.hideIndicator();
        console.log("移动考勤打卡平台参数：");
        console.log(result);
        if (result._result) {
          var data = result.data[0];
          var attendParam = {
            validscope: data.validscope,
            isOutClock: data.outifagree,
            place: data.place, //单考勤点，圆形考勤区域
            area: data.areaList, //20200303 增加多考勤点，不规则考勤区域
          };
          localStorage.setItem("attendParam", JSON.stringify(attendParam));
          that.initLocation();
        } else {
          myApp.hideIndicator();
          myApp.alert(result._message);
        }
      });
    },
    upRecord: function (params) {
      var that = this;
      //获取补卡类型
      var key = $$(".clock-type").data("key");
      //获取打卡备注
      var outReason = $$(document).find(".out-reason").val();
      var client = JSON.parse(localStorage.getItem("client"));
      var param = {
        opertime: params.dateTime,
        outid: client.outid,
        msg: outReason,
        lorotype: key,
        approvaloutid: params.leaderOutid,
        pic: "",
        placename: params.placeName,
        processid: params.processid,
        approvalroleid: params.approvalroleid,
      };
      console.log("外勤打卡请求参数");
      console.log(param);
      myApp.showIndicator();
      invokFrontApi.upOutRecord(param, function (result) {
        myApp.hideIndicator();
        console.log("外勤打卡记录");
        console.log(result);
        if (result._result) {
          var data = result.data[0];
          var flag = data.flag;
          var p = {
            time: params.dateTime.split(" ")[1],
            tips: "打卡成功！",
          };
          if (flag == 1) {
            //考勤成功
            $$(document).find(".dialog-wrap").remove();
            that.showSuccessView(that, p);
            if (result.data[0].attendid && that.imgArr.length > 0) {
              var param = {
                outid: client.outid,
                billtype: 3, //补卡
                pic: that.imgArr,
                attendId: result.data[0].attendid,
              };
              uploadImgs(param, function (result) {
                console.log("照片上传最终结果;", result);
              });
            }
          } else if (flag == 0) {
            //考勤失败
            myApp.alert(data.msg);
          }
        } else {
          myApp.alert(result._message);
        }
      });
    },
    showOutClickView: function (params) {
      var that = this;
      console.log("###");
      console.log(params);
      var normalDialog =
        '<div class="dialog-wrap">\n' +
        '        <div class="dialog-box">\n' +
        '            <div class="dialog-title">\n' +
        "                确定打卡吗?\n" +
        "            </div>\n" +
        '            <div class="dialog-base-info">\n' +
        '                <div class="dialog-time"><span>打卡时间：</span><span>' +
        params.clickTime +
        "</span></div>\n" +
        '                <div class="dialog-time"><span>打卡地点：</span><span class="place-name" data-hasplace=false>位置名称获取中</span></div>\n' +
        "            </div>\n" +
        '            <div class="dialog-spr-box">\n' +
        '                <div class="list-block">\n' +
        "                    <ul>\n" +
        "                        <li>\n" +
        '                            <a href="#" class="item-link clock-type-link">\n' +
        '                                <div class="item-content">\n' +
        '                                    <!--<div class="item-media"><img src="img/apply0.png" width="30"></div>-->\n' +
        '                                    <div class="item-inner">\n' +
        '                                        <div class="item-title">打卡类型</div>\n' +
        '                                        <div class="item-after clock-type"></div>\n' +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </a>\n" +
        "                        </li>" +
        "                    </ul>\n" +
        "                </div>\n" +
        "            </div>" +
        '            <div class="dialog-reason-box">\n' +
        '                <textarea class="out-reason" placeholder="请填写打卡备注(选填)"></textarea>\n' +
        "            </div>\n" +
        '<div class="dialog-up-pic up-pic-box">' +
        '<div class="pic-title">图片</div>' +
        '<div class="dialog-pics" id="pics-clock">' +
        "<ul>" +
        "</ul>" +
        '<div class="pic-upload-box">';
      if (utils.isWMQY()) {
        normalDialog += '<img src="img/camera.png" class="upload-pic"/>';
      } else {
        normalDialog +=
          '<input type="file" accept="image/*" multiple class="uploadImg"/>' +
          '<img src="img/camera.png" class="upload-pic"/>';
      }
      normalDialog +=
        "</div>" +
        "</div>" +
        "</div>" +
        '            <div class="dialog-btn">\n' +
        '                <div class="dialog-cancel-btn">取消</div>\n' +
        '                <div class="dialog-ok-btn">确认</div>\n' +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>";
      that.showDialogBox(normalDialog);
      // 根据经纬坐标获取位置名称
      invokFrontApi.getLocationName(params.clickPlace, function (res) {
        console.log("位置名称：");
        console.log(res);
        if (res._result) {
          var location = res._message;
          $$(".place-name").attr("data-hasPlace", true);
          $$(".place-name").text(location);
        } else {
          myApp.alert(res._message);
        }
      });
      //选择外勤打卡类型
      $$(".clock-type-link").on("click", function () {
        console.log("选择外勤打卡类型");
        var clockType = JSON.parse(localStorage.getItem("clockType"));
        console.log(clockType);
        var optionData = {
          name: "xzxx",
          title: "外勤打卡类型",
          data: clockType,
          xzxxCallback: function (returnOption) {
            console.log("选中的补卡类型：");
            console.log(returnOption);
            $$(".clock-type").attr("data-value", returnOption.returnValue);
            $$(".clock-type").attr("data-key", returnOption.returnKey);
            $$(".clock-type").html(returnOption.returnValue);
          },
        };
        showWrap.showDialog(optionData);
      });

      $$(".upload-pic").on("click", function () {
        var jsondata = '{"isCrop":1, "ratio":1.4545,"action": "2"}';
        upImg.wmqyUploadImg(jsondata, function (photoBase64Str) {
          that.imgArr.push(photoBase64Str);
          var option = {
            type: "clock",
            num: that.maxNum,
            parDom: ".pic-upload-box",
          };
          upImg.upPicData(option, photoBase64Str);
        });
      });

      //上传照片
      $$(".uploadImg").on("change", function () {
        var files = this.files;
        var length = files.length;
        var file = files[0];
        console.log("file", file)
        upImg.exifCheck(file, function (base64Str) {
          that.imgArr.push(base64Str);
          console.log("that.imgArr", that.imgArr)
          var option = {
            type: "clock",
            num: that.maxNum,
            parDom: ".pic-upload-box",
          };
          upImg.upPicData(option, base64Str);
        });
      });
      /**
       * 删除照片
       */
      $$("#pics-clock")
        .find("ul")
        .on("click", ".js-delete-img", function () {
          var $thisLi = $$(this).parent("li");
          var imgSrc = $thisLi.find("img").data("imgsrc").split(",")[1];
          var index = that.imgArr.indexOf(imgSrc);
          console.info("index:", index);
          if (index > -1) {
            console.log("从数组中删除照片");
            that.imgArr.splice(index, 1);
          }
          $thisLi.remove();
          var $imgBox = $$("#pics-leave");
          var liNum = $imgBox.find("ul").children("li").length;
          if (liNum < that.maxNum) {
            $$(".pic-upload-box").show();
          }
        });

      //点击确认
      $$(".dialog-ok-btn").on("click", function () {
        //查询审批人
        var lorotype = $$(".clock-type").data("key");
        //打卡地点名称
        var clickPlaceName = $$(".place-name").data("hasPlace");
        var clickPlace = $$(".place-name").text();

        console.log(clickPlace);
        console.log(clickPlaceName);
        //判断打卡位置名称是否获取到
        if (clickPlaceName != "true") {
          myApp.alert("未获取到打卡位置名称");
          return false;
        }
        if (lorotype == undefined || lorotype == "" || lorotype == null) {
          myApp.alert("请选择打卡类型！");
          return false;
        }
        //判断是否开启自动审核
        var attendParam = JSON.parse(localStorage.getItem("attendParam"));
        console.log("attendParam");
        console.log(attendParam);
        if (attendParam.isOutClock && attendParam.isOutClock == "2") {
          //开启自动审核
          var _p = {
            leaderOutid: "0",
            dateTime: params.dateTime,
            placeName: clickPlace,
          };
          that.upRecord(_p);
        } else if (attendParam.isOutClock && attendParam.isOutClock == "1") {
          //不自动审核，需要获取审批人
          var _param = {
            startTime: params.dateTime,
            endTime: "",
            billtype: 3, //补签
            lorotype: lorotype,
            placeName: clickPlace,
          };
          that.getLeaderInfo(_param);
        }
      });
      //点击取消
      $$(".dialog-cancel-btn").on("click", function () {
        $$(document).find(".dialog-wrap").remove();
      });
    },
    showSuccessView: function (that, params) {
      var successHtml =
        ' <div class="dialog-wrap">\n' +
        '        <div class="dialog-box">\n' +
        '            <div class="dialog-ok-logo">\n' +
        '              <img src="img/right3.png">' +
        "            </div>\n" +
        '            <div class="dialog-clock-time">' +
        params.time +
        "</div>\n" +
        '            <div class="dialog-clock-success">' +
        params.tips +
        "</div>" +
        '            <div class="dialog-btn">\n' +
        '                <div class="i-know-btn">我知道了</div>\n' +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>";
      that.showDialogBox(successHtml);
      $$(document).on("click", ".i-know-btn", function () {
        $$(document).find(".dialog-wrap").remove();
      });
    },
    bindEvent: function () {
      var that = this;
      var client = JSON.parse(localStorage.getItem("client"));
      /**
       * 重新获取定位
       */
      $$(".re-location").on("click", function () {
        that.initLocation();
      });
      /**
       * 正常考勤打卡
       * 点击打卡时，在获取一次位置信息
       */
      $$(".normal-btn").on("click", function () {
        console.log("正常打卡时手机重新定位");
        locationAuth.getLocation(function (res) {
          var attendParam = JSON.parse(localStorage.getItem("attendParam"));
          var checkData = {
            myPlace: {
              lat: res.bd_lat,
              lng: res.bd_lng,
            },
            kqPlace: attendParam.place,
            kqArea: attendParam.area,
            maxDistance: attendParam.validscope,
          };
          var place = that.getDistance(checkData);
          console.log(that.getDistance(checkData));
          //重新获取定位，判断是否在考勤范围内，如果不在，提示重新获取定位。
          if (place) {
            var isOK = localStorage.getItem("allow")
              ? localStorage.getItem("allow")
              : false;
            if (isOK) {
              var nowTime = timeUtils.getTime();
              var clickTime = nowTime.split(" ")[1];
              var params = {
                opertime: nowTime,
                outid: client.outid,
                placeid: place.placeid, //20191016 正常打卡，增加打卡点id
              };
              myApp.showIndicator();
              invokFrontApi.upNormalRecord(params, function (result) {
                console.log("正常打卡记录");
                console.log(result);
                if (result._result) {
                  myApp.hideIndicator();

                  var data = result.data[0];
                  var flag = data.flag;
                  var p = {
                    time: clickTime,
                    tips: "打卡成功！",
                  };
                  if (flag == 1) {
                    //考勤成功
                    that.showSuccessView(that, p);
                  } else if (flag == 0) {
                    //考勤失败
                    myApp.alert(data.msg);
                  }
                } else {
                  myApp.hideIndicator();
                  // myApp.alert(result._message);
                }
              });
            } else {
              myApp.alert("未获取到定位信息，请重新定位。");
            }
          } else {
            myApp.alert("不在考勤范围内，请重新定位。");
          }
        });
      });
      /**
       * 外勤打卡
       * 点击打卡时在获取一次位置信息
       */
      $$(".out-btn").on("click", function () {
        console.log("外勤打卡时手机重新定位");
        locationAuth.getLocation(function (res) {
          var attendParam = JSON.parse(localStorage.getItem("attendParam"));
          var checkData = {
            myPlace: {
              lat: res.bd_lat,
              lng: res.bd_lng,
            },
            kqPlace: attendParam.place,
            kqArea: attendParam.area,
            maxDistance: attendParam.validscope,
          };
          var aimPlace = that.getDistance(checkData);
          console.log(aimPlace);
          //重新获取定位，判断是否还在考勤范围内，如果不在，提示重新获取位置。
          if (!aimPlace) {
            var isOK = localStorage.getItem("allow")
              ? localStorage.getItem("allow")
              : false;
            if (isOK) {
              var nowTime = timeUtils.getTime();
              var clickTime = nowTime.split(" ")[1];
              var param = {
                clickTime: clickTime,
                dateTime: nowTime,
                clickPlace: {
                  latitude: res.bd_lat,
                  longitude: res.bd_lng,
                },
              };
              that.showOutClickView(param);
            } else {
              myApp.alert("未获取到定位信息，请重新定位。");
            }
          } else {
            myApp.alert("不在考勤范围内，请重新定位。");
          }
        });
      });
      /**
       * 申请模块
       */
      $$(".tab-apply").on("click", function () {
        applyHome.init();
      });
      /**
       * 统计模块
       */
      $$(".tab-count").on("click", function () {
        countHome.init();
      });
    },
    //关闭页面
    closePage: function () {
      console.log(window.isSubApp);
      //钉钉环境，关闭当前页面
      if (window.isSubApp) {
        window.history.back();
      } else {
        dd.biz.navigation.close({
          onSuccess: function (result) {},
          onFail: function (err) {
            console.log(err);
          },
        });
      }
    },
    //监听返回键
    addBackListen: function () {
      var that = this;
      if (window.history && window.history.pushState) {
        console.log("listening....");
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", that.closePage, false); //false阻止默认事件
      }
    },
    //移除监听
    removeBackListen: function () {
      var that = this;
      window.removeEventListener("popstate", that.closePage, false); //false阻止默认事件
      console.log("removeBackListen");
    },
  };
  /**
   * 首页-申请
   * @type {{init: init, bindEvent: bindEvent}}
   */
  var applyHome = {
    init: function () {
      this.computeNavBar();
      this.computeApplyList();
      this.getGetAttendBillsTime();
      this.bindEvent();
    },
    /*动态计算导航tab*/
    computeNavBar() {
      var navListObj = {
        leave:
          '<li class="use-item"><a href="#" class="leave-apply-link"><img src="img/apply1.png"><p>请假</p></a></li>', //"请假申请",
        overtime:
          '<li class="use-item"><a href="#" class="overtime-apply-link"><img src="img/apply2.png"><p>加班</p></a></li>', //"加班申请",
        handorg:
          '<li class="use-item"><a href="#" class="clock-apply-link"><img src="img/apply3.png"><p>补签</p></a></li>', //"补签申请",
        substitute:
          '<li class="use-item"><a href="#" class="relay-apply-link"><img src="img/apply4.png"><p>替班</p></a></li>', //"替班申请",
        cancelLeave:
          '<li class="use-item"><a href="#" class="back-apply-link"><img src="img/apply5.png"><p>销假</p></a></li>', //"销假申请",
        csinfosub:
          '<li class="use-item"><a href="#" class="replace-apply-link"><img src="img/apply6.png"><p>换班</p></a></li>', //"换班申请",
        errand:
          '<li class="use-item"><a href="#" class="travel-apply-link"><img src="img/apply7.png"><p>出差</p></a></li>', //"出差申请"
      };
      var navTxt = $$(".tab-apply").attr("mobilesubmodule");
      var navListArr = [];
      if (navTxt) {
        navListArr = navTxt.split("-");
      } else {
        navListArr = [
          "leave",
          "overtime",
          "handorg",
          "substitute",
          "cancelLeave",
        ];
      }
      var fragMent = "";
      for (var i = 0; i < navListArr.length; i++) {
        var item = navListObj[navListArr[i]];
        fragMent += item;
      }
      $$(".common-use-list ul").html(fragMent);
    },
    computeApplyList() {
      var navListObj = {
        leave:
          '<li><a href="#" class="item-link leave-link"><div class="item-content"><div class="item-media"><img src="img/apply0.png" width="30"></div><div class="item-inner"><div class="item-title">请假次数</div><div class="item-after"><span class="leave-num"></span>次</div></div></div></a></li>', //"请假申请",
        overtime:
          '<li><a href="#" class="item-link overtime-link"><div class="item-content"><div class="item-media"><img src="img/apply0.png" width="30"></div><div class="item-inner"><div class="item-title">加班次数</div><div class="item-after"><span class="overtime-num"></span>次</div></div></div></a></li>', //"加班申请",
        handorg:
          '<li><a href="#" class="item-link bq-link"><div class="item-content"><div class="item-media"><img src="img/apply0.png" width="30"></div><div class="item-inner"><div class="item-title">补签次数</div><div class="item-after"><span class="clock-num"></span>次</div></div></div></a></li>', //"补签申请",
        substitute:
          '<li><a href="#" class="item-link relay-link"><div class="item-content"><div class="item-media"><img src="img/apply0.png" width="30"></div><div class="item-inner"><div class="item-title">替班次数</div><div class="item-after"><span class="relay-num"></span>次</div></div></div></a></li>', //"替班申请",
        cancelLeave:
          '<li><a href="#" class="item-link back-link"><div class="item-content"><div class="item-media"><img src="img/apply0.png" width="30"></div><div class="item-inner"><div class="item-title">销假次数</div><div class="item-after"><span class="back-num"></span>次</div></div></div></a></li>', //"销假申请",
        csinfosub:
          '<li><a href="#" class="item-link replace-link"><div class="item-content"><div class="item-media"><img src="img/apply0.png" width="30"></div><div class="item-inner"><div class="item-title">换班次数</div><div class="item-after"><span class="replace-num"></span>次</div></div></div></a></li>', //"换班申请",
        errand:
          '<li><a href="#" class="item-link travel-link"><div class="item-content"><div class="item-media"><img src="img/apply0.png" width="30"></div><div class="item-inner"><div class="item-title">出差次数</div><div class="item-after"><span class="travel-num"></span>次</div></div></div></a></li>', //"出差申请"
      };
      var navTxt = $$(".tab-apply").attr("mobilesubmodule");
      var navListArr = [];
      if (navTxt) {
        navListArr = navTxt.split("-");
      } else {
        navListArr = [
          "leave",
          "overtime",
          "handorg",
          "substitute",
          "cancelLeave",
        ];
      }
      var fragMent = "";
      for (var i = 0; i < navListArr.length; i++) {
        var item = navListObj[navListArr[i]];
        fragMent += item;
      }
      $$(".my-apply-info ul").html(fragMent);
    },
    /**
     * 首页获取 请假，加班，补签次数，并展示
     */
    getGetAttendBillsTime: function () {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      month = month > 9 ? month : "0" + month;
      var date = year + "-" + month;
      var client = JSON.parse(localStorage.getItem("client"));
      console.log("----client：");
      console.log(client);
      var param = {
        date: date,
        outid: client.outid,
      };
      myApp.showIndicator();
      invokFrontApi.getAttendanceBillsTime(param, function (result) {
        console.log("考勤单次数：");
        console.log(result);
        myApp.hideIndicator();
        if (result) {
          if (result._result) {
            var data = result.data[0];
            var leaveNum = data.leavenum;
            var overtimeNum = data.overtimenum;
            var clockNum = data.handorgnum;
            var relayNum = data.substitutenum;
            var backNum = data.cancelleavenum;
            $$(".leave-num").text(leaveNum);
            $$(".overtime-num").text(overtimeNum);
            $$(".clock-num").text(clockNum);
            $$(".relay-num").text(relayNum);
            $$(".back-num").text(backNum);
          } else {
            myApp.alert(result._message);
          }
        }
      });
    },
    bindEvent: function () {
      /**
       * 请假申请
       */
      $$(".leave-apply-link").on("click", function () {
        view2.router.loadPage({
          url: "tpl/leaveApply.html?ver=" + __config.version,
        });
      });
      /**
       * 加班申请
       */
      $$(".overtime-apply-link").on("click", function () {
        view2.router.loadPage({
          url: "tpl/overtimeApply.html?ver=" + __config.version,
        });
      });
      /**
       * 补签
       */
      $$(".clock-apply-link").on("click", function () {
        view2.router.loadPage({
          url: "tpl/clockApply.html?ver=" + __config.version,
        });
      });
      /**
       * 替班
       */
      $$(".relay-apply-link").on("click", function () {
        view2.router.loadPage({
          url: "tpl/relayApply.html?ver=" + __config.version,
        });
      });
      /**
       * 销假
       */
      $$(".back-apply-link").on("click", function () {
        view2.router.loadPage({
          url: "tpl/backApply.html?ver=" + __config.version,
        });
      });
      /**
       * 我的申请 --更多
       */
      $$(".my-apply-more").on("click", function () {
        view2.router.loadPage({
          url: "tpl/myApply.html",
          context: {
            iFrom: "more",
          },
        });
      });
      /**
       * 我的申请 --请假
       */
      $$(".leave-link").on("click", function () {
        view2.router.loadPage({
          url: "tpl/myApply.html",
          context: {
            iFrom: "leave",
          },
        });
      });
      /**
       * 我的申请 --加班
       */
      $$(".overtime-link").on("click", function () {
        view2.router.loadPage({
          url: "tpl/myApply.html",
          context: {
            iFrom: "overtime",
          },
        });
      });
      /**
       * 我的申请 --补签
       */
      $$(".bq-link").on("click", function () {
        view2.router.loadPage({
          url: "tpl/myApply.html",
          context: {
            iFrom: "bq",
          },
        });
      });
      /**
       * 我的申请--替班
       */
      $$(".relay-link").on("click", function () {
        view2.router.loadPage({
          url: "tpl/myApply.html",
          context: {
            iFrom: "relay",
          },
        });
      });
      /**
       * 我的申请--替班
       */
      $$(".back-link").on("click", function () {
        view2.router.loadPage({
          url: "tpl/myApply.html",
          context: {
            iFrom: "back",
          },
        });
      });
      /**
       * 申请模块
       */
      $$(".tab-apply").on("click", function () {
        applyHome.init();
      });
      /**
       * 统计模块
       */
      $$(".tab-count").on("click", function () {
        countHome.init();
      });
      window.addEventListener(
        "popstate",
        function (e) {
          $$(document).find(".dialog-wrap").remove();
        },
        false
      );
    },
  };
  /**
   * 我的申请列表
   */
  var myApply = {
    // 设置上拉加载 最多条数
    MAX_ITEM: 100,
    // 当前条数
    items: 0,
    // 每次请求的条数(第一次获取全部)
    pagesize: 20,
    // 当月是否全部加载 或者 是否是最后一页(包含 当前条数大于设置的最大条数)
    isLast: false,
    reInit: function (params) {
      this.initParams(params);
      this.getMyApplyList();
    },
    init: function (params) {
      this.initParams(params);
      this.getMyApplyList();
      this.bindEvent();
    },
    initParams: function (params) {
      var that = this;
      var today = new Date();
      var thisYear = today.getFullYear();
      var thisMonth = today.getMonth() + 1;
      thisMonth = thisMonth > 9 ? thisMonth : "0" + thisMonth;
      var thisDate = thisYear + "年" + thisMonth + "月";
      $$(".apply-date").html(thisDate);
      var client = JSON.parse(localStorage.getItem("client"));
      var iFrom = $$("#list-header").data("tig");
      var type;
      if (iFrom === "more") {
        //查询所有类型
        type = "1,2,3,4,5";
      } else if (iFrom === "leave") {
        type = "1";
      } else if (iFrom === "overtime") {
        type = "2";
      } else if (iFrom === "bq") {
        type = "3";
      } else if (iFrom === "relay") {
        type = "4";
      } else if (iFrom === "back") {
        type = "5";
      }
      this.items = 0;
      this.isLast = false;
      params = params || {
        year: thisYear,
        month: thisMonth,
        type: type, //默认查询所有请假流水。
        agreetype: "0,1,2,3,4,5", //默认查询所有审批状态
      };
      params["page"] = "1";
      params["rownum"] = that.pagesize;
      params["outid"] = client.outid;
      this.params = params;
    },

    getMyApplyList: function (append, callback) {
      typeof append === "function" && ((callback = append), (append = false));
      var that = this;
      this.params || this.initParams();
      var p = {};
      for (var i in that.params) p[i] = that.params[i];
      p["page"] = (this.params["page"]++).toString();
      console.log("考勤列表查询接口请求参数：");
      console.log(p);
      myApp.showIndicator();
      invokFrontApi.getAttendList(p, function (result) {
        myApp.hideIndicator();
        console.log("考勤列表信息：");
        console.log(result);
        if (result._result) {
          var attendList = result.data;
          that.items = that.items + result.data.length;
          attendList.forEach(function (item) {
            if (item.billApprovals) {
              item.billApprovals = encodeURIComponent(
                JSON.stringify(item.billApprovals)
              );
            }
          });
          console.log("attendList:", attendList);
          that.render(attendList, append);
          callback && callback(result);
        } else {
          myApp.alert(result._message);
        }
      });
    },
    render: function (data, append) {
      var that = this;
      $all = $$(".my-apply-list").find("ul");
      if (that.items === 0) {
        //说明当前没有记录
        var tip =
          '<div class="noInfo-tip"><img src="img/moren2.fw.png"><div class="noInfo-tip-content">没有考勤单据</div></div>';
        $all.html(tip);
      } else {
        var isFirstLoad = that.items > that.pagesize ? false : true;
        var _d = {
          isFirstLoad: isFirstLoad,
          items: data,
        };
        var AllContent = tplManager.renderTplById("myApplyListTpl", _d);
        if (!!append) {
          $all.append(AllContent);
        } else {
          $all.html(AllContent);
        }
      }
    },
    /**
     * 断开 加载更多
     */
    detachScroll: function () {
      var that = this,
        iscroll = $$("#apply-box");
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
        iscroll = $$("#apply-box");

      that.isLast = false;
      myApp.attachInfiniteScroll(iscroll);
      // that.showLoadMore(true);
    },
    // 显示或隐藏 加载更多图标
    showLoadMore: function (flag) {
      var load = $$("#apply-box").find(".infinite-scroll-preloader");
      if (flag) {
        load.show();
      } else {
        load.hide();
      }
    },

    showDatePicker: function (id, today) {
      var that = this;
      var monthArray = "01 02 03 04 05 06 07 08 09 10 11 12".split(" ");
      var pickerInline = myApp.picker({
        input: id,
        rotateEffect: true,
        toolbarCloseText: "确认",
        toolbarTemplate:
          '<div class="toolbar">' +
          '<div class="toolbar-inner">' +
          '<div class="left">' +
          '<a href="#" class="link close-picker cancel-picker-btn">取消</a>' +
          "</div>" +
          '<div class="right">' +
          '<a href="#" class="link close-picker ok-picker-btn">确认</a>' +
          "</div>" +
          "</div>" +
          "</div>",
        value: [
          today.getFullYear(),
          today.getMonth(),
          today.getDate() < 10 ? "0" + today.getDate() : today.getDate(),
        ],
        onChange: function (picker, values, displayValues) {
          var daysInMonth = new Date(
            picker.value[0],
            picker.value[1] * 1 + 1,
            0
          ).getDate();
          if (values[2] > daysInMonth) {
            picker.cols[4].setValue(daysInMonth);
          }
          choosedTime = {
            year: values[0],
            month: displayValues[1],
          };
        },
        formatValue: function (p, values, displayValues) {
          if (displayValues[1] == null) {
            displayValues[1] = monthArray[values[1]];
          }
          return values[0] + "-" + displayValues[1] + "-" + values[2];
        },
        onOpen: function (picker) {
          console.log("open")
          picker.container.find(".ok-picker-btn").on("click", function () {
            var iFrom = $$("#list-header").data("tig");
            var type;
            if (iFrom === "more") {
              //查询所有类型
              type = "1,2,3,4,5";
            } else if (iFrom === "leave") {
              type = "1";
            } else if (iFrom === "overtime") {
              type = "2";
            } else if (iFrom === "bq") {
              type = "3";
            } else if (iFrom === "relay") {
              type = "4";
            } else if (iFrom === "back") {
              type = "5";
            }
            var ptrContent = $$("#apply-box");
            ptrContent.scrollTop(0);
            // 初始化参数
            that.initParams({
              year: choosedTime.year,
              month: choosedTime.month,
              type: type,
              agreetype: "0,1,2,3,4,5",
            });
            $$(".apply-date").html(
              choosedTime.year + "年" + choosedTime.month + "月"
            );
            // 获取数据
            that.getMyApplyList();
            // 打开加载更多(之前可能断开)
            that.attchScroll();
          });
        },
        cols: [
          {
            values: (function () {
              var y = today.getFullYear();
              var arr = [];
              for (var i = y - 2; i <= y + 1; i++) {
                arr.push(i);
              }
              return arr;
            })(),
            textAlign: "center",
            width: 100,
          },
          {
            divider: true,
            content: "年",
          },
          {
            values: "0 1 2 3 4 5 6 7 8 9 10 11".split(" "),
            displayValues: monthArray,
            textAlign: "center",
            width: 100,
          },
          {
            divider: true,
            content: "月",
          },
        ],
      });
    },
    bindEvent: function () {
      var that = this;
      /**
       * 下拉刷新
       */
      var ptrContent = $$("#apply-box");
      ptrContent.on("refresh", function (e) {
        setTimeout(function () {
          // console.log("下拉刷新");
          var _p = that.params;
          that.initParams(_p); // 刷新 当月
          that.getMyApplyList(function () {
            ptrContent.scrollTop(0);
            myApp.pullToRefreshDone();
          });
          // 打开加载更多(之前可能断开)
          that.attchScroll();
        }, 500);
      });
      /**
       * 上拉加载
       */
      var iscroll = $$("#apply-box"),
        loading = false;
      iscroll.on("infinite", function (e) {
        if (loading) return;
        loading = true;
        setTimeout(function () {
          that.getMyApplyList(true, function () {
            if (that.items > that.MAX_ITEM) {
              that.detachScroll();
            }
            loading = false;
          });
        }, 500);
      });

      var today = new Date();
      that.showDatePicker("#apply-date", today);
      /**
       * 我的申请 --筛选
       */
      $$(".apply-filter-icon").on("click", function () {
        var optionData = {
          stateTitle: "审批状态",
          stateData: [
            {
              key: "0",
              name: "未审批",
            },
            {
              key: "1",
              name: "已审批",
            },
            {
              key: "2",
              name: "无效",
            },
            {
              key: "3",
              name: "已撤销",
            },
            {
              key: "4",
              name: "审批中",
            },
          ],
          typeTitle: "申请类型",
          typeData: [
            {
              key: "1",
              name: "请假",
            },
            {
              key: "2",
              name: "加班",
            },
            {
              key: "3",
              name: "补签",
            },
            {
              key: "4",
              name: "替班",
            },
            {
              key: "5",
              name: "销假",
            },
          ],
          filterCallback: function (returnOption) {
            console.log("选中的筛选条件：");
            console.log(returnOption);
            var stateStr = "";
            var typeStr = "";
            $$.each(returnOption.returnState, function (index, value) {
              stateStr = stateStr + value.returnKey + ",";
            });
            $$.each(returnOption.returnType, function (index, value) {
              typeStr = typeStr + value.returnKey + ",";
            });
            if (stateStr.length > 1) {
              stateStr = stateStr.substring(0, stateStr.length - 1);
            }
            if (typeStr.length > 1) {
              typeStr = typeStr.substring(0, typeStr.length - 1);
            }
            console.log("筛选申请状态字符串：" + stateStr);
            console.log("筛选申请类型字符串：" + typeStr);

            var listDate = $$(".apply-date").html();
            var date1 = listDate;
            var date2 = listDate;
            var year = date1.substring(0, 4);
            var month = date2.substring(5, 7);
            ptrContent.scrollTop(0);
            // 初始化参数
            that.initParams({
              year: year,
              month: month,
              type: typeStr,
              agreetype: stateStr,
            });
            // 获取数据
            that.getMyApplyList();
            // 打开加载更多(之前可能断开)
            that.attchScroll();
          },
        };
        $this = $$(this);
        console.log("show筛选框");
        showWrap.showFilterWarp(optionData);
      });
      /**
       * 我的申请 --详情
       */
      $$("#my-apply-list").on(
        "click",
        "li .my-apply-item-link",
        function (event) {
          var $thisli = $$(this);
          var id = $thisli.data("id");
          var state = $thisli.data("state");
          var billtype = $thisli.data("billtype");
          var billtypecode = $thisli.data("billtypecode");
          var billtypename = $thisli.data("billtypename");
          var starttime = $thisli.data("starttime");
          var endtime = $thisli.data("endtime");
          var msg = $thisli.data("msg");
          var name = $thisli.data("name");
          var outid = $thisli.data("outid");
          var tboutid = $thisli.data("tboutid");
          var tbname = $thisli.data("tbname");
          var shiftid = $thisli.data("shiftid");
          var shiftname = $thisli.data("shiftname");
          var billApprovals = $thisli.data("billApprovals");
          view2.router.loadPage({
            url: "tpl/myApplyDetail.html",
            context: {
              id: id,
              state: state,
              billtype: billtype,
              billtypename: billtypename,
              billtypecode: billtypecode,
              starttime: starttime,
              endtime: endtime,
              msg: msg,
              name: name,
              outid: outid,
              tbname: tbname,
              tboutid: tboutid,
              shiftid: shiftid,
              shiftname: shiftname,
            },
            query: {
              billApprovals: billApprovals,
            },
          });
        }
      );
      /**
       * 未审批/审批中--催办
       */
      $$("#my-apply-list").on("click", "li .urge-btn", function (event) {
        console.log("催办");
        var $this = $$(this);
        var id = $this.data("id");
        var billtype = $this.data("billtype");
        var client = JSON.parse(localStorage.getItem("client"));
        var param = {
          outid: client.outid,
          atendid: id,
          approval_type: billtype,
        };
        myApp.showIndicator();
        invokFrontApi.urge(param, function (result) {
          console.info("催办结果", result);
          myApp.hideIndicator();
          if (result) {
            myApp.alert(result._message);
          }
        });
      });
      //监听浏览器的返回按钮事件
      window.addEventListener(
        "popstate",
        function (e) {
          $$("#filterWrapBox").remove();
          $$(document).find(".picker-modal").remove();
        },
        false
      );
    },
  };
  /**
   * 申请详情
   */
  var myApplyDetail = {
    init: function (query) {
      console.log("----", query);
      this.getImg();
      this.bindEvent();
      this.renderTimeLine(query);
    },
    bindEvent: function () {
      var that = this;
      var motai = $$(document).find("#mo");
      var moimg = $$(document).find("#moimg");
      $$(".img-box").on("click", "img", function () {
        var $this = $$(this);
        motai.show();
        moimg.attr("src", $this[0].src);
      });
      //点击任意地方关闭模态框
      $$(window).on("click", function (event) {
        // console.info("关闭模态框：", event);
        var $target = event.target;
        // console.log($target.closest("#mo"));
        if ($target.closest("#mo")) {
          motai.hide();
        }
      });
      //修改
      $$(".apply-update-btn").on("click", function () {
        var $this = $$(this);
        var billId = $this.data("id");
        var billType = $this.data("billtype");
        if (billType === "1") {
          //请假
          view2.router.loadPage({
            url: "tpl/updateLeaveApply.html",
            context: {
              id: $this.data("id"),
              starttime: $this.data("starttime"),
              endtime: $this.data("endtime"),
              msg: $this.data("msg"),
              billtypename: $this.data("billtypename"),
              billtypecode: $this.data("billtypecode"),
              billtype: $this.data("billtype"),
              billid: $this.data("billid"),
            },
            query: {
              id: $this.data("id"),
              starttime: $this.data("starttime"),
              endtime: $this.data("endtime"),
              msg: $this.data("msg"),
              billtypename: $this.data("billtypename"),
              billtypecode: $this.data("billtypecode"),
              billtype: $this.data("billtype"),
              billid: $this.data("billid"),
            },
          });
        } else if (billType === "2") {
          //加班
          view2.router.loadPage({
            url: "tpl/updateOvertimeApply.html",
            context: {
              id: $this.data("id"),
              starttime: $this.data("starttime"),
              endtime: $this.data("endtime"),
              msg: $this.data("msg"),
              billtypename: $this.data("billtypename"),
              billtypecode: $this.data("billtypecode"),
              billtype: $this.data("billtype"),
              billid: $this.data("billid"),
            },
            query: {
              id: $this.data("id"),
              starttime: $this.data("starttime"),
              endtime: $this.data("endtime"),
              msg: $this.data("msg"),
              billtypename: $this.data("billtypename"),
              billtypecode: $this.data("billtypecode"),
              billtype: $this.data("billtype"),
              billid: $this.data("billid"),
            },
          });
        } else if (billType === "3") {
          //补签
          view2.router.loadPage({
            url: "tpl/updateClockApply.html",
            context: {
              id: $this.data("id"),
              starttime: $this.data("starttime"),
              endtime: $this.data("endtime"),
              msg: $this.data("msg"),
              billtypename: $this.data("billtypename"),
              billtypecode: $this.data("billtypecode"),
              billtype: $this.data("billtype"),
              billid: $this.data("billid"),
            },
            query: {
              id: $this.data("id"),
              starttime: $this.data("starttime"),
              endtime: $this.data("endtime"),
              msg: $this.data("msg"),
              billtypename: $this.data("billtypename"),
              billtypecode: $this.data("billtypecode"),
              billtype: $this.data("billtype"),
              billid: $this.data("billid"),
            },
          });
        } else if (billType === "4") {
          //替班
          view2.router.loadPage({
            url: "tpl/updateRelayApply.html",
            context: {
              id: $this.data("id"),
              starttime: $this.data("starttime"),
              endtime: $this.data("endtime"),
              msg: $this.data("msg"),
              billtypename: $this.data("billtypename"),
              billtypecode: $this.data("billtypecode"),
              billtype: $this.data("billtype"),
              billid: $this.data("billid"),
              tboutid: $this.data("tboutid"),
              tbname: $this.data("tbname"),
              shiftid: $this.data("shiftid"),
              shiftname: $this.data("shiftname"),
            },
            query: {
              id: $this.data("id"),
              starttime: $this.data("starttime"),
              endtime: $this.data("endtime"),
              msg: $this.data("msg"),
              billtypename: $this.data("billtypename"),
              billtypecode: $this.data("billtypecode"),
              billtype: $this.data("billtype"),
              billid: $this.data("billid"),
              tboutid: $this.data("tboutid"),
              tbname: $this.data("tbname"),
              shiftid: $this.data("shiftid"),
              shiftname: $this.data("shiftname"),
            },
          });
        }
      });
      //删除
      $$(".apply-delete-btn").on("click", function () {
        var $this = $$(this);
        var billId = $this.data("billid");
        var billType = $this.data("billtype");
        console.log(billId + "," + billType);
        if (billType === "1") {
          //请假
          that.delLeaveApply(billId);
        } else if (billType === "2") {
          //加班
          that.delOvertimeApply(billId);
        } else if (billType === "3") {
          //补签
          that.delClockApply(billId);
        } else if (billType === "4") {
          //替班
          that.delRelayApply(billId);
        }
      });
    },
    /**
     * 删除请假申请单
     * @param id
     */
    delLeaveApply: function (id) {
      var p = {
        id: id,
      };
      myApp.showIndicator();
      invokFrontApi.delLeave(p, function (result) {
        myApp.hideIndicator();
        if (result._result) {
          if (result.data[0].flag == 0) {
            myApp.alert(result.data[0].msg);
          } else {
            myApp.alert(result.data[0].msg, function () {
              view2.router.back();
            });
          }
        } else {
          myApp.alert(result._message);
        }
      });
    },
    /**
     * 删除加班申请单
     * @param id
     */
    delOvertimeApply: function (id) {
      var p = {
        id: id,
      };
      myApp.showIndicator();
      invokFrontApi.delOvertime(p, function (result) {
        myApp.hideIndicator();
        if (result._result) {
          if (result.data[0].flag == 0) {
            myApp.alert(result.data[0].msg);
          } else {
            myApp.alert(result.data[0].msg, function () {
              view2.router.back();
            });
          }
        } else {
          myApp.alert(result._message);
        }
      });
    },
    /**
     * 删除补卡申请单
     * @param id
     */
    delClockApply: function (id) {
      var p = {
        id: id,
      };
      myApp.showIndicator();
      invokFrontApi.delBQ(p, function (result) {
        myApp.hideIndicator();
        if (result._result) {
          if (result.data[0].flag == 0) {
            myApp.alert(result.data[0].msg);
          } else {
            myApp.alert(result.data[0].msg, function () {
              view2.router.back();
            });
          }
        } else {
          myApp.alert(result._message);
        }
      });
    },
    /**
     * 删除替班申请单
     */
    delRelayApply: function (id) {
      var p = {
        id: id,
      };
      myApp.showIndicator();
      invokFrontApi.delTB(p, function (result) {
        myApp.hideIndicator();
        if (result._result) {
          if (result.data[0].flag == 0) {
            myApp.alert(result.data[0].msg);
          } else {
            myApp.alert(result.data[0].msg, function () {
              view2.router.back();
            });
          }
        } else {
          myApp.alert(result._message);
        }
      });
    },
    /**
     * 获取照片数据
     */
    getImg: function () {
      var client = JSON.parse(localStorage.getItem("client"));
      var p = {
        attendId: $$(".my-apply-detail").data("billid"),
        outid: client.outid,
        billtype: $$(".my-apply-detail").data("billtype"),
      };
      previewImgs(p, function (result) {
        console.info("照片查询结果：", result);
        var $imgBox = $$("#preview-img-box");
        // var pic = result;
        if (result.length > 0) {
          var curHtml = "";
          for (var i = 0; i < result.length; i++) {
            var photoStr =
              "data:image/jpeg;base64," + result[i].replace(/[\r\n]/g, ""); //删除base64换行
            curHtml =
              curHtml +
              '<img src="' +
              photoStr +
              '" alt="" data-imgsrc="' +
              photoStr +
              '">';
          }
          $imgBox.find(".img").append(curHtml);
          $imgBox.show();
        }
      });
    },
    /**
     * 渲染审批进度
     */
    renderTimeLine: function (data) {
      var dataList = JSON.parse(decodeURIComponent(data.billApprovals));
      console.log("dataList", dataList);
      for (var i = 0; i < dataList.length; i++) {
        var firstname = dataList[i].name.substring(0, 1);
        console.log(firstname);
        dataList[i]["firstname"] = firstname;
      }
      if (dataList) {
        $$(".application-status").show();
      }
      var timeLineHtml = tplManager.renderTplById("timeLineTpl", dataList);
      console.log("timeLineHtml", timeLineHtml);
      $$("#time-line").html(timeLineHtml);
    },
  };

  /**
   * 请假申请
   */
  var leaveApply = {
    imgArr: [],
    maxNum: 5,
    init: function () {
      this.initParam();
      this.bindEvent();
      if (utils.isWMQY()) {
        $$(".uploadImg").hide();
      }
    },
    initParam: function () {
      this.imgArr = [];
      this.getLeaveType();
    },
    /**
     * 获取请假类型
     */
    getLeaveType: function () {
      var client = JSON.parse(localStorage.getItem("client"));
      myApp.showIndicator();
      var p = {
        // dpcode: client.dpcode
      };
      invokFrontApi.getLeaveType(p, function (result) {
        myApp.hideIndicator();
        console.log("请假类型：");
        console.log(result);
        if (result._result) {
          localStorage.setItem("leaveType", JSON.stringify(result.data));
        } else {
          myApp.alert(result._message);
        }
      });
    },

    upRecord: function (param) {
      var that = this;
      //获取请假类型
      var key = $$(".leave-type").data("key");
      //请假原因
      var reason = $$(".leave-reason").val();
      //上传照片数据
      // var pics = that.imgArr.join(",");
      var client = JSON.parse(localStorage.getItem("client"));
      var p = {
        outid: client.outid,
        leavetype: parseInt(key),
        starttime: param.startTime,
        endtime: param.endTime,
        msg: reason,
        shiftid: 0, //先默认传0
        approvaloutid: param.leaderOutid,
        pic: "",
        processid: param.processid,
        approvalroleid: param.approvalroleid,
      };
      console.log("请假申请数据");
      console.log(p);
      myApp.showIndicator();
      invokFrontApi.addLeave(p, function (result) {
        myApp.hideIndicator();
        if (result._result) {
          if (result.data[0].flag == 0) {
            myApp.alert(result.data[0].msg);
          } else {
            myApp.alert(result.data[0].msg, function () {
              //提交成功，获取表单id后上传照片。
              //TODO result.data[0].id替换为接口实际字段
              if (result.data[0].attendid && that.imgArr.length > 0) {
                var param = {
                  outid: client.outid,
                  billtype: 1, //请假
                  pic: that.imgArr,
                  attendId: result.data[0].attendid,
                };
                uploadImgs(param, function (result) {
                  console.log("照片上传最终结果;", result);
                });
                view2.router.back();
              } else {
                view2.router.back();
              }
            });
          }
        } else {
          myApp.alert(result._message);
        }
      });
    },
    /**
     * 获取审批人信息
     */
    getLeaderInfo: function (param) {
      var that = this;
      var client = JSON.parse(localStorage.getItem("client"));

      var p = {
        outid: client.outid,
        startdate: param.startTime,
        enddate: param.endTime,
        billtype: param.billtype,
        lorotype: param.lorotype,
      };
      myApp.showIndicator();
      console.log("获取审批人信息传参：");
      console.log(p);
      invokFrontApi.getLeader(p, function (result) {
        myApp.hideIndicator();
        console.log("审批人信息：");
        console.log(result);
        if (result._result) {
          if (result.totalCount == 0) {
            var _p = {
              startTime: param.startTime,
              endTime: param.endTime,
              leaderOutid: "0",
            };
            that.upRecord(_p);
          } else {
            var optionData = {
              name: "xzspr",
              title: "审批人",
              data: result.data,
              xzxxCallback: function (returnOption) {
                console.log("选中的审批人：");
                console.log(returnOption);
                var _p = {
                  startTime: param.startTime,
                  endTime: param.endTime,
                  leaderOutid: returnOption.returnOutid,
                  processid: returnOption.returnProcessId,
                  approvalroleid: returnOption.returnRoleId,
                };
                that.upRecord(_p);
              },
            };
            showWrap.showDialog(optionData);
          }
        } else {
          myApp.alert(result._message);
        }
      });
    },
    bindEvent: function () {
      var that = this;
      //请假类型选择
      $$(".leave-type-link").on("click", function () {
        var leaveType = JSON.parse(localStorage.getItem("leaveType"));
        console.log(leaveType);
        var optionData = {
          name: "xzxx",
          title: "请假类型",
          data: leaveType,
          xzxxCallback: function (returnOption) {
            console.log("选中的上班班次：");
            console.log(returnOption);
            $$(".leave-type").attr("data-value", returnOption.returnValue);
            $$(".leave-type").attr("data-key", returnOption.returnKey);
            $$(".leave-type").html(returnOption.returnValue);
          },
        };
        showWrap.showDialog(optionData);
      });

      //请假时间类型
      $$(".leave-time-type-link").on("click", function () {
        $$.ajax({
          url: "api/GetLeaveTimeType.json",
          dataType: "json",
          success: function (result) {
            console.log("请假时间类型：");
            console.log(result);
            if (result) {
              var optionData = {
                name: "xzxx",
                title: "请假时间类型",
                data: result,
                xzxxCallback: function (returnOption) {
                  console.log("选中的请假时间类型：");
                  console.log(returnOption);
                  $$(".leave-time-type").attr(
                    "data-value",
                    returnOption.returnValue
                  );
                  $$(".leave-time-type").attr(
                    "data-key",
                    returnOption.returnKey
                  );
                  $$(".leave-time-type").html(returnOption.returnValue);
                  if (returnOption.returnKey == 0) {
                    $$(".date-time-box").hide();
                    $$(".date-box").show();
                  } else if (returnOption.returnKey == 1) {
                    $$(".date-time-box").show();
                    $$(".date-box").hide();
                  }
                },
              };
              showWrap.showDialog(optionData);
            }
          },
        });
      });
      //提交请假申请
      $$(".leave-apply-submit-btn").on("click", function () {
        console.info("照片数据：", that.imgArr);
        var lorotype = $$(".leave-type").data("key");
        //增加请假时间类型
        var leaveTimeType = $$(".leave-time-type").data("key");
        var sTime = "";
        var eTime = "";
        var reason = $$(".leave-reason").val();

        if (leaveTimeType == 0) {
            var sTime = $$("#startDate").val();
            var eTime = $$("#endDate").val();
            var startTime = sTime + " 00:00:00";
            var endTime = eTime + " 23:59:00";
          } else {
            var sTime = $$("#startTime").val();
            var eTime = $$("#endTime").val();
            var startTime = sTime + ":00";
            var endTime = eTime + ":00";
          }

        if (lorotype == undefined || lorotype == "" || lorotype == null) {
          myApp.alert("请选择请假类型！");
          return false;
        }
        if (sTime == undefined || sTime == "" || sTime == null) {
          myApp.alert("开始时间不能为空");
          return false;
        }
        if (eTime == undefined || eTime == "" || eTime == null) {
          myApp.alert("结束时间不能为空");
          return false;
        }
        if (reason == undefined || reason == "" || reason == null) {
          myApp.alert("请假原因不能为空");
          return false;
        }

        var stimeNor = new Date(startTime).getTime();
        var etimeNor = new Date(endTime).getTime();
        if (stimeNor >= etimeNor) {
          myApp.alert("结束时间需要大于开始时间");
          return false;
        }

        var _param = {
          startTime: startTime.replace(/\//g, "-"),
          endTime: endTime.replace(/\//g, "-"),
          billtype: 1, //请假
          lorotype: lorotype, //请假类型id
        };
        that.getLeaderInfo(_param);
      });
      //完美企业 api接口上传照片
      $$(".upload-pic").on("click", function () {
        var jsondata = '{"isCrop":1, "ratio":1.4545}';
        upImg.wmqyUploadImg(jsondata, function (photoBase64Str) {
          that.imgArr.push(photoBase64Str);
          var option = {
            type: "leave",
            num: that.maxNum,
            parDom: ".pic-upload-box",
          };
          upImg.upPicData(option, photoBase64Str);
        });
      });
      //input上传照片
      $$(".uploadImg").on("change", function () {
        var files = this.files;
        var length = files.length;
        var file = files[0];
        console.log("that.imgArr file", file)
        upImg.exifCheck(file, function (base64Str) {
          that.imgArr.push(base64Str);
          var option = {
            type: "leave",
            num: that.maxNum,
            parDom: ".pic-upload-box",
          };
          upImg.upPicData(option, base64Str);
        });
        //图像方向角
        /* var Orientation = null;
                  //获取照片方向角属性，用户旋转控制
                  EXIF.getData(file, function () {
                      EXIF.getAllTags(this);
                      Orientation = EXIF.getTag(this, 'Orientation');
                      var reader = new FileReader();
                      var image = new Image();
                      reader.readAsDataURL(file);
                      reader.onload = function (ev) {
                          if (!upImg.detectImageAutomaticRotation()) {
                              upImg.dealImage(ev.target.result, {
                                  quality: 0.2
                              }, Orientation, function (base64Codes) {
                                  var base64Str = base64Codes.split(',')[1];
                                  that.imgArr.push(base64Str);
                                  var option = {type: 'leave', num: that.maxNum, parDom: '.pic-upload-box'};
                                  upImg.upPicData(option, base64Str);
                              });
                          } else {
                              that.imgArr.push(ev.target.result);
                              var option = {type: 'leave', num: that.maxNum, parDom: '.pic-upload-box'};
                              upImg.upPicData(option, ev.target.result);
                          }
                      };
                  });*/
      });
      /**
       * 删除照片
       */
      $$("#pics-leave")
        .find("ul")
        .on("click", ".js-delete-img", function () {
          var $thisLi = $$(this).parent("li");
          var imgSrc = $thisLi.find("img").data("imgsrc").split(",")[1];
          var index = that.imgArr.indexOf(imgSrc);
          console.info("index:", index);
          if (index > -1) {
            console.log("从数组中删除照片");
            that.imgArr.splice(index, 1);
          }
          $thisLi.remove();
          var $imgBox = $$("#pics-leave");
          var liNum = $imgBox.find("ul").children("li").length;
          if (liNum < that.maxNum) {
            $$(".pic-upload-box").show();
          }
        });

      //监听浏览器的返回按钮事件
      window.addEventListener(
        "popstate",
        function (e) {
          var $el = $$(document).find("#dialogWrapBox");
          $el.remove();
        },
        false
      );
      $$(".leave-start-time").on("change", function (e) {
        //2020-10-10T23:01
        document.getElementById("leave-start-time").value = thisTime(
          e.target.value
        );
      });
      $$(".leave-end-time").on("change", function (e) {
        document.getElementById("leave-end-time").value = thisTime(
          e.target.value
        );
      });
    },
  };
  /*
   * 加班申请
   */
  var overtimeApply = {
    imgArr: [],
    init: function () {
      this.initParam();
      this.bindEvent();
    },
    initParam: function () {
      this.getOvertimeType();
    },
    getOvertimeType: function () {
      $$.ajax({
        url: "api/GetOvertimeType.json",
        dataType: "json",
        success: function (result) {
          console.log("加班类型：");
          console.log(result);
          if (result) {
            localStorage.setItem("overtimeType", JSON.stringify(result.data));
            myApp.hideIndicator();
          }
        },
      });
    },
    /**
     * 获取审批人信息
     */
    getLeaderInfo: function (param) {
      var that = this;
      var client = JSON.parse(localStorage.getItem("client"));
      myApp.showIndicator();
      var p = {
        outid: client.outid,
        startdate: param.startTime,
        enddate: param.endTime,
        billtype: param.billtype,
        lorotype: param.lorotype,
      };
      console.log("获取审批人信息传参：");
      console.log(p);
      invokFrontApi.getLeader(p, function (result) {
        console.log("审批人信息：");
        console.log(result);
        if (result._result) {
          if (result.totalCount == 0) {
            var _p = {
              startTime: param.startTime,
              endTime: param.endTime,
              leaderOutid: "0",
            };
            that.upRecord(_p);
          } else {
            var optionData = {
              name: "xzspr",
              title: "审批人",
              data: result.data,
              xzxxCallback: function (returnOption) {
                console.log("选中的审批人：");
                console.log(returnOption);
                var _p = {
                  startTime: param.startTime,
                  endTime: param.endTime,
                  leaderOutid: returnOption.returnOutid,
                  processid: returnOption.returnProcessId,
                  approvalroleid: returnOption.returnRoleId,
                };
                that.upRecord(_p);
              },
            };
            showWrap.showDialog(optionData);
          }
          myApp.hideIndicator();
        } else {
          myApp.alert(result._message);
          myApp.hideIndicator();
        }
      });
    },
    upRecord: function (param) {
      //获取加班类型
      var key = $$(".overtime-type").data("key");
      //请假原因
      var reason = $$(".overtime-reason").val();
      //上传照片数据
      // var pics = that.imgArr.join(",");
      var client = JSON.parse(localStorage.getItem("client"));
      var p = {
        outid: client.outid,
        overtimetype: parseInt(key),
        starttime: param.startTime,
        endtime: param.endTime,
        msg: reason,
        shiftid: 0, //先默认传0
        approvaloutid: param.leaderOutid,
        pic: "",
        processid: param.processid,
        approvalroleid: param.approvalroleid,
      };
      console.log("加班申请数据");
      console.log(p);
      myApp.showIndicator();
      invokFrontApi.addOvertime(p, function (result) {
        if (result._result) {
          if (result.data[0].flag == 0) {
            myApp.alert(result.data[0].msg);
          } else {
            myApp.alert(result.data[0].msg, function () {
              view2.router.back();
            });
          }
        } else {
          myApp.alert(result._message);
        }
        myApp.hideIndicator();
      });
    },
    bindEvent: function () {
      var that = this;
      //加班类型选择
      $$(".overtime-type-link").on("click", function () {
        var overtimeType = JSON.parse(localStorage.getItem("overtimeType"));
        console.log(overtimeType);
        var optionData = {
          name: "xzxx",
          title: "加班类型",
          data: overtimeType,
          xzxxCallback: function (returnOption) {
            console.log("选中的加班类型：");
            console.log(returnOption);
            $$(".overtime-type").attr("data-value", returnOption.returnValue);
            $$(".overtime-type").attr("data-key", returnOption.returnKey);
            $$(".overtime-type").html(returnOption.returnValue);
          },
        };
        showWrap.showDialog(optionData);
      });

      //提交加班申请
      $$(".overtime-apply-submit-btn").on("click", function () {
        //选择审批人
        var lorotype = $$(".overtime-type").data("key");
        //获取加班开始结束时间
        var sTime = $$("#startTime").val();
        var eTime = $$("#endTime").val();
        var reason = $$(".overtime-reason").val();
        if (lorotype == undefined || lorotype == "" || lorotype == null) {
          myApp.alert("请选择加班类型！");
          return false;
        }
        if (sTime == undefined || sTime == "" || sTime == null) {
          myApp.alert("开始时间不能为空");
          return false;
        }
        if (eTime == undefined || eTime == "" || eTime == null) {
          myApp.alert("结束时间不能为空");
          return false;
        }
        if (reason == undefined || reason == "" || reason == null) {
          myApp.alert("加班原因不能为空");
          return false;
        }
        var startTime = sTime + ":00";
        var endTime = eTime + ":00";

        var stimeNor = new Date(startTime).getTime();
        var etimeNor = new Date(endTime).getTime();
        if (stimeNor >= etimeNor) {
          myApp.alert("结束时间需要大于开始时间");
          return false;
        }
        var _param = {
          startTime: startTime.replace(/\//g, "-"),
          endTime: endTime.replace(/\//g, "-"),
          billtype: 2, //加班
          lorotype: lorotype,
        };
        that.getLeaderInfo(_param);
      });
      $$(".overtime-start-time").on("change", function (e) {
        //2020-10-10T23:01
        document.getElementById("overtime-start-time").value = thisTime(
          e.target.value
        );
      });
      $$(".overtime-end-time").on("change", function (e) {
        //2020-10-10T23:01
        document.getElementById("overtime-end-time").value = thisTime(
          e.target.value
        );
      });
    },
  };
  /**
   * 补卡申请
   */
  var clockApply = {
    imgArr: [],
    maxNum: 1,
    init: function () {
      this.initParam();
      this.getClockType();
      this.bindEvent();
      if (utils.isWMQY()) {
        $$(".uploadImg").hide();
      }
    },
    initParam: function () {
      this.imgArr = [];
    },
    getClockType: function () {
      $$.ajax({
        url: "api/GetClockType.json",
        dataType: "json",
        success: function (result) {
          console.log("补卡类型：");
          console.log(result);
          if (result) {
            localStorage.setItem("clockType", JSON.stringify(result.data));
            myApp.hideIndicator();
          }
        },
      });
    },
    upRecord: function (param) {
      var that = this;
      //获取补卡类型
      var key = $$(".clock-type").data("key");
      //请假原因
      var reason = $$(".clock-reason").val();
      //上传照片数据
      // var pics = that.imgArr.join(",");
      var client = JSON.parse(localStorage.getItem("client"));
      var p = {
        outid: client.outid,
        iotype: parseInt(key),
        opertime: param.startTime,
        msg: reason,
        approvaloutid: param.leaderOutid,
        pic: "",
        processid: param.processid,
        approvalroleid: param.approvalroleid,
      };
      console.log("补签申请数据");
      console.log(p);
      myApp.showIndicator();
      invokFrontApi.addBQ(p, function (result) {
        myApp.hideIndicator();
        if (result._result) {
          if (result.data[0].flag == 0) {
            myApp.alert(result.data[0].msg);
          } else {
            myApp.alert(result.data[0].msg, function () {
              //提交成功，获取表单id后上传照片。
              //TODO result.data[0].id替换为接口实际字段
              if (result.data[0].attendid && that.imgArr.length > 0) {
                var param = {
                  outid: client.outid,
                  billtype: 3, //补卡
                  pic: that.imgArr,
                  attendId: result.data[0].attendid,
                };
                uploadImgs(param, function (result) {
                  console.log("照片上传最终结果;", result);
                });
                view2.router.back();
              } else {
                view2.router.back();
              }
            });
          }
        } else {
          myApp.alert(result._message);
        }
      });
    },
    /**
     * 获取审批人信息
     */
    getLeaderInfo: function (param) {
      var that = this;
      var client = JSON.parse(localStorage.getItem("client"));
      myApp.showIndicator();
      var p = {
        outid: client.outid,
        startdate: param.startTime,
        enddate: param.endTime,
        billtype: param.billtype,
        lorotype: param.lorotype,
      };
      console.log("获取审批人信息传参：");
      console.log(p);
      invokFrontApi.getLeader(p, function (result) {
        console.log("审批人信息：");
        console.log(result);
        if (result._result) {
          if (result.totalCount == 0) {
            var _p = {
              startTime: param.startTime,
              endTime: param.endTime,
              leaderOutid: "0",
            };
            that.upRecord(_p);
          } else {
            var optionData = {
              name: "xzspr",
              title: "审批人",
              data: result.data,
              xzxxCallback: function (returnOption) {
                console.log("选中的审批人：");
                console.log(returnOption);
                var _p = {
                  startTime: param.startTime,
                  endTime: param.endTime,
                  leaderOutid: returnOption.returnOutid,
                  processid: returnOption.returnProcessId,
                  approvalroleid: returnOption.returnRoleId,
                };
                that.upRecord(_p);
              },
            };
            showWrap.showDialog(optionData);
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
      //补卡类型选择
      $$(".clock-type-link").on("click", function () {
        var clockType = JSON.parse(localStorage.getItem("clockType"));
        console.log(clockType);
        var optionData = {
          name: "xzxx",
          title: "补卡类型",
          data: clockType,
          xzxxCallback: function (returnOption) {
            console.log("选中的补卡类型：");
            console.log(returnOption);
            $$(".clock-type").attr("data-value", returnOption.returnValue);
            $$(".clock-type").attr("data-key", returnOption.returnKey);
            $$(".clock-type").html(returnOption.returnValue);
          },
        };
        showWrap.showDialog(optionData);
      });
      //审批人选择
      $$(".leader-choose-link").on("click", function () {
        var lorotype = $$(".clock-type").data("key");
        //获取加班开始结束时间
        var sTime = $$(".clock-time").val();
        var startTime = thisTime(sTime);

        if (lorotype == undefined || lorotype == "" || lorotype == null) {
          myApp.alert("请选择补卡类型！");
          return false;
        }
        if (sTime == undefined || sTime == "" || sTime == null) {
          myApp.alert("时间不能为空");
          return false;
        }
        var _param = {
          startTime: startTime,
          endTime: "",
          billtype: 3, //补签
          lorotype: lorotype,
        };
        that.getLeaderInfo(_param);
      });
      //安卓 api接口上传照片
      $$(".upload-pic").on("click", function () {
        var jsondata = '{"isCrop":1, "ratio":1.4545}';
        // {
        //   "isCrop": "1", //"0、不剪切, 1、剪切",
        //   "ratio": "1.4545", //"缩放的高宽比例值，浮点类型；如：2 = 高2，宽1",
        //   "action": "0" //"动作：0（默认，弹窗选择），1直接打开系统相册，2直接打开拍照"
        // };
        upImg.wmqyUploadImg(jsondata, function (photoBase64Str) {
          that.imgArr.push(photoBase64Str);
          var option = {
            type: "clock",
            num: that.maxNum,
            parDom: ".pic-upload-box",
          };
          upImg.upPicData(option, photoBase64Str);
        });
      });
      //上传照片
      $$(".uploadImg").on("change", function () {
        var files = this.files;
        var length = files.length;
        var file = files[0];
        upImg.exifCheck(file, function (base64Str) {
          that.imgArr.push(base64Str);
          var option = {
            type: "clock",
            num: that.maxNum,
            parDom: ".pic-upload-box",
          };
          upImg.upPicData(option, base64Str);
        });
      });
      /**
       * 删除照片
       */
      $$("#pics-clock")
        .find("ul")
        .on("click", ".js-delete-img", function () {
          var $thisLi = $$(this).parent("li");
          var imgSrc = $thisLi.find("img").data("imgsrc").split(",")[1];
          var index = that.imgArr.indexOf(imgSrc);
          console.info("index:", index);
          if (index > -1) {
            console.log("从数组中删除照片");
            that.imgArr.splice(index, 1);
          }
          $thisLi.remove();
          var $imgBox = $$("#pics-leave");
          var liNum = $imgBox.find("ul").children("li").length;
          if (liNum < that.maxNum) {
            $$(".pic-upload-box").show();
          }
        });

      //补卡申请提交
      $$(".clock-apply-submit-btn").on("click", function () {
        //审批人选择
        var lorotype = $$(".clock-type").data("key");
        //获取加班开始结束时间
        var sTime = $$("#startTime").val();
        var reason = $$(".clock-reason").val();
        var startTime = sTime + ":00";
        if (lorotype == undefined || lorotype == "" || lorotype == null) {
          myApp.alert("请选择补卡类型！");
          return false;
        }
        if (sTime == undefined || sTime == "" || sTime == null) {
          myApp.alert("时间不能为空");
          return false;
        }
        if (reason == undefined || reason == "" || reason == null) {
          myApp.alert("补卡原因不能为空");
          return false;
        }
        var _param = {
          startTime: startTime.replace(/\//g, "-"),
          endTime: "",
          billtype: 3, //补签
          lorotype: lorotype,
        };
        that.getLeaderInfo(_param);
      });

      $$(".clock-time").on("change", function (e) {
        //2020-10-10T23:01
        document.getElementById("clock-time").value = thisTime(e.target.value);
      });
    },
  };
  /**
   * 替班申请
   */
  var relayApply = {
    init: function () {
      this.bindEvent();
    },
    getRelayPeople: function () {
      var _relayPeople = JSON.parse(sessionStorage.getItem("relay-people"));
      console.log("----");
      console.log(_relayPeople);
      if (_relayPeople) {
        $$(".relay-people").attr("data-name", _relayPeople.name);
        $$(".relay-people").attr("data-outid", _relayPeople.outid);
        var peoplestr = _relayPeople.name + "(" + _relayPeople.outid + ")";
        $$(".relay-people").html(peoplestr);
      }
    },
    getRelayShift: function (param, callback) {
      invokFrontApi.getRelayShift(param, function (result) {
        if (result._result) {
          if (result.data.length > 0) {
            var _data = result.data[0];
            $$(".relay-shift-type").attr("data-key", _data.key);
            $$(".relay-shift-type").attr("data-name", _data.name);
            $$(".relay-shift-type").html(_data.name);
          } else {
            $$(".relay-shift-type").attr("data-key", "");
            $$(".relay-shift-type").attr("data-name", "");
            $$(".relay-shift-type").html("");
          }
          callback && callback(result.data);
        } else {
          myApp.alert(result._message);
        }
      });
    },
    upRecord: function (param) {
      myApp.showIndicator();
      invokFrontApi.addTB(param, function (result) {
        myApp.hideIndicator();

        if (result._result) {
          myApp.alert(result._message, function () {
            view2.router.back();
          });
        } else {
          myApp.alert(result._message);
        }
      });
    },
    bindEvent: function () {
      var that = this;
      $$(".relay-start-date").on("input propertychange", function (event) {
        $$(".relay-shift-type").attr("data-key", "");
        $$(".relay-shift-type").attr("data-name", "");
        $$(".relay-shift-type").html("");
        var relaySTime = $$(".relay-start-date").val();
        var client = JSON.parse(localStorage.getItem("client"));
        var _param = {
          outid: client.outid,
          shifttype: "0", //班次类型0标准班次1休息班次
          starttime: relaySTime,
          endtime: relaySTime,
        };
        that.getRelayShift(_param);
      });
      // $$(".relay-end-date").on("input propertychange", function (event) {
      //     $$('.relay-shift-type').attr("data-key", '');
      //     $$('.relay-shift-type').attr("data-name", '');
      //     $$('.relay-shift-type').html("");
      // });
      $$(".search-people-link").on("click", function () {
        view2.router.loadPage({
          url: "tpl/searchPeople.html",
        });
      });
      //选择替班班次
      $$(".relay-shift-link").on("click", function () {
        var relaySTime = $$("#startDate").val();
        // var relayETime = $$('.relay-end-date').val();
        if (relaySTime == undefined || relaySTime == "" || relaySTime == null) {
          myApp.alert("时间不能为空");
          return false;
        }
        // if (relayETime == undefined || relayETime == '' || relayETime == null) {
        //     myApp.alert("结束时间不能为空");
        //     return false;
        // }

        var client = JSON.parse(localStorage.getItem("client"));
        var _param = {
          outid: client.outid,
          shifttype: "0", //班次类型0标准班次1休息班次
          starttime: relaySTime.replace(/\//g, "-"),
          endtime: relaySTime.replace(/\//g, "-"),
        };
        that.getRelayShift(_param, function (res) {
          if (res && res.length > 0) {
            var optionData = {
              name: "xzbc",
              title: "班次",
              data: res,
              xzxxCallback: function (returnOption) {
                console.log("选中的班次：");
                console.log(returnOption);
                $$(".relay-shift-type").attr(
                  "data-value",
                  returnOption.returnValue
                );
                $$(".relay-shift-type").attr(
                  "data-key",
                  returnOption.returnKey
                );
                $$(".relay-shift-type").html(returnOption.returnValue);
              },
            };
            showWrap.showDialog(optionData);
          }
        });
      });
      //提交申请
      $$(".relay-apply-submit-btn").on("click", function () {
        var relayMsg = $$(".relay-reason").val();
        var relaySTime = $$("#startDate").val();
        // var relayETime = $$('.relay-end-date').val();
        var relayPeople = $$(".relay-people").data("outid");
        var relayShift = $$(".relay-shift-type").data("key");
        var client = JSON.parse(localStorage.getItem("client"));
        var param = {
          outid: client.outid,
          starttime: relaySTime.replace(/\//g, "-"),
          endtime: relaySTime.replace(/\//g, "-"),
          msg: relayMsg,
          pic: "",
          approvaloutid: relayPeople,
          shiftid: relayShift,
        };
        console.log("提交替班申请：");
        console.log(param);
        if (relaySTime == undefined || relaySTime == "" || relaySTime == null) {
          myApp.alert("时间不能为空");
          return false;
        }
        // if (relayETime == undefined || relayETime == '' || relayETime == null) {
        //     myApp.alert("结束时间不能为空");
        //     return false;
        // }
        if (relayShift == "" || relayShift == undefined || relayShift == null) {
          myApp.alert("请选择班次");
          return false;
        }
        if (
          relayPeople == undefined ||
          relayPeople == "" ||
          relayPeople == null
        ) {
          myApp.alert("请选择替班人");
          return false;
        }
        if (relayMsg == undefined || relayMsg == "" || relayMsg == null) {
          myApp.alert("替班原因不能为空");
          return false;
        }
        that.upRecord(param);
      });
    },
  };

  /**
   * 销假申请
   */
  var backApply = {
    init: function () {
      this.bindEvent();
    },
    bindEvent: function () {
      var that = this;
      //提交销假申请
      $$(".back-apply-submit-btn").on("click", function () {
        //选择审批人
        // var lorotype = $$('.overtime-type').data("key");
        //获取加班开始结束时间
        var sTime = $$("#startTime").val();
        var eTime = $$("#endTime").val();
        var startTime = sTime + ":00";
        var endTime = eTime + ":00";
        var reason = $$(".back-reason").val();
        if (sTime == undefined || sTime == "" || sTime == null) {
          myApp.alert("开始时间不能为空");
          return false;
        }
        if (eTime == undefined || eTime == "" || eTime == null) {
          myApp.alert("结束时间不能为空");
          return false;
        }
        if (reason == undefined || reason == "" || reason == null) {
          myApp.alert("销假原因不能为空");
          return false;
        }
        var stimeNor = new Date(startTime).getTime();
        var etimeNor = new Date(endTime).getTime();
        if (stimeNor >= etimeNor) {
          myApp.alert("结束时间需要大于开始时间");
          return false;
        }
        var _param = {
          startTime: startTime.replace(/\//g, "-"),
          endTime: endTime.replace(/\//g, "-"),
          billtype: 5, //TODO 替换为实际值
        };
        that.getLeaderInfo(_param);
      });
      $$(".back-start-time").on("change", function (e) {
        //2020-10-10T23:01
        document.getElementById("back-start-time").value = thisTime(
          e.target.value
        );
      });
      $$(".back-end-time").on("change", function (e) {
        //2020-10-10T23:01
        document.getElementById("back-end-time").value = thisTime(
          e.target.value
        );
      });
    },
    /**
     * 获取审批人信息
     */
    getLeaderInfo: function (param) {
      var that = this;
      var client = JSON.parse(localStorage.getItem("client"));
      myApp.showIndicator();
      var p = {
        outid: client.outid,
        startdate: param.startTime,
        enddate: param.endTime,
        billtype: param.billtype,
        lorotype: "", //确定类型
      };
      console.log("获取审批人信息传参：");
      console.log(p);
      invokFrontApi.getLeader(p, function (result) {
        console.log("审批人信息：");
        console.log(result);
        if (result._result) {
          if (result.totalCount == 0) {
            var _p = {
              startTime: param.startTime,
              endTime: param.endTime,
              leaderOutid: "0",
            };
            that.upRecord(_p);
          } else {
            var optionData = {
              name: "xzspr",
              title: "审批人",
              data: result.data,
              xzxxCallback: function (returnOption) {
                console.log("选中的审批人：");
                console.log(returnOption);
                var _p = {
                  startTime: param.startTime,
                  endTime: param.endTime,
                  leaderOutid: returnOption.returnOutid,
                  processid: returnOption.returnProcessId,
                  approvalroleid: returnOption.returnRoleId,
                };
                that.upRecord(_p);
              },
            };
            showWrap.showDialog(optionData);
          }
          myApp.hideIndicator();
        } else {
          myApp.alert(result._message);
          myApp.hideIndicator();
        }
      });
    },
    upRecord: function (param) {
      //销假原因
      var reason = $$(".back-reason").val();
      var client = JSON.parse(localStorage.getItem("client"));
      var p = {
        outid: client.outid,
        startdate: param.startTime,
        enddate: param.endTime,
        msg: reason,
        approvaloutid: param.leaderOutid,
        processid: param.processid,
        approvalroleid: param.approvalroleid,
      };
      console.log("销假申请数据");
      console.log(p);
      myApp.showIndicator();
      invokFrontApi.addBack(p, function (result) {
        console.info("销假返回数据", result);
        if (result._result) {
          myApp.alert(result._message, function () {
            view2.router.back();
          });
        } else {
          myApp.alert(result._message);
        }
        myApp.hideIndicator();
      });
    },
  };
  /**
   * 搜索替班人员
   */
  var searchPeople = {
    init: function () {
      sessionStorage.removeItem("relay-people");
      this.bindEvent();
    },
    render: function (param) {
      var memberListHtml = tplManager.renderTplById("memberListTpl", param);
      $$(".search-people-list ul").html(memberListHtml);
      var btnHtml = '<div class="button choose-btn">确认</div>';
      $$(".search-people-list .btn-box").html(btnHtml);
    },
    getPerson: function (p) {
      var that = this;
      var _customerCode = JSON.parse(localStorage.getItem("customerCode"));
      var param = {
        outidname: p, //查询的工号或姓名
        customerCode: _customerCode,
        deptid: 0,
      };
      myApp.showIndicator();
      invokFrontApi.searchPeople(param, function (result) {
        myApp.hideIndicator();
        if (result._result) {
          if (result.data.length <= 0) {
            //查询无果
            var nothingHtml =
              '<li><div class="content-block">' +
              '<div class="content-inner">' +
              '<div class="content-title" style="text-align:center;height: 30px;line-height: 30px;">未查询到人员</div>' +
              "</div></div></li>";
            $$(".search-people-list ul").html(nothingHtml);
          } else {
            var data = result.data;
            var peopleList =
              JSON.parse(localStorage.getItem("peopleList")) || new Array();
            for (var i = 0; i < peopleList.length; i++) {
              for (var j = 0; j < data.length; j++) {
                if (data[j].userid === peopleList[i].userid) {
                  data[j].isChecked = true;
                }
              }
            }
            var p = {
              items: data,
            };
            that.render(p);
          }
        } else {
          myApp.alert(result._message);
        }
      });
    },

    bindEvent: function () {
      var that = this;
      var timer = null;
      var valid = true;
      var tigVal = "";
      //获取搜索框输入的内容进行搜索
      var mySearchbar = myApp.searchbar(".searchbar", {
        searchList: ".list-block-search",
        searchIn: ".item-title",
        customSearch: true,
        onSearch: function () {
          /*   if(!valid){
                           return false
                       }
                       valid=false;
                       setTimeout(function(){
                           var seaechValue = mySearchbar.query;
                           if (seaechValue !== '') {
                               if (that.tigVal === seaechValue) {
                                   //do nothing
                                   return;
                               }
                               that.tigVal = seaechValue;
                               that.getPerson(seaechValue);
                               valid=true
                           }
                       },1000)*/
          if (that.timer) {
            clearTimeout(that.timer);
          }
          //防抖，防止频繁请求
          that.timer = setTimeout(function () {
            var seaechValue = mySearchbar.query;
            if (seaechValue !== "") {
              if (that.tigVal === seaechValue) {
                //do nothing
                return;
              }
              that.tigVal = seaechValue;
              that.getPerson(seaechValue);
            }
          }, 500);
        },
      });

      $$(".search-people-list").on("click", "ul li", function () {
        var $this = $$(this);
        console.log($this.data("name"));
        $this.toggleClass("bg");
        $this.prevAll().removeClass("bg");
        $this.nextAll().removeClass("bg");
        if ($this.hasClass("bg")) {
          $$(".search-people-list .choose-btn").attr(
            "data-outid",
            $this.data("gh")
          );
          $$(".search-people-list .choose-btn").attr(
            "data-name",
            $this.data("name")
          );
        }
      });

      $$(".search-people-list").on("click", ".choose-btn", function () {
        var $this = $$(this);
        var people = {
          name: $this.data("name"),
          outid: $this.data("outid"),
        };
        if ($this.data("name")) {
          sessionStorage.setItem("relay-people", JSON.stringify(people));
        }
        view2.router.back();
      });
    },
  };

  /**
   * 修改请假申请
   */
  var updateLeaveApply = {
    imgArr: [],
    maxNum: 5,
    init: function (query) {
      this.initParam(query);
      this.getLeaveType();
      if (utils.isWMQY()) {
        $$(".uploadImg").hide();
      }
    },
    initParam: function (param) {
      var that = this;
      var startTime = param.starttime;
      var endTime = param.endtime;

      var stime = startTime.split(" ");
      var stimeArr = stime[1].split(":");
      var sT = stime[0] + "T" + stimeArr.join(":");

      var etime = endTime.split(" ");
      var etimeArr = etime[1].split(":");
      var eT = etime[0] + "T" + etimeArr.join(":");

      $$(".update-leave-start-time").val(sT);
      $$(".update-leave-end-time").val(eT);
      $$(".update-leave-type").attr("data-billid", param.billid);
      $$(".update-leave-type").attr("data-value", param.billtypename);
      $$(".update-leave-type").attr("data-key", param.billtypecode);
      $$(".update-leave-type").html(param.billtypename);
      that.getImg(param);
      that.bindEvent();
    },
    /**
     * 获取请假类型
     */
    getLeaveType: function () {
      var p = {
        // dpcode: client.dpcode
      };
      invokFrontApi.getLeaveType(p, function (result) {
        console.log("请假类型：");
        console.log(result);
        if (result._result) {
          localStorage.setItem("leaveType", JSON.stringify(result.data));
        } else {
          myApp.alert(result._message);
        }
        // myApp.hideIndicator();
      });
    },
    bindEvent: function () {
      //请假类型
      var that = this;
      //请假类型选择
      //修改时禁止修改请假类型
      /*  $$('.update-leave-type-link').on('click', function () {
                  var leaveType = JSON.parse(localStorage.getItem("leaveType"));
                  var optionData = {
                      name: 'xzxx',
                      title: '请假类型',
                      data: leaveType,
                      xzxxCallback: function (returnOption) {
                          console.log("选中的上班班次：");
                          console.log(returnOption);
                          $$('.update-leave-type').attr("data-value", returnOption.returnValue);
                          $$('.update-leave-type').attr("data-key", returnOption.returnKey);
                          $$('.update-leave-type').html(returnOption.returnValue);
                      }
                  };
                  showWrap.showDialog(optionData);
              });*/
      //提交修改后的请假申请
      $$(".update-leave-apply-submit-btn").on("click", function () {
        //获取请假类型
        var key = $$(".update-leave-type").data("key");
        var value = $$(".update-leave-type").data("value");
        //获取请假开始结束时间
        var sTime = $$(".update-leave-start-time").val();
        var eTime = $$(".update-leave-end-time").val();

        //请假原因
        var reason = $$(".update-leave-reason").val();
        //上传照片数据
        // var pics = that.imgArr.join(",");
        if (key == undefined || key == "" || key == null) {
          myApp.alert("请选择请假类型！");
          return false;
        }
        if (sTime == undefined || sTime == "" || sTime == null) {
          myApp.alert("开始时间不能为空");
          return false;
        }
        if (eTime == undefined || eTime == "" || eTime == null) {
          myApp.alert("结束时间不能为空");
          return false;
        }
        var startTime = thisTime(sTime);
        var endTime = thisTime(eTime);
        var client = JSON.parse(localStorage.getItem("client"));
        var p = {
          id: $$(".update-leave-type").data("billid"),
          outid: client.outid,
          leavetype: parseInt(key),
          starttime: startTime,
          endtime: endTime,
          msg: reason,
          shiftid: 0, //先默认传0
          pic: "",
        };
        console.log("请假申请数据");
        console.log(p);
        myApp.showIndicator();
        invokFrontApi.updateAttendLeave(p, function (result) {
          myApp.hideIndicator();
          console.log("修改请假申请结果");
          console.log(result);
          if (result._result) {
            if (result.data[0].flag == 0) {
              myApp.alert(result.data[0].msg);
            } else {
              myApp.alert(result.data[0].msg, function () {
                if (result.data[0].attendid) {
                  var param = {
                    outid: client.outid,
                    billtype: 1, //请假
                    pic: that.imgArr,
                    attendId: result.data[0].attendid,
                  };
                  uploadImgs(param, function (result) {
                    console.log("照片上传最终结果;", result);
                  });
                  view2.router.back();
                  setTimeout(function () {
                    view2.router.back();
                  }, 100);
                } else {
                  view2.router.back();
                  setTimeout(function () {
                    view2.router.back();
                  }, 100);
                }
              });
            }
          } else {
            myApp.alert(result._message);
          }
        });
      });

      //安卓 api接口上传照片
      $$(".upload-pic").on("click", function () {
        var jsondata = '{"isCrop":1, "ratio":1.4545}';
        // {
        //   "isCrop": "1", //"0、不剪切, 1、剪切",
        //   "ratio": "1.4545", //"缩放的高宽比例值，浮点类型；如：2 = 高2，宽1",
        //   "action": "0" //"动作：0（默认，弹窗选择），1直接打开系统相册，2直接打开拍照"
        // };
        upImg.wmqyUploadImg(jsondata, function (photoBase64Str) {
          that.imgArr.push(photoBase64Str);
          var option = {
            type: "leave",
            num: that.maxNum,
            parDom: ".pic-upload-box",
          };
          upImg.upPicData(option, photoBase64Str);
        });
      });
      //上传照片
      $$(".uploadImg").on("change", function () {
        var files = this.files;
        var length = files.length;
        var file = files[0];
        upImg.exifCheck(file, function (base64Str) {
          that.imgArr.push(base64Str);
          var option = {
            type: "update-leave",
            num: that.maxNum,
            parDom: ".pic-upload-box",
          };
          upImg.upPicData(option, base64Str);
        });
        //图像方向角
        /* var Orientation = null;
                 //获取照片方向角属性，用户旋转控制
                 EXIF.getData(file, function () {
                     EXIF.getAllTags(this);
                     Orientation = EXIF.getTag(this, 'Orientation');
                     var reader = new FileReader();
                     var image = new Image();
                     reader.readAsDataURL(file);
                     reader.onload = function (ev) {
                         if (!upImg.detectImageAutomaticRotation()) {
                             upImg.dealImage(ev.target.result, {
                                 quality: 0.2
                             }, Orientation, function (base64Codes) {
                                 var base64Str = base64Codes.split(',')[1];
                                 that.imgArr.push(base64Str);
                                 var option = {type: 'update-leave', num: that.maxNum, parDom: '.pic-upload-box'};
                                 upImg.upPicData(option, base64Str);
                             });
                         } else {
                             that.imgArr.push(ev.target.result);
                             var option = {type: 'update-leave', num: that.maxNum, parDom: '.pic-upload-box'};
                             upImg.upPicData(option, ev.target.result);
                         }
                     };
                 });*/
      });
      /**
       * 删除照片
       */
      $$("#pics-update-leave")
        .find("ul")
        .on("click", ".js-delete-img", function () {
          var $thisLi = $$(this).parent("li");
          console.log($thisLi.find("img"));
          var imgSrc = $thisLi.find("img")[0].src.split(",")[1];
          var index = that.imgArr.indexOf(imgSrc);
          console.info("index:", index);
          if (index > -1) {
            console.log("从数组中删除照片");
            that.imgArr.splice(index, 1);
          }
          $thisLi.remove();
          var $imgBox = $$("#pics-update-leave");
          var liNum = $imgBox.find("ul").children("li").length;
          if (liNum < that.maxNum) {
            $$(".pic-upload-box").show();
          }
        });
    },
    /**
     * 获取照片数据
     */
    getImg: function (param) {
      var that = this;
      var client = JSON.parse(localStorage.getItem("client"));
      var p = {
        attendId: param.billid,
        outid: client.outid,
        billtype: param.billtype,
      };
      previewImgs(p, function (result) {
        console.info("照片查询结果：", result);
        var $imgBox = $$("#pics-update-leave");
        that.imgArr = result;
        var curHtml = "";
        for (var i = 0; i < result.length; i++) {
          var photoStr =
            "data:image/jpeg;base64," + result[i].replace(/[\r\n]/g, ""); //删除base64换行
          curHtml =
            curHtml +
            '<li><img src="' +
            photoStr +
            '" alt="" data-imgsrc="' +
            photoStr +
            '"><i class="js-delete-img"></i></li>';
        }
        $imgBox.find("ul").append(curHtml);

        var liNum = $imgBox.find("ul").children("li").length;
        if (liNum < that.maxNum) {
          $$(".pic-upload-box").show();
        } else {
          $$(".pic-upload-box").hide();
        }
      });
    },
  };
  /**
   * 修改加班申请
   */
  var updateOvertimeApply = {
    // imgArr: [],
    init: function (query) {
      this.initParams(query);
      this.getOvertimeType();
    },
    initParams: function (param) {
      var that = this;
      var startTime = param.starttime;
      var endTime = param.endtime;

      var stime = startTime.split(" ");
      var stimeArr = stime[1].split(":");
      var sT = stime[0] + "T" + stimeArr.join(":");

      var etime = endTime.split(" ");
      var etimeArr = etime[1].split(":");
      var eT = etime[0] + "T" + etimeArr.join(":");

      $$(".update-overtime-start-time").val(sT);
      $$(".update-overtime-end-time").val(eT);
      $$(".update-overtime-type").attr("data-billid", param.billid);
      $$(".update-overtime-type").attr("data-value", param.billtypename);
      $$(".update-overtime-type").attr("data-key", param.billtypecode);

      $$(".update-overtime-type").html(param.billtypename);
      that.bindEvent();
    },
    getOvertimeType: function () {
      $$.ajax({
        url: "api/GetOvertimeType.json",
        dataType: "json",
        success: function (result) {
          console.log("加班类型：");
          console.log(result);
          if (result) {
            localStorage.setItem("overtimeType", JSON.stringify(result.data));
            myApp.hideIndicator();
          }
        },
      });
    },
    bindEvent: function () {
      var that = this;
      //加班类型选择
      //修改时，禁止修改加班类型
      /*$$('.update-overtime-type-link').on('click', function () {
                var overtimeType = JSON.parse(localStorage.getItem("overtimeType"));
                var optionData = {
                    name: 'xzxx',
                    title: '加班类型',
                    data: overtimeType,
                    xzxxCallback: function (returnOption) {
                        console.log("选中的加班类型：");
                        console.log(returnOption);
                        $$('.overtime-type').attr("data-value", returnOption.returnValue);
                        $$('.overtime-type').attr("data-key", returnOption.returnKey);
                        $$('.overtime-type').html(returnOption.returnValue);
                    }
                };
                showWrap.showDialog(optionData);
            });*/

      //提交修改后的请假申请
      $$(".update-overtime-apply-submit-btn").on("click", function () {
        //获取请假类型
        var key = $$(".update-overtime-type").data("key");
        var value = $$(".update-overtime-type").data("value");
        //获取请假开始结束时间
        var sTime = $$(".update-overtime-start-time").val();
        var eTime = $$(".update-overtime-end-time").val();

        //请假原因
        var reason = $$(".update-overtime-reason").val();
        //上传照片数据
        // var pics = that.imgArr.join(",");
        if (key == undefined || key == "" || key == null) {
          myApp.alert("请选择加班类型！");
          return false;
        }
        if (sTime == undefined || sTime == "" || sTime == null) {
          myApp.alert("开始时间不能为空");
          return false;
        }
        if (eTime == undefined || eTime == "" || eTime == null) {
          myApp.alert("结束时间不能为空");
          return false;
        }
        var startTime = thisTime(sTime);
        var endTime = thisTime(eTime);
        var client = JSON.parse(localStorage.getItem("client"));
        var p = {
          id: $$(".update-overtime-type").data("billid"),
          outid: client.outid,
          leavetype: parseInt(key),
          starttime: startTime,
          endtime: endTime,
          msg: reason,
          shiftid: 0, //先默认传0
          pic: "",
        };
        console.log("修改加班申请数据");
        console.log(p);
        myApp.showIndicator();
        invokFrontApi.updateAttendOvertime(p, function (result) {
          myApp.hideIndicator();
          console.log("修改加班申请结果");
          console.log(result);
          if (result._result) {
            if (result.data[0].flag == 0) {
              myApp.alert(result.data[0].msg);
            } else {
              myApp.alert(result.data[0].msg, function () {
                view2.router.back();
                setTimeout(function () {
                  view2.router.back();
                }, 100);
              });
            }
          } else {
            myApp.alert(result._message);
          }
        });
      });
    },
  };
  /**
   * 修改补签申请
   */
  var updateClockApply = {
    imgArr: [],
    maxNum: 1,
    init: function (query) {
      this.initParam(query);
      this.getClockType();
      if (utils.isWMQY()) {
        $$(".uploadImg").hide();
      }
    },
    initParam: function (param) {
      var that = this;
      var startTime = param.starttime;
      var endTime = param.endtime;

      if (param.billtypecode == 0) {
        var stime = startTime.split(" ");
        var stimeArr = stime[1].split(":");
        var Time = stime[0] + "T" + stimeArr.join(":");
      } else if (param.billtypecode == 1) {
        var etime = endTime.split(" ");
        var etimeArr = etime[1].split(":");
        var Time = etime[0] + "T" + etimeArr.join(":");
      }
      $$(".update-clock-time").val(Time);
      $$(".update-clock-type").attr("data-billid", param.billid);
      $$(".update-clock-type").attr("data-value", param.billtypename);
      $$(".update-clock-type").attr("data-key", param.billtypecode);
      $$(".update-clock-type").html(param.billtypename);
      that.getImg(param);
      that.bindEvent();
    },
    getClockType: function () {
      $$.ajax({
        url: "api/GetClockType.json",
        dataType: "json",
        success: function (result) {
          console.log("补卡类型：");
          console.log(result);
          if (result) {
            localStorage.setItem("clockType", JSON.stringify(result.data));
            myApp.hideIndicator();
          }
        },
      });
    },
    bindEvent: function () {
      var that = this;
      //补卡类型选择
      //修改时，禁止修改补卡类型
      /*$$('.update-clock-type-link').on('click', function () {
                var clockType = JSON.parse(localStorage.getItem("clockType"));
                console.log(clockType);
                var optionData = {
                    name: 'xzxx',
                    title: '补卡类型',
                    data: clockType,
                    xzxxCallback: function (returnOption) {
                        console.log("选中的补卡类型：");
                        console.log(returnOption);
                        $$('.clock-type').attr("data-value", returnOption.returnValue);
                        $$('.clock-type').attr("data-key", returnOption.returnKey);
                        $$('.clock-type').html(returnOption.returnValue);
                    }
                };
                showWrap.showDialog(optionData);
            });*/

      //补卡申请提交
      $$(".update-clock-apply-submit-btn").on("click", function () {
        console.info("修改照片数据：", that.imgArr);
        //获取请假类型
        var key = $$(".update-clock-type").data("key");
        var value = $$(".update-clock-type").data("value");
        //获取请假开始结束时间
        var sTime = $$(".update-clock-time").val();
        //请假原因
        var reason = $$(".update-clock-reason").val();
        //上传照片数据
        // var pics = that.imgArr.join(",");
        if (key == undefined || key == "" || key == null) {
          myApp.alert("请选择补卡类型！");
          return false;
        }
        if (sTime == undefined || sTime == "" || sTime == null) {
          myApp.alert("补卡时间不能为空");
          return false;
        }
        var startTime = thisTime(sTime);
        var client = JSON.parse(localStorage.getItem("client"));
        var p = {
          id: $$(".update-clock-type").data("billid"),
          outid: client.outid,
          iotype: parseInt(key),
          opertime: startTime,
          msg: reason,
          pic: "",
        };
        console.log("修改补签申请数据");
        console.log(p);
        myApp.showIndicator();
        invokFrontApi.updateAttendBQ(p, function (result) {
          myApp.hideIndicator();
          if (result._result) {
            if (result.data[0].flag == 0) {
              myApp.alert(result.data[0].msg);
            } else {
              myApp.alert(result.data[0].msg, function () {
                if (result.data[0].attendid) {
                  var param = {
                    outid: client.outid,
                    billtype: 3, //补卡
                    pic: that.imgArr,
                    attendId: result.data[0].attendid,
                  };
                  uploadImgs(param, function (result) {
                    console.log("照片上传最终结果;", result);
                  });
                  view2.router.back();
                  setTimeout(function () {
                    view2.router.back();
                  }, 100);
                } else {
                  view2.router.back();
                  setTimeout(function () {
                    view2.router.back();
                  }, 100);
                }
              });
            }
          } else {
            myApp.alert(result._message);
          }
        });
      });

      //安卓 api接口上传照片
      $$(".upload-pic").on("click", function () {
        var jsondata = '{"isCrop":1, "ratio":1.4545}';
        // {
        //   "isCrop": "1", //"0、不剪切, 1、剪切",
        //   "ratio": "1.4545", //"缩放的高宽比例值，浮点类型；如：2 = 高2，宽1",
        //   "action": "0" //"动作：0（默认，弹窗选择），1直接打开系统相册，2直接打开拍照"
        // };
        upImg.wmqyUploadImg(jsondata, function (photoBase64Str) {
          that.imgArr.push(photoBase64Str);
          var option = {
            type: "update-clock",
            num: that.maxNum,
            parDom: ".pic-upload-box",
          };
          upImg.upPicData(option, photoBase64Str);
        });
      });
      //上传照片
      $$(".uploadImg").on("change", function () {
        var files = this.files;
        var length = files.length;
        var file = files[0];
        upImg.exifCheck(file, function (base64Str) {
          that.imgArr.push(base64Str);
          var option = {
            type: "update-clock",
            num: that.maxNum,
            parDom: ".pic-upload-box",
          };
          upImg.upPicData(option, base64Str);
        });
      });
      /**
       * 删除照片
       */
      $$("#pics-update-clock")
        .find("ul")
        .on("click", ".js-delete-img", function () {
          var $thisLi = $$(this).parent("li");
          console.log($thisLi.find("img"));
          var imgSrc = $thisLi.find("img")[0].src.split(",")[1];
          var index = that.imgArr.indexOf(imgSrc);
          console.info("index:", index);
          if (index > -1) {
            console.log("从数组中删除照片");
            that.imgArr.splice(index, 1);
          }
          $thisLi.remove();
          var $imgBox = $$("#pics-update-clock");
          var liNum = $imgBox.find("ul").children("li").length;
          if (liNum < that.maxNum) {
            $$(".pic-upload-box").show();
          }
        });
    },
    /**
     * 获取照片数据
     */
    getImg: function (param) {
      var that = this;
      var client = JSON.parse(localStorage.getItem("client"));
      var p = {
        attendId: param.billid,
        outid: client.outid,
        billtype: param.billtype,
      };
      previewImgs(p, function (result) {
        console.info("照片查询结果：", result);
        var $imgBox = $$("#pics-update-clock");
        that.imgArr = result;
        var curHtml = "";
        for (var i = 0; i < result.length; i++) {
          var photoStr =
            "data:image/jpeg;base64," + result[i].replace(/[\r\n]/g, ""); //删除base64换行
          curHtml =
            curHtml +
            '<li><img src="' +
            photoStr +
            '" alt="" data-imgsrc="' +
            photoStr +
            '"><i class="js-delete-img"></i></li>';
        }
        $imgBox.find("ul").append(curHtml);

        var liNum = $imgBox.find("ul").children("li").length;
        if (liNum < that.maxNum) {
          $$(".pic-upload-box").show();
        } else {
          $$(".pic-upload-box").hide();
        }
      });
    },
  };
  /**
   * 修改替班申请
   */
  var updateRelayApply = {
    init: function (query) {
      this.initParam(query);
    },
    initParam: function (param) {
      var that = this;
      var startTime = param.starttime;
      // var endTime = param.endtime;
      var tboutid = param.tboutid;
      var tbname = param.tbname;
      $$(".update-relay-start-date").val(startTime);
      // $$('.update-relay-end-date').val(endTime);
      $$(".update-relay-people").attr("data-outid", tboutid);
      $$(".update-relay-people").attr("data-name", tbname);
      $$(".update-relay-people").html(tbname + "(" + tboutid + ")");

      $$(".update-relay-shift-type").attr("data-key", param.shiftid);
      $$(".update-relay-shift-type").attr("data-name", param.shiftname);
      $$(".update-relay-shift-type").html(param.shiftname);

      $$(".update-leave-reason").html(param.msg);
      $$(".update-relay-apply-submit-btn").attr("data-id", param.billid);
      that.bindEvent();
    },
    getRelayPeople: function () {
      var _relayPeople = JSON.parse(sessionStorage.getItem("relay-people"));
      console.log("----");
      console.log(_relayPeople);
      if (_relayPeople) {
        $$(".update-relay-people").attr("data-name", _relayPeople.name);
        $$(".update-relay-people").attr("data-outid", _relayPeople.outid);
        var peoplestr = _relayPeople.name + "(" + _relayPeople.outid + ")";
        $$(".update-relay-people").html(peoplestr);
      }
    },
    getRelayShift: function (param, callback) {
      invokFrontApi.getRelayShift(param, function (result) {
        if (result._result) {
          if (result.data.length > 0) {
            var _data = result.data[0];
            $$(".update-relay-shift-type").attr("data-key", _data.key);
            $$(".update-relay-shift-type").attr("data-name", _data.name);
            $$(".update-relay-shift-type").html(_data.name);
          } else {
            $$(".update-relay-shift-type").attr("data-key", "");
            $$(".update-relay-shift-type").attr("data-name", "");
            $$(".update-relay-shift-type").html("");
          }
          callback && callback(result.data);
        } else {
          myApp.alert(result._message);
        }
      });
    },
    upRecord: function (param) {
      var that = this;
      myApp.showIndicator();
      invokFrontApi.updateAttendTB(param, function (result) {
        myApp.hideIndicator();
        if (result._result) {
          if (result.data[0].flag == 0) {
            myApp.alert(result.data[0].msg);
          } else {
            myApp.alert(result.data[0].msg, function () {
              view2.router.back();
              setTimeout(function () {
                view2.router.back();
              }, 100);
            });
          }
        } else {
          var msg = result.data[0].msg;
          var flag = result.data[0].flag;
          myApp.alert(msg);
        }
      });
    },
    bindEvent: function () {
      var that = this;
      $$(".update-relay-start-date").on(
        "input propertychange",
        function (event) {
          $$(".update-relay-shift-type").attr("data-key", "");
          $$(".update-relay-shift-type").attr("data-name", "");
          $$(".update-relay-shift-type").html("");
          var relaySTime = $$(".update-relay-start-date").val();
          var client = JSON.parse(localStorage.getItem("client"));
          var _param = {
            outid: client.outid,
            shifttype: "0", //班次类型0标准班次1休息班次
            starttime: relaySTime,
            endtime: relaySTime,
          };
          that.getRelayShift(_param);
        }
      );
      // $$(".update-relay-end-date").on("input propertychange", function (event) {
      //     $$('.update-relay-shift-type').attr("data-key", '');
      //     $$('.update-relay-shift-type').attr("data-name", '');
      //     $$('.update-relay-shift-type').html("");
      // });
      $$(".update-people-link").on("click", function () {
        view2.router.loadPage({
          url: "tpl/searchPeople.html",
        });
      });
      //选择替班班次
      $$(".update-relay-shift-link").on("click", function () {
        var relaySTime = $$(".update-relay-start-date").val();
        // var relayETime = $$('.update-relay-end-date').val();
        if (relaySTime == undefined || relaySTime == "" || relaySTime == null) {
          myApp.alert("时间不能为空");
          return false;
        }
        // if (relayETime == undefined || relayETime == '' || relayETime == null) {
        //     myApp.alert("结束时间不能为空");
        //     return false;
        // }
        var client = JSON.parse(localStorage.getItem("client"));
        var _param = {
          outid: client.outid,
          shifttype: "0", //班次类型0标准班次1休息班次
          starttime: relaySTime,
          endtime: relaySTime,
        };
        that.getRelayShift(_param, function (res) {
          var optionData = {
            name: "xzbc",
            title: "班次",
            data: res,
            xzxxCallback: function (returnOption) {
              console.log("选中的班次：");
              console.log(returnOption);
              $$(".update-relay-shift-type").attr(
                "data-value",
                returnOption.returnValue
              );
              $$(".update-relay-shift-type").attr(
                "data-key",
                returnOption.returnKey
              );
              $$(".update-relay-shift-type").html(returnOption.returnValue);
            },
          };
          showWrap.showDialog(optionData);
        });
      });
      //提交申请
      $$(".update-relay-apply-submit-btn").on("click", function () {
        var relayMsg = $$(".update-relay-reason").val();
        var relaySTime = $$(".update-relay-start-date").val();
        // var relayETime = $$('.update-relay-end-date').val();
        var relayPeople = $$(".update-relay-people").data("outid");
        var relayShift = $$(".update-relay-shift-type").data("key");
        var client = JSON.parse(localStorage.getItem("client"));
        var param = {
          outid: client.outid,
          starttime: relaySTime,
          endtime: relaySTime,
          msg: relayMsg,
          pic: "",
          approvaloutid: relayPeople,
          id: $$(".update-relay-apply-submit-btn").data("id"),
          shiftid: relayShift,
        };
        console.log("提交修改替班申请：");
        console.log(param);
        if (relaySTime == undefined || relaySTime == "" || relaySTime == null) {
          myApp.alert("开始时间不能为空");
          return false;
        }
        // if (relayETime == undefined || relayETime == '' || relayETime == null) {
        //     myApp.alert("结束时间不能为空");
        //     return false;
        // }
        if (relayShift == undefined || relayShift == "" || relayShift == null) {
          myApp.alert("请选择班次");
          return false;
        }
        if (
          relayPeople == undefined ||
          relayPeople == "undefined" ||
          relayPeople == "" ||
          relayPeople == null
        ) {
          myApp.alert("请选择替班人");
          return false;
        }
        that.upRecord(param);
      });
    },
  };

  /**
   * 统计主页
   * @type {{init: init, bindEvent: bindEvent}}
   */
  var countHome = {
    init: function () {
      console.log("统计首页");
      this.initParams();
      this.bindEvent();
    },
    initParams: function () {
      var that = this;
      var today = new Date();
      var thisYear = today.getFullYear();
      var thisMonth = today.getMonth() + 1;
      thisMonth = thisMonth > 9 ? thisMonth : "0" + thisMonth;
      var thisDate = thisYear + "年" + thisMonth + "月";
      var _thisDate = thisYear + "-" + thisMonth;
      $$(".count-month").text(thisDate);
      that.getAttendanceCount(_thisDate);
    },
    /**
     * 考勤汇总
     */
    getAttendanceCount: function (date) {
      var client = JSON.parse(localStorage.getItem("client"));
      var p = {
        outid: client.outid,
        attenddate: date,
      };
      console.log("考勤汇总请求数据：");
      console.log(p);
      myApp.showIndicator();
      invokFrontApi.getAttendCount(p, function (result) {
        console.log("考勤汇总数据：");
        console.log(result);
        myApp.hideIndicator();
        if (result._result) {
          if (result.data.length == 0) {
            $$(".ycqd").text(0);
            $$(".sjcqd").text(0);
            $$(".kgd").text(0);
            $$(".earlynum").text(0);
            $$(".latenum").text(0);
            $$(".dxleaved").text(0);
            $$(".wxleaved").text(0);
          } else {
            var data = result.data[0];
            console.log(data);
            $$(".ycqd").text(data.YCQD);
            $$(".sjcqd").text(data.SJCQD);
            $$(".kgd").text(data.KGD);
            $$(".earlynum").text(data.EARLYNUM);
            $$(".latenum").text(data.LATENUM);
            $$(".dxleaved").text(data.DXLEAVED);
            $$(".wxleaved").text(data.WXLEAVED);
          }
        } else {
          myApp.alert(result._message);
        }
      });
    },
    bindEvent: function () {
      var that = this;
      var options = $$(".count-month-choose");
      options.on("click", function () {
        var navObj = this;
        if ($$(".recordOption").length <= 0) {
          var output = tplManager.renderTplById(
            "recordListTemplate",
            timeUtils.getMonthStartEndDay(4)
          );
          $$("body").append(output);
          $$(document).on("click", ".recordOption li", function (e) {
            $$(".count-month").text($$(this).data("text"));
            var date = $$(this).data("yearAndMonth");
            that.getAttendanceCount(date);
            // 关闭 弹层
            myApp.closeModal(".recordOption");
          });
        }
        setTimeout(function () {
          myApp.popover(".recordOption", navObj);
        }, 100);
      });

      /**
       * 考勤月历
       */
      $$(".count-calendar").on("click", function () {
        view3.router.loadPage({
          url: "tpl/calendar.html",
        });
      });
      /**
       * 已休假汇总
       */
       $$("#take-off").on("click", function () {
        view3.router.loadPage({
          url: "tpl/takeoff.html",
        });
      });
    },
  };

  /**
   * 考勤日历模块
   * @type {{init: init, initParam: initParam, getAttendanceSchedule: getAttendanceSchedule, bindEvent: bindEvent, getSignInfo: getSignInfo, getKQRecord: getKQRecord, buildCal: buildCal, isLeap: isLeap, ifSigned: ifSigned, ifwork: ifwork}}
   */
 
   var sysInit = {
    init: function () {
      this.getMonthlyDate();
      this.initParam();
      this.bindEvent();
    },
    initParam: function () {
      var today = new Date();
      var thisYear = today.getFullYear();
      var thisMonth = today.getMonth() + 1;
      thisMonth = thisMonth > 9 ? thisMonth : "0" + thisMonth;
      var thisDate = thisYear + "-" + thisMonth;
      // $$(".this-month").html(thisDate);
      $$(".this-month").html(sessionStorage.getItem("currentAttendMonth"));
      var client = JSON.parse(localStorage.getItem("client"));
      var dptName = localStorage.getItem("dptName");
      var customPic = localStorage.getItem("customPic");
      if (customPic) {
        $$(".user-pic").find("img").attr("src", customPic);
      }
      $$(".user-name").html(client.name);
      $$(".user-job").html(dptName);

      this.getAttendanceSchedule();
    },
    getMonthlyDate: function(date, callback) {
      var that = this
      var ppdate = {
        dateTime: date
      }
      invokFrontApi.getCurrentMonthlyDate(ppdate, function (result) {
        if(result._result) {
          sessionStorage.setItem("currentMonthlyDateStDt", result.data.stDt.split(" ")[0]);
          sessionStorage.setItem("currentMonthlyDateEndDt", result.data.endDt.split(" ")[0])
          sessionStorage.setItem("currentAttendMonth", result.data.attendMonth);
        }
      })
    },
    // formatDate: function(date) {
    //   var y = date.getFullYear();
    //     var m = date.getMonth() + 1;
    //     var d = date.getDate();
    //   return y + "-" + m + "-" + d;
    // },
    getAttendanceSchedule: function (startDate) {
      var that = this;
      console.log("getAttendanceSchedule startDate", startDate)
      if (startDate) {
        var d = new Date(startDate);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        var endDay = timeUtils.getLastDay(y, m);
        var startDay = y + "-" + m + "-1";
      } else {
        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        // var endDay = timeUtils.getLastDay(y, m);
        // var startDay = y + "-" + m + "-1";
        var endDay = sessionStorage.getItem("currentMonthlyDateEndDt") + " 23:59:59";
        var startDay = sessionStorage.getItem("currentMonthlyDateStDt");
      }
      var startTime = startDay + " 00:00:00";
      var endTime = endDay + " 23:59:59";
      // var startTime = sessionStorage.setItem("currentMonthlyDateStDt") + " 00:00:00";
      // var endTime = sessionStorage.setItem("currentMonthlyDateEndDt") + " 23:59:59";
      var client = JSON.parse(localStorage.getItem("client"));
      var p = {
        // "customerid": client.customerid,
        outid: client.outid,
        startTime: startTime,
        endTime: endTime,
      };
      myApp.showIndicator();
      invokFrontApi.getAttendSchedule(p, function (result) {
        console.log("考勤排班：");
        console.log(result);
        if (result._result) {
          var data = result.data;
          var workList = data; //排班数据
          var signList = []; //签到情况数据
          $$.each(workList, function (index, item) {
            var nd = new Date(item.ATTENDDATE);
            var nm = nd.getMonth() + 1;
            var ndate = nd.getDate();
            var signIn = 0;
            //考勤状态处理
            if (item.STSTATUS == 0 && item.ENDSTATUS == 0) {
              signIn = 0; //全天正常打卡上下班
            } else if (item.STSTATUS == 1 || item.ENDSTATUS == 2) {
              signIn = 1; //迟到或早退
            } else if (
              item.STSTATUS == 4 ||
              item.ENDSTATUS == 4 ||
              item.STSTATUS == 3 ||
              item.ENDSTATUS == 3
            ) {
              signIn = 2; //旷工 未刷卡也处理成旷工
            } else {
              signIn = 3; //其他
            }
            //签到状态.signDay代表有排班的日期，isSign表示签到状态。
            var param = {
              signDay: ndate,
              isSign: signIn,
            };
            signList.push(param);
          });
          console.log("-----整理后的signList");
          console.log(signList);

          //处理signList，一天多个班次，考勤签到状态处理。
          var len = signList.length;
          var newSignList = [];
          for (var i = 0; i < len; i++) {
            var flag = true;
            for (var j = i; j < signList.length - 1; j++) {
              if (signList[i].signDay == signList[j + 1].signDay) {
                console.log(
                  "重合日期：" +
                    signList[i].signDay +
                    "signList[i].isSign :" +
                    signList[i].isSign +
                    ",signList[j + 1].isSign:" +
                    signList[j + 1].isSign
                );
                if (signList[i].isSign === 0 && signList[j + 1].isSign === 0) {
                  //全天签到正常
                  signList[i].isSign = 0;
                  signList[j + 1].isSign = 0;
                } else if (
                  signList[i].isSign === 2 ||
                  signList[j + 1].isSign === 2
                ) {
                  //旷工
                  signList[i].isSign = 2;
                  signList[j + 1].isSign = 2;
                } else if (
                  signList[i].isSign === 3 ||
                  signList[j + 1].isSign === 3
                ) {
                  //其他状态
                  signList[i].isSign = 3;
                  signList[j + 1].isSign = 3;
                } else {
                  //迟到或早退
                  signList[i].isSign = 1;
                  signList[j + 1].isSign = 1;
                }
                flag = false;
                break;
              }
            }
            if (flag) {
              newSignList.push(signList[i]);
            }
          }
          console.log("（一天多个排班）重新整理后的newSignList:");
          console.log(newSignList);
          that.buildCal(startDate, newSignList);
        } else {
          myApp.alert(result._message);
        }
        myApp.hideIndicator();
      });
    },
    bindEvent: function () {
      var that = this;
      //上个月
      $$(".pre-month").on("click", function () {
        var thisDate = $$(".this-month").html() + "-01";
        var preMonth = timeUtils.getPreMonth(thisDate);
        console.log("thisDate", thisDate)
        console.log("preMonth", preMonth)
        var dateArr = preMonth.split("-");
        var preMonthLastDay = timeUtils.getLastDay(dateArr[0], dateArr[1]);
        $$(".this-month").html(preMonth);
        console.log("preMonthLastDay", preMonthLastDay)
        that.getAttendanceSchedule(preMonthLastDay);
      });
      //下个月
      $$(".next-month").on("click", function () {
        var thisDate = $$(".this-month").html() + "-01";
        var nextMonth = timeUtils.getNextMonth(thisDate);
        var _dateArr = nextMonth.split("-");
        var nextMonthLastDay = timeUtils.getLastDay(_dateArr[0], _dateArr[1]);
        $$(".this-month").html(nextMonth);
        that.getAttendanceSchedule(nextMonthLastDay);
      });
    },
    /**
     * 获取一天的排班信息及考勤状态
     * 查询1月1日的考勤记录，查询时间为： "startTime": "2017/12/31 00:00:00","endTime": "2018/1/01 23:59:59"
     * @param date
     */
    getSignInfo: function (date) {
      var that = this;
      if (date) {
        console.log("-----查询日期(排班)：" + date);
        var d = new Date(date);
      } else {
        var d = new Date();
      }
      var y = d.getFullYear();
      var m = d.getMonth() + 1;
      var day = d.getDate();
      var startDay = y + "-" + m + "-" + day;
      var startTime = startDay + " 00:00:00";
      var endTime = startDay + " 23:59:59";
      var client = JSON.parse(localStorage.getItem("client"));
      var param = {
        startTime: startTime,
        endTime: endTime,
        outid: client.outid,
      };
      myApp.showIndicator();
      invokFrontApi.getAttendSchedule(param, function (result) {
        console.log("考勤排班：");
        console.log(result);
        if (result._result) {
          $$("#work-schedule").find("ul").html();
          var data = result.data;
          var p = {
            items: data,
          };
          if (data && data.length == 0) {
            var workListHtml = tplManager.renderTplById("noWorkTpl", p);
          } else {
            var workListHtml = tplManager.renderTplById("workListTpl", p);
          }
          $$("#work-schedule").find("ul").html(workListHtml);
        } else {
          myApp.alert(result._message);
        }
        myApp.hideIndicator();
      });
    },
    /**
     *获取一天的考勤原始刷卡记录 S04002
     * @param date  2015-12-01
     */
    getKQRecord: function (date) {
      var that = this;
      if (date) {
        console.log("-----查询日期（刷卡记录）：" + date);
        var d = new Date(date);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        var day = d.getDate();
        var newDate = y + "-" + m + "-" + day;
      } else {
        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        var day = d.getDate();
        var newDate = y + "-" + m + "-" + day;
      }
      var client = JSON.parse(localStorage.getItem("client"));
      var p = {
        outid: client.outid,
        startdate: newDate + " 00:00:00",
        enddate: newDate + " 23:59:59",
      };
      myApp.showIndicator();
      invokFrontApi.getAttendRecord(p, function (result) {
        console.log("个人原始刷卡记录：");
        console.log(result);
        if (result._result) {
          $$("#record-list").find("ul").html();
          var data = result.data;
          var p = {
            items: data,
          };
          if (data && data.length > 0) {
            var KQRecordHtml = tplManager.renderTplById("KQRecordTpl", data);
          } else {
            var KQRecordHtml = tplManager.renderTplById("noKQRecordTpl", data);
          }
          $$("#record-list").find("ul").html(KQRecordHtml);
        } else {
          myApp.alert(result._message);
        }
        myApp.hideIndicator();
      });
    },
    /**
     * 创建日历
     * @param date
     * @param signList
     */
    buildCal: function (date, signList) {
      var that = this;
      console.log("buildCal date", date)
      // if (date) {
      //   var today = new Date(date); // 获取传入日期
      //   //获取传入日期是否为当前年月
      //   var newyear = today.getFullYear();
      //   var newmonth = today.getMonth();
      //   var thistoday = new Date();
      //   var thisyear = thistoday.getFullYear();
      //   var thismonth = thistoday.getMonth();
      //   if (newyear === thisyear && newmonth === thismonth) {
      //     today = new Date();
      //   }
      // } else {
      //   var today = new Date(); // 获取当前日期
      // }
      var stDt = sessionStorage.getItem("currentMonthlyDateStDt");
      var endDt = sessionStorage.getItem("currentMonthlyDateEndDt")
      var attendMonth = sessionStorage.getItem("currentAttendMonth");

      var today = new Date(attendMonth);
      var stDtDate = new Date(stDt)
      var endDtDate = new Date(endDt)


      var i, k;
      var y = today.getFullYear(),
        m = today.getMonth(), //注意月份从0开始
        d = today.getDate(),
        // firstDay = new Date(y, m, 1), //获取当月的第一,天.
        // dayOfWeek = firstDay.getDay(), //判断第一天星期几(返回[0-6]中的一个，0代表星期天，1代表星期一，以此类推.)
        dayOfWeek = new Date(stDtDate).getDay(),

        dArr = timeUtils.getDateSolt(timeUtils.dateFormat("YYYY-mm-dd", stDtDate), timeUtils.dateFormat("YYYY-mm-dd", endDtDate))//计算日历上需要展示的天数

        days_per_month = new Array(
          31,
          28 + this.isLeap(y),
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31
        ), //创建月份数组
        str_nums = Math.ceil((dayOfWeek + days_per_month[m]) / 7); //确定日期表格所需行数
        console.log("str_nums", str_nums)
      /*  console.log("日期表格所需行数:" + str_nums);
              console.log("dayOfWeek" + dayOfWeek);*/
      var mm = m + 1;
      if (mm < 10) {
        mm = "0" + mm;
      }
      var dateStr = y + "年" + mm + "月";
      var dateStr1 = y + "/" + mm + "/01";
      $$(".selected-date").html(dateStr);
      $$(".selected-date").data("date", dateStr1);
      var $calendar = $$("#calendar");
      var calendar = "";
      for (i = 0; i < str_nums; i += 1) {
        //二维数组创建日期表格
        calendar += '<div class="row text-center">';
        for (k = 0; k < 7; k++) {
          var idx = 7 * i + k; //为每个表格创建索引,从0开始
          var date = idx - dayOfWeek + 1; //将每月一号与星期进行匹配
          date <= 0 || date > days_per_month[m]
            ? (date = " ")
            : (date = idx - dayOfWeek + 1); //索引小于等于0或者大于月份最大值就用空表格代替
          if (date !== " ") {
            var nowDate = y + "/" + mm + "/" + date;
            var ifIsWork = that.ifwork(signList, date);
            if (ifIsWork) {
              var ifHasSigned = that.ifSigned(signList, date);
              // console.log("d:" + d + ",date:" + date + "号有排班，ifHasSigned：" + ifHasSigned + " (0:全天上下班正常打卡;1:迟到早退;2:旷工;3：其他;)");
              if (date == d) {
                if (ifHasSigned == 0) {
                  //全天正常签到
                  calendar +=
                    '<div class="col-15 round selected"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    date +
                    '</span><span class="text-selected dot-blue"></span></div>';
                } else if (ifHasSigned == 1) {
                  //迟到早退
                  calendar +=
                    '<div class="col-15 round selected"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    date +
                    '</span><span class="text-selected dot-orange"></span></div>';
                } else if (ifHasSigned == 2) {
                  //旷工
                  calendar +=
                    '<div class="col-15 round selected"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    date +
                    '</span><span class="text-selected dot-red"></span></div>';
                } else {
                  //其他
                  calendar +=
                    '<div class="col-15 round selected"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    date +
                    '</span><span class="text-selected dot-grey"></span></div>';
                }
              } else if (date < d) {
                if (ifHasSigned == 0) {
                  //全天正常签到
                  calendar +=
                    '<div class="col-15"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    date +
                    '</span><span class="text-selected dot-blue"></span></div>';
                } else if (ifHasSigned == 1) {
                  //迟到早退
                  calendar +=
                    '<div class="col-15"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    date +
                    '</span><span class="text-selected dot-orange"></span></div>';
                } else if (ifHasSigned == 2) {
                  //旷工
                  calendar +=
                    '<div class="col-15"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    date +
                    '</span><span class="text-selected dot-red"></span></div>';
                } else {
                  //其他
                  calendar +=
                    '<div class="col-15"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    date +
                    '</span><span class="text-selected dot-grey"></span></div>';
                }
              } else {
                //大于今天的班次不显示考勤状态
                calendar +=
                  '<div class="col-15"><div class="item-date date" data-date=' +
                  nowDate +
                  ">" +
                  date +
                  "</div></div>";
              }
            } else {
              // console.log(date + "号没有排班");
              //无排班日期置灰显示
              if (date == d) {
                calendar +=
                  '<div class="col-15 round selected grey"><span class="item-date date" data-date=' +
                  nowDate +
                  ">" +
                  date +
                  "</span></div>";
              } else {
                calendar +=
                  '<div class="col-15 grey"><span class="item-date date" data-date=' +
                  nowDate +
                  ">" +
                  date +
                  "</span></div>";
              }
            }
          } else {
            calendar +=
              '<div class="col-15"><span class="date">' +
              date +
              '</span><span class="text-unselected"></span><div class=""></div></div>';
          }
        }
        calendar += "</div>";
      }
      $calendar.html(calendar);

      //选中日期高亮
      var $selected = $$("#calendar").find(".row .col-15");
      $selected.on("click", function () {
        var num = $$(this).find(".item-date").data("date");
        // console.log("选中" + num + "号");
        if (num !== undefined) {
          $$(document).find(".selected").removeClass("selected");
          $$(this).addClass("selected");
        }
        that.getSignInfo(num);
        that.getKQRecord(num);
      });
      //获取被选中的日期考勤排版
      var $selectedWork = $$(".selected");
      var num = $selectedWork.find(".item-date").data("date");
      // console.log("查询" + num + "号的排班考勤");
      that.getSignInfo(num);
      that.getKQRecord(num);
    },
    /**
     * 判断当前年份是否为闰年
     * @param year
     * @returns {number}
     */
    isLeap: function (year) {
      return year % 4 == 0
        ? year % 100 != 0
          ? 1
          : year % 400 == 0
          ? 1
          : 0
        : 0;
    },
    //上班日考勤状态
    ifSigned: function (signList, day) {
      var sign;

      $$.each(signList, function (index, item) {
        if (item.signDay == day) {
          if (item.isSign == 0) {
            sign = 0; //全天上下班正常打卡
            return false;
          } else if (item.isSign == 1) {
            sign = 1; //迟到早退
            return false;
          } else if (item.isSign == 2) {
            sign = 2; //旷工
            return false;
          } else {
            sign = 3; //其他
            return false;
          }
        }
      });
      return sign;
    },
    //是否需要上班
    ifwork: function (dateList, day) {
      var iswork = false;
      $$.each(dateList, function (index, item) {
        if (item.signDay == day) {
          iswork = true;
          return false;
        }
      });
      return iswork;
    },
  };
  /**
   * 照片上传
   * @param param
   * @param callback
   */
  function uploadImgs(param, callback) {
    invokFrontApi.addImgs(param, function (result) {
      console.info("照片上传结果：", result);
    });
  }

  /**
   * 照片查询
   * @param param
   * @param callback
   */
  function previewImgs(param, callback) {
    myApp.showIndicator();
    invokFrontApi.getImgs(param, function (result) {
      myApp.hideIndicator();
      console.info("照片查询结果", result);
      if (result._result) {
        var _imgArr = [];
        for (var i = 0; i < result.data.length; i++) {
          _imgArr.push(result.data[i].pic);
        }
        callback(_imgArr);
      } else {
        myApp.alert(result._message);
      }
    });
  }

  function pageBeforeInit(page) {
    var name = page.name,
      query = page.query,
      from = page.from;
    switch (name) {
      case "clockInOrOut":
        clockInOrOut.init();
        break;
      case "applyHome":
        applyHome.init();
        break;
      case "countHome":
        countHome.init();
        break;
      case "calendar":
        calendar.init();
        break;
      case "takeoff":
        clockInOrOut.removeBackListen();
        takeOffStatistics.init();
        break;
      case "myApply":
        clockInOrOut.removeBackListen();
        myApply.init();
        break;
      case "myApplyDetail":
        clockInOrOut.removeBackListen();
        myApplyDetail.init(query);
        break;
      case "clockApply":
        clockInOrOut.removeBackListen();
        clockApply.init();
        break;
      case "overtimeApply":
        clockInOrOut.removeBackListen();
        overtimeApply.init();
        break;
      case "leaveApply":
        clockInOrOut.removeBackListen();
        leaveApply.init();
        break;
      case "relayApply":
        clockInOrOut.removeBackListen();
        relayApply.init();
        break;
      case "backApply":
        clockInOrOut.removeBackListen();
        backApply.init();
        break;
      case "searchPeople":
        clockInOrOut.removeBackListen();
        searchPeople.init();
        break;
      case "updateLeaveApply":
        clockInOrOut.removeBackListen();
        updateLeaveApply.init(query);
        break;
      case "updateOvertimeApply":
        clockInOrOut.removeBackListen();
        updateOvertimeApply.init(query);
        break;
      case "updateClockApply":
        clockInOrOut.removeBackListen();
        updateClockApply.init(query);
        break;
      case "updateRelayApply":
        clockInOrOut.removeBackListen();
        updateRelayApply.init(query);
        break;
    }
  }

  function pageBeforeAnimation(page) {
    var name = page.name,
      query = page.query,
      from = page.from;
    if (
      name === "backApply" ||
      name === "leaveApply" ||
      name === "overtimeApply" ||
      name === "clockApply" ||
      name === "relayApply" ||
      name === "searchPeople" ||
      name === "myApply" ||
      name === "takeoff" ||
      name === "myApplyDetail" ||
      name === "updateLeaveApply" ||
      name === "updateOvertimeApply" ||
      name === "updateClockApply" ||
      name === "updateRelayApply"
    ) {
      $$("div.toolbar").addClass("toolbar-hidden");
    } else {
      $$("div.toolbar").removeClass("toolbar-hidden");
    }
  }

  function pageAfterAnimation(page) {
    var name = page.name,
      query = page.query,
      from = page.from,
      fromPage = page.fromPage;

    if (from === "left") {
      if (
        fromPage.name === "backApply" ||
        fromPage.name === "leaveApply" ||
        fromPage.name === "overtimeApply" ||
        fromPage.name === "clockApply" ||
        fromPage.name === "relayApply" ||
        fromPage.name === "myApply"||
        fromPage.name === "takeoff"
      ) {
        applyHome.getGetAttendBillsTime();
      }
      if (fromPage.name === "myApplyDetail") {
        myApply.reInit();
      }
      if (fromPage.name === "searchPeople") {
        relayApply.getRelayPeople();
        updateRelayApply.getRelayPeople();
      }
    }
    if (name == "clockInOrOut" || name == "applyHome" || name == "countHome") {
      clockInOrOut.addBackListen();
    }
  }

  sysInit.init();
})(Framework7, Dom7, Template7, _invokFrontApi, locationAuth);
