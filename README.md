# jazzy-vintage-cube

## Technologies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)

## Local Development

### Setup

```sh
git clone <repo URL>
cd jazzy-vintage-cube
yarn
```

### Data Fetching

Create a `.env` file in the root of the project, and add the following variable, with your own URL:
```
CARD_DATA_JSON_URL="urlToJSONFileHere"
```

The JSON file should be in the following format (also defined in the `RawCard` type):
```json
[
    {
        "name": "A Dream of Spring",
        "mana_cost": "{1}{G}",
        "type": "Snow Instant",
        "image": "urlToImageGoesHere"
    },
    {
        "name": "A New Hand Touches the Beacon",
        "mana_cost": "{U}",
        "type": "Legendary Creature",
        "image": "urlToImageGoesHere"
    },
]
```

### Running

Finally, run the following to get the application running locally:

```sh
yarn dev
```
