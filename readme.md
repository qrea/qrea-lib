# QreaLib

Bienvenue sur le projet QreaLib. Développé en Typescript, cette librairie expose des modèles permettant de modéliser une comptabilité FR et un système de facturation FR.  

Ces modèles sont utilisés par le logiciel SAAS **Qrea**, disponible [ici](http://www.qrea.io).

## Pour débuter

### Prérequis

* NodeJS
* Mocha `npm install -g mocha`
* Typescript `npm install -g typescript`
* Grunt `npm install -g grunt`

### Installation

`npm install`

## Tests

Nous avons configurer *mocha* pour qu'il parcourt le dossier `src` à la recherche des fichiers respectant ce format : `*.test.js`.   

Pour exécuter les tests :
`npm test`

## Workflow

Le projet est hébergé sur GITHUB. Travis CI est configuré pour build.

Les commits sont standardisés par la commande `npm run commit`.

## Contributeurs

* **Pierre BOURDU**

## Licence : MIT