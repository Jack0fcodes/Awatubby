(() => {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const button = document.getElementById('login-button');
  const status = document.getElementById('login-status');
  if (!form || !emailInput || !button || !status) return;

  const show = (text, type = '') => {
    status.textContent = text;
    status.className = 'status' + (type ? ' ' + type : '');
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    if (!email) {
      show('Enter your admin email first.', 'error');
      emailInput.focus();
      return;
    }
    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      show('Sign-in could not start. Please refresh and try again.', 'error');
      return;
    }

    button.disabled = true;
    show('Sending secure sign-in link…');
    try {
      const client = window.supabase.createClient(
        'https://ytwskhihsglneebiqnql.supabase.co',
        'sb_publishable_2cFsK5dNf9WNBAuPxWpvfw_UuFRjQj-'
      );
      const { error } = await client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: 'https://jack0fcodes.github.io/Awatubby/admin.html'
        }
      });
      if (error) throw error;
      show('Sign-in link sent. Check your inbox and spam folder.', 'good');
    } catch (error) {
      show(error && error.message ? error.message : 'Could not send sign-in link. Please try again.', 'error');
    } finally {
      button.disabled = false;
    }
  });
})();
