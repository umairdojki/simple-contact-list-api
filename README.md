# simple-contact-list-api

A simple contact list serverless API, allowing a client to add a contact, delete a contact, and view all their contacts. Each contact has a name and telephone number

GET /contact - Get all contacts

POST /contact - Post a new contact
```
{
    "name": "UmairDojki",
    "telephoneNumber": "79879873434"
}
```

DELETE /contact/{id} - Deletes contact with {id}

## Deployment

```
npm install --production=true

npm run build

npm run package

npm run deploy
```
## Offline Testing

1. Uncomment the following from serverless.yml plugins:

2. Run Serverless Offline debugger in VS
