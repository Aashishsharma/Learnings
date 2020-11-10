## Index
1. Npm
2. Packages and modules
3. Publishing packages
4. Package.json
5. Package-lock.json

## NPM
It's a way to reuse others code and share your code with the dev community.
Node package manager. Now other packages can also be stored in the registery

1. Need to setup user account
2. Can upgrade to paid account to download private packages

------------------------------------------------------------------------------
## Packages and modules
#### Package
A package is a file or directory that continas package.json  
Packages can be scoped/unscoped

#### 1. Scoped packages
1. Scope is a namespace for related packages.
2. A scope allows you to create a package with the same name as a package created by another user or Org without conflict.
3. Scoped packages are preceded by their scope name. The scope name is everything between the @ and the slash  
e.g. @principal/package-name
4. Unscoped packages are always public.
5. Private packages are always scoped

#### 2. Private packages
This is only visible to you and chosen collaborators.  


A module is any file or directory in the node_modules directory that can be loaded by the Node.js require() function.

Since modules are not required to have a package.json file, not all modules are packages. Only modules that have a package.json file are also packages.

------------------------------------------------------------------------------
## Publishing packages to registry
#### 1. public packages
in cmd type -> npm init  
create a module - add your code  
add readme  
the type -> npm publish 
it will publish to the set registry  
to set the the registry -> npm config set registry https://registry.npmjs.com/ 

#### 2. public scoped packages
same as above  
just publish command would be npm init --scope=@my-org

#### 3. private scoped packages
Before you can publish private user-scoped npm packages, you must sign up for a paid npm user account  
Same as 2.

#### Installing packages specific verions
```javascript
npm install <package>@<version>
npm uninstall <package-name>
```

------------------------------------------------------------------------------
## Package.json (including only few)
1. name
2. version
3. main set the entry point for the application
4. private if set to true prevents the app/package to be accidentally published on npm
5. scripts defines a set of node scripts you can run
6. dependencies sets a list of npm packages installed as dependencies
7. devDependencies They differ from dependencies because they are meant to be installed only on a development machine, not needed to run the code in production. For example testing packages, webpack or Babel.
8. engines sets which versions of Node.js this package/app works on
9. browserslist is used to tell which browsers (and their versions) you want to support

#### Package versions
**Semantic versioning (semver)**  
The Semantic Versioning concept is simple: all versions have 3 digits: x.y.z.  

the first digit is the major version  
the second digit is the minor version  
the third digit is the patch version  
(Major, minor, patch) 1.0.0  

you up the major version when you make incompatible API changes  
you up the minor version when you add functionality in a backward-compatible manner  
you up the patch version when you make backward-compatible bug fixes  

Why is that so important?  
Because npm set some rules we can use in the package.json file to choose which versions it can update our packages to, when we run npm update  
**Rules**  
1. ~: if you write ~0.13.0, you want to only update patch releases: 0.13.1 is ok, but 0.14.0 is not.
2. ^: if you write ^0.13.0, you want to update patch and minor releases: 0.13.1, 0.14.0 and so on.
3. *: if you write *, that means you accept all updates, including major version upgrades.
4. >: you accept any version higher than the one you specify
5. >=: you accept any version equal to or higher than the one you specify
6. <=: you accept any version equal or lower to the one you specify
7. <: you accept any version lower to the one you specify
8. no symbol: you accept only that specific version you specify
9. latest: you want to use the latest version available
10. You can combine most of the above in ranges, like this: 1.0.0 || >=1.1.0 <1.2.0

------------------------------------------------------------------------------
## Package-lock.json
The goal of the file is to keep track of the exact version of every package that is installed so that a product is 100% reproducible in the same way even if packages are updated by their maintainers.  
Auto-generated file in npm  
Consider a scenario - 
1. One developer publishs a app. pkg.json dep. A has version as ~1.1.1
2. Second dev clones the repo and does npm install
3. There is a possibility that second dev might dwnld dep. A of version as 1.1.2 beacuse of ~ in pkg.json
4. This is not ideal as exact code base might not be present on diff. dev's local
5. Although ~ and ^ do not include breaking changes, it is not ideal
6. If you want them to dwnld exact versions, use and commit pkg-lock.json file
7. Next time maintaniers decide to updgrade any dep. the do npm update, and pkg-lock.json file changes automatically and rest devs can clone the code.  

Why is this file so big?  
It contains all the dep. packages version and also thier transitive dependencies

------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
