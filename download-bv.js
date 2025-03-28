(() => {
    const match = window.location.pathname.match(/BV([a-zA-Z0-9]+)/);
    if (!match) {
        console.error('Only support site like https://www.bilibili.com/video/BVxxx/')
        return
    }
    const bv = match[0]

    console.log('video info:', window.__playinfo__);

    const videoURL = window.__playinfo__.data.dash.video[0].base_url
    const audioURL = window.__playinfo__.data.dash.audio[0].base_url

    fetch(videoURL, {
        method: 'GET',
        headers: {
            'Referer': "https://www.bilibili.com/",
        }
    })
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = bv + '.mp4';
            a.click();
            URL.revokeObjectURL(url);
            console.log('video part finish');
        })
        .catch(error => console.error('Error fetching video part:', error));

    fetch(audioURL, {
        method: 'GET',
        headers: {
            'Referer': "https://www.bilibili.com/",
        }
    })
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = bv + '.m4a';
            a.click();
            URL.revokeObjectURL(url);
            console.log('audio part finish');
        })
        .catch(error => console.error('Error fetching audio part:', error));

    console.log(`downloading ${bv} in progress`);
})()
