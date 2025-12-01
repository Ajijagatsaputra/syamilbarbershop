# Welcome to the Syamil Barbershop Management System

## Project info

**Deskripsi Singkat**
Syamil Barbershop Management System adalah aplikasi manajemen usaha barbershop yang dikembangkan untuk membantu operasional barbershop di daerah Tegal. Sistem ini digunakan untuk mengatur layanan, transaksi, jadwal barber, manajemen pelanggan, serta laporan keuangan secara terstruktur dan efisien.

Aplikasi ini dibangun menggunakan arsitektur modern yang memisahkan frontend, backend, dan database sehingga mudah dikembangkan serta di-deploy.

---

## How can I edit this code?

Terdapat beberapa cara untuk mengembangkan atau mengedit proyek ini.


### **1. Menggunakan IDE favorit Anda**

Jika Anda ingin bekerja secara lokal, ikuti langkah berikut:

```sh
# Step 1: Clone repository menggunakan Git URL proyek.
git clone <https://github.com/Ajijagatsaputra/syamilbarbershop.git>

# Step 2: Masuk ke direktori project.
cd <syamilbarbershop>

# Step 3: Install dependensi frontend.
cd frontend
npm i

# Step 4: Jalankan development server React.
npm run dev

# Step 5: Jalankan backend Golang.
cd ../backend
go run main.go
```

### **3. Edit file langsung di GitHub**

* Buka file yang ingin diedit.
* Klik tombol "Edit" (ikon pensil).
* Lakukan perubahan, lalu commit.

### **4. Menggunakan GitHub Codespaces**

* Masuk ke halaman utama repository.
* Klik "Code" → tab "Codespaces".
* Buat Codespace baru.
* Edit project langsung di lingkungan cloud dan commit perubahan.

---

## What technologies are used for this project?

Project ini dibangun menggunakan teknologi berikut:

### **Frontend**

* React
* TypeScript
* Vite
* shadcn-ui
* Tailwind CSS

### **Backend**

* Golang (Go)
* Clean architecture + REST API
* Gin / Echo (bergantung implementasi proyek)

### **Database**

* PostgreSQL

Integrasi frontend dan backend menggunakan komunikasi API sehingga sistem modular dan mudah dikembangkan.

---

## How can I deploy this project?

Deployment dapat dilakukan melalui Lovable menggunakan fitur Share → Publish.

Untuk deployment mandiri, komponen yang perlu dijalankan:

* Build React → deploy ke hosting static seperti Vercel, Netlify, atau S3.
* Deploy backend Golang ke server (VPS, Railway, Render, atau Docker).
* PostgreSQL sebagai database utama.

---


Jika Anda membutuhkan tambahan penjelasan mengenai arsitektur, struktur folder, atau ingin dibuatkan diagram sistem Syamil Barbershop, saya bisa bantu menambahkan dalam README ini.
