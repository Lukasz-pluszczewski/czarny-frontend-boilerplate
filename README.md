# Frontend boilerplate
> Boilerplate using webpack, babel, react-router 4, mocha-chai-sinon for tests, and additionally redux-better-promise and redux-breeze 

## Get Started
1. **Clone the project**. `git clone [repo] your-app`.
2. **Change dir** `cd your-app`
3. **Install dependencies**. `npm i`
4. **Run the app**. `npm run dev`

## Make it your own
1. **remove .git** `rm -rf .git`
2. **rename the app** change all 'frontend-boilerplate' to name of your-app and all 'Łukasz Pluszczewski' to you (remember about licence file) ;)
3. **push**
```
git init
git add .
git commit -m "init"
git remote add origin your-repo-address
git push -u origin master
```

## Initial Machine Setup
1. **Install [Node 8.5.0 or greater](https://nodejs.org)** - [nvm](https://github.com/creationix/nvm) is recommended.
2. **Install [Git](https://git-scm.com/downloads)**.
3. **[Disable safe write in your editor](http://webpack.github.io/docs/webpack-dev-server.html#working-with-editors-ides-supporting-safe-write)** to assure hot reloading works properly.

**On Mac:**
* It just works ;)

**On Linux:**  
* Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Original reactSlingshot boilerplate issue page](https://github.com/coryhouse/react-slingshot/issues/6).    
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

**On Windows:**
* Some scripts won't work on Windows. Windows is not recommended (for anything ;) )

Boilerplate based on [React slingshot](https://github.com/coryhouse/react-slingshot) (works on Windows ;) )
