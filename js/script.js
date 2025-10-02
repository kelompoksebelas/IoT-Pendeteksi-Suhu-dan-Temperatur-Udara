document.addEventListener('DOMContentLoaded', function () {
    // --- Logika untuk Menu Mobile (Hamburger) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }));
    }


    // --- Logika untuk Slider Swiper.js di Halaman Utama ---
    // Cek apakah elemen swiper ada di halaman ini
    if (document.querySelector('.swiper')) {
        const titleElement = document.getElementById('slider-title-text');

        const swiper = new Swiper('.swiper', {
            // Konfigurasi Swiper
            loop: true,
            effect: 'fade', // Efek transisi antar slide
            fadeEffect: {
                crossFade: true
            },
            
            // Baris ini ditambahkan untuk memastikan tinggi slider tidak berubah-ubah
            autoHeight: false,
            
            // Tombol Navigasi
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // Memungkinkan scroll dengan mouse wheel
            mousewheel: true,
        });

        // Fungsi untuk mengupdate judul
        const updateTitle = () => {
            const currentSlide = swiper.slides[swiper.activeIndex];
            const newTitle = currentSlide.getAttribute('data-title');
            
            // Jika judul sudah ada, animasikan keluar dulu
            if (titleElement.textContent) {
                titleElement.classList.remove('slide-in');
                titleElement.classList.add('slide-out');

                // Tunggu animasi keluar selesai, baru ganti teks dan animasikan masuk
                setTimeout(() => {
                    titleElement.textContent = newTitle;
                    titleElement.classList.remove('slide-out');
                    titleElement.classList.add('slide-in');
                }, 800); // Durasi harus sama dengan animasi di CSS
            } else {
                // Untuk pertama kali, langsung animasikan masuk
                titleElement.textContent = newTitle;
                titleElement.classList.add('slide-in');
            }
        };

        // Panggil fungsi saat slide berubah
        swiper.on('slideChange', updateTitle);
        
        // Panggil pertama kali untuk menampilkan judul slide awal
        updateTitle();
    }
});