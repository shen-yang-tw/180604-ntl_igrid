// fix 100 vh in Android Chrome
var vhFix = new VHChromeFix([{
  selector: '.fullViewH',
  vh: 100
}]);

$(document).ready(function() {

  //Get current year
  $(".year").text((new Date).getFullYear());

  //Remove parent if child empty
  $("p:empty, h1:empty, h2:empty, h3:empty, h4:empty, h5:empty, h6:empty").parent(":empty").remove();
  //Remove if empty
  $("p:empty, h1:empty, h2:empty, h3:empty, h4:empty, h5:empty, h6:empty").remove();

  //for Plus Search page
  $("#search_option>div:nth-child(2)").after($("#search_option>div:first").clone().removeClass('uk-row-first'));
  $("#search_option [data-uk-alert]:last .option").remove();
  $("#search_option>div:first button").removeClass('uk-alert-close');
  $("#add").click(function() {
    //button #add cannot place in <form> or won't working
    var counter = $("#search_option>div").length;
    $("#search_option>div:first button").addClass('uk-alert-close');
    var newSearch = $("#search_option>div:first").clone().removeClass('uk-row-first');
    if (counter < 6) {
      if (counter < 3) {
        $("#search_option>div:first button").removeClass('uk-alert-close');
      }
      $("#search_option>div:nth-child(2)").after(newSearch);
      $("#search_option [data-uk-alert]:last .option").remove();
    }
    $("#search_option>div:first button").removeClass('uk-alert-close');
    // $("#searchBar").parent().height($("#searchBar").height() + 30); //for sicky
  });

  //rangeSlider
  $("#range").ionRangeSlider({
    hide_min_max: true,
    keyboard: true,
    min: 1896,
    max: 2019,
    from: 1896,
    to: 2019,
    type: 'double',
    step: 1,
    postfix: "年",
    grid: true,
    prettify_enabled: false
  });

  //keep aspect ratio of slider image's height to width as 4:3
  $(".ratio4_3.uk-slider li a img").each(function() {
    $(this).css({
      height: $(this).width() * 4 / 3
    });
    // $(this).css({ height: $(this).width() * 9 / 16 });
  });
  $(".ratio1_1.uk-slider li a img").each(function() {
    $(this).css({
      height: $(this).width() * 1
    });
    // $(this).css({ height: $(this).width() * 9 / 16 });
  });

  //remove self after show .listMore
  $(".btnMore").click(function() {
    $(this).parent().siblings(".listMore").removeClass("uk-hidden");
    $(this).parent().remove();
  });

  //dynamically toggle check on side list menu & show list
  ////single check
  $(".listCheckA").click(function() {
    $(this).parent().parent().parent().toggleClass("uk-active");
  });
  ////group check
  $(".checkAllA").click(function() {
    $(this).parent().siblings().children().children().children().children(".listCheckA").prop('checked', this.checked);
    $(this).parent().siblings().children().toggleClass("uk-active");
  });
  // var dataAttr,dataName;
  // ////single check
  // $(".listTabs a.listCheck").click(function() {
  //   $(this).children().children("[class*=uk-icon]").toggleClass("uk-icon-square-o uk-icon-check-square-o");
  // });
  // ////group check
  // $(".listTabs>ul>li>a.checkAllA").click(function() {
  //   if ($(this).children().hasClass("uk-icon-check-square-o")) {
  //     $(this).siblings().children().children("a.listCheck").children().children("[class*=uk-icon]").removeClass("uk-icon-check-square-o").addClass("uk-icon-square-o");
  //     $(this).siblings().children("[data-uk-button]").removeClass("uk-active");
  //   }
  //   if ($(this).children().hasClass("uk-icon-square-o")) {
  //     $(this).siblings().children().children("a.listCheck").children().children("[class*=uk-icon]").removeClass("uk-icon-square-o").addClass("uk-icon-check-square-o");
  //     $(this).siblings().children("[data-uk-button]").addClass("uk-active");
  //   }
  //   $(this).children().toggleClass("uk-icon-square-o uk-icon-check-square-o");
  // });

  //dynamically toggle check on list & show check numbers
  $(".checkAllB").click(function() {
    // $('.checkAllB').prop('checked', this.checked);
    $('.listCheckB').prop('checked', this.checked);
    $("#checkedNumber").text($('input.listCheckB:checked').length);
  });
  $(".uncheckAllB").click(function() {
    $('.listCheckB').prop('checked', false);
    $('.checkAllB').prop('checked', false);
    $("#checkedNumber").text($('input.listCheckB:checked').length);
  });
  $(".listCheckB").click(function() {
    $("#checkedNumber").text($('input.listCheckB:checked').length);
  });

  //listTabs remove .uk-active as click to close tabs
  $(".listTabs .uk-nav>li.uk-open").click(function() {
    $(this).removeClass("uk-active");
  });

  //keep aspect ratio of slider image's height to width as 4:3
  $(".ratio4_3 li img").each(function() {
    $(this).css({
      height: $(this).width() * 4 / 3
    });
    // $(this).css({ height: $(this).width() * 9 / 16 });
  });
  $(".ratio5_4 li img").each(function() {
    $(this).css({
      height: $(this).width() * 5 / 4
    });
    // $(this).css({ height: $(this).width() * 9 / 16 });
  });
  $(".ratio1_1 li img").each(function() {
    $(this).css({
      height: $(this).width() * 1
    });
    // $(this).css({ height: $(this).width() * 9 / 16 });
  });

  //rate
  $(".rate>a:not(:first-of-type)").hover(function() {
    $(this).prevAll().not(".rate>:first-of-type").addClass("color_primary");
  }, function() {
    $(this).prevAll().not(".rate>a.color_primary").not(".rate>:first-of-type").removeClass("color_primary");
  });
  $(".rate>a:not(:first-of-type)").click(function() {
    $(this).addClass("color_primary");
    $(this).prevAll().not(".rate>:first-of-type").addClass("color_primary");
    $(this).nextAll().not(".rate>:first-of-type").removeClass("color_primary");
    $(".rate>.rateScore").text($(this).index() - 1);
  });
  $(".rate>a.cancelRate").click(function() {
    $(".rate>a").removeClass("color_primary");
    $(".rate>.rateScore").text("");
  });

  //uikit 2&3 - click button to show tooltip
  $(".btn_comment").hover(function() {
    $(this).click(function() {
      if ($("#comment").val() != "") {
        $(this).attr("title", "評論已變更");
        $.UIkit.tooltip(this, {
          animation: true,
        }).show();
      } else {
        $(this).attr("title", "請填寫評論");
        $.UIkit.tooltip(this, {
          animation: true,
        }).show();
      }
    });
  }, function() {
    $(this).delay(50000).attr("title", "");
  });

});