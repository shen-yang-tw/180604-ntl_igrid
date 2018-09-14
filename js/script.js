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
    //button #add cannot place in <form> or not working
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

  //dynamically toggle check on list & show check numbers
  $(".checkAllB").click(function() {
    // $('.checkAllB').prop('checked', this.checked);
    $('.listCheckB').prop('checked', this.checked);
    $('[aria-hidden="true"] .listCheckB').prop('checked', false);
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
  $(".sort>li:not(:first-child)>a").click(function() {
    $('[data-uk-grid]').on('beforeupdate.uk.grid', function() {
      $('[aria-hidden="true"] .listCheckB').prop('checked', false);
      $('.checkAllB').prop('checked', false);
      $("#checkedNumber").text($('input.listCheckB:checked').length);
    });
  });
  $(".deleteAll").click(function() {
    $(".listCheckB:checked").prev().trigger("click");
    $("#checkedNumber").text("0");
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
  $(".uk-switcher .ratio4_3 li img").each(function() {
    $(this).css({
      height: $(this).width() * 2
    });
  });
  $(".ratio5_4 li img").each(function() {
    $(this).css({
      height: $(this).width() * 5 / 4
    });
  });
  $(".ratio1_1 li img").each(function() {
    $(this).css({
      height: $(this).width() * 1
    });
  });

  //rate
  $(".rate>button").hover(function() {
    $(this).addClass("color_primary");
    if ($(this).hasClass("checked")) {
      $(this).addClass("opacity70");
    }
    $(this).prevAll().not(".rate>:first-child").addClass("color_primary");
    $(this).nextAll().not(".checked").removeClass("color_primary");
  }, function() {
    $(".rate>button").not(".checked").removeClass("color_primary");
    $(".rate>button").removeClass("opacity70");
  });
  $(".rate>button").click(function() {
    if ($(this).is(".checked:last")) {
      $(".rate>button.checked").removeClass("color_primary checked opacity70");
      $(".rate>.rateScore").text("0");
    } else {
      $(this).addClass("color_primary checked").removeClass("opacity70");
      $(this).prevAll().not(".rate>:first-child").addClass("color_primary checked").removeClass("opacity70");
      $(this).nextAll().removeClass("color_primary checked opacity70");
      $(".rate>.rateScore").text($(this).index());
    }
  });
  $(".rate>a.cancelRate").click(function() {
    $(".rate>a").removeClass("color_primary");
    $(".rate>.rateScore").text("0");
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

  //uk-accordion-title
  $(".uk-accordion-title").click(function() {
    $(this).children().toggleClass("uk-icon-chevron-up uk-icon-chevron-down")
  });

  //Add tag - clone(true) pass "true" then it will copy the click events or click not working
  $(".tag #btn_add").click(function() {
    var newTag = $(".tag>div:nth-child(2)").removeClass("uk-hidden").clone(true);
    $(".tag>div:nth-child(2)").addClass("uk-hidden");
    $(".tag>div:last").before(newTag);
  });
  $(".tag.tag_btn #btn_add").click(function() {
    var newTab = $("#sortTabs").prev().removeClass("uk-hidden").clone(true);
    $("#sortTabs").prev().addClass("uk-hidden");
    $("#sortTabs>button:last").before(newTab);
  });
  $(".tag.tag_btn .btn_AddTag").click(function() {
    var newTag = $(".tag>div:nth-child(2)").removeClass("uk-hidden").clone(true);
    $(".tag>div:nth-child(2)").addClass("uk-hidden");
    $(".tag>div:last").before(newTag);
    var newTab = $("#sortTabs").prev().removeClass("uk-hidden").clone(true);
    $("#sortTabs").prev().addClass("uk-hidden");
    $("#sortTabs>button:last").before(newTab);
    $(".listCheckB:checked").parent().parent().attr("data-uk-filter", "新標籤");
    $("#sortTabs>button").prev().attr("data-uk-filter", "新標籤").trigger("click");
    $(".listCheckB:checked").prop('checked', false);
    $("#checkedNumber").text("0");
  });
  $(".tag_btn .uk-alert-close").click(function() {
    var tagName = $(this).next().children("label").children("a").html();
    // $("#sortTabs").find("li[data-uk-filter='" + tagName + "']").remove();
    $("#sortTabs>li" + "[data-uk-filter='" + tagName + "']").remove();
    $("#sortTabs+ul>li" + "[data-uk-filter='" + tagName + "']").attr("data-uk-filter", "");
    $("#sortTabs>li:first").trigger("click");
  });
  $(".tag_btn .btn_reset").click(function() {
    $(".tag_btn>[data-uk-alert]:not(:first)").remove();
    $("#sortTabs>li[data-uk-filter]:not(:first-child):not(:nth-child(2))").remove();
    $("#sortTabs").next("ul").children("[data-uk-filter]:not([data-uk-filter='addedToday'])").attr("data-uk-filter", "");
    $("#sortTabs>li:first").trigger("click");
  });

  //uk-accordion show uk-accordion-title when not empty
  $(".uk-accordion .uk-accordion-content>.uk-panel").find(".checkEmpty:not(:empty)").closest(".uk-accordion").children(".uk-accordion-title").removeClass("uk-hidden");

});

UIkit.on('beforeready.uk.dom', function() {
  var hash = document.location.hash;
  if (hash) {
    UIkit.$(hash).addClass('uk-active').siblings().removeClass('uk-active');
  }
});