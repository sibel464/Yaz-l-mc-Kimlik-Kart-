# Yazılımcı Kimlik Kartı ve Mood Tracker Uygulaması

## Geliştirici Profil Kartı & Mood Tracker

Üniversite ödevi için JSX, Component, Props ve State kullanımını gösteren, modern ve etkileşimli bir mobil uygulama.

### **Özellikler**
- [x] Tekrar kullanılabilir **DeveloperCard** bileşeni ile yazılımcı profil kartları
- [x] Her kart isim, uzmanlık alanı ve seviye bilgisi gösterir
- [x] **"İşe Al"** butonuna basınca kart interaktif olarak değişir:
  - [x] Buton "Projelerde Çalışıyor" olur ve devre dışı kalır
  - [x] Emoji avatarı 🙂 → 💻 olarak değişir (animasyonlu)
  - [x] Puan +10 artar
  - [x] Kart arka plan rengi mood'a göre değişir
  - [x] Seviye yükselme sistemi (her 30 puanda bir seviye atlar)
- [x] Birden fazla geliştirici kartı ile kaydırılabilir liste
- [x] Toplam puan ve seviye göstergesi
- [x] Görev atama sistemi (işe alındıktan sonra görev ver, puan kazan)
- [x] Streak (seri) sistemi — hızlı aksiyonlarda bonus puan
- [x] 8 farklı başarım (hire, points, level, streak bazlı)
- [x] AsyncStorage ile kalıcı oyun durumu

### **Tasarım**
- [x] Koyu tema (koyu lacivert/siyah arka plan) üzerine canlı renkli kartlar
- [x] Her kart yuvarlatılmış köşeler, hafif gölge ve accent stripe ile modern görünüm
- [x] Emoji avatar kartın sol üstünde, animasyonlu
- [x] Puan ve seviye bilgisi parlak renkli badge'ler ile gösterilir
- [x] Mood'a göre kart arka planı yumuşak geçişle değişir
- [x] Buton basıldığında spring animasyonlu geçiş efekti
- [x] Üstte stats dashboard (4 istatistik kartı + seviye ilerleme çubuğu)
- [x] Mood seçici (6 emoji, spring animasyonlu seçim)
- [x] Başarım toast bildirimi (slide-in animasyonlu)

### **Ekranlar**
- [x] **Ana Sayfa (Tab)**: Stats dashboard, mood seçici, geliştirici kartları listesi, sıfırlama butonu
- [x] **Sıralama (Tab)**: Puanlara göre sıralı leaderboard, 🥇🥈🥉 rozetleri, animasyonlu liste
- [x] **Başarımlar (Tab)**: İlerleme çubuğu, kilitli/açık başarım kartları, animasyonlu giriş

### **Uygulama İkonu**
- Koyu lacivert arka plan üzerine parlak mavi-yeşil tonlarında bir geliştirici emoji (👨‍💻) ve kod sembolleri içeren modern ikon
