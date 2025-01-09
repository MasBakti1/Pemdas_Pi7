const today = new Date();
const formattedDate = today.toISOString().slice(0, 10); // Format: YYYY-MM-DD

// Menampilkan tanggal di elemen dengan id 'current_date'
document.getElementById('current_date').textContent = formattedDate;
