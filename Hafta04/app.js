document.addEventListener("DOMContentLoaded", () => {
    // kodlar bu parantez içinde çalışıyor

    // "addEventListener"
    //olay gerçekleştiğinde haberini ver, parantez içindeki işleri yap"

    // "DOMContentLoaded"
    // sayfadaki html itemlerini (başlıklar, formlar, tablolar)
    //tarayıcı okuyup yüklediğinde tetiklemesidir




    // main.html'de saate göre selamlama
    const selamlamaKutusu = document.getElementById("karsilama-mesaji");
    // bilgisayarın hafızasında "const" ile bir kutu açtım ve adını selamlamaKutusu koydum
    //document.getEle... ile (id="karsilama-mesaji") yazan elemanı getirir
    if (selamlamaKutusu) {
        //şu anda bulunulan sayfada "selamlamaKutusu" varsa çalış yoksa geç anlamına gellir
        const saat = new Date().getHours();
        // pc'nin o anki saatini alır ve işlemlere başlar
        let mesaj = "Hoş Geldiniz!";
        if (saat >= 6 && saat < 12) {
            mesaj = "Günaydın! Kariyerine güçlü bir stajla başla.";
        } else if (saat >= 12 && saat < 18) {
            mesaj = "Tünaydın! Güncel staj fırsatlarını kaçırma.";
        } else {
            mesaj = "İyi akşamlar! Geleceğin için yeni ilanları incele.";
        }

        selamlamaKutusu.textContent = mesaj;
        // DOM manipülasyonu burada. Bu if else bloğundan bir mesaj çıktısı olursa
        //onu yazdırır
    }




    // info.html'de DOM manipülasyanu ile kart oluştur
    const profilFormu = document.getElementById("notFormu");
    const sonucAlani = document.getElementById("profil-ozet-alani");
    // Sayfadaki notFormu ve sonuç kartını basacağımız boş alanı
    // profil-ozet-alani hafızaya alıyoruz.

    if (profilFormu && sonucAlani) {
        profilFormu.addEventListener("submit", (e) => {
            // Sayfanın yenilenmesini engeller (normalde yenilenir)
            // "submit" kodu Bilgileri Kaydet butonuna tıkladığı an olan olaydır
            e.preventDefault();

            // formdaki değerleri okuma
            // const bolum = document.getElementById("bolum").value;
            // const gano = document.getElementById("avg").value;
            // const ingilizce = document.getElementById("english_level").value;
            // const alan = document.getElementById("alan").value;

            //BU KODLARI ARTIK SİLİYORUZ.

                    // 1
            const bolumInput = document.getElementById("bolum");
            const ganoInput = document.getElementById("avg");
            const ingilizceSelect = document.getElementById("english_level");
            const alan = document.getElementById("alan").value.trim();

            const bolumHata = document.getElementById("bolumHata");
            const avgHata = document.getElementById("avgHata");
            const ingilizceHata = document.getElementById("ingilizceHata");
                    // 2
            let formGecerli = true;
                    // 3
            const bolum = bolumInput.value.trim();
            if (bolum === "") {
                bolumInput.classList.add("hata");
                bolumHata.classList.remove("gizli");
                formGecerli = false;
            } else {
                bolumInput.classList.remove("hata");
                bolumHata.classList.add("gizli");
            }
                    // 4
            const gano = ganoInput.value.trim();
            const ganoSayi = parseFloat(gano);
            if (gano === "" || isNaN(ganoSayi) || ganoSayi < 0 || ganoSayi > 4) {
                ganoInput.classList.add("hata");
                avgHata.classList.remove("gizli");
                formGecerli = false;
            } else {
                ganoInput.classList.remove("hata");
                avgHata.classList.add("gizli");
            }
                    // 5
            const ingilizce = ingilizceSelect.value;
            if (ingilizce === "") {
                ingilizceSelect.classList.add("hata");
                ingilizceHata.classList.remove("gizli");
                formGecerli = false;
            } else {
                ingilizceSelect.classList.remove("hata");
                ingilizceHata.classList.add("gizli");
            }
                    // 6
            if (!formGecerli) {
                sonucAlani.innerHTML = "";
                return;
            }


            // seçilen cinsiyeti bulur
            const seciliCinsiyet = document.querySelector('input[name="gender"]:checked').value;
            const cinsiyetYazi = (seciliCinsiyet === "male") ? "Erkek" : "Kadın";
            // "querySelector" : arama yapar. Burada "adı gender olan ve 
            //şu an işaretli (:checked) olan kutuyu bul ve değerini al anlamında

            // alttaki bos dive basitce yazdirma
            sonucAlani.innerHTML = `
                <div class="ozet-kart">
                    <h3>Aday Bilgileri Özeti:</h3>
                    <p><b>Bölüm:</b> ${bolum}</p>
                    <p><b>GANO:</b> ${gano}</p>
                    <p><b>İngilizce:</b> ${ingilizce}</p>
                    <p><b>Cinsiyet:</b> ${cinsiyetYazi}</p>
                    <p><b>İlgi Alanı:</b> ${alan || "Yok"}</p>
                    <p style="color: #1D7066; font-weight: bold; margin-top: 8px;">✓ Bilgiler kaydedildi.</p>
                </div>
            `;

            // kişiyi oluşturulan karta doğru kaydır
            sonucAlani.scrollIntoView({ behavior: "smooth" });
        });
    }




    //  İlan sayfası internships.html tıklama/sayaç
    const takipSayacEl = document.getElementById("takip-sayisi");
    const takipButonlari = document.querySelectorAll(".btn-takip");
    let takipEdilenSayisi = 0;
    // querySelectorAll(".btn-takip") :
    //tabloda kaç tane ilan varsa hepsindeki takip butonlarını bir dizi yapar

    takipButonlari.forEach((buton) => {
        // Kullanıcı ilanının yanındaki butona basarsa sayfa yenilenmeden buton yeşile 
        //dönüp "Takip Ediliyor" oluyor, bir daha basarsa takipten çıkıyor ve yukarıdaki
        //sayaç canlı olarak güncelleniyor.
        buton.addEventListener("click", () => {
            // butonları kontrol et
            if (!buton.classList.contains("takipte")) {
                buton.classList.add("takipte");
                buton.textContent = "✓ Takip Ediliyor";
                takipEdilenSayisi++;
            } else {
                buton.classList.remove("takipte");
                buton.textContent = "+ Takip Et";
                takipEdilenSayisi--;
            }

            // sayacı güncelle
            if (takipSayacEl) {
                takipSayacEl.textContent = takipEdilenSayisi;
            }
        });
    });

});