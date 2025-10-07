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
