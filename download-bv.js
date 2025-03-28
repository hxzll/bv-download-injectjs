(() => {
    const download = (url, filename) => {
        console.log(`Downloading ${filename}...`);
        fetch(url)
            .then(res=>res.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
                URL.revokeObjectURL(url);
                console.log(`Download ${filename} success`);
            })
            .catch(err => console.error(`Download ${filename} failed:`, err));
    };

    const match = window.location.pathname.match(/BV([a-zA-Z0-9]+)/);
    if (!match) {
        console.error('Only support site like https://www.bilibili.com/video/BVxxx/');
        return;
    }
    const bv = match[0];

    const videoUrl = window.__playinfo__.data.dash.video[0]?.base_url;
    const audioUrl = window.__playinfo__.data.dash.audio[0]?.base_url;

    if (videoUrl) download(videoUrl, `${bv}.mp4`);
    if (audioUrl) download(audioUrl, `${bv}.m4a`);
})();
