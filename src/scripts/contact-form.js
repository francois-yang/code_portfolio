export function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const formMessage = document.getElementById('form-message');

  if (!form) return; // Protection si le formulaire n'existe pas sur la page

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Désactiver le bouton et changer le texte
    submitBtn.disabled = true;
    btnText.textContent = 'Envoi en cours...';
    
    // Récupérer les données du formulaire
    const formData = new FormData(form);
    const data = {
      nom: formData.get('nom'),
      prenom: formData.get('prenom'),
      email: formData.get('email'),
      telephone: formData.get('telephone'),
      message: formData.get('message'),
    };
    
    try {
      // Envoyer au endpoint API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Message de succès
        formMessage.textContent = result.message;
        formMessage.className = 'bg-turquoise/20 text-turquoise rounded-lg p-4 text-center';
        formMessage.classList.remove('hidden');
        
        // Réinitialiser le formulaire
        form.reset();
      } else {
        throw new Error(result.message);
      }
      
    } catch (error) {
      // Message d'erreur
      formMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
      formMessage.className = 'bg-red-500/20 text-red-500 rounded-lg p-4 text-center';
      formMessage.classList.remove('hidden');
    } finally {
      // Réactiver le bouton
      submitBtn.disabled = false;
      btnText.textContent = 'Envoyer';
      
      // Masquer le message après 5 secondes
      setTimeout(() => {
        formMessage.classList.add('hidden');
      }, 5000);
    }
  });
}
