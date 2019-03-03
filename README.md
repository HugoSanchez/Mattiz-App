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

4. Reset Metro Bundler Cache:
```
rm -rf tmp/metro-bundler-cache-*
```

5. Remove Haste Cache:
```
rm -rf tmp/haste-map-react-native-packager-*
```

6. Run rn-nodeify hack again:
```
./node_modules/.bin/rn-nodeify --hack --install
```

7. Erase hardware and restart emulator