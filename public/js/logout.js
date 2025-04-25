document.getElementById('logout')?.addEventListener('click', async () => {
    const res = await fetch('/api/users/logout', {
      method: 'POST'
    });
  
    if (res.ok) {
      window.location.href = '/login';
    } else {
      alert('Failed to log out');
    }
  });
  