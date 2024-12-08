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
        console.log('Success:', data);
        if (data.message =="Повідомлення відправлено") {
            alert(data.message);
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Сталася помилка при відправці.');
    });

    document.getElementById('contactForm').reset();
});
