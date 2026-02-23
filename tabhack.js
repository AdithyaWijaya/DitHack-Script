// Bypass Page Visibility API & Event blur & focus
// Author : xDitt4GT++
(function() {
    'use strict';

    // Backup original values
    const originalDocument = document;
    const originalWindow = window;

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

    // Override document.onvisibilitychange (if it exists)
    Object.defineProperty(document, 'onvisibilitychange', {
        get: function() {
            return null;
        },
        set: function(handler) {
            // Don't actually set it, or you could set a mock handler
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

    // Override addEventListener for blur and focus events
    const originalAddEventListener = window.addEventListener;
    
    window.addEventListener = function(type, listener, options) {
        // Bypass blur event listeners
        if (type === 'blur') {
            console.log('[Bypass] Blocked blur event listener');
            return;
        }
        
        // Bypass focus event listeners
        if (type === 'focus') {
            console.log('[Bypass] Blocked focus event listener');
            return;
        }
        
        // Bypass visibilitychange event listeners
        if (type === 'visibilitychange') {
            console.log('[Bypass] Blocked visibilitychange event listener');
            return;
        }
        
        // Bypass focusin event listeners
        if (type === 'focusin') {
            console.log('[Bypass] Blocked focusin event listener');
            return;
        }
        
        // Bypass focusout event listeners
        if (type === 'focusout') {
            console.log('[Bypass] Blocked focusout event listener');
            return;
        }
        
        // Pass through other events
        return originalAddEventListener.call(this, type, listener, options);
    };

    // Override removeEventListener for completeness
    const originalRemoveEventListener = window.removeEventListener;
    
    window.removeEventListener = function(type, listener, options) {
        // Still allow removal of blocked events (no-op anyway)
        if (type === 'blur' || type === 'focus' || type === 'visibilitychange' || type === 'focusin' || type === 'focusout') {
            return;
        }
        return originalRemoveEventListener.call(this, type, listener, options);
    };

    // Override EventTarget.prototype.addEventListener if available
    if (EventTarget && EventTarget.prototype) {
        const originalEventTargetAddEventListener = EventTarget.prototype.addEventListener;
        
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (type === 'blur' || type === 'focus' || type === 'visibilitychange' || type === 'focusin' || type === 'focusout') {
                console.log('[Bypass] Blocked EventTarget.' + type + ' event listener');
                return;
            }
            return originalEventTargetAddEventListener.call(this, type, listener, options);
        };
    }

    // Mock function to manually trigger focus state (if needed)
    window.simulateFocus = function() {
        console.log('[Bypass] Simulating focus state');
    };

    // Mock function to manually trigger blur state (if needed)  
    window.simulateBlur = function() {
        console.log('[Bypass] Simulating blur state');
    };

    console.log('[Bypass] Page Visibility API & blur/focus events bypass loaded');

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
        authorText.innerHTML = '<strong>Developer</strong><br>ADIT ENGINEER KUPANG';
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
        statusText.innerHTML = '✅ <strong>DitHack Activated!</strong><br><span style="font-size: 12px; color: #aaa;">Page Visibility API Bypassed</span>';
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
        setTimeout(() => {
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
