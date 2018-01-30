# FortniteStat!

FortniteStat vous permet de récupérer les stats de parties Fortnite mais aussi de comparer les résultats avec ses amis pour savoir qui est le meilleur !


# Avant de commencer

Avant de pouvoir lancer l'application vous devez remplir le fichier configs.json du projet avec les informations de base de donnée que vous souhaitez mais aussi la clé API de Fortnite Tracker ( plus d'information à la section API FORTNITE ).
> **Exemple configs.json:**
>  {
	    "apiKey": "ff3f7f16-c33f-4281-8c39-6f4a0c705ac2",
	    "mysql": {
	      "host": "localhost",
	      "user": "root",
	      "password": "root",
	      "database": "nodejs"
	    }
  }

Vous devez par la suite lancer le script qui vous permettra de stocker les utilisateurs de votre application, le fichier est nommé users.sql.

Lancer pour la première fois un npm install pour que tous les modules s'installent.



#  Les différents modules utilisés

Nous avons utilisés plusieurs modules pour l'application.
Les modules principaux sont Express , Express Session, MySql et config.json.

#  API FortniteTracker

L'api FortniteTracker nous permet de récupérer facilement les informations de chaque joueur de Fortnite sur les différentes plateformes disponibles pour ce jeu.
Pour cela, il faut d'abord s'inscrire au site puis récupérer la clé API. C'est celle-ci que vous rajouterez dans votre **configs.json**.
L'URL du site : https://fortnitetracker.com/site-api

## Fonctionnement général de l'api

Fonctionnement classique de l'api.

```mermaid
sequenceDiagram
FortniteStat ->> API: api.fortnitetracker.com/v1/profile/{platform}/{epic-nickname}
API->>FortniteStat : stats.json

