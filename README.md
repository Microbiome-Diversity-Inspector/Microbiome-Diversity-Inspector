<a href="https://github.com/gbelwariar"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/82b228a3648bf44fc1163ef44c62fcc60081495e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"></a>

# Aim of our project

+ Presently, a lot of massive and groundbreaking initiatives are being undertaken to analyse microbiome data from diverse environments around the world in order to discover interesting secrets present in the world of microbiome. Microbiome Diversity Inspector can be used to highlight about the diversity of microbiome community in various materials found over different regions. The inclusion of other new algorithms in this platform can lead to interesting discoveries which may prove very beneficial to mankind.

# What is Microbiome Diversity Inspector?

Microbiome Diversity Inspector is a one-stop scalable platform for visual analysis of large microbiome data running completely from the comfort of your browser(although a desktop-standalone version is also available!). The server application runs on all major OS like - Windows, macOS and Linux systems and the client runs in every modern browser (Chrome is preferable though).
This project is being done as a part of "Major Project" course in 7th Semester and 8th Semester under [Prof. Malay Bhattacharyya](http://www.iiests.ac.in/index.php/it-malay-bhattacharyya-about).

# Who is this for?

Although tools/servers like [MG-Rast](http://metagenomics.anl.gov/) or [One Codex](https://www.onecodex.com/
) do an extremely impressive job of analyzing the microbiome data, they do not provide some crucial out-of-the-box features like - performing real-time analysis of entropy of huge microbiome data, conversion between various standardised file formats used in metagenomic analysis, e.g.- converting big FASTQ files to their FASTA counterpart and vice versa, computing alpha-diversity of samples. Often, it is seen that these tools become very limited in use by restricting the users to upload up to a certain limit of data only. This platform is for all microbiome-enthusiasts who want the convenience and scalability of the aforementioned services at real-time speed at one place without any such restrictions!

# How to install the platform?

The two-step installation process of the platform is a breeze. Since the server runs on Node.js runtime environment, the first step to be taken in order to install the platform is to download Node.js and npm.

## Step 1: Installing Node.js and npm

### Installation on Windows

Node.js and npm can be installed from a download link. Go to the [Node installation page](https://nodejs.org/en/download/), and download the Node installer and then follow the setup wizard to install Node.js on your computer.

### Installation on macOS or Linux

In order to install everything on a Mac or Linux, we’ll be running commands in Terminal.

We’re going to use [Node Version Manager(nvm)](https://github.com/creationix/nvm) to install Node.js and npm. Type the below command - <br> `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash`

Open the `~/.bash_profile` file, and make sure `source ~/.bashrc` is written in there somewhere. Restart the terminal.
Then install Node.js by typing - `nvm install node` and then run Node by typing - `nvm use node`.

We are now all set to install the actual platform. The platform can be installed and used as a web application as well as a standalone desktop application. The installation process for both of them is almost same but to install the desktop-standalone application, few additional instructions should be followed. 

## Step 2: Common instructions for installing the platform

Download the repository - [Microbiome-Diversity-Inspector](https://github.com/gbelwariar/Microbiome-Diversity-Inspector/archive/master.zip). Unzip and extract the downloaded Zip directory. Using the shell, navigate inside the unzipped directory. 
Then type - `npm install` in the shell which will automatically install all the dependencies of the platform, or otherwise, manually install each and every dependency mentioned in [package.json](https://github.com/gbelwariar/Microbiome-Diversity-Inspector/blob/master/package.json). Bring up the server by typing - `$ node server.js`\* in the shell ([Command Prompt in Windows](https://www.wikihow.com/Open-the-Command-Prompt-in-Windows) and Terminal in [Linux](https://www.wikihow.com/Open-a-Terminal-Window-in-Ubuntu) and [macOS](https://www.wikihow.com/Open-a-Terminal-Window-in-Mac)). 

*\* If you are facing an issue after typing this command, then there is a high chance that there is another process that is using the port :8080. Make sure that no other program is conflicting Node such as IIS, SQL, Skype, Zonealarm, firewall/antivirus, NOD32, Eset, any web related program including Remote Desktop, Teamviewer etc.*

We now lay out instructions separately for installing the web version and the desktop-standalone version below -
 
### *Installing the Web Version*

After following the above instructions, just open - `http://localhost:8080/` in a browser.  

### *Installing the Desktop-Standalone Version* 

Following the aforementioned common instructions, install [Nativefier](https://github.com/jiahaog/nativefier)(essentially a wrapper over [Electron](https://electronjs.org)) by typing - `$ npm install nativefier -g` followed by `$ nativefier --name "Microbiome Diversity Inspector" --icon "favicon.ico" "http://localhost:8080"` in the shell. This will install the desktop application inside the directory from where the aforementioned commands where executed (The name of the directory is generally of the format- `Microbiome Diversity Inspector-XXXXX`, where `XXXXX` is generally the OS configuration details). Then launch the desktop application present inside the installed directory.

*Note- If facing any difficulty in installing the platform, then raise an issue [here](https://github.com/gbelwariar/Microbiome-Diversity-Inspector/issues/new) and we will try to resolve it as soon as possible. You can also directly contact - gbelwariar@gmail.com for assistance.*

### Notes - 

+ The platform provides various file-processing options like - converting a FASTQ file to a FASTA file and vice versa, analyze entropy of a file containing metagenomic data in real-time. Since such files could be of huge size, thus there is always a possibilty of the server being choked to death. Hence in order to process the files in real-time, the platform requires all such input files to be present in the same directory in which `server.js` is present. Thus, a good rule of thumb is to download the files to be processed in the same directory, therefore eliminating the need to move the downloaded file from one directory to another.

+ Some features of this platform, like- computation of alpha-diversity and downloading the MetaSub data requires an active internet connection for proper functioning.

# Technologies (Languages/Frameworks/Packages) Used - 

+ [JavaScript](https://en.wikipedia.org/wiki/JavaScript) - The core programming language used to develop the platform.  
+ [AngularJS (1.x)](https://angularjs.org/) - The framework on which the front-end is built on.
+ [Node.js](https://nodejs.org/en/) - The runtime on which the platform's back-end server runs on.
+ [Express](https://expressjs.com/) - The framework used to develop the back-end.
+ [Mocha](https://mochajs.org/) - The test framework to integration test server-side code.
+ [SuperTest](https://github.com/visionmedia/supertest) - The library used with Mocha to test the back-end server.
+ [nodemon](https://nodemon.io/) - For development purpose, used as an "auto-watch-reload" utility for back-end server.
+ [Browsersync](https://browsersync.io/) - For development purpose, used as an "auto-watch-reload" utility for front-end.
+ [ESLint](https://eslint.org/) - For development purpose, used as a linter to follow best programming practices. 
+ [Nativefier](https://github.com/jiahaog/nativefier) - Built on the top of [Electron](https://electronjs.org), used for deploying the desktop-standalone application.
+ [CanvasJS](https://canvasjs.com/) - The framework that renders the result of the real-time entropy analysis on a dynamic chart.
+ [HTML](https://en.wikipedia.org/wiki/HTML) - The markup language to create the UI of the platform.
+ [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) - The style sheet language to style the UI of the platform.
+ and a bunch of [npm](https://www.npmjs.com/) packages...

# External Services Used - 

+ [One Codex RESTful APIs](https://docs.onecodex.com/) - Powers the computation of alpha-diversity.

# Screenshots Of The Platform - 

1) <ins>Utility for downloading the MetaSUB data</ins> :
![download](https://user-images.githubusercontent.com/17107752/35901707-0422b738-0bfe-11e8-8ba9-58769ad7edca.PNG)  


2) <ins>Showing the real-time entropy analysis</ins> :
![entropy_analysis](https://user-images.githubusercontent.com/17107752/35901947-514fb758-0bff-11e8-99e0-4fbedfc9179c.PNG)  


3) <ins>Conversion of a FASTQ file to FASTA in action</ins> :
![conversion1](https://user-images.githubusercontent.com/17107752/35901986-7f54aa3c-0bff-11e8-9b1b-131e139bb571.PNG)    


4) <ins>Conversion of a FASTA file to FASTQ in action</ins> :
![conversion2](https://user-images.githubusercontent.com/17107752/35902010-9c3579c4-0bff-11e8-8a28-c26baf1a96c6.PNG)  


5) <ins>Computation of alpha-diversity</ins> :
![alpha-diversity](https://user-images.githubusercontent.com/17107752/35902033-b1753a4a-0bff-11e8-9f7e-171f9a048fe5.PNG)  

# Known Issues/Limitations - 

+ The server will not send AJAX requests to One Codex's exposed URL endpoints if there is a proxy connection enabled in the browser. Since the desktop application is an [Electron](https://electronjs.org) wrapper over the web application, hence this limitation also holds for the desktop application as well.

# Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
 [<img src="http://www.iiests.ac.in/images/faculty-and-staff-images/it/it-faculty_malay-bhattacharyya.jpg" width="100px;" height="100px;"/>](http://www.iiests.ac.in/index.php/it-malay-bhattacharyya-about)
 [<img src="https://avatars2.githubusercontent.com/u/14831291?s=400&v=4" width="100px;"/>](https://github.com/gbelwariar)
 [<img src="https://avatars0.githubusercontent.com/u/17107752?s=400&v=4" width="100px;"/>](https://github.com/MAZHARMIK)
<!-- ALL-CONTRIBUTORS-LIST:END -->
