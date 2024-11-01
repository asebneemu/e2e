describe('Login Form Tests', () => {
    beforeEach(() => {
        cy.visit('/'); // Projenizin ana sayfasını ziyaret edin
    });

    it('Başarılı form doldurulduğunda submit edebiliyorum', () => {
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('strongpassword');
        cy.get('input[type="checkbox"]').check();
        cy.get('button').click();

        cy.url().should('include', '/success'); // Başarı sayfası yönlendirmesi kontrol ediliyor
    });

    it('Hatalı email girişi yapıldığında hata mesajı görünüyor', () => {
        cy.get('input[type="email"]').type('test@');
        cy.get('button').click();
        
        cy.get('p').should('have.length', 1); // 1 hata mesajı bekleniyor
        cy.get('p').should('contain', 'Geçersiz email'); // Doğru hata mesajı kontrolü
        cy.get('button').should('be.disabled'); // Butonun disabled durumda olduğu kontrolü
    });

    it('Hatalı şifre girişi yapıldığında hata mesajı görünüyor', () => {
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('123'); // Kısa şifre
        cy.get('input[type="checkbox"]').check();
        cy.get('button').click();

        cy.get('p').should('have.length', 1); // 1 hata mesajı bekleniyor
        cy.get('p').should('contain', 'Şifre en az 6 karakter olmalıdır'); // Doğru hata mesajı kontrolü
        cy.get('button').should('be.disabled'); // Butonun disabled durumda olduğu kontrolü
    });

    it('Şartları kabul etmediğimde buton disabled kalıyor', () => {
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('strongpassword');
        cy.get('button').should('be.disabled'); // Buton başlangıçta disabled durumda

        cy.get('input[type="checkbox"]').check(); // Şartları kabul et
        cy.get('button').should('not.be.disabled'); // Buton artık aktif olmalı
    });

    it('Hatalı durumlarda birden fazla hata mesajı görünüyor', () => {
        cy.get('input[type="email"]').type('test@'); // Hatalı email
        cy.get('input[type="password"]').type('123'); // Hatalı şifre
        cy.get('button').click();

        cy.get('p').should('have.length', 2); // 2 hata mesajı bekleniyor
        cy.get('p').should('contain', 'Geçersiz email'); // Doğru hata mesajı kontrolü
        cy.get('p').should('contain', 'Şifre en az 6 karakter olmalıdır'); // Doğru hata mesajı kontrolü
        cy.get('button').should('be.disabled'); // Butonun disabled durumda olduğu kontrolü
    });

    it('Email ve password doğru ama kuralları kabul etmedim', () => {
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('strongpassword');
        cy.get('button').should('be.disabled'); // Buton başlangıçta disabled durumda

        // Şartları kabul etmeden butona tıklama
        cy.get('button').click();
        cy.url().should('not.include', '/success'); // Başarı sayfasına yönlendirme olmamalı
    });
    it('Geçerli email ama geçersiz şifre girişi yapıldığında hata mesajı görünüyor', () => {
        cy.get('input[type="email"]').type('test@example.com'); // Geçerli email
        cy.get('input[type="password"]').type('123'); // Kısa şifre
        cy.get('button').click();
    
        cy.get('p').should('have.length', 1); // 1 hata mesajı bekleniyor
        cy.get('p').should('contain', 'Şifre en az 6 karakter olmalıdır'); // Doğru hata mesajı kontrolü
        cy.get('button').should('be.disabled'); // Butonun disabled durumda olduğu kontrolü
    });
});
