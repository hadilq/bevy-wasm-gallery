#!/bin/sh
set -e

echo "Building the WebAssembly package in debug mode..."
cargo build --target wasm32-unknown-unknown

echo "Generating JavaScript bindings with debug info..."
wasm-bindgen --out-dir ./web --target web --debug ./target/wasm32-unknown-unknown/debug/bevy_wasm_gallery.wasm

echo "Copying the HTML file to the output directory..."
cp src/index.html ./web/

echo "Creating assets directory if it doesn't exist..."
mkdir -p ./web/assets
cp assets/*.png ./web/assets/

echo "Checking for sample images..."
if [ ! -f ./web/assets/muffin.png ]; then
    echo "Warning: No sample images found in ./web/assets/"
    echo "You need to add muffin.png, etc. to this directory."
fi

echo "Build complete. Files are in the ./web directory."

