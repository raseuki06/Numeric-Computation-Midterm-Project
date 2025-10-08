document.getElementById('regulaFalsiForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form reload halaman

    // Ambil elemen DOM
    const funcStr = document.getElementById('function').value;
    const aVal = document.getElementById('a').value;
    const bVal = document.getElementById('b').value;
    const tolVal = document.getElementById('tolerance').value;
    const maxIterVal = document.getElementById('maxIterations').value;

    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const iterationsBody = document.getElementById('iterationsBody');
    const resultTitle = document.getElementById('result-title');
    const tableTitle = document.getElementById('table-title');

    // Reset output dari proses sebelumnya
    resultDiv.innerHTML = '';
    errorDiv.style.display = 'none';
    iterationsBody.innerHTML = '';
    resultTitle.classList.add('hidden');
    tableTitle.classList.add('hidden');
    
    // Logika utama akan ditambahkan di sini oleh anggota berikutnya
    console.log("Form submitted!");
    console.log("Fungsi:", funcStr);
    console.log("a:", aVal, "b:", bVal);
    console.log("Toleransi:", tolVal, "Max Iterasi:", maxIterVal);
});

document.getElementById('regulaFalsiForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form reload halaman

    // Ambil elemen DOM
    const funcStr = document.getElementById('function').value;
    const aVal = document.getElementById('a').value;
    const bVal = document.getElementById('b').value;
    const tolVal = document.getElementById('tolerance').value;
    const maxIterVal = document.getElementById('maxIterations').value;

    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const iterationsBody = document.getElementById('iterationsBody');
    const resultTitle = document.getElementById('result-title');
    const tableTitle = document.getElementById('table-title');

    // Reset output dari proses sebelumnya
    resultDiv.innerHTML = '';
    errorDiv.style.display = 'none';
    iterationsBody.innerHTML = '';
    resultTitle.classList.add('hidden');
    tableTitle.classList.add('hidden');

    // --- Fungsi Helper untuk Menampilkan Error ---
    const showError = (message) => {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        console.error(message);
    };

    // --- Validasi Input Awal ---
    if (!funcStr || !aVal || !bVal || !tolVal || !maxIterVal) {
        showError("Semua kolom input harus diisi.");
        return;
    }
    
    const a = parseFloat(aVal);
    const b = parseFloat(bVal);
    const tolerance = parseFloat(tolVal);
    const maxIterations = parseInt(maxIterVal);

    if (isNaN(a) || isNaN(b) || isNaN(tolerance) || isNaN(maxIterations)) {
        showError("Input a, b, toleransi, dan iterasi harus berupa angka.");
        return;
    }

    // --- Logika Utama Regula Falsi akan ditambahkan di sini ---
    console.log("Input valid, siap untuk kalkulasi.");

});

document.getElementById('regulaFalsiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const funcStr = document.getElementById('function').value;
    const aVal = document.getElementById('a').value;
    const bVal = document.getElementById('b').value;
    const tolVal = document.getElementById('tolerance').value;
    const maxIterVal = document.getElementById('maxIterations').value;

    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const iterationsBody = document.getElementById('iterationsBody');
    const resultTitle = document.getElementById('result-title');
    const tableTitle = document.getElementById('table-title');

    resultDiv.innerHTML = '';
    errorDiv.style.display = 'none';
    iterationsBody.innerHTML = '';
    resultTitle.classList.add('hidden');
    tableTitle.classList.add('hidden');

    if (!funcStr || !aVal || !bVal || !tolVal || !maxIterVal) {
        showError("Semua kolom input harus diisi.");
        return;
    }
    
    let a = parseFloat(aVal);
    let b = parseFloat(bVal);
    const tolerance = parseFloat(tolVal);
    const maxIterations = parseInt(maxIterVal);

    const showError = (message) => {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        console.error(message);
    };

    if (isNaN(a) || isNaN(b) || isNaN(tolerance) || isNaN(maxIterations)) {
        showError("Input a, b, toleransi, dan iterasi harus berupa angka.");
        return;
    }

    const f = (x) => {
        try {
            return new Function('x', 'Math', return ${funcStr})(x, Math);
        } catch (e) {
            throw new Error(Sintaks fungsi salah: "${funcStr}". Periksa kembali penulisan Anda.);
        }
    };

    // --- Logika Utama Regula Falsi ---
    try {
        let fa = f(a);
        let fb = f(b);

        if (isNaN(fa) || isNaN(fb)) {
             throw new Error("Fungsi menghasilkan nilai non-numerik (NaN). Cek domain fungsi.");
        }

        if (fa * fb >= 0) {
            throw new Error(f(a) dan f(b) harus memiliki tanda berlawanan. Saat ini: f(${a})=${fa.toFixed(4)} dan f(${b})=${fb.toFixed(4)}.);
        }

        let c = a; 
        for (let i = 0; i < maxIterations; i++) {
            fa = f(a);
            fb = f(b);

            c = (a * fb - b * fa) / (fb - fa);
            let fc = f(c);
            
            if (isNaN(c) || !isFinite(c)) {
                throw new Error("Terjadi kesalahan perhitungan (division by zero atau NaN). Cek interval Anda.");
            }

            // Bagian tabel akan ditambahkan oleh Anggota 6

            if (Math.abs(fc) < tolerance) {
                resultTitle.classList.remove('hidden');
                resultDiv.innerHTML = Akar ditemukan: <strong>${c.toFixed(6)}</strong>;
                return; // Selesai
            }

            if (fa * fc < 0) {
                b = c;
            } else {
                a = c;
            }
        }
        
        throw new Error(Solusi tidak konvergen dalam ${maxIterations} iterasi. Perkiraan akar terakhir: ${c.toFixed(6)});

    } catch (e) {
        showError(e.message);
    }
});
