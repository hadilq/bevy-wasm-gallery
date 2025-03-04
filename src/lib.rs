mod gallary;
mod log;

use wasm_bindgen::prelude::*;
use crate::gallary::main;

#[wasm_bindgen(start)]
pub fn run() {
    // Set panic hook for better error messages
    console_error_panic_hook::set_once();

    main();
}

