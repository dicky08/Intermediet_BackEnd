APK POS API Product merupakan aplikasi Restfull API yang dibuat untuk menyimpan data data Product beserta Transaksi.
APK Ini sudah mengguanakn JWT Redis otentikasi dan otorisasi.
//
Otentikasi
Otentikasi adalah verifikasi apakah seseorang itu adalah orang yang berhak mengakses suatu situs ataupun perangkat yang ingin digunakan.
Otentikasi adalah siapa seseorangnya
//
Otorisasi
Otorisasi adalah proses memverifikasi bahwa kita memang memiliki akses kedalam suatu situs atau perangkat. Jadi dalam otorisasi dilakukan pengecekan suatu security apakah sesuai atua tidak.
Otorisasi adalah tentang apa yang mereka boleh lakukan
//
JWT
yaitu Json Web Token. Json Web Token adalah cara untuk mengautentikasi REST API, sehingga hanya orang yang memiliki token saja yang boleh menggunakannya.
Dimana JWT atau Token ini seperti password jadi ketika users berhasil melakukan Login maka server akan memberikan sebuah Token. Nanti Token tersebut akan disimpan oleh users pada Local Storage atau Cookies Browser dan bila users ingin mengakses halaman halaman tertentu maka harus menyertakan token tersebut
//
Redis
Redis, singkatan dari Remote Dictionary Server, adalah penyimpanan data nilai utama di dalam memori yang super cepat dengan sumber terbuka untuk digunakan sebagai database, cache, broker pesan, dan antrean. Semua data Redis terdapat di dalam memori, berbeda dengan database yang menyimpan data di disk atau SSD. Dengan menghilangkan kebutuhan untuk mengakses disk, penyimpanan data di dalam memori seperti Redis menghindari penundaan waktu pencarian dan dapat mengakses data dalam mikrodetik

//
![Login](https://user-images.githubusercontent.com/53321389/93398303-7be32f00-f8a5-11ea-8998-8414a9b2766b.PNG)
![getALLPRODUCT](https://user-images.githubusercontent.com/53321389/93398287-78e83e80-f8a5-11ea-81c3-ffa10a7e88a6.PNG)
![handling eror image](https://user-images.githubusercontent.com/53321389/93398296-7ab20200-f8a5-11ea-9b03-833d8eb40149.PNG)
![insert](https://user-images.githubusercontent.com/53321389/93398301-7b4a9880-f8a5-11ea-8468-a8f0333d62b6.PNG)

