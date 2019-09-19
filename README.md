## When having problems with dependencies:

1. Clear Watchman:
```
watchman watch-del-all
```

2. Delete node-modules and npm install
```
rm -rf node_modules && npm install
```

3. Link dependencies again:
```
react-native link
```

4. Reset React Native Caches:
```
watchman watch-del-all
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*
```

6. Run rn-nodeify hack again:
```
./node_modules/.bin/rn-nodeify --hack --install
```

7. Erase hardware and restart emulator