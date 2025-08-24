document.addEventListener('DOMContentLoaded', function () {
    const updateCodeBlock = (containerSelector, code) => {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        // Remove the old <pre> element to clear previous highlighting and line numbers
        const oldPre = container.querySelector('pre');
        if (oldPre) oldPre.remove();

        // Create and append the new <pre> and <code> elements
        const newPre = document.createElement('pre');
        const newCode = document.createElement('code');
        newCode.className = 'language-python';
        newCode.textContent = code;
        newPre.appendChild(newCode);
        container.appendChild(newPre);
    };

    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('next-btn').click();
    });

    document.querySelectorAll('#buttons-section button:not(.disabled)').forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('button-click-message').textContent = 
                `Botão "${this.textContent}" foi clicado.`;
        });
    });

    document.querySelectorAll('#links-section a:not(#disabled-link)').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.id !== 'new-tab-link' && this.id !== 'download-link') {
                e.preventDefault();
            }
            if (this.id !== 'download-link') {
                alert(`Link "${this.textContent}" foi clicado.`);
            }
        });
    });

    document.getElementById('test-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        document.getElementById('form-data').textContent = JSON.stringify(data, null, 2);
        document.getElementById('form-result').style.display = 'block';
    });

    document.getElementById('range-input').addEventListener('input', function() {
        document.getElementById('range-value').textContent = this.value;
    });

    const hoverDiv = document.getElementById('hover-div');
    const hoverStatus = document.getElementById('hover-status');
    
    hoverDiv.addEventListener('mouseover', () => {
        hoverStatus.textContent = 'Mouse está sobre o elemento.';
    });
    
    hoverDiv.addEventListener('mouseout', () => {
        hoverStatus.textContent = 'Mouse não está sobre o elemento.';
    });

    // Tabs
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.tab-button, .tab-content').forEach(el => {
                el.classList.remove('active');
            });
            
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Modal
    const modal = document.getElementById('test-modal');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeButtons = document.querySelectorAll('.close, #modal-close-btn');
    
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
    
    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    
    const createAlert = (type, message) => {
        const alertContainer = document.getElementById('alerts-container');
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = message;
        alertContainer.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    };

    const alertButtonConfigs = {
        'success-alert-btn': { type: 'success', message: '<strong>Sucesso!</strong> Operação concluída com sucesso.' },
        'info-alert-btn': { type: 'info', message: '<strong>Informação!</strong> Esta é uma mensagem informativa.' },
        'warning-alert-btn': { type: 'warning', message: '<strong>Aviso!</strong> Esta é uma mensagem de aviso.' },
        'error-alert-btn': { type: 'danger', message: '<strong>Erro!</strong> Ocorreu um erro inesperado.' }
    };

    Object.entries(alertButtonConfigs).forEach(([id, config]) => {
        document.getElementById(id)?.addEventListener('click', () => createAlert(config.type, config.message));
    });

    
    document.getElementById('toast-btn').addEventListener('click', () => {
        const toast = document.getElementById('toast');
        toast.className = 'toast show-toast';
        
        setTimeout(() => {
            toast.className = toast.className.replace('show-toast', '');
        }, 3000);
    });

    
    const dragSource = document.getElementById('drag-source');
    const dropTarget = document.getElementById('drop-target');
    const dragdropStatus = document.getElementById('dragdrop-status');
    
    dragSource.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', 'dragged');
        this.style.opacity = '0.5';
    });

    dragSource.addEventListener('dragend', function(e) {
        this.style.opacity = '1';
    });

    dropTarget.addEventListener('dragover', function(e) {
        e.preventDefault(); 
        this.style.backgroundColor = '#444';
    });

    dropTarget.addEventListener('dragleave', function(e) {
        this.style.backgroundColor = '';
    });
    
    dropTarget.addEventListener('drop', function(e) {
        e.preventDefault();
        if (e.dataTransfer.getData('text/plain') === 'dragged') {
            dragdropStatus.textContent = 'Elemento foi solto na área de drop.';
            this.style.backgroundColor = '';
        }
    });

    
    const sections = document.querySelectorAll('.playground-section');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const infoTitle = document.getElementById('info-title');
    const infoSection = document.querySelector('.info-section');
    const navigationButtons = document.querySelector('.navigation-buttons');
    let currentSectionIndex = 0;

    function showSection(index) {
        // Cleanup previous dynamic descriptions from all sections
        document.querySelectorAll('.section-description-dynamic').forEach(el => el.remove());

        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');

                // Hide or show info section and navigation buttons based on welcome page
                if (section.id === 'welcome-section') {
                    infoSection.style.display = 'none';
                    navigationButtons.style.visibility = 'hidden';
                } else {
                    infoSection.style.display = 'block';
                    navigationButtons.style.visibility = 'visible';
                }

                const info = sectionInfo[section.id];
                if (info) {
                    infoTitle.textContent = `Detalhes da Seção - ${info.title}`;

                    // Add description to the playground section, not the info panel
                    if (section.id !== 'welcome-section' && info.description) {
                        const h2 = section.querySelector('h2');
                        if (h2) {
                            const p = document.createElement('p');
                            p.className = 'section-description-dynamic';
                            p.innerHTML = info.description;
                            h2.insertAdjacentElement('afterend', p);
                        }
                    }
                }

                
                const snippets = codeSnippets[section.id] || { pyautotk: '', selenium: '', playwright: '' };
                const pyautotkCode = (codeHeaders.pyautotk + (snippets.pyautotk || '\n# Exemplo não disponível.')).trim();
                const seleniumCode = (codeHeaders.selenium + (snippets.selenium || '\n# Exemplo não disponível.')).trim();
                const playwrightCode = (codeHeaders.playwright + (snippets.playwright || '\n# Exemplo não disponível.')).trim();
                updateCodeBlock('#pyautotk-code', pyautotkCode);
                updateCodeBlock('#selenium-code', seleniumCode);
                updateCodeBlock('#playwright-code', playwrightCode);

                
                if (window.hljs) {
                    document.querySelectorAll('.code-content pre code').forEach(block => {
                        hljs.highlightElement(block);
                    });
                    
                    hljs.initLineNumbersOnLoad();
                }
            } else {
                section.classList.remove('active');
            }
        });
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === sections.length - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            showSection(currentSectionIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            showSection(currentSectionIndex);
        }
    });

    
    showSection(currentSectionIndex);

    
    document.querySelectorAll('.code-toggle').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const contentId = this.getAttribute('data-target');
            const content = document.getElementById(contentId);
            
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });

    
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const codeContent = this.closest('.code-content');
            const framework = codeContent.id.replace('-code', '');
            const activeSectionId = document.querySelector('.playground-section.active').id;

            const header = codeHeaders[framework] || '';
            const snippet = (codeSnippets[activeSectionId] && codeSnippets[activeSectionId][framework]) 
                            ? codeSnippets[activeSectionId][framework] 
                            : '\n# Exemplo não disponível.';
            const fullCode = (header + snippet).trim();

            navigator.clipboard.writeText(fullCode).then(() => {
                const originalContent = this.innerHTML;
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022z"/>
                    </svg>`;
                this.classList.add('copied');
                
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.classList.remove('copied');
                }, 2000);
            });
        });
    });
});
