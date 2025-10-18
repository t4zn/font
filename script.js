function switchTab(tab, event) {
    // Get current active content
    const currentActive = document.querySelector('.tab-content.active');
    
    // Fade out current content
    if (currentActive) {
        currentActive.style.opacity = '0';
    }
    
    // Remove active class from all tabs and content
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // The slider is now automatically centered under each active tab via CSS
    
    // Switch content after fade out
    setTimeout(() => {
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        const newContent = document.getElementById(tab + '-content');
        newContent.classList.add('active');
        
        // Fade in new content
        setTimeout(() => {
            newContent.style.opacity = '1';
        }, 50);
    }, 150);
}

async function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    const btn = event.target.closest('.copy-btn');
    const originalSvg = btn.innerHTML;
    
    try {
        // Try modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers or non-HTTPS
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
        }
        
        // Show success feedback
        btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        btn.classList.add('copied');
        
        // Add haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }
        
        // Reset button after delay
        setTimeout(() => {
            btn.innerHTML = originalSvg;
            btn.classList.remove('copied');
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy text: ', err);
        // Show error feedback
        btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
        btn.style.color = '#f44336';
        
        setTimeout(() => {
            btn.innerHTML = originalSvg;
            btn.style.color = '';
        }, 2000);
    }
}

// Add keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(e) {
        if (e.key === '1') {
            document.querySelector('[onclick*="html"]').click();
        } else if (e.key === '2') {
            document.querySelector('[onclick*="css"]').click();
        } else if (e.key === '3') {
            document.querySelector('[onclick*="react"]').click();
        } else if (e.key === '4') {
            document.querySelector('[onclick*="next"]').click();
        } else if (e.key === '5') {
            document.querySelector('[onclick*="vanilla"]').click();
        } else if (e.key === '6') {
            document.querySelector('[onclick*="python"]').click();
        } else if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            const activeContent = document.querySelector('.tab-content.active');
            const copyBtn = activeContent.querySelector('.copy-btn');
            if (copyBtn) copyBtn.click();
        }
    });
});