// JavaScript to add 'scrolled' class on scroll
window.addEventListener('scroll', function() {
    var nav = document.getElementById('nav'); // Ambil elemen navbar berdasarkan ID
    if (window.scrollY > 50) { // Jika scroll lebih dari 50px
        nav.classList.add('scrolled'); // Tambahkan class 'scrolled'
    } else {
        nav.classList.remove('scrolled'); // Hapus class 'scrolled' jika kembali ke posisi atas
    }
});
