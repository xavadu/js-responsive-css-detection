/**
 * A brief libraryless helper to detect responsive CSS viewport breakpoint.
 *
 * Ex: jsrespcss.getViewportBreakpoint(); // return 'xs' or 'sm' or 'md' or 'lg', false if can't be detected
 */
var jsrespcss = (function(jsrespcss) {

    // Classes which only exists in their on responsive declaration
    var respClasses = {
        'bootstrap': {
            'xs': '.hidden-xs',
            'sm': '.hidden-sm',
            'md': '.hidden-md',
            'lg': '.hidden-lg'
        },
        // TODO: Extend to support more frameworks
    };

    // Search for a style which match the actual media query
    var verifyStyle = function(selector) {
        var styleMatched = false;

        if (typeof document.styleSheets != "undefined") {
            var cssSheets = document.styleSheets;

            outerloop:
            for (var i = 0; i < cssSheets.length; i++) {
                // Using IE or FireFox standards compliant
                var rules =  (typeof cssSheets[i].cssRules != "undefined") ? cssSheets[i].cssRules : cssSheets[i].rules;

                for (var key in rules) {
                   // Looking only on the media query rules
                   if (rules[key] instanceof window.CSSMediaRule) {
                        // Get the media query rules
                        var rulesMedia =  (typeof rules[key].cssRules != "undefined") ? rules[key].cssRules : rules[key].rules;
                        // Search for the selector and see if it match the window witdh with the media query
                        for (var keyMedia in rulesMedia) {
                            if (rulesMedia[keyMedia].selectorText == selector) {

                                var windowWitdh = window.innerWidth;
                                // Get and parse the media query
                                var selectorMediaText = rulesMedia[keyMedia].parentRule.media.mediaText;
                                var maxWidth = selectorMediaText.match(/max-width:\s?(\d+)px/);
                                var minWidth = selectorMediaText.match(/min-width:\s?(\d+)px/);

                                if (maxWidth == null && minWidth !== null && windowWitdh >= minWidth[1]) {
                                    styleMatched = true;
                                } else if (minWidth == null && maxWidth !== null && windowWitdh <= maxWidth[1]) {
                                    styleMatched = true;
                                } else if (minWidth !== null && maxWidth !== null && windowWitdh >= minWidth[1] && windowWitdh <= maxWidth[1]) {
                                    styleMatched = true;
                                }

                                break outerloop;
                            }
                        }
                    }
                }
            }
        }

        return styleMatched;
    };

    // Get the actual viewport media query based on the breakpoints
    var getViewportBreakpoint = function(framework) {
        var framework = framework || 'bootstrap';
        var viewportBreakpoint = false;

        for (var breakpoint in respClasses[framework]) {
            if (verifyStyle(respClasses[framework][breakpoint])) {
                viewportBreakpoint = breakpoint;
                break;
            }
        }

        return viewportBreakpoint;
    }

    return {
        getViewportBreakpoint: getViewportBreakpoint
    }
})();