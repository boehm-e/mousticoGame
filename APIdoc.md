# DOCUMENTATION

### __[POST]__
> #### [POST] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/api/v1/login
log in a user, return token to store
+ #### body
>> __email__: string
>> __password__: string

> #### [POST] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/api/v1/register
register user, return user to store
+ #### body
>> __email__: string
>> __password__: string
>> __firstname__: string
>> __lastname__: string

> #### [GET] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/api/v1/users/:id
get user by id, return user, factory
+ #### params
>> __id__: integer


> #### [GET] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/api/v1/users
get users , return users and their factory


> #### [POST] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/api/vi/users/:id/enroleMoustiques
enrole moustiques, store them in your camp (if not created, return error)
+ #### params
>> __id__: integer
+ #### body
>> __number__: integer
>> __level__: integer
>> __validate__: boolean: if (true): buy: send price




<!--

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
-->
