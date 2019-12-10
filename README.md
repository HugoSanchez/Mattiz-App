# SETUP
1. install xcode

2. install react-native-cli as a global npm package
```npm install react-native-cli```

3. set up config/index.js in node_modules directory with frontend config TODO: move it out of node_modules

4. ```npm i``` (Currently using react-native 0.60.5)

5. Run rn-nodeify hack:
```./node_modules/.bin/rn-nodeify --hack --install```

5. Install pods:
```cd ios && pod install && cd ..```

6. ```npm start -- --reset-cache```

7. on another terminal window run 
```react-native run-ios```


## When having problems with dependencies:
1. Clear Watchman:
```watchman watch-del-all```

2. Delete node-modules and npm install (Use cautiously)
```rm -rf node_modules && npm install```

3. Reset React Native Caches:
watchman watch-del-all
```rm -rf $TMPDIR/react-*```
```rm -rf $TMPDIR/metro-*```
```rm -rf $TMPDIR/haste-*```

4. Run rn-nodeify hack again:
```./node_modules/.bin/rn-nodeify --hack --install```

5. Erase hardware and restart emulator
