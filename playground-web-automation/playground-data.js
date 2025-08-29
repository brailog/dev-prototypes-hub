const sectionInfo = {
    'welcome-section': {
        title: 'Bem-vindo!',
        description: 'Bem-vindo ao Playground de Automação. Explore as seções para ver desafios de automação web e compare as abordagens de implementação usando PyAutoTk e Selenium.'
    },
    'buttons-section': {
        title: 'Botões',
        description: 'Interaja com vários tipos de botões. O objetivo é clicar em cada botão ativo e verificar a mensagem de feedback. Observe como PyAutoTk e Selenium lidam com a seleção de elementos e a verificação de resultados. O botão desativado deve ser verificado quanto ao seu estado de inatividade.'
    },
    'links-section': {
        title: 'Links',
        description: 'Teste a automação de cliques em diferentes tipos de links. A tarefa inclui seguir um link simples, abrir um link em uma nova aba, acionar um download e confirmar que um link desativado não é clicável. Compare a simplicidade e a robustez de cada framework para essas ações.'
    },
    'forms-section': {
        title: 'Formulários e Inputs',
        description: 'Preencha um formulário complexo com diversos tipos de campos: texto, email, senha, seletores, caixas de seleção e mais. O desafio é inserir dados em todos os campos, enviar o formulário e validar os dados submetidos. Analise a sintaxe e as funções que cada biblioteca oferece para manipulação de formulários.'
    },
    'hover-section': {
        title: 'Efeitos de Hover',
        description: 'Simule o evento de passar o mouse (hover) sobre um elemento para acionar uma mudança de estado. A automação deve mover o cursor sobre a área designada e verificar se o texto de status é atualizado corretamente. Compare como PyAutoTk e Selenium executam ações de mouse.'
    },
    'tabs-section': {
        title: 'Tabs/Navegação',
        description: 'Navegue por um sistema de abas (tabs). O script deve clicar em cada aba e confirmar que o conteúdo correspondente é exibido. Esta seção demonstra como as ferramentas de automação gerenciam a visibilidade e o estado dos elementos da interface.'
    },
    'modal-section': {
        title: 'Modal/Dialog',
        description: 'Abra uma janela modal, interaja com ela e feche-a. O teste deve verificar se o modal se torna visível, se seus elementos internos são acessíveis e se ele pode ser fechado corretamente. Avalie a abordagem de cada biblioteca para lidar com elementos que aparecem dinamicamente.'
    },
    'alerts-section': {
        title: 'Alertas e Notificações',
        description: 'Acione diferentes tipos de alertas e notificações (toasts). A automação precisa clicar nos botões para exibir as mensagens e, em seguida, verificar se os alertas aparecem com o conteúdo e o estilo esperados. Veja como cada framework lida com elementos que aparecem e desaparecem.'
    },
    'dragdrop-section': {
        title: 'Drag and Drop',
        description: 'Execute uma operação de arrastar e soltar (drag and drop). O desafio é mover um elemento de sua posição original para uma área de destino e verificar a mensagem de status que confirma o sucesso da ação. Compare a implementação dessa interação avançada em PyAutoTk e Selenium.'
    },
    'feedback-section': {
        title: 'Feedback e Comparação',
        description: 'Chegamos ao final! Sua participação é fundamental para uma pesquisa científica. Por favor, acesse o link na seção de feedback para compartilhar suas impressões sobre PyAutoTk e Selenium.'
    }
};

// Code Snippets for each section
const codeHeaders = {
    pyautotk: `...`,
    selenium: `...`
};

const codeSnippets = {
    'welcome-section': {
        pyautotk: `# Bem-vindo ao Playground!\n# Navegue pelas seções para ver os exemplos de código relevantes.`,
        selenium: `# Welcome to the Playground!\n# Navigate through the sections to see relevant code examples.`
    },
    'buttons-section': {
        pyautotk: 
        `
@browser_session(MOCKUP_TEST_URL_FILE)
def test_botoes(session):
    Widget(session, id="primary-btn", text="Botão Primário").click()
    mensagem_depois_click = Widget(session, id="button-click-message").properties().get("text")
    assert "Botão Primário" in mensagem_depois_click

    Widget(session, id="secondary-btn", text="Botão Secundário").click()
    mensagem_depois_click = Widget(session, id="button-click-message").properties().get("text")
    assert "Botão Secundário" in mensagem_depois_click

    Widget(session, id="danger-btn", text="Botão Perigo").click()
    mensagem_depois_click = Widget(session, id="button-click-message").properties().get("text")
    assert "Botão Perigo" in mensagem_depois_click

    disabled_btn = Widget(session, id="disabled-btn")
    assert disabled_btn.properties().get("enabled") is False

    Widget(session, text="Próximo").click()
        `,
        selenium: 
        `
def test_botoes(driver):
    xpath_primary = "//*[@id='primary-btn' and contains(text(), 'Botão Primário')]"
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, xpath_primary))).click()
    message_element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "button-click-message")))
    assert "Botão Primário" in message_element.text

    xpath_secondary = "//*[@id='secondary-btn' and contains(text(), 'Botão Secundário')]"
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, xpath_secondary))).click()
    message_element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "button-click-message")))
    assert "Botão Secundário" in message_element.text

    xpath_danger = "//*[@id='danger-btn' and contains(text(), 'Botão Perigo')]"
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, xpath_danger))).click()
    message_element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "button-click-message")))
    assert "Botão Perigo" in message_element.text
    
    disabled_btn = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "disabled-btn")))
    assert not disabled_btn.is_enabled()

    xpath_next = "//*[contains(text(), 'Próximo')]"
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, xpath_next))).click()
    `,
    },
    'links-section': {
        pyautotk: 
        `
@browser_session(MOCKUP_TEST_URL_FILE)
def test_links(session):
    Widget(session, id="simple-link").click()
    session.accept_alert()

    Widget(session, id="new-tab-link", text="Link em Nova Aba").click()
    session.accept_alert()
    session.switch_to_new_tab()
    session.close_current_tab()

    Widget(session, id="download-link", text="Link de Download").click()
    time.sleep(0.5)
    Widget(session, text="Próximo").click()
        `,
        selenium: `
def test_links(driver):
    original_window = driver.current_window_handle
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "simple-link"))).click()
    WebDriverWait(driver, 5).until(EC.alert_is_present()).accept()

    xpath_new_tab = "//*[@id='new-tab-link' and contains(text(), 'Link em Nova Aba')]"
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, xpath_new_tab))).click()
    WebDriverWait(driver, 5).until(EC.alert_is_present()).accept()

    WebDriverWait(driver, 10).until(EC.number_of_windows_to_be(2))
    new_tab_handle = [handle for handle in driver.window_handles if handle != original_window][0]
    driver.switch_to.window(new_tab_handle)

    driver.close()
    driver.switch_to.window(original_window)

    xpath_download = "//*[@id='download-link' and contains(text(), 'Link de Download')]"
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, xpath_download))).click()
    time.sleep(0.5)

    xpath_next = "//*[contains(text(), 'Próximo')]"
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, xpath_next))).click()
`,
    },
    'forms-section': {
        pyautotk: 
        `
@browser_session(MOCKUP_TEST_URL_FILE)
def test_formularios(session):
    dummy_file_path = os.path.abspath(os.path.join(base_dir, "dummy_upload.txt"))
    with open(dummy_file_path, "w") as f:
        f.write("This is a dummy text file to test file upload.")

    try:
        Widget(session, id="text-input").enter_text("Texto de teste")
        Widget(session, id="email-input").enter_text("teste@exemplo.com")
        Widget(session, id="password-input").enter_text("senha123")
        Widget(session, id="number-input").enter_text(str(random.randint(1, 100)))
        Widget(session, id="date-input", name="date-input").enter_text("11121999")

        color_input = Widget(session, id="color-input")
        new_color = "#EEFF00"
        color_input.set_value(new_color)
        retrieved_color = color_input.get_attribute("value")
        assert retrieved_color.lower() == new_color.lower()

        file_input = Widget(session, id="file-input")
        file_input.upload_file(dummy_file_path)

        range_input = Widget(session, id="range-input")
        new_range_value = str(random.randint(1, 100))
        range_input.set_value(new_range_value)
        assert range_input.get_attribute("value") == new_range_value

        Widget(session, id="textarea-input", name="textarea-input").enter_text(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget nisi quam."
            )
        
        Widget(session, type="checkbox", value="opcao2").click()
        Widget(session, type="checkbox", value="opcao1").click()
        Widget(session, type="radio", value="opcao2").click()

        single_dropdown = Widget(session, id="dropdown")
        single_dropdown.scroll_to() 
        single_dropdown.select_by_text("Opção 2")
        assert single_dropdown.get_selected_texts() == ["Opção 2"]

        multi_dropdown = Widget(session, id="multi-dropdown")
        multi_dropdown.select_by_text("Opção 1")
        multi_dropdown.select_by_index(2)
        assert sorted(multi_dropdown.get_selected_texts()) == ["Opção 1", "Opção 3"]
        multi_dropdown.deselect_by_text("Opção 1")
        assert multi_dropdown.get_selected_texts() == ["Opção 3"]

        Widget(session, type="submit", id="submit-btn").click()

        form_data = Widget(session, id="form-data").properties().get("text")
        assert "dummy_upload.txt" in form_data

    finally:
        if os.path.exists(dummy_file_path):
            os.remove(dummy_file_path)
    Widget(session, text="Próximo").click()
        `,
        selenium: 
        `
def test_formularios(driver):
    dummy_file_path = os.path.abspath(os.path.join(base_dir, "dummy_upload.txt"))
    with open(dummy_file_path, "w") as f:
        f.write("This is a dummy text file to test file upload.")

    try:
        WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "text-input"))).send_keys("Texto de teste")
        driver.find_element(By.ID, "email-input").send_keys("teste@exemplo.com")
        driver.find_element(By.ID, "password-input").send_keys("senha123")
        driver.find_element(By.ID, "number-input").send_keys(str(random.randint(1, 100)))
        driver.find_element(By.ID, "date-input").send_keys("11121999")

        color_input = driver.find_element(By.ID, "color-input")
        new_color = "#EEFF00"
        driver.execute_script("arguments[0].value = arguments[1];", color_input, new_color)
        retrieved_color = color_input.get_attribute("value")
        assert retrieved_color.lower() == new_color.lower()
        
        file_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "file-input")))
        file_input.send_keys(dummy_file_path)
        
        range_input = driver.find_element(By.ID, "range-input")
        new_range_value = str(random.randint(1, 100))
        driver.execute_script("arguments[0].value = arguments[1]; arguments[0].dispatchEvent(new Event('change'));", range_input, new_range_value)
        assert range_input.get_attribute("value") == new_range_value

        driver.find_element(By.ID, "textarea-input").send_keys(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget nisi quam."
        )
        driver.find_element(By.XPATH, "//*[@type='checkbox' and @value='opcao2']").click()
        driver.find_element(By.XPATH, "//*[@type='checkbox' and @value='opcao1']").click()
        driver.find_element(By.XPATH, "//*[@type='radio' and @value='opcao2']").click()
        
        single_dropdown_el = driver.find_element(By.ID, "dropdown")
        ActionChains(driver).scroll_to_element(single_dropdown_el).perform()
        single_select = Select(single_dropdown_el)
        single_select.select_by_visible_text("Opção 2")
        assert [opt.text for opt in single_select.all_selected_options] == ["Opção 2"]

        multi_dropdown_el = driver.find_element(By.ID, "multi-dropdown")
        multi_select = Select(multi_dropdown_el)
        multi_select.select_by_visible_text("Opção 1")
        multi_select.select_by_index(2)
        assert sorted([opt.text for opt in multi_select.all_selected_options]) == ["Opção 1", "Opção 3"]
        multi_select.deselect_by_visible_text("Opção 1")
        assert [opt.text for opt in multi_select.all_selected_options] == ["Opção 3"]

        driver.find_element(By.ID, "submit-btn").click()

        form_data = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "form-data"))).text
        assert "dummy_upload.txt" in form_data
    finally:
        if os.path.exists(dummy_file_path):
            os.remove(dummy_file_path)

    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Próximo')]"))).click()    `
    },
    'hover-section': {
        pyautotk: 
        `
@browser_session(MOCKUP_TEST_URL_FILE)
def test_hover(session):
    hover_div = Widget(session, id="hover-div")
    hover_status = Widget(session, id="hover-status")
    assert "não está" in hover_status.properties().get("text")
    for _ in range(3):
        hover_div.hover()
        assert "está sobre" in hover_status.properties().get("text")
        time.sleep(0.5)
        hover_div.unhover()
        assert "não está" in hover_status.properties().get("text")
    
    Widget(session, text="Próximo").click()
    `,
        selenium: 
        `
def test_hover(driver):
    hover_div = driver.find_element(By.ID, "hover-div")
    hover_status = driver.find_element(By.ID, "hover-status")
    body = driver.find_element(By.TAG_NAME, "body")

    assert "não está" in hover_status.text
    for _ in range(3):
        ActionChains(driver).move_to_element(hover_div).perform()
        assert "está sobre" in hover_status.text
        time.sleep(0.5)
        
        ActionChains(driver).move_to_element(body).perform()
        assert "não está" in hover_status.text

    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Próximo')]"))).click()
        `,
    },
    'tabs-section': {
        pyautotk: 
        `
@browser_session(f"file://{MOCKUP_TEST_URL_FILE}")
def test_tabs(session):
    tab1_content = Widget(session, id="tab1")
    assert "primeira" in tab1_content.properties().get("text")

    Widget(session, data_tab="tab2").click()
    tab2_content = Widget(session, id="tab2")
    assert "segunda" in tab2_content.properties().get("text")

    Widget(session, data_tab="tab3").click()
    tab2_content = Widget(session, id="tab3")
    assert "terceira" in tab2_content.properties().get("text")

    Widget(session, text="Próximo").click()
    `,
        selenium: 
        `
def test_tabs(driver):
    tab1_content = driver.find_element(By.ID, "tab1")
    assert "primeira" in tab1_content.text
    
    driver.find_element(By.XPATH, "//*[@data-tab='tab2']").click()
    tab2_content = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "tab2")))
    assert "segunda" in tab2_content.text

    driver.find_element(By.XPATH, "//*[@data-tab='tab3']").click()
    tab3_content = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "tab3")))
    assert "terceira" in tab3_content.text

    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Próximo')]"))).click()
        `
    },
    'modal-section': {
        pyautotk: 
        `
browser_session(MOCKUP_TEST_URL_FILE)
def test_modal(session):
    Widget(session, id="open-modal-btn", text="Abrir Modal").click()
    modal = Widget(session, class_="modal", id="test-modal")

    assert "modal simples que pode ser" in modal.properties().get("text")
    assert modal.properties().get("displayed")
    
    close_btn = Widget(session, class_="close")
    assert close_btn.properties().get("displayed")
    close_btn.click()

    Widget(session, text="Próximo").click()
    `,
        selenium: 
        `
def test_modal(driver):
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "open-modal-btn"))).click()
    
    modal_xpath = "//*[@class='modal' and @id='test-modal']"
    modal = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, modal_xpath)))

    assert "modal simples que pode ser" in modal.text
    assert modal.is_displayed()

    close_btn = driver.find_element(By.CLASS_NAME, "close")
    assert close_btn.is_displayed()
    close_btn.click()

    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Próximo')]"))).click()
    `
    },
    'alerts-section': {
        pyautotk: `
@browser_session(MOCKUP_TEST_URL_FILE)
def test_alertas(session):
    Widget(session, id="success-alert-btn").click()
    alert_success = Widget(session, class_="alert alert-success")
    assert "Sucesso!" in alert_success.properties().get("text")

    Widget(session, id="warning-alert-btn").click()
    alert_warning = Widget(session, class_="alert alert-warning")
    assert "Aviso!" in alert_warning.properties().get("text")

    Widget(session, id="info-alert-btn").click()
    alert_info = Widget(session, class_="alert alert-info")
    assert "Informação!" in alert_info.properties().get("text")

    Widget(session, id="error-alert-btn").click()
    alert_error = Widget(session, class_="alert alert-danger")
    assert "Erro!" in alert_error.properties().get("text")

    Widget(session, id="toast-btn").click()
    alert_warning = Widget(session, id="toast", class_="toast show-toast")
    assert "toast!" in alert_warning.properties().get("text")

    Widget(session, text="Próximo").click()
    `,
        selenium: 
        `
def test_alertas(driver):
    driver.find_element(By.ID, "success-alert-btn").click()
    
    alert_success = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".alert.alert-success")))
    assert "Sucesso!" in alert_success.text

    driver.find_element(By.ID, "warning-alert-btn").click()
    alert_warning = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".alert.alert-warning")))
    assert "Aviso!" in alert_warning.text

    driver.find_element(By.ID, "info-alert-btn").click()
    alert_info = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".alert.alert-info")))
    assert "Informação!" in alert_info.text

    driver.find_element(By.ID, "error-alert-btn").click()
    alert_error = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".alert.alert-danger")))
    assert "Erro!" in alert_error.text

    driver.find_element(By.ID, "toast-btn").click()
    
    toast_xpath = "//*[@id='toast' and @class='toast show-toast']"
    toast = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, toast_xpath)))
    assert "toast!" in toast.text

    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Próximo')]"))).click()
        `,
    },
    'dragdrop-section': {
        pyautotk: 
        `
@browser_session(MOCKUP_TEST_URL_FILE)
def test_drag_and_drop(session):
    source_drag = Widget(session, id="drag-source", draggable="true")
    target_drop = Widget(session, id="drop-target")
    status = Widget(session, id="dragdrop-status")

    assert "Nenhuma" in status.properties().get("text")
    source_drag.drag_to(target_drop)
    assert "solto" in status.properties().get("text")
        `,
        selenium: 
        `
def test_drag_and_drop(driver):
    source_drag = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "drag-source")))
    target_drop = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "drop-target")))
    status = driver.find_element(By.ID, "dragdrop-status")

    assert "Nenhuma" in status.text
    ActionChains(driver).drag_and_drop(source_drag, target_drop).perform()
    assert "solto" in status.text
        `,
    },

};
