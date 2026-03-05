(function() {
    // ===== KONFIGURASI =====
    var CONFIG = {
        apiBase: 'https://api.cheatnetwork.eu',
        gameType: 'quizizz'
    };

    // ===== GUI UTAMA =====
    function createMainGUI() {
        // Hapus jika sudah ada
        var existing = document.getElementById('cheatnetwork-panel');
        if (existing) existing.remove();

        // Container utama
        var container = document.createElement('div');
        container.id = 'cheatnetwork-panel';
        Object.assign(container.style, {
            position: 'fixed',
            top: '50px',
            right: '20px',
            width: '380px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            zIndex: '999999',
            fontFamily: 'Arial, sans-serif',
            overflow: 'hidden',
            transition: 'height 0.3s ease'
        });

        // Header
        var header = document.createElement('div');
        Object.assign(header.style, {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '15px',
            cursor: 'move',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        });
        header.innerHTML = '<b>CheatNetwork Answers</b>';

        // Controls
        var controls = document.createElement('div');
        controls.style.display = 'flex';
        controls.style.gap = '8px';

        var minimizeBtn = document.createElement('span');
        minimizeBtn.innerHTML = '&#x2212;';
        Object.assign(minimizeBtn.style, {
            cursor: 'pointer',
            padding: '2px 8px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '4px'
        });

        var closeBtn = document.createElement('span');
        closeBtn.innerHTML = 'X';
        Object.assign(closeBtn.style, {
            cursor: 'pointer',
            padding: '2px 8px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '4px'
        });

        controls.appendChild(minimizeBtn);
        controls.appendChild(closeBtn);
        header.appendChild(controls);

        // Body
        var body = document.createElement('div');
        body.id = 'cheatnetwork-body';
        Object.assign(body.style, {
            padding: '15px',
            maxHeight: '500px',
            overflowY: 'auto'
        });

        // Input PIN
        var pinLabel = document.createElement('div');
        pinLabel.innerHTML = '<b>Masukkan PIN Quizizz</b>';
        pinLabel.style.marginBottom = '8px';

        var pinInput = document.createElement('input');
        pinInput.type = 'text';
        pinInput.placeholder = 'Contoh: 123456';
        Object.assign(pinInput.style, {
            width: '65%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxSizing: 'border-box',
            fontSize: '14px'
        });

        var searchBtn = document.createElement('button');
        searchBtn.innerHTML = 'Cari';
        Object.assign(searchBtn.style, {
            width: '30%',
            padding: '10px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginLeft: '5%',
            fontSize: '14px',
            fontWeight: 'bold'
        });

        var inputRow = document.createElement('div');
        inputRow.style.marginBottom = '15px';
        inputRow.appendChild(pinInput);
        inputRow.appendChild(searchBtn);

        // Results area
        var results = document.createElement('div');
        results.id = 'cheatnetwork-results';

        // Token info
        var tokenInfo = document.createElement('div');
        tokenInfo.style.cssText = 'font-size:11px;color:#999;margin-bottom:10px;padding:8px;background:#f5f5f5;border-radius:6px';
        tokenInfo.innerHTML = '&#128274; Token dari cookie browser Anda';

        // Assemble
        body.appendChild(tokenInfo);
        body.appendChild(pinLabel);
        body.appendChild(inputRow);
        body.appendChild(results);

        container.appendChild(header);
        container.appendChild(body);
        document.body.appendChild(container);

        // ===== EVENT HANDLERS =====

        // Minimize
        var minimized = false;
        minimizeBtn.onclick = function() {
            minimized = !minimized;
            body.style.display = minimized ? 'none' : 'block';
            container.style.height = minimized ? '50px' : 'auto';
            minimizeBtn.innerHTML = minimized ? '&#x25A1;' : '&#x2212;';
        };

        // Close
        closeBtn.onclick = function() {
            container.remove();
        };

        // Drag functionality
        var isDragging = false, startX, startY, offsetX, offsetY;
        
        header.onmousedown = function(e) {
            if (e.target === minimizeBtn || e.target === closeBtn) return;
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            offsetX = container.offsetLeft;
            offsetY = container.offsetTop;
            document.body.style.userSelect = 'none';
        };

        document.onmousemove = function(e) {
            if (!isDragging) return;
            container.style.left = (offsetX + e.clientX - startX) + 'px';
            container.style.top = (offsetY + e.clientY - startY) + 'px';
            container.style.right = 'auto';
        };

        document.onmouseup = function() {
            isDragging = false;
            document.body.style.userSelect = '';
        };

        // Search
        searchBtn.onclick = async function() {
            var pin = pinInput.value.trim();
            if (!pin) {
                results.innerHTML = '<div style="color:red;padding:10px">Masukkan PIN terlebih dahulu!</div>';
                return;
            }

            results.innerHTML = '<div style="text-align:center;padding:20px">&#x23F3; Loading...</div>';

            try {
                var response = await fetch(CONFIG.apiBase + '/' + CONFIG.gameType + '/' + pin + '/answers', {
                    method: 'GET',
                    credentials: 'include'
                });

                var text = await response.text();
                console.log('API Response:', text);

                if (!response.ok) {
                    results.innerHTML = '<div style="color:red;padding:10px">Error: ' + text + '</div>';
                    return;
                }

                var data = JSON.parse(text);

                if (!data.success) {
                    results.innerHTML = '<div style="color:red;padding:10px">' + (data.message || 'Error') + '</div>';
                    return;
                }

                // Render results
                renderAnswers(data.answers || [], results);

            } catch (error) {
                results.innerHTML = '<div style="color:red;padding:10px">Error: ' + error.message + '</div>';
            }
        };

        // Enter key to search
        pinInput.onkeypress = function(e) {
            if (e.key === 'Enter') searchBtn.click();
        };
    }

    // ===== RENDER JAWABAN =====
    function renderAnswers(answers, container) {
        if (!answers || answers.length === 0) {
            container.innerHTML = '<div style="color:#666;padding:10px">Tidak ada jawaban ditemukan</div>';
            return;
        }

        var html = '<div style="max-height:400px;overflow-y:auto">';
        
        answers.forEach(function(item, index) {
            var options = item.options || [];
            var correctIndex = item.answer ? item.answer[0] : -1;
            
            html += '<div style="background:#f8f9fa;padding:12px;margin:8px 0;border-radius:8px;border-left:4px solid #667eea">';
            html += '<div style="font-size:13px;color:#333;margin-bottom:8px;font-weight:500">' + (index + 1) + '. ' + (item.question || 'Soal') + '</div>';
            
            options.forEach(function(opt, optIndex) {
                var isCorrect = optIndex === correctIndex;
                html += '<div style="background:' + (isCorrect ? '#c8e6c9' : '#fff') + ';padding:8px;margin:4px 0;border-radius:4px;border:1px solid ' + (isCorrect ? '#4caf50' : '#ddd') + '">';
                html += '<span style="font-weight:bold;color:' + (isCorrect ? '#2e7d32' : '#666') + '">' + (optIndex + 1) + '.</span> ';
                html += '<span style="color:' + (isCorrect ? '#2e7d32' : '#333') + '">' + (opt.text || opt) + '</span>';
                if (isCorrect) html += ' &#10004;';
                html += '</div>';
            });
            
            html += '</div>';
        });
        
        html += '</div>';
        
        container.innerHTML = html;
    }

    // ===== START =====
    createMainGUI();
    
    console.log('%c CheatNetwork GUI Loaded ', 'background: #667eea; color: white; padding: 5px; font-weight: bold;');
    console.log('Masukkan PIN dan klik Cari untuk mendapatkan jawaban!');
    
})();
