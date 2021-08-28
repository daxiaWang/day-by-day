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
      $$(".this-month").html(sessionStorage.getItem("cMonth"));
      var client = JSON.parse(localStorage.getItem("client"));
      var dptName = localStorage.getItem("dptName");
      var customPic = localStorage.getItem("customPic");
      if (customPic) {
        $$(".user-pic").find("img").attr("src", customPic);
      }
      $$(".user-name").html(client.name);
      $$(".user-job").html(dptName);
      var cStDt = sessionStorage.getItem("cStDt"), cEndDt = sessionStorage.getItem("cEndDt")
      console.log(cStDt, cEndDt)
      this.getAttendanceSchedule(cStDt, cEndDt);
    },
    getMonthlyDate: function (date, callback) {
      var that = this
      var ppdate = {
        dateTime: date
      }
      var result = {
        _result: true,
        data: {
          stDt: '2021-08-26 00:00:00',
          endDt: '2021-09-26 00:00:00',
          attendMonth: '2021-09',
        }
      }
      // invokFrontApi.getCurrentMonthlyDate(ppdate, function (result) {
      if (result._result) {
        sessionStorage.setItem("currentMonthlyDateStDt", result.data.stDt.split(" ")[0]);
        sessionStorage.setItem("currentMonthlyDateEndDt", result.data.endDt.split(" ")[0])
        sessionStorage.setItem("currentAttendMonth", result.data.attendMonth);

        sessionStorage.setItem("cStDt", result.data.stDt.split(" ")[0]);
        sessionStorage.setItem("cEndDt", result.data.endDt.split(" ")[0])
        sessionStorage.setItem("cMonth", result.data.attendMonth);
      }
      // })
    },
    getAttendanceSchedule: function (startDay, endDay) {
      var that = this;
      console.log("getAttendanceSchedule startDate", startDay)

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
      console.log("getAttendSchedule p", p)
      myApp.showIndicator();
      // invokFrontApi.getAttendSchedule(p, function (result) {
      var result = { "_code": "100", "_message": "成功", "_result": true, "data": [{ "ATTENDDATE": "2021-08-01", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-01 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-01 08:00:00" }, { "ATTENDDATE": "2021-08-01", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-01 18:00:00", "MINNUM": "240", "PERIODID": "4", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-01 14:00:00" }, { "ATTENDDATE": "2021-08-02", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-02 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-02 08:00:00" }, { "ATTENDDATE": "2021-08-02", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-02 18:00:00", "MINNUM": "240", "PERIODID": "4", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-02 14:00:00" }, { "ATTENDDATE": "2021-08-03", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-03 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-03 08:00:00" }, { "ATTENDDATE": "2021-08-03", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-03 18:00:00", "MINNUM": "240", "PERIODID": "4", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-03 14:00:00" }, { "ATTENDDATE": "2021-08-04", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-04 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-04 08:00:00" }, { "ATTENDDATE": "2021-08-04", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-04 18:00:00", "MINNUM": "240", "PERIODID": "4", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-04 14:00:00" }, { "ATTENDDATE": "2021-08-05", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-05 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-05 08:00:00" }, { "ATTENDDATE": "2021-08-05", "ENDIFCARD": "1", "ENDSTATUS": "0", "ENDSTATUSCOLOR": "#118dea", "ENDSTATUSNAME": "正常", "ENDTIME": "2021-08-05 18:00:00", "MINNUM": "240", "PERIODID": "4", "REALEND": "2021-08-05 18:22:20.0", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-05 14:00:00" }, { "ATTENDDATE": "2021-08-06", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-06 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-06 08:00:00" }, { "ATTENDDATE": "2021-08-06", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-06 18:00:00", "MINNUM": "240", "PERIODID": "4", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-06 14:00:00" }, { "ATTENDDATE": "2021-08-07", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-07 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-07 08:00:00" }, { "ATTENDDATE": "2021-08-07", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-07 18:00:00", "MINNUM": "240", "PERIODID": "4", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-07 14:00:00" }, { "ATTENDDATE": "2021-08-08", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-08 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-08 08:00:00" }, { "ATTENDDATE": "2021-08-08", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-08 18:00:00", "MINNUM": "240", "PERIODID": "4", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-08 14:00:00" }, { "ATTENDDATE": "2021-08-10", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-10 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-10 08:00:00" }, { "ATTENDDATE": "2021-08-10", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-10 18:00:00", "MINNUM": "240", "PERIODID": "4", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-10 14:00:00" }, { "ATTENDDATE": "2021-08-11", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-11 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-11 08:00:00" }, { "ATTENDDATE": "2021-08-11", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-11 18:00:00", "MINNUM": "240", "PERIODID": "4", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-11 14:00:00" }, { "ATTENDDATE": "2021-08-12", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-13 00:00:00", "MINNUM": "480", "PERIODID": "6", "SHIFTCODE": "8小", "SHIFTID": "4", "SHIFTNAME": "8H-小夜", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-12 16:00:00" }, { "ATTENDDATE": "2021-08-13", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-14 00:00:00", "MINNUM": "480", "PERIODID": "6", "SHIFTCODE": "8小", "SHIFTID": "4", "SHIFTNAME": "8H-小夜", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-13 16:00:00" }, { "ATTENDDATE": "2021-08-14", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-15 00:00:00", "MINNUM": "480", "PERIODID": "6", "SHIFTCODE": "8小", "SHIFTID": "4", "SHIFTNAME": "8H-小夜", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-14 16:00:00" }, { "ATTENDDATE": "2021-08-15", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-16 00:00:00", "MINNUM": "480", "PERIODID": "6", "SHIFTCODE": "8小", "SHIFTID": "4", "SHIFTNAME": "8H-小夜", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-15 16:00:00" }, { "ATTENDDATE": "2021-08-16", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-17 08:00:00", "MINNUM": "720", "PERIODID": "9", "SHIFTCODE": "12夜", "SHIFTID": "7", "SHIFTNAME": "12H-夜班", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-16 20:00:00" }, { "ATTENDDATE": "2021-08-17", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-17 20:00:00", "MINNUM": "720", "PERIODID": "8", "SHIFTCODE": "12白", "SHIFTID": "6", "SHIFTNAME": "12H-白班", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-17 08:00:00" }, { "ATTENDDATE": "2021-08-18", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-18 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-18 08:00:00" }, { "ATTENDDATE": "2021-08-18", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-18 18:00:00", "MINNUM": "240", "PERIODID": "4", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-18 14:00:00" }, { "ATTENDDATE": "2021-08-19", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-19 20:00:00", "MINNUM": "720", "PERIODID": "8", "SHIFTCODE": "12白", "SHIFTID": "6", "SHIFTNAME": "12H-白班", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-19 08:00:00" }, { "ATTENDDATE": "2021-08-20", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-20 08:00:00", "MINNUM": "480", "PERIODID": "7", "SHIFTCODE": "8大", "SHIFTID": "5", "SHIFTNAME": "8H-大夜", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-20 00:00:00" }, { "ATTENDDATE": "2021-08-21", "ENDIFCARD": "1", "ENDSTATUS": "61", "ENDSTATUSCOLOR": "#ff9900", "ENDSTATUSNAME": "正常休假", "ENDTIME": "2021-08-21 08:00:00", "MINNUM": "480", "PERIODID": "7", "SHIFTCODE": "8大", "SHIFTID": "5", "SHIFTNAME": "8H-大夜", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-21 00:00:00" }, { "ATTENDDATE": "2021-08-22", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-23 00:00:00", "MINNUM": "480", "PERIODID": "6", "SHIFTCODE": "8小", "SHIFTID": "4", "SHIFTNAME": "8H-小夜", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-22 16:00:00" }, { "ATTENDDATE": "2021-08-23", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-24 00:00:00", "MINNUM": "480", "PERIODID": "6", "SHIFTCODE": "8小", "SHIFTID": "4", "SHIFTNAME": "8H-小夜", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-23 16:00:00" }, { "ATTENDDATE": "2021-08-24", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-24 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-24 08:00:00" }, { "ATTENDDATE": "2021-08-24", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-08-24 18:00:00", "MINNUM": "240", "PERIODID": "4", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-08-24 14:00:00" }, { "ATTENDDATE": "2021-08-25", "ENDIFCARD": "0", "ENDSTATUS": "0", "ENDSTATUSCOLOR": "#118dea", "ENDSTATUSNAME": "休息", "ENDTIME": "2021-08-25 22:00:00", "MINNUM": "1320", "PERIODID": "28", "SHIFTCODE": "8休", "SHIFTID": "26", "SHIFTNAME": "8H-休", "STIFCARD": "0", "STSTATUS": "0", "STSTATUSCOLOR": "#118dea", "STSTATUSNAME": "休息", "STTIME": "2021-08-25 00:00:00" }, { "ATTENDDATE": "2021-07-26", "ENDIFCARD": "0", "ENDSTATUS": "6", "ENDSTATUSCOLOR": "#118dea", "ENDSTATUSNAME": "休息", "ENDTIME": "2021-07-26 22:00:00", "MINNUM": "1320", "PERIODID": "28", "SHIFTCODE": "8休", "SHIFTID": "26", "SHIFTNAME": "8H-休", "STIFCARD": "0", "STSTATUS": "6", "STSTATUSCOLOR": "#118dea", "STSTATUSNAME": "休息", "STTIME": "2021-07-26 00:00:00" }, { "ATTENDDATE": "2021-07-24", "ENDIFCARD": "0", "ENDSTATUS": "6", "ENDSTATUSCOLOR": "#118dea", "ENDSTATUSNAME": "休息", "ENDTIME": "2021-07-24 22:00:00", "MINNUM": "1320", "PERIODID": "28", "SHIFTCODE": "8休", "SHIFTID": "26", "SHIFTNAME": "8H-休", "STIFCARD": "1", "STSTATUS": "6", "STSTATUSCOLOR": "#118dea", "STSTATUSNAME": "休息", "STTIME": "2021-07-24 00:00:00" },{ "ATTENDDATE": "2021-07-29", "ENDIFCARD": "1", "ENDSTATUS": "4", "ENDSTATUSCOLOR": "#999999", "ENDSTATUSNAME": "旷工", "ENDTIME": "2021-07-29 12:00:00", "MINNUM": "240", "PERIODID": "3", "SHIFTCODE": "◎", "SHIFTID": "2", "SHIFTNAME": "行政班（夏季）", "STIFCARD": "1", "STSTATUS": "4", "STSTATUSCOLOR": "#999999", "STSTATUSNAME": "旷工", "STTIME": "2021-07-29 08:00:00" }] }
      console.log("考勤排班：");
      console.log(result);
      if (result._result) {
        var data = result.data;
        var workList = data; //排班数据
        var signList = []; //签到情况数据
        $$.each(workList, function (index, item) {
          var nd = new Date(item.ATTENDDATE);
          var ny = nd.getFullYear();
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
          var param = { //   ""+ny+"-"+nm+"-"+ndate+""
            fulldate: ny+"-"+nm+"-"+ndate,
            signYear: ny,
            signMonth: nm,
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
            if (signList[i].fulldate == signList[j + 1].fulldate) {
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
        that.buildCal(newSignList);
      } else {
        myApp.alert(result._message);
      }
      myApp.hideIndicator();
      // });
    },
    getStore(param) {
      return new Date(sessionStorage.getItem(param))
    },
    setStore(param, value) {
      sessionStorage.setItem(param, value)
    },
    bindEvent: function () {
      var that = this;
      //上个月
      $$(".pre-month").on("click", function () {

        var m = that.getStore("cMonth"), s = that.getStore("cStDt"), e = that.getStore("cEndDt")

        var newM = timeUtils.dateFormat("YYYY-mm", new Date(m.setMonth(m.getMonth() - 1)))
        var newS = timeUtils.dateFormat("YYYY-mm-dd", new Date(s.setMonth(s.getMonth() - 1)))
        var newE = timeUtils.dateFormat("YYYY-mm-dd", new Date(e.setMonth(e.getMonth() - 1)))

        that.setStore("cMonth", newM)
        that.setStore("cStDt", newS)
        that.setStore("cEndDt", newE)
        $$(".this-month").html(newM);
        that.getAttendanceSchedule(newS, newE)
      });
      //下个月
      $$(".next-month").on("click", function () {

        var m = that.getStore("cMonth"), s = that.getStore("cStDt"), e = that.getStore("cEndDt")

        var newM = timeUtils.dateFormat("YYYY-mm", new Date(m.setMonth(m.getMonth() + 1)))
        var newS = timeUtils.dateFormat("YYYY-mm-dd", new Date(s.setMonth(s.getMonth() + 1)))
        var newE = timeUtils.dateFormat("YYYY-mm-dd", new Date(e.setMonth(e.getMonth() + 1)))

        that.setStore("cMonth", newM)
        that.setStore("cStDt", newS)
        that.setStore("cEndDt", newE)
        $$(".this-month").html(newM);
        that.getAttendanceSchedule(newS, newE);
        return
      });
    },
    buildCal: function (signList) {
      console.log("buildCal signList", signList)
      var that = this;

      var today = utils.getStore("cMonth");
      var stDtDate = utils.getStore("cStDt")
      var endDtDate = utils.getStore("cEndDt")

      var i, k;
      var y = today.getFullYear(),
        m = today.getMonth(), //注意月份从0开始
        d = new Date().getDate(),
        curDate = timeUtils.dateFormat("YYYY-m-dd", new Date()),

        dayOfWeek = new Date(stDtDate).getDay(), //获取当月的第一,天. 判断第一天星期几(返回[0-6]中的一个，0代表星期天，1代表星期一，以此类推.)
      
        dArr = timeUtils.getDateSolt(timeUtils.dateFormat("YYYY-mm-dd", stDtDate), timeUtils.dateFormat("YYYY-mm-dd", endDtDate), true, false);//计算日历上需要展示的天数

        str_nums = Math.ceil((dayOfWeek + dArr.length) / 7); //确定日期表格所需行数

      /*  console.log("日期表格所需行数:" + str_nums);
              console.log("dayOfWeek" + dayOfWeek);*/
      // var mm = m + 1;
      // if (mm < 10) {
      //   mm = "0" + mm;
      // }

      var $calendar = $$("#calendar");

      var calendar = "";
      for (i = 0; i < str_nums; i += 1) {
        //二维数组创建日期表格
        calendar += '<div class="row text-center">';
        for (k = 0; k < 7; k++) {
          var idx = 7 * i + k; //为每个表格创建索引,从0开始
          var date = idx - dayOfWeek + 1; //将每月一号与星期进行匹配
// console.log("idx", idx)
          date <= 0 || date > dArr.length
            ? (date = " ")
            : (date = idx - dayOfWeek + 1); //索引小于等于0或者大于月份最大值就用空表格代替

          var finallyDate = dArr[idx - dayOfWeek]
// console.log("finallyDate", finallyDate)
          var nowDate = !!finallyDate && finallyDate.name;
          if (date !== " ") {
            // var nowDate = y + "/" + mm + "/" + date;
            var ifIsWork = that.ifwork(signList, finallyDate.name);//是否需要上班
            if (ifIsWork) {
              var ifHasSigned = that.ifSigned(signList, finallyDate.name);
              var itemInfo = signList.filter(function (item) {
                return item.fulldate == finallyDate.name;
              })[0];

              // console.log(itemInfo);
              console.log("d:" + d + ",finallyDate.name:" + finallyDate.name + "号有排班，ifHasSigned：" + ifHasSigned + " (0:全天上下班正常打卡;1:迟到早退;2:旷工;3：其他;)");
              
              console.log("@@@@@", ifHasSigned, finallyDate, curDate);
              if (new Date(finallyDate.name).getTime() == new Date(curDate).getTime()) {
                console.log("@@@@", ifHasSigned);
                if (ifHasSigned == 0) {
                  //全天正常签到
                  calendar +=
                    '<div class="col-15 round selected"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-blue"></span></div>';
                } else if (ifHasSigned == 1) {
                  //迟到早退
                  calendar +=
                    '<div class="col-15 round selected"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-orange"></span></div>';
                } else if (ifHasSigned == 2) {
                  //旷工
                  calendar +=
                    '<div class="col-15 round selected"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-red"></span></div>';
                } else if (ifHasSigned == 3) {
                  //其他
                  calendar +=
                    '<div class="col-15 round selected"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-grey"></span></div>';
                } else {
                  /*20210624新增判断是否返回颜色 焦化考勤需求 ---start*/
                  if (ifHasSigned && ifHasSigned.indexOf("#") > -1) {
                    // calendar += '<div class="col-15 round selected newJhDiv"><span class="item-date date" data-date=' + nowDate + '>' + date + '</span><span class="item-txt">'+itemInfo.SHIFTCODE+'</span><span class="text-selected dot-blue"'+'style="background-color'+ifHasSigned+'"></span></div>';
                    calendar +=
                      '<div class="col-15 round selected newJhDiv"><div style="display:flex;align-items:center;"><span class="item-date date" data-date=' +
                      nowDate +
                      ">" +
                      finallyDate.date +
                      '</span><span class="text-selected dot-blue"' +
                      'style="background-color:' +
                      ifHasSigned +
                      ';margin-left:0.1rem"></span></div>' +
                      '<span class="item-txt">' +
                      itemInfo.SHIFTCODE +
                      "</span></div>";
                  }
                  /*20210624新增判断是否返回颜色 焦化考勤需求 ---end*/
                }
              } else if (new Date(finallyDate.name).getTime() < new Date(curDate).getTime()) {
                console.log("小于今天的班次不显示考勤状态")
                console.log("@@@@", ifHasSigned);
                if (ifHasSigned == 0) {
                  //全天正常签到
                  calendar +=
                    '<div class="col-15"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-blue"></span></div>';
                } else if (ifHasSigned == 1) {
                  //迟到早退
                  calendar +=
                    '<div class="col-15"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-orange"></span></div>';
                } else if (ifHasSigned == 2) {
                  //旷工
                  calendar +=
                    '<div class="col-15"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-red"></span></div>';
                } else if (ifHasSigned == 3) {
                  //其他
                  calendar +=
                    '<div class="col-15"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-grey"></span></div>';
                } else {
                  /*20210624新增判断是否返回颜色 焦化考勤需求 ---start*/
                  console.log("@", ifHasSigned);
                  if (ifHasSigned && ifHasSigned.indexOf("#") > -1) {
                    calendar +=
                      '<div class="col-15 newJhDiv"><div style="display:flex;align-items:center;"><span class="item-date date" data-date=' +
                      nowDate +
                      ">" +
                      finallyDate.date +
                      '</span><span class="text-selected dot-blue"' +
                      'style="background-color:' +
                      ifHasSigned +
                      ';margin-left:0.1rem"></span></div>' +
                      '<span class="item-txt">' +
                      itemInfo.SHIFTCODE +
                      "</span></div>";
                  }
                  /*20210624新增判断是否返回颜色 焦化考勤需求 ---end*/
                }
              } else {
                console.log("大于今天的班次不显示考勤状态")
                //大于今天的班次不显示考勤状态
                calendar +=
                  '<div class="col-15"><div class="item-date date" data-date=' +
                  nowDate +
                  ">" +
                  finallyDate.date +
                  "</div></div>";
              }
            } else {
              // console.log(date + "号没有排班");
              //无排班日期置灰显示
              if (finallyDate.name == curDate) {
                calendar +=
                  '<div class="col-15 round selected grey"><span class="item-date date" data-date=' +
                  nowDate +
                  ">" +
                  finallyDate.date +
                  "</span></div>";
              } else {
                calendar +=
                  '<div class="col-15 grey"><span class="item-date date" data-date=' +
                  nowDate +
                  ">" +
                  finallyDate.date +
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
     * 创建日历
     * @param date
     * @param signList
     */
    buildCal: function (signList) {
      var that = this;

      var stDt = sessionStorage.getItem("cStDt");
      var endDt = sessionStorage.getItem("cEndDt")
      var attendMonth = sessionStorage.getItem("cMonth");

      var today = that.getStore("cMonth");
      var stDtDate = that.getStore("cStDt")
      var endDtDate = that.getStore("cEndDt")


      var i, k;
      // console.log("today.getDate()today.getDate()", today, today.getDate())
      var y = today.getFullYear(),
        m = today.getMonth(), //注意月份从0开始
        d = new Date().getDate(),
        curDate = timeUtils.dateFormat("YYYY-m-dd", new Date())
        // firstDay = new Date(y, m, 1), //获取当月的第一,天.
        // dayOfWeek = firstDay.getDay(), //判断第一天星期几(返回[0-6]中的一个，0代表星期天，1代表星期一，以此类推.)

        dayOfWeek = new Date(stDtDate).getDay(),

        dArr = timeUtils.getDateSolt(timeUtils.dateFormat("YYYY-mm-dd", stDtDate), timeUtils.dateFormat("YYYY-mm-dd", endDtDate), true, false);//计算日历上需要展示的天数
      // console.log("计算日历上需要展示的天数 stDtDate dayOfWeek", dArr)

      str_nums = Math.ceil((dayOfWeek + dArr.length) / 7); //确定日期表格所需行数
      console.log("curDate",curDate)
      var mm = m + 1;
      if (mm < 10) {
        mm = "0" + mm;
      }
      // console.log("dddddddddddddddddddddddd", d)
      var dateStr = y + "年" + mm + "月";
      var dateStr1 = y + "/" + mm + "/01";
      $$(".selected-date").html(dateStr);
      $$(".selected-date").data("date", dateStr1);
      var $calendar = $$("#calendar");
      var $calendar1 = $$("#calendar1");
      var calendar = "";


      var calendar1 = "";

      //把每个月第一天之前的时间填充为空


      for (i = 0; i < str_nums; i += 1) {
        //二维数组创建日期表格
        calendar += '<div class="row text-center">';

        for (k = 0; k < 7; k++) {
          var idx = 7 * i + k; //为每个表格创建索引,从0开始

          // console.log("i ----------- 7 * i + k", i, idx, "dArr[idx]", dArr[idx])
          var date = idx - dayOfWeek + 1; //将每月一号与星期进行匹配
          date <= 0 || date > dArr.length
            ? (date = " ")
            : (date = idx - dayOfWeek + 1); //索引小于等于0或者大于月份最大值就用空表格代替

          var finallyDate = dArr[date - 1]

          var nowDate = finallyDate && finallyDate.name;

          
          if (date !== " ") {
            console.log("signList", signList)
            var ifIsWork = that.ifwork(signList, finallyDate.name);//是否需要上班
            console.log("ifIsWork, date, d", ifIsWork, date, d, finallyDate)
            if (ifIsWork) {
              var ifHasSigned = that.ifSigned(signList, finallyDate.name);
              // console.log("d:" + d + ",date:" + date + "号有排班，ifHasSigned：" + ifHasSigned + " (0:全天上下班正常打卡;1:迟到早退;2:旷工;3：其他;)");
              if (finallyDate.name == curDate) {
                if (ifHasSigned == 0) {
                  //全天正常签到
                  calendar +=
                    '<div class="col-15 round selected"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-blue"></span></div>';
                } else if (ifHasSigned == 1) {
                  //迟到早退
                  calendar +=
                    '<div class="col-15 round selected"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-orange"></span></div>';
                } else if (ifHasSigned == 2) {
                  //旷工
                  calendar +=
                    '<div class="col-15 round selected"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-red"></span></div>';
                } else {
                  //其他
                  calendar +=
                    '<div class="col-15 round selected"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-grey"></span></div>';
                }
              } else if (finallyDate.name < curDate) {
                if (ifHasSigned == 0) {
                  //全天正常签到
                  calendar +=
                    '<div class="col-15"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-blue"></span></div>';
                } else if (ifHasSigned == 1) {
                  //迟到早退
                  calendar +=
                    '<div class="col-15"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-orange"></span></div>';
                } else if (ifHasSigned == 2) {
                  //旷工
                  calendar +=
                    '<div class="col-15"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-red"></span></div>';
                } else {
                  //其他
                  calendar +=
                    '<div class="col-15"><span class="item-date date" data-date=' +
                    nowDate +
                    ">" +
                    finallyDate.date +
                    '</span><span class="text-selected dot-grey"></span></div>';
                }
              } else {
                //大于今天的班次不显示考勤状态
                calendar +=
                  '<div class="col-15"><div class="item-date date" data-date=' +
                  nowDate +
                  ">" +
                  finallyDate.date +
                  "</div></div>";
              }
            } else {
              // console.log(date + "号没有排班");
              //无排班日期置灰显示
              if (finallyDate.name == curDate) {
                calendar +=
                  '<div class="col-15 round selected grey"><span class="item-date date" data-date=' +
                  nowDate +
                  ">" +
                  finallyDate.date +
                  "</span></div>";
              } else {
                calendar +=
                  '<div class="col-15 grey"><span class="item-date date" data-date=' +
                  nowDate +
                  ">" +
                  finallyDate.date +
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
      $calendar1.html(calendar1);

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
      // invokFrontApi.getAttendSchedule(param, function (result) {
      var result = {
        _result: true,
        data: {
          // stDt: '2021-08-15 00:00:00',
          // endDt: '2021-08-15 00:00:00',
          // attendMonth: '2021-08',
        }
      }
      console.log("考勤排班：");
      console.log(result);
      if (result._result) {
        $$("#work-schedule").find("ul").html();
        var data = result.data;
        var p = {
          items: data,
        };
        // if (data && data.length == 0) {
        //   var workListHtml = tplManager.renderTplById("noWorkTpl", p);
        // } else {
        //   var workListHtml = tplManager.renderTplById("workListTpl", p);
        // }
        // $$("#work-schedule").find("ul").html(workListHtml);
      } else {
        myApp.alert(result._message);
      }
      myApp.hideIndicator();
      // });
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
      // invokFrontApi.getAttendRecord(p, function (result) {
      var result = {
        _result: true,
        data: {
          // stDt: '2021-08-15 00:00:00',
          // endDt: '2021-08-15 00:00:00',
          // attendMonth: '2021-08',
        }
      }
      console.log("个人原始刷卡记录：");
      console.log(result);
      if (result._result) {
        $$("#record-list").find("ul").html();
        var data = result.data;
        var p = {
          items: data,
        };
        // if (data && data.length > 0) {
        //   var KQRecordHtml = tplManager.renderTplById("KQRecordTpl", data);
        // } else {
        //   var KQRecordHtml = tplManager.renderTplById("noKQRecordTpl", data);
        // }
        // $$("#record-list").find("ul").html(KQRecordHtml);
      } else {
        myApp.alert(result._message);
      }
      myApp.hideIndicator();
      // });
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
        if (item.fulldate == day) {
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
      // console.log("day", day)
      // console.log("dateList", dateList)
      var iswork = false;
      // $$.each(dateList, function (index, item) {
      //   if (item.signDay == day) {
      //     iswork = true;
      //     return false;
      //   }
      // });
       $$.each(dateList, function (index, item) {
        if (item.fulldate == day) {
          iswork = true;
          return false;
        }
      });
      return iswork;
    },
  };


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
        fromPage.name === "myApply" ||
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
