#!/bin/sh
set -e

# Build the WebAssembly package
cargo build --release --target wasm32-unknown-unknown

# Generate JavaScript bindings
wasm-bindgen --out-dir ./web --target web ./target/wasm32-unknown-unknown/release/bevy_wasm_gallery.wasm

# Copy the HTML file to the output directory
cp src/index.html ./web/

# Copy sample images (you'll need to provide these)
mkdir -p ./web/assets
cp assets/*.png ./web/assets/

echo "Build complete. Files are in the ./web directory."

