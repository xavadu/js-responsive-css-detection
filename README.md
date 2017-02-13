# js-responsive-css-detection

A brief libraryless helper to detect responsive CSS viewport breakpoints.
Support for [Bootstrap](https;//getbootstrap.com) out of the box.

## Strategy
It look for a class which is unique for each defined viewports, if the class is found, we can reverse and know the actual viewport.

## Usage:
```
jsrespcss.getViewportBreakpoint(); // return 'xs' or 'sm' or 'md' or 'lg', false if can't be detected
````

