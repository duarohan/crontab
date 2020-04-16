# crontab

A highly intuitive job scheduler with a CLI, UI, backend and a DB support.

1. Offline Mode

		The commands can be used to create, delete, list the cron existing locally.
		With each create/delete command the data script gets created/deleted from the scripts folder.
		For using the CLI commands, the application needs to be installed gloabally using npm install -g ./
		
			Options:
	  		-h, --help      display help for command
			Commands:
			-c,|c <name>    creates new cron
			-d,|d <name>    deletes existing cron
			-l,|l           list existing cron
			help [command]  display help for command
		
2. Online Mode

		When the system is up all the crons created on the local will get synced to the db and start the crons.
		All CRUD operations can be performed using the api support for the all the operations.
		Get /cron 
		Post /cron
		Put /cron/:id
		Delete /cron/:id

3. UI Mode(Coming Soon)

		A Dashboard with events and their occurences listed from above API.

4. Logging(Coming Soon)

		As a part scheduler, logging is an important par as it helps us debugging
