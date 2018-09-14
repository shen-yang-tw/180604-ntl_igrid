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
  var dataAttr,dataName;
  ////single check
  $(".listTabs a.listCheck").click(function() {
    dataAttr = $(this).attr("data-uk-toggle").slice(15, 18);
    dataName = $(this).attr("data-uk-toggle").slice(20, -18);
    $(this).children().children("[class*=uk-icon]").toggleClass("uk-icon-square-o uk-icon-check-square-o");
    if ($(this).children().children("[class*=uk-icon]").hasClass("uk-icon-check-square-o")) {
      // alert("[data-" + dataAttr + "*='" + dataName + "']" + ", " + "It is check");
      $(".ratio1_1.uk-list>li[data-" + dataAttr + "*='" + dataName + "']").removeClass("uk-hidden").addClass("active");
      $(".ratio1_1.uk-list>li:not(.active)").addClass("uk-hidden");
    }
    if ($(this).children().children("[class*=uk-icon]").hasClass("uk-icon-square-o")) {
      // alert(dataAttr + ", " + dataName + ", " + "It is square");
      $(".ratio1_1.uk-list>li[data-" + dataAttr + "*='" + dataName + "']").addClass("uk-hidden").removeClass("active");
    }
  });
  ////group check
  $(".listTabs>ul>li>a.checkAllA").click(function() {
    dataAttr = $(this).siblings().children().children("a.listCheck").attr("data-uk-toggle").slice(15, 18);
    dataName = $(this).siblings().children().children("a.listCheck").attr("data-uk-toggle").slice(20, -18);
    
    if ($(this).children().hasClass("uk-icon-check-square-o")) {
      $(this).siblings().children().children("a.listCheck").children().children("[class*=uk-icon]").removeClass("uk-icon-check-square-o").addClass("uk-icon-square-o");
      $(this).siblings().children("[data-uk-button]").removeClass("uk-active");
      $(".ratio1_1.uk-list>li[data-" + dataAttr + "*='" + dataName + "']").removeClass("uk-hidden").addClass("active");
    }
    if ($(this).children().hasClass("uk-icon-square-o")) {
      $(this).siblings().children().children("a.listCheck").children().children("[class*=uk-icon]").removeClass("uk-icon-square-o").addClass("uk-icon-check-square-o");
      $(this).siblings().children("[data-uk-button]").addClass("uk-active");
      $(".ratio1_1.uk-list>li[data-" + dataAttr + "*='" + dataName + "']").addClass("uk-hidden").removeClass("active");
      if (!$(this).parent().siblings().children("a.checkAllA").children().children("[class*=uk-icon]").hasClass("uk-icon-check-square-o")) {
        $(".ratio1_1.uk-list>li[data-" + dataAttr + "*='" + dataName + "']").removeClass("uk-hidden").addClass("active");
      }
    }
    $(this).children().toggleClass("uk-icon-square-o uk-icon-check-square-o");
  });

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
  $(".ratio1_1 li img").each(function() {
    $(this).css({
      height: $(this).width() * 1
    });
    // $(this).css({ height: $(this).width() * 9 / 16 });
  });

});