### Clone Repository
```sh
$ cd <directory where you want to store repository>
$ git clone https://github.com/rahuljhs/world_happiness_report
```

### Clone a Branch from Repository
```sh
$ git clone -branch <branch name> https://github.com/rahuljhs/world_happiness_report
```

### Add new changes
Typically your changes are tracked incase you are not adding new file but you will need to use "add" command when you want to add new file or refactor your codebase file structure
```sh
$ git add hello.py #This will add hello.py to repo
```

### Commit new changes
```sh
$ git commit -am "commit message"
```

### List which files are staged, unstaged, and untracked.
```sh
$ git status
```

### Push commit to remote 
```sh
$ git push ( this will generate a command you can copy paste that )
```

### Match the current state of your local repository with remote
If you want to match master ( master = main code base )
```sh
$ git checkout master
```
If you want to match sub branches ( In case this branch does not exists new will be created for you)
```sh
$ git checkout -b <branch name>
```

### Fetch all of the branches from the repository.
```sh
$ git fetch https://github.com/rahuljhs/world_happiness_report
```

### Fetch specific branch from the repository.
```sh
$ git fetch https://github.com/rahuljhs/world_happiness_report <branch name>
```

### List all branches in a repository
```sh
$ git branch -r
```

### Create new branch
```sh
$ git branch <branch name>
```