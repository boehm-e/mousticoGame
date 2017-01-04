### CONNEXION A LA BDD
```
ssh -L 5432:localhost:5432 azureuser@moustico.cloudapp.net (password: Etna2019)
su - moustico (password: moustico)
psql -d moustico -U moustico
```


### A L'INSCRIPTION
###### a l'inscription : le chef des moustiques a :

>  - lvl 1
>  - une banque de sang
>  - gagne du sang toutes les minutes

>  - __une caserne:__
> > - recruter_moustique (possible que si assez de sang pour les payer, et assez de place dans les camps)
> > - les moustiques ont un %age de chance de mourrir

###### il doit construire:

>  - __un camp:__
> >- need to be build
> >- stock les moustiques
> >- lvl 1

>  - __redbullHouse:__
> >- need to be build
> >- lvl1
> >-5L redbull
> >- achat avec du sang
> >- incremente avec les jours (on s'en sert pour lancer des attaques)

=> le chef des moustiques envoie des moustiques chercher du sang.
=> si au moment du payement les moustiques ne peuvent pas etre payes: ils demissionnent!
