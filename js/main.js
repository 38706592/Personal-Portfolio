// 等待頁面完全加載後執行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS動畫庫
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // 處理導航菜單漢堡按鈕點擊事件
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.body.classList.toggle('menu-active');
            this.classList.toggle('active');
        });
    }

    // 處理視頻點擊播放
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        const playButton = wrapper.querySelector('.play-button');
        
        if (video && playButton) {
            wrapper.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    playButton.style.opacity = '0';
                } else {
                    video.pause();
                    playButton.style.opacity = '1';
                }
            });
            
            // 當視頻播放結束時重設播放按鈕
            video.addEventListener('ended', function() {
                playButton.style.opacity = '1';
            });
        }
    });

    // 確保背景視頻正確加載和播放
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.addEventListener('loadeddata', function() {
            bgVideo.play().catch(e => {
                console.log('自動播放被阻止，需要用戶互動:', e);
            });
        });
    }

    // 處理故障文字效果
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        text.setAttribute('data-text', text.textContent);
        
        // 滾動時添加故障效果
        window.addEventListener('scroll', function() {
            const rect = text.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                text.classList.add('active-glitch');
                setTimeout(() => {
                    text.classList.remove('active-glitch');
                }, 300);
            }
        });
    });

    // 載入所有圖片，並在完成後強制重新計算布局
    const images = document.querySelectorAll('img');
    let loadedImagesCount = 0;
    
    images.forEach(img => {
        if (img.complete) {
            loadedImagesCount++;
            if (loadedImagesCount === images.length) {
                document.dispatchEvent(new Event('imagesLoaded'));
            }
        } else {
            img.addEventListener('load', function() {
                loadedImagesCount++;
                if (loadedImagesCount === images.length) {
                    document.dispatchEvent(new Event('imagesLoaded'));
                }
            });
            
            img.addEventListener('error', function() {
                loadedImagesCount++;
                if (loadedImagesCount === images.length) {
                    document.dispatchEvent(new Event('imagesLoaded'));
                }
            });
        }
    });

    document.addEventListener('imagesLoaded', function() {
        // 重新計算布局
        window.dispatchEvent(new Event('resize'));
    });

    // 初始化lightbox
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'fadeDuration': 300,
            'imageFadeDuration': 300,
            'alwaysShowNavOnTouchDevices': true
        });
    }

    // 創建自定義模態框
    function createCustomModal() {
        // 檢查是否已經存在模態框
        if (document.querySelector('.custom-modal')) {
        return;
    }
    
        // 創建模態框元素
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        
        // 創建模態框內容容器
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
    
    // 創建關閉按鈕
        const closeButton = document.createElement('span');
        closeButton.className = 'modal-close';
        closeButton.innerHTML = '&times;';
        
        // 創建標題元素
        const modalTitle = document.createElement('div');
        modalTitle.className = 'modal-title';
        
        // 添加元素到DOM
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
        modal.appendChild(modalTitle);
        document.body.appendChild(modal);
        
        // 關閉模態框事件
        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modalContent.innerHTML = '';
                modalContent.appendChild(closeButton);
                modalTitle.textContent = '';
            }, 300);
        });
        
        // 點擊模態框背景關閉
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeButton.click();
            }
        });
        
        return {
            modal,
            modalContent,
            modalTitle,
            closeButton
        };
    }
    
    // 設置模態框圖片查看功能
    function setupCustomImageViewer() {
        const { modal, modalContent, modalTitle, closeButton } = createCustomModal();
        
        // 獲取所有應該使用自定義模態框的圖片
        const imageLinks = document.querySelectorAll(
            '.screenshot-item a, .weapon-item a, .exhibition-item a, .character-item a, ' +
            '.gallery-item a, .tech-item a, .photo-item a, .fashion-item a, .showcase-item a, ' +
            '.profile-image a, .skill-item a, .software-item a'
        );
        
        imageLinks.forEach(link => {
            // 移除原有的lightbox屬性
            link.removeAttribute('data-lightbox');
            
            link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                const imgSrc = this.getAttribute('href');
                const title = this.getAttribute('data-title') || '';
                
                // 創建新圖片元素
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = title;
                
                // 清除之前的內容
                while (modalContent.children.length > 1) {
                    modalContent.removeChild(modalContent.firstChild);
                }
                
                // 添加圖片到模態框
                modalContent.insertBefore(img, closeButton);
                modalTitle.textContent = title;
                
                // 顯示模態框
                modal.classList.add('active');
            });
        });
    }
    
    // 初始化自定義模態框
    setupCustomImageViewer();

    // 修復專長和專攻軟體的顯示問題
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.style.visibility = 'visible';
        item.style.opacity = '1';
    });

    const softwareItems = document.querySelectorAll('.software-item');
    softwareItems.forEach(item => {
        item.style.visibility = 'visible';
        item.style.opacity = '1';
        const p = item.querySelector('p');
        if (p) {
            p.style.visibility = 'visible';
            p.style.opacity = '1';
            p.style.color = '#ffffff';
        }
    });

    // 修復視頻顯示
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.style.visibility = 'visible';
        video.style.opacity = '1';
        video.style.display = 'block';
        
        // 確保視頻控制項可見
        video.setAttribute('controls', 'true');
        
        // 確保視頻尺寸合適
        if (!video.getAttribute('width')) {
            video.setAttribute('width', '100%');
        }
        if (!video.getAttribute('height')) {
            video.setAttribute('height', 'auto');
        }
    });

    // 修復YouTube嵌入視頻
    const youtubeIframes = document.querySelectorAll('.youtube-embed iframe');
    youtubeIframes.forEach(iframe => {
        // 確保iframe可見
        iframe.style.visibility = 'visible';
        iframe.style.opacity = '1';
        
        // 修復iframe源URL，保留原始參數
        let src = iframe.getAttribute('src');
        if (src) {
            // 確保URL包含必要的參數但保留原始的si參數
            if (!src.includes('allow=')) {
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            }
            
            // 設置allowfullscreen屬性
            iframe.setAttribute('allowfullscreen', 'true');
            
            // 重新載入iframe以確保更改生效
            setTimeout(() => {
                iframe.src = src;
            }, 100);
        }
        
        // 確保父容器樣式正確
        const container = iframe.closest('.youtube-embed');
        if (container) {
            container.style.zIndex = '30';
            container.style.visibility = 'visible';
            container.style.opacity = '1';
        }
    });
    
    // YouTube API準備
    // 創建腳本標籤加載YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // 準備YouTube API初始化函數
    window.onYouTubeIframeAPIReady = function() {
        console.log('YouTube API準備完成');
        
        // 找到所有YouTube嵌入框架
        const youtubeFrames = document.querySelectorAll('.youtube-embed iframe');
        youtubeFrames.forEach((frame, index) => {
            // 確保iframe有ID
            if (!frame.id) {
                frame.id = 'youtube-player-' + index;
            }
            
            // 獲取視頻ID
            const src = frame.src;
            let videoId = '';
            
            if (src.includes('embed/')) {
                const parts = src.split('embed/')[1];
                videoId = parts.split('?')[0];
            }
            
            if (videoId) {
                try {
                    // 創建播放器實例
                    new YT.Player(frame.id, {
                        events: {
                            'onReady': function(event) {
                                console.log('播放器準備完成: ' + frame.id);
                                // 確保框架可見
                                frame.style.visibility = 'visible';
                                frame.style.opacity = '1';
                            },
                            'onStateChange': function(event) {
                                if (event.data === YT.PlayerState.PLAYING) {
                                    console.log('播放中: ' + frame.id);
                                }
                            },
                            'onError': function(event) {
                                console.error('播放器錯誤: ' + event.data);
                            }
                        }
                    });
                } catch (e) {
                    console.error('YouTube播放器初始化錯誤: ', e);
                }
            }
        });
    };
    
    // 特殊處理YouTube嵌入，確保它們在頁面加載後可見
    window.addEventListener('load', function() {
        const youtubeContainers = document.querySelectorAll('.youtube-embed');
        youtubeContainers.forEach(container => {
            container.style.visibility = 'visible';
            container.style.opacity = '1';
            
            const iframe = container.querySelector('iframe');
            if (iframe) {
                iframe.style.visibility = 'visible';
                iframe.style.opacity = '1';
                
                // 輕微調整iframe源，強制重新加載
                const src = iframe.getAttribute('src');
                if (src) {
                setTimeout(() => {
                        iframe.src = src;
                    }, 500);
                }
            }
        });
    });
});
