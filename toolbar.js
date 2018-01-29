function Toolbar($toolbar)
{
  var _this = this;

  $("button", $toolbar).click(function(e) {
    onToolbarButtonClicked($(this));
  });
  $(".menu>li", $toolbar).click(function(e) {
    onMenuItemClicked($(this));
  });

  function onToolbarButtonClicked($button)
  {
    var action = $button.data("action");
    if (!_this.toolbarButtonClicked(action))
    {
      if (action == "menu")
      {
        showMenu($button.siblings("ul.menu"));
      }
      else
      {
        _this.hideMenus();
      }
    }
  }

  function showMenu($menu)
  {
    if ($menu.is(":visible"))
    {
      $menu.fadeOut("fast");
    }
    else
    {
      // hide any open menus
      _this.hideMenus();
      // show this menu
      $menu.fadeIn("fast");
    }
  }

  function onMenuItemClicked($item)
  {
    var $menu = $item.parent();
    var option = $menu.data("option");
    var value = $item.data("value");
    if (!_this.menuItemClicked(option, value))
    {
      $item.addClass("selected")
            .siblings().removeClass("selected");
      $menu.fadeOut("fast");
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  this.toolbarButtonClicked = function(action)
  {
    return false;
  };

  this.menuItemClicked = function(option, value)
  {
    return false;
  };

  this.hideMenus = function()
  {
    $(".menu", $toolbar).hide();
  }
}
