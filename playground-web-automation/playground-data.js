const sectionInfo = {
    'welcome-section': {
        title: 'Bem-vindo!',
        description: 'Esta é a página inicial do playground. Use os botões de navegação para explorar as diferentes seções de teste. Cada seção foca em um tipo diferente de interação de automação web.'
    },
    'buttons-section': {
        title: 'Botões',
        description: 'Esta seção testa a interação com diferentes tipos de botões: primário, secundário, perigo e desativado. A automação deve ser capaz de clicar nos botões e verificar as mensagens de feedback ou o estado do botão (ativado/desativado).'
    },
    'links-section': {
        title: 'Links',
        description: 'Testa a interação com links. Inclui links simples, links que abrem em nova aba, links de download e links desativados. A automação deve conseguir clicar e verificar o comportamento de cada um.'
    },
    'forms-section': {
        title: 'Formulários e Inputs',
        description: 'Uma seção completa para testar o preenchimento de formulários. Inclui campos de texto, email, senha, número, data, cor, range, arquivo, textarea, checkboxes, radio buttons e dropdowns (select). O teste deve preencher todos os campos e submeter o formulário, verificando os dados enviados.'
    },
    'hover-section': {
        title: 'Efeitos de Hover',
        description: 'Testa a capacidade da automação de simular o evento de passar o mouse sobre um elemento (hover). A automação deve verificar a mudança de estado ou texto que ocorre durante o hover.'
    },
    'tabs-section': {
        title: 'Tabs/Navegação',
        description: 'Testa a navegação por abas. A automação deve clicar em diferentes abas e verificar se o conteúdo correspondente é exibido corretamente.'
    },
    'modal-section': {
        title: 'Modal/Dialog',
        description: 'Testa a interação com janelas modais. A automação deve ser capaz de abrir o modal, interagir com seus elementos e fechá-lo, verificando sua visibilidade.'
    },
    'alerts-section': {
        title: 'Alertas e Notificações',
        description: 'Testa a exibição de alertas e notificações (toasts). A automação deve acionar os alertas e verificar se eles aparecem com o texto e estilo corretos.'
    },
    'dragdrop-section': {
        title: 'Drag and Drop',
        description: 'Testa a funcionalidade de arrastar e soltar. A automação deve simular o arraste de um elemento de origem para uma área de destino e verificar a mensagem de status resultante.'
    }
};

// Code Snippets for each section
const codeHeaders = {
    pyautotk: `from pyautotk.elements.widget import Widget
from pyautotk.elements.helpers.session_helpers import browser_session
import os

base_dir = os.path.dirname(os.path.abspath(__file__))
MOCKUP_TEST_URL_FILE = os.path.join(base_dir, "playground.html")`,
    selenium: `import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.select import Select

# Configuração do path
base_dir = os.path.dirname(os.path.abspath(__file__))
MOCKUP_TEST_URL_FILE = os.path.join(base_dir, "playground.html")

def setup_driver():
    driver = webdriver.Chrome()
    driver.get(f"file://{MOCKUP_TEST_URL_FILE}")
    return driver`,
    playwright: `import os
from playwright.sync_api import sync_playwright

# Configuração do path
base_dir = os.path.dirname(os.path.abspath(__file__))
MOCKUP_TEST_URL_FILE = os.path.join(base_dir, "playground.html")

def setup_page():
    playwright = sync_playwright().start()
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto(f"file://{MOCKUP_TEST_URL_FILE}")
    return playwright, browser, page

def teardown(playwright, browser):
    browser.close()
    playwright.stop()`
};

const codeSnippets = {
    'welcome-section': {
        pyautotk: `# Bem-vindo ao Playground!\n# Navegue pelas seções para ver os exemplos de código relevantes.`,
        selenium: `# Welcome to the Playground!\n# Navigate through the sections to see relevant code examples.`,
        playwright: `# Bem-vindo ao Playground!\n# Navegue pelas seções para ver os exemplos de código relevantes.`
    },
    'buttons-section': {
        pyautotk: `
@browser_session(f"file://{MOCKUP_TEST_URL_FILE}")
def test_botoes(session):
    Widget(session, id="primary-btn", text="Botão Primário").click()
    message = Widget(session, id="button-click-message").properties().get("text")
    assert "Botão Primário" in message

    Widget(session, id="secondary-btn", text="Botão Secundário").click()
    disabled_btn = Widget(session, id="disabled-btn")
    assert disabled_btn.properties().get("enabled") is False`,
        selenium: `
def test_buttons():
    driver = setup_driver()
    
    try:
        primary_btn = driver.find_element(By.ID, "primary-btn")
        primary_btn.click()
        message = driver.find_element(By.ID, "button-click-message").text
        assert "Botão Primário" in message

        disabled_btn = driver.find_element(By.ID, "disabled-btn")
        assert not disabled_btn.is_enabled()
    finally:
        driver.quit()`,
        playwright: `
def test_buttons():
    playwright, browser, page = setup_page()
    
    try:
        page.click("#primary-btn")
        message = page.text_content("#button-click-message")
        assert "Botão Primário" in message
        
        is_disabled = page.is_disabled("#disabled-btn")
        assert is_disabled
    finally:
        teardown(playwright, browser)`
    },
    'links-section': {
        pyautotk: `\n# Exemplo de automação para links ainda não implementado.`,
        selenium: `\n# Exemplo de automação para links ainda não implementado.`,
        playwright: `\n# Exemplo de automação para links ainda não implementado.`
    },
    'forms-section': {
        pyautotk: `
@browser_session(f"file://{MOCKUP_TEST_URL_FILE}")
def test_formularios(session):
    Widget(session, id="text-input").enter_text("Texto de teste")
    Widget(session, id="email-input").enter_text("teste@exemplo.com")
    Widget(session, id="password-input").enter_text("senha123")
    Widget(session, id="radio2").click()
    Widget(session, id="submit-btn").click()
    
    form_data = Widget(session, id="form-data").properties().get("text")
    assert "teste@exemplo.com" in form_data`,
        selenium: `
def test_form():
    driver = setup_driver()
    
    try:
        driver.find_element(By.ID, "text-input").send_keys("Texto de teste")
        driver.find_element(By.ID, "email-input").send_keys("teste@exemplo.com")
        driver.find_element(By.ID, "password-input").send_keys("senha123")
        driver.find_element(By.ID, "radio2").click()
        dropdown = Select(driver.find_element(By.ID, "dropdown"))
        dropdown.select_by_visible_text("Opção 2")
        driver.find_element(By.ID, "submit-btn").click()

        form_data = driver.find_element(By.ID, "form-data").text
        assert "teste@exemplo.com" in form_data
    finally:
        driver.quit()`,
        playwright: `
def test_form():
    playwright, browser, page = setup_page()
    
    try:
        page.fill("#text-input", "Texto de teste")
        page.fill("#email-input", "teste@exemplo.com")
        page.fill("#password-input", "senha123")
        page.click("#radio2")
        page.select_option("#dropdown", label="Opção 2")
        page.click("#submit-btn")
        
        form_data = page.text_content("#form-data")
        assert "teste@exemplo.com" in form_data
    finally:
        teardown(playwright, browser)`
    },
    'hover-section': {
        pyautotk: `
@browser_session(f"file://{MOCKUP_TEST_URL_FILE}")
def test_hover(session):
    hover_div = Widget(session, id="hover-div")
    hover_status = Widget(session, id="hover-status")
    assert "não está" in hover_status.properties().get("text")
    hover_div.hover()
    assert "está sobre" in hover_status.properties().get("text")`,
        selenium: `
def test_hover():
    driver = setup_driver()
    
    try:
        hover_div = driver.find_element(By.ID, "hover-div")
        hover_status = driver.find_element(By.ID, "hover-status")
        assert "não está" in hover_status.text

        actions = ActionChains(driver)
        actions.move_to_element(hover_div).perform()

        assert "está sobre" in hover_status.text
    finally:
        driver.quit()`,
        playwright: `
def test_hover():
    playwright, browser, page = setup_page()
    
    try:
        status = page.text_content("#hover-status")
        assert "não está" in status
        page.hover("#hover-div")
        status = page.text_content("#hover-status")
        assert "está sobre" in status
    finally:
        teardown(playwright, browser)`
    },
    'tabs-section': {
        pyautotk: `
@browser_session(f"file://{MOCKUP_TEST_URL_FILE}")
def test_tabs(session):
    tab2_btn = Widget(session, data_tab="tab2")
    tab2_btn.click()
    tab2_content = Widget(session, id="tab2")
    assert "segunda" in tab2_content.properties().get("text")`,
        selenium: `
def test_tabs():
    driver = setup_driver()
    
    try:
        driver.find_element(By.CSS_SELECTOR, "[data-tab='tab2']").click()
        tab2_content = driver.find_element(By.ID, "tab2")
        assert "segunda" in tab2_content.text
    finally:
        driver.quit()`,
        playwright: `
def test_tabs():
    playwright, browser, page = setup_page()
    
    try:
        page.click("[data-tab='tab2']")
        tab2 = page.locator("#tab2")
        assert "segunda tab" in tab2.text_content()
    finally:
        teardown(playwright, browser)`
    },
    'modal-section': {
        pyautotk: `
@browser_session(f"file://{MOCKUP_TEST_URL_FILE}")
def test_modal(session):
    Widget(session, id="open-modal-btn").click()
    modal = Widget(session, id="test-modal")
    assert modal.properties().get("displayed")
    Widget(session, text="Fechar").click()
    assert not modal.properties().get("displayed")`,
        selenium: `
def test_modal():
    driver = setup_driver()
    
    try:
        driver.find_element(By.ID, "open-modal-btn").click()
        modal = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "test-modal"))
        )
        assert modal.is_displayed()
        driver.find_element(By.CLASS_NAME, "close").click()
        assert not modal.is_displayed()
    finally:
        driver.quit()`,
        playwright: `
def test_modal():
    playwright, browser, page = setup_page()
    
    try:
        page.click("#open-modal-btn")
        modal = page.locator("#test-modal")
        assert modal.is_visible()
        page.click(".close")
        assert modal.is_hidden()
    finally:
        teardown(playwright, browser)`
    },
    'alerts-section': {
        pyautotk: `
@browser_session(f"file://{MOCKUP_TEST_URL_FILE}")
def test_alertas(session):
    Widget(session, id="success-alert-btn").click()
    alert_success = Widget(session, class_="alert alert-success")
    assert "Sucesso!" in alert_success.properties().get("text")`,
        selenium: `
def test_alerts_toasts():
    driver = setup_driver()
    
    try:
        driver.find_element(By.ID, "success-alert-btn").click()
        alert = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".alert-success"))
        )
        assert "Sucesso!" in alert.text
    finally:
        driver.quit()`,
        playwright: `
def test_alerts_toasts():
    playwright, browser, page = setup_page()
    
    try:
        page.click("#success-alert-btn")
        alert = page.locator(".alert-success")
        assert alert.is_visible()
        assert "Sucesso!" in alert.text_content()
    finally:
        teardown(playwright, browser)`
    },
    'dragdrop-section': {
        pyautotk: `\n# A funcionalidade de Drag and Drop ainda não foi implementada no PyAutoTk.`,
        selenium: `
def test_drag_and_drop():
    driver = setup_driver()
    
    try:
        source = driver.find_element(By.ID, "drag-source")
        target = driver.find_element(By.ID, "drop-target")

        actions = ActionChains(driver)
        actions.click_and_hold(source).move_to_element(target).release().perform()

        status = driver.find_element(By.ID, "dragdrop-status")
        assert "solto" in status.text
    finally:
        driver.quit()`,
        playwright: `\n# A automação de Drag and Drop com Playwright requer uma abordagem mais avançada.`
    }
};

