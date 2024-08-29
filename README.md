# NodeJS Other Process

Di **real case** terkadang kita membutuhkan sebuah process yang berjalan secara berdampingan antara 1 process dengan process lainnya tanpa memblokir process utama atau terkadang kita juga ingin menjalankan sebuah process secara parallel atau process yang membutuhkan isolasi tinggi, permasalahan tersebut bisa kita solved dengan menggunakan module bawaan dari si `nodejs` yang itu `worker_threads` dan `child_process`.

## Concept

- **workers_theads** bisa dibilang secara umum module ini digunakan untuk menjalan sebuah process secara `asynchronous (non blocking)`, biasanya `workers_theads` digunakan untuk menjalan sebuah process secara `parallel` atau cocok juga untuk menjalankan task yang memiliki `heavy process` agar waktu eksekusi menjadi lebih cepat dan effisient. tapi perlu di ingat juga bukan berati ini tidak ada efek sampingnya jika anda tidak bisa menghandle nya dengan baik ini bisa terjadi yang namanya `race condition`, `race condition` secara umum simplenya adalah sebuah kondisi yang dimana code tersebut belum selesai di eksekusi tetapi output sudah tercetak terlebih dahulu `(balapan)`, contoh kehidupannya nyata anda sedang mengantri tiket konser, antriannya blm selesai tetapi anda sudah bisa masuk duluan atau yang di belakang anda bisa masuk terlebih dahulu. untuk menghandle terkait issue `race condition` ini anda bisa menggunakan teknik yang namanya `semaphore` ata `mutex` kalau di golang `mutex` module bawaan ada di `sync` package. dan perlu di ingat juga `workers_theads` langsung menggunakan thread processor tidak seperti golang yang di gawangi go runtime dan go schedule yang ngeschedule ke thread processor.  perlu di ingat juga `workers_theads` tidak membuat process baru seperti `child_process`  bisa di bilang si `workers_theads` memiliki memory address yang sama dengan main process jadi bisa saling sharing memory contoh dari `thread A` ke `thread B` menggunakan `broadcast channel` atau `message channel`, perlu di ingat juga `workers_theads` tidak support `Inter Process Cominicatation (IPC)` menggunakan `process.send` sebagai gantinya anda bisa menggunakan `parentPort` sebagai `IPC` dan untuk mengambil datanya anda bisa menggunakan `workerData` atau `parentPort.on(<event name>)`.

- **child_process** bisa dibilang secara umum module ini digunakan untuk menjalan sebuah process secara `asynchronous (non blocking)` hampir mirip seperti `worker_threads` cara kerjanya, tetapi module ini tidak cocok untuk menjalankan sebuah process secara `parallel` atau `heavy process`. dikarenakan gak ada efek yang signifikan impact seperti mempercepat atau waktu eksekusi lebih effisient, tetapi ini sangat cocok untuk menjalankan sebuah process yang membutuhkan isolate tinggi atau juga cocok jika anda ingin menjalan script seperti `shell script` atau bahasa pemerograman yang berbeda anda bisa menggunakan `exec` atau `spawn`.

## Strength & Weakness

- **Worker Threads**

    - **Strength**
      + [x] Tidak membuat process baru dan masih dalam main process yang sama
      + [x] Menggunakan alamat memory yang sama sehingga bisa saling sharing data antar process
      + [x] Cocok digunakan untuk menjalankan tugas parallel dan heavy process, sehingga process eksekusi menjadi jauh lebih cepat
      + [x] Terjadinya overhead jauh lebih rendah ketimbang `child_process` karena tidak membuat process baru

    - **Weakness**
      + [x] Hanya bisa menjalan javascript/typescript code
      + [x] Pengunaan memory dan cpu meningkat seiring semakin banyak nya process tetapi masih jauh lebih baik ketimbang `child_process`
      + [x] Isolasi process kurang terisolate tidak seperti `child_process` yang membuat process baru
      + [x] Tidak support menggunakan `IPC` secara langsung, harus menggunakan `parentPort` untuk menghandle `IPC`

- **Child Process**

    - **Strength**
      + [x] Isolasi process sangat terisolate dikarenakan `child_process` membuat process baru
      + [x] Bisa menjalankan selain javascript/typescript code anda bisa menggunakan `exec` atau `spawn`
      + [x] Cocok digunakan untuk menjalankan tugas yang membutukan isolasi yang tinggi
      + [x] Pengunaan memory dan cpu jauh lebih rendah dari pada `worker_threads` jika process yang dijalankan jauh lebih sedikit
      + [x] Bisa menjalankan konsep yang hampir sama dengan `worker_threads` anda bisa menggunakan `fork`
      + [x] Support menggunakan `IPC` secara langsung tidak seperti `worker_threads` yang harus menggunakan `parentPort` untuk menghandle `IPC`

    - **Weakness**
      + [x] Tidak cocok yang menjalankan process parallel atau heavy process
      + [x] Terjadinya overhead jauh lebih tinggi ketimbang `worker_threads` karena membuat process baru
      + [x] Pengunaan memory dan cpu meningkat seiring semakin banyak nya process


Penjelasan terkait `worker_threads` dan `child_process`, berdasarkan hasil explorisasi saya dan yang saya amati dari setiap process nya, jika anda masih penasaran dan haus informasi silahkan tinggal di explore saja, perlu di ingat ini beda dengan konsep `cluster`, kalau module `cluster` digunakan untuk menggunakan semua thread yang ada, dikarenakan by default nodejs itu single thread, tetapi anda bisa menggabungkannya konsep semuanya.