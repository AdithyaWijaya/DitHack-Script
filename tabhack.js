// Bypass Detection!
// Developer : ADIT ENGINEER Pelores

(function() {
    'use strict';

    // Backup original values
    const originalDocument = document;
    const originalWindow = window;
    const originalAddEventListener = window.addEventListener;
    const originalDocumentAddEventListener = document.addEventListener;
    const originalEventTargetAddEventListener = EventTarget ? EventTarget.prototype.addEventListener : null;

    // =====================================================
    // Page Visibility API & blur/focus Events
    // =====================================================

    // Override document.hidden property
    Object.defineProperty(document, 'hidden', {
        get: function() {
            return false;
        },
        configurable: false
    });

    // Override document.visibilityState property  
    Object.defineProperty(document, 'visibilityState', {
        get: function() {
            return 'visible';
        },
        configurable: false
    });

    // Override document.onvisibilitychange
    Object.defineProperty(document, 'onvisibilitychange', {
        get: function() {
            return null;
        },
        set: function(handler) {
            // Don't actually set it
        },
        configurable: false
    });

    // Override window.onfocus
    Object.defineProperty(window, 'onfocus', {
        get: function() {
            return function() {};
        },
        set: function(handler) {
            // Don't actually set it - bypass focus detection
        },
        configurable: false
    });

    // Override window.onblur
    Object.defineProperty(window, 'onblur', {
        get: function() {
            return function() {};
        },
        set: function(handler) {
            // Don't actually set it - bypass blur detection  
        },
        configurable: false
    });

    // =====================================================
    // Bypass Window Resizing Detection
    // =====================================================

    // Override window.onresize
    Object.defineProperty(window, 'onresize', {
        get: function() {
            return function() {};
        },
        set: function(handler) {
            // Don't actually set it - bypass resize detection
        },
        configurable: false
    });

    // Mock window dimensions to prevent size detection
    let mockWidth = window.innerWidth;
    let mockHeight = window.innerHeight;

    Object.defineProperty(window, 'innerWidth', {
        get: function() {
            return mockWidth;
        },
        configurable: true
    });

    Object.defineProperty(window, 'innerHeight', {
        get: function() {
            return mockHeight;
        },
        configurable: true
    });

    Object.defineProperty(window, 'outerWidth', {
        get: function() {
            return mockWidth;
        },
        configurable: true
    });

    Object.defineProperty(window, 'outerHeight', {
        get: function() {
            return mockHeight;
        },
        configurable: true
    });

    // Override screen properties
    Object.defineProperty(screen, 'width', {
        get: function() {
            return 1920;
        },
        configurable: true
    });

    Object.defineProperty(screen, 'height', {
        get: function() {
            return 1080;
        },
        configurable: true
    });

    Object.defineProperty(screen, 'availWidth', {
        get: function() {
            return 1920;
        },
        configurable: true
    });

    Object.defineProperty(screen, 'availHeight', {
        get: function() {
            return 1040;
        },
        configurable: true
    });

    // Mock function to set custom dimensions
    window.setMockDimensions = function(width, height) {
        mockWidth = width;
        mockHeight = height;
        console.log('[Bypass] Mock dimensions set to: ' + width + 'x' + height);
    };

    // =====================================================
    // Bypass Full Screen Detection
    // =====================================================

    // Override document.fullscreenElement
    Object.defineProperty(document, 'fullscreenElement', {
        get: function() {
            return document.createElement('div'); // Return a fake element
        },
        configurable: false
    });

    // Override document.fullscreenEnabled
    Object.defineProperty(document, 'fullscreenEnabled', {
        get: function() {
            return false;
        },
        configurable: false
    });

    // Override document.onfullscreenchange
    Object.defineProperty(document, 'onfullscreenchange', {
        get: function() {
            return function() {};
        },
        set: function(handler) {
            // Don't actually set it
        },
        configurable: false
    });

    // Override document.onfullscreenerror
    Object.defineProperty(document, 'onfullscreenerror', {
        get: function() {
            return function() {};
        },
        set: function(handler) {
            // Don't actually set it
        },
        configurable: false
    });

    // Override requestFullscreen methods
    const originalRequestFullscreen = Element.prototype.requestFullscreen;
    Element.prototype.requestFullscreen = function() {
        console.log('[Bypass] Blocked requestFullscreen call');
        return Promise.reject(new Error('Fullscreen request blocked'));
    };

    // Override exitFullscreen
    const originalExitFullscreen = document.exitFullscreen;
    document.exitFullscreen = function() {
        console.log('[Bypass] Blocked exitFullscreen call');
        return Promise.resolve();
    };

    // Override webkit specific methods (for Safari/Chrome)
    if (Element.prototype.webkitRequestFullscreen) {
        Element.prototype.webkitRequestFullscreen = function() {
            console.log('[Bypass] Blocked webkitRequestFullscreen call');
            return Promise.reject(new Error('Fullscreen request blocked'));
        };
    }

    if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen = function() {
            console.log('[Bypass] Blocked webkitExitFullscreen call');
            return Promise.resolve();
        };
    }

    // Override moz specific methods (for Firefox)
    if (Element.prototype.mozRequestFullScreen) {
        Element.prototype.mozRequestFullScreen = function() {
            console.log('[Bypass] Blocked mozRequestFullScreen call');
            return Promise.reject(new Error('Fullscreen request blocked'));
        };
    }

    if (document.mozExitFullScreen) {
        document.mozExitFullScreen = function() {
            console.log('[Bypass] Blocked mozExitFullScreen call');
            return Promise.resolve();
        };
    }

    // Override ms specific methods (for IE/Edge)
    if (Element.prototype.msRequestFullscreen) {
        Element.prototype.msRequestFullscreen = function() {
            console.log('[Bypass] Blocked msRequestFullscreen call');
            return Promise.reject(new Error('Fullscreen request blocked'));
        };
    }

    if (document.msExitFullscreen) {
        document.msExitFullscreen = function() {
            console.log('[Bypass] Blocked msExitFullscreen call');
            return Promise.resolve();
        };
    }

    // =====================================================
    // Bypass Right Click (Context Menu) Detection
    // =====================================================

    // Override document.oncontextmenu
    Object.defineProperty(document, 'oncontextmenu', {
        get: function() {
            return function() {};
        },
        set: function(handler) {
            // Don't actually set it - bypass context menu detection
        },
        configurable: false
    });

    // Override window.oncontextmenu
    Object.defineProperty(window, 'oncontextmenu', {
        get: function() {
            return function() {};
        },
        set: function(handler) {
            // Don't actually set it - bypass context menu detection
        },
        configurable: false
    });

    // =====================================================
    // Unified addEventListener Override (Window)
    // =====================================================
    
    window.addEventListener = function(type, listener, options) {
        // Blocked events list
        const blockedEvents = [
            'blur', 'focus', 'visibilitychange', 'focusin', 'focusout',
            'resize',
            'fullscreenchange', 'fullscreenerror',
            'contextmenu'
        ];
        
        if (blockedEvents.indexOf(type) !== -1) {
            console.log('[Bypass] Blocked ' + type + ' event listener');
            return;
        }
        
        // Pass through other events
        return originalAddEventListener.call(this, type, listener, options);
    };

    // =====================================================
    // Unified addEventListener Override (Document)
    // =====================================================
    
    document.addEventListener = function(type, listener, options) {
        // Blocked events list
        const blockedEvents = [
            'blur', 'focus', 'visibilitychange', 'focusin', 'focusout',
            'resize',
            'fullscreenchange', 'fullscreenerror',
            'contextmenu'
        ];
        
        if (blockedEvents.indexOf(type) !== -1) {
            console.log('[Bypass] Blocked document ' + type + ' event listener');
            return;
        }
        
        // Pass through other events
        return originalDocumentAddEventListener.call(this, type, listener, options);
    };

    // =====================================================
    // EventTarget.prototype.addEventListener Override
    // =====================================================
    
    if (EventTarget && EventTarget.prototype && originalEventTargetAddEventListener) {
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            // Blocked events list
            const blockedEvents = [
                'blur', 'focus', 'visibilitychange', 'focusin', 'focusout',
                'resize',
                'fullscreenchange', 'fullscreenerror',
                'contextmenu'
            ];
            
            if (blockedEvents.indexOf(type) !== -1) {
                console.log('[Bypass] Blocked EventTarget.' + type + ' event listener');
                return;
            }
            
            return originalEventTargetAddEventListener.call(this, type, listener, options);
        };
    }

    // =====================================================
    // Prevent Default Context Menu
    // =====================================================
    
    // Use capture phase to prevent context menu before other scripts can block it
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        console.log('[Bypass] Prevented context menu');
        return false;
    }, true);

    // Mock function to manually trigger focus state (if needed)
    window.simulateFocus = function() {
        console.log('[Bypass] Simulating focus state');
    };

    // Mock function to manually trigger blur state (if needed)  
    window.simulateBlur = function() {
        console.log('[Bypass] Simulating blur state');
    };

    console.log('[Bypass] Page Visibility API & blur/focus events bypass loaded');
    console.log('[Bypass] Window Resizing bypass loaded');
    console.log('[Bypass] Full Screen Detection bypass loaded');
    console.log('[Bypass] Right Click (Context Menu) Detection bypass loaded');

    // Create GUI Popup
    function createPopup() {
        // Remove existing popup if any
        const existingPopup = document.getElementById('tabhack-popup');
        if (existingPopup) {
            existingPopup.remove();
            return;
        }

        // Create main popup container
        const popup = document.createElement('div');
        popup.id = 'tabhack-popup';
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #fff;
            padding: 30px 40px;
            border-radius: 15px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            z-index: 999999;
            text-align: center;
            min-width: 300px;
            border: 2px solid #0f3460;
        `;

        // Author name header
        const authorText = document.createElement('div');
        authorText.innerHTML = '<strong>Developer</strong><br>ADIT! ENGINEER Manggeray';
        authorText.style.cssText = `
            font-size: 14px;
            color: #00d9ff;
            margin-bottom: 15px;
            line-height: 1.8;
            text-transform: uppercase;
            letter-spacing: 2px;
        `;

        // Status message
        const statusText = document.createElement('div');
        statusText.innerHTML = '✅ <strong>DitHack Activated!</strong><br><span style="font-size: 12px; color: #aaa;">Detection Bypassed</span>';
        statusText.style.cssText = `
            font-size: 18px;
            margin-bottom: 15px;
            line-height: 1.6;
        `;

        // Warning message
        const warningText = document.createElement('div');
        warningText.innerHTML = '⚠️ <strong>JANGAN REFRESH!</strong><br><span style="font-size: 11px; color: #ff6b6b;">Refresh akan membuat script tidak berfungsi!</span>';
        warningText.style.cssText = `
            font-size: 14px;
            margin-bottom: 20px;
            line-height: 1.6;
            padding: 10px;
            background: rgba(255, 107, 107, 0.1);
            border-radius: 8px;
            border: 1px solid #ff6b6b;
        `;

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕ Close';
        closeBtn.style.cssText = `
            background: #e94560;
            color: white;
            border: none;
            padding: 10px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        `;

        // Hover effect for close button
        closeBtn.onmouseenter = function() {
            this.style.background = '#ff6b6b';
            this.style.transform = 'scale(1.05)';
        };
        closeBtn.onmouseleave = function() {
            this.style.background = '#e94560';
            this.style.transform = 'scale(1)';
        };

        // Close button click event
        closeBtn.onclick = function() {
            popup.remove();
        };

        // Assemble popup
        popup.appendChild(authorText);
        popup.appendChild(statusText);
        popup.appendChild(warningText);
        popup.appendChild(closeBtn);

        // Add to body
        document.body.appendChild(popup);

        // Add fade-in animation
        popup.style.opacity = '0';
        popup.style.transition = 'opacity 0.3s ease';
        setTimeout(function() {
            popup.style.opacity = '1';
        }, 10);
    }

    // Create popup when script is activated
    createPopup();

    // Expose function to toggle popup manually
    window.toggleTabHackPopup = function() {
        createPopup();
    };
})();
