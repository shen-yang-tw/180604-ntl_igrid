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
  $(".search_option>div:last").after($(".search_option>div:first").clone().removeClass('uk-row-first'));
  $(".search_option [data-uk-alert]:last .option").remove();
  $("#addBtn, #addBtn_mobile").click(function() {
    //button #add cannot place in <form> or not working
    var counter = $(this).parent().parent().children().length;
    $(this).parent().siblings().not(":first").find("button").addClass('uk-alert-close');
    var newSearch = $(this).parent().parent().children(":first").clone().removeClass('uk-row-first');
    newSearch.children().children().children(":first").children("input").val("");
    newSearch.find("button").addClass('uk-alert-close');
    
    if (counter < 6) {
      // if (counter < 3) {}
      //   $(this).parent().parent().children(":first button").removeClass('uk-alert-close');
      // }
      $(this).parent().parent().children(":nth-child(2)").after(newSearch);
      $(this).parent().parent().children("[data-uk-alert]:last .option").remove();
    }
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
    $("#checkedNumber, .checkedNumber").text($('input.listCheckB:checked').length);
    console.log($('input.listCheckB:checked').length);
  });
  $(".uncheckAllB").click(function() {
    $('.listCheckB').prop('checked', false);
    $('.checkAllB').prop('checked', false);
    $("#checkedNumber, .checkedNumber").text($('input.listCheckB:checked').length);
  });
  $(".listCheckB").click(function() {
    if ($(this).is(':checked')) {
      $(this).prop('checked', true);
      if ($('.listCheckB:checked').length == $('.listCheckB').length) {
        $('.checkAllB').prop('checked', true);
      }
    } else {
      $(this).prop('checked', false);
      $('.checkAllB').prop('checked', false);
    }
    $("#checkedNumber, .checkedNumber").text($('input.listCheckB:checked').length);
  });
  $(".sort>li:not(:first-child)>a").click(function() {
    $('[data-uk-grid]').on('beforeupdate.uk.grid', function() {
      $('[aria-hidden="true"] .listCheckB').prop('checked', false);
      $('.checkAllB').prop('checked', false);
      $("#checkedNumber, .checkedNumber").text($('input.listCheckB:checked').length);
    });
  });
  $(".deleteAll").click(function() {
    $(".listCheckB:checked").prev().trigger("click");
    $("#checkedNumber, .checkedNumber").text("0");
  });

  //listTabs remove .uk-active as click to close tabs
  $(".listTabs .uk-nav>li.uk-open").click(function() {
    $(this).removeClass("uk-active");
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
    $("#checkedNumber, .checkedNumber").text("0");
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

  //Set Height of Slider & Width of Images
  $("#tabsA>li,#tabsB>li").click(function() {
    var height_Slider = $(this).parent().siblings().children(".active").find(".uk-slider:visible").height();
    var width_img = $(this).parent().siblings().children(".active").find(".uk-slider:visible").children("li").find(".uk-panel").children("img").width();
    $(this).parent().siblings().children().find(".uk-slider").css('min-height', height_Slider);
    $(this).parent().siblings().children().find(".uk-slider").children("li").find(".uk-panel").children("img").height(width_img);
  });
  $(window).on('resize', function() {
    location.reload();
  });

});

//the browser window resize
$(window).on("resize load", function() {
  //keep aspect ratio of slider image's height to width as 4:3
  $(".ratio4_3 li img").each(function() {
    $(this).css({
      height: $(this).width() * 3 / 4
    });
    // $(this).css({ height: $(this).width() * 9 / 16 });
  });
  $(".ratio5_4 li img").each(function() {
    $(this).css({
      height: $(this).width() * 4 / 5
    });
  });
  $(".ratio1_1 li img").each(function() {
    $(this).css({
      height: $(this).width() * 1
    });
  });

});


UIkit.on('beforeready.uk.dom', function() {
  var hash = document.location.hash;
  if (hash) {
    UIkit.$(hash).addClass('uk-active').siblings().removeClass('uk-active');
  }
});