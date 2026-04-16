fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const listEl = document.getElementById('document-list')
    const contentEl = document.getElementById('document-content')

    listEl.innerHTML = data.docs
      .map((doc, i) => `<button class="document-button" data-index="${i}">${doc.title}</button>`)
      .join('')

    const buttons = listEl.querySelectorAll('.document-button')

    function renderDoc(doc) {
      const purposeSection = doc.purpose
        ? `
        <div class="section">
          <h3 class="section-title">Для чего нужен документ</h3>
          <p>${doc.purpose}</p>
        </div>
      `
        : ''

      const stepsHtml = doc.steps
        .map(
          (step, i) => `
        <div class="instruction-step">
          <div class="step-heading"><span class="step-number">${i + 1}</span>${step.title}</div>
          <div class="step-description">${step.text}</div>
        </div>
      `,
        )
        .join('')

      const docsHtml = doc.documents
        .map(
          d => `
        <div class="document-card">
          <strong>${d.name}</strong>
          <p>${d.note}</p>
        </div>
      `,
        )
        .join('')

      const noteHtml = doc.note ? `<div class="note-block"><strong>Примечание</strong><br>${doc.note}</div>` : ''

      contentEl.innerHTML = `
        <div class="document-title">${doc.title}</div>
        ${purposeSection}
        <div class="section">
          <h3 class="section-title">Пошаговая инструкция</h3>
          ${stepsHtml}
        </div>
        <div class="section">
          <h3 class="section-title">Какие документы понадобятся</h3>
          <div class="documents-grid">${docsHtml}</div>
        </div>
        ${noteHtml}
      `
    }

    function setActive(activeBtn) {
      buttons.forEach(btn => btn.classList.remove('active'))
      activeBtn.classList.add('active')
      renderDoc(data.docs[activeBtn.dataset.index])
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => setActive(btn))
    })

    if (buttons.length) setActive(buttons[0])
  })
  .catch(() => {
    document.getElementById('document-content').innerHTML = '<div class="loading">Не удалось загрузить данные</div>'
  })
