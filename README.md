<a href="https://github.com/gbelwariar"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/82b228a3648bf44fc1163ef44c62fcc60081495e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"></a>

# Microbiome Diversity Inspector

Microbiome Diversity Inspector - A tool for visual analysis of microbiome data. This project was done as a part of "Major Project" course in 7th Semester and 8th Semester under [Prof. Malay Bhattacharyya](http://www.iiests.ac.in/index.php/it-malay-bhattacharyya-about). Find more details [here](https://docs.google.com/presentation/d/1319g9zOQpjt3MVGcQxWaKRCSVT_WgVh2ykTLYEK-eUc/edit?usp=sharing).

## How to use/install the tool

The tool can be used as a web application or as well as a standalone desktop application as described below -

### *Using the Web Version*

Download the repository - [Microbiome-Diversity-Inspector](https://github.com/gbelwariar/Microbiome-Diversity-Inspector). Following this, download all the node modules as mentioned [here](https://www.npmjs.com/package/npm-install-all). Bring up the server using the command - `$ node server.js` and then open - `http://localhost:8080/` in a browser.  

### *Using the Desktop/Standalone Version* 

Download the repository - [Microbiome-Diversity-Inspector](https://github.com/gbelwariar/Microbiome-Diversity-Inspector). Following this, download all the node modules as mentioned [here](https://www.npmjs.com/package/npm-install-all). Then, install [Nativefier](https://github.com/jiahaog/nativefier) which is built on the top of [Electron](https://electronjs.org) using the command - `$ npm install nativefier -g` followed by `$ nativefier --name "Microbiome Diversity Inspector" "http://localhost:8080"`. This will install the desktop application inside the directory from where the aforementioned commands where executed. To run the application, bring up the server using the command - `$ node server.js` and then launch the installed desktop application.

#### Notes - 

+ The tool provides various file-processing options like - converting a FASTQ file to a FASTA file and vice versa, analyze entropy of a file containing metagenomic data in real-time. Since such files could be of huge size, thus there is always a possibilty of the server being choked to death. Hence in order to process the files in real-time, the tool requires all such input files to be present in the same directory in which `server.js` is present. Thus, a good rule of thumb is to download the files to be processed in the same directory, therefore eliminating the need to move the downloaded file from one directory to another.

+ Some features of this tool, like- computation of alpha-diversity and downloading the MetaSub data requires an active internet connection for proper functioning.

## Technologies (Languages/Frameworks/Packages) Used - 

+ JavaScript  
+ AngularJS (1.x)
+ Node.js
+ Express
+ [nodemon](https://nodemon.io/) (For development purpose)
+ [Browsersync](https://browsersync.io/) (For development purpose)
+ [ESLint](https://eslint.org/) (For development purpose)
+ [Nativefier](https://github.com/jiahaog/nativefier) (Built on the top of [Electron](https://electronjs.org), used for deployment)
+ [CanvasJS](https://canvasjs.com/)
+ HTML
+ CSS

## External Services Used - 

+ [One Codex RESTful APIs](https://docs.onecodex.com/) - Powers the computation of alpha-diversity.

## Known Issues/Limitations - 

+ The server will not send AJAX requests to One Codex's exposed URL endpoints if there is a proxy connection enabled in the browser. Since the desktop application is an [Electron](https://electronjs.org) wrapper over the web application, hence this limitation also holds for the desktop application as well.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
 [<img src="https://avatars2.githubusercontent.com/u/14831291?s=400&v=4" width="100px;"/><br /><sub>Rachit Belwariar</sub>](https://github.com/gbelwariar) | [<img src="https://avatars0.githubusercontent.com/u/17107752?s=400&v=4" width="100px;"/><br /><sub>Mazhar Imam Khan</sub>](https://github.com/MAZHARMIK)
 --- | ---
<!-- ALL-CONTRIBUTORS-LIST:END -->
