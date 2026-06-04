SITE QUIZ - L'EPICURIEUX - DEVOIR DE HPE

Fichier principal :
- index.html

Nouveautés ajoutées :
1. Mention L'EPICURIEUX en haut de la page.
2. Résultat envoyé automatiquement à l'organisateur via FormSubmit : ebook8585@gmail.com
3. Code d'accès obligatoire : HPE-001 à HPE-019.
4. Caméra et micro avec consentement obligatoire.
5. Détection du bruit par le micro, sans transcription des paroles.
6. Enregistrement local de la caméra au format WEBM si le navigateur le permet.
7. Rapport de surveillance inclus dans le résultat : bruit, changement d'onglet, copier/coller, sortie plein écran.
8. Téléchargement CSV, TXT et vidéo de surveillance.

IMPORTANT SUR L'ENVOI AUTOMATIQUE :
- L'envoi automatique utilise FormSubmit.
- Au premier résultat reçu, FormSubmit peut demander à l'organisateur de confirmer son adresse e-mail.
- Si l'adresse n'est pas confirmée, les résultats automatiques peuvent ne pas arriver.
- Gardez toujours le téléchargement CSV comme solution de secours.

IMPORTANT SUR CAMERA/MICRO :
- La caméra et le micro nécessitent l'autorisation du candidat.
- Cela fonctionne normalement seulement si le site est hébergé en HTTPS.
- En ouverture directe du fichier index.html sur certains navigateurs, la caméra/le micro peuvent être bloqués.
- La vidéo est enregistrée localement sur l'appareil du candidat. Sans serveur sécurisé, elle ne peut pas être envoyée automatiquement à l'organisateur.

LIMITES DE SECURITE :
- Comme cette version est un site statique, les bonnes réponses existent dans le code source.
- Une tentative unique par code est bloquée sur le même navigateur, mais ce n'est pas inviolable.
- Pour un vrai système comme ClassMarker, il faut un serveur, une base de données et une authentification.

Codes d'accès :
HPE-001, HPE-002, HPE-003, HPE-004, HPE-005, HPE-006, HPE-007, HPE-008, HPE-009, HPE-010, HPE-011, HPE-012, HPE-013, HPE-014, HPE-015, HPE-016, HPE-017, HPE-018, HPE-019


MISE A JOUR MODE STRICT
- Adresse de réception des rapports : ebook8585@gmail.com
- Le test tente de forcer le plein écran.
- Si le candidat quitte l'onglet, change de fenêtre, ouvre un autre navigateur ou sort du plein écran, le test est terminé automatiquement.
- Les raccourcis copier/coller, impression, nouvel onglet, nouvelle fenêtre et affichage du code source sont bloqués autant que possible.
- Limite technique : un navigateur web ne peut pas empêcher à 100 % l'ouverture d'un autre onglet ou d'un autre navigateur. Il peut surtout détecter la sortie de la page du test et l'enregistrer dans le rapport.

ATTENTION
- Pour recevoir les rapports automatiquement, il faut confirmer l'adresse e-mail FormSubmit lors du premier essai.
- Le site doit être hébergé en HTTPS pour caméra/micro.


MISE A JOUR ENVOI AUTOMATIQUE
ENVOI AUTOMATIQUE PAR GOOGLE APPS SCRIPT

L'e-mail automatique de l'ancienne version utilisait FormSubmit.
Cette nouvelle version utilise Google Apps Script, plus adapté pour :
- envoyer le rapport à ebook8585@gmail.com
- enregistrer automatiquement les résultats dans un Google Sheet
- éviter de dépendre de la confirmation FormSubmit

ÉTAPES

1. Allez sur https://script.google.com
2. Cliquez sur "Nouveau projet".
3. Supprimez le code existant.
4. Ouvrez le fichier CODE_GOOGLE_APPS_SCRIPT.gs fourni dans ce dossier.
5. Copiez tout son contenu dans Google Apps Script.
6. Cliquez sur Enregistrer.
7. Cliquez sur Déployer > Nouveau déploiement.
8. Dans "Type", choisissez "Application Web".
9. Paramétrez :
   - Exécuter en tant que : Moi
   - Qui a accès : Tout le monde
10. Cliquez sur Déployer.
11. Autorisez les permissions demandées par Google.
12. Copiez l'URL de l'application Web.
13. Ouvrez le fichier config.js.
14. Remplacez :
   COLLEZ_ICI_L_URL_GOOGLE_APPS_SCRIPT
   par l'URL copiée.
15. Mettez le site en ligne en HTTPS, par exemple sur Netlify, Vercel ou GitHub Pages.

TEST

1. Faites un test avec le code HPE-001.
2. Terminez le quiz.
3. Vérifiez votre boîte ebook8585@gmail.com.
4. Vérifiez aussi le Google Sheet créé automatiquement dans votre Google Drive.

IMPORTANT

- Le site doit être en ligne pour un fonctionnement fiable.
- La caméra et le micro exigent généralement un lien HTTPS.
- Le navigateur ne peut pas envoyer automatiquement la vidéo de surveillance sans vrai serveur de stockage.
- Le rapport texte et le tableau des résultats sont envoyés automatiquement.


MISE À JOUR DES CODES
CODES D'ACCÈS DISPONIBLES

Première série :
HPE-001
HPE-002
HPE-003
HPE-004
HPE-005
HPE-006
HPE-007
HPE-008
HPE-009
HPE-010
HPE-011
HPE-012
HPE-013
HPE-014
HPE-015
HPE-016
HPE-017
HPE-018
HPE-019

Nouvelle série ajoutée :
epicurieux001
epicurieux002
epicurieux003
epicurieux004
epicurieux005
epicurieux006
epicurieux007
epicurieux008
epicurieux009
epicurieux010
epicurieux011
epicurieux012
epicurieux013
epicurieux014
epicurieux015
epicurieux016
epicurieux017
epicurieux018
epicurieux019

Remarque : le site accepte les codes même si l'utilisateur les saisit en minuscules ou en majuscules.


MODE ULTRA STRICT - IMPORTANT

Cette version renforce la détection anti-sortie :
- plein écran au lancement ;
- arrêt automatique si la page devient invisible ;
- arrêt automatique si la fenêtre perd le focus ;
- arrêt automatique si le candidat ouvre un autre onglet, un autre navigateur ou une autre application ;
- arrêt automatique en cas de sortie du plein écran ;
- blocage des raccourcis clavier courants ;
- blocage du clic droit, copier/coller/couper ;
- incident ajouté au rapport envoyé par e-mail.

Limite technique :
Un site web ne peut pas contrôler totalement l’appareil du candidat comme une application sécurisée.
Il ne peut pas empêcher physiquement l’ouverture d’un autre navigateur.
Il peut seulement détecter que la page du test a perdu le focus ou n’est plus visible, puis terminer le test.

Pour un blocage plus fort, il faut utiliser un navigateur sécurisé comme Safe Exam Browser ou une application dédiée.


POURCENTAGE DE POTENTIEL DE TRICHERIE

Cette version ajoute dans le rapport :
- Potentiel de tricherie : X %
- Niveau de risque : Faible / Moyen / Élevé / Très élevé
- Motifs du risque : incidents détectés

Barème indicatif utilisé :
- Caméra non autorisée : +20 %
- Micro non autorisé : +15 %
- Enregistrement caméra non démarré : +15 %
- Alerte de bruit : +5 % par alerte, maximum 20 %
- Tentative copier/couper : +5 % par tentative, maximum 15 %
- Tentative coller : +5 % par tentative, maximum 15 %
- Sortie d’onglet/fenêtre : +30 % par sortie, maximum 60 %
- Sortie du plein écran : +35 % par sortie, maximum 50 %
- Violation stricte : au moins 95 %

Important :
Ce pourcentage n’est pas une accusation définitive.
C’est un indicateur automatique pour vous aider à repérer les copies qui méritent vérification.
