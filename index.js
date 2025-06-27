document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const continueBtn = document.getElementById('continue-btn');
    // const bgImg = document.getElementById('background');
    const bgVideo = document.getElementById('bgVideo');

    let audio = new Audio("meta/sound.mp4");
    audio.loop = true;        

    continueBtn.addEventListener('click', function() {
        welcomeScreen.classList.add('fade-out');
        
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainContent.classList.remove('main-content-hidden');
            mainContent.classList.add('main-content-visible');
            
            // if (bgVideo) {
            //     bgVideo.play().catch(function(error) {
            //         console.log('Video play error:', error);
            //     });
            // }

            audio.play().then(() => {
                // console.log('Audio played');
            }).catch((error) => {
                // console.error('Error playing audio:', error);
            });
        }, 500);
    });

    bgVideo.addEventListener('canplay', function() {
        // bgImg.style.display = 'none';
        bgVideo.style.display = 'block';
    });

    bgVideo.play().catch(function(error) {
        console.log('error:', error);
    });
});
