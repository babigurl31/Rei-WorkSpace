// Thời gian giới hạn: 5 phút = 300 giây
const MAX_TIME = 300; 

function blockTikTok() {
    // Thay thế toàn bộ trang TikTok bằng màn hình khóa màu hồng
    document.body.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #fce4ec; font-family: 'Syne', sans-serif; text-align: center; padding: 20px;">
            <h1 style="font-size: 3rem; color: #ec407a; margin-bottom: 20px;">🌸 Hết giờ lướt Top Top rồi Babi ơi! 🌸</h1>
            <p style="font-size: 1.5rem; color: #333;">Cậu đã dùng hết 5 phút giải trí của ngày hôm nay.</p>
            <p style="font-size: 1.2rem; color: #666; margin-top: 10px;">Tắt tab này đi và quay lại hoàn thành mục tiêu 100 triệu đầu tiên thôi nào!</p>
        </div>
    `;
    document.body.style.overflow = 'hidden';
}

function checkAndTrackTime() {
    // Chỉ đếm thời gian khi cậu đang mở và nhìn vào tab TikTok
    if (document.visibilityState !== 'visible') return;

    const today = new Date().toISOString().split('T')[0];

    chrome.storage.local.get(['tiktokDate', 'tiktokTime'], (result) => {
        let date = result.tiktokDate;
        let time = result.tiktokTime || 0;

        // Sang ngày mới thì reset bộ đếm về 0
        if (date !== today) {
            date = today;
            time = 0;
        }

        // Quá 5 phút thì khóa
        if (time >= MAX_TIME) {
            blockTikTok();
            chrome.storage.local.set({ tiktokDate: date, tiktokTime: time });
            return;
        }

        // Cộng thêm 1 giây
        time += 1;
        chrome.storage.local.set({ tiktokDate: date, tiktokTime: time });
    });
}

// Bắt đầu chạy ngầm khi cậu vừa vào TikTok
chrome.storage.local.get(['tiktokDate', 'tiktokTime'], (result) => {
    const today = new Date().toISOString().split('T')[0];
    if (result.tiktokDate === today && result.tiktokTime >= MAX_TIME) {
        blockTikTok(); 
    } else {
        setInterval(checkAndTrackTime, 1000);
    }
});