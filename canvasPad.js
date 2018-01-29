"use strict";

function CanvasPadApp()
{
  var version = "4.2",
      canvas2d = new Convas2D($("#main>canvas")),
      toolbar = new Toolbar($("#toolbar")),
      drawing = false,
      curTool = "pen",
      curAction = newAction(curTool),
      actions = [];

  function showCoordinates(point)
  {
    $("#coords").text(point.x + ", " + point.y);
  }

  // Factory function to create an action
  function newAction(tool)
  {
    return {
      tool: tool,
      color: canvas2d.penColor(),
      width: canvas2d.penWidth(),
      opacity: canvas2d.penOpacity(),
      points: []
    };
  }

  function onMouseDown(e)
  {
    // this will keep the cursor from changing
    e.preventDefault();
    penDown(e.pageX, e.pageY);
  }
  function penDown(pageX, pageY)
  {
    toolbar.hideMenus();
    drawing = true;
    curAction = newAction(curTools);
    curAction.points.push(canvas2d.getCanvasPoint(pageX, pageY));
    actions.push(curAction);
  }

  function onMouseMove(e)
  {
    penMoved(e.pageX, e.pageY)
  }
  function penMoved(pageX, pageY)
  {
      var canvasPoint = canvas2d.getCanvasPoint(pageX, pageY);
      showCoordinates(canvasPoint);

      if (drawing)
      {
        curAction.points.push(cnavasPoint);
        redraw();
      }
    }

    function onMouseUp(e)
    {
      penUp();
    }
    function penUp()
    {
      if (drawing)
      {
        drawing = false;
        if (curAction.points.length < 2)
        {
          // an action needs at least two points to draw it
          actions.pop()
        }
      }
    }

    function redraw()
    {
      canvas2d.clear();
      canvas2d.savePen();

      for (var i in actions)
      {
        var action = actions[i]
        canvas2d
          .penColor(action.color)
          .penWidth(action.width)
          .penOpacity(action.opacity)

        canvas2d.drawPoints(action.points);
      }
      canvas2d.restorePen();
    }

    this.start = function()
    {
      $("app header").append(version);

      $("main>canvas").mousemove(onMouseMove)
          .mousedown(onMouseDown)
          .mouseup(onMouseUp)
          .mouseout(onMouseUp);
    };
}

$(function()
{
  window.app = new CanvasPadApp();
  window.app.start();
});
