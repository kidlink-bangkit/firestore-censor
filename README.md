# Firestore Censor
This repo contains firestore cloud functions, specifically the censor function that gets triggered everytime new message is being written to firestore. The censor function calls the backend service to get prediction of message class, and writes back the result to firestore.

## Developing
1. change working directory to `functions` folder
2. run `npm install`


## Testing
To test the firebase function locally, follow these steps.
1. Install firebase CLI
```
npm install -g firebase-tools
```
2. Run the emulator suite
```
firebase emulators:start --only functions
```

## Deploying

1. Setup Google Cloud ADC https://cloud.google.com/docs/authentication/provide-credentials-adc?hl=en
2. Install firebase CLI
3. Run in terminal
```
firebase deploy --only functions 
```