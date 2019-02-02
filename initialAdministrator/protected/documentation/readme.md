The roles and groups created by initial administrator are:

- editor + editors: context-sensitive and also created by the context resolver if necessary, rest services are also fitted to ask in the correct context
- manager + managers: not context-sensitive, you are a manager or you are not a manager, it does not depend on the application
- admin + admins: not context-sensitive, can always edit & manage everything

The reason manager & admin are not context sensitive (context == application) is cause:

- you may want to share this cross application, use different realms, tables, affixes etc if you want to differentiate between applications
- the things you manage/administrate are nodes, they are not linked to the application in any way

The editor is an exception cause every rest service to do with page editing has the context of the application.