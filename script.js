// ================================================================
//  SCRIPT: Kalkulator Metode Regula Falsi
//  Penulis: (Nama kamu / tim)
//  Deskripsi: File ini berisi logika utama untuk menghitung akar
//             suatu fungsi menggunakan metode Regula Falsi.
// ================================================================

// Menambahkan event listener pada form agar ketika tombol submit ditekan,
// proses tidak langsung me-refresh halaman (default behavior form HTML)
document.getElementById('regulaFalsiForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form melakukan reload halaman

    // ============================================================
    // AMBIL ELEMEN DARI HTML (Input dan Output)
    // ============================================================
    const funcStr = document.getElementById('function').value;      // String fungsi f(x)
    const aVal = document.getElementById('a').value;                // Nilai batas bawah
    const bVal = document.getElementById('b').value;                // Nilai batas atas
    const tolVal = document.getElementById('tolerance').value;      // Nilai toleransi
    const maxIterVal = document.getElementById('maxIterations').value; // Iterasi maksimal

    const resultDiv = document.getElementById('result');            // Area hasil akar
    const errorDiv = document.getElementById('error');              // Area pesan error
    const iterationsBody = document.getElementById('iterationsBody'); // Tabel iterasi
    const resultTitle = document.getElementById('result-title');    // Judul hasil
    const tableTitle = document.getElementById('table-title');      // Judul tabel iterasi

    // ============================================================
    // RESET OUTPUT DARI PROSES SEBELUMNYA
    // ============================================================
    resultDiv.innerHTML = '';                   // Kosongkan hasil sebelumnya
    errorDiv.style.display = 'none';            // Sembunyikan pesan error
    iterationsBody.innerHTML = '';              // Kosongkan isi tabel iterasi
    resultTitle.classList.add('hidden');        // Sembunyikan judul hasil
    tableTitle.classList.add('hidden');         // Sembunyikan judul tabel

    // ============================================================
    // VALIDASI INPUT AWAL
    // ============================================================
    if (!funcStr || !aVal || !bVal || !tolVal || !maxIterVal) {
        showError("Semua kolom input harus diisi.");
        return; // Hentikan eksekusi
    }

    // Konversi string input menjadi tipe numerik
    // Gunakan 'let' agar nilai a dan b bisa diubah selama iterasi
    let a = parseFloat(aVal);
    let b = parseFloat(bVal);
    const tolerance = parseFloat(tolVal);
    const maxIterations = parseInt(maxIterVal);

    // Cek apakah semua input valid berupa angka
    if (isNaN(a) || isNaN(b) || isNaN(tolerance) || isNaN(maxIterations)) {
        showError("Input a, b, toleransi, dan iterasi harus berupa angka.");
        return;
    }

    // ============================================================
    // FUNGSI HELPER UNTUK ERROR DAN FUNGSI f(x)
    // ============================================================

    // Fungsi untuk menampilkan pesan error
    const showError = (message) => {
        errorDiv.textContent = message;  // Tulis pesan error
        errorDiv.style.display = 'block'; // Tampilkan error ke user
        console.error(message);          // Log error di console
    };

    // Fungsi untuk mengevaluasi string fungsi f(x)
    // Menggunakan constructor Function() agar user bisa menulis Math.sin(x), Math.pow(x), dll
    const f = (x) => {
        try {
            // Membuat fungsi baru berdasarkan string yang dimasukkan user
            return new Function('x', 'Math', `return ${funcStr}`)(x, Math);
        } catch (e) {
            // Jika fungsi tidak valid, tampilkan pesan kesalahan
            throw new Error(`Sintaks fungsi salah: "${funcStr}". Periksa kembali penulisan Anda.`);
        }
    };

    // ============================================================
    // LOGIKA UTAMA METODE REGULA FALSI
    // ============================================================
    try {
        // Hitung nilai awal fungsi di titik a dan b
        let fa = f(a);
        let fb = f(b);

        // Cek apakah hasil fungsi valid
        if (isNaN(fa) || isNaN(fb)) {
             throw new Error("Fungsi menghasilkan nilai non-numerik (NaN). Cek domain fungsi.");
        }

        // Syarat Regula Falsi: f(a) dan f(b) harus memiliki tanda berlawanan
        if (fa * fb >= 0) {
            throw new Error(`f(a) dan f(b) harus memiliki tanda berlawanan. Saat ini: f(${a})=${fa.toFixed(4)} dan f(${b})=${fb.toFixed(4)}.`);
        }

        // Tampilkan judul tabel iterasi
        tableTitle.classList.remove('hidden');

        let c = a; // Inisialisasi titik tengah (c) awal

        // ====================================================
        // PERULANGAN UTAMA ITERASI REGULA FALSI
        // ====================================================
        for (let i = 0; i < maxIterations; i++) {
            // Hitung nilai fungsi pada batas a dan b terkini
            fa = f(a);
            fb = f(b);

            // Rumus Regula Falsi:
            // c = (a * f(b) - b * f(a)) / (f(b) - f(a))
            c = (a * fb - b * fa) / (fb - fa);
            let fc = f(c);

            // Validasi jika c tidak valid
            if (isNaN(c) || !isFinite(c)) {
                throw new Error("Terjadi kesalahan perhitungan (division by zero atau NaN). Cek interval Anda.");
            }

            // ====================================================
            // TAMBAHKAN DATA ITERASI KE TABEL HTML
            // ====================================================
            const newRow = iterationsBody.insertRow(); // Tambahkan baris baru di tabel
            newRow.innerHTML = `
                <td>${i + 1}</td>               <!-- Nomor iterasi -->
                <td>${a.toFixed(6)}</td>         <!-- Nilai a -->
                <td>${b.toFixed(6)}</td>         <!-- Nilai b -->
                <td>${c.toFixed(6)}</td>         <!-- Nilai c -->
                <td>${fc.toFixed(6)}</td>        <!-- Nilai f(c) -->
            `;

            // Jika nilai f(c) sudah cukup kecil (mendekati nol), maka akar ditemukan
            if (Math.abs(fc) < tolerance) {
                resultTitle.classList.remove('hidden'); // Tampilkan judul hasil
                resultDiv.innerHTML = `Akar ditemukan: <strong>${c.toFixed(6)}</strong>`;
                newRow.style.backgroundColor = '#d4edda'; // Tandai baris solusi dengan warna hijau muda
                return; // Hentikan iterasi
            }

            // Update batas bawah dan atas
            // Jika tanda f(a)*f(c) negatif, akar ada di antara a dan c → ganti b = c
            if (fa * fc < 0) {
                b = c;
            } else {
                a = c; // Jika tidak, akar di antara c dan b → ganti a = c
            }
        }
        
        // Jika loop selesai tanpa menemukan akar, tampilkan pesan gagal konvergen
        throw new Error(`Solusi tidak konvergen dalam ${maxIterations} iterasi. Perkiraan akar terakhir: ${c.toFixed(6)}`);

    } catch (e) {
        // Tangani semua error di sini
        showError(e.message);
    }
});
