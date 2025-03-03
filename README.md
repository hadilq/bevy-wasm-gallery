# Bevy WASM Image Gallery

My weekend project for my daughter!
A simple image gallery built with Bevy that compiles to WebAssembly, allowing it to run in web browsers on both desktop and mobile devices.

## Features

- Displays a 3x3 grid of images
- Click or tap an image to view it in full screen
- Click or tap anywhere to close the full screen view
- Responsive design that works on mobile devices

## Prerequisites

- Rust and Cargo (https://www.rust-lang.org/tools/install)
- wasm-bindgen-cli (`cargo install wasm-bindgen-cli`)

Or if you are a [Nix](https://github.com/NixOS) user, that would be the only dependency of this project.


## Building

Run the build script:

```bash
./build-wasm.sh
```

Or if you are familiar with [Nix](https://github.com/NixOS) you may run:

```bash
nix build .#build-wasm
```

This will:
1. Compile the Rust code to WebAssembly
2. Generate JavaScript bindings
3. Copy the HTML file and assets to the output directory

## Running

1. Start a local web server in the `web` directory:

```bash
nix develop --command simple-http-server -i -p 8080 web
```

2. Open a web browser and navigate to `http://localhost:8080`

## License

This project is open source and available under the Apache-2.0 License.

