import type { APIRoute } from 'astro';
import PocketBase from 'pocketbase';

export const POST: APIRoute = async ({ request }) => {
    try {
        // Récupérer les données du formulaire
        const data = await request.json();

        // Se connecter à Pocketbase
        const pb = new PocketBase(
            import.meta.env.PUBLIC_POCKETBASE_URL || 'https://portfolio.fryg.fr'
        );

        // Créer un enregistrement dans la collection "contacts"
        const record = await pb.collection('contacts').create({
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            telephone: data.telephone || '',
            message: data.message,
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Message envoyé avec succès!'
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Erreur lors de l\'envoi du message.'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};
