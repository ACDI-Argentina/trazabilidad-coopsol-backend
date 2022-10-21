# trazabilidad-coopsol-backend

## Running the app

```
# install dependencies
npm install

# Set environment variables in .env file, using env_example as guide

NETWORK_URL="https://goerli.infura.io/v3/INFURA_API_KEY"
MNEMONIC="immune pumpkin ..."
BEEKEPERS_REGISTRY_ADDRESS="0xA832694026751eA6e677F516691fd3DF6C524230"
TRACEABILITY_REGISTRY_ADDRESS="0x0ac5D9F21Fb7071325f184B3C48DC9907493a56b"

TRACEABILITY_OWNER="0x041De422e5b2ccad8F520b432985cF8D8Da32C44"

API_CLIENT_USERNAME=
API_CLIENT_PASSWORD=

# run in dev mode on port 3000
npm run dev

# generate production build
npm run build

# run generated content in dist folder on port 3000
npm run start
```

## Testing

```
npm run test
```
