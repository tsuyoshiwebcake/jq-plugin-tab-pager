/************************************************************************
 * @Name      : TabPager - jQuery Plugin
 * @Version   : 2.0.0
 * @Author    : Tsuyoshi.
 * @AuthorURI : http://webcake.no003.info/
 * @License   : Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php
 *************************************************************************/
(function ($)
{
  $.fn.tabpager= function (config)
  {
  /**
   * オプションの初期値を設定
   * items		1ページあたりの最大表示数
   * contents		コンテンツのクラス名
   * time			ページ切り替え時のフェードイン時間
   * previous		前のページに1つ戻るナビゲーションのテキスト
   * next			次のページに1つ進むナビゲーションのテキスト
   * start		初期ロード時のタブ開始位置
   * position		ページナビゲーションの表示位置
   * scroll		スクロール位置を保持
   */
    var options =
    {
      items: 5,
      contents: 'contents',
      previous: 'Previous&raquo;',
      next: '&laquo;Next',
      time: 800,
      start: 1,
      position: 'bottom',
      scroll: true
    };

    // ユーザがオプションを指定した場合は、引き継ぐ
    var options = $.extend(options, config);

    // タブ設定
    $(this).addClass('jquery-tab-pager-tabbar');
    $tab = $(this).find('li');

    // スクロール位置
    var scrollPosTop = 0;

    // 初期設定
    init();

    /**
     * タブ切替
     */
    $tab.click(function()
    {
      // 選択要素のiのインデックス番号を取得
      var i = $tab.index(this);

      // 選択したタブにカレントクラスを付与
      $tab.removeClass('current');
      $(this).addClass('current')

      // 選択したタブと結合する内容にカレントクラスを付与し、カレントのみ表示する
      $('.' + options.contents)
        .removeClass('current')
        .hide()
        .eq(i)
        .addClass('current')
        .fadeIn(options.time);

      // 最初のペ－ジを表示する
      pager(1);
    });

    /**
     * ページネーション動作
     */
    $(document).on('click', '#jquery-tab-pager-navi li a', function()
    {
      if($(this).hasClass('disable'))
      {
      	return false;
      }

      // 選択要素のiのインデックス番号を取得
      var i = $('#jquery-tab-pager-navi li a').index(this);

      // ページ分割
      pager(i);

      // 本来のイベントハンドラをキャンセル
      return false;
    });

    /**
     * スクロール位置を保持
     */
    $(window).on('load scroll', function()
    {
      scrollPosTop = $(window).scrollTop();
    });

    /**
     * 初期設定
     */
    function init()
    {
      var start = options.start - 1;

      // 初期タブの設定
      $tab.eq(start).addClass('current');

      // 初期コンテンツの設定
      $('.' + options.contents)
        .hide()
        .eq(start)
        .show()
        .addClass('current');

      // ページ分割
      pager(1);
    }

    /**
     * ページ分割
     */
    function pager(idx)
    {
      // 要素のカウントを取得
      var count = $('.' + options.contents + '.current').children().length;

      // ページ数の取得（切り上げ）
      var page = Math.ceil(count / options.items);

      // ページを分割するナビゲーション要素を生成
      var html = '<ul id="jquery-tab-pager-navi">' +
                  '	<li><a href="#" class="previos">' + options.previous + '</a></li>';

      for(i = 0; i<page; i++)
      {
        html +=	'	<li><a href="#">' + (i+1) +'</a></li>';
      }
        html +=	'	<li><a href="#" class="next">' + options.next + '</a></li>' +
                  '</ul>';

      var current = idx;
      if (idx == 0)
      {
        current = parseInt($('#jquery-tab-pager-navi li a.current').html());
        if((current-1) != 0)
        {
          current--;
        }
      }
      else if(idx == page+1)
      {
        current = parseInt($('#jquery-tab-pager-navi li a.current').html());
        if((current+1) != page+1)
        {
          current++;
        }
      }

      idx = current;

      // 件数が0の時
      if(count == 0) html = '';

      // 要素の再追加
      $('#jquery-tab-pager-navi').remove();

      if(options.position == 'top')
      {
        $('.' + options.contents + '.current').before(html);
      }
      else
      {
        $('.' + options.contents + '.current').after(html);
      }

      // カレントクラスを付与
      $('#jquery-tab-pager-navi li a').removeClass('current');
      $('#jquery-tab-pager-navi li a').eq(idx).addClass('current');

      //前へ、次への制御用
      $('#jquery-tab-pager-navi li a').removeClass('disable');
      current = parseInt($('#jquery-tab-pager-navi li a.current').html());

      if((current-1) == 0)
      {
        $('#jquery-tab-pager-navi li a.previos').addClass('disable');
      }
      if(current == page)
      {
        $('#jquery-tab-pager-navi li a.next').addClass('disable');
      }

      // ページ分割計算
      var start = config.items*(idx-1);
      var end = config.items*(idx);

      if(idx == page)
      {
        end = count;
      }

      // 最大表示数分だけ表示する
      $('.' + options.contents + '.current').children().hide();
      $('.' + options.contents + '.current').children().slice(start,end).fadeIn(config.time);

      // スクロールさせる
      if(options.scroll == true)
      {
        $('html,body').animate({ scrollTop: scrollPosTop }, 0);
      }
    }
  };
})(jQuery);
