// 燈箱功能
function openLightbox(imgSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightboxImg.src = imgSrc;
    lightboxCaption.innerHTML = caption || '';
    lightbox.classList.add('active');
    
    // 禁止背景滾動
    document.body.style.overflow = 'hidden';
    
    // 添加ESC鍵關閉功能
    document.addEventListener('keydown', closeLightboxOnEsc);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    
    // 恢復背景滾動
    document.body.style.overflow = '';
    
    // 移除ESC鍵關閉功能
    document.removeEventListener('keydown', closeLightboxOnEsc);
}

function closeLightboxOnEsc(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 為所有可點擊圖片添加燈箱功能
    const allImages = document.querySelectorAll('img[onclick^="openLightbox"]');
    
    allImages.forEach(img => {
        img.style.cursor = 'pointer';
    });
    
    // 點擊燈箱背景關閉
    const lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
}); 