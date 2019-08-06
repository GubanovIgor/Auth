document.addEventListener('click', async (e) => {
  if (e.target.id === 'reg') {
    e.preventDefault();

    const login = document.getElementById('login')
    const password = document.getElementById('password')

    const formData = {
      login: login.value,
      password: password.value,
    }

    const resp = await fetch('/addUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await resp.json();
    if (data) {
      window.location = '/done';
    } else {
      alert('Выберите другое имя');
    }
  }

  if (e.target.id === 'btn-login') {
    e.preventDefault();

    const login = document.getElementById('index-login')
    const password = document.getElementById('index-password')

    const formData = {
      login: login.value,
      password: password.value,
    }

    const resp = await fetch('/match', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await resp.json();
    if (data) {
      window.location = '/done';
    } else{
      alert('Вы ввели неправильный логин или пароль');
    }
  }
})
