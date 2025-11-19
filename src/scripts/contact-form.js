import PocketBase from 'pocketbase';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const formMessage = document.getElementById('form-message');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    submitBtn.disabled = true;
    btnText.textContent = 'Envoi en cours...';
    
    const formData = new FormData(form);
    const data = {
      nom: formData.get('nom'),
      prenom: formData.get('prenom'),
      email: formData.get('email'),
      telephone: formData.get('telephone') || '',
      message: formData.get('message'),
    };
    
    try {
      const pb = new PocketBase('https://portfolio.fryg.fr');
      await pb.collection('contact').create(data);
      
      formMessage.textContent = 'Message envoyé avec succès !';
      formMessage.className = 'bg-turquoise/20 text-turquoise rounded-lg p-4 text-center';
      formMessage.classList.remove('hidden');
      
      form.reset();
      
    } catch (error) {
      console.error('Erreur:', error);
      formMessage.textContent = `Erreur : ${error.message || 'Veuillez réessayer'}`;
      formMessage.className = 'bg-red-500/20 text-red-500 rounded-lg p-4 text-center';
      formMessage.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = 'Envoyer';
      
      setTimeout(() => {
        formMessage.classList.add('hidden');
      }, 5000);
    }
  });
}
