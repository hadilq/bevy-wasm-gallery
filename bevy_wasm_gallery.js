const lAudioContext = (typeof AudioContext !== 'undefined' ? AudioContext : (typeof webkitAudioContext !== 'undefined' ? webkitAudioContext : undefined));
let wasm;

function logError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        let error = (function () {
            try {
                return e instanceof Error ? `${e.message}\n\nStack:\n${e.stack}` : e.toString();
            } catch(_) {
                return "<failed to stringify thrown value>";
            }
        }());
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", error);
        throw e;
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_1.set(idx, obj);
    return idx;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function _assertBoolean(n) {
    if (typeof(n) !== 'boolean') {
        throw new Error(`expected a boolean argument, found ${typeof(n)}`);
    }
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (typeof(arg) !== 'string') throw new Error(`expected a string argument, found ${typeof(arg)}`);

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        if (ret.read !== arg.length) throw new Error('failed to pass whole string');
        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function _assertNum(n) {
    if (typeof(n) !== 'number') throw new Error(`expected a number argument, found ${typeof(n)}`);
}

let cachedFloat32ArrayMemory0 = null;

function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedInt32ArrayMemory0 = null;

function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedUint8ClampedArrayMemory0 = null;

function getUint8ClampedArrayMemory0() {
    if (cachedUint8ClampedArrayMemory0 === null || cachedUint8ClampedArrayMemory0.byteLength === 0) {
        cachedUint8ClampedArrayMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachedUint8ClampedArrayMemory0;
}

function getClampedArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ClampedArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_6.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_6.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

export function run() {
    wasm.run();
}

function __wbg_adapter_36(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb05a0fc2cbb0e819(arg0, arg1, isLikeNone(arg2) ? 0 : addToExternrefTable0(arg2));
}

function __wbg_adapter_39(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure2917_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_42(arg0, arg1) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h16466223d71bf00b(arg0, arg1);
}

function __wbg_adapter_45(arg0, arg1, arg2, arg3) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure2922_externref_shim(arg0, arg1, arg2, arg3);
}

function __wbg_adapter_62(arg0, arg1) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hc27140d6d29b2296(arg0, arg1);
}

function __wbg_adapter_65(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure101082_externref_shim(arg0, arg1, arg2);
}

const __wbindgen_enum_GamepadMappingType = ["", "standard"];

const __wbindgen_enum_PremultiplyAlpha = ["none", "premultiply", "default"];

const __wbindgen_enum_ResizeObserverBoxOptions = ["border-box", "content-box", "device-pixel-content-box"];

const __wbindgen_enum_VisibilityState = ["hidden", "visible"];

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_Window_02fa58b243352adf = function() { return logError(function (arg0) {
        const ret = arg0.Window;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_Window_14cc3c5ee5dce589 = function() { return logError(function (arg0) {
        const ret = arg0.Window;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_WorkerGlobalScope_7b9805991ec727df = function() { return logError(function (arg0) {
        const ret = arg0.WorkerGlobalScope;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_abort_8d4ada33948fb9ea = function() { return logError(function (arg0) {
        arg0.abort();
    }, arguments) };
    imports.wbg.__wbg_activeElement_becfda7322e50ce5 = function() { return logError(function (arg0) {
        const ret = arg0.activeElement;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_activeTexture_5aa73095f462bec4 = function() { return logError(function (arg0, arg1) {
        arg0.activeTexture(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_activeTexture_b5a778fe84c7b1b9 = function() { return logError(function (arg0, arg1) {
        arg0.activeTexture(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_addEventListener_ad9617755da8fbe8 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
    }, arguments) };
    imports.wbg.__wbg_addListener_001fcd193cbd1c5b = function() { return handleError(function (arg0, arg1) {
        arg0.addListener(arg1);
    }, arguments) };
    imports.wbg.__wbg_altKey_d2ad93ef54deb903 = function() { return logError(function (arg0) {
        const ret = arg0.altKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_altKey_f67310930ad89813 = function() { return logError(function (arg0) {
        const ret = arg0.altKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_animate_e8655261bbcba4d2 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.animate(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_appendChild_daddabaedb4a1728 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.appendChild(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_arrayBuffer_244b9be4ec34cae8 = function() { return handleError(function (arg0) {
        const ret = arg0.arrayBuffer();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_attachShader_181ea1bf44405a98 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.attachShader(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_attachShader_baf52fda9659f1a5 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.attachShader(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_axes_80e72f9eff9953ab = function() { return logError(function (arg0) {
        const ret = arg0.axes;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_beginQuery_231e25ffaf8fe6d1 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.beginQuery(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_bindAttribLocation_06d73644e579da90 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_bindAttribLocation_3403ed3dd924bdb3 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_bindBufferRange_ef74dd50a5dd0bf9 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.bindBufferRange(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_bindBuffer_6912ac7e00682088 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.bindBuffer(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_bindBuffer_8b96d9574f64c6c2 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.bindBuffer(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_bindFramebuffer_6eeb273edc40e835 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.bindFramebuffer(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_bindFramebuffer_7ceda1018d1afe39 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.bindFramebuffer(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_bindRenderbuffer_2cdf9077ff6d00b7 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.bindRenderbuffer(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_bindRenderbuffer_53cf5cf1652b3c96 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.bindRenderbuffer(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_bindSampler_6d29dc6a793191f8 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.bindSampler(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_bindTexture_9bc4eff1f2399bdd = function() { return logError(function (arg0, arg1, arg2) {
        arg0.bindTexture(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_bindTexture_c468b95701f98c38 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.bindTexture(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_bindVertexArrayOES_e740c9f040ab8630 = function() { return logError(function (arg0, arg1) {
        arg0.bindVertexArrayOES(arg1);
    }, arguments) };
    imports.wbg.__wbg_bindVertexArray_d4891a2b16261245 = function() { return logError(function (arg0, arg1) {
        arg0.bindVertexArray(arg1);
    }, arguments) };
    imports.wbg.__wbg_blendColor_077904b56e13eea7 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.blendColor(arg1, arg2, arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_blendColor_0ea439628e227c60 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.blendColor(arg1, arg2, arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_blendEquationSeparate_a9e2531bc60fd51f = function() { return logError(function (arg0, arg1, arg2) {
        arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_blendEquationSeparate_bc26e2412a579764 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_blendEquation_15e5475d20dd6ae6 = function() { return logError(function (arg0, arg1) {
        arg0.blendEquation(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_blendEquation_4f1760973892b54b = function() { return logError(function (arg0, arg1) {
        arg0.blendEquation(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_blendFuncSeparate_528025e9f31aa073 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_blendFuncSeparate_66c9f437fdca76e0 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_blendFunc_2a173cb371ceefe5 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_blendFunc_be28df4c28d82df5 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_blitFramebuffer_b5f2d72bbabd0a33 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        arg0.blitFramebuffer(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_blockSize_b7d269019589a677 = function() { return logError(function (arg0) {
        const ret = arg0.blockSize;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_body_39801f8e28a17e0d = function() { return logError(function (arg0) {
        const ret = arg0.body;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_brand_ea03eb348cfdee8f = function() { return logError(function (arg0, arg1) {
        const ret = arg1.brand;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_brands_e9fa822fae2acb51 = function() { return logError(function (arg0) {
        const ret = arg0.brands;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_bufferData_2d4184f5911dca6a = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_bufferData_5a3562b28a310859 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_bufferData_71b1b552b57168e8 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_bufferData_afe3510c5bd76329 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_bufferSubData_21b164137b407c59 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
    }, arguments) };
    imports.wbg.__wbg_bufferSubData_ae7bcb1386342db3 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
    }, arguments) };
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_button_e8c44aa42b50bef9 = function() { return logError(function (arg0) {
        const ret = arg0.button;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buttons_ba4b154198a468d9 = function() { return logError(function (arg0) {
        const ret = arg0.buttons;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buttons_fae5ac2abe849a92 = function() { return logError(function (arg0) {
        const ret = arg0.buttons;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_672a4d21634d4a24 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_7cccdd69e0791ae2 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.call(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_cancelAnimationFrame_92a9c4fac2c844b9 = function() { return handleError(function (arg0, arg1) {
        arg0.cancelAnimationFrame(arg1);
    }, arguments) };
    imports.wbg.__wbg_cancelIdleCallback_5337fdeae1123734 = function() { return logError(function (arg0, arg1) {
        arg0.cancelIdleCallback(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_cancel_e144af3144baffb2 = function() { return logError(function (arg0) {
        arg0.cancel();
    }, arguments) };
    imports.wbg.__wbg_catch_a6e601879b2610e9 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.catch(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_clearBufferfv_964242e554ef6b18 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.clearBufferfv(arg1 >>> 0, arg2, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_clearBufferiv_33971fdb95b237a8 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.clearBufferiv(arg1 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_clearBufferuiv_44a03b24d7385381 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.clearBufferuiv(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_clearDepth_20fb5b7fa4fa65a3 = function() { return logError(function (arg0, arg1) {
        arg0.clearDepth(arg1);
    }, arguments) };
    imports.wbg.__wbg_clearDepth_b245300e03254af6 = function() { return logError(function (arg0, arg1) {
        arg0.clearDepth(arg1);
    }, arguments) };
    imports.wbg.__wbg_clearStencil_497912d0ca4bd728 = function() { return logError(function (arg0, arg1) {
        arg0.clearStencil(arg1);
    }, arguments) };
    imports.wbg.__wbg_clearStencil_95b91d4022674197 = function() { return logError(function (arg0, arg1) {
        arg0.clearStencil(arg1);
    }, arguments) };
    imports.wbg.__wbg_clearTimeout_1416cd1dd273f0a3 = function() { return logError(function (arg0, arg1) {
        arg0.clearTimeout(arg1);
    }, arguments) };
    imports.wbg.__wbg_clear_88ca031f4c7e14a4 = function() { return logError(function (arg0, arg1) {
        arg0.clear(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_clear_b1a1e2f0a5642d32 = function() { return logError(function (arg0, arg1) {
        arg0.clear(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_clientWaitSync_bdb87f4dcff8c437 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.clientWaitSync(arg1, arg2 >>> 0, arg3 >>> 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_close_2a46c0eeaf705b24 = function() { return handleError(function (arg0) {
        const ret = arg0.close();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_close_7e2e3fa784b27273 = function() { return logError(function (arg0) {
        arg0.close();
    }, arguments) };
    imports.wbg.__wbg_code_a944eeadf57f0247 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.code;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_colorMask_a8ffe684f989e72b = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
    }, arguments) };
    imports.wbg.__wbg_colorMask_ca265abda7a73817 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
    }, arguments) };
    imports.wbg.__wbg_compileShader_12d8715581b93b10 = function() { return logError(function (arg0, arg1) {
        arg0.compileShader(arg1);
    }, arguments) };
    imports.wbg.__wbg_compileShader_62bc4c13ce17e252 = function() { return logError(function (arg0, arg1) {
        arg0.compileShader(arg1);
    }, arguments) };
    imports.wbg.__wbg_compressedTexSubImage2D_49b79788eb4096ca = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
    }, arguments) };
    imports.wbg.__wbg_compressedTexSubImage2D_539f1c2cd10921b1 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8, arg9);
    }, arguments) };
    imports.wbg.__wbg_compressedTexSubImage2D_5c16a9e773440f2f = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
    }, arguments) };
    imports.wbg.__wbg_compressedTexSubImage3D_bb5d2ca82e1ca9a9 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10, arg11);
    }, arguments) };
    imports.wbg.__wbg_compressedTexSubImage3D_bdd52f6f96743ba2 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10);
    }, arguments) };
    imports.wbg.__wbg_connect_270c7a3d1dbda60e = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.connect(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_connected_bd90674a1adf52d6 = function() { return logError(function (arg0) {
        const ret = arg0.connected;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_contains_22fdbc10524057b2 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.contains(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_contentRect_54bb36d71d23433b = function() { return logError(function (arg0) {
        const ret = arg0.contentRect;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyBufferSubData_014de241942d5955 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.copyBufferSubData(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_copyTexSubImage2D_5684e6b6204ea845 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
    }, arguments) };
    imports.wbg.__wbg_copyTexSubImage2D_f4b78275240f57e4 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
    }, arguments) };
    imports.wbg.__wbg_copyTexSubImage3D_a933623a8694261a = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.copyTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
    }, arguments) };
    imports.wbg.__wbg_copyToChannel_bc42153b17f3eb74 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.copyToChannel(getArrayF32FromWasm0(arg1, arg2), arg3);
    }, arguments) };
    imports.wbg.__wbg_createBufferSource_26276291f6ed3a2f = function() { return handleError(function (arg0) {
        const ret = arg0.createBufferSource();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createBuffer_82ce184f87e04e6d = function() { return logError(function (arg0) {
        const ret = arg0.createBuffer();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createBuffer_a0b9a15b57328706 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.createBuffer(arg1 >>> 0, arg2 >>> 0, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createBuffer_f1d4892ba11ff953 = function() { return logError(function (arg0) {
        const ret = arg0.createBuffer();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createElement_51ffea4765cb1cc5 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createFramebuffer_7b520e3b0982bef5 = function() { return logError(function (arg0) {
        const ret = arg0.createFramebuffer();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createFramebuffer_a06c1d434e8dd65b = function() { return logError(function (arg0) {
        const ret = arg0.createFramebuffer();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createImageBitmap_03ce0f17b2abd107 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.createImageBitmap(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createObjectURL_e7c66c573508d0c2 = function() { return handleError(function (arg0, arg1) {
        const ret = URL.createObjectURL(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_createProgram_3de4a971625b8c80 = function() { return logError(function (arg0) {
        const ret = arg0.createProgram();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createProgram_dbfff5482d357c9f = function() { return logError(function (arg0) {
        const ret = arg0.createProgram();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createQuery_064dd6318758e021 = function() { return logError(function (arg0) {
        const ret = arg0.createQuery();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createRenderbuffer_add28e8618a4e08d = function() { return logError(function (arg0) {
        const ret = arg0.createRenderbuffer();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createRenderbuffer_e9e04845c0be5a99 = function() { return logError(function (arg0) {
        const ret = arg0.createRenderbuffer();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createSampler_a3539f44dc551317 = function() { return logError(function (arg0) {
        const ret = arg0.createSampler();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createShader_0ddd59315e296aca = function() { return logError(function (arg0, arg1) {
        const ret = arg0.createShader(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createShader_4d7ee41ff6054009 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.createShader(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createTexture_5efe57f24849d21c = function() { return logError(function (arg0) {
        const ret = arg0.createTexture();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createTexture_aefc75d3a5c9dae7 = function() { return logError(function (arg0) {
        const ret = arg0.createTexture();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createVertexArrayOES_fcc062d13651dbaa = function() { return logError(function (arg0) {
        const ret = arg0.createVertexArrayOES();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createVertexArray_ed244a71e68ea2fb = function() { return logError(function (arg0) {
        const ret = arg0.createVertexArray();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_crypto_ed58b8e10a292839 = function() { return logError(function (arg0) {
        const ret = arg0.crypto;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_ctrlKey_b18a47cac80f5ed7 = function() { return logError(function (arg0) {
        const ret = arg0.ctrlKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_ctrlKey_c4da49dff331d249 = function() { return logError(function (arg0) {
        const ret = arg0.ctrlKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_cullFace_24fe030b0ea86278 = function() { return logError(function (arg0, arg1) {
        arg0.cullFace(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_cullFace_3b66eaf3e7bf1abd = function() { return logError(function (arg0, arg1) {
        arg0.cullFace(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_currentTime_8e1cd82c8336ade9 = function() { return logError(function (arg0) {
        const ret = arg0.currentTime;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_decode_4ee450fc2bdcbf49 = function() { return logError(function (arg0) {
        const ret = arg0.decode();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_deleteBuffer_24f07b4df816a9e5 = function() { return logError(function (arg0, arg1) {
        arg0.deleteBuffer(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteBuffer_47ca67f56fb633db = function() { return logError(function (arg0, arg1) {
        arg0.deleteBuffer(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteFramebuffer_09543918a4832da5 = function() { return logError(function (arg0, arg1) {
        arg0.deleteFramebuffer(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteFramebuffer_69c8a2eb67e42779 = function() { return logError(function (arg0, arg1) {
        arg0.deleteFramebuffer(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteProgram_9bac693cdf2b4a09 = function() { return logError(function (arg0, arg1) {
        arg0.deleteProgram(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteProgram_a32f66b87c1d3fc3 = function() { return logError(function (arg0, arg1) {
        arg0.deleteProgram(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteQuery_128396bd681ca134 = function() { return logError(function (arg0, arg1) {
        arg0.deleteQuery(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteRenderbuffer_762e9f0185130229 = function() { return logError(function (arg0, arg1) {
        arg0.deleteRenderbuffer(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteRenderbuffer_c84044686177f50d = function() { return logError(function (arg0, arg1) {
        arg0.deleteRenderbuffer(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteSampler_e99808b3ae1a09a3 = function() { return logError(function (arg0, arg1) {
        arg0.deleteSampler(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteShader_aecb3015782be6bf = function() { return logError(function (arg0, arg1) {
        arg0.deleteShader(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteShader_fcd487a13ced9034 = function() { return logError(function (arg0, arg1) {
        arg0.deleteShader(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteSync_7ae8f7846f704f5f = function() { return logError(function (arg0, arg1) {
        arg0.deleteSync(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteTexture_06675b026250ee01 = function() { return logError(function (arg0, arg1) {
        arg0.deleteTexture(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteTexture_c775a3cbc96b6f50 = function() { return logError(function (arg0, arg1) {
        arg0.deleteTexture(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteVertexArrayOES_4c425364e66ff25f = function() { return logError(function (arg0, arg1) {
        arg0.deleteVertexArrayOES(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteVertexArray_65d0ab3d474cbb12 = function() { return logError(function (arg0, arg1) {
        arg0.deleteVertexArray(arg1);
    }, arguments) };
    imports.wbg.__wbg_deltaMode_698d172df6c839e5 = function() { return logError(function (arg0) {
        const ret = arg0.deltaMode;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_deltaX_59d7039450ee61a1 = function() { return logError(function (arg0) {
        const ret = arg0.deltaX;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_deltaY_291c4603ac6dd206 = function() { return logError(function (arg0) {
        const ret = arg0.deltaY;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_depthFunc_c52a4d872d8d38c1 = function() { return logError(function (arg0, arg1) {
        arg0.depthFunc(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_depthFunc_d8dc9911a03e9716 = function() { return logError(function (arg0, arg1) {
        arg0.depthFunc(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_depthMask_68f370c2b567f98b = function() { return logError(function (arg0, arg1) {
        arg0.depthMask(arg1 !== 0);
    }, arguments) };
    imports.wbg.__wbg_depthMask_9ad5d01681e18803 = function() { return logError(function (arg0, arg1) {
        arg0.depthMask(arg1 !== 0);
    }, arguments) };
    imports.wbg.__wbg_depthRange_30f703a1e2c93c8a = function() { return logError(function (arg0, arg1, arg2) {
        arg0.depthRange(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_depthRange_3784425befd07b7f = function() { return logError(function (arg0, arg1, arg2) {
        arg0.depthRange(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_destination_70b3e430ac0b143c = function() { return logError(function (arg0) {
        const ret = arg0.destination;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_devicePixelContentBoxSize_1e5844ec1fb36f10 = function() { return logError(function (arg0) {
        const ret = arg0.devicePixelContentBoxSize;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_devicePixelRatio_5f923c8fc4d19c84 = function() { return logError(function (arg0) {
        const ret = arg0.devicePixelRatio;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_disableVertexAttribArray_98229514ecf341ba = function() { return logError(function (arg0, arg1) {
        arg0.disableVertexAttribArray(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_disableVertexAttribArray_c8acb98d6c4e0f5c = function() { return logError(function (arg0, arg1) {
        arg0.disableVertexAttribArray(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_disable_b1260f96493bc34d = function() { return logError(function (arg0, arg1) {
        arg0.disable(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_disable_cbe78645765a9247 = function() { return logError(function (arg0, arg1) {
        arg0.disable(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_disconnect_0f45836d1393121c = function() { return logError(function (arg0) {
        arg0.disconnect();
    }, arguments) };
    imports.wbg.__wbg_disconnect_2e5b9bf6f22a99f1 = function() { return logError(function (arg0) {
        arg0.disconnect();
    }, arguments) };
    imports.wbg.__wbg_document_7689f46a8f647c96 = function() { return logError(function (arg0) {
        const ret = arg0.document;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_drawArraysInstancedANGLE_1d8c1ab13266b7b4 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.drawArraysInstancedANGLE(arg1 >>> 0, arg2, arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_drawArraysInstanced_d6d94fd2f6eae7e2 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.drawArraysInstanced(arg1 >>> 0, arg2, arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_drawArrays_281edba8ecaa52f9 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.drawArrays(arg1 >>> 0, arg2, arg3);
    }, arguments) };
    imports.wbg.__wbg_drawArrays_cd8277d77fffe8b2 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.drawArrays(arg1 >>> 0, arg2, arg3);
    }, arguments) };
    imports.wbg.__wbg_drawBuffersWEBGL_92efdc722ad0778d = function() { return logError(function (arg0, arg1) {
        arg0.drawBuffersWEBGL(arg1);
    }, arguments) };
    imports.wbg.__wbg_drawBuffers_140619e6806c5886 = function() { return logError(function (arg0, arg1) {
        arg0.drawBuffers(arg1);
    }, arguments) };
    imports.wbg.__wbg_drawElementsInstancedANGLE_398dc3dc8939d5b9 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.drawElementsInstancedANGLE(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_drawElementsInstanced_d38f7e7f264a3bc4 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.drawElementsInstanced(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_enableVertexAttribArray_53dc5bb40ddae735 = function() { return logError(function (arg0, arg1) {
        arg0.enableVertexAttribArray(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_enableVertexAttribArray_e141eaa18ded8ecc = function() { return logError(function (arg0, arg1) {
        arg0.enableVertexAttribArray(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_enable_e32036616112c6e7 = function() { return logError(function (arg0, arg1) {
        arg0.enable(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_enable_fe606ea53da6bc9b = function() { return logError(function (arg0, arg1) {
        arg0.enable(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_endQuery_1cfa50eb258641fe = function() { return logError(function (arg0, arg1) {
        arg0.endQuery(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function() { return logError(function (arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    }, arguments) };
    imports.wbg.__wbg_error_c9d56f7fe24be077 = function() { return logError(function (arg0, arg1) {
        console.error(arg0, arg1);
    }, arguments) };
    imports.wbg.__wbg_eval_e10dc02e9547f640 = function() { return handleError(function (arg0, arg1) {
        const ret = eval(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_exec_3e2d2d0644c927df = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.exec(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_exitFullscreen_6fb4e4e975953b98 = function() { return logError(function (arg0) {
        arg0.exitFullscreen();
    }, arguments) };
    imports.wbg.__wbg_exitPointerLock_38a5d462b01f5f75 = function() { return logError(function (arg0) {
        arg0.exitPointerLock();
    }, arguments) };
    imports.wbg.__wbg_fenceSync_f2c2c828ff0b2c55 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.fenceSync(arg1 >>> 0, arg2 >>> 0);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_fetch_7eed3b2d9daa14ca = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.fetch(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fetch_859e3c783ceecb84 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.fetch(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_focus_212dfd266121c08b = function() { return handleError(function (arg0) {
        arg0.focus();
    }, arguments) };
    imports.wbg.__wbg_framebufferRenderbuffer_4ab802a7e1bae6dc = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
    }, arguments) };
    imports.wbg.__wbg_framebufferRenderbuffer_bb3fc357dca214dc = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
    }, arguments) };
    imports.wbg.__wbg_framebufferTexture2D_4e26ad36fe90a94a = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_framebufferTexture2D_f809cc44f7088f3a = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_framebufferTextureLayer_213b89730a192624 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.framebufferTextureLayer(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_framebufferTextureMultiviewOVR_97e7468a148628f3 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.framebufferTextureMultiviewOVR(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5, arg6);
    }, arguments) };
    imports.wbg.__wbg_frontFace_64a412cfe58720b0 = function() { return logError(function (arg0, arg1) {
        arg0.frontFace(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_frontFace_6b0868c7a7362e57 = function() { return logError(function (arg0, arg1) {
        arg0.frontFace(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_fullscreenElement_72f9c7bbc56823bf = function() { return logError(function (arg0) {
        const ret = arg0.fullscreenElement;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getBoundingClientRect_ae014ea61e3f9c1c = function() { return logError(function (arg0) {
        const ret = arg0.getBoundingClientRect();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getBufferSubData_7009342773b796de = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.getBufferSubData(arg1 >>> 0, arg2, arg3);
    }, arguments) };
    imports.wbg.__wbg_getCoalescedEvents_543f457e8a526a93 = function() { return logError(function (arg0) {
        const ret = arg0.getCoalescedEvents();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getCoalescedEvents_ad74da26d81a76af = function() { return logError(function (arg0) {
        const ret = arg0.getCoalescedEvents;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getComputedStyle_eeea06c7f9efb520 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.getComputedStyle(arg1);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getContext_294a7d64e282e1d2 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getContext_bf3e22b911179c11 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getContext_c5a42aaaf5c0c4e1 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getExtension_60482221d3101292 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getGamepads_8e93f6bf6c28f265 = function() { return handleError(function (arg0) {
        const ret = arg0.getGamepads();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getIndexedParameter_74ec9e3e9dd97fde = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.getIndexedParameter(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getOwnPropertyDescriptor_9dd936a3c0cbd368 = function() { return logError(function (arg0, arg1) {
        const ret = Object.getOwnPropertyDescriptor(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getParameter_58e1653f279d08bc = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.getParameter(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getParameter_89088cdd66ea3410 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.getParameter(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getProgramInfoLog_1b61b06aedbfd60f = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg1.getProgramInfoLog(arg2);
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_getProgramInfoLog_c318792349d10e6b = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg1.getProgramInfoLog(arg2);
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_getProgramParameter_3a31d2c97230156b = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getProgramParameter_cff34d6b5bc329c6 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getPropertyValue_58a0d8083acf6d25 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg1.getPropertyValue(getStringFromWasm0(arg2, arg3));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_getQueryParameter_11c2bdd0d8a21c1d = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getQueryParameter(arg1, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getRandomValues_bcb4912f16000dc4 = function() { return handleError(function (arg0, arg1) {
        arg0.getRandomValues(arg1);
    }, arguments) };
    imports.wbg.__wbg_getShaderInfoLog_879a410806728897 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg1.getShaderInfoLog(arg2);
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_getShaderInfoLog_f5d03335d4dfdcb5 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg1.getShaderInfoLog(arg2);
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_getShaderParameter_a7b34d5ddb7b12e2 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getShaderParameter_d84b0d17b92da111 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getSupportedExtensions_62e62c1b9ca06abd = function() { return logError(function (arg0) {
        const ret = arg0.getSupportedExtensions();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getSupportedProfiles_822ae222926130de = function() { return logError(function (arg0) {
        const ret = arg0.getSupportedProfiles();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getSyncParameter_3d2014fdef479e5d = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getSyncParameter(arg1, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUniformBlockIndex_21363c211638b7b5 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.getUniformBlockIndex(arg1, getStringFromWasm0(arg2, arg3));
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUniformLocation_27fb43894ee395d8 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getUniformLocation_cd0452a6b0a36c45 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_get_b9b93047fe3cf45b = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    }, arguments) };
    imports.wbg.__wbg_height_48788a8e48440edd = function() { return logError(function (arg0) {
        const ret = arg0.height;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_height_78f65bb08ba82673 = function() { return logError(function (arg0) {
        const ret = arg0.height;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_height_984723ef832f73cd = function() { return logError(function (arg0) {
        const ret = arg0.height;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_height_cc619078e10727f7 = function() { return logError(function (arg0) {
        const ret = arg0.height;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_height_e5c9272659763de8 = function() { return logError(function (arg0) {
        const ret = arg0.height;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_height_eec15330891242f8 = function() { return logError(function (arg0) {
        const ret = arg0.height;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_id_f67b95cad11f6005 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.id;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_includes_937486a108ec147b = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.includes(arg1, arg2);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_index_6b8bda0853e4db11 = function() { return logError(function (arg0) {
        const ret = arg0.index;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_inlineSize_6541a4f787fa5f77 = function() { return logError(function (arg0) {
        const ret = arg0.inlineSize;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_DomException_7c3bcc74fd0a8783 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof DOMException;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_HtmlCanvasElement_2a28011dadb2990c = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLCanvasElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Response_d1b3f08d4983dc43 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Response;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_WebGl2RenderingContext_3c5b212f593f345e = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WebGL2RenderingContext;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Window_47f723ed0409d724 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Window;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_invalidateFramebuffer_907e326adfd56387 = function() { return handleError(function (arg0, arg1, arg2) {
        arg0.invalidateFramebuffer(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_isIntersecting_41f2072f4e185729 = function() { return logError(function (arg0) {
        const ret = arg0.isIntersecting;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isSecureContext_ff1d90083791ba64 = function() { return logError(function (arg0) {
        const ret = arg0.isSecureContext;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_is_c7481c65e7e5df9e = function() { return logError(function (arg0, arg1) {
        const ret = Object.is(arg0, arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_key_2b8b9e4072a84c6b = function() { return logError(function (arg0, arg1) {
        const ret = arg1.key;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_length_a446193dc22c12f8 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_e2d2a49132c1b256 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_linkProgram_8ecbe70054dd2a15 = function() { return logError(function (arg0, arg1) {
        arg0.linkProgram(arg1);
    }, arguments) };
    imports.wbg.__wbg_linkProgram_dc7033de8d47f58f = function() { return logError(function (arg0, arg1) {
        arg0.linkProgram(arg1);
    }, arguments) };
    imports.wbg.__wbg_location_0e7480ef0feace25 = function() { return logError(function (arg0) {
        const ret = arg0.location;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_log_0cc1b7768397bcfe = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.log(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    }, arguments) };
    imports.wbg.__wbg_log_cb9e190acc5753fb = function() { return logError(function (arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.log(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    }, arguments) };
    imports.wbg.__wbg_mapping_c2b25d26233f06d4 = function() { return logError(function (arg0) {
        const ret = arg0.mapping;
        return (__wbindgen_enum_GamepadMappingType.indexOf(ret) + 1 || 3) - 1;
    }, arguments) };
    imports.wbg.__wbg_mark_7438147ce31e9d4b = function() { return logError(function (arg0, arg1) {
        performance.mark(getStringFromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_matchMedia_7c5948ee3f15f7b0 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.matchMedia(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_matches_b6366d41e30870bd = function() { return logError(function (arg0) {
        const ret = arg0.matches;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_maxChannelCount_c4dce5b75564aa7b = function() { return logError(function (arg0) {
        const ret = arg0.maxChannelCount;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_measure_fb7825c11612c823 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        let deferred0_0;
        let deferred0_1;
        let deferred1_0;
        let deferred1_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            deferred1_0 = arg2;
            deferred1_1 = arg3;
            performance.measure(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }, arguments) };
    imports.wbg.__wbg_media_ba90891cafc17cd1 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.media;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_message_451b19ba898ebd87 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.message;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_metaKey_139fd4bb4a7f3fdc = function() { return logError(function (arg0) {
        const ret = arg0.metaKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_metaKey_fb1826ad4845fa17 = function() { return logError(function (arg0) {
        const ret = arg0.metaKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_movementX_4970fb2c6e1292f7 = function() { return logError(function (arg0) {
        const ret = arg0.movementX;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_movementY_d4063429f4808c25 = function() { return logError(function (arg0) {
        const ret = arg0.movementY;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_msCrypto_0a36e2ec3a343d26 = function() { return logError(function (arg0) {
        const ret = arg0.msCrypto;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_name_af1aa5f86e5bfff1 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.name;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_navigator_c44d2c517c3dbb22 = function() { return logError(function (arg0) {
        const ret = arg0.navigator;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_03aeda27ca3a0d30 = function() { return handleError(function (arg0) {
        const ret = new ResizeObserver(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_3955c5041f5c225a = function() { return handleError(function () {
        const ret = new AbortController();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_405e22f390576ce2 = function() { return logError(function () {
        const ret = new Object();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_63847613cde5d4bc = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = new RegExp(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_78feb108b6472713 = function() { return logError(function () {
        const ret = new Array();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_7e0a94577e551499 = function() { return handleError(function (arg0, arg1) {
        const ret = new Worker(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_85c15aa1915d0107 = function() { return handleError(function (arg0) {
        const ret = new IntersectionObserver(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() { return logError(function () {
        const ret = new Error();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_a12002a7f91c75be = function() { return logError(function (arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_bcf0200bf062e557 = function() { return handleError(function () {
        const ret = new Image();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_c62260614ab9b2bf = function() { return handleError(function () {
        const ret = new MessageChannel();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function() { return logError(function (arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_840f3c038856d4e9 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Int8Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_999332a180064b59 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Int32Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_d4a86622320ea258 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Uint16Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_f254047f7e80e7ff = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Int16Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithcontextoptions_102fd4dcd24c9904 = function() { return handleError(function (arg0) {
        const ret = new lAudioContext(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_a381634e90c276d4 = function() { return logError(function (arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithstrsequenceandoptions_1bedcbd588e2463b = function() { return handleError(function (arg0, arg1) {
        const ret = new Blob(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithu8clampedarray_98a983e8664758ee = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_node_02999533c4ea02e3 = function() { return logError(function (arg0) {
        const ret = arg0.node;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_now_2c95c9de01293173 = function() { return logError(function (arg0) {
        const ret = arg0.now();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_now_807e54c39636c349 = function() { return logError(function () {
        const ret = Date.now();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_observe_660a6c4955e2cb17 = function() { return logError(function (arg0, arg1) {
        arg0.observe(arg1);
    }, arguments) };
    imports.wbg.__wbg_observe_98c0f530514010a8 = function() { return logError(function (arg0, arg1) {
        arg0.observe(arg1);
    }, arguments) };
    imports.wbg.__wbg_observe_eaae049c28066ef5 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.observe(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_of_2eaf5a02d443ef03 = function() { return logError(function (arg0) {
        const ret = Array.of(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_of_66b3ee656cbd962b = function() { return logError(function (arg0, arg1) {
        const ret = Array.of(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_offsetX_989d29ed9335c7d0 = function() { return logError(function (arg0) {
        const ret = arg0.offsetX;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_offsetY_88f270098a180ce3 = function() { return logError(function (arg0) {
        const ret = arg0.offsetY;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_performance_7a3ffd0b17f663ad = function() { return logError(function (arg0) {
        const ret = arg0.performance;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_persisted_5a2d8364a26e3927 = function() { return logError(function (arg0) {
        const ret = arg0.persisted;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pixelStorei_136cc611cfda1458 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.pixelStorei(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_pixelStorei_eb8e27478b40e6dc = function() { return logError(function (arg0, arg1, arg2) {
        arg0.pixelStorei(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_play_d475dddcc8433e39 = function() { return logError(function (arg0) {
        arg0.play();
    }, arguments) };
    imports.wbg.__wbg_pointerId_f534d1692f4da9a4 = function() { return logError(function (arg0) {
        const ret = arg0.pointerId;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pointerType_7c590786b1fb1279 = function() { return logError(function (arg0, arg1) {
        const ret = arg1.pointerType;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_polygonOffset_86274a5801b73e08 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.polygonOffset(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_polygonOffset_be6fd482f971d8cb = function() { return logError(function (arg0, arg1, arg2) {
        arg0.polygonOffset(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_port1_0d88b67321c61caf = function() { return logError(function (arg0) {
        const ret = arg0.port1;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_port2_acd7a421ed5b91aa = function() { return logError(function (arg0) {
        const ret = arg0.port2;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_postMessage_4e25268f26c1eb76 = function() { return handleError(function (arg0, arg1, arg2) {
        arg0.postMessage(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_postMessage_c8bbfd62dc1987b2 = function() { return handleError(function (arg0, arg1) {
        arg0.postMessage(arg1);
    }, arguments) };
    imports.wbg.__wbg_postTask_d51b4581f8f06154 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.postTask(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pressed_e4f58198e1f14a97 = function() { return logError(function (arg0) {
        const ret = arg0.pressed;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pressure_76e94c30701a0050 = function() { return logError(function (arg0) {
        const ret = arg0.pressure;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_preventDefault_7cd87fa71683fc8f = function() { return logError(function (arg0) {
        arg0.preventDefault();
    }, arguments) };
    imports.wbg.__wbg_process_5c1d670bc53614b8 = function() { return logError(function (arg0) {
        const ret = arg0.process;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_prototype_52a6e43569c41398 = function() { return logError(function () {
        const ret = ResizeObserverEntry.prototype;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_push_737cfc8c1432c2c6 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.push(arg1);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_queryCounterEXT_9505c72de9068454 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.queryCounterEXT(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_querySelector_ab5b6a4f61d535d5 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_queueMicrotask_59e43cd0e99b8ca9 = function() { return logError(function (arg0, arg1) {
        arg0.queueMicrotask(arg1);
    }, arguments) };
    imports.wbg.__wbg_queueMicrotask_5a8a9131f3f0b37b = function() { return logError(function (arg0) {
        const ret = arg0.queueMicrotask;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_queueMicrotask_6d79674585219521 = function() { return logError(function (arg0) {
        queueMicrotask(arg0);
    }, arguments) };
    imports.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740 = function() { return handleError(function (arg0, arg1) {
        arg0.randomFillSync(arg1);
    }, arguments) };
    imports.wbg.__wbg_readBuffer_2ea579be4a23dcf6 = function() { return logError(function (arg0, arg1) {
        arg0.readBuffer(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_readPixels_a35883e1cdff6e3d = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
        arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
    }, arguments) };
    imports.wbg.__wbg_readPixels_a672c9a063f8e2a9 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
        arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
    }, arguments) };
    imports.wbg.__wbg_readPixels_a8827948de5467c3 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
        arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
    }, arguments) };
    imports.wbg.__wbg_removeEventListener_f420b4f37f515116 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
    }, arguments) };
    imports.wbg.__wbg_removeListener_5fdddaf11f89511d = function() { return handleError(function (arg0, arg1) {
        arg0.removeListener(arg1);
    }, arguments) };
    imports.wbg.__wbg_removeProperty_e9ac299501b9d225 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg1.removeProperty(getStringFromWasm0(arg2, arg3));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_renderbufferStorageMultisample_c2d9bd03d15353fd = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.renderbufferStorageMultisample(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_renderbufferStorage_20c9844f177431db = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_renderbufferStorage_58c7bd7350fe2348 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_repeat_a0a8a6127f35aec6 = function() { return logError(function (arg0) {
        const ret = arg0.repeat;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_requestAnimationFrame_c63a6b8ad5f85d24 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.requestAnimationFrame(arg1);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_requestFullscreen_900816ce59bc23ee = function() { return logError(function (arg0) {
        const ret = arg0.requestFullscreen;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_requestFullscreen_cb251917d11c059d = function() { return logError(function (arg0) {
        const ret = arg0.requestFullscreen();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_requestIdleCallback_67a4ae09ea470b9f = function() { return logError(function (arg0) {
        const ret = arg0.requestIdleCallback;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_requestIdleCallback_85d8c40249375ed6 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.requestIdleCallback(arg1);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_requestPointerLock_3f337812f87c885c = function() { return logError(function (arg0) {
        arg0.requestPointerLock();
    }, arguments) };
    imports.wbg.__wbg_require_79b1e9274cde3c87 = function() { return handleError(function () {
        const ret = module.require;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_resolve_4851785c9c5f573d = function() { return logError(function (arg0) {
        const ret = Promise.resolve(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_resume_b0ab6d04195104a4 = function() { return handleError(function (arg0) {
        const ret = arg0.resume();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_revokeObjectURL_d505253d4a1e5b65 = function() { return handleError(function (arg0, arg1) {
        URL.revokeObjectURL(getStringFromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_samplerParameterf_c47e7f1ad8dae991 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.samplerParameterf(arg1, arg2 >>> 0, arg3);
    }, arguments) };
    imports.wbg.__wbg_samplerParameteri_5a2ef125bf04f811 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.samplerParameteri(arg1, arg2 >>> 0, arg3);
    }, arguments) };
    imports.wbg.__wbg_scheduler_3dbf209fc08aa5b8 = function() { return logError(function (arg0) {
        const ret = arg0.scheduler;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_scheduler_798ad2c2c23a54ad = function() { return logError(function (arg0) {
        const ret = arg0.scheduler;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_scissor_59abe091ff49819a = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.scissor(arg1, arg2, arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_scissor_ea487ef04cb6fcb3 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.scissor(arg1, arg2, arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_setAttribute_3d1326b2d681f50e = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_setPointerCapture_e01aa24a929223fb = function() { return handleError(function (arg0, arg1) {
        arg0.setPointerCapture(arg1);
    }, arguments) };
    imports.wbg.__wbg_setProperty_6e030598ab0f3b70 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_setTimeout_0da9746efaff7f7e = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.setTimeout(arg1);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setTimeout_21f535ce88ddefae = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.setTimeout(arg1, arg2);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_65595bdd868b3009 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_set_bb8cecf6a62b9f46 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1, arg2);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setbox_cc8ea5a970f704d1 = function() { return logError(function (arg0, arg1) {
        arg0.box = __wbindgen_enum_ResizeObserverBoxOptions[arg1];
    }, arguments) };
    imports.wbg.__wbg_setbuffer_e7d594cb176819b6 = function() { return logError(function (arg0, arg1) {
        arg0.buffer = arg1;
    }, arguments) };
    imports.wbg.__wbg_setchannelCount_f7063a5d49b4d789 = function() { return logError(function (arg0, arg1) {
        arg0.channelCount = arg1 >>> 0;
    }, arguments) };
    imports.wbg.__wbg_setcursor_bc821328a605fbbf = function() { return logError(function (arg0, arg1, arg2) {
        arg0.cursor = getStringFromWasm0(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_setduration_f82387f93a69291a = function() { return logError(function (arg0, arg1) {
        arg0.duration = arg1;
    }, arguments) };
    imports.wbg.__wbg_setheight_6d068aac3809b5be = function() { return logError(function (arg0, arg1) {
        arg0.height = arg1 >>> 0;
    }, arguments) };
    imports.wbg.__wbg_setheight_ef8682f90e6c89d9 = function() { return logError(function (arg0, arg1) {
        arg0.height = arg1 >>> 0;
    }, arguments) };
    imports.wbg.__wbg_setiterations_e6e9dcd76cfef277 = function() { return logError(function (arg0, arg1) {
        arg0.iterations = arg1;
    }, arguments) };
    imports.wbg.__wbg_setonended_3d2a95d9476a0c8a = function() { return logError(function (arg0, arg1) {
        arg0.onended = arg1;
    }, arguments) };
    imports.wbg.__wbg_setonmessage_bd9040088d96e132 = function() { return logError(function (arg0, arg1) {
        arg0.onmessage = arg1;
    }, arguments) };
    imports.wbg.__wbg_setpremultiplyalpha_c6664e6190755efa = function() { return logError(function (arg0, arg1) {
        arg0.premultiplyAlpha = __wbindgen_enum_PremultiplyAlpha[arg1];
    }, arguments) };
    imports.wbg.__wbg_setsamplerate_19c8bdfa09aea405 = function() { return logError(function (arg0, arg1) {
        arg0.sampleRate = arg1;
    }, arguments) };
    imports.wbg.__wbg_setsrc_308536c5baa0e0b1 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.src = getStringFromWasm0(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_settype_8bac22cb8a404937 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.type = getStringFromWasm0(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_setwidth_0a97529809a7b5ce = function() { return logError(function (arg0, arg1) {
        arg0.width = arg1 >>> 0;
    }, arguments) };
    imports.wbg.__wbg_setwidth_c27496fac9d7cbcd = function() { return logError(function (arg0, arg1) {
        arg0.width = arg1 >>> 0;
    }, arguments) };
    imports.wbg.__wbg_shaderSource_00ae5f7fdfcbcc8a = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_shaderSource_07600d75c5e52ee8 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_shiftKey_15a826ae86780b66 = function() { return logError(function (arg0) {
        const ret = arg0.shiftKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_shiftKey_faedef72ca4993d0 = function() { return logError(function (arg0) {
        const ret = arg0.shiftKey;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_signal_05cd9a8401da1904 = function() { return logError(function (arg0) {
        const ret = arg0.signal;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function() { return logError(function (arg0, arg1) {
        const ret = arg1.stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_start_09bc3431127c018b = function() { return logError(function (arg0) {
        arg0.start();
    }, arguments) };
    imports.wbg.__wbg_start_80af40cd3e84d34f = function() { return handleError(function (arg0, arg1) {
        arg0.start(arg1);
    }, arguments) };
    imports.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() { return logError(function () {
        const ret = typeof global === 'undefined' ? null : global;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() { return logError(function () {
        const ret = typeof globalThis === 'undefined' ? null : globalThis;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() { return logError(function () {
        const ret = typeof self === 'undefined' ? null : self;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() { return logError(function () {
        const ret = typeof window === 'undefined' ? null : window;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_status_0469c5287b59ffc5 = function() { return logError(function (arg0) {
        const ret = arg0.status;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_stencilFuncSeparate_0157f18e790f6bfa = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_stencilFuncSeparate_2dc59edc13b28fc6 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_stencilMaskSeparate_3caa7748f1b26cd6 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_stencilMaskSeparate_52cbb32878267078 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_stencilMask_521a52ddfe5a6cd4 = function() { return logError(function (arg0, arg1) {
        arg0.stencilMask(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_stencilMask_6d9a784c7bc351ce = function() { return logError(function (arg0, arg1) {
        arg0.stencilMask(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_stencilOpSeparate_0c978eb9b15c9f85 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_stencilOpSeparate_e827f9e978e1b09a = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_stringify_f7ed6987935b4a24 = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_style_26e0ea49287f923a = function() { return logError(function (arg0) {
        const ret = arg0.style;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_aa9065fa9dc5df96 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_texImage2D_497bb4fda2bff198 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texImage2D_64119485ec5c83c5 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texImage3D_685f14380c3292c5 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        arg0.texImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
    }, arguments) };
    imports.wbg.__wbg_texParameteri_57e5020007d28a78 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
    }, arguments) };
    imports.wbg.__wbg_texParameteri_638be2eabe09adbe = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
    }, arguments) };
    imports.wbg.__wbg_texStorage2D_8b915caf1da46ce4 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.texStorage2D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_texStorage3D_0568b2363f484a4f = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.texStorage3D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5, arg6);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_25ba041814bc8e21 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_58b3b8ef58a4f11e = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_62ec55b6e2d2a279 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_7c1af8ea2e445bf9 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_9709c068b2b4de26 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_a6d54e1bacae4401 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_dc0bf4e5d109f6a9 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_e670a30252e68a5f = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_3020ea0c2e4af671 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_31dddb79286a750e = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_4e10da0b59035caf = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_5152f65f00cea2c1 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_9accaba68879d2bb = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_caef58ba35d2b1dc = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_f923048e43a90691 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_then_44b73946d2fb3e7d = function() { return logError(function (arg0, arg1) {
        const ret = arg0.then(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_then_48b406749878a531 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.then(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toBlob_6b76689a7a76c567 = function() { return handleError(function (arg0, arg1) {
        arg0.toBlob(arg1);
    }, arguments) };
    imports.wbg.__wbg_transferFromImageBitmap_01ecc44dd9f75baa = function() { return logError(function (arg0, arg1) {
        arg0.transferFromImageBitmap(arg1);
    }, arguments) };
    imports.wbg.__wbg_uniform1f_163140cf8098fd27 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.uniform1f(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_uniform1f_24e297dbe82b3e8b = function() { return logError(function (arg0, arg1, arg2) {
        arg0.uniform1f(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_uniform1i_321dc6f551dc43a2 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.uniform1i(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_uniform1i_c336bd57bb635632 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.uniform1i(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_uniform1ui_f08a50dc1fbc1a12 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.uniform1ui(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_uniform2fv_e35eebfe7745fcbd = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform2fv_f4f5cdbddd309e4e = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform2iv_1ce9f168e7c65400 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform2iv_d846357c5c3dae05 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform2uiv_b858f856d34c25a5 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform2uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform3fv_2227834b10c7b12d = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform3fv_25d27a1149eb4860 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform3iv_2ff71c5f5fa3ce41 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform3iv_ca926607f47cfeb6 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform3uiv_3d625ec4e84c34e4 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform3uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform4f_7c3650ab50e68564 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_uniform4f_d60121a6b2a97dc8 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_uniform4fv_18992c16bbabd9c0 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform4fv_530e745d431feb37 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform4iv_1a955cae115903da = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform4iv_9c807bd0d2a8e4a8 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniform4uiv_95e9545ab34cb124 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniform4uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_uniformBlockBinding_c444994f1ea2a94b = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.uniformBlockBinding(arg1, arg2 >>> 0, arg3 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix2fv_6e733aa755842b90 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix2fv_6f4364e64c7c9421 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix2x3fv_976bbb06d85dfd0e = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix2x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix2x4fv_92e5b6db630a5fa8 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix2x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix3fv_03411c8bf29bce4f = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix3fv_3b9f87ac337e8818 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix3x2fv_c460042a2723adaa = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix3x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix3x4fv_6ef1e75b29e19c73 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix3x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix4fv_42709953443a0a25 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix4fv_b1f3c4e6fee094ba = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix4x2fv_b234c3cfc3c0f072 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix4x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix4x3fv_aff68033ad4371cd = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix4x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_unobserve_3e1d2ed8c8f9304d = function() { return logError(function (arg0, arg1) {
        arg0.unobserve(arg1);
    }, arguments) };
    imports.wbg.__wbg_useProgram_4b9fefb6ddf3c9db = function() { return logError(function (arg0, arg1) {
        arg0.useProgram(arg1);
    }, arguments) };
    imports.wbg.__wbg_useProgram_84c836d2cadce6f4 = function() { return logError(function (arg0, arg1) {
        arg0.useProgram(arg1);
    }, arguments) };
    imports.wbg.__wbg_userAgentData_0ba21969d1f27636 = function() { return logError(function (arg0) {
        const ret = arg0.userAgentData;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_userAgent_1ec9a943344ce531 = function() { return handleError(function (arg0, arg1) {
        const ret = arg1.userAgent;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_value_ad7f8bc04ccebe94 = function() { return logError(function (arg0) {
        const ret = arg0.value;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_versions_c71aa1626a93e0a1 = function() { return logError(function (arg0) {
        const ret = arg0.versions;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_vertexAttribDivisorANGLE_61512b78a513b150 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.vertexAttribDivisorANGLE(arg1 >>> 0, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_vertexAttribDivisor_d085158bfa542d48 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.vertexAttribDivisor(arg1 >>> 0, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_vertexAttribIPointer_428f7a653f85a577 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.vertexAttribIPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_vertexAttribPointer_34d6fd8e96154da2 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
    }, arguments) };
    imports.wbg.__wbg_vertexAttribPointer_9805416e06cf92de = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
    }, arguments) };
    imports.wbg.__wbg_videoHeight_2304fcc48af2e7cb = function() { return logError(function (arg0) {
        const ret = arg0.videoHeight;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_videoWidth_e744eed0752c3e65 = function() { return logError(function (arg0) {
        const ret = arg0.videoWidth;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_viewport_a6c7d2f5470dbbac = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.viewport(arg1, arg2, arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_viewport_ae6852be2ba7c8b1 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.viewport(arg1, arg2, arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_visibilityState_7eed63363cbc05d9 = function() { return logError(function (arg0) {
        const ret = arg0.visibilityState;
        return (__wbindgen_enum_VisibilityState.indexOf(ret) + 1 || 3) - 1;
    }, arguments) };
    imports.wbg.__wbg_webkitExitFullscreen_dcb418d2357698e2 = function() { return logError(function (arg0) {
        arg0.webkitExitFullscreen();
    }, arguments) };
    imports.wbg.__wbg_webkitFullscreenElement_1705b28e33fad768 = function() { return logError(function (arg0) {
        const ret = arg0.webkitFullscreenElement;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_webkitRequestFullscreen_416bc13a99f0f3ed = function() { return logError(function (arg0) {
        arg0.webkitRequestFullscreen();
    }, arguments) };
    imports.wbg.__wbg_width_116078e7490d57e3 = function() { return logError(function (arg0) {
        const ret = arg0.width;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_width_5919db608d47d0b9 = function() { return logError(function (arg0) {
        const ret = arg0.width;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_width_59df68dab3035138 = function() { return logError(function (arg0) {
        const ret = arg0.width;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_width_8edf59c193346831 = function() { return logError(function (arg0) {
        const ret = arg0.width;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_width_91d0657fa0600886 = function() { return logError(function (arg0) {
        const ret = arg0.width;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_width_a0516de9803a3357 = function() { return logError(function (arg0) {
        const ret = arg0.width;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_x_eee19989e8080baa = function() { return logError(function (arg0) {
        const ret = arg0.x;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_y_06bcd329d9542e18 = function() { return logError(function (arg0) {
        const ret = arg0.y;
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = arg0;
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        _assertNum(ret);
        return ret;
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = arg0.original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper138398 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 101083, __wbg_adapter_65);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper4778 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 2918, __wbg_adapter_36);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper4779 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 2918, __wbg_adapter_39);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper4780 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 2918, __wbg_adapter_42);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper4781 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 2918, __wbg_adapter_45);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper4782 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 2918, __wbg_adapter_39);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper4783 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 2918, __wbg_adapter_39);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper4784 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 2918, __wbg_adapter_39);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper4785 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 2918, __wbg_adapter_39);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper4786 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 2918, __wbg_adapter_39);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper4787 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 2918, __wbg_adapter_39);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper4788 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 2918, __wbg_adapter_39);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper74989 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 54579, __wbg_adapter_62);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_1;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(arg0) === 'function';
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_is_null = function(arg0) {
        const ret = arg0 === null;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = arg0;
        const ret = typeof(val) === 'object' && val !== null;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(arg0) === 'string';
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'number' ? obj : undefined;
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedInt32ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    cachedUint8ClampedArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('bevy_wasm_gallery_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
