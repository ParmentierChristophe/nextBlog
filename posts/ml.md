---
title: machine learning
slug: ml
date: July 8, 2020
category: ml
---

# machine learning

## Regression logistique

La régression logistique est une approche statistique qui peut être employée pour évaluer et caractériser les relations entre un resultat de type binaire ( par exemple : Vivant / Mort, Malade / Non malade, succés / échec), et une, ou plusieurs, entrées( inputs, features, parametres, etc...), qui peuvent être de type catégoriel (le sexe par exemple), ou numérique continu (l’âge par exemple). cette approche est largement utilisée en apprentissage automatique (machine learning).

###### exemple :

malade ou non suivant taux de globule blanc et taux de globule rouge

`malade ou non : resultat de type binaire`

`taux de globule blanc et taux de globule rouge : entrées`

## Comment entrainer un modèle de deep learning ?

pour entrainer un modèle de regression logistique nous avons besoin d'une dataset ( base de donnée)

exemple de dataset :

| taux Globule B | Taux Globule R | Malade |
| -------------: | -------------: | -----: |
|             32 |             24 |  false |
|             12 |              9 |   true |
|             26 |             23 |  false |

Nous entrainons notre modele avec une fonction : `y = f(b,r)[1;0]` cette fonction sort une probabilité entre 0 & 1 exemple : `y(32,2) = 0.3` si nous regardons notre dataset nous pouvons voir qu'avec ce taux de GB et GR le patient n'est pas malade il y a donc une erreur de `0.7` || `e=0.7` autre exemple : `y(12,9)= 0.2` ici la probabilité indique que le patient est malade puisque le score est en dessous de 0.5 si nous observons notre dataset cela est exact mais nous avons besoin d'un resultat binaire `1-0` donc ici l'erreur est de `0.2`|| `e=0.2`

Forward : entrainer son modele
Backward : ajustement des parametre pour reduire les erreurs

## Pre-activation et activation

Un neuronne est composé de 2 partie la pre-activation et l'activation

- la pre-activation est une fonction qui prend en parametre les entrées `z = Z(x)`
- l'activation est une fonction qui prend en parametre le retour de la fonction de pre-activation : `a=A(z)`

### fonction de pre-activation

- entrées( inputs/features) = x1, x2
- variables = w1,w2, b (bias)

fonction :
`Z(x1,x2)= w1x1 + w2x2 + b`

$$
 Z(\mathbf{x}) = \sum_{i}^n (w_i x_i) + b
$$

le resultat sera linéaire et sera compris entre -l'infini et + l'infini

### fonction d'activation

fonction :
`y= A(Z)= sigmoid(Z)

### definir l'erreur

$$
 E = \frac12\ (y-t)^2
$$

y = prediction du modele (entre 0 et 1 pour une probabilité)
t = target valeur binaire

### gradient descent
