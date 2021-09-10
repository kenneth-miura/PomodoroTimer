The Pomodoro Webapp project is a project to build a Pomodoro timer with variable length for breaks & Pomodoro. It will also have a dialogue that opens at end of Pomodoro.   The dialogue lets you name the exercise you did for the last Pomodoro, and rate engagement & flow state, energy level.  It will provide a page for visualizing the data you input from the dialogue.

# Setup
## Installation of Dependencies
Use NPM
## Database
This project uses MySQL.

Create a database for this project by running the following commands in the mysql CLI:
```sql
CREATE DATABASE pomodoro;
```
### Main Table
Run the following command in the database you just created.

```sql
CREATE TABLE IF NOT EXISTS ratings (
	id INT AUTO_INCREMENT PRIMARY KEY,
	engagement FLOAT,
	energy FLOAT,
	in_flow BOOLEAN,
	time_rate TIMESTAMP
	);
```

Make sure to set the time-zone, relative to UTC:
```sql
SET time_zone = '+00:00';
```

### Activities Table

```sql
CREATE TABLE IF NOT EXISTS activities (
	name TEXT
);
```

This database stores all the options for activities to record engagement.


Then, create a copy of the file `api/config.py.examples` called `config.py`, and fill in the constants.

# Running locally
```bash
# start api
yarn start-api
# start frontend
yarn start
```
