import HandsUpImg from '../assets/projects/hands-up/format-paysage-x2.png';
import MaisonMarieImg from '../assets/projects/maison-marie/format-paysage.png'
import NaturoPattesImg from '../assets/projects/naturopatte/format-paysage-x2.png'
import CongresNimesImg from '../assets/projects/congres-nimes-tourisme/format-paysage-x2.png'
import SATetSPLImg from '../assets/projects/plaquette-sat-et-spl/format-paysage-x2.png'
import SplPlaqueteImg from '../assets/projects/plaquette-spl/format-paysage-x2.png'
import DomaineAigladeImg from '../assets/projects/domaine-de-laiglade/format-paysage-x2.png'
import BleuLibelluleImg from '../assets/projects/bleu-libellule/SCINTILLANTE2@2x.png'
import SeptiemeElementImg from '../assets/projects/7eme-element/format-paysage-x2.png'
import ArtisanFasoImg from '../assets/projects/artisan-du-faso/format-paysage-x2.png'
import MariageImg from '../assets/projects/mariage-mathilde/format-paysage-x2.png'

import HandsUpCarre from '../assets/projects/hands-up/pexels-tiarrasorte-30048200.png';
import MaisonMarieCarre from '../assets/projects/maison-marie/pexels-ekrulila-2237211.png'
import NaturoPatteCarre from '../assets/projects/naturopatte/pexels-chevanon-1108099.png'
import CongresNimesCarre from '../assets/projects/congres-nimes-tourisme/mockup14.png'
import SATetSPLCarre from '../assets/projects/plaquette-sat-et-spl/mockup21.png'
import SplPlaqueteCarre from '../assets/projects/plaquette-spl/Mockup2.png'
import DomaineAigladeCarre from '../assets/projects/domaine-de-laiglade/3bouteilles.png'
import BleuLibelluleCarre from '../assets/projects/bleu-libellule/SCINTILLANTE2.png'
import SeptiemeCarre from '../assets/projects/7eme-element/FLYER 1.png'
import ArtisanFasoCarre from '../assets/projects/artisan-du-faso/131206-2519.png'
import MariageCarre from '../assets/projects/mariage-mathilde/IMG_5978.png'

import HandsUpDescription from '../assets/projects/hands-up/image-description/pexels-jerchung-2792186.png';
import HandsUpCouleurs from '../assets/projects/hands-up/couleurs-identite/Groupe162.png';
import HandsUpLogoLarge from '../assets/projects/hands-up/mockup-logo-large/Groupe161.png';
import HandsUpMenuLarge from '../assets/projects/hands-up/mockup-menu-large/Groupe163.png';
import HandsUpMenuCarre from '../assets/projects/hands-up/mockup-menu/Poster-MockUp-Vert-and-Horiz.png';




const projects = [
    {
        id: 1,
        category: 'Identité Visuelle',
        title: 'Hands Up',
        image: HandsUpImg,
        imageCarre: HandsUpCarre,
        link: '/projects/hands-up',
        imageCouleurs: HandsUpCouleurs,
        imageLogoLarge: HandsUpLogoLarge,
        imageMenuLarge: HandsUpMenuLarge,
        imageDescription: HandsUpDescription,
        imageMenuCarre: HandsUpMenuCarre,
        couleurPrimaire: '#DAD7C4',
        couleurSecondaire: '#1E2B5C',
        description: 'HANDS UP EST UN RESTAURANT ÉPHÉMÈRE CRÉER PAR LES ÉTUDIANTS DE L’INSTITUT PAUL BAUCUSE. L’OBJECTIF EST DE CRÉER UN UNIVERS LÉGER ET ÉLÉGANT METTANT EN AVANT LES CODES DE LA GASTRONOMIE'
    },
    {
        id: 2,
        category: 'Identité Visuelle',
        title: 'Maison Marie',
        image: MaisonMarieImg,
        imageCarre: MaisonMarieCarre,
        link: '/projects/maison-marie',
    },
    {
        id: 3,
        category: 'Identité Visuelle',
        title: 'NATURO’PATTES & SABOTS',
        image: NaturoPattesImg,
        imageCarre: NaturoPatteCarre,
        link: '/projects/naturopatte',
    },
    {
        id: 4,
        category: 'Plaquette Commerciale',
        title: 'Congrès Nîmes Tourisme',
        image: CongresNimesImg,
        imageCarre: CongresNimesCarre,
        link: '/projects/nimes-tourisme',
    },
    {
        id: 5,
        category: 'Plaquette Commerciale',
        title: 'SAT & SPL Agate',
        image: SATetSPLImg,
        imageCarre: SATetSPLCarre,
        link: '/projects/plaquette-sat-spl',
    },
    {
        id: 6,
        category: 'Plaquette Commerciale',
        title: 'SPL Agate',
        image: SplPlaqueteImg,
        imageCarre: SplPlaqueteCarre,
        link: '/projects/plaquette-spl',
    },
    {
        id: 7,
        category: 'Packaging',
        title: 'Domaine de l\'Aiglade',
        image: DomaineAigladeImg,
        imageCarre: DomaineAigladeCarre,
        link: '/projects/domaine-de-laiglade',
    },
    {
        id: 8,
        category: 'Packaging',
        title: 'Bleu Libellule',
        image: BleuLibelluleImg,
        imageCarre: BleuLibelluleCarre,
        link: '/projects/bleu-libellule',
    },
    {
        id: 9,
        category: 'Print & Web',
        title: '7ème Element',
        image: SeptiemeElementImg,
        imageCarre: SeptiemeCarre,
        link: '/projects/7eme-element',
    },
    {
        id: 10,
        category: 'Print',
        title: 'Artisan Du Faso',
        image: ArtisanFasoImg,
        imageCarre: ArtisanFasoCarre,
        link: '/projects/artisan-du-faso',
    },
    {
        id: 11,
        category: 'Print',
        title: 'Mariage',
        image: MariageImg,
        imageCarre: MariageCarre,
        link: '/projects/mariage',
    },
];

export default projects;