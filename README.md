# Firestore Censor
This repo contains firestore cloud functions, specifically the censor function that gets triggered everytime new message is being written to firestore. The censor function calls the backend service to get prediction of message class, and writes back the result to firestore.

## Prerequisite
1. Install firebase CLI
```
npm install -g firebase-tools
```


## Developing
1. change working directory to `functions` folder
2. run `npm install`


## Testing
To test the firebase function locally, follow these steps.
1. Initialize emulator
```
firebase init emulators
```

2. Run the emulator suite
```
firebase emulators:start
```

3. Open with web browser the firestore emulator ui url given in terminal

4. Click Start Collection

5. Fill form with these data, then save. This will create a chatroom collection.
    - Collection ID: `chatRooms`
    - Document ID: `chatroom1`

6. Click start collection in `chatroom1` document

7. Fill form with these data (test message safe) then save. This will add a new message to the chatroom.
    - Collection ID: `messages`
    - Document ID: `msg1`
    - Field: `messageText`, Type: `string`, Value: `halo`

8. After few seconds, the cloud function should automatically update the message. Click `msg1` document, and make sure the `censor` field is set to `"SAFE"`.

9. On collection `messages`, click add document.

10. Fill form with these data (test message unsafe) then save.
    - Document Id: `msg2`
    - Field: `messageText`, Type: `string`, Value: `kamu jelek`

11. After few seconds, the cloud function should automatically update the message. Click `msg2` document and make sure the `censor` field is set to `"UNSAFE"`.

## Deploying

1. Setup Google Cloud ADC https://cloud.google.com/docs/authentication/provide-credentials-adc?hl=en
2. Run in terminal
```
firebase deploy --only functions 
```