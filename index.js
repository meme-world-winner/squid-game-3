document.addEventListener('DOMContentLoaded', function() {
    const bgImg = document.getElementById('background');
    const bgVideo = document.getElementById('bgVideo');

    bgVideo.addEventListener('canplay', function() {
        bgImg.style.display = 'none';
        bgVideo.style.display = 'block';
    });

    bgVideo.play().catch(function(error) {
        console.log('error:', error);
    });
});
