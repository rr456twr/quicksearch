$(document).ready(function ($) {
    var lang = "tw";

 //search area
 $("div.quickSearch div.titles li").click(function (e) {
    $("div.quickSearch div.titles li").removeClass("active");
    $(this).addClass("active");
    $(".searchContent").hide();
    $("#" + $(this).data("type")).show();
  });
  //使用enter直接啟動搜尋的功能
  $(document).keypress(function (e) {
    if (e.keyCode == 13) {
      // console.log("------------");
      var _t = $("div.quickSearch div.titles li.active").data("type");
      $("#" + _t + " button.submit").trigger("click");
    }
  });

  //共用：切換ul li的選單到.list-item 並把資料塞到 .list-item 以便取得資料.

  var selectData = {}; //搜尋選單共用的資料存放容器

  $("div.searchContent ul.dropdown-menu li a").click(function () {
    var path = $(this).parent().parent().parent().find(".list-item");
    var o = $(this).data();
    path.html($(this).html() + "<span class='caret'></span>");
    selectData = {}; //清空容器
    //將資料輸入到容器之中
    for (var key in $(this).data()) {
      selectData[key] = $(this).data()[key];
    }
    console.log(selectData);
  });

  $("#searchType1 button.submit").click(function () {
    var url = "https://lib.yzu.edu.tw/ajaxYZlib/Search/SearchConnect.aspx?";
    var code = "code=TI";
    var mt = "";

    if (selectData.type) {
      code = "code=" + selectData.type;
    }
    if (selectData.mt) {
      mt = "&material_type=" + selectData.mt;
    }

    var str = $(this).parent().parent().find(".form-control").val();
    if (str != "") {
      str = encodeURIComponent(str);
      str = "&requestStr=" + str.replace(/\s/g, "+");
      window.open(url + code + mt + str, "_blank");
      console.log(url + code + mt + str);
    }
  });

  //searchType2
  var t2 = {};
  t2.btns = $("#searchType2 a.linkBtn");
  t2.radios = $("#searchType2 input:radio");
  t2.radios.eq(0).prop("checked", "ture");
  t2.btns.hide();
  t2.btns.eq(0).show();
  t2.radios.eq(0).click(function () {
    t2.btns.hide().eq(0).show();
  });
  t2.radios.eq(1).click(function () {
    t2.btns.hide().eq(1).show();
    t2.btns.eq(2).show();
  });
  t2.radios.eq(2).click(function () {
    t2.btns.hide().eq(3).show();
  });

  $("#searchType2 button.submit").click(function () {
    alert("test");
    var url,
      str = "";
    switch ($("#searchType2 input[name=type2]:checked").val()) {
      case "literature":
        str = $(this).parent().parent().find(".form-control").val();
        str = encodeURIComponent(str);
        str = str.replace(/\s/g, "%20");
        url =
          "https://autorpa.yzu.edu.tw/login?url=http://yzu.summon.serialssolutions.com/search?q=" +
          str +
          "&l=zh";
        alert(url);
        console.log("literature");
        break;
      // case 'google':
      // 	str = $(this).parent().parent().find('.form-control').val();
      // 	str = encodeURIComponent(str);
      // 	str = str.replace(/\s/g, "%20");
      // 	url = "http://autorpa.yzu.edu.tw/login?url=http://scholar.google.com.tw/scholar?q="+str+"&hl=zh-TW&lr=";
      // 	console.log('google');
      // 	break;
      default:
        //database
        str = $(this).parent().parent().find(".form-control").val();
        str = encodeURIComponent(str);
        str = str.replace(/\s/g, "+");
        url =
          "https://lib.yzu.edu.tw/ERWeb2/preQueryEDB.aspx?QryStr=" +
          str +
          "&LangVersion=CN";
    }
    if (str != "") {
      window.open(url, "_blank");
    }
  });

  $("#searchType3 input.submit").click(function (e) {
    e.preventDefault();

    var url =
      "https://autorpa.yzu.edu.tw/login?url=https://search.ebscohost.com/login.aspx?direct=true&authtype=guest%2Cip&site=pfi-live&db=edspub&custid=s6622083&groupid=main&profid=pfi";

    s = "&bquery=";
    var str = $(this).parent().parent().find(".form-control").val();

    if (str != "") {
      str = encodeURIComponent(str);
      str = str.replace(/\s/g, "+");
      window.open(url + s + str, "_blank");
    }
  });

  var t4 = {};
  t4.btns = $("#searchType4 a.linkBtn");
  t4.radios = $("#searchType4 input:radio");
  t4.radios.eq(0).prop("checked", "ture");
  t4.btns.hide();
  t4.btns.eq(0).show();
  t4.radios.eq(0).click(function () {
    t4.btns.hide().eq(0).show();
  });
  t4.radios.eq(1).click(function () {
    t4.btns.hide().eq(1).show();
  });
  $("#searchType4 button.submit").click(function () {
    var url,
      str = "";
    // console.log($("#searchType4 input[name=type4]:checked").val());
    switch ($("#searchType4 input[name=type4]:checked").val()) {
      case "google":
        str = $(this).parent().parent().find(".form-control").val();
        str = encodeURIComponent(str);
        str = str.replace(/\s/g, "+");
        url = "https://www.google.com/search?tbm=bks&tbo=1&hl=zh-TW&q=" + str;
        break;
      default:
        //database
        str = $(this).parent().parent().find(".form-control").val();
        str = encodeURIComponent(str);
        str = str.replace(/\s/g, "+");
        url =
          "https://lib.yzu.edu.tw/ajaxYZlib/Search/SearchConnect.aspx?code=WRD&requestStr=" +
          str +
          "&material_type=EB";
    }

    if (str != "") {
      window.open(url, "_blank");
    }
  });

  //serchType6
  var gSearchForm = $("form[name='gSearch']");
  var t6 = {};

  t6.hl = gSearchForm.children("input[name='hl']").val();
  t6.query = gSearchForm.children("input[name='q']");
  t6.submit = gSearchForm.children("input.submit");
  t6.radio = "";
  $("input[name='type6']").eq(0).prop("checked", "true");

  $("#gSearch").hide();

  $("#searchType6>input[name='type6']").on("click", function () {
    t6.radio = $(this).val();

    if (t6.radio == "museSearch") {
      $("#museSearch").show();
      $("#gSearch").hide();
    } else {
      $("#gSearch").show();
      $("#museSearch").hide();
    }
  });

  $("#gSearch input.submit").on("click", function () {
    t6.query = $("form[name='gSearch'] input[name='q']");
    let string = "";
    string = encodeURIComponent(t6.query.val());
    string = string.replace(/\s/g, "%20");

    string =
      "https://autorpa.yzu.edu.tw/login?url=https://scholar.google.com.tw/scholar?q=" +
      string +
      "&hl=" +
      t6.hl +
      "&lr=";

    if (string != "") {
      window.open(string, "_blank");
    }
    return false;
  });

  $("form[name='museSearch']").on("submit", function (e) {
    e.preventDefault();
    let url =
      "https://autorpa.yzu.edu.tw/login?url=https://search.ebscohost.com/login.aspx";
    this.action = url;
    ebscoPreProcess(this);
    let formArray = $(this).serializeArray();

    const newForm = new Object();
    $.each(formArray, function (index, value) {
      if (value.name != "uquery") {
        let key = value.name;
        let val = value.value;
        newForm[key] = val;
      }
    });

    let param = $.param(newForm);
    str = url + "?" + param;

    if (str != "") {
      window.open(str, "_blank");
    }
  });
  $("#fulltext_checkbox_all").on("click", function () {
    limittoFullText($("form[name='museSearch']")[0]);
  });
  $("#scholarly_checkbox_articles").on("click", function () {
    limittoScholarly($("form[name='museSearch']")[0]);
  });

  function limittoFullText(myForm) {
    console.log(myForm);
    if (myForm.fulltext_checkbox.checked) myForm.clv0.value = "Y";
    else myForm.clv0.value = "N";
  }
  function limittoScholarly(myForm) {
    if (myForm.scholarly_checkbox.checked) myForm.clv1.value = "Y";
    else myForm.clv1.value = "N";
  }
  function limittoCatalog(myForm) {
    if (myForm.catalog_only_checkbox.checked) myForm.clv2.value = "Y";
    else myForm.clv2.value = "N";
  }
  function ebscoPreProcess(myForm) {
    myForm.bquery.value = myForm.search_prefix.value + myForm.uquery.value;
  }

  function changeSearchTextToENG() {
    var url = document.URL;
    url = url.replace("http://", "");
    url = url.replace("https://", "");
    url = url.split("/");
    if (url[3] != "tw") {
      $("#mod-search-searchword").attr("placeholder", "Website Search");
      lang = "en";
    }
    // console.log(url);
  }

  getData();
  window.setInterval(function () {
    getData();
  }, 30000);

  function getData() {
    $.ajax({
      url: "https://www.yzu.edu.tw/library/templates/yzu_2016/getCapacity.php",
      // url:"./templates/yzu_2016/getCapacity.php",
      dataType: "json",
      type: "GET",
      success: function (data) {
        $(".capacity .quote").text(data.quots);
        $(".capacity .now").text(data.now);
        // console.log(data);
      },
      error: function (xmlHttpRequest, error) {
        // $(".capacity").text( "" );
        // console.log("load Capacity error");
      },
    });
  }
}); 

// quicksearch.js.dropdownmenu

document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.getElementById('dropdownMenuButton');
    const dropdownMenu = dropdownToggle ? dropdownToggle.nextElementSibling : null;

    if (dropdownToggle && dropdownMenu) {
        // 下拉按鈕的事件處理程式
        dropdownToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            dropdownMenu.classList.toggle('show'); // 切換顯示狀態
        });

        // 點擊選項的事件處理程式
        const options = dropdownMenu.querySelectorAll('a'); // 假設選項是 <a> 標籤
        options.forEach(option => {
            option.addEventListener('click', function(event) {
                event.stopPropagation(); // 防止事件冒泡
                dropdownToggle.textContent = this.textContent; // 更新按鈕文本
                dropdownMenu.classList.remove('show'); // 關閉下拉菜單
            });
        });
    } else {
        console.error('未找到下拉按鈕或下拉菜單');
    }

    // 點擊空白處關閉下拉選單
    document.addEventListener('click', function() {
        if (dropdownMenu) {
            dropdownMenu.classList.remove('show'); // 關閉下拉菜單
        }
    });
});

// quicksearch.js.pulldownmenu

document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.getElementById('pullmenubutton');
    const dropdownMenu = dropdownToggle ? dropdownToggle.nextElementSibling : null;

    if (dropdownToggle && dropdownMenu) {
        // 下拉按鈕的事件處理程式
        dropdownToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            dropdownMenu.classList.toggle('show'); // 切換顯示狀態
        });

        // 點擊選項的事件處理程式
        const options = dropdownMenu.querySelectorAll('a'); // 假設選項是 <a> 標籤
        options.forEach(option => {
            option.addEventListener('click', function(event) {
                event.stopPropagation(); // 防止事件冒泡
                dropdownToggle.textContent = this.textContent; // 更新按鈕文本
                dropdownMenu.classList.remove('show'); // 關閉下拉菜單
            });
        });
    } else {
        console.error('未找到下拉按鈕或下拉菜單');
    }

    // 點擊空白處關閉下拉選單
    document.addEventListener('click', function() {
        if (dropdownMenu) {
            dropdownMenu.classList.remove('show'); // 關閉下拉菜單
        }
    });
});

// quicksearch.js.pulldownmenu

document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.getElementById('downmenu');
    const dropdownMenu = dropdownToggle ? dropdownToggle.nextElementSibling : null;

    if (dropdownToggle && dropdownMenu) {
        // 下拉按鈕的事件處理程式
        dropdownToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            dropdownMenu.classList.toggle('show'); // 切換顯示狀態
        });

        // 點擊選項的事件處理程式
        const options = dropdownMenu.querySelectorAll('a'); // 假設選項是 <a> 標籤
        options.forEach(option => {
            option.addEventListener('click', function(event) {
                event.stopPropagation(); // 防止事件冒泡
                dropdownToggle.textContent = this.textContent; // 更新按鈕文本
                dropdownMenu.classList.remove('show'); // 關閉下拉菜單
            });
        });
    } else {
        console.error('未找到下拉按鈕或下拉菜單');
    }

    // 點擊空白處關閉下拉選單
    document.addEventListener('click', function() {
        if (dropdownMenu) {
            dropdownMenu.classList.remove('show'); // 關閉下拉菜單
        }
    });
});
