# 🚀 Guide de démarrage rapide - PWTools

## ⚡ Démarrage en 3 étapes

### 1. Ouvrir le site localement
```bash
# Ouvrez simplement index.html dans votre navigateur
# OU utilisez un serveur local :
python -m http.server 8000
# Puis ouvrez http://localhost:8000
```

### 2. Tester les outils
- ✅ Générateur de mot de passe : Cliquez sur "Générer" et copiez
- ✅ Testeur de force : Tapez un mot de passe pour voir le feedback
- ✅ Tous les outils fonctionnent immédiatement !

### 3. Déployer en ligne (optionnel)
```bash
# Option 1: Netlify (glisser-déposer)
# Allez sur netlify.com/drop et déposez le dossier

# Option 2: GitHub Pages
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/pwtools.git
git push -u origin main
# Activez GitHub Pages dans Settings
```

---

## 🎨 Personnalisation rapide

### Changer les couleurs
Dans chaque fichier HTML, modifiez la configuration Tailwind :
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5',    // Votre couleur principale
                secondary: '#06B6D4',  // Votre couleur secondaire
            }
        }
    }
}
```

### Modifier le logo
Remplacez `assets/favicon.svg` avec votre propre logo SVG.

---

## 💰 Monétisation (AdSense)

### Étapes simples
1. **Inscription** : [google.com/adsense](https://google.com/adsense)
2. **Ajout du code** : Remplacez les placeholders `[AdSense ...]` dans les HTML
3. **Format recommandé** :
   - Header : 728x90 ou responsive
   - Sidebar : 300x250
   - Inline : responsive

**Emplacements actuels :**
- Header banner (toutes les pages)
- Sidebar (pages outils)
- Inline content (homepage)

---

## 📊 Analytics (Google Analytics)

### Installation en 2 minutes
1. Créez une propriété GA4 sur [analytics.google.com](https://analytics.google.com)
2. Copiez votre ID (format `G-XXXXXXXXXX`)
3. Ajoutez dans le `<head>` de chaque page :

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔍 SEO - Checklist

### Avant de publier :
- [ ] Remplacez `https://pwtools.com` par votre domaine dans :
  - `sitemap.xml`
  - Balises OpenGraph (toutes les pages)
  - `README.md`
- [ ] Vérifiez les balises `<title>` et `<meta description>` 
- [ ] Testez sur mobile (responsive)
- [ ] Vérifiez tous les liens internes
- [ ] Activez HTTPS sur votre hébergement

### Après publication :
- [ ] Soumettez `sitemap.xml` à Google Search Console
- [ ] Vérifiez l'indexation (7-14 jours)
- [ ] Partagez sur réseaux sociaux pour les premiers backlinks

---

## 🛠️ Problèmes courants

### Les outils ne fonctionnent pas
- **Vérifiez** : Les fichiers JS sont-ils dans le dossier `js/` ?
- **Vérifiez** : La console du navigateur (F12) montre des erreurs ?
- **Solution** : Les chemins dans `<script src="js/...">` doivent être corrects

### Le QR Code ne se génère pas
- **Cause** : Bibliothèque QRCode.js non chargée
- **Solution** : Vérifiez la connexion internet (CDN requis)

### Les styles ne s'affichent pas
- **Cause** : TailwindCSS CDN non chargé
- **Solution** : Vérifiez `<script src="https://cdn.tailwindcss.com"></script>`

---

## 📱 Test sur mobile

### Émulation navigateur
1. Ouvrez Chrome DevTools (F12)
2. Cliquez sur l'icône mobile (Ctrl+Shift+M)
3. Testez iPhone, Android, iPad

### Test réel
- Utilisez ngrok ou serveo.net pour un tunnel
- Ou déployez sur Netlify/Vercel et testez l'URL

---

## 🎯 Prochaines étapes

1. **Contenu** : Ajoutez plus d'articles au blog
2. **Outils** : Ajoutez de nouveaux outils (hash generator, color picker...)
3. **Traductions** : Ajoutez d'autres langues (EN, ES, DE)
4. **PWA** : Transformez en Progressive Web App
5. **Dark mode** : Ajoutez un thème sombre

---

## 💡 Ressources utiles

- **TailwindCSS** : [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Font Awesome** : [fontawesome.com/icons](https://fontawesome.com/icons)
- **SEO Guide** : [moz.com/beginners-guide-to-seo](https://moz.com/beginners-guide-to-seo)
- **Web.dev** : [web.dev/measure](https://web.dev/measure) (Performance)

---

**Besoin d'aide ? Consultez le README.md complet ou contactez support@pwtools.com**
