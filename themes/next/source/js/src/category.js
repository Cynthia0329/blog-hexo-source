function category_js () {
  // 遍历列表，判断是否有子级（添加符号）
  $('.category-list-item').each(function(index,element) {
    if($(this).is(':has(.category-list-child)')) {
      $("<div class='display' style='float: left;cursor: pointer;'> &nbsp👉&nbsp </div>").prependTo(this);
    } else {
      $("<div class='display' style='float: left;cursor: pointer;'> &nbsp⚪&nbsp </div>").prependTo(this);
      $(this).find('.display').css({"pointer-events":"none"}).attr("disabled",true);
    }
  })

  // 隐藏子级
  $(".category-list-child").css("display","none");

  // 禁止点击
  // $(".category-list-link").css({"font-weight":"bold","pointer-events":"none"}).attr("disabled",true);

  // 将一级标题加粗
  $(".posts-expand .post-body .ul .category-list-item ").first().children(".category-list-link").css({"font-weight":"bold"});
  $(".posts-expand .post-body ul .category-list-item ").first().siblings("li").children(".category-list-link").css({"font-weight":"bold"});

  // 设置点击打开新窗口
  // $(".category-list-link").attr("target","_blank");

  // 去除子级的列表样式
  $(".posts-expand .post-body .category-all-page ul li ").css("list-style-type", "none");
  // 去除下划线
  $(".category-list-link ").css("border-bottom", "none");

  // 点击
  $(".display").click(function () {
    $(this).siblings(".category-list-child").slideToggle();
  })

}

$(document).ready(function() {
  category_js()
});
