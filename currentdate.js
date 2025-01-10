const today = new Date();
const formattedDate = today.toLocaleDateString().slice(0, 10); // Format: YYYY-MM-DD

// Mendapatkan hari dalam minggu
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayName = daysOfWeek[today.getDay()]; // Mengambil hari dalam minggu (0 = Sunday, 1 = Monday, ...)

// Menampilkan tanggal dan hari di elemen dengan id 'current_date'
document.getElementById('current_date').textContent = `${formattedDate} (${dayName})`;
