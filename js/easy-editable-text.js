$(document).ready(function() {
  $('.editable>.text_input').hide();
  $('.editable>.edit').click(function() {
    $(this).hide();
    $(this).next().hide();
    $(this).next().next().show();
    $(this).next().next().select();
  });

  $('.editable>.text_input').blur(function() {
    var oldTagName = $(this).prev().children().text();
    if ($.trim(this.value) == '') {
      this.value = (this.defaultValue ? this.defaultValue : '');
      $(this).parent().parent().parent().addClass("newTag");
      $(this).prev().attr("title", "請點擊筆形按鈕輸入標籤");
    } else {
      $(this).prev().children("a").html(this.value); //.text_label>a
      $(this).prev().children().children().children().html(this.value); //.text_label>button>span>a, .text_label>button>span>span
      $("#sortTabs>button:last").prev("li").attr("data-uk-filter", this.value); //set tab data
      $("#sortTabs>button:last").prev("li").children().html(this.value); //set tab name
      $(".listCheckB:checked").parent().parent().attr("data-uk-filter", this.value); //set checked list data
      $("#sortTabs").next("ul").children("li[data-uk-filter='" + oldTagName + "']").attr("data-uk-filter", this.value); //set list data
      $(this).parent().parent().parent().removeClass("newTag");
      $(this).prev().attr("title", "請點擊筆形按鈕修改標籤");
    }

    $(this).hide();
    $(this).prev().show(); //.text_label
    $(this).prev().prev().show(); //button.edit
  });

  $('.editable>.text_input').keypress(function(event) {
    var oldTagName = $(this).prev().children().text();
    if (event.keyCode == '13') { //means when the user clicks the enter key
      if ($.trim(this.value) == '') {
        this.value = (this.defaultValue ? this.defaultValue : '');
        $(this).parent().parent().parent().addClass("newTag");
        $(this).prev().attr("title", "請點擊筆形按鈕輸入標籤");
      } else {
        $(this).prev().children("a").html(this.value); //.text_label>a
        $(this).prev().children().children().children().html(this.value); //.text_label>button>span>a, .text_label>button>span>span
        $("#sortTabs>button:last").prev("li").attr("data-uk-filter", this.value); //set tab data
        $("#sortTabs>button:last").prev("li").children().html(this.value); //set tab name
        $(".listCheckB:checked").parent().parent().attr("data-uk-filter", this.value); //set checked list data
        $("#sortTabs").next("ul").children("li[data-uk-filter='" + oldTagName + "']").attr("data-uk-filter", this.value); //set list data
        $(this).parent().parent().parent().removeClass("newTag");
        $(this).prev().attr("title", "請點擊筆形按鈕修改標籤");
      }

      $(this).hide();
      $(this).prev().show(); //.text_label
      $(this).prev().prev().show(); //button.edit
    }
  });

});