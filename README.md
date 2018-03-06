tracy
===

A simple and easy to use trainer to generate RASA needed files.

Inspired by [Chatito](https://rodrigopivi.github.io/Chatito/) and [Rasa NLU Trainer](https://rasahq.github.io/rasa-nlu-trainer/).

![Screenshot](docs/intent.png)

## How does that work?

Start a project with an **agent**. Create **skills** with multiple **intents** and affect them to your agent. Use **entities** to ease the training process by multiplying your training data sets. That's not magic, it just use intent slots to check if entity values should be used and generates every possible permutations.

*TODO: more documentation on how it works...*

## Development

Run `npm install` to install packages and `npm start` to start the webpack dev server.