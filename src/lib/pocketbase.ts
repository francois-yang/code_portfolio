// /src/lib/pocketbase.ts
import PocketBase from 'pocketbase';

// Gestion de l'URL selon l'environnement
let PB_URL: string;

if (import.meta.env.MODE === 'development') {
    // En développement : utilise localhost
    PB_URL = import.meta.env.PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';
} else {
    // En production : utilise l'URL du VPS
    PB_URL = 'https://portfolio.fryg.fr:443'; // ← Remplace par ton URL de production
}

// Création du client PocketBase
export const pb = new PocketBase(PB_URL);

// Désactiver l'auto-refresh pour le SSG
pb.autoCancellation(false);

// Interface TypeScript pour la collection projet
export interface Projet {
    id: string;
    nom_projet_hero: string;
    img_hero: string;
    svg_hero?: string[]; // Fichiers SVG décoratifs pour le hero (plusieurs fichiers possibles)
    info1_hero: string;
    info2_hero: string;
    info3_hero: string;
    couleur_hero?: string; // Couleur personnalisée du hero (optionnel)
    description_projet_texte_intro: string;
    mon_role: string;
    logiciels_utilises: string;
    lien_site: string;
    created: string;
}

// Interface TypeScript pour la collection sections_projet
export interface SectionProjet {
    id: string;
    projet_id: string;
    titre_section: string;
    description_section: string;
    img_section: string;
    ordre?: number; // Optionnel car peut ne pas exister encore
    created: string;
}

// Interface TypeScript pour la collection accordeon_description (à supprimer si tu n'utilises plus)
export interface AccordeonDescription {
    id: string;
    description_projet: string;
    titre_section: string;
    description_section: string;
    img_section: string;
    created: string;
    updated: string;
}

// Interface TypeScript pour la collection hero_accueil
export interface HeroAccueil {
    id: string;
    titre: string;
    sous_titre: string;
    prenom: string;
    nom: string;
    couleur_hero?: string; // Couleur du fond (violet, bleu, vert, rose)
    svg_hero?: string[]; // Fichiers SVG décoratifs
    created: string;
}

// Fonction helper pour récupérer l'URL d'une image
export function getImageUrl(record: any, filename: string): string {
    return pb.files.getUrl(record, filename);
}
