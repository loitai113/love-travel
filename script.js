const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const sidebars = $$(".js-sidebar");
const bannerSearch = $(".home-banner__search");
const searchList = $(".home-banner__search-list");
const searchPlaceholder = $(".home-banner__search-placeholder");
const switchPhotoBtns = $$(".home-beaches__switch-btn");
const listPhotos = $$(".home-beaches__photo-item ");
const packageTypologyCount = $('.home-package__typology-count');
const packageTypologySub = $('.home-package__typology-sub');


// Đóng mở sidebar
sidebars.forEach(sidebar => {
    sidebar.onclick = function(e) {
        if (e.target.closest('.js-sidebar__icon')) {
            this.querySelector('.js-sidebar__content').style.transform = "translateX(0)";
        }

        if (e.target.closest('.js-sidebar__close')) {
            this.querySelector('.js-sidebar__content').style.transform = "translateX(100%)";
        }
    }
})

// Bấm vào ô search thì mở/đóng list search + Thay thế placeholder 
bannerSearch.onclick = (e) => {
    if (isSearchListOpen) {
        searchList.style.display = "none";
    } else  {
        searchList.style.display = "block";
    }
    isSearchListOpen = !isSearchListOpen;

    if (e.target.closest(".home-banner__search-list")) {
        searchPlaceholder.innerHTML = e.target.innerHTML;
    }
}

// Xử lý hình ảnh phần beaches tự động chuyển
let currentIndex = Array.from(switchPhotoBtns).find(btn => {
    return btn.classList.contains('home-beaches__switch-btn--active');
}).dataset.index - 1;

const listPhotosLength = listPhotos.length;
const autoSwitchPhoto = () => {
    if (currentIndex == listPhotosLength)
        currentIndex = 0;

    switchPhotoBtns.forEach(btn => {
        btn.classList.remove('home-beaches__switch-btn--active');
    })
    listPhotos.forEach(photo => {
        photo.classList.remove('home-beaches__photo-item--selected');
    })

    switchPhotoBtns[currentIndex].classList.add('home-beaches__switch-btn--active');
    listPhotos[currentIndex].classList.add('home-beaches__photo-item--selected');

    currentIndex++;
}

let switchPhotoInterval = setInterval(autoSwitchPhoto, 2000);

// Xử lí chuyển đổi hình ảnh phần beaches khi click vào nút chuyển
switchPhotoBtns.forEach(btn => {
    btn.onclick = (e) => {
        // Xử lý với nút được chọn thì thêm class active, những nút còn lại bỏ class active
        for(let i = 0; i < switchPhotoBtns.length; i++) {
            switchPhotoBtns[i].classList.remove('home-beaches__switch-btn--active');
        }

        e.target.classList.add('home-beaches__switch-btn--active');

        // Xử lý chuyển đổi hình ảnh theo index
        listPhotos.forEach(photo => {
            photo.classList.remove('home-beaches__photo-item--selected');
        })
        const index = e.target.dataset.index - 1;
        listPhotos[index].classList.add('home-beaches__photo-item--selected');


        // Khởi động lại interval
        clearInterval(switchPhotoInterval);
        currentIndex = index;
        switchPhotoInterval = setInterval(autoSwitchPhoto, 2000);
    }
})
