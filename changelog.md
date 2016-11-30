#0.2.22
* Refactor traitement et salaires
* Nettoyage

#0.2.21
* Ajout de la description, la catégorie au RevenuCategoriel

#0.2.20
* Ajout de la répercusion des modification faite dans les revenus catégoriels grâce à un handler
* Ajout du calcul des plus value sur titres

#0.2.19
* Divers améliorations à Fisca.Calculettes.ImpotRevenuCalculette (plafonnement, décote, nbParts, couple...)

#0.2.18
* Ajout des revenus catégoriels pour Fisca.Calculettes.ImpotRevenuCalculette
* Ajout de TraitementsSalaires (Fisca.Calculettes.ImpotRevenuCalculette)
* Ajout de RevenusFonciers (Fisca.Calculettes.ImpotRevenuCalculette)

#0.2.17
* Fix

#0.2.16
* Fix divers bugs

#0.2.15
* Export de la Fisca

#0.2.14
* Ajout de la calculette Fisca.Calculettes.PlusValueImmobiliereCalculette

#0.2.13
* Fix Core.Models.Entreprise.nomComplet pour ne par retourner *null*
* Ajout de Fisca et création de la première calculette : Fisca.Calculettes.ImpotRevenuCalculette

#0.2.12
* Ajout des propriétés ***nomComplet*** et ***nomCompletCapital*** pour l'entreprise

#0.2.11
* Fix divers

#0.2.10
* Ajout de la propriété ***id*** sur la Base.BaseModel qui sert de class de base à tous les ***Models***

#0.2.9
* Fix isPersonneMorale

#0.2.8
* MEP de la prop isPersonneMorale pour Core.Models.Entreprise qui déclanche la modif de personne

#0.2.7
* Ajout du Core.Models.Logo
* Ajout de la propriété logo au Core.Models.Entreprise

#0.2.6
* Ajout de la propriété isPersonneMorale au modele Core.Models.Personne

#0.2.5
* Correction de tout les models du Core
* MEP tests pour Core.Models.Identification
* MEP tests pour Core.Models.Personne

#0.2.4
* Correction de l'instanciation du Core.Models.Entreprise
* Création de Core.Models.IEntreprise : permettant de gérer les paramèters d'instanciation de Core.Models.Entreprise
* MEP des test de Core.Models.Entreprise

#0.1.0
* Initialisation du projet 
* Inclusion des travaux précédents : QreaFacturation et QreaCompta