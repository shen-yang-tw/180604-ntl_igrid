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

});