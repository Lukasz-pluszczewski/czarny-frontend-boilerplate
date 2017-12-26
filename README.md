# Brainhub boilerplate!

## Get Started
1. **Clone the project**. `git clone ssh://git@git.brainhub.pl:2222/brainhub/frontend-boilerplate.git your-app`.
2. **Change dir** `cd your-app`
3. **Install dependencies**. `npm i`
4. **Run the app**. `npm run dev`

## Make it your own
1. **remove .git** `rm -rf .git`
2. **rename the app** change all 'frontend-boilerplate' to name of your-app and all 'Brainhub' to you (remember about licence file) ;)
3. **push**
```
git init
git commit -m "init"
git remote add origin your-repo-address
git push -u origin master
```

## Initial Machine Setup
1. **Install [Node 8.5.0 or greater](https://nodejs.org)** - [nvm](https://github.com/creationix/nvm) is recommended.
2. **Install [Git](https://git-scm.com/downloads)**.
3. **[Disable safe write in your editor](http://webpack.github.io/docs/webpack-dev-server.html#working-with-editors-ides-supporting-safe-write)** to assure hot reloading works properly.
4. On a Mac? You're all set. If you're on Linux or Windows, complete the steps for your OS below.  

**On Linux:**  

 * Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Original reactSlingshot boilerplate issue page](https://github.com/coryhouse/react-slingshot/issues/6).    
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

**On Windows:**

* **Install [Python 2.7](https://www.python.org/downloads/)**. Some node modules may rely on node-gyp, which requires Python on Windows.
* **Install C++ Compiler**. Browser-sync requires a C++ compiler on Windows. [Visual Studio Express](https://www.visualstudio.com/en-US/products/visual-studio-express-vs) comes bundled with a free C++ compiler. Or, if you already have Visual Studio installed: Open Visual Studio and go to File -> New -> Project -> Visual C++ -> Install Visual C++ Tools for Windows Desktop. The C++ compiler is used to compile browser-sync (and perhaps other Node modules).

Boilerplate based on [React slingshot](https://github.com/coryhouse/react-slingshot)
