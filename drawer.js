window.toggleDrawer = (drawerId) => {
    const leftDrawer = document.getElementById('leftDrawer');
    const rightDrawer = document.getElementById('rightDrawer');

    if (drawerId === 'leftDrawer') {
        // Nếu click vào ngăn Trái
        if (leftDrawer.classList.contains('open')) {
            leftDrawer.classList.remove('open'); // Đang mở thì đóng
        } else {
            leftDrawer.classList.add('open');    // Mở ngăn trái
            if (rightDrawer) rightDrawer.classList.remove('open'); // Ép đóng ngăn phải
        }
    } else if (drawerId === 'rightDrawer') {
        // Nếu click vào ngăn Phải
        if (rightDrawer.classList.contains('open')) {
            rightDrawer.classList.remove('open'); // Đang mở thì đóng
        } else {
            rightDrawer.classList.add('open');    // Mở ngăn phải
            if (leftDrawer) leftDrawer.classList.remove('open'); // Ép đóng ngăn trái
        }
    }
};
