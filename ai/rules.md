## rules

- jangan menghapus file tanpa izin
- jangan over engineer
- jangan menambahkan code ga berguna
- jangan gunakan singkatan, buat agar setiap code itu readable dari if else while dll

### ANTI AI SLOP

Jangan menghasilkan desain, UX, atau implementasi yang terlihat seperti output
template AI, generator UI, atau hasil optimasi estetika tanpa alasan yang jelas.

Prioritaskan konteks, fungsi, kejelasan, konsistensi, dan kebutuhan pengguna.

#### Visual UI yang Harus Dihindari

Hindari penggunaan elemen berikut sebagai default:

- gradient background dekoratif
- gradient text
- gradient button tanpa kebutuhan
- glassmorphism
- excessive blur
- backdrop blur yang tidak diperlukan
- excessive box-shadow
- shadow bertumpuk pada hampir setiap elemen
- glow effect
- neon color
- kombinasi warna "AI" seperti ungu-biru-cyan secara default
- radial gradient dekoratif
- linear gradient dekoratif
- background grid dekoratif
- dot pattern dekoratif
- noise texture dekoratif
- glowing border
- outline glow
- border gradient
- glass card
- translucent card
- capsule button
- pill button tanpa alasan UX
- capsule input
- pill-shaped navigation tanpa kebutuhan
- badge pill di atas heading
- badge dekoratif yang tidak menyampaikan informasi penting
- rounded corner berlebihan
- semua elemen diberi border-radius yang sama secara otomatis
- card di dalam card di dalam card
- card yang hanya membungkus satu teks atau satu elemen
- floating card yang tidak memiliki fungsi
- floating action yang tidak diperlukan
- elemen yang sengaja dibuat melayang hanya agar terlihat "premium"
- dekorasi 3D yang tidak memiliki fungsi
- blob shape sebagai dekorasi default
- abstract shape sebagai filler
- ilustrasi dekoratif yang tidak membantu pengguna
- icon pada setiap section hanya untuk mempercantik
- icon yang menggantikan label penting
- emoji sebagai elemen UI tanpa alasan
- separator dekoratif yang berlebihan
- garis, dots, atau ornament yang hanya mengisi ruang kosong
- efek hover yang terlalu dramatis
- animasi masuk pada setiap section
- parallax tanpa kebutuhan
- scroll animation berlebihan
- bouncing animation
- floating animation yang tidak memiliki fungsi
- shimmer effect yang berlebihan
- loading animation yang terlalu kompleks
- cursor animation
- custom cursor tanpa alasan yang kuat
- oversized visual decoration
- background illustration yang mengganggu hierarchy
- typography eksperimental pada aplikasi fungsional
- terlalu banyak jenis font
- terlalu banyak font weight
- heading super besar hanya untuk terlihat modern
- uppercase text berlebihan
- letter spacing ekstrem
- teks dengan warna terlalu redup sehingga sulit dibaca
- kontras rendah demi estetika

Jangan menggunakan elemen-elemen tersebut hanya karena terlihat modern,
premium, futuristic, elegant, atau visually impressive.

Gunakan hanya ketika terdapat alasan UX, branding, accessibility,
information hierarchy, atau kebutuhan produk yang jelas.

---

#### Pola Layout yang Harus Dihindari

- dashboard SaaS generik
- hero section generik dengan heading besar + subtitle + dua button + mockup
- layout landing page yang terasa seperti template
- sidebar + topbar + card grid tanpa alasan produk
- tiga atau empat card sejajar hanya untuk mengisi ruang
- section dengan struktur yang sama berulang kali
- grid card yang dibuat hanya karena "terlihat rapi"
- terlalu banyak whitespace tanpa tujuan
- terlalu banyak section pada halaman yang sebenarnya sederhana
- layout yang terlalu simetris hanya demi estetika
- setiap section memiliki heading + subtitle + cards dengan pola identik
- content ditempatkan di tengah secara berlebihan
- semuanya menggunakan container dengan lebar yang sama tanpa mempertimbangkan konten
- pemaksaan 2-column layout untuk konten yang lebih baik dalam 1-column
- penggunaan split-screen hanya karena terlihat modern
- sidebar untuk navigasi yang sebenarnya cukup dengan navigasi sederhana
- membuat halaman panjang hanya untuk memamerkan design
- decorative empty space yang tidak meningkatkan hierarchy
- desain yang terlalu padat hanya karena semua informasi ingin ditampilkan sekaligus
- penggunaan accordion, tabs, carousel, modal, atau dropdown tanpa kebutuhan nyata
- membuat interaksi kompleks untuk task sederhana

Setiap layout harus berasal dari kebutuhan informasi dan user flow,
bukan dari template visual.

---

#### Komponen UI yang Harus Dihindari

- membuat card untuk setiap objek
- membuat modal untuk setiap action
- membuat dropdown ketika pilihan sebenarnya sedikit
- menggunakan tabs untuk konten yang seharusnya terlihat bersamaan
- menggunakan tooltip untuk informasi yang sebenarnya penting
- menggunakan toast untuk feedback yang membutuhkan perhatian
- menggunakan carousel untuk konten yang seharusnya dapat dilihat langsung
- membuat stepper untuk proses yang hanya memiliki sedikit langkah
- membuat custom component padahal HTML native sudah cukup
- membuat wrapper component tanpa tanggung jawab yang jelas
- membuat komponen hanya agar file terlihat lebih terstruktur
- membuat komponen generic sebelum ada kebutuhan reuse
- membuat design-system abstraction terlalu dini
- menambahkan icon ke setiap button
- membuat button menjadi icon-only tanpa alasan
- menggunakan icon yang ambigu
- mengandalkan warna saja untuk menyampaikan status
- menggunakan hover sebagai satu-satunya cara menemukan fungsi
- menyembunyikan action penting di menu atau overflow
- menggunakan disabled state ketika seharusnya memberikan feedback
- mengubah semua element menjadi interactive tanpa alasan

---

#### UX yang Harus Dihindari

Jangan membuat UX yang terlihat bagus tetapi menyulitkan pengguna.

Hindari:

- onboarding yang terlalu panjang
- forced onboarding
- terlalu banyak permission request
- modal bertingkat
- nested modal
- confirmation dialog untuk setiap tindakan kecil
- destructive action tanpa penjelasan yang jelas
- primary action yang sulit ditemukan
- CTA yang terlalu banyak
- beberapa tombol dengan tingkat prioritas yang sama
- istilah yang berbeda untuk fungsi yang sama
- label yang ambigu
- placeholder yang menggantikan label
- form terlalu panjang tanpa grouping yang jelas
- validasi hanya setelah submit jika validasi lebih awal memungkinkan
- error message generik
- error "Something went wrong" tanpa konteks
- loading state tanpa feedback
- empty state yang hanya berkata "No data"
- success state yang tidak memberi tahu apa yang berhasil
- action selesai tetapi tidak ada feedback
- halaman reload untuk perubahan kecil yang sebenarnya dapat dilakukan secara lokal
- mengharuskan pengguna mengingat informasi dari halaman sebelumnya
- hidden state yang sulit dipahami
- interaksi yang bergantung pada tebakan pengguna
- navigasi yang tidak konsisten
- back button yang tidak bekerja seperti ekspektasi
- form reset tanpa konfirmasi
- kehilangan input ketika terjadi error
- auto-submit tanpa alasan
- auto-play tanpa alasan
- auto-refresh yang mengganggu pekerjaan pengguna
- scroll hijacking
- gesture-only interaction
- hover-only interaction
- tiny click targets
- action penting yang hanya tersedia pada mobile gesture
- accessibility sebagai tambahan belakangan

---

#### Copywriting yang Harus Dihindari

Jangan menggunakan copywriting pemasaran generik yang terdengar seperti AI.

Hindari istilah seperti:

- unlock
- supercharge
- next generation
- revolutionary
- powerful
- seamless
- effortless
- elevate
- transform
- empower
- unleash
- intelligent
- cutting-edge
- modern solution
- all-in-one
- game-changing
- streamline
- maximize
- optimize
- future-proof

kecuali memang merupakan istilah yang relevan dengan produk atau
secara eksplisit diminta.

Gunakan bahasa yang konkret, spesifik, dan membantu pengguna memahami
apa yang terjadi atau apa yang dapat mereka lakukan.

Jangan membuat heading hanya untuk terdengar keren.

---

#### AI-Generated Design Patterns

Jangan secara otomatis menghasilkan pola seperti:

"Badge kecil + heading besar + subtitle + CTA"

"Gradient hero + floating cards + dashboard preview"

"3 cards + icon + heading + paragraph"

"Big number + tiny label + colored badge"

"Sidebar + glass cards + gradient chart"

"Dark background + purple glow + cyan accent"

"Centered heading + three feature cards"

"Icon + heading + description" pada setiap section.

Pola tersebut boleh digunakan apabila memang sesuai dengan kebutuhan
produk, tetapi jangan digunakan hanya karena merupakan pola yang umum
dihasilkan AI.

---

#### Code Slop

Jangan menghasilkan kode yang terlihat seperti hasil generasi AI tanpa
memahami codebase.

Hindari:

- over-engineering
- premature abstraction
- premature optimization
- unnecessary design patterns
- unnecessary interfaces
- unnecessary base classes
- unnecessary factories
- unnecessary providers
- unnecessary wrappers
- unnecessary hooks
- unnecessary custom utilities
- unnecessary helper functions
- unnecessary generic types
- unnecessary configuration
- unnecessary dependencies
- duplicate utilities
- duplicate components
- duplicate business logic
- duplicate validation
- duplicate API calls
- duplicate state
- wrapper hell
- deeply nested components tanpa alasan
- fungsi yang terlalu panjang
- fungsi yang terlalu kecil tanpa manfaat nyata
- parameter berlebihan
- boolean flag terlalu banyak
- magic numbers
- magic strings
- generic utility yang hanya digunakan sekali
- abstraction yang hanya digunakan sekali
- type abstraction yang tidak memberikan manfaat
- membuat file baru hanya karena file lama terlihat besar
- memecah kode secara mekanis tanpa meningkatkan maintainability
- komentar yang menjelaskan hal yang sudah jelas
- komentar berlebihan hanya untuk menunjukkan proses berpikir AI
- TODO yang tidak diperlukan
- fallback yang menutupi bug
- try/catch yang hanya menelan error
- console.log yang tertinggal
- dead code
- unreachable code
- unused imports
- unused variables
- unused components
- duplicate constants
- duplicate configuration
- hardcoded value yang seharusnya berasal dari sumber konfigurasi
- membuat ulang functionality yang sudah tersedia di project
- menambahkan library untuk kebutuhan yang dapat diselesaikan dengan kode sederhana
- mengubah banyak file hanya karena memungkinkan
- rewrite besar ketika perubahan kecil sudah cukup

Sebelum membuat sesuatu yang baru, selalu cari apakah implementasi,
utility, component, hook, service, helper, atau pattern yang dibutuhkan
sudah tersedia.

---

#### Architecture Slop

Jangan memperumit arsitektur hanya agar terlihat enterprise.

Hindari:

- layer tambahan tanpa tanggung jawab jelas
- service yang hanya meneruskan function call
- repository yang tidak memberikan abstraction nyata
- controller yang meneruskan semuanya tanpa logic yang jelas
- manager, handler, processor, orchestrator, coordinator, factory,
  adapter, atau provider yang dibuat hanya karena terdengar architectural
- event-driven architecture untuk kebutuhan sederhana
- microservice untuk masalah yang dapat diselesaikan sebagai modular monolith
- message queue tanpa kebutuhan asynchronous yang nyata
- caching tanpa masalah performa yang terukur
- state management global untuk state lokal
- database abstraction tambahan tanpa kebutuhan
- generic architecture yang tidak mengikuti domain aplikasi

Arsitektur harus mengikuti kompleksitas masalah.

Jangan menambah kompleksitas hanya untuk terlihat profesional.

---

#### Data dan Backend Slop

Hindari:

- query database yang berulang
- N+1 query
- mengambil seluruh kolom ketika hanya beberapa yang dibutuhkan
- mengambil seluruh dataset tanpa pagination ketika dataset dapat berkembang
- endpoint baru ketika endpoint yang ada masih dapat digunakan
- response field yang tidak diperlukan
- business logic di tempat yang salah
- validation yang berbeda untuk behavior yang sama tanpa alasan
- authorization yang hanya dilakukan di frontend
- error handling yang tidak konsisten
- status code yang tidak sesuai
- endpoint dengan behavior yang ambigu
- database migration yang destruktif tanpa alasan
- menyimpan data duplikat tanpa kebutuhan
- membuat table atau field baru sebelum memeriksa schema yang ada
- melakukan fetch berulang untuk data yang sama
- retry tanpa memahami failure mode
- timeout atau retry arbitrer
- logging data sensitif
- secrets dalam source code
- bypass authentication atau authorization untuk mempermudah development

---

#### Frontend Code Slop

Hindari:

- state global untuk state yang hanya digunakan satu component
- useEffect atau lifecycle logic yang tidak diperlukan
- effect yang memanggil effect lain tanpa alasan
- prop drilling yang sebenarnya dapat diselesaikan dengan struktur component
- context untuk state sederhana
- memoization tanpa masalah performa yang nyata
- useMemo dan useCallback di semua tempat
- conditional rendering yang terlalu kompleks
- nested ternary yang sulit dibaca
- giant component yang menangani terlalu banyak tanggung jawab
- membuat component menjadi generic sebelum benar-benar reusable
- fetch logic tersebar di banyak tempat
- loading, error, dan empty state yang tidak konsisten
- DOM manipulation ketika framework sudah menyediakan mekanisme yang sesuai
- CSS hack yang menutupi masalah layout
- !important sebagai solusi default
- inline style yang berlebihan
- duplicate styling
- responsive breakpoint yang dibuat tanpa alasan
- mobile layout yang hanya mengecilkan desktop layout
- desktop-first thinking yang mengabaikan mobile behavior
- accessibility yang rusak karena custom component

---

#### UI/UX Quality Gate

Sebelum menyelesaikan pekerjaan UI/UX, evaluasi:

1. Apakah setiap elemen memiliki tujuan?
2. Apakah hierarchy informasi jelas?
3. Apakah user dapat memahami tindakan utama tanpa menebak?
4. Apakah desain mengikuti konteks produk, bukan template?
5. Apakah ada dekorasi yang dapat dihapus tanpa mengurangi usability?
6. Apakah ada card, badge, icon, shadow, gradient, atau animation yang
   hanya ditambahkan untuk mempercantik?
7. Apakah state loading, empty, error, success, disabled, dan edge case
   telah dipikirkan?
8. Apakah keyboard navigation dan accessibility masuk akal?
9. Apakah layout tetap jelas pada berbagai ukuran layar?
10. Apakah interface masih terasa baik jika semua dekorasi dihapus?

Jika desain tetap kuat tanpa dekorasi tambahan, pertahankan kesederhanaannya.

---

#### Code Quality Gate

Sebelum menyelesaikan pekerjaan code, evaluasi:

1. Apakah perubahan ini benar-benar diperlukan?
2. Apakah solusi ini sudah mengikuti pattern yang ada?
3. Apakah ada implementasi yang sebenarnya sudah tersedia?
4. Apakah ada abstraction yang dapat dihapus?
5. Apakah ada dependency yang tidak diperlukan?
6. Apakah ada file, function, component, type, atau utility yang tidak perlu dibuat?
7. Apakah behavior lama tetap terjaga?
8. Apakah error benar-benar ditangani, bukan disembunyikan?
9. Apakah test yang relevan tersedia?
10. Apakah final diff lebih kompleks daripada masalah yang ingin diselesaikan?

Jika solusi terlihat jauh lebih kompleks daripada masalahnya,
kembali dan cari solusi yang lebih sederhana.