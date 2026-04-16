document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------
    // 1. LÓGICA DO MENU HAMBÚRGUER
    // ---------------------------------
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('open');
            hamburger.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link (útil para SPAs ou links de âncora)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('open')) {
                    navList.classList.remove('open');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    // ---------------------------------
    // 2. LÓGICA DO LINK ATIVO NA NAVEGAÇÃO
    // ---------------------------------
    const navLinks = document.querySelectorAll('.nav-list a');
    const currentPath = window.location.pathname.split('/').pop(); // Pega o nome do arquivo, ex: "contato.html"

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        // Lógica para marcar o link da página atual como ativo
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
        // Tratamento especial para o perfil da Janete Neves, deve ativar 'Profissionais'
        if (currentPath === 'profissional-janete-neves.html' && linkPath === 'profissionais.html') {
             link.classList.add('active');
        }
    });

    // ---------------------------------
    // 3. LÓGICA DO CARROSSEL DE DEPOIMENTOS
    // ---------------------------------
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        const slides = Array.from(slider.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        let currentIndex = 0;

        function updateSliderPosition() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSliderPosition();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSliderPosition();
        });
        
        // Opcional: Auto-play
        setInterval(() => {
            nextButton.click();
        }, 7000); // Muda a cada 7 segundos
    }
    
    // ---------------------------------
    // 4. LÓGICA DE VALIDAÇÃO DE FORMULÁRIO (REUTILIZÁVEL)
    // ---------------------------------
    const formsToValidate = document.querySelectorAll('.needs-validation');

    formsToValidate.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const nameInput = form.querySelector('input[name="name"]');
            const emailInput = form.querySelector('input[name="email"]');
            const phoneInput = form.querySelector('input[name="phone"]');
            const messageInput = form.querySelector('textarea[name="message"]');

            let isValid = true;
            let errorMessages = [];

            // Validação do Nome
            if (nameInput && nameInput.value.trim() === '') {
                errorMessages.push('Por favor, preencha seu nome.');
                isValid = false;
            }

            // Validação do Telefone
            if (phoneInput && (phoneInput.value.trim() === '' || !/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(phoneInput.value))) {
                errorMessages.push('Por favor, insira um telefone válido (ex: (11) 98765-4321).');
                isValid = false;
            }

            // Validação do E-mail
            if (emailInput && (emailInput.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value))) {
                errorMessages.push('Por favor, insira um e-mail válido.');
                isValid = false;
            }

            // Validação da Mensagem
            if (messageInput && messageInput.value.trim() === '') {
                errorMessages.push('Por favor, digite sua mensagem.');
                isValid = false;
            }

            if (isValid) {
                // Simulação de envio bem-sucedido
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                form.reset();
                // Em um cenário real, aqui você faria uma chamada fetch() para um endpoint de backend.
            } else {
                alert('Por favor, corrija os seguintes erros:\n\n' + errorMessages.join('\n'));
            }
        });
    });

});