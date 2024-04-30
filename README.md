Simple zero-shot vector database RAG pipeline. Code currently uses Gemini but it's been abstracted in order for you to be able to plug in your own code and go.

## Features
- Python API Server for quick vectoring
- Written (mostly) in TypeScript for quick speeds
- Queries qdrant for matching data and concatenates it into the prompt.

## Setup
```shell
npm install

npm run build

npm run prod
```
In an additional terminal window, you will need to start the Python server:
```shell
python3 -m venv venv

# unix
source venv/bin/activate

# windows
venv/scripts/activate

pip3 install -r requirements.txt

npm run pyserver
```

## Contributing

Anyone is welcome to contribute to this as long as it provides something meaningful. Do not PR with syntax fixes or comment grammar fixes unless they are breaking.