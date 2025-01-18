document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;

    const postData = {
        name: name,
        phone: phone
    };

    fetch('http://localhost:8081/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
  .then(data => {
    if (data.message == "Повідомлення відправлено") {
      customAlert("Ваше повідомлення відправлено! Ми зв'яжемося з вами найближчим часом.", true);
    } else {
      customAlert(data.error, false);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    customAlert('Сталася помилка при відправці.', false);
  });

    document.getElementById('contactForm').reset();
});

function customAlert(message, isSuccess = true) {
    document.getElementById('alert-message').textContent = message;
  
    const modalTitle = document.getElementById('modal-title');
    if (isSuccess) {
      modalTitle.textContent = 'Успішно';
      modalTitle.classList.remove('error-title');
      modalTitle.classList.add('success-title');
    } else {
      modalTitle.textContent = 'Помилка';
      modalTitle.classList.remove('success-title');
      modalTitle.classList.add('error-title');
    }
  
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    modal.classList.add('show'); 
  
    document.getElementById('close').addEventListener('click', function() {
      modal.style.display = 'none';
      modal.classList.remove('show');
    });
  
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
      }
    });
  }