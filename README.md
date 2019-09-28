# SETUP
1. install xcode
2. install react-native-cli as a global npm package
```npm install react-native-cli```
3. set up config/index.js in node_modules directory with frontend config TODO: move it out of node_modules
4. ```npm i``` (Currently using react-native 0.58.4)

5. Run rn-nodeify hack again:
```./node_modules/.bin/rn-nodeify --hack --install```
6. run ```react-native link```
7. ```npm start -- --reset-cache```

8. on another terminal window run 
```react-native run-ios```


## When having problems with dependencies:
1. Clear Watchman:
```watchman watch-del-all```
2. Delete node-modules and npm install (Use cautiously)
```rm -rf node_modules && npm install```
3. Link dependencies again:
```react-native link```
4. Reset React Native Caches:
```watchman watch-del-all```
```rm -rf $TMPDIR/react-*```
```rm -rf $TMPDIR/metro-*```
```rm -rf $TMPDIR/haste-*```
6. Run rn-nodeify hack again:
```./node_modules/.bin/rn-nodeify --hack --install```
7. Erase hardware and restart emulator


## SETUP 60 for IOS


1. Install CocoaPods globally 
```gem install cocoapods```

2. ```brew install watchman```


3. In project directory run 
```npm install``

4. Run rn-nodeify hack again:
```./node_modules/.bin/rn-nodeify --hack --install```

5. CD into ios directory in project and install pods
```cd ios && pod install```


