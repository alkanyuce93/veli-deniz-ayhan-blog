# Kişisel Blog Projesi

Next.js ve Supabase kullanılarak geliştirilmiş kişisel blog projesi.

## Özellikler

- 🎨 Açık/Koyu tema desteği
- 📱 Responsive tasarım
- ✍️ Markdown blog yazıları
- 🖼️ Resim yükleme desteği
- 📊 Admin paneli
- 🔍 Blog yazıları filtreleme

## Teknolojiler

- Next.js
- TypeScript
- Styled Components
- Supabase
- React MD Editor

## Kurulum

1. Repository'yi klonlayın:
   \`\`\`bash
   git clone https://github.com/alkanyuce93/veli-deniz-ayhan-blog.git
   \`\`\`

2. Bağımlılıkları yükleyin:
   \`\`\`bash
   npm install
   \`\`\`

3. Geliştirme sunucusunu başlatın:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Tarayıcınızda http://localhost:3001 adresini açın

## Ortam Değişkenleri

Projeyi çalıştırmak için aşağıdaki ortam değişkenlerini `.env.local` dosyasında tanımlamanız gerekiyor:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
\`\`\`

## Lisans

MIT

## Tamamlananlar

- Next.js projesi kurulumu
- TypeScript entegrasyonu
- Styled Components ve Supabase bağımlılıkları
- Supabase bağlantı bilgileri (.env.local)
- Veritabanı tabloları (files ve posts)
- Tema sistemi kurulumu
- Global stiller ve tipografi
- Responsive layout tasarımı
- Şifreli dosya yükleme bileşeni
- Ana sayfa tasarımı
- Upload API endpoint'i
- Hakkımda sayfası
- Blog sayfası ve blog yazısı detay sayfası
- İletişim sayfası ve contact API endpoint'i

## Yapılacaklar

### Sayfaların Oluşturulması

- İletişim sayfası

### Gerekli Bağımlılıklar

- formidable (dosya yükleme işlemleri için)

### Diğer Görevler

- Blog yazılarının dinamik olarak yüklenmesi
- SEO optimizasyonu
- Performans iyileştirmeleri
- Test yazımı
- Profil fotoğrafının eklenmesi

## Veritabanı Tabloları

### posts

- id: int8
- title: string
- content: string
- excerpt: string
- slug: string
- created_at: timestamp
- cover_image: string

### files

- id: int8
- filename: string
- filepath: string
- created_at: timestamp

### contact_messages

- id: int8
- name: string
- email: string
- message: text
- created_at: timestamp

## Veritabanı Yapısı

### files

```sql
CREATE TABLE files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER NOT NULL,
  type TEXT NOT NULL
);
```

### posts

```sql
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author_id UUID NOT NULL
);
```

### contact_messages

```sql
CREATE TABLE contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread'
);
```

### Storage Buckets

```sql
INSERT INTO storage.buckets (id, name) VALUES ('files', 'files');
```
