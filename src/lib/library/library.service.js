/**
 * Created by ben on 07/12/15.
 */

angular.module('flowchart')
    .factory('flowLibrary', function() {
        var libraryFunctions = {};

        var loadedLibraries = {};

        var library;
        var graphLibrary;

        libraryFunctions.addLibrary = function(name, lib) {
            if (name in loadedLibraries) {
                console.log('Library load error: there is already a library ' + name + ' loaded.');
                return;
            }
            loadedLibraries[name] = lib;
        };

        /*libraryFunctions.getComponentSchema = function(name) {
            // special treatment for graph component
            if (name === 'core.graph') {
                console.log("ERROR: should not be getting schema for graph");
                return undefined;
            }
            var remainingName = name;
            var currentFolder = library;
            console.log(remainingName);
            while (remainingName.indexOf('.') > -1) {
                var folderName = remainingName.slice(0, remainingName.indexOf('.'));
                console.log(folderName);
                if (folderName in currentFolder.folders) {
                    currentFolder = currentFolder.folders[folderName];
                    console.log(currentFolder);
                    remainingName = remainingName.slice(remainingName.indexOf('.') + 1);
                    console.log(remainingName);
                }
                else {
                    console.log("could not load " + name + " because library " + folderName + " is not installed");
                    return undefined;
                }
            }
            if (remainingName in currentFolder.components) {
                return currentFolder.components[remainingName];
            }
            else {
                console.log("component " + name + " not found");
                return undefined;
            }
        };*/

        libraryFunctions.getComponentSchema = function(name) {
            if (name === 'core.graph') {
                console.log("ERROR");
                return undefined;
            }
            var remainingName = name;
            var currentFolder = library;
            // TODO make this recursive to catch missing components
            var j = 0;
            while (j < 15) {
                var targetName;
                if (remainingName.indexOf('.') < 0) {
                    targetName = remainingName;
                }
                else {
                    targetName = remainingName.slice(0, remainingName.indexOf('.'));
                    remainingName = remainingName.slice(remainingName.indexOf('.') + 1);
                }
                for (var i = 0; i < currentFolder.children.length; ++i) {
                    if (currentFolder.children[i].name === targetName) {
                        if (currentFolder.children[i].children.length === 0) {
                            return currentFolder.children[i].config;
                        }
                        else {
                            currentFolder = currentFolder.children[i];
                            break;
                        }
                    }
                }
                j++;
                //console.log("didn't find the right child");
                //break;
            }
        };

        libraryFunctions.getGraphSchema = function (graphName) {
            for (var i = 0; i < graphLibrary.length; ++i) {
                if (graphLibrary[i].id == graphName) {
                    console.log(graphLibrary[i].config);
                    return graphLibrary[i].config;
                }
            }
            console.log("could not find graph " + graphName);
            return undefined;
        };

        libraryFunctions.getAllLibraries = function () {
            return library;
            //return loadedLibraries;
        };

        libraryFunctions.setComponentLibrary = function (newLibrary) {
            library = newLibrary;
        };

        libraryFunctions.setGraphLibrary = function(newGraphLibrary) {
            graphLibrary = newGraphLibrary;
        };

        libraryFunctions.graphLibrary = function () {
            return graphLibrary;
        };

        return libraryFunctions;
    });