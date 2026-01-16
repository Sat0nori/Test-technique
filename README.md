## Installation

### Prérequis

- [TypeScript] version X.X
- [npm] version 11.6.0

### Commandes

## Installation des dépendances

- npm i

### Exécution

## Exécuter le code refactoré

# Commande pour lancer le code

- npm run refacto

# Commande pour lancer le golden master

- npm run test

#### Choix de Refactoring

Expliquez vos décisions principales :

## Choix de Refactoring

### Problèmes Identifiés dans le Legacy

1. BLOB : une classe ayant trop de responsabilités au sein du logiciel.

   - Impact : difficile à comprendre et à maintenir

2. Duplicated code : plusieurs fois le meme code
   - Impact : redondance, difficile à comprendre et à maintenir

### Solutions Apportées

1. **[Amélioration 1]** : diviser le gros fichier en plusieurs

   - Justification : Pour la conprehension et la maintenance future

2. **[Amélioration 2]** : Pas de changement
   - Justification : l'exercice ne peut pas etre resolu sans ces differentes parties

### Architecture Choisie

[Décrivez brièvement comment vous avez organisé votre code]

- Modules/packages créés
- Rôle de chaque module
- Flux de données

### Exemples Concrets

Exemple 1 : extractCSV

- Problème : [code smell spécifique]
- Solution : Retirer les try catch dans extractCsv car ils ne servent a rien

**Exemple 2 : [Autre refactoring]**

- ...

## Limites et Améliorations Futures

### Ce qui n'a pas été fait (par manque de temps)

- [ ] [Amélioration souhaitée]
- [ ] [Autre amélioration]

### Compromis Assumés

- Bugs intentionnels : Sans ces bugs intentionnels l'exercice ne peut pas etre resolu
- [Compromis 2] : [justification]

### Pistes d'Amélioration Future

- [Idée 1]
- [Idée 2]
