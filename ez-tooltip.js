document.addEventListener("DOMContentLoaded", function () {
  const arrow = {
    top: function (val) {
      document.documentElement.style.setProperty("--ez-top", val + 'px');
    },
    left: function (val) {
      document.documentElement.style.setProperty("--ez-left", val + 'px');
    },
    placement: function (pos) {
      if (pos == 'top') {
        span.classList.add('ez-arrow-top');
        span.classList.remove('ez-arrow-bottom');
        this.top('-12');
      } else if (pos == 'bottom') {
        span.classList.remove('ez-arrow-top');
        span.classList.add('ez-arrow-bottom');
        this.top(tooltip.height() - 6);
      }
    }
  }

  const tooltip = {
    position: function (x, y) {
      span.style.transform = `translate(${x}px, ${y}px)`;
    },
    show: function () {
      span.style.opacity = 1;
    },
    hide: function () {
      span.style.opacity = 0;
    },
    text: function (tool) {
      span.textContent = tool.getAttribute('data-tooltip');
    },
    width: function () {
      return span.offsetWidth;
    },
    height: function () {
      return span.offsetHeight;
    },
    maxWidth: function () {
      return parseInt(getComputedStyle(span).maxWidth);
    },
    topLeft: function (e) {
      tooltip.position(e.clientX - tooltip.width() + 10, e.clientY - tooltip.height() - 20)
      arrow.placement('bottom');
      arrow.left(tooltip.width() - 20);
    },
    topRight: function (e) {
      tooltip.position(e.clientX - 8, e.clientY - tooltip.height() - 20)
      arrow.placement('bottom');
      arrow.left(6);
    },
    bottomRight: function (e) {
      tooltip.position(e.clientX - 8, e.clientY + 30)
      arrow.placement('top');
      arrow.left(6);
    },
    bottomLeft: function (e) {
      tooltip.position(e.clientX - tooltip.width() + 10, e.clientY + 30)
      arrow.left(tooltip.width() - 20);
    }
  }

  const tooltips = document.querySelectorAll('[data-tooltip]');
  const span = document.createElement('span');
  span.className = 'ez-tooltip';

  for (const el of tooltips) {
    el.appendChild(span);
    el.addEventListener('mousemove', function (e) {
      tooltip.text(el);
      tooltip.show();

      const HEIGHT = e.clientY + tooltip.height();
      const WIDTH = e.clientX + tooltip.width();
      const AT_RIGHT = window.innerWidth < WIDTH + 25;
      const AT_BOTTOM = window.innerHeight < HEIGHT + 25;

      if (AT_BOTTOM && AT_RIGHT) {
        tooltip.topLeft(e);
      } else if (AT_BOTTOM) {
        tooltip.topRight(e);
      } else if (AT_RIGHT) {
        tooltip.bottomLeft(e);
      } else {
        tooltip.bottomRight(e);
      }

    });
    el.addEventListener('mouseout', function () {
      tooltip.hide();
    });
  }
});