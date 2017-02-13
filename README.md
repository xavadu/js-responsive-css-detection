# js-responsive-css-detection

A tiny libraryless helper to detect the media query which match the actual viewport size. Since it is develop using native javascript it is good for when you need to know it on the header, or before load all the heavy libraries.

Support for [Bootstrap](https;//getbootstrap.com) out of the box.

## Strategy
It look for a class which is unique for each defined viewports, if the class is found, we can reverse and know the actual viewport.

## Usage
```
jsrespcss.getViewportBreakpoint(); // return 'xs' or 'sm' or 'md' or 'lg', false if can't be detected
````