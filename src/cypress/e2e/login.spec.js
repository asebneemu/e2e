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

    it('Hatalı durumlarda beklenen hata mesajları görünüyor', () => {
        cy.get('input[type="email"]').type('test@');
        cy.get('button').click();
        cy.get('p').should('have.length', 1); // 1 hata mesajı bekleniyor
        cy.get('p').should('contain', 'Geçersiz email'); // Doğru hata mesajı kontrolü
        cy.get('button').should('be.disabled'); // Butonun disabled durumda olduğu kontrolü
    });

    // Diğer senaryoları buraya ekleyin
});
