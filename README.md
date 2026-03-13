# 🚀 Developer Profile & Mood Tracker (React Native)

Modern, oyunlaştırılmış bir **React Native mobil uygulaması**.
Bu proje üniversite ödevi kapsamında **JSX, Component, Props ve State** kavramlarını göstermek amacıyla geliştirilmiştir.

Uygulama geliştirici kartları üzerinden kullanıcı etkileşimi sağlar ve **puan, seviye, mood sistemi ve başarımlar** içerir.

---

# 📱 Uygulama Özellikleri

### 👨‍💻 DeveloperCard Component

Tekrar kullanılabilir bir React Native bileşeni.

Props olarak:

* `name` → geliştirici adı
* `skill` → uzmanlık alanı
* `level` → geliştirici seviyesi
* `accentColor` → kart rengi
* `onHire` → işe alım fonksiyonu

---

# ⚙️ React Kavramları

Bu projede aşağıdaki React kavramları kullanılmıştır:

### JSX

UI bileşenleri JSX syntax ile yazılmıştır.

### Component Yapısı

* DeveloperCard
* StatsHeader
* MoodSelector
* AchievementToast

### Props

Componentler arası veri aktarımı için kullanılır.

### State (useState Hook)

Ana state değişkenleri:

```
available
points
mood
currentLevel
```

State değişimleri kullanıcı etkileşimleri ile güncellenir.

---

# 🎮 Oyunlaştırma Sistemi

Uygulama kullanıcı etkileşimini artırmak için oyunlaştırma içerir.

### Puan Sistemi

* Her işe alımda **+10 puan**

### Level Sistemi

* Her **30 puanda seviye atlama**

### Mood Sistemi

Emoji ile geliştirici ruh hali gösterilir.

Örnek:

🙂 → normal
💻 → çalışıyor

---

# 📊 Uygulama Sayfaları

## 🏠 Home

Ana dashboard ekranı:

* Developer kartları
* Mood seçici
* Puan ve level göstergesi
* İstatistik başlığı

---

## 📈 Leaderboard

Animasyonlu geliştirici sıralaması.

Özellikler:

* 🥇🥈🥉 sıralama rozetleri
* puana göre sıralama
* görsel ilerleme göstergesi

---

## 🏆 Achievements

Başarım sistemi.

Örnek başarımlar:

* İlk geliştirici işe alımı
* 100 puan kazanma
* Tam takım oluşturma

Açılan başarımlar için **bildirim animasyonu** gösterilir.

---

# 🎨 UI Özellikleri

* Flexbox ile responsive layout
* Modern kart tasarımı
* Yuvarlatılmış köşeler
* Shadow efektleri
* Emoji avatar
* Mood’a göre arka plan değişimi
* Animasyonlu emoji geçişi
* Buton press animasyonu

---

# 🧩 Kullanılan Teknolojiler

* React Native
* Expo
* React Hooks
* AsyncStorage
* Expo Router
* Animated API

---

# 📂 Proje Yapısı

```
expo/
 ├── app
 │   ├── (tabs)
 │   │   ├── home
 │   │   ├── leaderboard
 │   │   └── achievements
 │
 ├── components
 │   ├── DeveloperCard.tsx
 │   ├── StatsHeader.tsx
 │   ├── MoodSelector.tsx
 │   └── AchievementToast.tsx
 │
 ├── providers
 │   └── GameProvider.tsx
 │
 └── mocks
     ├── developers.ts
     └── achievements.ts
```

---

# ▶️ Kurulum

### 1️⃣ Repoyu klonla

```
git clone https://github.com/kullaniciadi/project-name.git
```

### 2️⃣ Proje klasörüne gir

```
cd project-name
```

### 3️⃣ Bağımlılıkları yükle

```
npm install
```

### 4️⃣ Uygulamayı çalıştır

```
npx expo start
```

QR kodu okutarak telefonda açabilirsiniz.

---

# 📦 APK Oluşturma

Expo ile APK oluşturmak için:

```
npx expo prebuild
npx expo run:android
```

veya

```
eas build -p android
```

---

# 🎓 Proje Amacı

Bu proje aşağıdaki React Native kavramlarını göstermek amacıyla geliştirilmiştir:

* JSX kullanımı
* Component mimarisi
* Props ile veri aktarımı
* State yönetimi
* Hook kullanımı
* Modern mobil UI geliştirme
* Oyunlaştırılmış kullanıcı etkileşimi

---

# 👩‍💻 Geliştirici

Üniversite mobil uygulama geliştirme dersi kapsamında geliştirilmiştir.
