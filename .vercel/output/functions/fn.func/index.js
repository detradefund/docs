globalThis.global = globalThis;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_current_component(component10) {
  current_component = component10;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component10, name) {
  if (!component10 || !component10.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component10;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css9) => css9.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean)
    return "";
  const assignment = `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
var current_component, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    ATTR_REGEX = /[&"<]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/ssr2.js
function onMount() {
}
function afterUpdate() {
}
var init_ssr2 = __esm({
  ".svelte-kit/output/server/chunks/ssr2.js"() {
  }
});

// .svelte-kit/output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/")
    return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback, search_params_callback, allow_hash = false) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  const tracked_url_properties = ["href", "pathname", "search", "toString", "toJSON"];
  if (allow_hash)
    tracked_url_properties.push("hash");
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
    tracked.searchParams[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url.searchParams, opts);
    };
  }
  if (!allow_hash) {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    internal = new URL("sveltekit-internal://");
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// .svelte-kit/output/server/chunks/index.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    init_ssr();
    subscriber_queue = [];
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse2;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index10 = 0;
      while (index10 < str.length) {
        var eqIdx = str.indexOf("=", index10);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index10);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index10 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index10, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index10 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else if (key2 === "partitioned") {
          cookie.partitioned = true;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse2(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse2;
    module.exports.parse = parse2;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/chunks/client.js
function get(key2, parse2 = JSON.parse) {
  try {
    return parse2(sessionStorage[key2]);
  } catch {
  }
}
var SNAPSHOT_KEY, SCROLL_KEY, is_legacy;
var init_client = __esm({
  ".svelte-kit/output/server/chunks/client.js"() {
    init_exports();
    init_ssr2();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    is_legacy = onMount.toString().includes("$$") || /function \w+\(\) \{\}/.test(onMount.toString());
    if (is_legacy) {
      ({
        data: {},
        form: null,
        error: null,
        params: {},
        route: { id: null },
        state: {},
        status: -1,
        url: new URL("https://example.com")
      });
    }
    get(SCROLL_KEY) ?? {};
    get(SNAPSHOT_KEY) ?? {};
  }
});

// .svelte-kit/output/server/chunks/stores.js
var getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_ssr();
    init_client();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var sidebarOpen, css$3, Sidebar, css$2, ThemeToggle, css$1, Header, css, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_ssr();
    init_chunks();
    init_stores();
    init_client();
    sidebarOpen = writable(true);
    css$3 = {
      code: ".sidebar.svelte-oy6vuu.svelte-oy6vuu{width:300px;height:calc(100vh - 60px);position:fixed;left:0;top:60px;background-color:var(--sidebar-background);backdrop-filter:blur(10px);border-right:1px solid var(--border-color);padding:1.5rem;overflow-y:auto;font-family:'Inter', system-ui, -apple-system, sans-serif;z-index:90;color:var(--sidebar-text)}.back-to-app.svelte-oy6vuu.svelte-oy6vuu{margin-bottom:0.5rem}.sidebar-header.svelte-oy6vuu.svelte-oy6vuu{padding-bottom:0.75rem;border-bottom:1px solid var(--border-color);margin-bottom:0.75rem}.nav-sections.svelte-oy6vuu.svelte-oy6vuu{display:flex;flex-direction:column;gap:0.5rem}.nav-link.svelte-oy6vuu.svelte-oy6vuu{color:var(--sidebar-text);text-decoration:none;font-size:0.9rem;display:flex;align-items:center;padding:0.65rem 0.75rem;border-radius:0.375rem;transition:all 0.2s;gap:0.75rem}.nav-link.active.svelte-oy6vuu.svelte-oy6vuu{background-color:var(--sidebar-active)}.nav-link.svelte-oy6vuu.svelte-oy6vuu:hover{background-color:var(--sidebar-hover)}.nav-link.svelte-oy6vuu svg.svelte-oy6vuu{min-width:18px;width:18px;height:18px}.nav-link.svelte-oy6vuu.svelte-oy6vuu::after{content:none}.arrow-icon.svelte-oy6vuu.svelte-oy6vuu{margin-left:auto;transition:transform 0.2s ease}.nav-link.svelte-oy6vuu:hover .arrow-icon.svelte-oy6vuu{transform:translate(1px, -1px)}@media(max-width: 1024px){.sidebar.svelte-oy6vuu.svelte-oy6vuu{transform:translateX(-100%);transition:transform 0.3s ease}.sidebar.open.svelte-oy6vuu.svelte-oy6vuu{transform:translateX(0)}}.nav-group.svelte-oy6vuu.svelte-oy6vuu{display:flex;flex-direction:column}.nav-link-container.svelte-oy6vuu.svelte-oy6vuu{display:flex;align-items:center;width:100%;border-radius:0.375rem;transition:all 0.2s}.nav-link-container.svelte-oy6vuu.svelte-oy6vuu:hover{background-color:var(--sidebar-hover)}.nav-link-container.active.svelte-oy6vuu.svelte-oy6vuu{background-color:var(--sidebar-active)}.main-link.svelte-oy6vuu.svelte-oy6vuu{flex:1;padding-right:0;background:none}.main-link.svelte-oy6vuu.svelte-oy6vuu:hover{background:none}.toggle-button.svelte-oy6vuu.svelte-oy6vuu{background:none;border:none;padding:0.5rem;cursor:pointer;color:inherit;display:flex;align-items:center;justify-content:center;opacity:0.6;transition:all 0.2s ease}.toggle-button.svelte-oy6vuu.svelte-oy6vuu:hover{opacity:1}.chevron.svelte-oy6vuu.svelte-oy6vuu{transition:transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);width:16px;height:16px}.chevron.open.svelte-oy6vuu.svelte-oy6vuu{transform:rotate(-180deg)}.nav-link.main-link.svelte-oy6vuu.svelte-oy6vuu:hover{background:none}.submenu.svelte-oy6vuu.svelte-oy6vuu{display:none;padding-left:0.75rem;margin-top:0.2rem}.submenu.open.svelte-oy6vuu.svelte-oy6vuu{display:flex;flex-direction:column;gap:0.2rem}.sub-nav-link.svelte-oy6vuu.svelte-oy6vuu{padding-left:2.5rem;font-size:0.85rem;opacity:0.8}.sub-nav-link.svelte-oy6vuu.svelte-oy6vuu:hover{opacity:1}.sub-nav-link.active.svelte-oy6vuu.svelte-oy6vuu{background-color:var(--sidebar-active);color:var(--text-color);opacity:1}",
      map: '{"version":3,"file":"Sidebar.svelte","sources":["Sidebar.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { page } from \\"$app/stores\\";\\nimport { onMount } from \\"svelte\\";\\nimport { sidebarOpen } from \\"$lib/stores/sidebar\\";\\nimport { goto } from \\"$app/navigation\\";\\nlet guidesOpen = true;\\nlet frameworkOpen = true;\\nlet vaultsOpen = true;\\nlet securityOpen = true;\\nlet faqOpen = true;\\nfunction toggleGuides() {\\n  guidesOpen = !guidesOpen;\\n}\\nfunction toggleFramework() {\\n  frameworkOpen = !frameworkOpen;\\n}\\nfunction toggleVaults() {\\n  vaultsOpen = !vaultsOpen;\\n}\\nfunction toggleSecurity() {\\n  securityOpen = !securityOpen;\\n}\\nfunction toggleFaq() {\\n  faqOpen = !faqOpen;\\n}\\nconst sections = [\\n  {\\n    title: \\"Overview\\",\\n    href: \\"/\\",\\n    icon: `<svg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <path d=\\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\\"/>\\n        <path d=\\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\\"/>\\n      </svg>`\\n  },\\n  {\\n    title: \\"Framework\\",\\n    href: \\"/framework\\",\\n    icon: `<svg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <circle cx=\\"12\\" cy=\\"12\\" r=\\"3\\"/>\\n        <path d=\\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\\"/>\\n      </svg>`,\\n    subItems: [\\n      {\\n        title: \\"Features\\",\\n        href: \\"/framework#features\\"\\n      },\\n      {\\n        title: \\"Protocol Architecture\\",\\n        href: \\"/framework#architecture\\"\\n      },\\n      {\\n        title: \\"Terminology\\",\\n        href: \\"/framework#terminology\\"\\n      }\\n    ]\\n  },\\n  {\\n    title: \\"Guides\\",\\n    href: \\"/guides\\",\\n    icon: `<svg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <path d=\\"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z\\"/>\\n        <path d=\\"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z\\"/>\\n      </svg>`,\\n    subItems: [\\n      {\\n        title: \\"How to Deposit\\",\\n        href: \\"/guides#deposit\\"\\n      },\\n      {\\n        title: \\"How to Withdraw\\",\\n        href: \\"/guides#withdraw\\"\\n      }\\n    ]\\n  },\\n  {\\n    title: \\"Security\\",\\n    href: \\"/security\\",\\n    icon: `<svg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <path d=\\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\\"/>\\n      </svg>`,\\n    subItems: [\\n      {\\n        title: \\"DeFi Exposure\\",\\n        href: \\"/security#defi-exposure\\"\\n      },\\n      {\\n        title: \\"Infrastructure\\",\\n        href: \\"/security#infrastructure\\"\\n      },\\n      {\\n        title: \\"Oracle Design\\",\\n        href: \\"/security#oracle-design\\"\\n      },\\n      {\\n        title: \\"Audits\\",\\n        href: \\"/security#audit\\"\\n      }\\n    ]\\n  },\\n  {\\n    title: \\"Vaults\\",\\n    href: \\"/vaults\\",\\n    icon: `<svg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <rect x=\\"3\\" y=\\"3\\" width=\\"18\\" height=\\"18\\" rx=\\"2\\" ry=\\"2\\"/>\\n        <circle cx=\\"12\\" cy=\\"10\\" r=\\"3\\"/>\\n        <path d=\\"M12 13v8\\"/>\\n        <path d=\\"M8 21h8\\"/>\\n      </svg>`,\\n    subItems: [\\n      {\\n        title: \\"DeTrade Core USDC\\",\\n        href: \\"/vaults/detrade-core-usdc\\"\\n      }\\n    ]\\n  },\\n  {\\n    title: \\"FAQ\\",\\n    href: \\"/faq\\",\\n    icon: `<svg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <circle cx=\\"12\\" cy=\\"12\\" r=\\"10\\"/>\\n        <path d=\\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\\"/>\\n        <line x1=\\"12\\" y1=\\"17\\" x2=\\"12.01\\" y2=\\"17\\"/>\\n      </svg>`,\\n    subItems: [\\n      {\\n        title: \\"Deposits & Withdrawals\\",\\n        href: \\"/faq#deposits-withdrawals\\"\\n      },\\n      {\\n        title: \\"Performance & Metrics\\",\\n        href: \\"/faq#performance-metrics\\"\\n      },\\n      {\\n        title: \\"Oracle\\",\\n        href: \\"/faq#oracle\\"\\n      }\\n    ]\\n  }\\n];\\nfunction checkWidth() {\\n  if (window.innerWidth <= 1024) {\\n    sidebarOpen.set(false);\\n  }\\n}\\nonMount(() => {\\n  checkWidth();\\n  window.addEventListener(\\"resize\\", checkWidth);\\n  return () => {\\n    window.removeEventListener(\\"resize\\", checkWidth);\\n  };\\n});\\n<\/script>\\n\\n<nav class=\\"sidebar\\" class:open={$sidebarOpen}>\\n  <div class=\\"back-to-app\\">\\n    <a href=\\"https://app.detrade.fund\\" class=\\"nav-link\\">\\n      <svg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <rect x=\\"3\\" y=\\"3\\" width=\\"18\\" height=\\"18\\" rx=\\"2\\" ry=\\"2\\"/>\\n      </svg>\\n      Back to App\\n      <svg \\n        class=\\"arrow-icon\\" \\n        width=\\"16\\" \\n        height=\\"16\\" \\n        viewBox=\\"0 0 24 24\\" \\n        fill=\\"none\\" \\n        stroke=\\"currentColor\\" \\n        stroke-width=\\"2\\" \\n        stroke-linecap=\\"round\\" \\n        stroke-linejoin=\\"round\\"\\n      >\\n        <path d=\\"M18 6L6 18\\" />\\n        <path d=\\"M8 6h10v10\\" />\\n      </svg>\\n    </a>\\n  </div>\\n\\n  <div class=\\"sidebar-header\\"></div>\\n  \\n  <nav class=\\"nav-sections\\">\\n    {#each sections as section}\\n      {#if section.subItems}\\n        <div class=\\"nav-group\\">\\n          <div class=\\"nav-link-container\\" class:active={$page.url.pathname === section.href}>\\n            <a \\n              href={section.href} \\n              class=\\"nav-link main-link\\"\\n              on:click|preventDefault={async () => {\\n                // Ouvrir le menu d\xE9roulant d\'abord\\n                switch(section.title) {\\n                  case \\"Guides\\":\\n                    guidesOpen = true;\\n                    break;\\n                  case \\"Framework\\":\\n                    frameworkOpen = true;\\n                    break;\\n                  case \\"Vaults\\":\\n                    vaultsOpen = true;\\n                    break;\\n                  case \\"Security\\":\\n                    securityOpen = true;\\n                    break;\\n                  case \\"FAQ\\":\\n                    faqOpen = true;\\n                    break;\\n                }\\n                // Puis naviguer vers la page\\n                await goto(section.href);\\n              }}\\n            >\\n              {@html section.icon}\\n              {section.title}\\n            </a>\\n            <button \\n              class=\\"toggle-button\\"\\n              on:click|stopPropagation={() => {\\n                switch(section.title) {\\n                  case \\"Guides\\":\\n                    toggleGuides();\\n                    break;\\n                  case \\"Framework\\":\\n                    toggleFramework();\\n                    break;\\n                  case \\"Vaults\\":\\n                    toggleVaults();\\n                    break;\\n                  case \\"Security\\":\\n                    toggleSecurity();\\n                    break;\\n                  case \\"FAQ\\":\\n                    toggleFaq();\\n                    break;\\n                }\\n              }}\\n            >\\n              <svg \\n                class=\\"chevron\\" \\n                class:open={\\n                  section.title === \\"Guides\\" ? guidesOpen :\\n                  section.title === \\"Framework\\" ? frameworkOpen :\\n                  section.title === \\"Vaults\\" ? vaultsOpen :\\n                  section.title === \\"Security\\" ? securityOpen :\\n                  section.title === \\"FAQ\\" ? faqOpen : false\\n                }\\n                width=\\"16\\" \\n                height=\\"16\\" \\n                viewBox=\\"0 0 24 24\\" \\n                fill=\\"none\\" \\n                stroke=\\"currentColor\\" \\n                stroke-width=\\"2.5\\" \\n                stroke-linecap=\\"round\\" \\n                stroke-linejoin=\\"round\\"\\n              >\\n                <path d=\\"M18 9l-6 6l-6 -6\\" />\\n              </svg>\\n            </button>\\n          </div>\\n\\n          <div class=\\"submenu\\" \\n            class:open={\\n              section.title === \\"Guides\\" ? guidesOpen :\\n              section.title === \\"Framework\\" ? frameworkOpen :\\n              section.title === \\"Vaults\\" ? vaultsOpen :\\n              section.title === \\"Security\\" ? securityOpen :\\n              section.title === \\"FAQ\\" ? faqOpen : false\\n            }\\n          >\\n            {#each section.subItems as subItem}\\n              <a \\n                href={subItem.href} \\n                class=\\"nav-link sub-nav-link\\"\\n                class:active={$page.url.pathname + $page.url.hash === subItem.href}\\n              >\\n                {subItem.title}\\n              </a>\\n            {/each}\\n          </div>\\n        </div>\\n      {:else}\\n        <a \\n          href={section.href} \\n          class=\\"nav-link\\"\\n          class:active={$page.url.pathname === section.href}\\n        >\\n          {@html section.icon}\\n          {section.title}\\n        </a>\\n      {/if}\\n    {/each}\\n  </nav>\\n</nav>\\n\\n<style>\\n  .sidebar {\\n    width: 300px;\\n    height: calc(100vh - 60px);\\n    position: fixed;\\n    left: 0;\\n    top: 60px;\\n    background-color: var(--sidebar-background);\\n    backdrop-filter: blur(10px);\\n    border-right: 1px solid var(--border-color);\\n    padding: 1.5rem;\\n    overflow-y: auto;\\n    font-family: \'Inter\', system-ui, -apple-system, sans-serif;\\n    z-index: 90;\\n    color: var(--sidebar-text);\\n  }\\n\\n  .back-to-app {\\n    margin-bottom: 0.5rem;\\n  }\\n\\n  .sidebar-header {\\n    padding-bottom: 0.75rem;\\n    border-bottom: 1px solid var(--border-color);\\n    margin-bottom: 0.75rem;\\n  }\\n\\n  .nav-sections {\\n    display: flex;\\n    flex-direction: column;\\n    gap: 0.5rem;\\n  }\\n\\n  .nav-link {\\n    color: var(--sidebar-text);\\n    text-decoration: none;\\n    font-size: 0.9rem;\\n    display: flex;\\n    align-items: center;\\n    padding: 0.65rem 0.75rem;\\n    border-radius: 0.375rem;\\n    transition: all 0.2s;\\n    gap: 0.75rem;\\n  }\\n\\n  .nav-link.active {\\n    background-color: var(--sidebar-active);\\n  }\\n\\n  .nav-link:hover {\\n    background-color: var(--sidebar-hover);\\n  }\\n\\n  .nav-link svg {\\n    min-width: 18px;\\n    width: 18px;\\n    height: 18px;\\n  }\\n\\n  .nav-link::after {\\n    content: none;\\n  }\\n\\n  .arrow-icon {\\n    margin-left: auto;\\n    transition: transform 0.2s ease;\\n  }\\n\\n  .nav-link:hover .arrow-icon {\\n    transform: translate(1px, -1px);\\n  }\\n\\n  @media (max-width: 1024px) {\\n    .sidebar {\\n      transform: translateX(-100%);\\n      transition: transform 0.3s ease;\\n    }\\n\\n    .sidebar.open {\\n      transform: translateX(0);\\n    }\\n  }\\n\\n  .nav-group {\\n    display: flex;\\n    flex-direction: column;\\n  }\\n\\n  .nav-link-container {\\n    display: flex;\\n    align-items: center;\\n    width: 100%;\\n    border-radius: 0.375rem;\\n    transition: all 0.2s;\\n  }\\n\\n  .nav-link-container:hover {\\n    background-color: var(--sidebar-hover);\\n  }\\n\\n  .nav-link-container.active {\\n    background-color: var(--sidebar-active);\\n  }\\n\\n  .main-link {\\n    flex: 1;\\n    padding-right: 0;\\n    background: none;\\n  }\\n\\n  .main-link:hover {\\n    background: none;\\n  }\\n\\n  .toggle-button {\\n    background: none;\\n    border: none;\\n    padding: 0.5rem;\\n    cursor: pointer;\\n    color: inherit;\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    opacity: 0.6;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .toggle-button:hover {\\n    opacity: 1;\\n  }\\n\\n  .chevron {\\n    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);\\n    width: 16px;\\n    height: 16px;\\n  }\\n\\n  .chevron.open {\\n    transform: rotate(-180deg);\\n  }\\n\\n  .nav-link.main-link.active {\\n    background: none;\\n  }\\n\\n  .nav-link.main-link:hover {\\n    background: none;\\n  }\\n\\n  .submenu {\\n    display: none;\\n    padding-left: 0.75rem;\\n    margin-top: 0.2rem;\\n  }\\n\\n  .submenu.open {\\n    display: flex;\\n    flex-direction: column;\\n    gap: 0.2rem;\\n  }\\n\\n  .sub-nav-link {\\n    padding-left: 2.5rem;\\n    font-size: 0.85rem;\\n    opacity: 0.8;\\n  }\\n\\n  .sub-nav-link:hover {\\n    opacity: 1;\\n  }\\n\\n  .sub-nav-link.active {\\n    background-color: var(--sidebar-active);\\n    color: var(--text-color);\\n    opacity: 1;\\n  }\\n\\n  .submenu-item {\\n    padding: 0.5rem 1rem 0.5rem 3rem;\\n    font-size: 0.9rem;\\n    color: var(--text-color);\\n    opacity: 0.7;\\n    text-decoration: none;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .submenu-item:hover {\\n    opacity: 1;\\n    background: var(--sidebar-hover);\\n  }\\n\\n  .submenu-item.active {\\n    color: var(--text-color);\\n    opacity: 1;\\n    background: var(--sidebar-active);\\n    font-weight: 500;\\n  }\\n</style> "],"names":[],"mappings":"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"}'
    };
    Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $sidebarOpen, $$unsubscribe_sidebarOpen;
      let $page, $$unsubscribe_page;
      $$unsubscribe_sidebarOpen = subscribe(sidebarOpen, (value) => $sidebarOpen = value);
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let guidesOpen = true;
      let frameworkOpen = true;
      let vaultsOpen = true;
      let securityOpen = true;
      let faqOpen = true;
      const sections = [
        {
          title: "Overview",
          href: "/",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>`
        },
        {
          title: "Framework",
          href: "/framework",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>`,
          subItems: [
            {
              title: "Features",
              href: "/framework#features"
            },
            {
              title: "Protocol Architecture",
              href: "/framework#architecture"
            },
            {
              title: "Terminology",
              href: "/framework#terminology"
            }
          ]
        },
        {
          title: "Guides",
          href: "/guides",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>`,
          subItems: [
            {
              title: "How to Deposit",
              href: "/guides#deposit"
            },
            {
              title: "How to Withdraw",
              href: "/guides#withdraw"
            }
          ]
        },
        {
          title: "Security",
          href: "/security",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>`,
          subItems: [
            {
              title: "DeFi Exposure",
              href: "/security#defi-exposure"
            },
            {
              title: "Infrastructure",
              href: "/security#infrastructure"
            },
            {
              title: "Oracle Design",
              href: "/security#oracle-design"
            },
            { title: "Audits", href: "/security#audit" }
          ]
        },
        {
          title: "Vaults",
          href: "/vaults",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M12 13v8"/>
        <path d="M8 21h8"/>
      </svg>`,
          subItems: [
            {
              title: "DeTrade Core USDC",
              href: "/vaults/detrade-core-usdc"
            }
          ]
        },
        {
          title: "FAQ",
          href: "/faq",
          icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>`,
          subItems: [
            {
              title: "Deposits & Withdrawals",
              href: "/faq#deposits-withdrawals"
            },
            {
              title: "Performance & Metrics",
              href: "/faq#performance-metrics"
            },
            { title: "Oracle", href: "/faq#oracle" }
          ]
        }
      ];
      $$result.css.add(css$3);
      $$unsubscribe_sidebarOpen();
      $$unsubscribe_page();
      return `<nav class="${["sidebar svelte-oy6vuu", $sidebarOpen ? "open" : ""].join(" ").trim()}"><div class="back-to-app svelte-oy6vuu" data-svelte-h="svelte-ypou2b"><a href="https://app.detrade.fund" class="nav-link svelte-oy6vuu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-oy6vuu"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
      Back to App
      <svg class="arrow-icon svelte-oy6vuu" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"></path><path d="M8 6h10v10"></path></svg></a></div> <div class="sidebar-header svelte-oy6vuu"></div> <nav class="nav-sections svelte-oy6vuu">${each(sections, (section) => {
        return `${section.subItems ? `<div class="nav-group svelte-oy6vuu"><div class="${[
          "nav-link-container svelte-oy6vuu",
          $page.url.pathname === section.href ? "active" : ""
        ].join(" ").trim()}"><a${add_attribute("href", section.href, 0)} class="nav-link main-link svelte-oy6vuu"><!-- HTML_TAG_START -->${section.icon}<!-- HTML_TAG_END --> ${escape(section.title)}</a> <button class="toggle-button svelte-oy6vuu"><svg class="${[
          "chevron svelte-oy6vuu",
          (section.title === "Guides" ? guidesOpen : section.title === "Framework" ? frameworkOpen : section.title === "Vaults" ? vaultsOpen : section.title === "Security" ? securityOpen : section.title === "FAQ" ? faqOpen : false) ? "open" : ""
        ].join(" ").trim()}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 9l-6 6l-6 -6"></path></svg> </button></div> <div class="${[
          "submenu svelte-oy6vuu",
          (section.title === "Guides" ? guidesOpen : section.title === "Framework" ? frameworkOpen : section.title === "Vaults" ? vaultsOpen : section.title === "Security" ? securityOpen : section.title === "FAQ" ? faqOpen : false) ? "open" : ""
        ].join(" ").trim()}">${each(section.subItems, (subItem) => {
          return `<a${add_attribute("href", subItem.href, 0)} class="${[
            "nav-link sub-nav-link svelte-oy6vuu",
            $page.url.pathname + $page.url.hash === subItem.href ? "active" : ""
          ].join(" ").trim()}">${escape(subItem.title)} </a>`;
        })}</div> </div>` : `<a${add_attribute("href", section.href, 0)} class="${[
          "nav-link svelte-oy6vuu",
          $page.url.pathname === section.href ? "active" : ""
        ].join(" ").trim()}"><!-- HTML_TAG_START -->${section.icon}<!-- HTML_TAG_END --> ${escape(section.title)} </a>`}`;
      })}</nav> </nav>`;
    });
    css$2 = {
      code: ".theme-switch.svelte-18p6mf9{display:flex;align-items:center}.theme-toggle.svelte-18p6mf9{position:relative;width:64px;height:32px;background:transparent;border:2px solid var(--text-color);border-radius:16px;cursor:pointer;padding:0;overflow:hidden}.icons.svelte-18p6mf9{display:flex;justify-content:space-between;align-items:center;width:100%;height:100%;padding:0 4px;position:relative;z-index:2;color:var(--text-color)}.icon.svelte-18p6mf9{display:flex;align-items:center;justify-content:center;width:24px;height:24px}.slider.svelte-18p6mf9{position:absolute;top:2px;left:2px;width:24px;height:24px;background-color:var(--text-color);border-radius:50%;transition:transform 0.3s ease;z-index:1}.slider.dark.svelte-18p6mf9{transform:translateX(32px)}",
      map: `{"version":3,"file":"ThemeToggle.svelte","sources":["ThemeToggle.svelte"],"sourcesContent":["<script>\\n  import { onMount } from 'svelte';\\n  \\n  let isDarkMode = false;\\n  \\n  onMount(() => {\\n    const savedTheme = localStorage.getItem('theme');\\n    isDarkMode = savedTheme === 'dark';\\n    if (!savedTheme) {\\n      localStorage.setItem('theme', 'light');\\n    }\\n  });\\n  \\n  function toggleTheme() {\\n    isDarkMode = !isDarkMode;\\n    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');\\n    applyTheme();\\n  }\\n  \\n  function applyTheme() {\\n    if (isDarkMode) {\\n      document.documentElement.classList.remove('dark-mode');\\n    } else {\\n      document.documentElement.classList.add('dark-mode');\\n    }\\n  }\\n<\/script>\\n\\n<div class=\\"theme-switch\\">\\n  <button \\n    on:click={toggleTheme}\\n    class=\\"theme-toggle\\"\\n    aria-label={isDarkMode ? \\"Activer le mode jour\\" : \\"Activer le mode nuit\\"}\\n  >\\n    <div class=\\"icons\\">\\n      <span class=\\"icon\\">\\n        <svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n          <circle cx=\\"12\\" cy=\\"12\\" r=\\"5\\"/>\\n          <line x1=\\"12\\" y1=\\"1\\" x2=\\"12\\" y2=\\"3\\"/>\\n          <line x1=\\"12\\" y1=\\"21\\" x2=\\"12\\" y2=\\"23\\"/>\\n          <line x1=\\"4.22\\" y1=\\"4.22\\" x2=\\"5.64\\" y2=\\"5.64\\"/>\\n          <line x1=\\"18.36\\" y1=\\"18.36\\" x2=\\"19.78\\" y2=\\"19.78\\"/>\\n          <line x1=\\"1\\" y1=\\"12\\" x2=\\"3\\" y2=\\"12\\"/>\\n          <line x1=\\"21\\" y1=\\"12\\" x2=\\"23\\" y2=\\"12\\"/>\\n          <line x1=\\"4.22\\" y1=\\"19.78\\" x2=\\"5.64\\" y2=\\"18.36\\"/>\\n          <line x1=\\"18.36\\" y1=\\"5.64\\" x2=\\"19.78\\" y2=\\"4.22\\"/>\\n        </svg>\\n      </span>\\n      <span class=\\"icon\\">\\n        <svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n          <path d=\\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\\"/>\\n        </svg>\\n      </span>\\n    </div>\\n    <div class=\\"slider\\" class:dark={isDarkMode}></div>\\n  </button>\\n</div>\\n\\n<style>\\n  .theme-switch {\\n    display: flex;\\n    align-items: center;\\n  }\\n\\n  .theme-toggle {\\n    position: relative;\\n    width: 64px;\\n    height: 32px;\\n    background: transparent;\\n    border: 2px solid var(--text-color);\\n    border-radius: 16px;\\n    cursor: pointer;\\n    padding: 0;\\n    overflow: hidden;\\n  }\\n\\n  .icons {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    width: 100%;\\n    height: 100%;\\n    padding: 0 4px;\\n    position: relative;\\n    z-index: 2;\\n    color: var(--text-color);\\n  }\\n\\n  .icon {\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    width: 24px;\\n    height: 24px;\\n  }\\n\\n  .slider {\\n    position: absolute;\\n    top: 2px;\\n    left: 2px;\\n    width: 24px;\\n    height: 24px;\\n    background-color: var(--text-color);\\n    border-radius: 50%;\\n    transition: transform 0.3s ease;\\n    z-index: 1;\\n  }\\n\\n  .slider.dark {\\n    transform: translateX(32px);\\n  }\\n</style> "],"names":[],"mappings":"AA2DE,4BAAc,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MACf,CAEA,4BAAc,CACZ,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,YAAY,CAAC,CACnC,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,MACZ,CAEA,qBAAO,CACL,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CAAC,GAAG,CACd,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,IAAI,YAAY,CACzB,CAEA,oBAAM,CACJ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV,CAEA,sBAAQ,CACN,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,IAAI,YAAY,CAAC,CACnC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,IAAI,CAC/B,OAAO,CAAE,CACX,CAEA,OAAO,oBAAM,CACX,SAAS,CAAE,WAAW,IAAI,CAC5B"}`
    };
    ThemeToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$2);
      return `<div class="theme-switch svelte-18p6mf9"><button class="theme-toggle svelte-18p6mf9"${add_attribute(
        "aria-label",
        "Activer le mode nuit",
        0
      )}><div class="icons svelte-18p6mf9" data-svelte-h="svelte-h109t2"><span class="icon svelte-18p6mf9"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></span> <span class="icon svelte-18p6mf9"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></span></div> <div class="${["slider svelte-18p6mf9", ""].join(" ").trim()}"></div></button> </div>`;
    });
    css$1 = {
      code: ".header.svelte-1et49rg{height:60px;border-bottom:1px solid var(--border-color);display:flex;align-items:center;justify-content:space-between;padding:0 1.5rem;background-color:var(--header-background);backdrop-filter:blur(10px);position:fixed;top:0;right:0;left:0;z-index:200;color:var(--header-text)}.logo.svelte-1et49rg{display:flex;align-items:center}.logo-image.svelte-1et49rg{height:40px;width:auto}.menu-button.svelte-1et49rg{display:none;background:none;border:none;color:rgba(255, 255, 255, 0.8);cursor:pointer;padding:0.5rem;margin-right:1rem;border-radius:4px;transition:background-color 0.2s}.menu-button.svelte-1et49rg:hover{background-color:rgba(255, 255, 255, 0.1)}@media(max-width: 1024px){.menu-button.svelte-1et49rg{display:block}}.right.svelte-1et49rg{display:flex;align-items:center;gap:1rem}",
      map: '{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { browser } from \\"$app/environment\\";\\nimport { sidebarOpen } from \\"$lib/stores/sidebar\\";\\nimport { writable } from \\"svelte/store\\";\\nimport ThemeToggle from \\"./ThemeToggle.svelte\\";\\nlet isDarkMode = false;\\nfunction updateLogo() {\\n  isDarkMode = !document.documentElement.classList.contains(\\"dark-mode\\");\\n}\\nimport { onMount } from \\"svelte\\";\\nonMount(() => {\\n  updateLogo();\\n  const observer = new MutationObserver(updateLogo);\\n  observer.observe(document.documentElement, {\\n    attributes: true,\\n    attributeFilter: [\\"class\\"]\\n  });\\n  return () => observer.disconnect();\\n});\\nfunction toggleSidebar() {\\n  sidebarOpen.update((value) => !value);\\n}\\n<\/script>\\n\\n<header class=\\"header\\">\\n  <button class=\\"menu-button\\" on:click={toggleSidebar}>\\n    <svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n      <line x1=\\"3\\" y1=\\"12\\" x2=\\"21\\" y2=\\"12\\"></line>\\n      <line x1=\\"3\\" y1=\\"6\\" x2=\\"21\\" y2=\\"6\\"></line>\\n      <line x1=\\"3\\" y1=\\"18\\" x2=\\"21\\" y2=\\"18\\"></line>\\n    </svg>\\n  </button>\\n  <div class=\\"left\\">\\n    <div class=\\"logo\\">\\n      <a href=\\"https://docs.detrade.fund\\" class=\\"logo-link no-arrow\\">\\n        <img \\n          src={isDarkMode ? \\"/detrade-logo-text.png\\" : \\"/detrade-logo-text-black.webp\\"} \\n          alt=\\"DeTrade\\" \\n          class=\\"logo-image\\" \\n        />\\n      </a>\\n    </div>\\n  </div>\\n\\n  <div class=\\"right\\">\\n    <ThemeToggle />\\n  </div>\\n</header>\\n\\n<style>\\n  .header {\\n    height: 60px;\\n    border-bottom: 1px solid var(--border-color);\\n    display: flex;\\n    align-items: center;\\n    justify-content: space-between;\\n    padding: 0 1.5rem;\\n    background-color: var(--header-background);\\n    backdrop-filter: blur(10px);\\n    position: fixed;\\n    top: 0;\\n    right: 0;\\n    left: 0;\\n    z-index: 200;\\n    color: var(--header-text);\\n  }\\n\\n  .logo {\\n    display: flex;\\n    align-items: center;\\n  }\\n\\n  .logo-image {\\n    height: 40px;\\n    width: auto;\\n  }\\n\\n  .menu-button {\\n    display: none;\\n    background: none;\\n    border: none;\\n    color: rgba(255, 255, 255, 0.8);\\n    cursor: pointer;\\n    padding: 0.5rem;\\n    margin-right: 1rem;\\n    border-radius: 4px;\\n    transition: background-color 0.2s;\\n  }\\n\\n  .menu-button:hover {\\n    background-color: rgba(255, 255, 255, 0.1);\\n  }\\n\\n  /* Styles pour mobile */\\n  @media (max-width: 1024px) {\\n    .menu-button {\\n      display: block;\\n    }\\n  }\\n\\n  .right {\\n    display: flex;\\n    align-items: center;\\n    gap: 1rem;\\n  }\\n</style> "],"names":[],"mappings":"AAiDE,sBAAQ,CACN,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,cAAc,CAAC,CAC5C,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,CAC9B,OAAO,CAAE,CAAC,CAAC,MAAM,CACjB,gBAAgB,CAAE,IAAI,mBAAmB,CAAC,CAC1C,eAAe,CAAE,KAAK,IAAI,CAAC,CAC3B,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,CAAC,CACR,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,GAAG,CACZ,KAAK,CAAE,IAAI,aAAa,CAC1B,CAEA,oBAAM,CACJ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MACf,CAEA,0BAAY,CACV,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IACT,CAEA,2BAAa,CACX,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC/B,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,MAAM,CACf,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,gBAAgB,CAAC,IAC/B,CAEA,2BAAY,MAAO,CACjB,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC3C,CAGA,MAAO,YAAY,MAAM,CAAE,CACzB,2BAAa,CACX,OAAO,CAAE,KACX,CACF,CAEA,qBAAO,CACL,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IACP"}'
    };
    Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$1);
      return `<header class="header svelte-1et49rg"><button class="menu-button svelte-1et49rg" data-svelte-h="svelte-l5qie4"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button> <div class="left"><div class="logo svelte-1et49rg"><a href="https://docs.detrade.fund" class="logo-link no-arrow"><img${add_attribute(
        "src",
        "/detrade-logo-text-black.webp",
        0
      )} alt="DeTrade" class="logo-image svelte-1et49rg"></a></div></div> <div class="right svelte-1et49rg">${validate_component(ThemeToggle, "ThemeToggle").$$render($$result, {}, {}, {})}</div> </header>`;
    });
    css = {
      code: "body{background-color:var(--background-color);color:var(--text-color);margin:0;padding:0}*{box-sizing:border-box}.layout.svelte-1uz0q3v.svelte-1uz0q3v{display:flex;min-height:100vh}.main-container.svelte-1uz0q3v.svelte-1uz0q3v{flex:1;margin-left:300px;transition:margin-left 0.3s ease}.content.svelte-1uz0q3v.svelte-1uz0q3v{margin-top:60px;min-height:calc(100vh - 60px);max-width:1200px;margin:60px auto 0;padding:3rem}main.svelte-1uz0q3v.svelte-1uz0q3v{flex:1;transition:margin-left 0.3s ease}.sidebar-closed.svelte-1uz0q3v main.svelte-1uz0q3v{margin-left:0}@media(max-width: 1024px){.main-container.svelte-1uz0q3v.svelte-1uz0q3v{margin-left:0}}@media(max-width: 768px){.content.svelte-1uz0q3v.svelte-1uz0q3v{padding:1.5rem}}.card{background-color:var(--card-background);border:1px solid var(--card-border)}a{color:var(--link-color)}a:hover{color:var(--link-hover)}pre,code{background-color:var(--code-background);color:var(--code-text)}h1,h2,h3,h4,h5,h6{color:var(--text-color)}p,span,div{color:var(--text-color)}",
      map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { browser } from \\"$app/environment\\";\\nimport { sidebarOpen } from \\"$lib/stores/sidebar\\";\\nimport Sidebar from \\"$lib/components/Sidebar.svelte\\";\\nimport Header from \\"$lib/components/Header.svelte\\";\\nimport \\"../app.css\\";\\nimport ThemeToggle from \\"$lib/components/ThemeToggle.svelte\\";\\nimport { page } from \\"$app/stores\\";\\n<\/script>\\n\\n<svelte:head>\\n  <title>{$page.data.title || 'Documentation'}</title>\\n  <meta name=\\"description\\" content={$page.data.description || 'Documentation'} />\\n</svelte:head>\\n\\n<div class=\\"layout\\" class:sidebar-closed={!$sidebarOpen}>\\n  <Sidebar />\\n  <div class=\\"main-container\\">\\n    <Header />\\n    <main class=\\"content\\">\\n      <slot />\\n    </main>\\n  </div>\\n</div>\\n\\n<ThemeToggle />\\n\\n<style>\\n  :global(body) {\\n    background-color: var(--background-color);\\n    color: var(--text-color);\\n    margin: 0;\\n    padding: 0;\\n  }\\n\\n  :global(*) {\\n    box-sizing: border-box;\\n  }\\n\\n  .layout {\\n    display: flex;\\n    min-height: 100vh;\\n  }\\n\\n  .main-container {\\n    flex: 1;\\n    margin-left: 300px;\\n    transition: margin-left 0.3s ease;\\n  }\\n\\n  .content {\\n    margin-top: 60px;\\n    min-height: calc(100vh - 60px);\\n    max-width: 1200px;\\n    margin: 60px auto 0;\\n    padding: 3rem;\\n  }\\n\\n  main {\\n    flex: 1;\\n    transition: margin-left 0.3s ease;\\n  }\\n\\n  .sidebar-closed main {\\n    margin-left: 0;\\n  }\\n\\n  @media (max-width: 1024px) {\\n    .main-container {\\n      margin-left: 0;\\n    }\\n  }\\n\\n  @media (max-width: 768px) {\\n    .content {\\n      padding: 1.5rem;\\n    }\\n  }\\n\\n  :global(.card) {\\n    background-color: var(--card-background);\\n    border: 1px solid var(--card-border);\\n  }\\n\\n  :global(a) {\\n    color: var(--link-color);\\n  }\\n\\n  :global(a:hover) {\\n    color: var(--link-hover);\\n  }\\n\\n  :global(pre), :global(code) {\\n    background-color: var(--code-background);\\n    color: var(--code-text);\\n  }\\n\\n  :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {\\n    color: var(--text-color);\\n  }\\n\\n  :global(p), :global(span), :global(div) {\\n    color: var(--text-color);\\n  }\\n</style> "],"names":[],"mappings":"AA2BU,IAAM,CACZ,gBAAgB,CAAE,IAAI,kBAAkB,CAAC,CACzC,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CACX,CAEQ,CAAG,CACT,UAAU,CAAE,UACd,CAEA,qCAAQ,CACN,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,KACd,CAEA,6CAAgB,CACd,IAAI,CAAE,CAAC,CACP,WAAW,CAAE,KAAK,CAClB,UAAU,CAAE,WAAW,CAAC,IAAI,CAAC,IAC/B,CAEA,sCAAS,CACP,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9B,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,CAAC,CACnB,OAAO,CAAE,IACX,CAEA,kCAAK,CACH,IAAI,CAAE,CAAC,CACP,UAAU,CAAE,WAAW,CAAC,IAAI,CAAC,IAC/B,CAEA,8BAAe,CAAC,mBAAK,CACnB,WAAW,CAAE,CACf,CAEA,MAAO,YAAY,MAAM,CAAE,CACzB,6CAAgB,CACd,WAAW,CAAE,CACf,CACF,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,sCAAS,CACP,OAAO,CAAE,MACX,CACF,CAEQ,KAAO,CACb,gBAAgB,CAAE,IAAI,iBAAiB,CAAC,CACxC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CACrC,CAEQ,CAAG,CACT,KAAK,CAAE,IAAI,YAAY,CACzB,CAEQ,OAAS,CACf,KAAK,CAAE,IAAI,YAAY,CACzB,CAEQ,GAAI,CAAU,IAAM,CAC1B,gBAAgB,CAAE,IAAI,iBAAiB,CAAC,CACxC,KAAK,CAAE,IAAI,WAAW,CACxB,CAEQ,EAAG,CAAU,EAAG,CAAU,EAAG,CAAU,EAAG,CAAU,EAAG,CAAU,EAAI,CAC3E,KAAK,CAAE,IAAI,YAAY,CACzB,CAEQ,CAAE,CAAU,IAAK,CAAU,GAAK,CACtC,KAAK,CAAE,IAAI,YAAY,CACzB"}`
    };
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      let $sidebarOpen, $$unsubscribe_sidebarOpen;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_sidebarOpen = subscribe(sidebarOpen, (value) => $sidebarOpen = value);
      $$result.css.add(css);
      $$unsubscribe_page();
      $$unsubscribe_sidebarOpen();
      return `${$$result.head += `<!-- HEAD_svelte-1qduel1_START -->${$$result.title = `<title>${escape($page.data.title || "Documentation")}</title>`, ""}<meta name="description"${add_attribute("content", $page.data.description || "Documentation", 0)}><!-- HEAD_svelte-1qduel1_END -->`, ""} <div class="${["layout svelte-1uz0q3v", !$sidebarOpen ? "sidebar-closed" : ""].join(" ").trim()}">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})} <div class="main-container svelte-1uz0q3v">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="content svelte-1uz0q3v">${slots.default ? slots.default({}) : ``}</main></div></div> ${validate_component(ThemeToggle, "ThemeToggle").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    imports = ["_app/immutable/nodes/0.BvR8vjZY.js", "_app/immutable/chunks/DipVNbI1.js", "_app/immutable/chunks/6iab5EmN.js", "_app/immutable/chunks/C1OJwcYb.js", "_app/immutable/chunks/6H5cVCmN.js"];
    stylesheets = ["_app/immutable/assets/0.CNIdX93u.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_ssr();
    init_stores();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ?? (component_cache2 = (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default);
    imports2 = ["_app/immutable/nodes/1.CeQc7Rwe.js", "_app/immutable/chunks/DipVNbI1.js", "_app/immutable/chunks/6iab5EmN.js", "_app/immutable/chunks/6H5cVCmN.js", "_app/immutable/chunks/C1OJwcYb.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_page.ts.js
var page_ts_exports = {};
__export(page_ts_exports, {
  load: () => load
});
function load() {
  return {
    title: "Overview \u2013 DeTrade",
    description: "Learn about DeTrade's protocol, vaults, and investment strategies for optimized DeFi yields."
  };
}
var init_page_ts = __esm({
  ".svelte-kit/output/server/entries/pages/_page.ts.js"() {
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var css2, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_ssr();
    init_stores();
    css2 = {
      code: ".overview-content.svelte-qe8n06.svelte-qe8n06{max-width:1200px;margin:0 auto;padding:2rem;color:var(--text-color)}.banner-container.svelte-qe8n06.svelte-qe8n06{width:100%;margin-bottom:2rem;overflow:hidden;border-radius:16px}.banner-image.svelte-qe8n06.svelte-qe8n06{width:100%;height:auto;object-fit:cover;display:block}.title-container.svelte-qe8n06.svelte-qe8n06{margin-bottom:3rem}h1.svelte-qe8n06.svelte-qe8n06{font-size:2.25rem;font-weight:700;margin-bottom:0.75rem;color:var(--text-color);display:flex;align-items:center;gap:1rem}h2.svelte-qe8n06.svelte-qe8n06{font-size:1.5rem;font-weight:600;margin-bottom:1.25rem;color:var(--text-color)}.features-grid.svelte-qe8n06.svelte-qe8n06{display:flex;flex-direction:column;gap:2rem;margin-top:2rem}.feature-card.svelte-qe8n06.svelte-qe8n06{background:var(--card-background);border:1px solid var(--card-border);border-radius:16px;padding:1.5rem;transition:transform 0.2s, background-color 0.2s;display:flex;flex-direction:column;width:100%}.feature-card.svelte-qe8n06.svelte-qe8n06:hover{transform:translateY(-5px);background:var(--secondary-background)}.feature-content.svelte-qe8n06.svelte-qe8n06{width:100%}p.svelte-qe8n06.svelte-qe8n06{font-size:0.95rem;line-height:1.6;margin:0;color:var(--text-color);opacity:0.8}.overview-description.svelte-qe8n06.svelte-qe8n06{font-size:1.1rem;color:var(--text-color);opacity:0.7;margin:0.5rem 0;line-height:1.5}@media(max-width: 768px){.overview-content.svelte-qe8n06.svelte-qe8n06{padding:1rem}.banner-container.svelte-qe8n06.svelte-qe8n06{margin-bottom:1.5rem}h1.svelte-qe8n06.svelte-qe8n06{font-size:2rem}.overview-description.svelte-qe8n06.svelte-qe8n06{font-size:1rem}p.svelte-qe8n06.svelte-qe8n06{font-size:1rem}}svg{transition:all 0.3s ease;stroke:var(--text-color)}svg path,svg line,svg circle,svg polyline,svg rect{transition:all 0.3s ease;stroke:var(--text-color)}h1.svelte-qe8n06 svg.svelte-qe8n06{color:var(--text-color);stroke:currentColor;transition:all 0.3s ease}",
      map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { page } from \\"$app/stores\\";\\nlet currentHash = \\"\\";\\nonMount(() => {\\n  currentHash = window.location.hash.slice(1);\\n  window.addEventListener(\\"hashchange\\", () => {\\n    currentHash = window.location.hash.slice(1);\\n    updateMetaTags();\\n  });\\n  return () => {\\n    window.removeEventListener(\\"hashchange\\", () => {\\n    });\\n  };\\n});\\nfunction updateMetaTags() {\\n  let title = \\"\\";\\n  let description = \\"\\";\\n  switch (currentHash) {\\n    case \\"simplify\\":\\n      title = \\"Simplify Your DeFi Journey \\\\u2013 DeTrade\\";\\n      description = \\"Learn how DeTrade simplifies your DeFi experience with optimized yield strategies.\\";\\n      break;\\n    case \\"expertise\\":\\n      title = \\"Expertise You Can Trust \\\\u2013 DeTrade\\";\\n      description = \\"Discover DeTrade's experienced team of DeFi analysts and investors.\\";\\n      break;\\n    case \\"vision\\":\\n      title = \\"Our Vision \\\\u2013 DeTrade\\";\\n      description = \\"Understand DeTrade's vision for delivering optimized returns through diversified DeFi strategies.\\";\\n      break;\\n    default:\\n      title = $page.data.title;\\n      description = $page.data.description;\\n  }\\n  document.title = title;\\n  const metaTags = {\\n    'meta[name=\\"description\\"]': description,\\n    'meta[property=\\"og:title\\"]': title,\\n    'meta[property=\\"og:description\\"]': description,\\n    'meta[name=\\"twitter:title\\"]': title,\\n    'meta[name=\\"twitter:description\\"]': description\\n  };\\n  Object.entries(metaTags).forEach(([selector, content]) => {\\n    const element = document.querySelector(selector);\\n    if (element) element.setAttribute(\\"content\\", content);\\n  });\\n}\\n<\/script>\\n\\n<svelte:head>\\n  <title>{currentHash === 'simplify' ? 'Simplify Your DeFi Journey \u2013 DeTrade' : \\n          currentHash === 'expertise' ? 'Expertise You Can Trust \u2013 DeTrade' :\\n          currentHash === 'vision' ? 'Our Vision \u2013 DeTrade' : \\n          $page.data.title}</title>\\n  \\n  <meta name=\\"description\\" content={currentHash === 'simplify' ? \\n    \\"Learn how DeTrade simplifies your DeFi experience with optimized yield strategies.\\" :\\n    currentHash === 'expertise' ? \\n    \\"Discover DeTrade's experienced team of DeFi analysts and investors.\\" :\\n    currentHash === 'vision' ? \\n    \\"Understand DeTrade's vision for delivering optimized returns through diversified DeFi strategies.\\" :\\n    $page.data.description} />\\n  \\n  <meta property=\\"og:title\\" content={currentHash === 'simplify' ? 'Simplify Your DeFi Journey \u2013 DeTrade' : \\n          currentHash === 'expertise' ? 'Expertise You Can Trust \u2013 DeTrade' :\\n          currentHash === 'vision' ? 'Our Vision \u2013 DeTrade' : \\n          $page.data.title} />\\n  \\n  <meta property=\\"og:description\\" content={currentHash === 'simplify' ? \\n    \\"Learn how DeTrade simplifies your DeFi experience with optimized yield strategies.\\" :\\n    currentHash === 'expertise' ? \\n    \\"Discover DeTrade's experienced team of DeFi analysts and investors.\\" :\\n    currentHash === 'vision' ? \\n    \\"Understand DeTrade's vision for delivering optimized returns through diversified DeFi strategies.\\" :\\n    $page.data.description} />\\n  \\n  <meta name=\\"twitter:title\\" content={currentHash === 'simplify' ? 'Simplify Your DeFi Journey \u2013 DeTrade' : \\n          currentHash === 'expertise' ? 'Expertise You Can Trust \u2013 DeTrade' :\\n          currentHash === 'vision' ? 'Our Vision \u2013 DeTrade' : \\n          $page.data.title} />\\n  \\n  <meta name=\\"twitter:description\\" content={currentHash === 'simplify' ? \\n    \\"Learn how DeTrade simplifies your DeFi experience with optimized yield strategies.\\" :\\n    currentHash === 'expertise' ? \\n    \\"Discover DeTrade's experienced team of DeFi analysts and investors.\\" :\\n    currentHash === 'vision' ? \\n    \\"Understand DeTrade's vision for delivering optimized returns through diversified DeFi strategies.\\" :\\n    $page.data.description} />\\n</svelte:head>\\n\\n<div class=\\"overview-content\\">\\n  <div class=\\"banner-container\\">\\n    <img src=\\"/banner.webp\\" alt=\\"DeTrade Banner\\" class=\\"banner-image\\" />\\n  </div>\\n\\n  <div class=\\"title-container\\">\\n    <h1>\\n      <svg width=\\"36\\" height=\\"36\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <path d=\\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\\"/>\\n        <path d=\\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\\"/>\\n      </svg>\\n      Overview\\n    </h1>\\n    <p class=\\"overview-description\\">Maximize your yields with DeTrade's secure, transparent, and decentralized vaults</p>\\n  </div>\\n  \\n  <div class=\\"features-grid\\">\\n    <section class=\\"feature-card\\">\\n      <h2>Simplify Your DeFi Journey</h2>\\n      <div class=\\"feature-content\\">\\n        <p>\\n          In the fast-paced and ever-evolving world of decentralized finance (DeFi), opportunities abound. \\n          However, navigating the countless projects and strategies can be complex and time-consuming. \\n          Staying informed, analyzing options, and making optimal decisions to maximize risk-adjusted yields \\n          for your assets requires both time and expertise. That's where DeTrade steps in, offering a \\n          solution designed to simplify your DeFi experience and make it effortless.\\n        </p>\\n      </div>\\n    </section>\\n\\n    <section class=\\"feature-card\\">\\n      <h2>Expertise You Can Trust</h2>\\n      <div class=\\"feature-content\\">\\n        <p>\\n          The DeTrade team is composed of highly experienced DeFi analysts, investors, and builders who \\n          are passionate about leveraging their knowledge to your advantage. With their deep understanding \\n          of the DeFi landscape, they've crafted a seamless way for you to benefit from their in-depth \\n          research and strategic insights. Through DeTrade's on-chain vaults, you can tap into their \\n          expertise and enjoy superior risk-adjusted yields without lifting a finger.\\n        </p>\\n      </div>\\n    </section>\\n\\n    <section class=\\"feature-card\\">\\n      <h2>A Vision for Optimized Returns</h2>\\n      <div class=\\"feature-content\\">\\n        <p>\\n          DeTrade's vision is clear: diversify funds across a variety of DeFi protocols and yield \\n          strategies to deliver the best possible risk-adjusted returns for users. By carefully selecting \\n          and managing opportunities within the ecosystem, the team ensures that your investments are \\n          positioned for success. This approach balances potential rewards with calculated risk, giving \\n          you peace of mind as you grow your assets.\\n        </p>\\n      </div>\\n    </section>\\n  </div>\\n</div>\\n\\n<style>\\n  .overview-content {\\n    max-width: 1200px;\\n    margin: 0 auto;\\n    padding: 2rem;\\n    color: var(--text-color);\\n  }\\n\\n  .banner-container {\\n    width: 100%;\\n    margin-bottom: 2rem;\\n    overflow: hidden;\\n    border-radius: 16px;\\n  }\\n\\n  .banner-image {\\n    width: 100%;\\n    height: auto;\\n    object-fit: cover;\\n    display: block;\\n  }\\n\\n  .title-container {\\n    margin-bottom: 3rem;\\n  }\\n\\n  h1 {\\n    font-size: 2.25rem;\\n    font-weight: 700;\\n    margin-bottom: 0.75rem;\\n    color: var(--text-color);\\n    display: flex;\\n    align-items: center;\\n    gap: 1rem;\\n  }\\n\\n  h2 {\\n    font-size: 1.5rem;\\n    font-weight: 600;\\n    margin-bottom: 1.25rem;\\n    color: var(--text-color);\\n  }\\n\\n  .features-grid {\\n    display: flex;\\n    flex-direction: column;\\n    gap: 2rem;\\n    margin-top: 2rem;\\n  }\\n\\n  .feature-card {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 16px;\\n    padding: 1.5rem;\\n    transition: transform 0.2s, background-color 0.2s;\\n    display: flex;\\n    flex-direction: column;\\n    width: 100%;\\n  }\\n\\n  .feature-card:hover {\\n    transform: translateY(-5px);\\n    background: var(--secondary-background);\\n  }\\n\\n  .feature-content {\\n    width: 100%;\\n  }\\n\\n  p {\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    margin: 0;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n  }\\n\\n  .overview-description {\\n    font-size: 1.1rem;\\n    color: var(--text-color);\\n    opacity: 0.7;\\n    margin: 0.5rem 0;\\n    line-height: 1.5;\\n  }\\n\\n  @media (max-width: 768px) {\\n    .overview-content {\\n      padding: 1rem;\\n    }\\n\\n    .banner-container {\\n      margin-bottom: 1.5rem;\\n    }\\n\\n    h1 {\\n      font-size: 2rem;\\n    }\\n\\n    .overview-description {\\n      font-size: 1rem;\\n    }\\n\\n    p {\\n      font-size: 1rem;\\n    }\\n  }\\n\\n  /* Ajout des transitions sp\xE9cifiques pour les SVG de la page */\\n  :global(svg) {\\n    transition: all 0.3s ease;\\n    stroke: var(--text-color);\\n  }\\n\\n  :global(svg path),\\n  :global(svg line),\\n  :global(svg circle),\\n  :global(svg polyline),\\n  :global(svg rect) {\\n    transition: all 0.3s ease;\\n    stroke: var(--text-color);\\n  }\\n\\n  /* Assurons-nous que les ic\xF4nes utilisent la couleur du texte */\\n  h1 svg,\\n  .feature-card svg {\\n    color: var(--text-color);\\n    stroke: currentColor;\\n    transition: all 0.3s ease;\\n  }\\n</style> "],"names":[],"mappings":"AAqJE,6CAAkB,CAChB,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,YAAY,CACzB,CAEA,6CAAkB,CAChB,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,IAAI,CACnB,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,IACjB,CAEA,yCAAc,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,KACX,CAEA,4CAAiB,CACf,aAAa,CAAE,IACjB,CAEA,8BAAG,CACD,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,OAAO,CACtB,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IACP,CAEA,8BAAG,CACD,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,OAAO,CACtB,KAAK,CAAE,IAAI,YAAY,CACzB,CAEA,0CAAe,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IAAI,CACT,UAAU,CAAE,IACd,CAEA,yCAAc,CACZ,UAAU,CAAE,IAAI,iBAAiB,CAAC,CAClC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,CACpC,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,MAAM,CACf,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,CAAC,gBAAgB,CAAC,IAAI,CACjD,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,KAAK,CAAE,IACT,CAEA,yCAAa,MAAO,CAClB,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,IAAI,sBAAsB,CACxC,CAEA,4CAAiB,CACf,KAAK,CAAE,IACT,CAEA,6BAAE,CACA,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,OAAO,CAAE,GACX,CAEA,iDAAsB,CACpB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,MAAM,CAAC,CAAC,CAChB,WAAW,CAAE,GACf,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,6CAAkB,CAChB,OAAO,CAAE,IACX,CAEA,6CAAkB,CAChB,aAAa,CAAE,MACjB,CAEA,8BAAG,CACD,SAAS,CAAE,IACb,CAEA,iDAAsB,CACpB,SAAS,CAAE,IACb,CAEA,6BAAE,CACA,SAAS,CAAE,IACb,CACF,CAGQ,GAAK,CACX,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,MAAM,CAAE,IAAI,YAAY,CAC1B,CAEQ,QAAS,CACT,QAAS,CACT,UAAW,CACX,YAAa,CACb,QAAU,CAChB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,MAAM,CAAE,IAAI,YAAY,CAC1B,CAGA,gBAAE,CAAC,iBACe,CAChB,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,MAAM,CAAE,YAAY,CACpB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACvB"}`
    };
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$result.css.add(css2);
      $$unsubscribe_page();
      return `${$$result.head += `<!-- HEAD_svelte-5fuu9r_START -->${$$result.title = `<title>${escape($page.data.title)}</title>`, ""}<meta name="description"${add_attribute(
        "content",
        $page.data.description,
        0
      )}><meta property="og:title"${add_attribute(
        "content",
        $page.data.title,
        0
      )}><meta property="og:description"${add_attribute(
        "content",
        $page.data.description,
        0
      )}><meta name="twitter:title"${add_attribute(
        "content",
        $page.data.title,
        0
      )}><meta name="twitter:description"${add_attribute(
        "content",
        $page.data.description,
        0
      )}><!-- HEAD_svelte-5fuu9r_END -->`, ""} <div class="overview-content svelte-qe8n06" data-svelte-h="svelte-tu6ile"><div class="banner-container svelte-qe8n06"><img src="/banner.webp" alt="DeTrade Banner" class="banner-image svelte-qe8n06"></div> <div class="title-container svelte-qe8n06"><h1 class="svelte-qe8n06"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-qe8n06"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
      Overview</h1> <p class="overview-description svelte-qe8n06">Maximize your yields with DeTrade&#39;s secure, transparent, and decentralized vaults</p></div> <div class="features-grid svelte-qe8n06"><section class="feature-card svelte-qe8n06"><h2 class="svelte-qe8n06">Simplify Your DeFi Journey</h2> <div class="feature-content svelte-qe8n06"><p class="svelte-qe8n06">In the fast-paced and ever-evolving world of decentralized finance (DeFi), opportunities abound. 
          However, navigating the countless projects and strategies can be complex and time-consuming. 
          Staying informed, analyzing options, and making optimal decisions to maximize risk-adjusted yields 
          for your assets requires both time and expertise. That&#39;s where DeTrade steps in, offering a 
          solution designed to simplify your DeFi experience and make it effortless.</p></div></section> <section class="feature-card svelte-qe8n06"><h2 class="svelte-qe8n06">Expertise You Can Trust</h2> <div class="feature-content svelte-qe8n06"><p class="svelte-qe8n06">The DeTrade team is composed of highly experienced DeFi analysts, investors, and builders who 
          are passionate about leveraging their knowledge to your advantage. With their deep understanding 
          of the DeFi landscape, they&#39;ve crafted a seamless way for you to benefit from their in-depth 
          research and strategic insights. Through DeTrade&#39;s on-chain vaults, you can tap into their 
          expertise and enjoy superior risk-adjusted yields without lifting a finger.</p></div></section> <section class="feature-card svelte-qe8n06"><h2 class="svelte-qe8n06">A Vision for Optimized Returns</h2> <div class="feature-content svelte-qe8n06"><p class="svelte-qe8n06">DeTrade&#39;s vision is clear: diversify funds across a variety of DeFi protocols and yield 
          strategies to deliver the best possible risk-adjusted returns for users. By carefully selecting 
          and managing opportunities within the ecosystem, the team ensures that your investments are 
          positioned for success. This approach balances potential rewards with calculated risk, giving 
          you peace of mind as you grow your assets.</p></div></section></div> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3,
  universal: () => page_ts_exports,
  universal_id: () => universal_id
});
var index3, component_cache3, component3, universal_id, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_page_ts();
    index3 = 2;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    universal_id = "src/routes/+page.ts";
    imports3 = ["_app/immutable/nodes/2.BIwziGLE.js", "_app/immutable/chunks/DipVNbI1.js", "_app/immutable/chunks/6iab5EmN.js", "_app/immutable/chunks/D0QH3NT1.js", "_app/immutable/chunks/6H5cVCmN.js", "_app/immutable/chunks/C1OJwcYb.js"];
    stylesheets3 = ["_app/immutable/assets/2.B73UlsKm.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/faq/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var css3, Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/faq/_page.svelte.js"() {
    init_ssr();
    init_client();
    css3 = {
      code: '.content.svelte-2qqjnr.svelte-2qqjnr{max-width:1200px;margin:0 auto;padding:2rem;color:var(--text-color)}.title-container.svelte-2qqjnr.svelte-2qqjnr{margin-bottom:3rem}h1.svelte-2qqjnr.svelte-2qqjnr{font-size:2.25rem;font-weight:700;margin-bottom:0.75rem;color:var(--text-color);display:flex;align-items:center;gap:1rem}h1.svelte-2qqjnr svg.svelte-2qqjnr{color:var(--text-color);stroke:currentColor;transition:color 0.3s ease, stroke 0.3s ease}h2.svelte-2qqjnr.svelte-2qqjnr{font-size:1.5rem;font-weight:600;margin-bottom:1.25rem;color:var(--text-color)}.faq-section.svelte-2qqjnr.svelte-2qqjnr{margin-bottom:3rem;scroll-margin-top:100px}ul.svelte-2qqjnr.svelte-2qqjnr{list-style:none;padding-left:1.5rem;margin:1rem 0}li.svelte-2qqjnr.svelte-2qqjnr{position:relative;margin-bottom:0.75rem;font-size:0.95rem;color:var(--text-color);opacity:0.8;transition:color 0.3s ease}li.svelte-2qqjnr.svelte-2qqjnr::before{content:"\u2022";position:absolute;left:-1rem;color:var(--text-color);opacity:0.8;transition:color 0.3s ease}p.svelte-2qqjnr.svelte-2qqjnr{line-height:1.6;margin-bottom:1rem;color:var(--text-color);opacity:0.8;font-size:0.95rem;transition:color 0.3s ease}.note.svelte-2qqjnr.svelte-2qqjnr{font-style:italic;background:rgba(96, 165, 250, 0.1);border-radius:8px;padding:1rem;margin:1.5rem 0;color:var(--text-color);opacity:0.9;font-size:0.95rem;transition:color 0.3s ease}.note.svelte-2qqjnr.svelte-2qqjnr:hover{background:rgba(96, 165, 250, 0.15)}@media(max-width: 768px){.content.svelte-2qqjnr.svelte-2qqjnr{padding:1rem}h1.svelte-2qqjnr.svelte-2qqjnr{font-size:2rem}h2.svelte-2qqjnr.svelte-2qqjnr{font-size:1.5rem}}.faq-toggle.svelte-2qqjnr.svelte-2qqjnr{margin-bottom:1rem}.toggle-button.svelte-2qqjnr.svelte-2qqjnr{width:100%;display:flex;justify-content:space-between;align-items:center;padding:1rem;background:var(--card-background);border:1px solid var(--card-border);border-radius:8px;color:var(--text-color);font-size:1.05rem;font-weight:500;text-align:left;cursor:pointer;transition:all 0.2s ease}.toggle-button.svelte-2qqjnr.svelte-2qqjnr:hover{background:var(--secondary-background)}.toggle-button.active.svelte-2qqjnr.svelte-2qqjnr{border-bottom-left-radius:0;border-bottom-right-radius:0;background:var(--secondary-background)}.toggle-button.svelte-2qqjnr .arrow.svelte-2qqjnr{transition:transform 0.2s ease}.toggle-button.active.svelte-2qqjnr .arrow.svelte-2qqjnr{transform:rotate(180deg)}.toggle-content.svelte-2qqjnr.svelte-2qqjnr{padding:1rem;background:var(--card-background);border:1px solid var(--card-border);border-top:none;border-bottom-left-radius:8px;border-bottom-right-radius:8px;transition:background-color 0.3s ease, border-color 0.3s ease}.overview-description.svelte-2qqjnr.svelte-2qqjnr{font-size:1.1rem;color:var(--text-color);opacity:0.7;margin:0.5rem 0;line-height:1.5}',
      map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { page } from \\"$app/stores\\";\\nimport { slide } from \\"svelte/transition\\";\\nlet openSections = /* @__PURE__ */ new Set();\\nlet currentHash = \\"\\";\\nonMount(() => {\\n  currentHash = window.location.hash.slice(1);\\n  window.addEventListener(\\"hashchange\\", () => {\\n    currentHash = window.location.hash.slice(1);\\n    updateMetaTags();\\n  });\\n  return () => {\\n    window.removeEventListener(\\"hashchange\\", () => {\\n    });\\n  };\\n});\\nfunction toggleSection(id) {\\n  if (openSections.has(id)) {\\n    openSections.delete(id);\\n  } else {\\n    openSections.add(id);\\n  }\\n  openSections = openSections;\\n}\\nfunction updateMetaTags() {\\n  let title = \\"FAQ \\\\u2013 DeTrade\\";\\n  let description = \\"Find answers to frequently asked questions about DeTrade's protocol, vaults, and services.\\";\\n  switch (currentHash) {\\n    case \\"deposits-withdrawals\\":\\n      title = \\"Deposits & Withdrawals \\\\u2013 DeTrade\\";\\n      description = \\"Learn about DeTrade's deposit and withdrawal processes, cooldown periods, and settlement.\\";\\n      break;\\n    case \\"performance-metrics\\":\\n      title = \\"Performance & Metrics \\\\u2013 DeTrade\\";\\n      description = \\"Understand DeTrade's performance metrics, APR calculations, and vault valuations.\\";\\n      break;\\n    case \\"oracle\\":\\n      title = \\"Oracle \\\\u2013 DeTrade\\";\\n      description = \\"Learn about DeTrade's oracle system, price feeds, and valuation mechanisms.\\";\\n      break;\\n  }\\n  document.title = title;\\n  const metaDescription = document.querySelector('meta[name=\\"description\\"]');\\n  const ogTitle = document.querySelector('meta[property=\\"og:title\\"]');\\n  const ogDescription = document.querySelector('meta[property=\\"og:description\\"]');\\n  const twitterTitle = document.querySelector('meta[name=\\"twitter:title\\"]');\\n  const twitterDescription = document.querySelector('meta[name=\\"twitter:description\\"]');\\n  if (metaDescription) metaDescription.setAttribute(\\"content\\", description);\\n  if (ogTitle) ogTitle.setAttribute(\\"content\\", title);\\n  if (ogDescription) ogDescription.setAttribute(\\"content\\", description);\\n  if (twitterTitle) twitterTitle.setAttribute(\\"content\\", title);\\n  if (twitterDescription) twitterDescription.setAttribute(\\"content\\", description);\\n}\\n<\/script>\\n\\n<svelte:head>\\n  <title>{currentHash === 'deposits-withdrawals' ? 'Deposits & Withdrawals \u2013 DeTrade' : \\n          currentHash === 'performance-metrics' ? 'Performance & Metrics \u2013 DeTrade' :\\n          currentHash ? \`\${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} \u2013 DeTrade\` : \\n          'FAQ \u2013 DeTrade'}</title>\\n  <meta name=\\"description\\" content=\\"Find answers to frequently asked questions about DeTrade's protocol, vaults, and services.\\" />\\n  <meta property=\\"og:title\\" content={currentHash === 'deposits-withdrawals' ? 'Deposits & Withdrawals \u2013 DeTrade' : \\n                                   currentHash === 'performance-metrics' ? 'Performance & Metrics \u2013 DeTrade' :\\n                                   currentHash ? \`\${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} \u2013 DeTrade\` : \\n                                   'FAQ \u2013 DeTrade'} />\\n  <meta property=\\"og:description\\" content=\\"Find answers to frequently asked questions about DeTrade's protocol, vaults, and services.\\" />\\n  <meta name=\\"twitter:title\\" content={currentHash === 'deposits-withdrawals' ? 'Deposits & Withdrawals \u2013 DeTrade' : \\n                                    currentHash === 'performance-metrics' ? 'Performance & Metrics \u2013 DeTrade' :\\n                                    currentHash ? \`\${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} \u2013 DeTrade\` : \\n                                    'FAQ \u2013 DeTrade'} />\\n  <meta name=\\"twitter:description\\" content=\\"Find answers to frequently asked questions about DeTrade's protocol, vaults, and services.\\" />\\n</svelte:head>\\n\\n<div class=\\"content\\">\\n  <div class=\\"title-container\\">\\n    <h1>\\n      <svg width=\\"36\\" height=\\"36\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <circle cx=\\"12\\" cy=\\"12\\" r=\\"10\\"/>\\n        <path d=\\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\\"/>\\n        <line x1=\\"12\\" y1=\\"17\\" x2=\\"12.01\\" y2=\\"17\\"/>\\n      </svg>\\n      Frequently Asked Questions\\n    </h1>\\n    <p class=\\"overview-description\\">Find answers to common questions about DeTrade's protocol, vaults, and services</p>\\n  </div>\\n\\n  <div class=\\"faq-sections\\">\\n    <section class=\\"faq-section\\" id=\\"deposits-withdrawals\\">\\n      <h2>Deposits & Withdrawals</h2>\\n      \\n      <div class=\\"faq-toggle\\">\\n        <button \\n          class=\\"toggle-button\\" \\n          class:active={openSections.has('cooldown-deposit')}\\n          on:click={() => toggleSection('cooldown-deposit')}\\n        >\\n          <span>Why is there a cooldown when depositing?</span>\\n          <svg class=\\"arrow\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n            <path d=\\"M6 9l6 6 6-6\\"/>\\n          </svg>\\n        </button>\\n        \\n        {#if openSections.has('cooldown-deposit')}\\n          <div class=\\"toggle-content\\" transition:slide>\\n            <p>When you deposit funds, DeTrade needs a short delay (max 24h but usually less) to effectively manage and allocate your assets to the best opportunities across DeFi. This cooldown allows to:</p>\\n            <ul>\\n              <li>Enhance security by manually processing all incoming funds</li>\\n              <li>Determine where new funds are going into the current strategy</li>\\n              <li>Calculate the Net Asset Value (NAV) to set the new price per share</li>\\n              <li>Proceed to the settlement to process deposits at the new share price and NAV</li>\\n            </ul>\\n          </div>\\n        {/if}\\n      </div>\\n\\n      <div class=\\"faq-toggle\\">\\n        <button \\n          class=\\"toggle-button\\" \\n          class:active={openSections.has('cooldown-withdrawal')}\\n          on:click={() => toggleSection('cooldown-withdrawal')}\\n        >\\n          <span>Why is there a cooldown when withdrawing?</span>\\n          <svg class=\\"arrow\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n            <path d=\\"M6 9l6 6 6-6\\"/>\\n          </svg>\\n        </button>\\n        \\n        {#if openSections.has('cooldown-withdrawal')}\\n          <div class=\\"toggle-content\\" transition:slide>\\n            <p>When you request a withdrawal, DeTrade need a brief delay (max 24h but usually less) to unwind positions and match withdrawal requests. This cooldown is necessary to:</p>\\n            <ul>\\n              <li>Ensure security by manually processing all outgoing funds, allowing us to monitor and prevent any suspicious activity.</li>\\n              <li>Exit positions strategically to maximize returns.</li>\\n              <li>Calculate the Net Asset Value (NAV) thanks to DeTrade Oracle to set the new price per share.</li>\\n              <li>Proceed to the settlement to process withdrawals at the new share price and NAV.</li>\\n            </ul>\\n          </div>\\n        {/if}\\n      </div>\\n    </section>\\n\\n    <section class=\\"faq-section\\" id=\\"performance-metrics\\">\\n      <h2>Performance & Metrics</h2>\\n\\n      <div class=\\"faq-toggle\\">\\n        <button \\n          class=\\"toggle-button\\" \\n          class:active={openSections.has('drawdowns')}\\n          on:click={() => toggleSection('drawdowns')}\\n        >\\n          <span>Why vaults can experience drawdowns over time?</span>\\n          <svg class=\\"arrow\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n            <path d=\\"M6 9l6 6 6-6\\"/>\\n          </svg>\\n        </button>\\n        \\n        {#if openSections.has('drawdowns')}\\n          <div class=\\"toggle-content\\" transition:slide>\\n            <p>Drawdowns in the vault are typically temporary and very limited in %. They can occur for a couple of reasons:</p>\\n            \\n            <ul>\\n              <li>\\n                <strong>Price Variations</strong><br>\\n                Assets with maturity yields (PT tokens from Pendle/Spectra) may experience price fluctuations before maturity. However, these variations are temporary since we secure a fixed yield that will be realized over maturity. We avoid selling these assets before maturity unless necessary due to significant withdrawals.\\n              </li>\\n              \\n              <li>\\n                <strong>Assets Depeg</strong><br>\\n                DeTrade invest in many pegged assets (stablecoins, staked tokens, LSTs, LRTs\u2026) that may temporarily lose their peg, causing a short-term drawdown.\\n              </li>\\n            </ul>\\n            \\n            <div class=\\"note\\">\\n              \u{1F4A1} DeTrade recommends maintaining a medium to long-term investment horizon to benefit fully from these strategies and minimize the impact of temporary drawdowns.\\n            </div>\\n          </div>\\n        {/if}\\n      </div>\\n\\n      <div class=\\"faq-toggle\\">\\n        <button \\n          class=\\"toggle-button\\" \\n          class:active={openSections.has('nav')}\\n          on:click={() => toggleSection('nav')}\\n        >\\n          <span>What is the Net Asset Value (NAV)?</span>\\n          <svg class=\\"arrow\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n            <path d=\\"M6 9l6 6 6-6\\"/>\\n          </svg>\\n        </button>\\n        \\n        {#if openSections.has('nav')}\\n          <div class=\\"toggle-content\\" transition:slide>\\n            <p>The Net Asset Value (NAV) represents the total value of assets in the vault minus any debts. It is used to determine the price per share for users depositing or withdrawing from the vault. Essentially, NAV helps calculate the value of your investment within the vault.</p>\\n          </div>\\n        {/if}\\n      </div>\\n\\n      <div class=\\"faq-toggle\\">\\n        <button \\n          class=\\"toggle-button\\" \\n          class:active={openSections.has('projected-apr')}\\n          on:click={() => toggleSection('projected-apr')}\\n        >\\n          <span>What is the Projected APR?</span>\\n          <svg class=\\"arrow\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n            <path d=\\"M6 9l6 6 6-6\\"/>\\n          </svg>\\n        </button>\\n        \\n        {#if openSections.has('projected-apr')}\\n          <div class=\\"toggle-content\\" transition:slide>\\n            <p>The Projected APR represents the net return currently being generated by the strategy on the underlying (ex USDC for DeTrade Core USDC). This yield is determined by the allocation of funds across various DeFi protocols and may fluctuate based on market conditions and strategy adjustments.</p>\\n            <ul>\\n              <li>The Projected APR reflects the actual rate at which your capital earns returns after performance fees have been applied.</li>\\n              <li>The Projected APR may not always be fully reflected during valuation and settlement events, as some returns are only realized once rewards are paid out and fixed-rate yield derivatives mature.</li>\\n            </ul>\\n          </div>\\n        {/if}\\n      </div>\\n\\n      <div class=\\"faq-toggle\\">\\n        <button \\n          class=\\"toggle-button\\" \\n          class:active={openSections.has('realized-apr')}\\n          on:click={() => toggleSection('realized-apr')}\\n        >\\n          <span>What is the 30d Realized APR?</span>\\n          <svg class=\\"arrow\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n            <path d=\\"M6 9l6 6 6-6\\"/>\\n          </svg>\\n        </button>\\n        \\n        {#if openSections.has('realized-apr')}\\n          <div class=\\"toggle-content\\" transition:slide>\\n            <p>The 30D Realized APR represents the average net return generated by the strategy on the underlying (ex USDC for DeTrade Core USDC) over the past 30 days. This metric provides a more stable view of the vault's performance by smoothing out short-term fluctuations.</p>\\n            <ul>\\n              <li>The 30D Realized APR is calculated based on the evolution of the share price, which is derived from the Net Asset Value (NAV) of the vault.</li>\\n              <li>As a result, it may differ from the vault's Projected APR.</li>\\n              <li>The calculation reflects actual realized returns after performance fees have been applied.</li>\\n            </ul>\\n            <p class=\\"note\\">\u{1F4A1} The 30D Realized APR may not reflect underlying returns due to factors such as reward distribution schedules or the maturity of fixed-rate yield derivatives.</p>\\n          </div>\\n        {/if}\\n      </div>\\n\\n      <div class=\\"faq-toggle\\">\\n        <button \\n          class=\\"toggle-button\\" \\n          class:active={openSections.has('price-per-share')}\\n          on:click={() => toggleSection('price-per-share')}\\n        >\\n          <span>What is the price per share?</span>\\n          <svg class=\\"arrow\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n            <path d=\\"M6 9l6 6 6-6\\"/>\\n          </svg>\\n        </button>\\n        \\n        {#if openSections.has('price-per-share')}\\n          <div class=\\"toggle-content\\" transition:slide>\\n            <p>The price per share is the value of one share in the vault, calculated by dividing the Net Asset Value (NAV) by the total number of outstanding shares. It represents the value of your investment on a per-share basis. (for instance, in DeTrade Core USDC vault, a share is 1 DTUSDC)</p>\\n          </div>\\n        {/if}\\n      </div>\\n    </section>\\n\\n    <section class=\\"faq-section\\" id=\\"oracle\\">\\n      <h2>Oracle</h2>\\n\\n      <div class=\\"faq-toggle\\">\\n        <button \\n          class=\\"toggle-button\\" \\n          class:active={openSections.has('oracle-work')}\\n          on:click={() => toggleSection('oracle-work')}\\n        >\\n          <span>How does the oracle work?</span>\\n          <svg class=\\"arrow\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n            <path d=\\"M6 9l6 6 6-6\\"/>\\n          </svg>\\n        </button>\\n        \\n        {#if openSections.has('oracle-work')}\\n          <div class=\\"toggle-content\\" transition:slide>\\n            <p>The oracle retrieves on-chain information about token balances, including both spot balances in the wallet and receipt tokens representing positions. Depending on the position type, pricing varies:</p>\\n            <ul>\\n              <li>For yield-bearing tokens, we directly fetch their value in the underlying token before converting it to the vault's underlying token.</li>\\n              <li>For more complex cases, we rely on specific APIs (e.g., Pendle's API).</li>\\n              <li>To calculate asset values while accounting for slippage, we simulate sell transactions via CowSwap and use their API to price assets.</li>\\n            </ul>\\n          </div>\\n        {/if}\\n      </div>\\n\\n      <div class=\\"faq-toggle\\">\\n        <button \\n          class=\\"toggle-button\\" \\n          class:active={openSections.has('oracle-accuracy')}\\n          on:click={() => toggleSection('oracle-accuracy')}\\n        >\\n          <span>Is the oracle accurate, and can errors occur?</span>\\n          <svg class=\\"arrow\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n            <path d=\\"M6 9l6 6 6-6\\"/>\\n          </svg>\\n        </button>\\n        \\n        {#if openSections.has('oracle-accuracy')}\\n          <div class=\\"toggle-content\\" transition:slide>\\n            <p>Yes, the oracle is accurate as it relies on on-chain data, but errors may occur if a centralized API (e.g., Pendle or CowSwap) is undergoing maintenance.</p>\\n            <div class=\\"note\\">\\n              \u{1F4A1} This doesn't pose significant issues, as final settlement values pushed to the blockchain are computed manually and undergo human verification to ensure consistency.\\n            </div>\\n          </div>\\n        {/if}\\n      </div>\\n\\n      <div class=\\"faq-toggle\\">\\n        <button \\n          class=\\"toggle-button\\" \\n          class:active={openSections.has('oracle-tracking')}\\n          on:click={() => toggleSection('oracle-tracking')}\\n        >\\n          <span>How can data be tracked, and what about transparency?</span>\\n          <svg class=\\"arrow\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n            <path d=\\"M6 9l6 6 6-6\\"/>\\n          </svg>\\n        </button>\\n        \\n        {#if openSections.has('oracle-tracking')}\\n          <div class=\\"toggle-content\\" transition:slide>\\n            <p>We provide a dedicated page at <a href=\\"https://oracle.detrade.fund\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">oracle.detrade.fund</a> that displays real-time oracle data, including:</p>\\n            <ul>\\n              <li>Calculated values and the methods used</li>\\n              <li>Total value and position breakdowns</li>\\n              <li>Conversion rates and data sources</li>\\n            </ul>\\n            <div class=\\"note\\">\\n              \u{1F4A1} In the future, the code will be made open-source on GitHub, enabling full visibility and verification of our approach.\\n            </div>\\n          </div>\\n        {/if}\\n      </div>\\n    </section>\\n  </div>\\n</div>\\n\\n<style>\\n  .content {\\n    max-width: 1200px;\\n    margin: 0 auto;\\n    padding: 2rem;\\n    color: var(--text-color);\\n  }\\n\\n  .title-container {\\n    margin-bottom: 3rem;\\n  }\\n\\n  h1 {\\n    font-size: 2.25rem;\\n    font-weight: 700;\\n    margin-bottom: 0.75rem;\\n    color: var(--text-color);\\n    display: flex;\\n    align-items: center;\\n    gap: 1rem;\\n  }\\n\\n  h1 svg {\\n    color: var(--text-color);\\n    stroke: currentColor;\\n    transition: color 0.3s ease, stroke 0.3s ease;\\n  }\\n\\n  h2 {\\n    font-size: 1.5rem;\\n    font-weight: 600;\\n    margin-bottom: 1.25rem;\\n    color: var(--text-color);\\n  }\\n\\n  h3 {\\n    font-size: 1.2rem;\\n    font-weight: 600;\\n    margin-bottom: 1rem;\\n    color: var(--text-color);\\n  }\\n\\n  h4 {\\n    font-size: 1rem;\\n    font-weight: 600;\\n    margin-bottom: 0.75rem;\\n    color: var(--text-color);\\n  }\\n\\n  .faq-section {\\n    margin-bottom: 3rem;\\n    scroll-margin-top: 100px;\\n  }\\n\\n  .highlight-box {\\n    background: rgba(96, 165, 250, 0.1);\\n    border: 1px solid var(--card-border);\\n    border-radius: 8px;\\n    padding: 1.25rem;\\n    margin: 1rem 0;\\n  }\\n\\n  .highlight-box:hover {\\n    background: rgba(96, 165, 250, 0.15);\\n  }\\n\\n  ul {\\n    list-style: none;\\n    padding-left: 1.5rem;\\n    margin: 1rem 0;\\n  }\\n\\n  li {\\n    position: relative;\\n    margin-bottom: 0.75rem;\\n    font-size: 0.95rem;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    transition: color 0.3s ease;\\n  }\\n\\n  li::before {\\n    content: \\"\u2022\\";\\n    position: absolute;\\n    left: -1rem;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    transition: color 0.3s ease;\\n  }\\n\\n  p {\\n    line-height: 1.6;\\n    margin-bottom: 1rem;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    font-size: 0.95rem;\\n    transition: color 0.3s ease;\\n  }\\n\\n  .note {\\n    font-style: italic;\\n    background: rgba(96, 165, 250, 0.1);\\n    border-radius: 8px;\\n    padding: 1rem;\\n    margin: 1.5rem 0;\\n    color: var(--text-color);\\n    opacity: 0.9;\\n    font-size: 0.95rem;\\n    transition: color 0.3s ease;\\n  }\\n\\n  .note:hover {\\n    background: rgba(96, 165, 250, 0.15);\\n  }\\n\\n  @media (max-width: 768px) {\\n    .content {\\n      padding: 1rem;\\n    }\\n\\n    h1 {\\n      font-size: 2rem;\\n    }\\n\\n    h2 {\\n      font-size: 1.5rem;\\n    }\\n  }\\n\\n  .faq-toggle {\\n    margin-bottom: 1rem;\\n  }\\n\\n  .toggle-button {\\n    width: 100%;\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    padding: 1rem;\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 8px;\\n    color: var(--text-color);\\n    font-size: 1.05rem;\\n    font-weight: 500;\\n    text-align: left;\\n    cursor: pointer;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .toggle-button:hover {\\n    background: var(--secondary-background);\\n  }\\n\\n  .toggle-button.active {\\n    border-bottom-left-radius: 0;\\n    border-bottom-right-radius: 0;\\n    background: var(--secondary-background);\\n  }\\n\\n  .toggle-button .arrow {\\n    transition: transform 0.2s ease;\\n  }\\n\\n  .toggle-button.active .arrow {\\n    transform: rotate(180deg);\\n  }\\n\\n  .toggle-content {\\n    padding: 1rem;\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-top: none;\\n    border-bottom-left-radius: 8px;\\n    border-bottom-right-radius: 8px;\\n    transition: background-color 0.3s ease, border-color 0.3s ease;\\n  }\\n\\n  .overview-description {\\n    font-size: 1.1rem;\\n    color: var(--text-color);\\n    opacity: 0.7;\\n    margin: 0.5rem 0;\\n    line-height: 1.5;\\n  }\\n</style> "],"names":[],"mappings":"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"}`
    };
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let openSections = /* @__PURE__ */ new Set();
      $$result.css.add(css3);
      return `${$$result.head += `<!-- HEAD_svelte-1od12hx_START -->${$$result.title = `<title>${escape("FAQ \u2013 DeTrade")}</title>`, ""}<meta name="description" content="Find answers to frequently asked questions about DeTrade's protocol, vaults, and services."><meta property="og:title"${add_attribute(
        "content",
        "FAQ \u2013 DeTrade",
        0
      )}><meta property="og:description" content="Find answers to frequently asked questions about DeTrade's protocol, vaults, and services."><meta name="twitter:title"${add_attribute(
        "content",
        "FAQ \u2013 DeTrade",
        0
      )}><meta name="twitter:description" content="Find answers to frequently asked questions about DeTrade's protocol, vaults, and services."><!-- HEAD_svelte-1od12hx_END -->`, ""} <div class="content svelte-2qqjnr"><div class="title-container svelte-2qqjnr" data-svelte-h="svelte-17i9g3w"><h1 class="svelte-2qqjnr"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-2qqjnr"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
      Frequently Asked Questions</h1> <p class="overview-description svelte-2qqjnr">Find answers to common questions about DeTrade&#39;s protocol, vaults, and services</p></div> <div class="faq-sections"><section class="faq-section svelte-2qqjnr" id="deposits-withdrawals"><h2 class="svelte-2qqjnr" data-svelte-h="svelte-1aah55b">Deposits &amp; Withdrawals</h2> <div class="faq-toggle svelte-2qqjnr"><button class="${[
        "toggle-button svelte-2qqjnr",
        openSections.has("cooldown-deposit") ? "active" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-1f8o36u"><span>Why is there a cooldown when depositing?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg></button> ${openSections.has("cooldown-deposit") ? `<div class="toggle-content svelte-2qqjnr" data-svelte-h="svelte-gn1k79"><p class="svelte-2qqjnr">When you deposit funds, DeTrade needs a short delay (max 24h but usually less) to effectively manage and allocate your assets to the best opportunities across DeFi. This cooldown allows to:</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr">Enhance security by manually processing all incoming funds</li> <li class="svelte-2qqjnr">Determine where new funds are going into the current strategy</li> <li class="svelte-2qqjnr">Calculate the Net Asset Value (NAV) to set the new price per share</li> <li class="svelte-2qqjnr">Proceed to the settlement to process deposits at the new share price and NAV</li></ul></div>` : ``}</div> <div class="faq-toggle svelte-2qqjnr"><button class="${[
        "toggle-button svelte-2qqjnr",
        openSections.has("cooldown-withdrawal") ? "active" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-1ceezsy"><span>Why is there a cooldown when withdrawing?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg></button> ${openSections.has("cooldown-withdrawal") ? `<div class="toggle-content svelte-2qqjnr" data-svelte-h="svelte-17qpo8n"><p class="svelte-2qqjnr">When you request a withdrawal, DeTrade need a brief delay (max 24h but usually less) to unwind positions and match withdrawal requests. This cooldown is necessary to:</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr">Ensure security by manually processing all outgoing funds, allowing us to monitor and prevent any suspicious activity.</li> <li class="svelte-2qqjnr">Exit positions strategically to maximize returns.</li> <li class="svelte-2qqjnr">Calculate the Net Asset Value (NAV) thanks to DeTrade Oracle to set the new price per share.</li> <li class="svelte-2qqjnr">Proceed to the settlement to process withdrawals at the new share price and NAV.</li></ul></div>` : ``}</div></section> <section class="faq-section svelte-2qqjnr" id="performance-metrics"><h2 class="svelte-2qqjnr" data-svelte-h="svelte-ocydrp">Performance &amp; Metrics</h2> <div class="faq-toggle svelte-2qqjnr"><button class="${["toggle-button svelte-2qqjnr", openSections.has("drawdowns") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-j2cgcj"><span>Why vaults can experience drawdowns over time?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg></button> ${openSections.has("drawdowns") ? `<div class="toggle-content svelte-2qqjnr" data-svelte-h="svelte-4xqgsa"><p class="svelte-2qqjnr">Drawdowns in the vault are typically temporary and very limited in %. They can occur for a couple of reasons:</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr"><strong>Price Variations</strong><br>
                Assets with maturity yields (PT tokens from Pendle/Spectra) may experience price fluctuations before maturity. However, these variations are temporary since we secure a fixed yield that will be realized over maturity. We avoid selling these assets before maturity unless necessary due to significant withdrawals.</li> <li class="svelte-2qqjnr"><strong>Assets Depeg</strong><br>
                DeTrade invest in many pegged assets (stablecoins, staked tokens, LSTs, LRTs\u2026) that may temporarily lose their peg, causing a short-term drawdown.</li></ul> <div class="note svelte-2qqjnr">\u{1F4A1} DeTrade recommends maintaining a medium to long-term investment horizon to benefit fully from these strategies and minimize the impact of temporary drawdowns.</div></div>` : ``}</div> <div class="faq-toggle svelte-2qqjnr"><button class="${["toggle-button svelte-2qqjnr", openSections.has("nav") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-y4zrov"><span>What is the Net Asset Value (NAV)?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg></button> ${openSections.has("nav") ? `<div class="toggle-content svelte-2qqjnr" data-svelte-h="svelte-ww43bg"><p class="svelte-2qqjnr">The Net Asset Value (NAV) represents the total value of assets in the vault minus any debts. It is used to determine the price per share for users depositing or withdrawing from the vault. Essentially, NAV helps calculate the value of your investment within the vault.</p></div>` : ``}</div> <div class="faq-toggle svelte-2qqjnr"><button class="${[
        "toggle-button svelte-2qqjnr",
        openSections.has("projected-apr") ? "active" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-cmpupc"><span>What is the Projected APR?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg></button> ${openSections.has("projected-apr") ? `<div class="toggle-content svelte-2qqjnr" data-svelte-h="svelte-1uvc8a4"><p class="svelte-2qqjnr">The Projected APR represents the net return currently being generated by the strategy on the underlying (ex USDC for DeTrade Core USDC). This yield is determined by the allocation of funds across various DeFi protocols and may fluctuate based on market conditions and strategy adjustments.</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr">The Projected APR reflects the actual rate at which your capital earns returns after performance fees have been applied.</li> <li class="svelte-2qqjnr">The Projected APR may not always be fully reflected during valuation and settlement events, as some returns are only realized once rewards are paid out and fixed-rate yield derivatives mature.</li></ul></div>` : ``}</div> <div class="faq-toggle svelte-2qqjnr"><button class="${[
        "toggle-button svelte-2qqjnr",
        openSections.has("realized-apr") ? "active" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-3ae3ft"><span>What is the 30d Realized APR?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg></button> ${openSections.has("realized-apr") ? `<div class="toggle-content svelte-2qqjnr" data-svelte-h="svelte-1fvm61x"><p class="svelte-2qqjnr">The 30D Realized APR represents the average net return generated by the strategy on the underlying (ex USDC for DeTrade Core USDC) over the past 30 days. This metric provides a more stable view of the vault&#39;s performance by smoothing out short-term fluctuations.</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr">The 30D Realized APR is calculated based on the evolution of the share price, which is derived from the Net Asset Value (NAV) of the vault.</li> <li class="svelte-2qqjnr">As a result, it may differ from the vault&#39;s Projected APR.</li> <li class="svelte-2qqjnr">The calculation reflects actual realized returns after performance fees have been applied.</li></ul> <p class="note svelte-2qqjnr">\u{1F4A1} The 30D Realized APR may not reflect underlying returns due to factors such as reward distribution schedules or the maturity of fixed-rate yield derivatives.</p></div>` : ``}</div> <div class="faq-toggle svelte-2qqjnr"><button class="${[
        "toggle-button svelte-2qqjnr",
        openSections.has("price-per-share") ? "active" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-11kv3w8"><span>What is the price per share?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg></button> ${openSections.has("price-per-share") ? `<div class="toggle-content svelte-2qqjnr" data-svelte-h="svelte-c7kevh"><p class="svelte-2qqjnr">The price per share is the value of one share in the vault, calculated by dividing the Net Asset Value (NAV) by the total number of outstanding shares. It represents the value of your investment on a per-share basis. (for instance, in DeTrade Core USDC vault, a share is 1 DTUSDC)</p></div>` : ``}</div></section> <section class="faq-section svelte-2qqjnr" id="oracle"><h2 class="svelte-2qqjnr" data-svelte-h="svelte-1fkzhd4">Oracle</h2> <div class="faq-toggle svelte-2qqjnr"><button class="${["toggle-button svelte-2qqjnr", openSections.has("oracle-work") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-1p0e6fh"><span>How does the oracle work?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg></button> ${openSections.has("oracle-work") ? `<div class="toggle-content svelte-2qqjnr" data-svelte-h="svelte-g2jxoa"><p class="svelte-2qqjnr">The oracle retrieves on-chain information about token balances, including both spot balances in the wallet and receipt tokens representing positions. Depending on the position type, pricing varies:</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr">For yield-bearing tokens, we directly fetch their value in the underlying token before converting it to the vault&#39;s underlying token.</li> <li class="svelte-2qqjnr">For more complex cases, we rely on specific APIs (e.g., Pendle&#39;s API).</li> <li class="svelte-2qqjnr">To calculate asset values while accounting for slippage, we simulate sell transactions via CowSwap and use their API to price assets.</li></ul></div>` : ``}</div> <div class="faq-toggle svelte-2qqjnr"><button class="${[
        "toggle-button svelte-2qqjnr",
        openSections.has("oracle-accuracy") ? "active" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-b1rqjb"><span>Is the oracle accurate, and can errors occur?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg></button> ${openSections.has("oracle-accuracy") ? `<div class="toggle-content svelte-2qqjnr" data-svelte-h="svelte-15ghao4"><p class="svelte-2qqjnr">Yes, the oracle is accurate as it relies on on-chain data, but errors may occur if a centralized API (e.g., Pendle or CowSwap) is undergoing maintenance.</p> <div class="note svelte-2qqjnr">\u{1F4A1} This doesn&#39;t pose significant issues, as final settlement values pushed to the blockchain are computed manually and undergo human verification to ensure consistency.</div></div>` : ``}</div> <div class="faq-toggle svelte-2qqjnr"><button class="${[
        "toggle-button svelte-2qqjnr",
        openSections.has("oracle-tracking") ? "active" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-12y2gm9"><span>How can data be tracked, and what about transparency?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg></button> ${openSections.has("oracle-tracking") ? `<div class="toggle-content svelte-2qqjnr" data-svelte-h="svelte-1tmttcs"><p class="svelte-2qqjnr">We provide a dedicated page at <a href="https://oracle.detrade.fund" target="_blank" rel="noopener noreferrer">oracle.detrade.fund</a> that displays real-time oracle data, including:</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr">Calculated values and the methods used</li> <li class="svelte-2qqjnr">Total value and position breakdowns</li> <li class="svelte-2qqjnr">Conversion rates and data sources</li></ul> <div class="note svelte-2qqjnr">\u{1F4A1} In the future, the code will be made open-source on GitHub, enabling full visibility and verification of our approach.</div></div>` : ``}</div></section></div> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => component_cache4 ?? (component_cache4 = (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default);
    imports4 = ["_app/immutable/nodes/3.ChD9gO3J.js", "_app/immutable/chunks/DipVNbI1.js", "_app/immutable/chunks/6iab5EmN.js", "_app/immutable/chunks/D0QH3NT1.js", "_app/immutable/chunks/C1OJwcYb.js"];
    stylesheets4 = ["_app/immutable/assets/3.CXRTC4M5.css"];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/framework/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var css4, Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/framework/_page.svelte.js"() {
    init_ssr();
    init_client();
    css4 = {
      code: '.content.svelte-j8q6nk.svelte-j8q6nk{max-width:1200px;margin:0 auto;padding:2rem;color:var(--text-color)}.overview-content.svelte-j8q6nk.svelte-j8q6nk{max-width:1200px;margin:0 auto;color:var(--text-color)}.title-container.svelte-j8q6nk.svelte-j8q6nk{margin-bottom:3rem}h1.svelte-j8q6nk.svelte-j8q6nk{font-size:2.25rem;font-weight:700;margin-bottom:0.75rem;color:var(--text-color);display:flex;align-items:center;gap:1rem}h2.svelte-j8q6nk.svelte-j8q6nk{font-size:1.5rem;font-weight:600;margin-bottom:1.5rem;color:var(--text-color);display:flex;align-items:center;gap:0.75rem}h1.svelte-j8q6nk svg.svelte-j8q6nk,h2.svelte-j8q6nk svg.svelte-j8q6nk{color:var(--text-color);stroke:currentColor;transition:color 0.3s ease, stroke 0.3s ease}.feature-card.svelte-j8q6nk.svelte-j8q6nk{background:var(--card-background);border:1px solid var(--card-border);border-radius:16px;padding:1.5rem;transition:transform 0.2s, background-color 0.2s;margin-bottom:1.5rem;width:100%;scroll-margin-top:80px}.feature-card.svelte-j8q6nk.svelte-j8q6nk:hover{transform:translateY(-5px);background:var(--secondary-background)}#terminology.svelte-j8q6nk.svelte-j8q6nk:hover,#architecture.svelte-j8q6nk.svelte-j8q6nk:hover{transform:none;background:var(--card-background)}.feature-content.svelte-j8q6nk.svelte-j8q6nk{width:100%}p.svelte-j8q6nk.svelte-j8q6nk{font-size:0.95rem;line-height:1.6;margin:0;color:var(--text-color);opacity:0.8}.overview-description.svelte-j8q6nk.svelte-j8q6nk{font-size:1.1rem;color:var(--text-color);opacity:0.7;margin:0.5rem 0 1.5rem 0;line-height:1.5}.framework-logo.svelte-j8q6nk.svelte-j8q6nk,img[src*="safe_white"].svelte-j8q6nk.svelte-j8q6nk,img[src*="lagoon"].svelte-j8q6nk.svelte-j8q6nk{width:32px;height:32px;object-fit:contain;padding:2px;filter:var(--svg-filter);transition:filter 0.3s ease}img[src*="safe_white"].svelte-j8q6nk.svelte-j8q6nk{transform:scale(1.25)}img[src*="lagoon"].svelte-j8q6nk.svelte-j8q6nk{transform:scale(1)}img[src*="evm"].svelte-j8q6nk.svelte-j8q6nk{width:32px;height:32px;object-fit:contain;padding:2px;transform:scale(0.9);filter:var(--svg-filter-inverse);transition:filter 0.3s ease}.architecture-diagram.svelte-j8q6nk.svelte-j8q6nk{width:100%;height:auto;object-fit:contain;margin:1rem 0;border-radius:8px}.inline-link.svelte-j8q6nk.svelte-j8q6nk{color:#3b82f6;text-decoration:underline;font-weight:500;transition:color 0.2s}.inline-link.svelte-j8q6nk.svelte-j8q6nk:hover{color:#2563eb}.inline-link.svelte-j8q6nk.svelte-j8q6nk::after{content:"\u2197";display:inline-block;font-size:0.9em;margin-left:0.2rem;transition:transform 0.2s}.inline-link.svelte-j8q6nk.svelte-j8q6nk:hover::after{transform:translate(2px, -2px)}@media(max-width: 768px){.content.svelte-j8q6nk.svelte-j8q6nk{padding:1rem}.title-container.svelte-j8q6nk.svelte-j8q6nk{margin-bottom:2rem}h1.svelte-j8q6nk.svelte-j8q6nk{font-size:2.25rem}h2.svelte-j8q6nk.svelte-j8q6nk{font-size:1.5rem;margin-bottom:1.75rem}.overview-description.svelte-j8q6nk.svelte-j8q6nk{font-size:1.1rem}p.svelte-j8q6nk.svelte-j8q6nk{font-size:1rem}.feature-card.svelte-j8q6nk.svelte-j8q6nk{padding:1.25rem}.divider.svelte-j8q6nk.svelte-j8q6nk{margin:2rem 0}}.image-caption.svelte-j8q6nk.svelte-j8q6nk{text-align:left;color:var(--text-color);opacity:0.8;margin-top:0.5rem}.divider.svelte-j8q6nk.svelte-j8q6nk{width:100%;height:1px;background:var(--border-color);margin:3rem 0}.search-highlight{background-color:rgba(255, 217, 0, 0.3);transition:background-color 0.5s ease-out;padding:2px;border-radius:2px}section.svelte-j8q6nk.svelte-j8q6nk{transition:background-color 0.5s ease-out}:root{--svg-filter:none;--svg-filter-inverse:invert(1)}.dark-mode{--svg-filter:invert(1);--svg-filter-inverse:none}.terminology-grid.svelte-j8q6nk.svelte-j8q6nk{display:grid;grid-template-columns:repeat(2, 1fr);gap:1.5rem}.term-box.svelte-j8q6nk.svelte-j8q6nk{background:var(--card-background);border:1px solid var(--card-border);border-radius:12px;padding:1.5rem;transition:all 0.2s ease}.term-box.svelte-j8q6nk.svelte-j8q6nk:hover{transform:translateY(-2px);background:var(--secondary-background)}.term-box.svelte-j8q6nk h3.svelte-j8q6nk{font-size:1.2rem;font-weight:600;margin-bottom:1rem;color:var(--text-color)}.term-box.svelte-j8q6nk p.svelte-j8q6nk{font-size:0.95rem;line-height:1.6;color:var(--text-color);opacity:0.8;margin-bottom:1rem}.term-box.svelte-j8q6nk p.svelte-j8q6nk:last-child{margin-bottom:0}@media(max-width: 768px){.terminology-grid.svelte-j8q6nk.svelte-j8q6nk{grid-template-columns:1fr}}',
      map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { highlightStore } from \\"$lib/stores/highlight\\";\\nimport { page } from \\"$app/stores\\";\\nlet sections = {};\\nlet currentHash = \\"\\";\\nonMount(() => {\\n  currentHash = window.location.hash.slice(1);\\n  window.addEventListener(\\"hashchange\\", () => {\\n    currentHash = window.location.hash.slice(1);\\n    updateMetaTags();\\n  });\\n  const unsubscribe = highlightStore.subscribe(({ term, sectionId, active }) => {\\n    if (active && sectionId && sections[sectionId]) {\\n      const section = sections[sectionId];\\n      const text = section.innerHTML;\\n      const regex = new RegExp(\`(\${term})\`, \\"gi\\");\\n      section.innerHTML = text.replace(regex, '<mark class=\\"search-highlight\\">$1</mark>');\\n      setTimeout(() => {\\n        section.innerHTML = text;\\n        highlightStore.set({ term: \\"\\", sectionId: \\"\\", active: false });\\n      }, 2e3);\\n    }\\n  });\\n  return () => {\\n    window.removeEventListener(\\"hashchange\\", () => {\\n    });\\n    unsubscribe();\\n  };\\n});\\nfunction updateMetaTags() {\\n  let title = \\"Framework \\\\u2013 DeTrade\\";\\n  let description = \\"Understand DeTrade's framework, architecture, and how our protocol works.\\";\\n  switch (currentHash) {\\n    case \\"terminology\\":\\n      title = \\"Terminology \\\\u2013 DeTrade\\";\\n      description = \\"Learn about key DeTrade terminology, including ERC-7540, multisig wallets, price oracles, and vault mechanics.\\";\\n      break;\\n    case \\"architecture\\":\\n      title = \\"Protocol Architecture \\\\u2013 DeTrade\\";\\n      description = \\"Explore DeTrade's protocol architecture, built on Lagoon and Safe infrastructure.\\";\\n      break;\\n    case \\"features\\":\\n      title = \\"Features \\\\u2013 DeTrade\\";\\n      description = \\"Discover DeTrade's key features and infrastructure powered by Lagoon and Safe technology.\\";\\n      break;\\n  }\\n  document.title = title;\\n  const metaDescription = document.querySelector('meta[name=\\"description\\"]');\\n  const ogTitle = document.querySelector('meta[property=\\"og:title\\"]');\\n  const ogDescription = document.querySelector('meta[property=\\"og:description\\"]');\\n  const twitterTitle = document.querySelector('meta[name=\\"twitter:title\\"]');\\n  const twitterDescription = document.querySelector('meta[name=\\"twitter:description\\"]');\\n  if (metaDescription) metaDescription.setAttribute(\\"content\\", description);\\n  if (ogTitle) ogTitle.setAttribute(\\"content\\", title);\\n  if (ogDescription) ogDescription.setAttribute(\\"content\\", description);\\n  if (twitterTitle) twitterTitle.setAttribute(\\"content\\", title);\\n  if (twitterDescription) twitterDescription.setAttribute(\\"content\\", description);\\n}\\n<\/script>\\n\\n<svelte:head>\\n  <title>{currentHash ? \`\${currentHash.charAt(0).toUpperCase() + currentHash.slice(1)} \u2013 DeTrade\` : 'Framework \u2013 DeTrade'}</title>\\n  <meta name=\\"description\\" content=\\"Understand DeTrade's framework, architecture, and how our protocol works.\\" />\\n  <meta property=\\"og:title\\" content={currentHash ? \`\${currentHash.charAt(0).toUpperCase() + currentHash.slice(1)} \u2013 DeTrade\` : 'Framework \u2013 DeTrade'} />\\n  <meta property=\\"og:description\\" content=\\"Understand DeTrade's framework, architecture, and how our protocol works.\\" />\\n  <meta name=\\"twitter:title\\" content={currentHash ? \`\${currentHash.charAt(0).toUpperCase() + currentHash.slice(1)} \u2013 DeTrade\` : 'Framework \u2013 DeTrade'} />\\n  <meta name=\\"twitter:description\\" content=\\"Understand DeTrade's framework, architecture, and how our protocol works.\\" />\\n</svelte:head>\\n\\n<div class=\\"content\\">\\n  <div class=\\"overview-content\\">\\n    <div class=\\"title-container\\">\\n      <h1>\\n        <svg width=\\"36\\" height=\\"36\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n          <circle cx=\\"12\\" cy=\\"12\\" r=\\"3\\"/>\\n          <path d=\\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\\"/>\\n        </svg>\\n        Framework\\n      </h1>\\n      <p class=\\"overview-description\\">Tap into Cutting-Edge Vaults for Smarter DeFi</p>\\n    </div>\\n\\n    <section id=\\"features\\" class=\\"feature-card\\">\\n      <h2>\\n        <img src=\\"/symbol_lagoon_white.svg\\" alt=\\"Lagoon logo\\" class=\\"framework-logo\\" />\\n        Powered by Lagoon\\n      </h2>\\n      <div class=\\"feature-content\\">\\n        <p>\\n          Our vaults are powered by <a href=\\"https://lagoon.finance\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"inline-link\\">Lagoon</a> technology, an advanced and rapidly evolving vault infrastructure tailored for on-chain asset managers. Lagoon is dedicated to consistently improving and refining its vault technology, delivering state-of-the-art solutions and ongoing updates to empower asset managers with the latest innovations. As Lagoon continues to push the boundaries of vault technology, DeTrade will harness their expertise to ensure you receive an optimized and cutting-edge investment experience.\\n        </p>\\n      </div>\\n    </section>\\n\\n    <section class=\\"feature-card\\">\\n      <h2>\\n        <img src=\\"/safe_white.svg\\" alt=\\"Safe logo\\" class=\\"framework-logo\\" />\\n        Built on Safe\\n      </h2>\\n      <div class=\\"feature-content\\">\\n        <p>\\n          Lagoon is built on <a href=\\"https://safe.global\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"inline-link\\">Safe</a>, the most trusted smart contract account system in DeFi. Safe currently secures $100B+ in assets and provides seamless access to the entire DeFi ecosystem. <a href=\\"https://eips.ethereum.org/EIPS/eip-7540\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"inline-link\\">ERC-7540</a> support allows each vault (tokenized Safe) to maintain transparent and auditable accounting. <a href=\\"https://docs.roles.gnosisguild.org\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"inline-link\\">Zodiac modules</a> define and enforce on-chain permissions for vault managers (Curators), ensuring clear mandates and non-custodial integrity.\\n        </p>\\n      </div>\\n    </section>\\n\\n    <section class=\\"feature-card\\">\\n      <h2>\\n        <img src=\\"/evm.svg\\" alt=\\"EVM logo\\" class=\\"framework-logo\\" />\\n        EVM Compatibility\\n      </h2>\\n      <div class=\\"feature-content\\">\\n        <p>\\n          Thanks to the underlying Lagoon + Safe architecture, DeTrade vaults are fully EVM-compatible, enabling seamless interaction with protocols across all major EVM chains.\\n          This universal compatibility ensures access to the best yields and DeFi opportunities, regardless of where they originate, while maintaining a user experience that is interoperable, permissionless, and transparent. DeTrade strategies can interact with a wide range of protocols while remaining anchored in a secure, modular Safe-based vault structure.\\n        </p>\\n      </div>\\n    </section>\\n\\n    <div class=\\"divider\\"></div>\\n\\n    <section id=\\"architecture\\" class=\\"feature-card\\">\\n      <h2>\\n        <svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n          <path d=\\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\\"/>\\n        </svg>\\n        Protocol Architecture\\n      </h2>\\n      <div class=\\"feature-content\\">\\n        <img src=\\"/framework.png\\" alt=\\"DeTrade Protocol Architecture\\" class=\\"architecture-diagram\\" />\\n        <p class=\\"image-caption\\">\\n          For a comprehensive overview of the framework used by DeTrade, visit the <a href=\\"https://docs.lagoon.finance\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"inline-link\\">Lagoon documentation</a>.\\n        </p>\\n      </div>\\n    </section>\\n\\n    <div class=\\"divider\\"></div>\\n\\n    <section id=\\"terminology\\" class=\\"feature-card\\">\\n      <h2>Terminology</h2>\\n      <div class=\\"feature-content\\">\\n        <div class=\\"terminology-grid\\">\\n          <div class=\\"term-box\\">\\n            <h3>ERC-7540</h3>\\n            <p>This is the smart contract standard utilized by DeTrade vaults. ERC-7540 enables asynchronous deposits and withdrawals, meaning transactions can be queued and processed at a later time instead of requiring immediate execution. It supports share tokenization and builds upon the foundation of its predecessor, ERC-4626, enhancing its functionality.</p>\\n          </div>\\n\\n          <div class=\\"term-box\\">\\n            <h3>Multisig Wallet</h3>\\n            <p>Unlike an 'Externally Owned Account' (EOA), which is managed by a single private key, a multisig wallet operates through a smart contract and requires multiple EOAs to act as signers for each transaction.</p>\\n            <p>This setup enhances security and programmability, making it ideal for scenarios where multiple parties collaborate toward a shared objective or manage significant asset pools. In this space, Safe stands out as the leading and most reliable multisig wallet provider.</p>\\n          </div>\\n\\n          <div class=\\"term-box\\">\\n            <h3>Price Oracle</h3>\\n            <p>The price oracle calculates data and updates the vault's net value when requested by the operator. It does this by subtracting debts from the total asset balance.</p>\\n            <p>The price per share is then determined by dividing the vault's net value by the number of outstanding shares.</p>\\n          </div>\\n\\n          <div class=\\"term-box\\">\\n            <h3>Shares</h3>\\n            <p>Shares represent a user's claim on the assets deposited in a DeTrade vault.</p>\\n            <p>They are issued in exchange for an underlying token at a price set by the oracle during a settlement period. The price per share reflects the vault's performance over time, measured in the underlying token. Essentially, shares entitle users to a portion of the fees generated by the operator (after any applicable commissions).</p>\\n          </div>\\n\\n          <div class=\\"term-box\\">\\n            <h3>Underlying Token</h3>\\n            <p>The underlying token is the asset in which the vault manager's profits and losses are denominated.</p>\\n            <p>It is the token users deposit into the vault and receive when withdrawing, serving as the core asset of the investment.</p>\\n          </div>\\n\\n          <div class=\\"term-box\\">\\n            <h3>Vault Settlement</h3>\\n            <p>Settlement refers to the process where a vault operator confirms deposit and/or withdrawal requests. Once settled, users can exchange all or part of their shares for the underlying token, proportional to their ownership in the vault.</p>\\n          </div>\\n\\n          <div class=\\"term-box\\">\\n            <h3>Vaults</h3>\\n            <p>DeTrade vaults are investment structures that leverage assets, protocols, and financial tools to implement diverse strategies. The allocation of assets, their changes over time, and other variables are determined by the operator's decisions.</p>\\n          </div>\\n        </div>\\n      </div>\\n    </section>\\n  </div>\\n</div>\\n\\n<style>\\n  .content {\\n    max-width: 1200px;\\n    margin: 0 auto;\\n    padding: 2rem;\\n    color: var(--text-color);\\n  }\\n\\n  .overview-content {\\n    max-width: 1200px;\\n    margin: 0 auto;\\n    color: var(--text-color);\\n  }\\n\\n  .title-container {\\n    margin-bottom: 3rem;\\n  }\\n\\n  h1 {\\n    font-size: 2.25rem;\\n    font-weight: 700;\\n    margin-bottom: 0.75rem;\\n    color: var(--text-color);\\n    display: flex;\\n    align-items: center;\\n    gap: 1rem;\\n  }\\n\\n  h2 {\\n    font-size: 1.5rem;\\n    font-weight: 600;\\n    margin-bottom: 1.5rem;\\n    color: var(--text-color);\\n    display: flex;\\n    align-items: center;\\n    gap: 0.75rem;\\n  }\\n\\n  h1 svg,\\n  h2 svg {\\n    color: var(--text-color);\\n    stroke: currentColor;\\n    transition: color 0.3s ease, stroke 0.3s ease;\\n  }\\n\\n  .feature-card {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 16px;\\n    padding: 1.5rem;\\n    transition: transform 0.2s, background-color 0.2s;\\n    margin-bottom: 1.5rem;\\n    width: 100%;\\n    scroll-margin-top: 80px;\\n  }\\n\\n  .feature-card:hover {\\n    transform: translateY(-5px);\\n    background: var(--secondary-background);\\n  }\\n\\n  /* Annuler l'effet de survol sur les sections Terminology et Architecture */\\n  #terminology:hover,\\n  #architecture:hover {\\n    transform: none;\\n    background: var(--card-background);\\n  }\\n\\n  .feature-content {\\n    width: 100%;\\n  }\\n\\n  p {\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    margin: 0;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n  }\\n\\n  .overview-description {\\n    font-size: 1.1rem;\\n    color: var(--text-color);\\n    opacity: 0.7;\\n    margin: 0.5rem 0 1.5rem 0;\\n    line-height: 1.5;\\n  }\\n\\n  .framework-logo,\\n  img[src*=\\"safe_white\\"],\\n  img[src*=\\"lagoon\\"] {\\n    width: 32px;\\n    height: 32px;\\n    object-fit: contain;\\n    padding: 2px;\\n    filter: var(--svg-filter);\\n    transition: filter 0.3s ease;\\n  }\\n\\n  img[src*=\\"safe_white\\"] {\\n    transform: scale(1.25);\\n  }\\n\\n  img[src*=\\"lagoon\\"] {\\n    transform: scale(1);\\n  }\\n\\n  img[src*=\\"evm\\"] {\\n    width: 32px;\\n    height: 32px;\\n    object-fit: contain;\\n    padding: 2px;\\n    transform: scale(0.9);\\n    filter: var(--svg-filter-inverse);\\n    transition: filter 0.3s ease;\\n  }\\n\\n  .architecture-diagram {\\n    width: 100%;\\n    height: auto;\\n    object-fit: contain;\\n    margin: 1rem 0;\\n    border-radius: 8px;\\n  }\\n\\n  .terms-grid {\\n    display: grid;\\n    grid-template-columns: repeat(2, 1fr);\\n    gap: 2rem;\\n  }\\n\\n  .term-card {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 12px;\\n    padding: 1.25rem;\\n    transition: transform 0.2s;\\n  }\\n\\n  .term-card:hover {\\n    transform: translateY(-2px);\\n    background: var(--secondary-background);\\n  }\\n\\n  .term-card h3 {\\n    font-size: 1.3rem;\\n    font-weight: 600;\\n    margin-bottom: 0.75rem;\\n    color: var(--text-color);\\n  }\\n\\n  .term-card p {\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    margin: 0;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n  }\\n\\n  .inline-link {\\n    color: #3b82f6; /* Bleu */\\n    text-decoration: underline;\\n    font-weight: 500;\\n    transition: color 0.2s;\\n  }\\n\\n  .inline-link:hover {\\n    color: #2563eb; /* Bleu plus fonc\xE9 */\\n  }\\n\\n  /* Fl\xE8che uniquement pour les premiers liens de chaque type */\\n  .inline-link::after {\\n    content: \\"\u2197\\";\\n    display: inline-block;\\n    font-size: 0.9em;\\n    margin-left: 0.2rem;\\n    transition: transform 0.2s;\\n  }\\n\\n  .inline-link:hover::after {\\n    transform: translate(2px, -2px);\\n  }\\n\\n  @media (max-width: 768px) {\\n    .content {\\n      padding: 1rem;\\n    }\\n\\n    .title-container {\\n      margin-bottom: 2rem;\\n    }\\n\\n    h1 {\\n      font-size: 2.25rem;\\n    }\\n\\n    h2 {\\n      font-size: 1.5rem;\\n      margin-bottom: 1.75rem;\\n    }\\n\\n    .overview-description {\\n      font-size: 1.1rem;\\n    }\\n\\n    p {\\n      font-size: 1rem;\\n    }\\n\\n    .feature-card {\\n      padding: 1.25rem;\\n    }\\n\\n    .terms-grid {\\n      grid-template-columns: 1fr;\\n    }\\n\\n    .term-card {\\n      padding: 1.25rem;\\n    }\\n\\n    .term-card h3 {\\n      font-size: 1.3rem;\\n    }\\n\\n    .divider {\\n      margin: 2rem 0;\\n    }\\n  }\\n\\n  .image-caption {\\n    text-align: left;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    margin-top: 0.5rem;\\n  }\\n\\n  .image-caption svg {\\n    display: inline-block;\\n    vertical-align: middle;\\n    margin-left: 4px;\\n  }\\n\\n  .divider {\\n    width: 100%;\\n    height: 1px;\\n    background: var(--border-color);\\n    margin: 3rem 0;\\n  }\\n\\n  :global(.search-highlight) {\\n    background-color: rgba(255, 217, 0, 0.3);\\n    transition: background-color 0.5s ease-out;\\n    padding: 2px;\\n    border-radius: 2px;\\n  }\\n\\n  section {\\n    transition: background-color 0.5s ease-out;\\n  }\\n\\n  :root {\\n    --svg-filter: none;\\n    --svg-filter-inverse: invert(1);\\n  }\\n\\n  :global(.dark-mode) {\\n    --svg-filter: invert(1);\\n    --svg-filter-inverse: none;\\n  }\\n\\n  .terminology-grid {\\n    display: grid;\\n    grid-template-columns: repeat(2, 1fr);\\n    gap: 1.5rem;\\n  }\\n\\n  .term-box {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 12px;\\n    padding: 1.5rem;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .term-box:hover {\\n    transform: translateY(-2px);\\n    background: var(--secondary-background);\\n  }\\n\\n  .term-box h3 {\\n    font-size: 1.2rem;\\n    font-weight: 600;\\n    margin-bottom: 1rem;\\n    color: var(--text-color);\\n  }\\n\\n  .term-box p {\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    margin-bottom: 1rem;\\n  }\\n\\n  .term-box p:last-child {\\n    margin-bottom: 0;\\n  }\\n\\n  @media (max-width: 768px) {\\n    .terminology-grid {\\n      grid-template-columns: 1fr;\\n    }\\n  }\\n</style> "],"names":[],"mappings":"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"}`
    };
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css4);
      return `${$$result.head += `<!-- HEAD_svelte-1aaftmj_START -->${$$result.title = `<title>${escape("Framework \u2013 DeTrade")}</title>`, ""}<meta name="description" content="Understand DeTrade's framework, architecture, and how our protocol works."><meta property="og:title"${add_attribute(
        "content",
        "Framework \u2013 DeTrade",
        0
      )}><meta property="og:description" content="Understand DeTrade's framework, architecture, and how our protocol works."><meta name="twitter:title"${add_attribute(
        "content",
        "Framework \u2013 DeTrade",
        0
      )}><meta name="twitter:description" content="Understand DeTrade's framework, architecture, and how our protocol works."><!-- HEAD_svelte-1aaftmj_END -->`, ""} <div class="content svelte-j8q6nk" data-svelte-h="svelte-191euhm"><div class="overview-content svelte-j8q6nk"><div class="title-container svelte-j8q6nk"><h1 class="svelte-j8q6nk"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-j8q6nk"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        Framework</h1> <p class="overview-description svelte-j8q6nk">Tap into Cutting-Edge Vaults for Smarter DeFi</p></div> <section id="features" class="feature-card svelte-j8q6nk"><h2 class="svelte-j8q6nk"><img src="/symbol_lagoon_white.svg" alt="Lagoon logo" class="framework-logo svelte-j8q6nk">
        Powered by Lagoon</h2> <div class="feature-content svelte-j8q6nk"><p class="svelte-j8q6nk">Our vaults are powered by <a href="https://lagoon.finance" target="_blank" rel="noopener noreferrer" class="inline-link svelte-j8q6nk">Lagoon</a> technology, an advanced and rapidly evolving vault infrastructure tailored for on-chain asset managers. Lagoon is dedicated to consistently improving and refining its vault technology, delivering state-of-the-art solutions and ongoing updates to empower asset managers with the latest innovations. As Lagoon continues to push the boundaries of vault technology, DeTrade will harness their expertise to ensure you receive an optimized and cutting-edge investment experience.</p></div></section> <section class="feature-card svelte-j8q6nk"><h2 class="svelte-j8q6nk"><img src="/safe_white.svg" alt="Safe logo" class="framework-logo svelte-j8q6nk">
        Built on Safe</h2> <div class="feature-content svelte-j8q6nk"><p class="svelte-j8q6nk">Lagoon is built on <a href="https://safe.global" target="_blank" rel="noopener noreferrer" class="inline-link svelte-j8q6nk">Safe</a>, the most trusted smart contract account system in DeFi. Safe currently secures $100B+ in assets and provides seamless access to the entire DeFi ecosystem. <a href="https://eips.ethereum.org/EIPS/eip-7540" target="_blank" rel="noopener noreferrer" class="inline-link svelte-j8q6nk">ERC-7540</a> support allows each vault (tokenized Safe) to maintain transparent and auditable accounting. <a href="https://docs.roles.gnosisguild.org" target="_blank" rel="noopener noreferrer" class="inline-link svelte-j8q6nk">Zodiac modules</a> define and enforce on-chain permissions for vault managers (Curators), ensuring clear mandates and non-custodial integrity.</p></div></section> <section class="feature-card svelte-j8q6nk"><h2 class="svelte-j8q6nk"><img src="/evm.svg" alt="EVM logo" class="framework-logo svelte-j8q6nk">
        EVM Compatibility</h2> <div class="feature-content svelte-j8q6nk"><p class="svelte-j8q6nk">Thanks to the underlying Lagoon + Safe architecture, DeTrade vaults are fully EVM-compatible, enabling seamless interaction with protocols across all major EVM chains.
          This universal compatibility ensures access to the best yields and DeFi opportunities, regardless of where they originate, while maintaining a user experience that is interoperable, permissionless, and transparent. DeTrade strategies can interact with a wide range of protocols while remaining anchored in a secure, modular Safe-based vault structure.</p></div></section> <div class="divider svelte-j8q6nk"></div> <section id="architecture" class="feature-card svelte-j8q6nk"><h2 class="svelte-j8q6nk"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-j8q6nk"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
        Protocol Architecture</h2> <div class="feature-content svelte-j8q6nk"><img src="/framework.png" alt="DeTrade Protocol Architecture" class="architecture-diagram svelte-j8q6nk"> <p class="image-caption svelte-j8q6nk">For a comprehensive overview of the framework used by DeTrade, visit the <a href="https://docs.lagoon.finance" target="_blank" rel="noopener noreferrer" class="inline-link svelte-j8q6nk">Lagoon documentation</a>.</p></div></section> <div class="divider svelte-j8q6nk"></div> <section id="terminology" class="feature-card svelte-j8q6nk"><h2 class="svelte-j8q6nk">Terminology</h2> <div class="feature-content svelte-j8q6nk"><div class="terminology-grid svelte-j8q6nk"><div class="term-box svelte-j8q6nk"><h3 class="svelte-j8q6nk">ERC-7540</h3> <p class="svelte-j8q6nk">This is the smart contract standard utilized by DeTrade vaults. ERC-7540 enables asynchronous deposits and withdrawals, meaning transactions can be queued and processed at a later time instead of requiring immediate execution. It supports share tokenization and builds upon the foundation of its predecessor, ERC-4626, enhancing its functionality.</p></div> <div class="term-box svelte-j8q6nk"><h3 class="svelte-j8q6nk">Multisig Wallet</h3> <p class="svelte-j8q6nk">Unlike an &#39;Externally Owned Account&#39; (EOA), which is managed by a single private key, a multisig wallet operates through a smart contract and requires multiple EOAs to act as signers for each transaction.</p> <p class="svelte-j8q6nk">This setup enhances security and programmability, making it ideal for scenarios where multiple parties collaborate toward a shared objective or manage significant asset pools. In this space, Safe stands out as the leading and most reliable multisig wallet provider.</p></div> <div class="term-box svelte-j8q6nk"><h3 class="svelte-j8q6nk">Price Oracle</h3> <p class="svelte-j8q6nk">The price oracle calculates data and updates the vault&#39;s net value when requested by the operator. It does this by subtracting debts from the total asset balance.</p> <p class="svelte-j8q6nk">The price per share is then determined by dividing the vault&#39;s net value by the number of outstanding shares.</p></div> <div class="term-box svelte-j8q6nk"><h3 class="svelte-j8q6nk">Shares</h3> <p class="svelte-j8q6nk">Shares represent a user&#39;s claim on the assets deposited in a DeTrade vault.</p> <p class="svelte-j8q6nk">They are issued in exchange for an underlying token at a price set by the oracle during a settlement period. The price per share reflects the vault&#39;s performance over time, measured in the underlying token. Essentially, shares entitle users to a portion of the fees generated by the operator (after any applicable commissions).</p></div> <div class="term-box svelte-j8q6nk"><h3 class="svelte-j8q6nk">Underlying Token</h3> <p class="svelte-j8q6nk">The underlying token is the asset in which the vault manager&#39;s profits and losses are denominated.</p> <p class="svelte-j8q6nk">It is the token users deposit into the vault and receive when withdrawing, serving as the core asset of the investment.</p></div> <div class="term-box svelte-j8q6nk"><h3 class="svelte-j8q6nk">Vault Settlement</h3> <p class="svelte-j8q6nk">Settlement refers to the process where a vault operator confirms deposit and/or withdrawal requests. Once settled, users can exchange all or part of their shares for the underlying token, proportional to their ownership in the vault.</p></div> <div class="term-box svelte-j8q6nk"><h3 class="svelte-j8q6nk">Vaults</h3> <p class="svelte-j8q6nk">DeTrade vaults are investment structures that leverage assets, protocols, and financial tools to implement diverse strategies. The allocation of assets, their changes over time, and other variables are determined by the operator&#39;s decisions.</p></div></div></div></section></div> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => component_cache5 ?? (component_cache5 = (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default);
    imports5 = ["_app/immutable/nodes/4.DcL2Gdrz.js", "_app/immutable/chunks/DipVNbI1.js", "_app/immutable/chunks/6iab5EmN.js", "_app/immutable/chunks/D0QH3NT1.js", "_app/immutable/chunks/C1OJwcYb.js"];
    stylesheets5 = ["_app/immutable/assets/4.DVe9uow8.css"];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/guides/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page4
});
var css5, Page4;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/guides/_page.svelte.js"() {
    init_ssr();
    init_client();
    css5 = {
      code: ".content.svelte-12llcvu.svelte-12llcvu{max-width:1200px;margin:0 auto;padding:2rem;color:var(--text-color)}.title-container.svelte-12llcvu.svelte-12llcvu{margin-bottom:3rem}h1.svelte-12llcvu.svelte-12llcvu{font-size:2.25rem;font-weight:700;margin-bottom:0.75rem;color:var(--text-color);display:flex;align-items:center;gap:1rem}h1.svelte-12llcvu svg.svelte-12llcvu{color:var(--text-color);stroke:currentColor;transition:color 0.3s ease, stroke 0.3s ease}h3.svelte-12llcvu.svelte-12llcvu{font-size:1.3rem;font-weight:600;margin-bottom:1rem;color:var(--text-color)}.overview-description.svelte-12llcvu.svelte-12llcvu{font-size:1.1rem;color:var(--text-color);opacity:0.7;margin:0.5rem 0 1.5rem 0;line-height:1.5}.content-section.svelte-12llcvu.svelte-12llcvu{margin-bottom:4rem;scroll-margin-top:80px}.featured-guide.svelte-12llcvu.svelte-12llcvu{background:var(--card-background);border:1px solid var(--card-border);border-radius:16px;padding:1.5rem;margin-top:1.5rem}.step.svelte-12llcvu.svelte-12llcvu{background:var(--card-background);border:1px solid var(--card-border);border-radius:12px;padding:1.5rem;margin-bottom:1rem;transition:all 0.2s ease}.step.svelte-12llcvu.svelte-12llcvu:hover{transform:translateY(-2px);background:var(--secondary-background)}.step.svelte-12llcvu h4.svelte-12llcvu{font-size:0.95rem;font-weight:600;color:var(--text-color);margin-bottom:0.5rem;display:flex;align-items:center}.step.svelte-12llcvu p.svelte-12llcvu{font-size:0.9rem;line-height:1.5;color:var(--text-color);opacity:0.8}.info-box.svelte-12llcvu.svelte-12llcvu{background:rgba(96, 165, 250, 0.1);border-radius:8px;padding:1rem;margin:1.5rem 0;transition:all 0.2s ease;color:var(--text-color);display:flex;flex-direction:column;gap:0.25rem}.info-box.svelte-12llcvu.svelte-12llcvu:hover{background:rgba(96, 165, 250, 0.15)}.info-box.svelte-12llcvu h4.svelte-12llcvu{display:flex;align-items:center;gap:0.5rem;font-size:1rem;font-weight:600;margin-bottom:0.5rem;color:var(--text-color)}.info-box.svelte-12llcvu h4 em.svelte-12llcvu{display:flex;align-items:center;gap:0.25rem}.info-box.svelte-12llcvu p.svelte-12llcvu{font-size:0.95rem;line-height:1.4;margin-bottom:0.25rem;opacity:0.85}.info-box.svelte-12llcvu p em.svelte-12llcvu{font-style:normal}.info-box.svelte-12llcvu p.note.svelte-12llcvu{margin-top:0.5rem}.steps-grid.svelte-12llcvu.svelte-12llcvu{display:grid;grid-template-columns:repeat(2, 1fr);gap:1rem;margin:1rem 0}.demo-container.svelte-12llcvu.svelte-12llcvu{margin:0 0 2rem 0;background:var(--card-background);border:1px solid var(--card-border);border-radius:12px;overflow:hidden}.demo-gif.svelte-12llcvu.svelte-12llcvu{width:100%;height:auto;border-radius:12px;display:block}.full-width-step.svelte-12llcvu.svelte-12llcvu{margin:1rem 0;width:100%}.full-width-step.svelte-12llcvu .step.svelte-12llcvu{margin-bottom:2rem}.full-width-step.svelte-12llcvu .demo-container.svelte-12llcvu{margin:0 0 2rem 0}@media(max-width: 768px){h1.svelte-12llcvu.svelte-12llcvu{font-size:2.5rem}.steps-grid.svelte-12llcvu.svelte-12llcvu{grid-template-columns:1fr;gap:1rem}.step.svelte-12llcvu.svelte-12llcvu{padding:1.25rem}.demo-container.svelte-12llcvu.svelte-12llcvu{margin:0 0 2rem 0}.full-width-step.svelte-12llcvu.svelte-12llcvu{margin:1rem 0}}@media(max-width: 1024px){.demo-container.svelte-12llcvu.svelte-12llcvu{margin:0 0 2rem 0}}.info-box.full-width.svelte-12llcvu.svelte-12llcvu{width:100%;margin:1rem 0}.guide-note.svelte-12llcvu.svelte-12llcvu{font-size:1rem;line-height:1.5;margin:1rem 0 1.5rem;font-style:italic;color:var(--text-color);opacity:0.7}.divider.svelte-12llcvu.svelte-12llcvu{width:100%;height:1px;background:var(--border-color);margin:3rem 0}.note.svelte-12llcvu.svelte-12llcvu{font-style:italic;background:rgba(96, 165, 250, 0.1);border:1px solid var(--card-border);border-radius:8px;padding:1rem;margin:2rem 0;transition:all 0.2s ease;color:var(--text-color);display:flex;gap:0.5rem;align-items:flex-start}.note.svelte-12llcvu.svelte-12llcvu:hover{background:rgba(96, 165, 250, 0.15)}.step.svelte-12llcvu .note.svelte-12llcvu{margin:2rem 0 0 0}",
      map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { page } from \\"$app/stores\\";\\nlet currentHash = \\"\\";\\nlet depositGifSrc = \\"/deposit.gif\\";\\nlet withdrawGifSrc = \\"/withdraw.gif\\";\\nfunction reloadDepositGif() {\\n  depositGifSrc = \`/deposit.gif?t=\${Date.now()}\`;\\n}\\nfunction reloadWithdrawGif() {\\n  withdrawGifSrc = \`/withdraw.gif?t=\${Date.now()}\`;\\n}\\nonMount(() => {\\n  currentHash = window.location.hash.slice(1);\\n  window.addEventListener(\\"hashchange\\", () => {\\n    currentHash = window.location.hash.slice(1);\\n    updateMetaTags();\\n  });\\n  const depositInterval = setInterval(reloadDepositGif, 1e4);\\n  const withdrawInterval = setInterval(reloadWithdrawGif, 1e4);\\n  return () => {\\n    window.removeEventListener(\\"hashchange\\", () => {\\n    });\\n    clearInterval(depositInterval);\\n    clearInterval(withdrawInterval);\\n  };\\n});\\nfunction updateMetaTags() {\\n  let title = \\"Guides \\\\u2013 DeTrade\\";\\n  let description = \\"Learn how to use DeTrade with our detailed guides for deposits, withdrawals and more.\\";\\n  switch (currentHash) {\\n    case \\"deposit\\":\\n      title = \\"How to Deposit \\\\u2013 DeTrade\\";\\n      description = \\"Step-by-step guide on how to deposit assets into DeTrade vaults.\\";\\n      break;\\n    case \\"withdraw\\":\\n      title = \\"How to Withdraw \\\\u2013 DeTrade\\";\\n      description = \\"Step-by-step guide on how to withdraw assets from DeTrade vaults.\\";\\n      break;\\n  }\\n  document.title = title;\\n  const metaDescription = document.querySelector('meta[name=\\"description\\"]');\\n  const ogTitle = document.querySelector('meta[property=\\"og:title\\"]');\\n  const ogDescription = document.querySelector('meta[property=\\"og:description\\"]');\\n  const twitterTitle = document.querySelector('meta[name=\\"twitter:title\\"]');\\n  const twitterDescription = document.querySelector('meta[name=\\"twitter:description\\"]');\\n  if (metaDescription) metaDescription.setAttribute(\\"content\\", description);\\n  if (ogTitle) ogTitle.setAttribute(\\"content\\", title);\\n  if (ogDescription) ogDescription.setAttribute(\\"content\\", description);\\n  if (twitterTitle) twitterTitle.setAttribute(\\"content\\", title);\\n  if (twitterDescription) twitterDescription.setAttribute(\\"content\\", description);\\n}\\n<\/script>\\n\\n<svelte:head>\\n  <title>{currentHash ? \`How to \${currentHash.charAt(0).toUpperCase() + currentHash.slice(1)} \u2013 DeTrade\` : 'Guides \u2013 DeTrade'}</title>\\n  <meta name=\\"description\\" content=\\"Learn how to use DeTrade with our detailed guides for deposits, withdrawals and more.\\" />\\n  <meta property=\\"og:title\\" content={currentHash ? \`How to \${currentHash.charAt(0).toUpperCase() + currentHash.slice(1)} \u2013 DeTrade\` : 'Guides \u2013 DeTrade'} />\\n  <meta property=\\"og:description\\" content=\\"Learn how to use DeTrade with our detailed guides for deposits, withdrawals and more.\\" />\\n  <meta name=\\"twitter:title\\" content={currentHash ? \`How to \${currentHash.charAt(0).toUpperCase() + currentHash.slice(1)} \u2013 DeTrade\` : 'Guides \u2013 DeTrade'} />\\n  <meta name=\\"twitter:description\\" content=\\"Learn how to use DeTrade with our detailed guides for deposits, withdrawals and more.\\" />\\n</svelte:head>\\n\\n<div class=\\"content\\">\\n  <div class=\\"title-container\\">\\n    <h1>\\n      <svg width=\\"36\\" height=\\"36\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <path d=\\"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z\\"/>\\n        <path d=\\"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z\\"/>\\n      </svg>\\n      Guides\\n    </h1>\\n    <p class=\\"overview-description\\">Learn how to use DeTrade with our detailed guides</p>\\n  </div>\\n\\n  <section id=\\"deposit\\" class=\\"content-section featured-guide\\">\\n    <h3>\\n      <svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <path d=\\"M12 4v10\\"/>\\n        <path d=\\"m8 11 4 4 4-4\\"/>\\n        <path d=\\"M4 18h16\\"/>\\n      </svg>\\n      How to Deposit\\n    </h3>\\n    <p class=\\"guide-note\\">This guide uses the DeTrade Core USDC Vault as an example, but the process remains the same for all current and future DeTrade vaults.</p>\\n    \\n    <div class=\\"steps-grid\\">\\n      <div class=\\"step\\">\\n        <h4>1. Connect Your Wallet</h4>\\n        <p>Start by connecting your wallet on the DeTrade app.</p>\\n      </div>\\n\\n      <div class=\\"step\\">\\n        <h4>2. Make Sure You Have the Right Asset</h4>\\n        <p>Ensure you hold the correct asset on the Base network. For example, to deposit into the USDC vault, your wallet must contain USDC on Base.</p>\\n      </div>\\n\\n      <div class=\\"step\\">\\n        <h4>3. Go to the Vault Page</h4>\\n        <p>Head over to the vault you wish to deposit into. For example: DeTrade Core USDC.</p>\\n      </div>\\n\\n      <div class=\\"step\\">\\n        <h4>4. Click \\"Deposit\\"</h4>\\n        <p>On the vault page, find the \\"My Wallet Balance\\" card and click \\"Deposit\\".</p>\\n      </div>\\n\\n      <div class=\\"step\\">\\n        <h4>5. Approve Access to Your Asset</h4>\\n        <p>As is standard in DeFi, you'll first need to approve the vault contract to access your USDC. This is a one-time authorization per asset.</p>\\n      </div>\\n\\n      <div class=\\"step\\">\\n        <h4>6. Make Your Deposit</h4>\\n        <p>After the approval goes through, return to the deposit screen. Enter the amount of USDC you'd like to deposit, click \\"Deposit\\", and sign the transaction in your wallet.</p>\\n      </div>\\n    </div>\\n\\n    <div class=\\"demo-container\\">\\n      <!-- GIF avec rechargement automatique -->\\n      <img \\n        src={depositGifSrc}\\n        alt=\\"Demonstration of deposit process\\" \\n        class=\\"demo-gif\\"\\n        on:error={reloadDepositGif}\\n      />\\n    </div>\\n\\n    <div class=\\"full-width-step\\">\\n      <div class=\\"step\\">\\n        <h4>7. Wait for Processing</h4>\\n        <p>Once the transaction is confirmed, you'll see a \\"Deposit Pending\\" message on the vault page. Your funds are now being processed by DeTrade. This usually takes less than 24 hours, depending on the timing of the next NAV update.</p>\\n      </div>\\n\\n      <div class=\\"demo-container\\">\\n        <img \\n          src=\\"/pending_deposit.gif\\" \\n          alt=\\"Pending deposit demonstration\\" \\n          class=\\"demo-gif\\"\\n        />\\n      </div>\\n    </div>\\n\\n    <div class=\\"steps-grid\\">\\n      <div class=\\"step\\">\\n        <h4>8. Claim Your Vault Tokens</h4>\\n        <p>After the next NAV and settlement, you'll be prompted to claim your DTUSDC tokens \u2014 these represent your shares in the vault. While not required, claiming these tokens helps you track and manage your position. Simply click and sign the transaction.</p>\\n      </div>\\n\\n      <div class=\\"step\\">\\n        <h4>9. Check Your Position</h4>\\n        <p>Once claimed, your full position will appear in the \\"My Position\\" card, showing your DTUSDC balance and its value in USDC.</p>\\n      </div>\\n    </div>\\n\\n    <!-- Info box en pleine largeur -->\\n    <div class=\\"info-box full-width\\">\\n      <h4><em>\u{1F4A1} How Your Position Value is Calculated</em></h4>\\n      <p><em>Your vault value = Number of DTUSDC shares \xD7 Price per share (in USDC)</em></p>\\n      <p><em>The price per share is calculated as: NAV \xF7 Total number of shares</em></p>\\n    </div>\\n  </section>\\n\\n  <div class=\\"divider\\"></div>\\n\\n  <section id=\\"withdraw\\" class=\\"content-section featured-guide\\">\\n    <h3>\\n      <svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <path d=\\"M12 20v-10\\"/>\\n        <path d=\\"m8 13 4-4 4 4\\"/>\\n        <path d=\\"M4 20h16\\"/>\\n      </svg>\\n      How to Withdraw\\n    </h3>\\n    <p class=\\"guide-note\\">This guide uses the DeTrade Core USDC Vault as an example, but the process remains the same for all current and future DeTrade vaults.</p>\\n    \\n    <div class=\\"steps-grid\\">\\n      <div class=\\"step\\">\\n        <h4>1. Connect Your Wallet</h4>\\n        <p>Start by connecting your wallet on the DeTrade app.</p>\\n      </div>\\n\\n      <div class=\\"step\\">\\n        <h4>2. Go to the Vault Page</h4>\\n        <p>Head over to the vault you wish to withdraw from. For example: DeTrade Core USDC.</p>\\n      </div>\\n\\n      <div class=\\"step\\">\\n        <h4>3. Check Your Position</h4>\\n        <p>Verify your available balance in the \\"My Position\\" card, showing your DTUSDC balance and its current value in USDC.</p>\\n      </div>\\n\\n      <div class=\\"step\\">\\n        <h4>4. Click \\"Withdraw\\"</h4>\\n        <p>On the vault page, find the \\"My Position\\" card and click \\"Withdraw\\".</p>\\n      </div>\\n\\n      <div class=\\"step\\">\\n        <h4>5. Enter Withdrawal Amount</h4>\\n        <p>Enter the amount of DTUSDC tokens you'd like to withdraw, click \\"Withdraw\\", and sign the transaction in your wallet.</p>\\n      </div>\\n\\n      <div class=\\"step\\">\\n        <h4>6. Submit Withdrawal</h4>\\n        <p>Confirm your withdrawal request by signing the transaction. This will queue your withdrawal for the next settlement period.</p>\\n      </div>\\n    </div>\\n\\n    <div class=\\"demo-container\\">\\n      <img \\n        src={withdrawGifSrc}\\n        alt=\\"Demonstration of withdrawal process\\" \\n        class=\\"demo-gif\\"\\n        on:error={reloadWithdrawGif}\\n      />\\n    </div>\\n\\n    <div class=\\"full-width-step\\">\\n      <div class=\\"step\\">\\n        <h4>7. Wait for Processing</h4>\\n        <p>Once the transaction is confirmed, you'll see a \\"Withdrawal Pending\\" message. Your withdrawal request will be processed during the next NAV update and settlement period, typically within 24 hours.</p>\\n        <p class=\\"note\\">Note: If you have both deposit and withdrawal requests pending at the same time, you'll see both status cards displayed simultaneously, as shown below.</p>\\n      </div>\\n\\n      <div class=\\"demo-container\\">\\n        <img \\n          src=\\"/pending_withdraw.gif\\" \\n          alt=\\"Pending withdrawal demonstration\\" \\n          class=\\"demo-gif\\"\\n        />\\n      </div>\\n    </div>\\n\\n    <div class=\\"steps-grid\\">\\n      <div class=\\"step\\">\\n        <h4>8. Claim Your USDC</h4>\\n        <p>After the next NAV and settlement, you'll be prompted to claim your USDC. Simply click and sign the transaction to receive your funds.</p>\\n      </div>\\n\\n      <div class=\\"step\\">\\n        <h4>9. Check Your Wallet</h4>\\n        <p>Once claimed, the USDC will appear in your wallet balance. Your position in the vault will be reduced accordingly.</p>\\n      </div>\\n    </div>\\n\\n    <div class=\\"info-box full-width\\">\\n      <h4><em>\u{1F4A1} Understanding Withdrawal Value</em></h4>\\n      <p><em>Your withdrawal value = Number of DTUSDC shares withdrawn \xD7 Next settlement price per share (in USDC)</em></p>\\n      <p><em>The price per share will be calculated at the next NAV update as: NAV \xF7 Total number of shares</em></p>\\n      <p class=\\"note\\"><em>Note: The actual value you receive will be based on the vault's NAV at the next settlement, not the current displayed price.</em></p>\\n    </div>\\n  </section>\\n</div>\\n\\n<style>\\n  .content {\\n    max-width: 1200px;\\n    margin: 0 auto;\\n    padding: 2rem;\\n    color: var(--text-color);\\n  }\\n\\n  .guides-content {\\n    max-width: 1000px;\\n    margin: 0 auto;\\n    padding: 1rem;\\n    color: var(--text-color);\\n  }\\n\\n  .title-container {\\n    margin-bottom: 3rem;\\n  }\\n\\n  h1 {\\n    font-size: 2.25rem;\\n    font-weight: 700;\\n    margin-bottom: 0.75rem;\\n    color: var(--text-color);\\n    display: flex;\\n    align-items: center;\\n    gap: 1rem;\\n  }\\n\\n  h1 svg {\\n    color: var(--text-color);\\n    stroke: currentColor;\\n    transition: color 0.3s ease, stroke 0.3s ease;\\n  }\\n\\n  h2 {\\n    font-size: 1.75rem;\\n    font-weight: 600;\\n    margin-bottom: 1.5rem;\\n    color: var(--text-color);\\n  }\\n\\n  h3 {\\n    font-size: 1.3rem;\\n    font-weight: 600;\\n    margin-bottom: 1rem;\\n    color: var(--text-color);\\n  }\\n\\n  .overview-description {\\n    font-size: 1.1rem;\\n    color: var(--text-color);\\n    opacity: 0.7;\\n    margin: 0.5rem 0 1.5rem 0;\\n    line-height: 1.5;\\n  }\\n\\n  .content-section {\\n    margin-bottom: 4rem;\\n    scroll-margin-top: 80px;\\n  }\\n\\n  .featured-guide {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 16px;\\n    padding: 1.5rem;\\n    margin-top: 1.5rem;\\n  }\\n\\n  .guide-detailed {\\n    margin-top: 2rem;\\n  }\\n\\n  .step {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 12px;\\n    padding: 1.5rem;\\n    margin-bottom: 1rem;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .step:hover {\\n    transform: translateY(-2px);\\n    background: var(--secondary-background);\\n  }\\n\\n  .step h4 {\\n    font-size: 0.95rem;\\n    font-weight: 600;\\n    color: var(--text-color);\\n    margin-bottom: 0.5rem;\\n    display: flex;\\n    align-items: center;\\n  }\\n\\n  .step p {\\n    font-size: 0.9rem;\\n    line-height: 1.5;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n  }\\n\\n  .info-box {\\n    background: rgba(96, 165, 250, 0.1);\\n    border-radius: 8px;\\n    padding: 1rem;\\n    margin: 1.5rem 0;\\n    transition: all 0.2s ease;\\n    color: var(--text-color);\\n    display: flex;\\n    flex-direction: column;\\n    gap: 0.25rem;\\n  }\\n\\n  .info-box:hover {\\n    background: rgba(96, 165, 250, 0.15);\\n  }\\n\\n  .info-box h4 {\\n    display: flex;\\n    align-items: center;\\n    gap: 0.5rem;\\n    font-size: 1rem;\\n    font-weight: 600;\\n    margin-bottom: 0.5rem;\\n    color: var(--text-color);\\n  }\\n\\n  /* Style sp\xE9cifique pour les titres avec emoji */\\n  .info-box h4 em {\\n    display: flex;\\n    align-items: center;\\n    gap: 0.25rem;\\n  }\\n\\n  .info-box p {\\n    font-size: 0.95rem;\\n    line-height: 1.4;\\n    margin-bottom: 0.25rem;\\n    opacity: 0.85;\\n  }\\n\\n  .info-box p em {\\n    font-style: normal; /* Enl\xE8ve l'italique pour une meilleure lisibilit\xE9 */\\n  }\\n\\n  .info-box p.note {\\n    margin-top: 0.5rem;\\n  }\\n\\n  .steps-grid {\\n    display: grid;\\n    grid-template-columns: repeat(2, 1fr);\\n    gap: 1rem;\\n    margin: 1rem 0;\\n  }\\n\\n  .demo-container {\\n    margin: 0 0 2rem 0;\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 12px;\\n    overflow: hidden;\\n  }\\n\\n  .demo-gif {\\n    width: 100%;\\n    height: auto;\\n    border-radius: 12px;\\n    display: block;\\n  }\\n\\n  .full-width-step {\\n    margin: 1rem 0;\\n    width: 100%;\\n  }\\n\\n  .full-width-step .step {\\n    margin-bottom: 2rem;\\n  }\\n\\n  .full-width-step .demo-container {\\n    margin: 0 0 2rem 0;\\n  }\\n\\n  @media (max-width: 768px) {\\n    h1 {\\n      font-size: 2.5rem;\\n    }\\n\\n    h2 {\\n      font-size: 1.75rem;\\n    }\\n\\n    .steps-grid {\\n      grid-template-columns: 1fr;\\n      gap: 1rem;\\n    }\\n\\n    .step {\\n      padding: 1.25rem;\\n    }\\n\\n    .demo-container {\\n      margin: 0 0 2rem 0;\\n    }\\n\\n    .full-width-step {\\n      margin: 1rem 0;\\n    }\\n  }\\n\\n  @media (max-width: 1024px) {\\n    .demo-container {\\n      margin: 0 0 2rem 0;\\n    }\\n  }\\n\\n  .info-box.full-width {\\n    width: 100%;\\n    margin: 1rem 0;\\n  }\\n\\n  .guide-note {\\n    font-size: 1rem;\\n    line-height: 1.5;\\n    margin: 1rem 0 1.5rem;\\n    font-style: italic;\\n    color: var(--text-color);\\n    opacity: 0.7;\\n  }\\n\\n  .divider {\\n    width: 100%;\\n    height: 1px;\\n    background: var(--border-color);\\n    margin: 3rem 0;\\n  }\\n\\n  .note {\\n    font-style: italic;\\n    background: rgba(96, 165, 250, 0.1);\\n    border: 1px solid var(--card-border);\\n    border-radius: 8px;\\n    padding: 1rem;\\n    margin: 2rem 0;\\n    transition: all 0.2s ease;\\n    color: var(--text-color);\\n    display: flex;\\n    gap: 0.5rem;\\n    align-items: flex-start;\\n  }\\n\\n  .note:hover {\\n    background: rgba(96, 165, 250, 0.15);\\n  }\\n\\n  .step .note {\\n    margin: 2rem 0 0 0;\\n  }\\n</style> "],"names":[],"mappings":"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"}`
    };
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let depositGifSrc = "/deposit.gif";
      let withdrawGifSrc = "/withdraw.gif";
      $$result.css.add(css5);
      return `${$$result.head += `<!-- HEAD_svelte-11zj2n4_START -->${$$result.title = `<title>${escape("Guides \u2013 DeTrade")}</title>`, ""}<meta name="description" content="Learn how to use DeTrade with our detailed guides for deposits, withdrawals and more."><meta property="og:title"${add_attribute(
        "content",
        "Guides \u2013 DeTrade",
        0
      )}><meta property="og:description" content="Learn how to use DeTrade with our detailed guides for deposits, withdrawals and more."><meta name="twitter:title"${add_attribute(
        "content",
        "Guides \u2013 DeTrade",
        0
      )}><meta name="twitter:description" content="Learn how to use DeTrade with our detailed guides for deposits, withdrawals and more."><!-- HEAD_svelte-11zj2n4_END -->`, ""} <div class="content svelte-12llcvu"><div class="title-container svelte-12llcvu" data-svelte-h="svelte-sjvicv"><h1 class="svelte-12llcvu"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-12llcvu"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      Guides</h1> <p class="overview-description svelte-12llcvu">Learn how to use DeTrade with our detailed guides</p></div> <section id="deposit" class="content-section featured-guide svelte-12llcvu"><h3 class="svelte-12llcvu" data-svelte-h="svelte-r4kx0m"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v10"></path><path d="m8 11 4 4 4-4"></path><path d="M4 18h16"></path></svg>
      How to Deposit</h3> <p class="guide-note svelte-12llcvu" data-svelte-h="svelte-12vo49x">This guide uses the DeTrade Core USDC Vault as an example, but the process remains the same for all current and future DeTrade vaults.</p> <div class="steps-grid svelte-12llcvu" data-svelte-h="svelte-1vw9qig"><div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">1. Connect Your Wallet</h4> <p class="svelte-12llcvu">Start by connecting your wallet on the DeTrade app.</p></div> <div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">2. Make Sure You Have the Right Asset</h4> <p class="svelte-12llcvu">Ensure you hold the correct asset on the Base network. For example, to deposit into the USDC vault, your wallet must contain USDC on Base.</p></div> <div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">3. Go to the Vault Page</h4> <p class="svelte-12llcvu">Head over to the vault you wish to deposit into. For example: DeTrade Core USDC.</p></div> <div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">4. Click &quot;Deposit&quot;</h4> <p class="svelte-12llcvu">On the vault page, find the &quot;My Wallet Balance&quot; card and click &quot;Deposit&quot;.</p></div> <div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">5. Approve Access to Your Asset</h4> <p class="svelte-12llcvu">As is standard in DeFi, you&#39;ll first need to approve the vault contract to access your USDC. This is a one-time authorization per asset.</p></div> <div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">6. Make Your Deposit</h4> <p class="svelte-12llcvu">After the approval goes through, return to the deposit screen. Enter the amount of USDC you&#39;d like to deposit, click &quot;Deposit&quot;, and sign the transaction in your wallet.</p></div></div> <div class="demo-container svelte-12llcvu"> <img${add_attribute("src", depositGifSrc, 0)} alt="Demonstration of deposit process" class="demo-gif svelte-12llcvu"></div> <div class="full-width-step svelte-12llcvu" data-svelte-h="svelte-14qpd4l"><div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">7. Wait for Processing</h4> <p class="svelte-12llcvu">Once the transaction is confirmed, you&#39;ll see a &quot;Deposit Pending&quot; message on the vault page. Your funds are now being processed by DeTrade. This usually takes less than 24 hours, depending on the timing of the next NAV update.</p></div> <div class="demo-container svelte-12llcvu"><img src="/pending_deposit.gif" alt="Pending deposit demonstration" class="demo-gif svelte-12llcvu"></div></div> <div class="steps-grid svelte-12llcvu" data-svelte-h="svelte-avyry"><div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">8. Claim Your Vault Tokens</h4> <p class="svelte-12llcvu">After the next NAV and settlement, you&#39;ll be prompted to claim your DTUSDC tokens \u2014 these represent your shares in the vault. While not required, claiming these tokens helps you track and manage your position. Simply click and sign the transaction.</p></div> <div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">9. Check Your Position</h4> <p class="svelte-12llcvu">Once claimed, your full position will appear in the &quot;My Position&quot; card, showing your DTUSDC balance and its value in USDC.</p></div></div>  <div class="info-box full-width svelte-12llcvu" data-svelte-h="svelte-1a0ikgz"><h4 class="svelte-12llcvu"><em class="svelte-12llcvu">\u{1F4A1} How Your Position Value is Calculated</em></h4> <p class="svelte-12llcvu"><em class="svelte-12llcvu">Your vault value = Number of DTUSDC shares \xD7 Price per share (in USDC)</em></p> <p class="svelte-12llcvu"><em class="svelte-12llcvu">The price per share is calculated as: NAV \xF7 Total number of shares</em></p></div></section> <div class="divider svelte-12llcvu"></div> <section id="withdraw" class="content-section featured-guide svelte-12llcvu"><h3 class="svelte-12llcvu" data-svelte-h="svelte-c75nzo"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-10"></path><path d="m8 13 4-4 4 4"></path><path d="M4 20h16"></path></svg>
      How to Withdraw</h3> <p class="guide-note svelte-12llcvu" data-svelte-h="svelte-12vo49x">This guide uses the DeTrade Core USDC Vault as an example, but the process remains the same for all current and future DeTrade vaults.</p> <div class="steps-grid svelte-12llcvu" data-svelte-h="svelte-zj91ap"><div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">1. Connect Your Wallet</h4> <p class="svelte-12llcvu">Start by connecting your wallet on the DeTrade app.</p></div> <div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">2. Go to the Vault Page</h4> <p class="svelte-12llcvu">Head over to the vault you wish to withdraw from. For example: DeTrade Core USDC.</p></div> <div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">3. Check Your Position</h4> <p class="svelte-12llcvu">Verify your available balance in the &quot;My Position&quot; card, showing your DTUSDC balance and its current value in USDC.</p></div> <div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">4. Click &quot;Withdraw&quot;</h4> <p class="svelte-12llcvu">On the vault page, find the &quot;My Position&quot; card and click &quot;Withdraw&quot;.</p></div> <div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">5. Enter Withdrawal Amount</h4> <p class="svelte-12llcvu">Enter the amount of DTUSDC tokens you&#39;d like to withdraw, click &quot;Withdraw&quot;, and sign the transaction in your wallet.</p></div> <div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">6. Submit Withdrawal</h4> <p class="svelte-12llcvu">Confirm your withdrawal request by signing the transaction. This will queue your withdrawal for the next settlement period.</p></div></div> <div class="demo-container svelte-12llcvu"><img${add_attribute("src", withdrawGifSrc, 0)} alt="Demonstration of withdrawal process" class="demo-gif svelte-12llcvu"></div> <div class="full-width-step svelte-12llcvu" data-svelte-h="svelte-p9vsfx"><div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">7. Wait for Processing</h4> <p class="svelte-12llcvu">Once the transaction is confirmed, you&#39;ll see a &quot;Withdrawal Pending&quot; message. Your withdrawal request will be processed during the next NAV update and settlement period, typically within 24 hours.</p> <p class="note svelte-12llcvu">Note: If you have both deposit and withdrawal requests pending at the same time, you&#39;ll see both status cards displayed simultaneously, as shown below.</p></div> <div class="demo-container svelte-12llcvu"><img src="/pending_withdraw.gif" alt="Pending withdrawal demonstration" class="demo-gif svelte-12llcvu"></div></div> <div class="steps-grid svelte-12llcvu" data-svelte-h="svelte-1q24wyi"><div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">8. Claim Your USDC</h4> <p class="svelte-12llcvu">After the next NAV and settlement, you&#39;ll be prompted to claim your USDC. Simply click and sign the transaction to receive your funds.</p></div> <div class="step svelte-12llcvu"><h4 class="svelte-12llcvu">9. Check Your Wallet</h4> <p class="svelte-12llcvu">Once claimed, the USDC will appear in your wallet balance. Your position in the vault will be reduced accordingly.</p></div></div> <div class="info-box full-width svelte-12llcvu" data-svelte-h="svelte-ln8nu"><h4 class="svelte-12llcvu"><em class="svelte-12llcvu">\u{1F4A1} Understanding Withdrawal Value</em></h4> <p class="svelte-12llcvu"><em class="svelte-12llcvu">Your withdrawal value = Number of DTUSDC shares withdrawn \xD7 Next settlement price per share (in USDC)</em></p> <p class="svelte-12llcvu"><em class="svelte-12llcvu">The price per share will be calculated at the next NAV update as: NAV \xF7 Total number of shares</em></p> <p class="note svelte-12llcvu"><em class="svelte-12llcvu">Note: The actual value you receive will be based on the vault&#39;s NAV at the next settlement, not the current displayed price.</em></p></div></section> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6
});
var index6, component_cache6, component6, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    index6 = 5;
    component6 = async () => component_cache6 ?? (component_cache6 = (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default);
    imports6 = ["_app/immutable/nodes/5.DMZyTEY6.js", "_app/immutable/chunks/DipVNbI1.js", "_app/immutable/chunks/6iab5EmN.js", "_app/immutable/chunks/D0QH3NT1.js", "_app/immutable/chunks/C1OJwcYb.js"];
    stylesheets6 = ["_app/immutable/assets/5.B3vcS2hI.css"];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/security/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => Page5
});
var css6, Page5;
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/security/_page.svelte.js"() {
    init_ssr();
    init_client();
    css6 = {
      code: '.content.svelte-1jad4hj.svelte-1jad4hj{max-width:1200px;margin:0 auto;padding:2rem;color:var(--text-color)}.title-container.svelte-1jad4hj.svelte-1jad4hj{margin-bottom:3rem}h1.svelte-1jad4hj.svelte-1jad4hj{font-size:2.25rem;font-weight:700;margin-bottom:0.75rem;color:var(--text-color);display:flex;align-items:center;gap:1rem;-webkit-appearance:none;-moz-appearance:none;appearance:none;user-select:none;pointer-events:none;cursor:default}h1.svelte-1jad4hj svg.svelte-1jad4hj{pointer-events:none}h2.svelte-1jad4hj.svelte-1jad4hj{font-size:1.5rem;font-weight:600;margin-bottom:1.25rem;color:var(--text-color)}h3.svelte-1jad4hj.svelte-1jad4hj{font-size:1.2rem;font-weight:600;margin-bottom:1rem;color:var(--text-color)}p.svelte-1jad4hj.svelte-1jad4hj{font-size:0.95rem;line-height:1.6;color:var(--text-color);opacity:0.8;margin:0.75rem 0}.overview-description.svelte-1jad4hj.svelte-1jad4hj{font-size:1.1rem;color:var(--text-color);opacity:0.7;margin:0.5rem 0;line-height:1.5}.sections-grid.svelte-1jad4hj.svelte-1jad4hj{display:flex;flex-direction:column;gap:3rem}.risk-section.svelte-1jad4hj.svelte-1jad4hj{background:var(--card-background);border:1px solid var(--card-border);border-radius:16px;padding:1.5rem;scroll-margin-top:80px}.risk-cards-grid.svelte-1jad4hj.svelte-1jad4hj{display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:1.5rem;margin:1.5rem 0}.risk-card.svelte-1jad4hj.svelte-1jad4hj{background:var(--card-background);border:1px solid var(--card-border);border-radius:12px;padding:1.25rem;margin:0;transition:all 0.2s ease}.risk-card.svelte-1jad4hj.svelte-1jad4hj:hover{transform:translateY(-2px);background:var(--secondary-background)}.note.svelte-1jad4hj.svelte-1jad4hj{font-style:italic;background:rgba(96, 165, 250, 0.1);border:1px solid var(--card-border);border-radius:8px;padding:1.5rem;margin-top:1.5rem;transition:all 0.2s ease;color:var(--text-color);display:flex;gap:0.5rem;align-items:flex-start}.note.svelte-1jad4hj.svelte-1jad4hj:hover{background:rgba(96, 165, 250, 0.15)}@media(max-width: 768px){.content.svelte-1jad4hj.svelte-1jad4hj{padding:1rem}h1.svelte-1jad4hj.svelte-1jad4hj{font-size:2rem}h2.svelte-1jad4hj.svelte-1jad4hj{font-size:1.3rem}h3.svelte-1jad4hj.svelte-1jad4hj{font-size:1.1rem}.risk-cards-grid.svelte-1jad4hj.svelte-1jad4hj{grid-template-columns:1fr}.risk-card.svelte-1jad4hj.svelte-1jad4hj{padding:1rem}}a{color:#3b82f6;text-decoration:underline}a:not(.no-arrow):first-of-type::after{content:"\u2197";display:inline-block;font-size:0.9em;margin-left:0.2rem;transition:transform 0.2s}a:first-of-type:hover::after{transform:translate(2px, -2px)}a:hover{color:#2563eb}.audit-image.svelte-1jad4hj.svelte-1jad4hj{width:100%;height:160px;border-radius:8px;margin-bottom:1rem;object-fit:cover;object-position:center}.audit-card.svelte-1jad4hj.svelte-1jad4hj{display:flex;flex-direction:column;justify-content:space-between;height:100%}.audit-link.svelte-1jad4hj.svelte-1jad4hj{display:flex;align-items:center;gap:0.5rem;margin-top:1rem;padding:0.5rem;border-radius:8px;background:rgba(59, 130, 246, 0.1);transition:all 0.2s ease;text-decoration:none !important}.audit-link.svelte-1jad4hj.svelte-1jad4hj:hover{background:rgba(59, 130, 246, 0.2);transform:translateY(-2px)}.audit-link.svelte-1jad4hj svg.svelte-1jad4hj{width:20px;height:20px}.divider.svelte-1jad4hj.svelte-1jad4hj{width:100%;height:1px;background:var(--text-color);margin:2rem 0;opacity:0.1}',
      map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<div class=\\"content\\">\\n  <div class=\\"title-container\\">\\n    <h1>\\n      <svg width=\\"36\\" height=\\"36\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <path d=\\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\\"/>\\n      </svg>\\n      Security and Risk\\n    </h1>\\n    <p class=\\"overview-description\\">Understanding the Risks: Security, Infrastructure & Valuation Integrity</p>\\n  </div>\\n\\n  <div class=\\"sections-grid\\">\\n    <section id=\\"defi-exposure\\" class=\\"risk-section\\">\\n      <h2>DeFi Exposure</h2>\\n      <p>While DeTrade prioritizes capital preservation through careful protocol selection, investing in DeFi protocols comes with inherent risks that users must fully understand.</p>\\n      \\n      <div class=\\"risk-cards-grid\\">\\n        <div class=\\"risk-card\\">\\n          <h3>Smart Contract Risk</h3>\\n          <p>All vault operations rely on smart contracts, especially those built by Lagoon and other DeFi protocols. Even if contracts have been audited, the risk of bugs, exploits, or vulnerabilities remains. A single flaw can lead to partial or total loss of funds.</p>\\n        </div>\\n\\n        <div class=\\"risk-card\\">\\n          <h3>Depeg Risk</h3>\\n          <p>Many vaults hold assets like stablecoins, staked ETH, or Liquid Staking Tokens (LSTs). These assets are designed to track a reference value (e.g., $1 or ETH), but may lose their peg due to market stress, poor collateral management, or systemic failures. A depeg event can significantly impact vault value, either temporarily or permanently.</p>\\n        </div>\\n      </div>\\n\\n      <p class=\\"note\\">\\n        \u{1F4A1} DeTrade takes these risks very seriously. Every opportunity is analyzed in depth, and funds are only deployed when the potential returns clearly outweigh the associated risks \u2014 and when those risks are sufficiently mitigated by the protocol's design and security practices. If our assessment reveals unacceptable exposure, we do not invest, regardless of how attractive the returns may seem.\\n      </p>\\n    </section>\\n\\n    <div class=\\"divider\\"></div>\\n\\n    <section id=\\"infrastructure\\" class=\\"risk-section\\">\\n      <h2>Infrastructure</h2>\\n      <p>DeTrade operates on top of Lagoon infrastructure, leveraging audited smart contracts and additional safety mechanisms to protect users' capital. However, even with robust engineering and multiple security layers, risks remain.</p>\\n\\n      <div class=\\"risk-cards-grid\\">\\n        <div class=\\"risk-card\\">\\n          <h3>Lagoon Smart Contracts</h3>\\n          <p>All vault logic \u2014 including deposits, withdrawals, and yield strategies \u2014 runs on Lagoon contracts audited by Nethermind, a reputable firm in the Ethereum ecosystem. While audits drastically reduce risk, they do not eliminate the possibility of vulnerabilities or edge-case failures.</p>\\n        </div>\\n\\n        <div class=\\"risk-card\\">\\n          <h3>Multisig Governance</h3>\\n          <p>Vault management is secured by a multisignature wallet (multisig), ensuring no single party can control or move funds unilaterally. This setup greatly enhances security but still carries a non-zero risk as the multisig itself is a smart contract potentially subject to bugs or mismanagement.</p>\\n        </div>\\n\\n        <div class=\\"risk-card\\">\\n          <h3>Cooldown Mechanisms</h3>\\n          <p>Deposits and withdrawals are subject to cooldown periods to prevent abuse or timing-based attacks. These mechanisms improve security and protocol stability, though they introduce a short delay in liquidity access and are not a universal safeguard against all threat vectors.</p>\\n        </div>\\n      </div>\\n\\n      <p class=\\"note\\">\\n        \u{1F4A1} Our infrastructure has been thoroughly audited by Nethermind, with multiple security reviews available in the Audits section below, covering both core protocol mechanisms and specific implementations.\\n      </p>\\n    </section>\\n\\n    <div class=\\"divider\\"></div>\\n\\n    <section id=\\"oracle-design\\" class=\\"risk-section\\">\\n      <h2>Oracle Design</h2>\\n      <p>Unlike many DeFi systems that rely on automated price feeds, DeTrade has adopted a manual oracle system for computing and updating the Net Asset Value (NAV) of each vault \u2014 a key choice for security.</p>\\n\\n      <div class=\\"risk-cards-grid\\">\\n        <div class=\\"risk-card\\">\\n          <h3>Off-Chain Valuation</h3>\\n          <p>Vault values are calculated off-chain by the DeTrade team using real yield data from the underlying strategies. This valuation is not driven by on-chain oracles, which are often vulnerable to manipulation.</p>\\n        </div>\\n\\n        <div class=\\"risk-card\\">\\n          <h3>Human Verification</h3>\\n          <p>Every NAV update and subsequent minting or burning of shares undergoes manual validation before being submitted on-chain. This ensures no automated process can be exploited to manipulate the share price or create arbitrage opportunities.</p>\\n        </div>\\n\\n        <div class=\\"risk-card\\">\\n          <h3>Exploit Mitigation</h3>\\n          <p>By removing real-time on-chain price feeds from the critical path, DeTrade eliminates common oracle manipulation vectors (e.g., flash loan-based price distortion), making it far more difficult for attackers to game the system during deposits or withdrawals.</p>\\n        </div>\\n      </div>\\n\\n      <p class=\\"note\\">\\n        \u{1F4A1} This manual, human-in-the-loop system strengthens DeTrade's resistance to one of DeFi's most common attack surfaces \u2014 price oracle exploits \u2014 while maintaining transparency and operational control.\\n      </p>\\n    </section>\\n\\n    <div class=\\"divider\\"></div>\\n\\n    <section id=\\"audit\\" class=\\"risk-section\\">\\n      <h2>\\n        Audits\\n      </h2>\\n      <p>DeTrade's security is built on Lagoon's thoroughly audited infrastructure. These comprehensive audits, conducted by Nethermind, one of the most respected security firms in the Ethereum ecosystem, validate both Lagoon's core infrastructure and the specific implementations used by DeTrade.</p>\\n\\n      <div class=\\"risk-cards-grid\\">\\n        <div class=\\"risk-card audit-card\\">\\n          <img src=\\"/nethermind_security.avif\\" alt=\\"Nethermind Security\\" class=\\"audit-image\\" />\\n          <h3>Scope - Beta release (v0.2.0)</h3>\\n          <p>30-01-2025</p>\\n          <a href=\\"/NM_0432_Lagoon.pdf\\" target=\\"_blank\\" class=\\"audit-link\\">\\n            <svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n              <path d=\\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\\"></path>\\n              <polyline points=\\"14 2 14 8 20 8\\"></polyline>\\n              <line x1=\\"12\\" y1=\\"18\\" x2=\\"12\\" y2=\\"12\\"></line>\\n              <line x1=\\"9\\" y1=\\"15\\" x2=\\"15\\" y2=\\"15\\"></line>\\n            </svg>\\n            View Audit Report\\n          </a>\\n        </div>\\n\\n        <div class=\\"risk-card audit-card\\">\\n          <img src=\\"/nethermind_security.avif\\" alt=\\"Nethermind Security\\" class=\\"audit-image\\" />\\n          <h3>Scope - Beta release (v0.1.0)</h3>\\n          <p>07-11-2024</p>\\n          <a href=\\"/NM_0304_HopperLabs.pdf\\" target=\\"_blank\\" class=\\"audit-link\\">\\n            <svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n              <path d=\\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\\"></path>\\n              <polyline points=\\"14 2 14 8 20 8\\"></polyline>\\n              <line x1=\\"12\\" y1=\\"18\\" x2=\\"12\\" y2=\\"12\\"></line>\\n              <line x1=\\"9\\" y1=\\"15\\" x2=\\"15\\" y2=\\"15\\"></line>\\n            </svg>\\n            View Audit Report\\n          </a>\\n        </div>\\n\\n        <div class=\\"risk-card audit-card\\">\\n          <img src=\\"/lagoon-review.avif\\" alt=\\"Lagoon Security Review\\" class=\\"audit-image\\" />\\n          <h3>Scope Beta release (v0.1.0)</h3>\\n          <p>27-09-2024</p>\\n          <a href=\\"/lagoon-review.pdf\\" target=\\"_blank\\" class=\\"audit-link\\">\\n            <svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\">\\n              <path d=\\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\\"></path>\\n              <polyline points=\\"14 2 14 8 20 8\\"></polyline>\\n              <line x1=\\"12\\" y1=\\"18\\" x2=\\"12\\" y2=\\"12\\"></line>\\n              <line x1=\\"9\\" y1=\\"15\\" x2=\\"15\\" y2=\\"15\\"></line>\\n            </svg>\\n            View Audit Report\\n          </a>\\n        </div>\\n      </div>\\n\\n      <p class=\\"note\\">\\n        \u{1F4A1} While these audits significantly strengthen our security posture, we maintain ongoing vigilance and continuous security monitoring as part of our commitment to protecting user funds.\\n      </p>\\n    </section>\\n  </div>\\n</div>\\n\\n<style>\\n  .content {\\n    max-width: 1200px;\\n    margin: 0 auto;\\n    padding: 2rem;\\n    color: var(--text-color);\\n  }\\n\\n  .title-container {\\n    margin-bottom: 3rem;\\n  }\\n\\n  h1 {\\n    font-size: 2.25rem;\\n    font-weight: 700;\\n    margin-bottom: 0.75rem;\\n    color: var(--text-color);\\n    display: flex;\\n    align-items: center;\\n    gap: 1rem;\\n    -webkit-appearance: none;\\n    -moz-appearance: none;\\n    appearance: none;\\n    user-select: none;\\n    pointer-events: none;\\n    cursor: default;\\n  }\\n\\n  h1 svg {\\n    pointer-events: none;\\n  }\\n\\n  h2 {\\n    font-size: 1.5rem;\\n    font-weight: 600;\\n    margin-bottom: 1.25rem;\\n    color: var(--text-color);\\n  }\\n\\n  h3 {\\n    font-size: 1.2rem;\\n    font-weight: 600;\\n    margin-bottom: 1rem;\\n    color: var(--text-color);\\n  }\\n\\n  p {\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    margin: 0.75rem 0;\\n  }\\n\\n  .overview-description {\\n    font-size: 1.1rem;\\n    color: var(--text-color);\\n    opacity: 0.7;\\n    margin: 0.5rem 0;\\n    line-height: 1.5;\\n  }\\n\\n  .intro-text {\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    margin-top: 1.5rem;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n  }\\n\\n  .sections-grid {\\n    display: flex;\\n    flex-direction: column;\\n    gap: 3rem;\\n  }\\n\\n  .risk-section {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 16px;\\n    padding: 1.5rem;\\n    scroll-margin-top: 80px;\\n  }\\n\\n  .risk-cards-grid {\\n    display: grid;\\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\\n    gap: 1.5rem;\\n    margin: 1.5rem 0;\\n  }\\n\\n  .risk-card {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 12px;\\n    padding: 1.25rem;\\n    margin: 0;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .risk-card:hover {\\n    transform: translateY(-2px);\\n    background: var(--secondary-background);\\n  }\\n\\n  .note {\\n    font-style: italic;\\n    background: rgba(96, 165, 250, 0.1);\\n    border: 1px solid var(--card-border);\\n    border-radius: 8px;\\n    padding: 1.5rem;\\n    margin-top: 1.5rem;\\n    transition: all 0.2s ease;\\n    color: var(--text-color);\\n    display: flex;\\n    gap: 0.5rem;\\n    align-items: flex-start;\\n  }\\n\\n  .note:hover {\\n    background: rgba(96, 165, 250, 0.15);\\n  }\\n\\n  @media (max-width: 768px) {\\n    .content {\\n      padding: 1rem;\\n    }\\n\\n    h1 {\\n      font-size: 2rem;\\n    }\\n\\n    h2 {\\n      font-size: 1.3rem;\\n    }\\n\\n    h3 {\\n      font-size: 1.1rem;\\n    }\\n\\n    .risk-cards-grid {\\n      grid-template-columns: 1fr;\\n    }\\n\\n    .risk-card {\\n      padding: 1rem;\\n    }\\n  }\\n\\n  .faq-card {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 16px;\\n    padding: 1.5rem;\\n    margin-bottom: 1.5rem;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .faq-card:hover {\\n    transform: translateY(-2px);\\n    background: var(--secondary-background);\\n  }\\n\\n  :global(a) {\\n    color: #3b82f6;\\n    text-decoration: underline;\\n  }\\n\\n  :global(a:not(.no-arrow):first-of-type::after) {\\n    content: \\"\u2197\\";\\n    display: inline-block;\\n    font-size: 0.9em;\\n    margin-left: 0.2rem;\\n    transition: transform 0.2s;\\n  }\\n\\n  :global(a:first-of-type:hover::after) {\\n    transform: translate(2px, -2px);\\n  }\\n\\n  :global(a:hover) {\\n    color: #2563eb;\\n  }\\n\\n  .audit-image {\\n    width: 100%;\\n    height: 160px;\\n    border-radius: 8px;\\n    margin-bottom: 1rem;\\n    object-fit: cover;\\n    object-position: center;\\n  }\\n\\n  .audit-card {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: space-between;\\n    height: 100%;\\n  }\\n\\n  .audit-link {\\n    display: flex;\\n    align-items: center;\\n    gap: 0.5rem;\\n    margin-top: 1rem;\\n    padding: 0.5rem;\\n    border-radius: 8px;\\n    background: rgba(59, 130, 246, 0.1);\\n    transition: all 0.2s ease;\\n    text-decoration: none !important;\\n  }\\n\\n  .audit-link:hover {\\n    background: rgba(59, 130, 246, 0.2);\\n    transform: translateY(-2px);\\n  }\\n\\n  .audit-link svg {\\n    width: 20px;\\n    height: 20px;\\n  }\\n\\n  .divider {\\n    width: 100%;\\n    height: 1px;\\n    background: var(--text-color);\\n    margin: 2rem 0;\\n    opacity: 0.1;\\n  }\\n</style>\\n\\n<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { page } from \\"$app/stores\\";\\nlet currentHash = \\"\\";\\nonMount(() => {\\n  currentHash = window.location.hash.slice(1);\\n  window.addEventListener(\\"hashchange\\", () => {\\n    currentHash = window.location.hash.slice(1);\\n    updateMetaTags();\\n  });\\n  return () => {\\n    window.removeEventListener(\\"hashchange\\", () => {\\n    });\\n  };\\n});\\nfunction updateMetaTags() {\\n  let title = \\"Security \\\\u2013 DeTrade\\";\\n  let description = \\"Learn about DeTrade's security measures, audits, and risk management practices.\\";\\n  switch (currentHash) {\\n    case \\"defi-exposure\\":\\n      title = \\"DeFi Exposure \\\\u2013 DeTrade\\";\\n      description = \\"Understand DeTrade's approach to DeFi exposure and risk management in vault operations.\\";\\n      break;\\n    case \\"infrastructure\\":\\n      title = \\"Infrastructure \\\\u2013 DeTrade\\";\\n      description = \\"Explore DeTrade's secure infrastructure built on Lagoon and protected by multiple security layers.\\";\\n      break;\\n    case \\"oracle-design\\":\\n      title = \\"Oracle Design \\\\u2013 DeTrade\\";\\n      description = \\"Learn about DeTrade's oracle system design and how it ensures accurate value computation.\\";\\n      break;\\n    case \\"audit\\":\\n      title = \\"Audits \\\\u2013 DeTrade\\";\\n      description = \\"Review DeTrade's security audits conducted by Nethermind and other leading firms.\\";\\n      break;\\n  }\\n  document.title = title;\\n  const metaDescription = document.querySelector('meta[name=\\"description\\"]');\\n  const ogTitle = document.querySelector('meta[property=\\"og:title\\"]');\\n  const ogDescription = document.querySelector('meta[property=\\"og:description\\"]');\\n  const twitterTitle = document.querySelector('meta[name=\\"twitter:title\\"]');\\n  const twitterDescription = document.querySelector('meta[name=\\"twitter:description\\"]');\\n  if (metaDescription) metaDescription.setAttribute(\\"content\\", description);\\n  if (ogTitle) ogTitle.setAttribute(\\"content\\", title);\\n  if (ogDescription) ogDescription.setAttribute(\\"content\\", description);\\n  if (twitterTitle) twitterTitle.setAttribute(\\"content\\", title);\\n  if (twitterDescription) twitterDescription.setAttribute(\\"content\\", description);\\n}\\n<\/script>\\n\\n<svelte:head>\\n  <title>{currentHash ? \`\${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} \u2013 DeTrade\` : 'Security \u2013 DeTrade'}</title>\\n  <meta name=\\"description\\" content=\\"Learn about DeTrade's security measures, audits, and risk management practices.\\" />\\n  <meta property=\\"og:title\\" content={currentHash ? \`\${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} \u2013 DeTrade\` : 'Security \u2013 DeTrade'} />\\n  <meta property=\\"og:description\\" content=\\"Learn about DeTrade's security measures, audits, and risk management practices.\\" />\\n  <meta name=\\"twitter:title\\" content={currentHash ? \`\${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} \u2013 DeTrade\` : 'Security \u2013 DeTrade'} />\\n  <meta name=\\"twitter:description\\" content=\\"Learn about DeTrade's security measures, audits, and risk management practices.\\" />\\n</svelte:head> "],"names":[],"mappings":"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"}`
    };
    Page5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css6);
      return `<div class="content svelte-1jad4hj" data-svelte-h="svelte-19vnuhk"><div class="title-container svelte-1jad4hj"><h1 class="svelte-1jad4hj"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-1jad4hj"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      Security and Risk</h1> <p class="overview-description svelte-1jad4hj">Understanding the Risks: Security, Infrastructure &amp; Valuation Integrity</p></div> <div class="sections-grid svelte-1jad4hj"><section id="defi-exposure" class="risk-section svelte-1jad4hj"><h2 class="svelte-1jad4hj">DeFi Exposure</h2> <p class="svelte-1jad4hj">While DeTrade prioritizes capital preservation through careful protocol selection, investing in DeFi protocols comes with inherent risks that users must fully understand.</p> <div class="risk-cards-grid svelte-1jad4hj"><div class="risk-card svelte-1jad4hj"><h3 class="svelte-1jad4hj">Smart Contract Risk</h3> <p class="svelte-1jad4hj">All vault operations rely on smart contracts, especially those built by Lagoon and other DeFi protocols. Even if contracts have been audited, the risk of bugs, exploits, or vulnerabilities remains. A single flaw can lead to partial or total loss of funds.</p></div> <div class="risk-card svelte-1jad4hj"><h3 class="svelte-1jad4hj">Depeg Risk</h3> <p class="svelte-1jad4hj">Many vaults hold assets like stablecoins, staked ETH, or Liquid Staking Tokens (LSTs). These assets are designed to track a reference value (e.g., $1 or ETH), but may lose their peg due to market stress, poor collateral management, or systemic failures. A depeg event can significantly impact vault value, either temporarily or permanently.</p></div></div> <p class="note svelte-1jad4hj">\u{1F4A1} DeTrade takes these risks very seriously. Every opportunity is analyzed in depth, and funds are only deployed when the potential returns clearly outweigh the associated risks \u2014 and when those risks are sufficiently mitigated by the protocol&#39;s design and security practices. If our assessment reveals unacceptable exposure, we do not invest, regardless of how attractive the returns may seem.</p></section> <div class="divider svelte-1jad4hj"></div> <section id="infrastructure" class="risk-section svelte-1jad4hj"><h2 class="svelte-1jad4hj">Infrastructure</h2> <p class="svelte-1jad4hj">DeTrade operates on top of Lagoon infrastructure, leveraging audited smart contracts and additional safety mechanisms to protect users&#39; capital. However, even with robust engineering and multiple security layers, risks remain.</p> <div class="risk-cards-grid svelte-1jad4hj"><div class="risk-card svelte-1jad4hj"><h3 class="svelte-1jad4hj">Lagoon Smart Contracts</h3> <p class="svelte-1jad4hj">All vault logic \u2014 including deposits, withdrawals, and yield strategies \u2014 runs on Lagoon contracts audited by Nethermind, a reputable firm in the Ethereum ecosystem. While audits drastically reduce risk, they do not eliminate the possibility of vulnerabilities or edge-case failures.</p></div> <div class="risk-card svelte-1jad4hj"><h3 class="svelte-1jad4hj">Multisig Governance</h3> <p class="svelte-1jad4hj">Vault management is secured by a multisignature wallet (multisig), ensuring no single party can control or move funds unilaterally. This setup greatly enhances security but still carries a non-zero risk as the multisig itself is a smart contract potentially subject to bugs or mismanagement.</p></div> <div class="risk-card svelte-1jad4hj"><h3 class="svelte-1jad4hj">Cooldown Mechanisms</h3> <p class="svelte-1jad4hj">Deposits and withdrawals are subject to cooldown periods to prevent abuse or timing-based attacks. These mechanisms improve security and protocol stability, though they introduce a short delay in liquidity access and are not a universal safeguard against all threat vectors.</p></div></div> <p class="note svelte-1jad4hj">\u{1F4A1} Our infrastructure has been thoroughly audited by Nethermind, with multiple security reviews available in the Audits section below, covering both core protocol mechanisms and specific implementations.</p></section> <div class="divider svelte-1jad4hj"></div> <section id="oracle-design" class="risk-section svelte-1jad4hj"><h2 class="svelte-1jad4hj">Oracle Design</h2> <p class="svelte-1jad4hj">Unlike many DeFi systems that rely on automated price feeds, DeTrade has adopted a manual oracle system for computing and updating the Net Asset Value (NAV) of each vault \u2014 a key choice for security.</p> <div class="risk-cards-grid svelte-1jad4hj"><div class="risk-card svelte-1jad4hj"><h3 class="svelte-1jad4hj">Off-Chain Valuation</h3> <p class="svelte-1jad4hj">Vault values are calculated off-chain by the DeTrade team using real yield data from the underlying strategies. This valuation is not driven by on-chain oracles, which are often vulnerable to manipulation.</p></div> <div class="risk-card svelte-1jad4hj"><h3 class="svelte-1jad4hj">Human Verification</h3> <p class="svelte-1jad4hj">Every NAV update and subsequent minting or burning of shares undergoes manual validation before being submitted on-chain. This ensures no automated process can be exploited to manipulate the share price or create arbitrage opportunities.</p></div> <div class="risk-card svelte-1jad4hj"><h3 class="svelte-1jad4hj">Exploit Mitigation</h3> <p class="svelte-1jad4hj">By removing real-time on-chain price feeds from the critical path, DeTrade eliminates common oracle manipulation vectors (e.g., flash loan-based price distortion), making it far more difficult for attackers to game the system during deposits or withdrawals.</p></div></div> <p class="note svelte-1jad4hj">\u{1F4A1} This manual, human-in-the-loop system strengthens DeTrade&#39;s resistance to one of DeFi&#39;s most common attack surfaces \u2014 price oracle exploits \u2014 while maintaining transparency and operational control.</p></section> <div class="divider svelte-1jad4hj"></div> <section id="audit" class="risk-section svelte-1jad4hj"><h2 class="svelte-1jad4hj">Audits</h2> <p class="svelte-1jad4hj">DeTrade&#39;s security is built on Lagoon&#39;s thoroughly audited infrastructure. These comprehensive audits, conducted by Nethermind, one of the most respected security firms in the Ethereum ecosystem, validate both Lagoon&#39;s core infrastructure and the specific implementations used by DeTrade.</p> <div class="risk-cards-grid svelte-1jad4hj"><div class="risk-card audit-card svelte-1jad4hj"><img src="/nethermind_security.avif" alt="Nethermind Security" class="audit-image svelte-1jad4hj"> <h3 class="svelte-1jad4hj">Scope - Beta release (v0.2.0)</h3> <p class="svelte-1jad4hj">30-01-2025</p> <a href="/NM_0432_Lagoon.pdf" target="_blank" class="audit-link svelte-1jad4hj"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-1jad4hj"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
            View Audit Report</a></div> <div class="risk-card audit-card svelte-1jad4hj"><img src="/nethermind_security.avif" alt="Nethermind Security" class="audit-image svelte-1jad4hj"> <h3 class="svelte-1jad4hj">Scope - Beta release (v0.1.0)</h3> <p class="svelte-1jad4hj">07-11-2024</p> <a href="/NM_0304_HopperLabs.pdf" target="_blank" class="audit-link svelte-1jad4hj"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-1jad4hj"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
            View Audit Report</a></div> <div class="risk-card audit-card svelte-1jad4hj"><img src="/lagoon-review.avif" alt="Lagoon Security Review" class="audit-image svelte-1jad4hj"> <h3 class="svelte-1jad4hj">Scope Beta release (v0.1.0)</h3> <p class="svelte-1jad4hj">27-09-2024</p> <a href="/lagoon-review.pdf" target="_blank" class="audit-link svelte-1jad4hj"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-1jad4hj"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
            View Audit Report</a></div></div> <p class="note svelte-1jad4hj">\u{1F4A1} While these audits significantly strengthen our security posture, we maintain ongoing vigilance and continuous security monitoring as part of our commitment to protecting user funds.</p></section></div></div>   ${$$result.head += `<!-- HEAD_svelte-11b1hg_START -->${$$result.title = `<title>${escape("Security \u2013 DeTrade")}</title>`, ""}<meta name="description" content="Learn about DeTrade's security measures, audits, and risk management practices."><meta property="og:title"${add_attribute(
        "content",
        "Security \u2013 DeTrade",
        0
      )}><meta property="og:description" content="Learn about DeTrade's security measures, audits, and risk management practices."><meta name="twitter:title"${add_attribute(
        "content",
        "Security \u2013 DeTrade",
        0
      )}><meta name="twitter:description" content="Learn about DeTrade's security measures, audits, and risk management practices."><!-- HEAD_svelte-11b1hg_END -->`, ""}`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7
});
var index7, component_cache7, component7, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    index7 = 6;
    component7 = async () => component_cache7 ?? (component_cache7 = (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default);
    imports7 = ["_app/immutable/nodes/6.Di_QBy1W.js", "_app/immutable/chunks/DipVNbI1.js", "_app/immutable/chunks/6iab5EmN.js", "_app/immutable/chunks/D0QH3NT1.js", "_app/immutable/chunks/C1OJwcYb.js"];
    stylesheets7 = ["_app/immutable/assets/6.-MBG2nln.css"];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/vaults/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => Page6
});
var css7, Page6;
var init_page_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/vaults/_page.svelte.js"() {
    init_ssr();
    init_client();
    css7 = {
      code: '.content.svelte-1wqtz13.svelte-1wqtz13{max-width:1200px;margin:0 auto;padding:2rem;color:var(--text-color)}.title-container.svelte-1wqtz13.svelte-1wqtz13{margin-bottom:3rem}h1.svelte-1wqtz13.svelte-1wqtz13{font-size:2.25rem;font-weight:700;margin-bottom:0.75rem;color:var(--text-color);display:flex;align-items:center;gap:1rem;-webkit-appearance:none;-moz-appearance:none;appearance:none;user-select:none;pointer-events:none;cursor:default}h1.svelte-1wqtz13 svg.svelte-1wqtz13{color:var(--text-color);stroke:currentColor;pointer-events:none}.overview-description.svelte-1wqtz13.svelte-1wqtz13{font-size:1.1rem;color:var(--text-color);opacity:0.7;margin:0.5rem 0;line-height:1.5}.vaults-grid.svelte-1wqtz13.svelte-1wqtz13{display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:1.5rem}.vault-card.svelte-1wqtz13.svelte-1wqtz13{background:var(--card-background);border:1px solid var(--card-border);border-radius:16px;padding:1.5rem;text-decoration:none;color:inherit;transition:transform 0.2s, background-color 0.2s}.vault-card.svelte-1wqtz13.svelte-1wqtz13:hover{transform:translateY(-2px);background:var(--secondary-background)}.vault-header.svelte-1wqtz13.svelte-1wqtz13{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}h2.svelte-1wqtz13.svelte-1wqtz13{font-size:1.5rem;font-weight:600;color:var(--text-color);margin:0}.network-badge.svelte-1wqtz13.svelte-1wqtz13{background:var(--card-background);color:var(--text-color);padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.85rem;font-weight:500;border:1px solid var(--card-border)}p.svelte-1wqtz13.svelte-1wqtz13{font-size:0.95rem;line-height:1.6;color:var(--text-color);opacity:0.8;margin:0 0 1.5rem 0}.vault-footer.svelte-1wqtz13.svelte-1wqtz13{display:flex;justify-content:space-between;align-items:center;font-size:0.85rem;color:var(--text-color);opacity:0.6}.intro-section.svelte-1wqtz13.svelte-1wqtz13{margin:2rem 0 3rem}.info-box.svelte-1wqtz13.svelte-1wqtz13{background:var(--card-background);border:1px solid var(--card-border);border-radius:16px;padding:1.75rem;margin-bottom:2rem;transition:all 0.2s ease}.info-box.svelte-1wqtz13 .svelte-1wqtz13{transition:color 0.2s, opacity 0.2s}.info-box.svelte-1wqtz13 h2.svelte-1wqtz13{color:var(--text-color);margin-bottom:1.5rem;opacity:1}.info-box.svelte-1wqtz13 p.svelte-1wqtz13{color:var(--text-color);opacity:0.8;margin:0.75rem 0;font-size:0.95rem;line-height:1.6}.info-box.svelte-1wqtz13 ul.svelte-1wqtz13{list-style:none;padding-left:1.5rem;margin:1rem 0;color:var(--text-color);transition:all 0.2s ease}.info-box.svelte-1wqtz13 li.svelte-1wqtz13{position:relative;margin-bottom:0.5rem;font-size:0.95rem;line-height:1.6;color:var(--text-color);transition:all 0.2s ease}.info-box.svelte-1wqtz13 li.svelte-1wqtz13,.info-box.svelte-1wqtz13 p.svelte-1wqtz13{opacity:0.8}.info-box.svelte-1wqtz13 li.svelte-1wqtz13::before{content:"\u2022";position:absolute;left:-1rem;transition:all 0.2s ease;opacity:0.8;color:var(--text-color)}.available-vaults.svelte-1wqtz13 h2.svelte-1wqtz13{margin-bottom:2rem}@media(max-width: 768px){h1.svelte-1wqtz13.svelte-1wqtz13{font-size:2rem}.vaults-grid.svelte-1wqtz13.svelte-1wqtz13{grid-template-columns:1fr}.info-box.svelte-1wqtz13.svelte-1wqtz13{padding:1.25rem}}',
      map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { page } from \\"$app/stores\\";\\nlet currentHash = \\"\\";\\nonMount(() => {\\n  currentHash = window.location.hash.slice(1);\\n  window.addEventListener(\\"hashchange\\", () => {\\n    currentHash = window.location.hash.slice(1);\\n    updateMetaTags();\\n  });\\n  return () => {\\n    window.removeEventListener(\\"hashchange\\", () => {\\n    });\\n  };\\n});\\nfunction updateMetaTags() {\\n  let title = \\"Vaults \\\\u2013 DeTrade\\";\\n  let description = \\"Explore DeTrade's smart contract-based investment vaults designed for optimized yields without speculation.\\";\\n  switch (currentHash) {\\n    case \\"core-usdc\\":\\n      title = \\"Core USDC Vault \\\\u2013 DeTrade\\";\\n      description = \\"Learn about DeTrade's Core USDC vault strategy for optimized stablecoin yields.\\";\\n      break;\\n    case \\"strategies\\":\\n      title = \\"Vault Strategies \\\\u2013 DeTrade\\";\\n      description = \\"Discover DeTrade's yield-generating strategies across DeFi protocols.\\";\\n      break;\\n  }\\n  document.title = title;\\n  const metaDescription = document.querySelector('meta[name=\\"description\\"]');\\n  const ogTitle = document.querySelector('meta[property=\\"og:title\\"]');\\n  const ogDescription = document.querySelector('meta[property=\\"og:description\\"]');\\n  const twitterTitle = document.querySelector('meta[name=\\"twitter:title\\"]');\\n  const twitterDescription = document.querySelector('meta[name=\\"twitter:description\\"]');\\n  if (metaDescription) metaDescription.setAttribute(\\"content\\", description);\\n  if (ogTitle) ogTitle.setAttribute(\\"content\\", title);\\n  if (ogDescription) ogDescription.setAttribute(\\"content\\", description);\\n  if (twitterTitle) twitterTitle.setAttribute(\\"content\\", title);\\n  if (twitterDescription) twitterDescription.setAttribute(\\"content\\", description);\\n}\\n<\/script>\\n\\n<svelte:head>\\n  <title>{currentHash ? \`\${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} \u2013 DeTrade\` : 'Vaults \u2013 DeTrade'}</title>\\n  <meta name=\\"description\\" content=\\"Explore DeTrade's smart contract-based investment vaults designed for optimized yields without speculation.\\" />\\n  <meta property=\\"og:title\\" content={currentHash ? \`\${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} \u2013 DeTrade\` : 'Vaults \u2013 DeTrade'} />\\n  <meta property=\\"og:description\\" content=\\"Explore DeTrade's smart contract-based investment vaults designed for optimized yields without speculation.\\" />\\n  <meta name=\\"twitter:title\\" content={currentHash ? \`\${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} \u2013 DeTrade\` : 'Vaults \u2013 DeTrade'} />\\n  <meta name=\\"twitter:description\\" content=\\"Explore DeTrade's smart contract-based investment vaults designed for optimized yields without speculation.\\" />\\n</svelte:head>\\n\\n<div class=\\"content\\">\\n  <div class=\\"title-container\\">\\n    <h1>\\n      <svg width=\\"36\\" height=\\"36\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <rect x=\\"3\\" y=\\"3\\" width=\\"18\\" height=\\"18\\" rx=\\"2\\" ry=\\"2\\"/>\\n        <circle cx=\\"12\\" cy=\\"10\\" r=\\"3\\"/>\\n        <path d=\\"M12 13v8\\"/>\\n        <path d=\\"M8 21h8\\"/>\\n      </svg>\\n      What Are DeTrade Vaults?\\n    </h1>\\n    <p class=\\"overview-description\\">DeTrade Vaults are smart contract-based investment strategies designed to grow your crypto assets without speculation.</p>\\n  </div>\\n\\n  <div class=\\"intro-section\\">\\n    <div class=\\"info-box\\">\\n      <h2>No speculation, just yield on your assets</h2>\\n      \\n      <p>Your capital remains pegged to the underlying asset through various yield-bearing tokens (e.g., for USDC: other stablecoins or yield tokens, for ETH/BTC: wrapped tokens or LSTs) and is deployed into yield-generating opportunities such as:</p>\\n      <ul>\\n        <li>Liquidity provisioning on top-tier DEXs</li>\\n        <li>Lending on secure lending markets</li>\\n        <li>Pegged yield-bearing assets</li>\\n        <li>Yield derivatives offering fixed or variable returns</li>\\n      </ul>\\n      \\n      <p>Our strategies are designed to maximize risk-adjusted yield through diversification and real-time monitoring, not through price betting or leverage on volatile assets.</p>\\n    </div>\\n  </div>\\n\\n  <div class=\\"available-vaults\\">\\n    <h2>Available Vaults</h2>\\n    <div class=\\"vaults-grid\\">\\n      <a href=\\"/vaults/detrade-core-usdc\\" class=\\"vault-card\\">\\n        <div class=\\"vault-header\\">\\n          <h2>DeTrade Core USDC</h2>\\n          <span class=\\"network-badge\\">Base</span>\\n        </div>\\n        <p>Optimized yield strategies for USDC with active risk management</p>\\n        <div class=\\"vault-footer\\">\\n          <span class=\\"asset-type\\">Stablecoin</span>\\n          <span class=\\"performance-fee\\">15% Performance Fee</span>\\n        </div>\\n      </a>\\n      \\n      <!-- D'autres vaults peuvent \xEAtre ajout\xE9s ici dans le futur -->\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n  .content {\\n    max-width: 1200px;\\n    margin: 0 auto;\\n    padding: 2rem;\\n    color: var(--text-color);\\n  }\\n\\n  .title-container {\\n    margin-bottom: 3rem;\\n  }\\n\\n  h1 {\\n    font-size: 2.25rem;\\n    font-weight: 700;\\n    margin-bottom: 0.75rem;\\n    color: var(--text-color);\\n    display: flex;\\n    align-items: center;\\n    gap: 1rem;\\n    -webkit-appearance: none;\\n    -moz-appearance: none;\\n    appearance: none;\\n    user-select: none;\\n    pointer-events: none;\\n    cursor: default;\\n  }\\n\\n  h1 svg {\\n    color: var(--text-color);\\n    stroke: currentColor;\\n    pointer-events: none;\\n  }\\n\\n  .overview-description {\\n    font-size: 1.1rem;\\n    color: var(--text-color);\\n    opacity: 0.7;\\n    margin: 0.5rem 0;\\n    line-height: 1.5;\\n  }\\n\\n  .vaults-grid {\\n    display: grid;\\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\\n    gap: 1.5rem;\\n  }\\n\\n  .vault-card {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 16px;\\n    padding: 1.5rem;\\n    text-decoration: none;\\n    color: inherit;\\n    transition: transform 0.2s, background-color 0.2s;\\n  }\\n\\n  .vault-card:hover {\\n    transform: translateY(-2px);\\n    background: var(--secondary-background);\\n  }\\n\\n  .vault-header {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    margin-bottom: 1rem;\\n  }\\n\\n  h2 {\\n    font-size: 1.5rem;\\n    font-weight: 600;\\n    color: var(--text-color);\\n    margin: 0;\\n  }\\n\\n  h2 svg {\\n    color: var(--text-color);\\n    stroke: currentColor;\\n  }\\n\\n  .network-badge {\\n    background: var(--card-background);\\n    color: var(--text-color);\\n    padding: 0.25rem 0.75rem;\\n    border-radius: 9999px;\\n    font-size: 0.85rem;\\n    font-weight: 500;\\n    border: 1px solid var(--card-border);\\n  }\\n\\n  p {\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    margin: 0 0 1.5rem 0;\\n  }\\n\\n  .vault-footer {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    font-size: 0.85rem;\\n    color: var(--text-color);\\n    opacity: 0.6;\\n  }\\n\\n  .intro-section {\\n    margin: 2rem 0 3rem;\\n  }\\n\\n  .info-box {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 16px;\\n    padding: 1.75rem;\\n    margin-bottom: 2rem;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .info-box * {\\n    transition: color 0.2s, opacity 0.2s;\\n  }\\n\\n  .info-box h2 {\\n    color: var(--text-color);\\n    margin-bottom: 1.5rem;\\n    opacity: 1;\\n  }\\n\\n  .info-box p {\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    margin: 0.75rem 0;\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n  }\\n\\n  .info-box ul {\\n    list-style: none;\\n    padding-left: 1.5rem;\\n    margin: 1rem 0;\\n    color: var(--text-color);\\n    transition: all 0.2s ease;\\n  }\\n\\n  .info-box li {\\n    position: relative;\\n    margin-bottom: 0.5rem;\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    color: var(--text-color);\\n    transition: all 0.2s ease;\\n  }\\n\\n  .info-box li, \\n  .info-box p {\\n    opacity: 0.8;\\n  }\\n\\n  .info-box li::before {\\n    content: \\"\u2022\\";\\n    position: absolute;\\n    left: -1rem;\\n    transition: all 0.2s ease;\\n    opacity: 0.8;\\n    color: var(--text-color);\\n  }\\n\\n  .section-divider {\\n    height: 1px;\\n    background: var(--border-color);\\n    margin: 3rem 0;\\n  }\\n\\n  .available-vaults h2 {\\n    margin-bottom: 2rem;\\n  }\\n\\n  .vault-details {\\n    margin-top: 3rem;\\n  }\\n\\n  .vault-section {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 16px;\\n    padding: 1.5rem;\\n    margin-bottom: 1.5rem;\\n  }\\n\\n  .vault-link {\\n    font-size: 1.1rem;\\n    color: var(--text-color);\\n    text-decoration: none;\\n    transition: color 0.2s;\\n  }\\n\\n  .vault-link:hover {\\n    color: var(--text-color);\\n    opacity: 0.8;\\n  }\\n\\n  .intro-text {\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    margin-top: 1.5rem;\\n  }\\n\\n  @media (max-width: 768px) {\\n    h1 {\\n      font-size: 2rem;\\n    }\\n\\n    .vaults-grid {\\n      grid-template-columns: 1fr;\\n    }\\n\\n    .info-box {\\n      padding: 1.25rem;\\n    }\\n  }\\n</style> "],"names":[],"mappings":"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"}`
    };
    Page6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css7);
      return `${$$result.head += `<!-- HEAD_svelte-1iqup1s_START -->${$$result.title = `<title>${escape("Vaults \u2013 DeTrade")}</title>`, ""}<meta name="description" content="Explore DeTrade's smart contract-based investment vaults designed for optimized yields without speculation."><meta property="og:title"${add_attribute(
        "content",
        "Vaults \u2013 DeTrade",
        0
      )}><meta property="og:description" content="Explore DeTrade's smart contract-based investment vaults designed for optimized yields without speculation."><meta name="twitter:title"${add_attribute(
        "content",
        "Vaults \u2013 DeTrade",
        0
      )}><meta name="twitter:description" content="Explore DeTrade's smart contract-based investment vaults designed for optimized yields without speculation."><!-- HEAD_svelte-1iqup1s_END -->`, ""} <div class="content svelte-1wqtz13" data-svelte-h="svelte-fdbcgh"><div class="title-container svelte-1wqtz13"><h1 class="svelte-1wqtz13"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-1wqtz13"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="12" cy="10" r="3"></circle><path d="M12 13v8"></path><path d="M8 21h8"></path></svg>
      What Are DeTrade Vaults?</h1> <p class="overview-description svelte-1wqtz13">DeTrade Vaults are smart contract-based investment strategies designed to grow your crypto assets without speculation.</p></div> <div class="intro-section svelte-1wqtz13"><div class="info-box svelte-1wqtz13"><h2 class="svelte-1wqtz13">No speculation, just yield on your assets</h2> <p class="svelte-1wqtz13">Your capital remains pegged to the underlying asset through various yield-bearing tokens (e.g., for USDC: other stablecoins or yield tokens, for ETH/BTC: wrapped tokens or LSTs) and is deployed into yield-generating opportunities such as:</p> <ul class="svelte-1wqtz13"><li class="svelte-1wqtz13">Liquidity provisioning on top-tier DEXs</li> <li class="svelte-1wqtz13">Lending on secure lending markets</li> <li class="svelte-1wqtz13">Pegged yield-bearing assets</li> <li class="svelte-1wqtz13">Yield derivatives offering fixed or variable returns</li></ul> <p class="svelte-1wqtz13">Our strategies are designed to maximize risk-adjusted yield through diversification and real-time monitoring, not through price betting or leverage on volatile assets.</p></div></div> <div class="available-vaults svelte-1wqtz13"><h2 class="svelte-1wqtz13">Available Vaults</h2> <div class="vaults-grid svelte-1wqtz13"><a href="/vaults/detrade-core-usdc" class="vault-card svelte-1wqtz13"><div class="vault-header svelte-1wqtz13"><h2 class="svelte-1wqtz13">DeTrade Core USDC</h2> <span class="network-badge svelte-1wqtz13">Base</span></div> <p class="svelte-1wqtz13">Optimized yield strategies for USDC with active risk management</p> <div class="vault-footer svelte-1wqtz13"><span class="asset-type">Stablecoin</span> <span class="performance-fee">15% Performance Fee</span></div></a> </div></div> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  stylesheets: () => stylesheets8
});
var index8, component_cache8, component8, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    index8 = 7;
    component8 = async () => component_cache8 ?? (component_cache8 = (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default);
    imports8 = ["_app/immutable/nodes/7.DG1tGexL.js", "_app/immutable/chunks/DipVNbI1.js", "_app/immutable/chunks/6iab5EmN.js", "_app/immutable/chunks/D0QH3NT1.js", "_app/immutable/chunks/C1OJwcYb.js"];
    stylesheets8 = ["_app/immutable/assets/7._S4XCqA_.css"];
    fonts8 = [];
  }
});

// .svelte-kit/output/server/entries/pages/vaults/detrade-core-usdc/_page.svelte.js
var page_svelte_exports7 = {};
__export(page_svelte_exports7, {
  default: () => Page7
});
var css8, Page7;
var init_page_svelte7 = __esm({
  ".svelte-kit/output/server/entries/pages/vaults/detrade-core-usdc/_page.svelte.js"() {
    init_ssr();
    css8 = {
      code: '.content.svelte-1evke.svelte-1evke.svelte-1evke{max-width:1200px;margin:0 auto;padding:2rem;color:var(--text-color)}.vault-header.svelte-1evke.svelte-1evke.svelte-1evke{margin-bottom:3rem}h1.svelte-1evke.svelte-1evke.svelte-1evke{font-size:2.5rem;font-weight:700;margin-bottom:1rem;color:var(--text-color);display:flex;align-items:center;gap:1rem;-webkit-appearance:none;-moz-appearance:none;appearance:none;user-select:none;pointer-events:none;cursor:default}h1.svelte-1evke svg.svelte-1evke.svelte-1evke{color:var(--text-color);stroke:currentColor;pointer-events:none}h2.svelte-1evke.svelte-1evke.svelte-1evke{font-size:1.75rem;font-weight:600;margin-bottom:1.5rem;color:var(--text-color)}section.svelte-1evke.svelte-1evke.svelte-1evke{margin-bottom:3rem;border:1px solid var(--card-border);border-radius:16px;padding:2rem;transition:all 0.2s ease;background:transparent}section.svelte-1evke.svelte-1evke.svelte-1evke:hover{transform:translateY(-2px);background:transparent}.vault-badges.svelte-1evke.svelte-1evke.svelte-1evke{display:flex;gap:1rem;margin-top:1rem}.badge.svelte-1evke.svelte-1evke.svelte-1evke{background:var(--card-background);color:var(--text-color);padding:0.5rem 1rem;border-radius:9999px;font-size:0.9rem;font-weight:500;border:1px solid var(--card-border)}.strategies-grid.svelte-1evke.svelte-1evke.svelte-1evke{display:grid;grid-template-columns:1fr;gap:0.75rem;margin:1.5rem 0}.strategy-card.svelte-1evke.svelte-1evke.svelte-1evke{padding:1.25rem;background:transparent;border:1px solid var(--card-border);border-radius:8px;transition:all 0.15s ease}.strategy-card.svelte-1evke.svelte-1evke.svelte-1evke:hover{background:var(--secondary-background)}.strategy-card.svelte-1evke h4.svelte-1evke.svelte-1evke{font-size:1rem;font-weight:600;margin:0 0 0.75rem 0;color:var(--text-color)}.strategy-card.svelte-1evke p.svelte-1evke.svelte-1evke{margin:0;font-size:0.95rem;line-height:1.6;color:var(--text-color);opacity:0.8}code.svelte-1evke.svelte-1evke.svelte-1evke{font-family:monospace;font-size:0.9rem;color:var(--text-color)}@media(max-width: 768px){.content.svelte-1evke.svelte-1evke.svelte-1evke{padding:1rem}section.svelte-1evke.svelte-1evke.svelte-1evke{padding:1.5rem}}.fees-section.svelte-1evke.svelte-1evke.svelte-1evke{margin-bottom:3rem;background:var(--card-background);border:1px solid var(--card-border);border-radius:16px;padding:2rem;transition:all 0.2s ease}.fees-container.svelte-1evke.svelte-1evke.svelte-1evke{display:grid;gap:2rem}.fees-overview.svelte-1evke.svelte-1evke.svelte-1evke{display:grid;gap:1rem}.fee-item.svelte-1evke.svelte-1evke.svelte-1evke{display:flex;justify-content:space-between;align-items:center;padding:1rem;background:var(--secondary-background);border:1px solid var(--card-border);border-radius:12px;transition:all 0.2s ease}.fee-label.svelte-1evke.svelte-1evke.svelte-1evke{color:var(--text-color);font-weight:500}.fee-value.svelte-1evke.svelte-1evke.svelte-1evke{color:var(--text-color);font-weight:600}@media(max-width: 768px){.fees-container.svelte-1evke.svelte-1evke.svelte-1evke{gap:1.5rem}}.vault-objective.svelte-1evke.svelte-1evke.svelte-1evke{background:var(--card-background);border:1px solid var(--card-border);border-radius:16px;padding:2rem;margin:2rem 0;transition:all 0.2s ease}.info-box.svelte-1evke.svelte-1evke.svelte-1evke{background:rgba(96, 165, 250, 0.1);border-radius:12px;padding:1.5rem}.info-box.svelte-1evke p.svelte-1evke.svelte-1evke{margin:0;font-size:0.95rem;line-height:1.6;color:var(--text-color);opacity:0.8;font-style:italic}.contracts-section.svelte-1evke.svelte-1evke.svelte-1evke{margin-bottom:3rem;background:var(--card-background);border:1px solid var(--card-border);border-radius:16px;padding:2rem}.section-description.svelte-1evke.svelte-1evke.svelte-1evke{color:var(--text-color);opacity:0.8;margin-bottom:2rem;font-size:0.95rem;line-height:1.6}.contracts-list.svelte-1evke.svelte-1evke.svelte-1evke{display:grid;grid-template-columns:repeat(2, 1fr);gap:1rem}.contract-card.svelte-1evke.svelte-1evke.svelte-1evke:last-child{grid-column:1 / 2;width:100%}.contract-card.svelte-1evke.svelte-1evke.svelte-1evke{display:flex;flex-direction:column;gap:0.5rem;padding:0.75rem 1rem;background:transparent;border:1px solid var(--card-border);border-radius:8px;transition:all 0.15s ease}.contract-card.svelte-1evke.svelte-1evke.svelte-1evke:hover{background:var(--secondary-background)}.label.svelte-1evke.svelte-1evke.svelte-1evke{font-weight:500;color:var(--text-color);font-size:0.9rem}.address-container.svelte-1evke.svelte-1evke.svelte-1evke{display:flex;align-items:center;gap:0.5rem}.address.svelte-1evke.svelte-1evke.svelte-1evke{text-decoration:none;background:transparent}.address.svelte-1evke code.svelte-1evke.svelte-1evke{color:#60A5FA;font-family:monospace;font-size:0.85rem;background:transparent}.icon-link.svelte-1evke.svelte-1evke.svelte-1evke{display:flex;align-items:center;text-decoration:none}.link-icon.svelte-1evke.svelte-1evke.svelte-1evke{color:#60A5FA;stroke:currentColor}.address.svelte-1evke:hover code.svelte-1evke.svelte-1evke,.icon-link.svelte-1evke:hover .link-icon.svelte-1evke.svelte-1evke{opacity:0.8}.address[target="_blank"].svelte-1evke.svelte-1evke.svelte-1evke::after,.icon-link[target="_blank"].svelte-1evke.svelte-1evke.svelte-1evke::after{content:none}@media(max-width: 768px){.contracts-list.svelte-1evke.svelte-1evke.svelte-1evke{grid-template-columns:1fr}.contract-card.svelte-1evke.svelte-1evke.svelte-1evke:last-child{grid-column:auto;width:100%}}.fees-section.svelte-1evke .info-box.svelte-1evke.svelte-1evke{background:rgba(96, 165, 250, 0.1);border-radius:12px;padding:1.5rem}.fees-section.svelte-1evke .info-box.svelte-1evke p.svelte-1evke{margin:0;font-size:0.95rem;line-height:1.6;color:var(--text-color);opacity:0.8;font-style:italic}.strategy-description.svelte-1evke.svelte-1evke.svelte-1evke{font-size:0.95rem;line-height:1.6;color:var(--text-color);opacity:0.8;margin-bottom:1.5rem}',
      map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  import { onMount } from 'svelte';\\n<\/script>\\n\\n<svelte:head>\\n  <title>DeTrade Core USDC \u2013 DeTrade</title>\\n  <meta name=\\"description\\" content=\\"Deposit and manage your USDC in DeTrade's Core USDC vault for optimized yields.\\" />\\n  <meta property=\\"og:title\\" content=\\"DeTrade Core USDC \u2013 DeTrade\\" />\\n  <meta property=\\"og:description\\" content=\\"Deposit and manage your USDC in DeTrade's Core USDC vault for optimized yields.\\" />\\n  <meta name=\\"twitter:title\\" content=\\"DeTrade Core USDC \u2013 DeTrade\\" />\\n  <meta name=\\"twitter:description\\" content=\\"Deposit and manage your USDC in DeTrade's Core USDC vault for optimized yields.\\" />\\n</svelte:head>\\n\\n<div class=\\"content\\">\\n  <div class=\\"vault-header\\">\\n    <h1>\\n      <svg width=\\"36\\" height=\\"36\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n        <rect x=\\"3\\" y=\\"3\\" width=\\"18\\" height=\\"18\\" rx=\\"2\\" ry=\\"2\\"/>\\n        <circle cx=\\"12\\" cy=\\"10\\" r=\\"3\\"/>\\n        <path d=\\"M12 13v8\\"/>\\n        <path d=\\"M8 21h8\\"/>\\n      </svg>\\n      DeTrade Core USDC\\n    </h1>\\n    <div class=\\"vault-badges\\">\\n      <span class=\\"badge network\\">Base</span>\\n      <span class=\\"badge asset\\">USDC</span>\\n    </div>\\n  </div>\\n\\n  <div class=\\"vault-objective\\">\\n    <h2>Core Strategies</h2>\\n    <p class=\\"strategy-description\\">Your capital remains pegged to USD through various yield-bearing stablecoins and stablecoin pairs, while being deployed into carefully selected yield-generating opportunities.</p>\\n\\n    <div class=\\"strategies-grid\\">\\n      <div class=\\"strategy-card\\">\\n        <h4>Top-tier DEX Liquidity</h4>\\n        <p>Provide liquidity on established decentralized exchanges through stable-to-stable pairs, minimizing impermanent loss while earning consistent trading fees.</p>\\n      </div>\\n\\n      <div class=\\"strategy-card\\">\\n        <h4>Secure Lending Markets</h4>\\n        <p>Deploy capital across battle-tested lending protocols, earning interest from borrowers while maintaining full withdrawability through yield-bearing tokens.</p>\\n      </div>\\n\\n      <div class=\\"strategy-card\\">\\n        <h4>Pegged Yield-bearing Assets</h4>\\n        <p>Utilize dollar-pegged tokens that automatically generate yield through lending markets and protocol revenues, always maintaining 1:1 backing.</p>\\n      </div>\\n\\n      <div class=\\"strategy-card\\">\\n        <h4>Yield Derivatives</h4>\\n        <p>Access both fixed and variable rate returns through stablecoin yield derivatives, without taking on any price exposure to volatile assets.</p>\\n      </div>\\n    </div>\\n\\n    <div class=\\"info-box\\">\\n      <p>\u{1F4A1} Our strategies are designed to maximize risk-adjusted yield through diversification and real-time monitoring, not through price betting or leverage on volatile assets. All positions maintain strict dollar pegging with no exposure to price fluctuations.</p>\\n    </div>\\n  </div>\\n\\n  <section class=\\"fees-section\\">\\n    <h2>Fees</h2>\\n    <p class=\\"section-description\\">This fee model is designed to be simple and user-friendly, ensuring investors benefit from a cost-effective and results-based approach.</p>\\n    \\n    <div class=\\"fees-container\\">\\n      <div class=\\"fees-overview\\">\\n        <div class=\\"fee-item\\">\\n          <span class=\\"fee-label\\">Performance Fee</span>\\n          <span class=\\"fee-value\\">15%</span>\\n        </div>\\n        <div class=\\"fee-item\\">\\n          <span class=\\"fee-label\\">Management Fee</span>\\n          <span class=\\"fee-value\\">None</span>\\n        </div>\\n        <div class=\\"fee-item\\">\\n          <span class=\\"fee-label\\">Entry/Exit Fee</span>\\n          <span class=\\"fee-value\\">None</span>\\n        </div>\\n      </div>\\n\\n      <div class=\\"info-box\\">\\n        <p>\u{1F4A1} When performance fees are collected, the vault mints new shares to dilute the fund proportionally. This mechanism ensures fair fee collection without affecting the deposited capital of existing users.</p>\\n      </div>\\n    </div>\\n  </section>\\n\\n  <section class=\\"contracts-section\\">\\n    <h2>Contracts & Key Addresses</h2>\\n    <p class=\\"section-description\\">All technical parameters are viewable in the \\"Parameters\\" tab on the vault page. Click any address to view on Basescan.</p>\\n    \\n    <div class=\\"contracts-list\\">\\n      <div class=\\"contract-card\\">\\n        <span class=\\"label\\">Vault Contract</span>\\n        <div class=\\"address-container\\">\\n          <a href=\\"https://basescan.org/address/0x8092cA384D44260ea4feaf7457B629B8DC6f88F0\\" \\n             target=\\"_blank\\" \\n             rel=\\"noopener noreferrer\\" \\n             class=\\"address\\">\\n            <code>0x8092cA384D44260ea4feaf7457B629B8DC6f88F0</code>\\n          </a>\\n          <a href=\\"https://basescan.org/address/0x8092cA384D44260ea4feaf7457B629B8DC6f88F0\\" \\n             target=\\"_blank\\" \\n             rel=\\"noopener noreferrer\\" \\n             class=\\"icon-link\\">\\n            <svg width=\\"14\\" height=\\"14\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" class=\\"link-icon\\">\\n              <path d=\\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\\"/>\\n              <polyline points=\\"15 3 21 3 21 9\\"/>\\n              <line x1=\\"10\\" y1=\\"14\\" x2=\\"21\\" y2=\\"3\\"/>\\n            </svg>\\n          </a>\\n        </div>\\n      </div>\\n\\n      <div class=\\"contract-card\\">\\n        <span class=\\"label\\">Safe (Multisig)</span>\\n        <div class=\\"address-container\\">\\n          <a href=\\"https://basescan.org/address/0xc6835323372a4393b90bcc227c58e82d45ce4b7d\\" \\n             target=\\"_blank\\" \\n             rel=\\"noopener noreferrer\\" \\n             class=\\"address\\">\\n            <code>0xc6835323372a4393b90bcc227c58e82d45ce4b7d</code>\\n          </a>\\n          <a href=\\"https://basescan.org/address/0xc6835323372a4393b90bcc227c58e82d45ce4b7d\\" \\n             target=\\"_blank\\" \\n             rel=\\"noopener noreferrer\\" \\n             class=\\"icon-link\\">\\n            <svg width=\\"14\\" height=\\"14\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" class=\\"link-icon\\">\\n              <path d=\\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\\"/>\\n              <polyline points=\\"15 3 21 3 21 9\\"/>\\n              <line x1=\\"10\\" y1=\\"14\\" x2=\\"21\\" y2=\\"3\\"/>\\n            </svg>\\n          </a>\\n        </div>\\n      </div>\\n\\n      <div class=\\"contract-card\\">\\n        <span class=\\"label\\">Fee Receiver</span>\\n        <a href=\\"https://basescan.org/address/0x7489d305F10760d686F8d4BB2e211a7f31c2f787\\" \\n           target=\\"_blank\\" \\n           rel=\\"noopener noreferrer\\" \\n           class=\\"address\\">\\n          <code>0x7489d305F10760d686F8d4BB2e211a7f31c2f787</code>\\n          <svg width=\\"14\\" height=\\"14\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"#60A5FA\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n            <path d=\\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\\"/>\\n            <polyline points=\\"15 3 21 3 21 9\\"/>\\n            <line x1=\\"10\\" y1=\\"14\\" x2=\\"21\\" y2=\\"3\\"/>\\n          </svg>\\n        </a>\\n      </div>\\n\\n      <div class=\\"contract-card\\">\\n        <span class=\\"label\\">Fee Registry</span>\\n        <a href=\\"https://basescan.org/address/0x6dA4D1859bA1d02D095D2246142CdAd52233e27C\\" \\n           target=\\"_blank\\" \\n           rel=\\"noopener noreferrer\\" \\n           class=\\"address\\">\\n          <code>0x6dA4D1859bA1d02D095D2246142CdAd52233e27C</code>\\n          <svg width=\\"14\\" height=\\"14\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"#60A5FA\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n            <path d=\\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\\"/>\\n            <polyline points=\\"15 3 21 3 21 9\\"/>\\n            <line x1=\\"10\\" y1=\\"14\\" x2=\\"21\\" y2=\\"3\\"/>\\n          </svg>\\n        </a>\\n      </div>\\n\\n      <div class=\\"contract-card\\">\\n        <span class=\\"label\\">Oracle</span>\\n        <a href=\\"https://basescan.org/address/0xc6835323372a4393b90bcc227c58e82d45ce4b7d\\" \\n           target=\\"_blank\\" \\n           rel=\\"noopener noreferrer\\" \\n           class=\\"address\\">\\n          <code>0xc6835323372a4393b90bcc227c58e82d45ce4b7d</code>\\n          <svg width=\\"14\\" height=\\"14\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"#60A5FA\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n            <path d=\\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\\"/>\\n            <polyline points=\\"15 3 21 3 21 9\\"/>\\n            <line x1=\\"10\\" y1=\\"14\\" x2=\\"21\\" y2=\\"3\\"/>\\n          </svg>\\n        </a>\\n      </div>\\n    </div>\\n  </section>\\n</div>\\n\\n<style>\\n  .content {\\n    max-width: 1200px;\\n    margin: 0 auto;\\n    padding: 2rem;\\n    color: var(--text-color);\\n  }\\n\\n  .vault-header {\\n    margin-bottom: 3rem;\\n  }\\n\\n  h1 {\\n    font-size: 2.5rem;\\n    font-weight: 700;\\n    margin-bottom: 1rem;\\n    color: var(--text-color);\\n    display: flex;\\n    align-items: center;\\n    gap: 1rem;\\n    -webkit-appearance: none;\\n    -moz-appearance: none;\\n    appearance: none;\\n    user-select: none;\\n    pointer-events: none;\\n    cursor: default;\\n  }\\n\\n  h1 svg {\\n    color: var(--text-color);\\n    stroke: currentColor;\\n    pointer-events: none;\\n  }\\n\\n  h2 {\\n    font-size: 1.75rem;\\n    font-weight: 600;\\n    margin-bottom: 1.5rem;\\n    color: var(--text-color);\\n  }\\n\\n  h3 {\\n    font-size: 1.3rem;\\n    font-weight: 600;\\n    margin-bottom: 1rem;\\n    color: var(--text-color);\\n  }\\n\\n  section {\\n    margin-bottom: 3rem;\\n    border: 1px solid var(--card-border);\\n    border-radius: 16px;\\n    padding: 2rem;\\n    transition: all 0.2s ease;\\n    background: transparent;\\n  }\\n\\n  section:hover {\\n    transform: translateY(-2px);\\n    background: transparent;\\n  }\\n\\n  .vault-badges {\\n    display: flex;\\n    gap: 1rem;\\n    margin-top: 1rem;\\n  }\\n\\n  .badge {\\n    background: var(--card-background);\\n    color: var(--text-color);\\n    padding: 0.5rem 1rem;\\n    border-radius: 9999px;\\n    font-size: 0.9rem;\\n    font-weight: 500;\\n    border: 1px solid var(--card-border);\\n  }\\n\\n  .strategies-grid {\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 0.75rem;\\n    margin: 1.5rem 0;\\n  }\\n\\n  .strategy-card {\\n    padding: 1.25rem;\\n    background: transparent;\\n    border: 1px solid var(--card-border);\\n    border-radius: 8px;\\n    transition: all 0.15s ease;\\n  }\\n\\n  .strategy-card:hover {\\n    background: var(--secondary-background);\\n  }\\n\\n  .strategy-card h4 {\\n    font-size: 1rem;\\n    font-weight: 600;\\n    margin: 0 0 0.75rem 0;\\n    color: var(--text-color);\\n  }\\n\\n  .strategy-card p {\\n    margin: 0;\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n  }\\n\\n  .important-note {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    padding: 1.5rem;\\n    border-radius: 8px;\\n    margin: 1.5rem 0;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .important-note:hover {\\n    background: var(--secondary-background);\\n  }\\n\\n  .formula {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    padding: 1.5rem;\\n    border-radius: 8px;\\n    margin: 1.5rem 0;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .formula:hover {\\n    background: var(--secondary-background);\\n  }\\n\\n  pre {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    padding: 1rem;\\n    border-radius: 6px;\\n    overflow-x: auto;\\n    transition: all 0.2s ease;\\n    color: var(--text-color);\\n  }\\n\\n  pre:hover {\\n    background: var(--secondary-background);\\n  }\\n\\n  code {\\n    font-family: monospace;\\n    font-size: 0.9rem;\\n    color: var(--text-color);\\n  }\\n\\n  .formula-details {\\n    list-style: none;\\n    padding-left: 0;\\n    margin: 1rem 0;\\n  }\\n\\n  .formula-variables {\\n    display: grid;\\n    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\\n    gap: 1rem;\\n    margin-top: 1rem;\\n  }\\n\\n  .variable-item {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 8px;\\n    padding: 0.75rem;\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n  }\\n\\n  .variable-item code {\\n    color: var(--text-color);\\n    margin-right: 1rem;\\n  }\\n\\n  .variable-item span {\\n    color: var(--text-color);\\n    opacity: 0.7;\\n    font-size: 0.9rem;\\n  }\\n\\n  .addresses-grid {\\n    display: grid;\\n    gap: 1rem;\\n  }\\n\\n  .address-item {\\n    background: rgba(255, 255, 255, 0.1);\\n    padding: 1.25rem;\\n    border-radius: 8px;\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    transition: all 0.2s ease;\\n    cursor: pointer;\\n  }\\n\\n  .address-item:hover {\\n    background: rgba(255, 255, 255, 0.15);\\n    transform: translateY(-2px);\\n  }\\n\\n  .address-item code {\\n    color: #60A5FA;\\n    transition: color 0.2s ease;\\n  }\\n\\n  .address-item:hover code {\\n    color: #93C5FD;\\n  }\\n\\n  .address-link {\\n    display: flex;\\n    align-items: center;\\n    gap: 0.5rem;\\n    text-decoration: none;\\n    font-family: monospace;\\n    font-size: 0.9rem;\\n    background: transparent;\\n  }\\n\\n  .address-link code {\\n    color: #60A5FA;\\n  }\\n\\n  .address-link svg {\\n    stroke: #60A5FA;\\n  }\\n\\n  .address-link:hover code {\\n    opacity: 0.8;\\n  }\\n\\n  /* Supprimer la fl\xE8che des liens externes */\\n  .address-link[target=\\"_blank\\"]::after {\\n    content: none;\\n  }\\n\\n  @media (max-width: 768px) {\\n    .content {\\n      padding: 1rem;\\n    }\\n\\n    section {\\n      padding: 1.5rem;\\n    }\\n\\n    .address-item {\\n      flex-direction: column;\\n      align-items: flex-start;\\n      gap: 0.5rem;\\n    }\\n  }\\n\\n  .note {\\n    font-style: italic;\\n    color: var(--text-color);\\n    opacity: 0.7;\\n    margin-top: 1rem;\\n  }\\n\\n  .fees-section {\\n    margin-bottom: 3rem;\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 16px;\\n    padding: 2rem;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .fees-container {\\n    display: grid;\\n    gap: 2rem;\\n  }\\n\\n  .fees-overview {\\n    display: grid;\\n    gap: 1rem;\\n  }\\n\\n  .fee-item {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    padding: 1rem;\\n    background: var(--secondary-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 12px;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .fee-label {\\n    color: var(--text-color);\\n    font-weight: 500;\\n  }\\n\\n  .fee-value {\\n    color: var(--text-color);\\n    font-weight: 600;\\n  }\\n\\n  .fee-note {\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    font-size: 0.95rem;\\n    margin: 0;\\n  }\\n\\n  @media (max-width: 768px) {\\n    .fees-container {\\n      gap: 1.5rem;\\n    }\\n  }\\n\\n  .overview-description {\\n    font-size: 1.1rem;\\n    color: var(--text-color);\\n    opacity: 0.7;\\n    margin: 0.5rem 0;\\n    line-height: 1.5;\\n  }\\n\\n  .vault-objective {\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 16px;\\n    padding: 2rem;\\n    margin: 2rem 0;\\n    transition: all 0.2s ease;\\n  }\\n\\n  .info-box {\\n    background: rgba(96, 165, 250, 0.1);\\n    border-radius: 12px;\\n    padding: 1.5rem;\\n  }\\n\\n  .info-box p {\\n    margin: 0;\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    font-style: italic;\\n  }\\n\\n  .contracts-section {\\n    margin-bottom: 3rem;\\n    background: var(--card-background);\\n    border: 1px solid var(--card-border);\\n    border-radius: 16px;\\n    padding: 2rem;\\n  }\\n\\n  .section-description {\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    margin-bottom: 2rem;\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n  }\\n\\n  .contracts-list {\\n    display: grid;\\n    grid-template-columns: repeat(2, 1fr);\\n    gap: 1rem;\\n  }\\n\\n  .contract-card:last-child {\\n    grid-column: 1 / 2;\\n    width: 100%;\\n  }\\n\\n  .contract-card {\\n    display: flex;\\n    flex-direction: column;\\n    gap: 0.5rem;\\n    padding: 0.75rem 1rem;\\n    background: transparent;\\n    border: 1px solid var(--card-border);\\n    border-radius: 8px;\\n    transition: all 0.15s ease;\\n  }\\n\\n  .contract-card:hover {\\n    background: var(--secondary-background);\\n  }\\n\\n  .label {\\n    font-weight: 500;\\n    color: var(--text-color);\\n    font-size: 0.9rem;\\n  }\\n\\n  .address-container {\\n    display: flex;\\n    align-items: center;\\n    gap: 0.5rem;\\n  }\\n\\n  .address {\\n    text-decoration: none;\\n    background: transparent;\\n  }\\n\\n  .address code {\\n    color: #60A5FA;\\n    font-family: monospace;\\n    font-size: 0.85rem;\\n    background: transparent;\\n  }\\n\\n  .icon-link {\\n    display: flex;\\n    align-items: center;\\n    text-decoration: none;\\n  }\\n\\n  .link-icon {\\n    color: #60A5FA;\\n    stroke: currentColor;\\n  }\\n\\n  .address:hover code,\\n  .icon-link:hover .link-icon {\\n    opacity: 0.8;\\n  }\\n\\n  /* Supprimer la fl\xE8che des liens externes */\\n  .address[target=\\"_blank\\"]::after,\\n  .icon-link[target=\\"_blank\\"]::after {\\n    content: none;\\n  }\\n\\n  @media (max-width: 768px) {\\n    .contracts-list {\\n      grid-template-columns: 1fr;\\n    }\\n\\n    .contract-card:last-child {\\n      grid-column: auto;\\n      width: 100%;\\n    }\\n  }\\n\\n  .fees-section .info-box {\\n    background: rgba(96, 165, 250, 0.1);\\n    border-radius: 12px;\\n    padding: 1.5rem;\\n  }\\n\\n  .fees-section .info-box p {\\n    margin: 0;\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    font-style: italic;\\n  }\\n\\n  .strategy-description {\\n    font-size: 0.95rem;\\n    line-height: 1.6;\\n    color: var(--text-color);\\n    opacity: 0.8;\\n    margin-bottom: 1.5rem;\\n  }\\n</style> "],"names":[],"mappings":"AAyLE,+CAAS,CACP,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,YAAY,CACzB,CAEA,oDAAc,CACZ,aAAa,CAAE,IACjB,CAEA,yCAAG,CACD,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,CACT,kBAAkB,CAAE,IAAI,CACxB,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,IAAI,CACpB,MAAM,CAAE,OACV,CAEA,eAAE,CAAC,6BAAI,CACL,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,MAAM,CAAE,YAAY,CACpB,cAAc,CAAE,IAClB,CAEA,yCAAG,CACD,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,MAAM,CACrB,KAAK,CAAE,IAAI,YAAY,CACzB,CASA,8CAAQ,CACN,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,CACpC,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,UAAU,CAAE,WACd,CAEA,8CAAO,MAAO,CACZ,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,WACd,CAEA,oDAAc,CACZ,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,CACT,UAAU,CAAE,IACd,CAEA,6CAAO,CACL,UAAU,CAAE,IAAI,iBAAiB,CAAC,CAClC,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,aAAa,CAAE,MAAM,CACrB,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CACrC,CAEA,uDAAiB,CACf,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,OAAO,CACZ,MAAM,CAAE,MAAM,CAAC,CACjB,CAEA,qDAAe,CACb,OAAO,CAAE,OAAO,CAChB,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,CACpC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IACxB,CAEA,qDAAc,MAAO,CACnB,UAAU,CAAE,IAAI,sBAAsB,CACxC,CAEA,2BAAc,CAAC,4BAAG,CAChB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,OAAO,CAAC,CAAC,CACrB,KAAK,CAAE,IAAI,YAAY,CACzB,CAEA,2BAAc,CAAC,2BAAE,CACf,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,OAAO,CAAE,GACX,CA0CA,2CAAK,CACH,WAAW,CAAE,SAAS,CACtB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,YAAY,CACzB,CA6FA,MAAO,YAAY,KAAK,CAAE,CACxB,+CAAS,CACP,OAAO,CAAE,IACX,CAEA,8CAAQ,CACN,OAAO,CAAE,MACX,CAOF,CASA,oDAAc,CACZ,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,iBAAiB,CAAC,CAClC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,CACpC,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACvB,CAEA,sDAAgB,CACd,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IACP,CAEA,qDAAe,CACb,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IACP,CAEA,gDAAU,CACR,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,sBAAsB,CAAC,CACvC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,CACpC,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACvB,CAEA,iDAAW,CACT,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,WAAW,CAAE,GACf,CAEA,iDAAW,CACT,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,WAAW,CAAE,GACf,CASA,MAAO,YAAY,KAAK,CAAE,CACxB,sDAAgB,CACd,GAAG,CAAE,MACP,CACF,CAUA,uDAAiB,CACf,UAAU,CAAE,IAAI,iBAAiB,CAAC,CAClC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,CACpC,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CAAC,CAAC,CACd,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACvB,CAEA,gDAAU,CACR,UAAU,CAAE,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACnC,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,MACX,CAEA,sBAAS,CAAC,2BAAE,CACV,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,MACd,CAEA,yDAAmB,CACjB,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,iBAAiB,CAAC,CAClC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,CACpC,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IACX,CAEA,2DAAqB,CACnB,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,OAAO,CAAE,GAAG,CACZ,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GACf,CAEA,sDAAgB,CACd,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CACrC,GAAG,CAAE,IACP,CAEA,qDAAc,WAAY,CACxB,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAClB,KAAK,CAAE,IACT,CAEA,qDAAe,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,MAAM,CACX,OAAO,CAAE,OAAO,CAAC,IAAI,CACrB,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,CACpC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IACxB,CAEA,qDAAc,MAAO,CACnB,UAAU,CAAE,IAAI,sBAAsB,CACxC,CAEA,6CAAO,CACL,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,SAAS,CAAE,MACb,CAEA,yDAAmB,CACjB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,MACP,CAEA,+CAAS,CACP,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,WACd,CAEA,qBAAQ,CAAC,8BAAK,CACZ,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,SAAS,CACtB,SAAS,CAAE,OAAO,CAClB,UAAU,CAAE,WACd,CAEA,iDAAW,CACT,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,IACnB,CAEA,iDAAW,CACT,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,YACV,CAEA,qBAAQ,MAAM,CAAC,8BAAI,CACnB,uBAAU,MAAM,CAAC,oCAAW,CAC1B,OAAO,CAAE,GACX,CAGA,QAAQ,CAAC,MAAM,CAAC,QAAQ,wCAAC,OAAO,CAChC,UAAU,CAAC,MAAM,CAAC,QAAQ,wCAAC,OAAQ,CACjC,OAAO,CAAE,IACX,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,sDAAgB,CACd,qBAAqB,CAAE,GACzB,CAEA,qDAAc,WAAY,CACxB,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,IACT,CACF,CAEA,0BAAa,CAAC,mCAAU,CACtB,UAAU,CAAE,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACnC,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,MACX,CAEA,0BAAa,CAAC,sBAAS,CAAC,cAAE,CACxB,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,MACd,CAEA,4DAAsB,CACpB,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,OAAO,CAAE,GAAG,CACZ,aAAa,CAAE,MACjB"}`
    };
    Page7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css8);
      return `${$$result.head += `<!-- HEAD_svelte-16py0mi_START -->${$$result.title = `<title>DeTrade Core USDC \u2013 DeTrade</title>`, ""}<meta name="description" content="Deposit and manage your USDC in DeTrade's Core USDC vault for optimized yields."><meta property="og:title" content="DeTrade Core USDC \u2013 DeTrade"><meta property="og:description" content="Deposit and manage your USDC in DeTrade's Core USDC vault for optimized yields."><meta name="twitter:title" content="DeTrade Core USDC \u2013 DeTrade"><meta name="twitter:description" content="Deposit and manage your USDC in DeTrade's Core USDC vault for optimized yields."><!-- HEAD_svelte-16py0mi_END -->`, ""} <div class="content svelte-1evke" data-svelte-h="svelte-1ugeazt"><div class="vault-header svelte-1evke"><h1 class="svelte-1evke"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-1evke"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="12" cy="10" r="3"></circle><path d="M12 13v8"></path><path d="M8 21h8"></path></svg>
      DeTrade Core USDC</h1> <div class="vault-badges svelte-1evke"><span class="badge network svelte-1evke">Base</span> <span class="badge asset svelte-1evke">USDC</span></div></div> <div class="vault-objective svelte-1evke"><h2 class="svelte-1evke">Core Strategies</h2> <p class="strategy-description svelte-1evke">Your capital remains pegged to USD through various yield-bearing stablecoins and stablecoin pairs, while being deployed into carefully selected yield-generating opportunities.</p> <div class="strategies-grid svelte-1evke"><div class="strategy-card svelte-1evke"><h4 class="svelte-1evke">Top-tier DEX Liquidity</h4> <p class="svelte-1evke">Provide liquidity on established decentralized exchanges through stable-to-stable pairs, minimizing impermanent loss while earning consistent trading fees.</p></div> <div class="strategy-card svelte-1evke"><h4 class="svelte-1evke">Secure Lending Markets</h4> <p class="svelte-1evke">Deploy capital across battle-tested lending protocols, earning interest from borrowers while maintaining full withdrawability through yield-bearing tokens.</p></div> <div class="strategy-card svelte-1evke"><h4 class="svelte-1evke">Pegged Yield-bearing Assets</h4> <p class="svelte-1evke">Utilize dollar-pegged tokens that automatically generate yield through lending markets and protocol revenues, always maintaining 1:1 backing.</p></div> <div class="strategy-card svelte-1evke"><h4 class="svelte-1evke">Yield Derivatives</h4> <p class="svelte-1evke">Access both fixed and variable rate returns through stablecoin yield derivatives, without taking on any price exposure to volatile assets.</p></div></div> <div class="info-box svelte-1evke"><p class="svelte-1evke">\u{1F4A1} Our strategies are designed to maximize risk-adjusted yield through diversification and real-time monitoring, not through price betting or leverage on volatile assets. All positions maintain strict dollar pegging with no exposure to price fluctuations.</p></div></div> <section class="fees-section svelte-1evke"><h2 class="svelte-1evke">Fees</h2> <p class="section-description svelte-1evke">This fee model is designed to be simple and user-friendly, ensuring investors benefit from a cost-effective and results-based approach.</p> <div class="fees-container svelte-1evke"><div class="fees-overview svelte-1evke"><div class="fee-item svelte-1evke"><span class="fee-label svelte-1evke">Performance Fee</span> <span class="fee-value svelte-1evke">15%</span></div> <div class="fee-item svelte-1evke"><span class="fee-label svelte-1evke">Management Fee</span> <span class="fee-value svelte-1evke">None</span></div> <div class="fee-item svelte-1evke"><span class="fee-label svelte-1evke">Entry/Exit Fee</span> <span class="fee-value svelte-1evke">None</span></div></div> <div class="info-box svelte-1evke"><p class="svelte-1evke">\u{1F4A1} When performance fees are collected, the vault mints new shares to dilute the fund proportionally. This mechanism ensures fair fee collection without affecting the deposited capital of existing users.</p></div></div></section> <section class="contracts-section svelte-1evke"><h2 class="svelte-1evke">Contracts &amp; Key Addresses</h2> <p class="section-description svelte-1evke">All technical parameters are viewable in the &quot;Parameters&quot; tab on the vault page. Click any address to view on Basescan.</p> <div class="contracts-list svelte-1evke"><div class="contract-card svelte-1evke"><span class="label svelte-1evke">Vault Contract</span> <div class="address-container svelte-1evke"><a href="https://basescan.org/address/0x8092cA384D44260ea4feaf7457B629B8DC6f88F0" target="_blank" rel="noopener noreferrer" class="address svelte-1evke"><code class="svelte-1evke">0x8092cA384D44260ea4feaf7457B629B8DC6f88F0</code></a> <a href="https://basescan.org/address/0x8092cA384D44260ea4feaf7457B629B8DC6f88F0" target="_blank" rel="noopener noreferrer" class="icon-link svelte-1evke"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="link-icon svelte-1evke"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div></div> <div class="contract-card svelte-1evke"><span class="label svelte-1evke">Safe (Multisig)</span> <div class="address-container svelte-1evke"><a href="https://basescan.org/address/0xc6835323372a4393b90bcc227c58e82d45ce4b7d" target="_blank" rel="noopener noreferrer" class="address svelte-1evke"><code class="svelte-1evke">0xc6835323372a4393b90bcc227c58e82d45ce4b7d</code></a> <a href="https://basescan.org/address/0xc6835323372a4393b90bcc227c58e82d45ce4b7d" target="_blank" rel="noopener noreferrer" class="icon-link svelte-1evke"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="link-icon svelte-1evke"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div></div> <div class="contract-card svelte-1evke"><span class="label svelte-1evke">Fee Receiver</span> <a href="https://basescan.org/address/0x7489d305F10760d686F8d4BB2e211a7f31c2f787" target="_blank" rel="noopener noreferrer" class="address svelte-1evke"><code class="svelte-1evke">0x7489d305F10760d686F8d4BB2e211a7f31c2f787</code> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div> <div class="contract-card svelte-1evke"><span class="label svelte-1evke">Fee Registry</span> <a href="https://basescan.org/address/0x6dA4D1859bA1d02D095D2246142CdAd52233e27C" target="_blank" rel="noopener noreferrer" class="address svelte-1evke"><code class="svelte-1evke">0x6dA4D1859bA1d02D095D2246142CdAd52233e27C</code> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div> <div class="contract-card svelte-1evke"><span class="label svelte-1evke">Oracle</span> <a href="https://basescan.org/address/0xc6835323372a4393b90bcc227c58e82d45ce4b7d" target="_blank" rel="noopener noreferrer" class="address svelte-1evke"><code class="svelte-1evke">0xc6835323372a4393b90bcc227c58e82d45ce4b7d</code> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div></div></section> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  component: () => component9,
  fonts: () => fonts9,
  imports: () => imports9,
  index: () => index9,
  stylesheets: () => stylesheets9
});
var index9, component_cache9, component9, imports9, stylesheets9, fonts9;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    index9 = 8;
    component9 = async () => component_cache9 ?? (component_cache9 = (await Promise.resolve().then(() => (init_page_svelte7(), page_svelte_exports7))).default);
    imports9 = ["_app/immutable/nodes/8.Z_rvasFq.js", "_app/immutable/chunks/DipVNbI1.js", "_app/immutable/chunks/6iab5EmN.js"];
    stylesheets9 = ["_app/immutable/assets/8.BZKKVRgI.css"];
    fonts9 = [];
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_ssr();
init_ssr2();
var base = "";
var assets = base;
var app_dir = "_app";
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
var read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
var prerendering = false;
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body: body2, assets: assets2, nonce, env }) => `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="/logo-detrade.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
		<style>
			:root {
				--color-background: #0d111c;
				--color-text: #ffffff;
				--color-accent: #4DA8FF;
			}

			body {
				margin: 0;
				padding: 0;
				background: var(--color-background);
				color: var(--color-text);
				font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
				-webkit-font-smoothing: antialiased;
			}

			* {
				box-sizing: border-box;
			}
		</style>
		<script>
			// V\xE9rifie le th\xE8me sauvegard\xE9 et l'applique imm\xE9diatement
			const savedTheme = localStorage.getItem('theme');
			// Si aucun th\xE8me n'est sauvegard\xE9, on utilise le mode clair par d\xE9faut
			if (!savedTheme || savedTheme === 'light') {
				document.documentElement.classList.add('dark-mode');
			} else {
				document.documentElement.classList.remove('dark-mode');
			}
		<\/script>
		` + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body2 + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "bu1u0n"
};
async function get_hooks() {
  let handle;
  let handleFetch;
  let handleError;
  let init2;
  let reroute;
  let transport;
  return {
    handle,
    handleFetch,
    handleError,
    init: init2,
    reroute,
    transport
  };
}

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
var is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function stringify_key(key2) {
  return is_identifier.test(key2) ? "." + key2 : "[" + JSON.stringify(key2) + "]";
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
          return;
        case "ArrayBuffer":
          return;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(stringify_key(key2));
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        const typedArray = thing;
        return `new ${type}([${typedArray.toString()}])`;
      }
      case "ArrayBuffer": {
        const ui8 = new Uint8Array(thing);
        return `new Uint8Array([${ui8.toString()}]).buffer`;
      }
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}

// node_modules/devalue/src/base64.js
function encode64(arraybuffer) {
  const dv = new DataView(arraybuffer);
  let binaryString = "";
  for (let i = 0; i < arraybuffer.byteLength; i++) {
    binaryString += String.fromCharCode(dv.getUint8(i));
  }
  return binaryToAscii(binaryString);
}
var KEY_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function binaryToAscii(str) {
  let out = "";
  for (let i = 0; i < str.length; i += 3) {
    const groupsOfSix = [void 0, void 0, void 0, void 0];
    groupsOfSix[0] = str.charCodeAt(i) >> 2;
    groupsOfSix[1] = (str.charCodeAt(i) & 3) << 4;
    if (str.length > i + 1) {
      groupsOfSix[1] |= str.charCodeAt(i + 1) >> 4;
      groupsOfSix[2] = (str.charCodeAt(i + 1) & 15) << 2;
    }
    if (str.length > i + 2) {
      groupsOfSix[2] |= str.charCodeAt(i + 2) >> 6;
      groupsOfSix[3] = str.charCodeAt(i + 2) & 63;
    }
    for (let j = 0; j < groupsOfSix.length; j++) {
      if (typeof groupsOfSix[j] === "undefined") {
        out += "=";
      } else {
        out += KEY_STRING[groupsOfSix[j]];
      }
    }
  }
  return out;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  if (reducers) {
    for (const key2 of Object.getOwnPropertyNames(reducers)) {
      custom.push({ key: key2, fn: reducers[key2] });
    }
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index11 = p++;
    indexes.set(thing, index11);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index11] = `["${key2}",${flatten(value2)}]`;
        return index11;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          const valid = !isNaN(thing.getDate());
          str = `["Date","${valid ? thing.toISOString() : ""}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          const typedArray = thing;
          const base642 = encode64(typedArray.buffer);
          str = '["' + type + '","' + base642 + '"]';
          break;
        }
        case "ArrayBuffer": {
          const arraybuffer = thing;
          const base642 = encode64(arraybuffer);
          str = `["ArrayBuffer","${base642}"]`;
          break;
        }
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(stringify_key(key2));
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(stringify_key(key2));
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index11] = str;
    return index11;
  }
  const index10 = flatten(value);
  if (index10 < 0)
    return `${index10}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}

// .svelte-kit/output/server/index.js
init_exports();
init_chunks();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var BROWSER = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/ \t]+)\/([^; \t]+)[ \t]*(?:;[ \t]*q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var HttpError = class {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body2) {
    this.status = status;
    if (typeof body2 === "string") {
      this.body = { message: body2 };
    } else if (body2) {
      this.body = body2;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var SvelteKitError = class extends Error {
  /**
   * @param {number} status
   * @param {string} text
   * @param {string} message
   */
  constructor(status, text2, message) {
    super(message);
    this.status = status;
    this.text = text2;
  }
};
var ActionFailure = class {
  /**
   * @param {number} status
   * @param {T} data
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder$3.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
var encoder$3 = new TextEncoder();
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder$3.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
  // Svelte also escapes < because the escape function could be called inside a `noscript` there
  // https://github.com/sveltejs/svelte/security/advisories/GHSA-8266-84wp-wv5c
  // However, that doesn't apply in SvelteKit
};
var escape_html_dict = {
  "&": "&amp;",
  "<": "&lt;"
};
var surrogates = (
  // high surrogate without paired low surrogate
  "[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]"
);
var escape_html_attr_regex = new RegExp(
  `[${Object.keys(escape_html_attr_dict).join("")}]|` + surrogates,
  "g"
);
var escape_html_regex = new RegExp(
  `[${Object.keys(escape_html_dict).join("")}]|` + surrogates,
  "g"
);
function escape_html(str, is_attr) {
  const dict = is_attr ? escape_html_attr_dict : escape_html_dict;
  const escaped_str = str.replace(is_attr ? escape_html_attr_regex : escape_html_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return escaped_str;
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message: escape_html(message) });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
var DATA_SUFFIX = "/__data.json";
var HTML_DATA_SUFFIX = ".html__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html"))
    return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
var ROUTE_SUFFIX = "/__route.js";
function has_resolution_suffix(pathname) {
  return pathname.endsWith(ROUTE_SUFFIX);
}
function add_resolution_suffix(pathname) {
  return pathname.replace(/\/$/, "") + ROUTE_SUFFIX;
}
function strip_resolution_suffix(pathname) {
  return pathname.slice(0, -ROUTE_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      `POST method not allowed. No form actions exist for ${"this page"}`
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        `POST method not allowed. No form actions exist for ${"this page"}`
      )
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://svelte.dev/docs/kit/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id, transport) {
  const replacer = (thing) => {
    for (const key2 in transport) {
      const encoded = transport[key2].encode(thing);
      if (encoded) {
        return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
      }
    }
  };
  return try_serialize(data, (value) => uneval(value, replacer), route_id);
}
function stringify_action_response(data, route_id, transport) {
  const encoders = Object.fromEntries(
    Object.entries(transport).map(([key2, value]) => [key2, value.encode])
  );
  return try_serialize(data, (value) => stringify(value, encoders), route_id);
}
function try_serialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error = (
      /** @type {any} */
      e
    );
    if (data instanceof Response) {
      throw new Error(
        `Data returned from action inside ${route_id} is not serializable. Form actions need to return plain objects or fail(). E.g. return { success: true } or return fail(400, { message: "invalid" });`
      );
    }
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "")
        message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
function get_relative_path(from, to) {
  const from_parts = from.split(/[/\\]/);
  const to_parts = to.split(/[/\\]/);
  from_parts.pop();
  while (from_parts[0] === to_parts[0]) {
    from_parts.shift();
    to_parts.shift();
  }
  let i = from_parts.length;
  while (i--)
    from_parts[i] = "..";
  return from_parts.concat(to_parts).join("/");
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server)
    return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get2 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get2.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://svelte.dev/docs/kit/hooks#Server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url="${escape_html(fetched.url, true)}"`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _script_src_needs_csp, _script_src_elem_needs_csp, _style_needs_csp, _style_src_needs_csp, _style_src_attr_needs_csp, _style_src_elem_needs_csp, _directives, _script_src, _script_src_elem, _style_src, _style_src_attr, _style_src_elem, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_src_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_src_elem_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_src_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_src_attr_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_src_elem_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src_elem, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src_attr, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src_elem, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _script_src_elem, []);
    __privateSet(this, _style_src, []);
    __privateSet(this, _style_src_attr, []);
    __privateSet(this, _style_src_elem, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    const needs_csp = (directive) => !!directive && !directive.some((value) => value === "unsafe-inline");
    __privateSet(this, _script_src_needs_csp, needs_csp(effective_script_src));
    __privateSet(this, _script_src_elem_needs_csp, needs_csp(script_src_elem));
    __privateSet(this, _style_src_needs_csp, needs_csp(effective_style_src));
    __privateSet(this, _style_src_attr_needs_csp, needs_csp(style_src_attr));
    __privateSet(this, _style_src_elem_needs_csp, needs_csp(style_src_elem));
    __privateSet(this, _script_needs_csp, __privateGet(this, _script_src_needs_csp) || __privateGet(this, _script_src_elem_needs_csp));
    __privateSet(this, _style_needs_csp, __privateGet(this, _style_src_needs_csp) || __privateGet(this, _style_src_attr_needs_csp) || __privateGet(this, _style_src_elem_needs_csp));
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (!__privateGet(this, _script_needs_csp))
      return;
    const source = __privateGet(this, _use_hashes) ? `sha256-${sha256(content)}` : `nonce-${__privateGet(this, _nonce)}`;
    if (__privateGet(this, _script_src_needs_csp)) {
      __privateGet(this, _script_src).push(source);
    }
    if (__privateGet(this, _script_src_elem_needs_csp)) {
      __privateGet(this, _script_src_elem).push(source);
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (!__privateGet(this, _style_needs_csp))
      return;
    const source = __privateGet(this, _use_hashes) ? `sha256-${sha256(content)}` : `nonce-${__privateGet(this, _nonce)}`;
    if (__privateGet(this, _style_src_needs_csp)) {
      __privateGet(this, _style_src).push(source);
    }
    if (__privateGet(this, _style_src_attr_needs_csp)) {
      __privateGet(this, _style_src_attr).push(source);
    }
    if (__privateGet(this, _style_src_elem_needs_csp)) {
      const sha256_empty_comment_hash = "sha256-9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = __privateGet(this, _directives);
      if (d["style-src-elem"] && !d["style-src-elem"].includes(sha256_empty_comment_hash) && !__privateGet(this, _style_src_elem).includes(sha256_empty_comment_hash)) {
        __privateGet(this, _style_src_elem).push(sha256_empty_comment_hash);
      }
      if (source !== sha256_empty_comment_hash) {
        __privateGet(this, _style_src_elem).push(source);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _style_src_attr).length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...__privateGet(this, _style_src_attr)
      ];
    }
    if (__privateGet(this, _style_src_elem).length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...__privateGet(this, _style_src_elem)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    if (__privateGet(this, _script_src_elem).length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...__privateGet(this, _script_src_elem)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_script_src_needs_csp = new WeakMap();
_script_src_elem_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_style_src_needs_csp = new WeakMap();
_style_src_attr_needs_csp = new WeakMap();
_style_src_elem_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_script_src_elem = new WeakMap();
_style_src = new WeakMap();
_style_src_attr = new WeakMap();
_style_src_elem = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content="${escape_html(content, true)}">`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function generate_route_object(route, url, manifest2) {
  const { errors, layouts, leaf } = route;
  const nodes = [...errors, ...layouts.map((l) => l?.[1]), leaf[1]].filter((n) => typeof n === "number").map((n) => `'${n}': () => ${create_client_import(manifest2._.client.nodes?.[n], url)}`).join(",\n		");
  return [
    `{
	id: ${s(route.id)}`,
    `errors: ${s(route.errors)}`,
    `layouts: ${s(route.layouts)}`,
    `leaf: ${s(route.leaf)}`,
    `nodes: {
		${nodes}
	}
}`
  ].join(",\n	");
}
function create_client_import(import_path, url) {
  if (!import_path)
    return "Promise.resolve({})";
  if (import_path[0] === "/") {
    return `import('${import_path}')`;
  }
  if (assets !== "") {
    return `import('${assets}/${import_path}')`;
  }
  let path = get_relative_path(url.pathname, `${base}/${import_path}`);
  if (path[0] !== ".")
    path = `./${path}`;
  return `import('${path}')`;
}
async function resolve_route(resolved_path, url, manifest2) {
  if (!manifest2._.client.routes) {
    return text("Server-side route resolution disabled", { status: 400 });
  }
  let route = null;
  let params = {};
  const matchers = await manifest2._.matchers();
  for (const candidate of manifest2._.client.routes) {
    const match = candidate.pattern.exec(resolved_path);
    if (!match)
      continue;
    const matched = exec(match, candidate.params, matchers);
    if (matched) {
      route = candidate;
      params = decode_params(matched);
      break;
    }
  }
  return create_server_routing_response(route, params, url, manifest2).response;
}
function create_server_routing_response(route, params, url, manifest2) {
  const headers2 = new Headers({
    "content-type": "application/javascript; charset=utf-8"
  });
  if (route) {
    const csr_route = generate_route_object(route, url, manifest2);
    const body2 = `export const route = ${csr_route}; export const params = ${JSON.stringify(params)};`;
    return { response: text(body2, { headers: headers2 }), body: body2 };
  } else {
    return { response: text("", { headers: headers2 }), body: "" };
  }
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets10 = new Set(client.stylesheets);
  const fonts10 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  {
    if (!state.prerendering?.fallback) {
      const segments = event.url.pathname.slice(base.length).split("/").slice(2);
      base$1 = segments.map(() => "..").join("/") || ".";
      base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
      if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
        assets$1 = base$1;
      }
    } else if (options2.hash_routing) {
      base_expression = "new URL('.', location).pathname.slice(0, -1)";
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    const render_opts = {
      context: /* @__PURE__ */ new Map([
        [
          "__request__",
          {
            page: props.page
          }
        ]
      ])
    };
    {
      try {
        rendered = options2.root.render(props, render_opts);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets10.add(url);
      for (const url of node.fonts)
        fonts10.add(url);
      if (node.inline_styles && !client.inline) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  const style = client.inline ? client.inline?.style : Array.from(inline_styles.values()).join("\n");
  if (style) {
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(style);
    head += `
	<style${attributes.join("")}>${style}</style>`;
  }
  for (const dep of stylesheets10) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts10) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    csp,
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const route = manifest2._.client.routes?.find((r) => r.id === event.route.id) ?? null;
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${app_dir}/env.js`);
    }
    if (!client.inline) {
      const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
        (path) => resolve_opts.preload({ type: "js", path })
      );
      for (const path of included_modulepreloads) {
        link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
        if (options2.preload_strategy !== "modulepreload") {
          head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
        } else if (state.prerendering) {
          head += `
		<link rel="modulepreload" href="${path}">`;
        }
      }
    }
    if (manifest2._.client.routes && state.prerendering && !state.prerendering.fallback) {
      const pathname = add_resolution_suffix(event.url.pathname);
      state.prerendering.dependencies.set(
        pathname,
        create_server_routing_response(route, event.params, new URL(pathname, event.url), manifest2)
      );
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const try_to_resolve = () => {
								if (!deferred.has(id)) {
									setTimeout(try_to_resolve, 0);
									return;
								}
								const { fulfil, reject } = deferred.get(id);
								deferred.delete(id);
								if (error) reject(error);
								else fulfil(data);
							}
							try_to_resolve();
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        );
      }
      if (error) {
        serialized.error = uneval(error);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        `data: ${data}`,
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (manifest2._.client.routes) {
        if (route) {
          const stringified = generate_route_object(route, event.url, manifest2).replaceAll(
            "\n",
            "\n							"
          );
          hydrate.push(`params: ${uneval(event.params)}`, `server_route: ${stringified}`);
        }
      } else if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate.join(`,
${indent}	`)}
${indent}}`);
    }
    const boot = client.inline ? `${client.inline.script}

					__sveltekit_${options2.version_hash}.app.start(${args.join(", ")});` : client.app ? `Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(app, ${args.join(", ")});
					});` : `import(${s(prefixed(client.start))}).then((app) => {
						app.start(${args.join(", ")})
					});`;
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						${boot.replace(/\n/g, "\n	")}
					});`);
    } else {
      blocks.push(boot);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: headers2
    }
  );
}
function get_data(event, options2, nodes, csp, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error }, replacer);
          } catch {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error }, replacer);
          }
          const nonce = csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : "";
          push(`<script${nonce}>${global}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id})`;
    } else {
      for (const key2 in options2.hooks.transport) {
        const encoded = options2.hooks.transport[key2].encode(thing);
        if (encoded) {
          return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
        }
      }
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      get_status(e),
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error = normalize_error(e);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    ...Object.fromEntries(
      Object.entries(options2.hooks.transport).map(([key2, value]) => [key2, value.encode])
    ),
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest2);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some(
      // prerender in case of trailingSlash because the client retrieves that value from the server
      (node) => node?.server?.load || node?.server?.trailingSlash !== void 0
    );
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      if (BROWSER && action_result && !event.request.headers.has("x-sveltekit-action"))
        ;
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index10 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index10]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
var INVALID_COOKIE_CHARACTER_REGEX = /[\x00-\x1F\x7F()<>@,;:"/[\]?={} \t]/;
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} [opts]
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const req_cookies = (0, import_cookie.parse)(header, { decode: opts?.decode });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} [opts]
     */
    getAll(opts) {
      const cookies2 = (0, import_cookie.parse)(header, { decode: opts?.decode });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      const illegal_characters = name.match(INVALID_COOKIE_CHARACTER_REGEX);
      if (illegal_characters) {
        console.warn(
          `The cookie name "${name}" will be invalid in SvelteKit 3.0 as it contains ${illegal_characters.join(
            " and "
          )}. See RFC 2616 for more details https://datatracker.ietf.org/doc/html/rfc2616#section-2.2`
        );
      }
      validate_options(options2);
      set_internal(name, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return (0, import_cookie.serialize)(name, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name] = { name, value, options: { ...options2, path } };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, { ...options2, path }));
    }
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename) || filename in manifest2._.server_assets;
        const is_asset_html = manifest2.assets.has(filename_html) || filename_html in manifest2._.server_assets;
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else if (read_implementation && file in manifest2._.server_assets) {
            const length = manifest2._.server_assets[file];
            const type = manifest2.mimeTypes[file.slice(file.lastIndexOf("."))];
            return new Response(read_implementation(file), {
              headers: {
                "Content-Length": "" + length,
                "Content-Type": type
              }
            });
          }
          return await fetch(request);
        }
        if (manifest2._.prerendered_routes.has(decoded) || decoded.at(-1) === "/" && manifest2._.prerendered_routes.has(decoded.slice(0, -1))) {
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
var body;
var etag;
var headers;
function get_public_env(request) {
  body ?? (body = `export const env=${JSON.stringify(public_env)}`);
  etag ?? (etag = `W/${Date.now()}`);
  headers ?? (headers = new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  }));
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config)
      continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  if (options2.hash_routing && url.pathname !== base + "/" && url.pathname !== "/[fallback]") {
    return text("Not found", { status: 404 });
  }
  let invalidated_data_nodes;
  const is_route_resolution_request = has_resolution_suffix(url.pathname);
  const is_data_request = has_data_suffix(url.pathname);
  if (is_route_resolution_request) {
    url.pathname = strip_resolution_suffix(url.pathname);
  } else if (is_data_request) {
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  let resolved_path;
  try {
    resolved_path = options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch {
    return text("Internal Server Error", {
      status: 500
    });
  }
  try {
    resolved_path = decode_pathname(resolved_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!resolved_path.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    resolved_path = resolved_path.slice(base.length) || "/";
  }
  if (is_route_resolution_request) {
    return resolve_route(resolved_path, new URL(request.url), manifest2);
  }
  if (resolved_path === `/${app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (resolved_path.startsWith(`/${app_dir}`)) {
    const headers22 = new Headers();
    headers22.set("cache-control", "public, max-age=0, must-revalidate");
    return text("Not found", { status: 404, headers: headers22 });
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(resolved_path);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest2);
        if (BROWSER)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (BROWSER)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender = node.prerender ?? prerender;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest2);
          config = get_page_config(nodes) ?? config;
          prerender = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender });
        }
      }
    } else if (state.emulator?.platform) {
      event.platform = await state.emulator.platform({
        config: {},
        prerender: !!state.prerendering?.fallback
      });
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (options2.hash_routing || state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        const headers22 = new Headers(request.headers);
        headers22.set("x-sveltekit-error", "true");
        return await fetch(request, { headers: headers22 });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
var init_promise;
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: __privateGet(this, _options).env_public_prefix,
      private_prefix: __privateGet(this, _options).env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (read) {
      set_read_implementation(read);
    }
    await (init_promise ?? (init_promise = (async () => {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error }) => console.error(error)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module.reroute || (() => {
          }),
          transport: module.transport || {}
        };
        if (module.init) {
          await module.init();
        }
      } catch (error) {
        {
          throw error;
        }
      }
    })()));
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/vercel-tmp/fn/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set([".DS_Store", "NM_0304_HopperLabs.pdf", "NM_0432_Lagoon.pdf", "banner.webp", "deposit.gif", "detrade-logo-text-black.webp", "detrade-logo-text.png", "evm.svg", "framework.png", "lagoon-review.avif", "lagoon-review.pdf", "logo-detrade.png", "logo_lagoon_white.png", "nethermind.png", "nethermind_security.avif", "pending_deposit.gif", "pending_withdraw.gif", "safe.png", "safe_white.svg", "symbol_lagoon_white.svg", "white_horizontal_powered_by_lagoon.svg", "withdraw.gif", "x.png"]),
    mimeTypes: { ".pdf": "application/pdf", ".webp": "image/webp", ".gif": "image/gif", ".png": "image/png", ".svg": "image/svg+xml", ".avif": "image/avif" },
    _: {
      client: { start: "_app/immutable/entry/start.DNkC8BVF.js", app: "_app/immutable/entry/app.D_4rkxeb.js", imports: ["_app/immutable/entry/start.DNkC8BVF.js", "_app/immutable/chunks/C1OJwcYb.js", "_app/immutable/chunks/DipVNbI1.js", "_app/immutable/entry/app.D_4rkxeb.js", "_app/immutable/chunks/DipVNbI1.js", "_app/immutable/chunks/6iab5EmN.js"], stylesheets: [], fonts: [], uses_env_dynamic_public: false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
        __memo(() => Promise.resolve().then(() => (init__8(), __exports8))),
        __memo(() => Promise.resolve().then(() => (init__9(), __exports9)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        },
        {
          id: "/faq",
          pattern: /^\/faq\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        },
        {
          id: "/framework",
          pattern: /^\/framework\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 4 },
          endpoint: null
        },
        {
          id: "/guides",
          pattern: /^\/guides\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 5 },
          endpoint: null
        },
        {
          id: "/security",
          pattern: /^\/security\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 6 },
          endpoint: null
        },
        {
          id: "/vaults",
          pattern: /^\/vaults\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 7 },
          endpoint: null
        },
        {
          id: "/vaults/detrade-core-usdc",
          pattern: /^\/vaults\/detrade-core-usdc\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 8 },
          endpoint: null
        }
      ],
      prerendered_routes: /* @__PURE__ */ new Set([]),
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();

// .svelte-kit/vercel-tmp/fn/edge.js
var server = new Server(manifest);
var initialized = server.init({
  env: (
    /** @type {Record<string, string>} */
    process.env
  )
});
var edge_default = async (request, context) => {
  await initialized;
  return server.respond(request, {
    getClientAddress() {
      return (
        /** @type {string} */
        request.headers.get("x-forwarded-for")
      );
    },
    platform: {
      context
    }
  });
};
export {
  edge_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=index.js.map
