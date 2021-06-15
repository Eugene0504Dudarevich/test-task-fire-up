## Requirements

For development, you will only need Node.js and a node global package, installed in your environment.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.3.0

    $ npm --version
    7.15.1

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


### MongoDB installation on Ubuntu

    $ sudo apt update
    $ sudo apt install -y mongodb
    $ sudo systemctl status mongodb

### Creation Mongo database and collection for it

    $ mongo
    $ use categoriesDatabase
    $ db.createCollection("categories")


## Install

    $ git clone https://github.com/Eugene0504Dudarevich/test-task-fire-up.git
    $ cd backend
    $ npm install

## Running the project

    $ npm start