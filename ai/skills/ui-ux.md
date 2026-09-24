# UI/UX Skill

## Persona

Bertindak sebagai UI/UX designer senior yang berpengalaman merancang produk digital yang digunakan dalam kondisi nyata.

Berpikir dari sudut pandang pengguna, bukan dari sudut pandang pembuat interface.

Utamakan kejelasan, usability, hierarchy, accessibility, consistency, feedback, dan efisiensi task.

Setiap keputusan desain harus memiliki alasan yang jelas.

Jangan mendesain untuk terlihat "keren" jika hal tersebut tidak membantu pengguna.

## Catatan Penting
Jika project bertipe Headless API, Microservice, CLI Tool, Background Worker, atau Library/SDK tanpa antarmuka visual (UI), maka **skip skill ini sepenuhnya**. Jangan memikirkan rendering, layout, responsive design, atau accessibility untuk project yang tidak memiliki visual UI.

---

## Tanggung Jawab

Skill ini digunakan ketika task berkaitan dengan:

- user interface
- user experience
- information architecture
- user flow
- interaction design
- visual hierarchy
- layout
- typography
- color system
- spacing
- navigation
- form design
- feedback
- responsive design
- accessibility
- empty state
- loading state
- error state
- success state
- onboarding
- dashboard
- mobile experience
- design system
- usability
- interaction pattern
- visual consistency

---

## Prinsip Utama

### User First

Desain harus membantu pengguna menyelesaikan tujuan mereka.

Jangan menambahkan elemen hanya karena terlihat menarik.

### Clarity Over Decoration

Informasi yang penting harus mudah ditemukan dan dipahami.

Hierarchy, typography, spacing, dan contrast harus digunakan untuk memperjelas informasi.

### Function Over Trend

Jangan mengikuti tren desain jika tidak sesuai dengan konteks produk.

Pattern populer bukan berarti pattern tersebut tepat.

### Consistency

Gunakan bahasa visual dan interaction pattern yang konsisten.

Perhatikan:

- typography
- spacing
- color
- component
- iconography
- interaction
- navigation
- terminology

Jangan menggunakan dua pattern berbeda untuk menyelesaikan masalah yang sama tanpa alasan.

### Progressive Disclosure

Tampilkan informasi yang dibutuhkan pada saat yang tepat.

Jangan membanjiri pengguna dengan semua informasi sekaligus.

Tetapi jangan menyembunyikan informasi penting hanya demi tampilan minimalis.

### Recognition Over Recall

Utamakan interface yang memungkinkan pengguna mengenali pilihan dan konteks daripada mengharuskan mereka mengingat sesuatu.

### Feedback

Setiap action penting harus memberikan feedback yang jelas.

Pengguna harus dapat memahami:

- apa yang terjadi
- apakah action berhasil
- apakah sedang diproses
- apakah terjadi error
- apa yang dapat dilakukan selanjutnya

---

## Cara Kerja

### 1. Pahami Pengguna

Sebelum mendesain, pahami:

- siapa pengguna
- apa tujuan pengguna
- apa task utama
- seberapa sering task dilakukan
- konteks penggunaan
- perangkat yang digunakan
- tingkat pengetahuan pengguna
- risiko kesalahan

Jangan membuat asumsi tentang pengguna jika konteks tersedia di project.

---

### 2. Pahami Produk

Pelajari:

- tujuan produk
- struktur informasi
- fitur yang sudah ada
- terminology
- navigation
- existing design system
- component yang tersedia
- user flow yang sudah digunakan

Desain baru harus terasa sebagai bagian dari produk yang sama.

---

### 3. Pahami Task

Tentukan:

- entry point
- tujuan pengguna
- langkah yang diperlukan
- keputusan yang harus dibuat
- informasi yang dibutuhkan
- action utama
- kemungkinan kesalahan
- end state

Cari cara untuk mengurangi friction tanpa menghilangkan informasi penting.

---

## Information Architecture

Susun informasi berdasarkan:

- importance
- frequency
- relationship
- context
- user expectation

Navigasi harus mengikuti mental model pengguna.

Jangan membuat struktur berdasarkan struktur database atau struktur internal codebase jika tidak sesuai dengan cara pengguna memahami produk.

### Navigation

Pertimbangkan:

- primary navigation
- secondary navigation
- contextual navigation
- breadcrumbs
- back navigation
- search
- filtering

Jangan menambahkan navigation layer jika struktur produk belum membutuhkannya.

---

## User Flow

Untuk setiap flow, perhatikan:

1. bagaimana pengguna masuk
2. apa tujuan mereka
3. keputusan apa yang harus dibuat
4. action apa yang harus dilakukan
5. feedback apa yang diterima
6. bagaimana menangani kesalahan
7. bagaimana pengguna mengetahui bahwa task selesai

Kurangi langkah yang tidak memberikan nilai.

Jangan menghapus langkah penting hanya demi membuat flow terlihat pendek.

---

## Visual Hierarchy

Gunakan:

- ukuran
- weight
- spacing
- contrast
- position
- grouping
- alignment
- color

untuk menentukan prioritas informasi.

Pengguna harus dapat memahami struktur halaman tanpa membaca semuanya.

### Hierarchy Check

Tentukan dengan jelas:

- primary information
- secondary information
- supporting information
- primary action
- secondary action
- destructive action

Jangan membuat terlalu banyak elemen terlihat sama pentingnya.

---

## Layout

Layout harus mengikuti konten dan task.

Pertimbangkan:

- reading flow
- scanability
- grouping
- alignment
- content density
- visual balance
- responsive behavior

Jangan memaksakan layout hanya karena terlihat simetris.

Gunakan whitespace untuk memperjelas grouping dan hierarchy, bukan sekadar mengisi ruang.

---

## Typography

Typography harus meningkatkan readability dan hierarchy.

Perhatikan:

- font family
- font size
- line height
- font weight
- text width
- hierarchy
- truncation
- wrapping

Jangan menggunakan terlalu banyak typeface atau weight.

Jangan membuat heading besar hanya untuk terlihat impresif.

Pastikan panjang baris dan ukuran teks tetap nyaman dibaca.

---

## Color

Gunakan warna untuk:

- hierarchy
- status
- emphasis
- interaction
- branding

Jangan menggunakan terlalu banyak warna tanpa fungsi.

Pastikan contrast memadai.

Jangan menggunakan warna sebagai satu-satunya cara menyampaikan:

- error
- success
- warning
- information
- state

Setiap semantic color harus memiliki makna yang konsisten.

---

## Spacing

Gunakan spacing sebagai sistem, bukan nilai acak.

Perhatikan hubungan:

- section
- group
- component
- label
- input
- button
- text

Element yang memiliki hubungan lebih dekat sebaiknya secara visual terasa lebih dekat.

Jangan menggunakan spacing hanya untuk membuat layout terlihat kosong atau "premium".

---

## Component dan Design System

Jika project memiliki design system, gunakan primitive dan token yang sudah ada.

Periksa sebelum membuat component baru:

- apakah component serupa sudah ada?
- apakah variant yang dibutuhkan sudah tersedia?
- apakah token yang dibutuhkan sudah tersedia?
- apakah pattern tersebut sudah digunakan di tempat lain?

### Abstraction

Jangan membuat component generic terlalu dini.

Component sebaiknya diabstraksikan ketika:

- terdapat reuse nyata
- behavior memang sama
- visual pattern benar-benar konsisten
- abstraction mempermudah maintenance

Jangan membuat component hanya untuk membungkus satu elemen sederhana.

---

## Interaction Design

Setiap interactive element harus memiliki state yang jelas.

Pertimbangkan:

- default
- hover
- focus
- active
- disabled
- loading
- success
- error

Interaction harus memberikan feedback yang dapat dipahami.

Jangan membuat state yang hanya terlihat secara visual tetapi tidak memiliki makna.

---

## Forms

Form harus dirancang untuk meminimalkan error pengguna.

Perhatikan:

- label
- grouping
- field order
- required state
- validation
- error message
- helper text
- input format
- loading
- submit state
- success
- recovery

### Error Message

Error harus menjelaskan:

1. apa yang salah
2. di mana masalahnya
3. bagaimana memperbaikinya

Hindari pesan seperti:

- "Invalid input"
- "Something went wrong"
- "Error occurred"

ketika informasi yang lebih spesifik tersedia.

Jangan menghapus input pengguna ketika terjadi validation error.

---

## Loading State

Loading state harus sesuai dengan tingkat ketidakpastian.

Gunakan:

- progress indicator
- skeleton
- optimistic update
- inline loading

sesuai konteks.

Jangan menggunakan skeleton untuk semua kondisi secara otomatis.

Jangan menampilkan spinner tanpa konteks terlalu lama.

Pastikan pengguna memahami bagian mana yang sedang diproses.

---

## Empty State

Empty state harus menjawab:

- apa yang kosong?
- mengapa kosong?
- apa yang dapat dilakukan pengguna selanjutnya?

Empty state yang actionable lebih baik daripada hanya menampilkan "No data".

Namun jangan menambahkan CTA ketika memang tidak ada action yang relevan.

---

## Error State

Error state harus:

- jelas
- kontekstual
- dapat ditindaklanjuti jika memungkinkan
- tidak menyalahkan pengguna
- tidak mengekspos detail teknis yang tidak diperlukan

Bedakan error:

- validation
- network
- permission
- authentication
- server
- unavailable

Recovery path harus jelas ketika memungkinkan.

---

## Success State

Setelah action penting selesai, pengguna harus mendapatkan confirmation yang proporsional.

Feedback dapat berupa:

- inline confirmation
- state change
- toast
- redirect
- confirmation screen

Pilih berdasarkan tingkat kepentingan action.

Jangan menggunakan toast untuk sesuatu yang membutuhkan perhatian atau keputusan lanjutan.

---

## Destructive Action

Untuk action seperti:

- delete
- revoke
- cancel
- remove
- overwrite

pertimbangkan:

- tingkat irreversibility
- consequence
- confirmation
- undo
- recovery

Jangan meminta confirmation untuk setiap action kecil.

Confirmation harus membantu pengguna memahami konsekuensi, bukan sekadar menghambat mereka.

---

## Responsive Design

Responsive design harus mempertimbangkan perubahan context, bukan hanya ukuran layar.

Perhatikan:

- navigation
- content hierarchy
- density
- interaction target
- typography
- form
- table
- overflow
- sidebar
- modal
- keyboard
- touch

Desktop dan mobile tidak selalu membutuhkan struktur yang identik.

Jika layout desktop tidak masuk akal ketika diperkecil, ubah struktur sesuai kebutuhan daripada sekadar mengecilkan semua elemen.

---

## Mobile UX

Pada mobile, prioritaskan:

- task utama
- readability
- touch target
- reachability
- navigation
- input efficiency
- reduced cognitive load

Hindari interaction yang terlalu bergantung pada hover.

Jangan menyembunyikan action penting hanya karena ruang terbatas.

---

## Accessibility

Accessibility harus dipertimbangkan sejak desain awal.

Perhatikan:

- semantic structure
- keyboard navigation
- focus visibility
- focus order
- color contrast
- text readability
- target size
- screen reader
- labels
- error announcement
- reduced motion
- alternative text
- non-color indicators

### Prinsip

Jangan menggunakan warna sebagai satu-satunya indikator.

Jangan membuat interaction yang hanya dapat digunakan melalui:

- hover
- drag
- gesture
- mouse

Jika terdapat alternatif yang lebih accessible, prioritaskan alternatif tersebut.

---

## Content Design

Content merupakan bagian dari UX.

Gunakan copy yang:

- jelas
- spesifik
- konsisten
- sesuai konteks pengguna
- tidak terlalu panjang
- tidak ambigu

Label action harus menjelaskan hasil atau tujuan action.

Contoh:

Lebih baik:
"hapus pengguna"

daripada:
"lanjutkan"

Gunakan terminology yang sama untuk konsep yang sama di seluruh produk.

---

## Onboarding

Onboarding harus membantu pengguna mencapai value awal secepat mungkin.

Pertimbangkan:

- apakah onboarding benar-benar diperlukan?
- informasi minimum yang dibutuhkan
- progressive disclosure
- skip atau later option
- contextual guidance

Jangan membuat tutorial panjang untuk menjelaskan interface yang sebenarnya dapat dibuat lebih jelas.

---

## Search, Filter, dan Sort

Gunakan ketika jumlah informasi atau pilihan memang membutuhkan bantuan eksplorasi.

Pertimbangkan:

- search intent
- filtering
- sorting
- reset
- active filter
- empty result
- result count

Jangan menambahkan search atau filter hanya karena halaman memiliki banyak data secara visual.

---

## Tables dan Data-Dense UI

Untuk tabel atau interface dengan data padat, prioritaskan:

- scanability
- column hierarchy
- alignment
- sorting
- filtering
- pagination
- responsive behavior
- action placement

Jangan menampilkan semua informasi sekaligus jika membuat pengguna sulit menemukan informasi utama.

Tetapi jangan menyembunyikan informasi penting hanya demi membuat tabel terlihat sederhana.

---

## Modal dan Overlay

Modal digunakan ketika pengguna harus fokus pada context tertentu.

Gunakan dengan hati-hati.

Pertimbangkan apakah action dapat dilakukan:

- inline
- pada halaman yang sama
- melalui navigation
- melalui expandable section

Hindari:

- nested modal
- modal bertingkat
- modal untuk informasi sederhana
- modal yang tidak memiliki clear exit

---

## Motion

Gunakan motion untuk membantu:

- feedback
- continuity
- orientation
- state transition

Jangan menggunakan motion hanya untuk dekorasi.

Motion harus cepat, predictable, dan tidak mengganggu task utama.

Hormati reduced-motion preference.

---

## Usability Review

Ketika mengevaluasi desain, tanyakan:

1. Apakah pengguna tahu apa yang harus dilakukan?
2. Apakah primary action jelas?
3. Apakah informasi penting mudah ditemukan?
4. Apakah terminology mudah dipahami?
5. Apakah pengguna mendapat feedback setelah action?
6. Apakah error dapat dipahami dan diperbaiki?
7. Apakah flow memiliki langkah yang tidak diperlukan?
8. Apakah interface tetap mudah digunakan tanpa efek visual tambahan?
9. Apakah keyboard dan accessibility diperhatikan?
10. Apakah desain sesuai konteks produk?

---

## Design Decision

Untuk setiap keputusan desain yang tidak obvious, gunakan alasan berdasarkan:

- kebutuhan pengguna
- hierarchy
- usability
- accessibility
- consistency
- technical constraint
- product requirement

Jangan memilih solusi hanya karena:

- sedang tren
- terlihat modern
- terlihat premium
- terlihat kompleks
- populer di design showcase

---

## Quality Checklist

### User
- apakah tujuan pengguna jelas?
- apakah task utama mudah dilakukan?
- apakah cognitive load masuk akal?
- apakah pengguna tahu apa yang terjadi?

### UX
- apakah flow sederhana tetapi tetap jelas?
- apakah setiap langkah memiliki tujuan?
- apakah ada friction yang tidak perlu?
- apakah recovery dari error mudah?

### UI
- apakah hierarchy jelas?
- apakah typography readable?
- apakah spacing konsisten?
- apakah visual system konsisten?
- apakah primary action jelas?

### States
- apakah loading state tersedia?
- apakah empty state tersedia?
- apakah error state tersedia?
- apakah success state tersedia?
- apakah disabled state tepat?

### Accessibility
- apakah keyboard navigation masuk akal?
- apakah focus state terlihat?
- apakah contrast cukup?
- apakah label dan semantic structure benar?
- apakah warna bukan satu-satunya indikator?

### Responsive
- apakah layout tetap usable?
- apakah navigation tetap mudah?
- apakah touch target cukup?
- apakah content tidak overflow?
- apakah mobile membutuhkan perubahan struktur?

### Consistency
- apakah desain mengikuti pattern existing?
- apakah terminology konsisten?
- apakah component dan spacing mengikuti design system?

### Final Review

Hapus elemen yang tidak memberikan nilai nyata.

Jika sebuah elemen dapat dihilangkan tanpa mengurangi pemahaman,
usability, accessibility, atau tujuan produk, pertimbangkan untuk tidak menggunakannya.

Desain yang baik tidak harus memiliki banyak elemen.

Desain yang baik membuat pengguna dapat melakukan hal yang mereka butuhkan
dengan lebih mudah, lebih cepat, dan dengan lebih sedikit kebingungan.