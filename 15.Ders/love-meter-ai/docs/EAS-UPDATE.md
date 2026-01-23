# EAS Update Kullanimi

Bu dokuman, EAS Update ile Over-The-Air (OTA) guncellemelerin nasil yapilacagini aciklar.

## Genel Bakis

EAS Update, uygulama store'lara yeni build gondermeden JavaScript ve asset degisikliklerini kullanicilara aninda ulastirmanizi saglar.

## Kurulum (Tamamlandi)

- `expo-updates` paketi yuklendi
- `app.json` icinde `runtimeVersion` ve `updates.url` yapilandirildi
- `eas.json` icinde channel'lar tanimlandi

## Channel'lar

| Channel     | Kullanim                    |
|-------------|----------------------------|
| development | Gelistirme build'leri      |
| preview     | Test build'leri            |
| production  | Store build'leri           |

## Temel Komutlar

### Update Yayinlama

```bash
# Production channel'a update yayinla
eas update --channel production --message "Guncelleme aciklamasi"

# Preview channel'a update yayinla
eas update --channel preview --message "Test guncellemesi"

# Otomatik mesaj ile (git commit mesajini kullanir)
eas update --channel production --auto
```

### Update Durumunu Kontrol Etme

```bash
# Tum update'leri listele
eas update:list

# Belirli bir channel'in update'lerini gor
eas update:list --channel production

# Update detaylarini gor
eas update:view <update-group-id>
```

### Update Silme/Geri Alma

```bash
# Update'i sil (rollback)
eas update:delete --id <update-id>
```

## Workflow

### 1. Normal Guncelleme (JS/Asset degisiklikleri)

JavaScript, TypeScript veya asset (resim, font, video) degisiklikleri icin:

```bash
# Degisiklikleri yap
# Test et
# Update yayinla
eas update --channel production --message "Bug fix: Login sorunu cozuldu"
```

### 2. Native Degisiklik Gerektiren Guncelleme

Native kod degisiklikleri (yeni native paket, app.json degisiklikleri) icin:

```bash
# Yeni build olustur
eas build --platform all --profile production

# Store'a gonder
eas submit --platform all
```

## Runtime Version Politikasi

`appVersion` politikasi kullaniliyor. Bu su anlama gelir:

- Her `app.json` version degisikliginde yeni bir runtime version olusur
- Ayni version'a sahip build'ler ayni update'leri alir
- Version degistirirseniz, eski build'ler yeni update'leri almaz

### Version Degistirme

```json
// app.json
{
  "expo": {
    "version": "1.0.1" // Bu degistiginde yeni runtime version olusur
  }
}
```

## Update Kontrol Stratejileri

Uygulama acildiginda update'ler otomatik kontrol edilir. Ozel davranislar icin:

### Manuel Update Kontrolu

```typescript
import * as Updates from 'expo-updates';

async function checkForUpdates() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.log('Update kontrolu basarisiz:', error);
  }
}
```

### Update Bilgilerini Gosterme

```typescript
import * as Updates from 'expo-updates';

// Mevcut update ID'si
console.log(Updates.updateId);

// Channel
console.log(Updates.channel);

// Runtime version
console.log(Updates.runtimeVersion);
```

## En Iyi Pratikler

1. **Her zaman test edin**: Update'i production'a gondermeden once preview channel'da test edin

2. **Anlamli mesajlar yazin**: Update mesajlari ne degistigini acikca belirtmeli

3. **Kucuk update'ler gonderin**: Buyuk degisiklikleri parcalara bolun

4. **Rollback planlayin**: Sorun cikarsa hizlica geri alabilmelisiniz

5. **Native degisiklikleri takip edin**: Native paket eklerseniz yeni build gerekir

## Hizli Referans

```bash
# Update yayinla
eas update --channel production --message "mesaj"

# Update'leri listele
eas update:list

# Update detayi
eas update:view <id>

# Update sil
eas update:delete --id <id>

# Branch olustur
eas update --branch feature-x --message "Test"
```

## Sorun Giderme

### Update gelmiyor
- Channel dogru mu kontrol edin
- Runtime version uyusmali
- Cihazda internet baglantisi var mi

### "No compatible update" hatasi
- Build ve update'in runtime version'lari farkli
- Yeni build olusturun

### Update cok buyuk
- Asset'leri optimize edin
- Gereksiz dosyalari cikartin
