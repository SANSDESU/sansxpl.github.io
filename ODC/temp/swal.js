/*!
 * sweetalert2 v11.7.22
 * Released under the MIT License.
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e =
        "undefined" != typeof globalThis ? globalThis : e || self).Sweetalert2 =
        t());
})(this, function () {
  "use strict";
  const e = {},
    t = (t) =>
      new Promise((n) => {
        if (!t) return n();
        const o = window.scrollX,
          i = window.scrollY;
        (e.restoreFocusTimeout = setTimeout(() => {
          e.previousActiveElement instanceof HTMLElement
            ? (e.previousActiveElement.focus(),
              (e.previousActiveElement = null))
            : document.body && document.body.focus(),
            n();
        }, 100)),
          window.scrollTo(o, i);
      });
  var n = {
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap(),
  };
  const o = "swal2-",
    i = [
      "container",
      "shown",
      "height-auto",
      "iosfix",
      "popup",
      "modal",
      "no-backdrop",
      "no-transition",
      "toast",
      "toast-shown",
      "show",
      "hide",
      "close",
      "title",
      "html-container",
      "actions",
      "confirm",
      "deny",
      "cancel",
      "default-outline",
      "footer",
      "icon",
      "icon-content",
      "image",
      "input",
      "file",
      "range",
      "select",
      "radio",
      "checkbox",
      "label",
      "textarea",
      "inputerror",
      "input-label",
      "validation-message",
      "progress-steps",
      "active-progress-step",
      "progress-step",
      "progress-step-line",
      "loader",
      "loading",
      "styled",
      "top",
      "top-start",
      "top-end",
      "top-left",
      "top-right",
      "center",
      "center-start",
      "center-end",
      "center-left",
      "center-right",
      "bottom",
      "bottom-start",
      "bottom-end",
      "bottom-left",
      "bottom-right",
      "grow-row",
      "grow-column",
      "grow-fullscreen",
      "rtl",
      "timer-progress-bar",
      "timer-progress-bar-container",
      "scrollbar-measure",
      "icon-success",
      "icon-warning",
      "icon-info",
      "icon-question",
      "icon-error",
    ].reduce((e, t) => ((e[t] = o + t), e), {}),
    s = ["success", "warning", "info", "question", "error"].reduce(
      (e, t) => ((e[t] = o + t), e),
      {}
    ),
    r = "SweetAlert2:",
    a = (e) => e.charAt(0).toUpperCase() + e.slice(1),
    l = (e) => {
      console.warn(`${r} ${"object" == typeof e ? e.join(" ") : e}`);
    },
    c = (e) => {
      console.error(`${r} ${e}`);
    },
    u = [],
    d = (e, t) => {
      var n;
      (n = `"${e}" is deprecated and will be removed in the next major release. Please use "${t}" instead.`),
        u.includes(n) || (u.push(n), l(n));
    },
    p = (e) => ("function" == typeof e ? e() : e),
    m = (e) => e && "function" == typeof e.toPromise,
    g = (e) => (m(e) ? e.toPromise() : Promise.resolve(e)),
    h = (e) => e && Promise.resolve(e) === e,
    f = () => document.body.querySelector(`.${i.container}`),
    b = (e) => {
      const t = f();
      return t ? t.querySelector(e) : null;
    },
    y = (e) => b(`.${e}`),
    w = () => y(i.popup),
    v = () => y(i.icon),
    C = () => y(i.title),
    A = () => y(i["html-container"]),
    k = () => y(i.image),
    B = () => y(i["progress-steps"]),
    $ = () => y(i["validation-message"]),
    E = () => b(`.${i.actions} .${i.confirm}`),
    x = () => b(`.${i.actions} .${i.cancel}`),
    P = () => b(`.${i.actions} .${i.deny}`),
    T = () => b(`.${i.loader}`),
    L = () => y(i.actions),
    S = () => y(i.footer),
    O = () => y(i["timer-progress-bar"]),
    M = () => y(i.close),
    j = () => {
      const e = w();
      if (!e) return [];
      const t = e.querySelectorAll(
          '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
        ),
        n = Array.from(t).sort((e, t) => {
          const n = parseInt(e.getAttribute("tabindex") || "0"),
            o = parseInt(t.getAttribute("tabindex") || "0");
          return n > o ? 1 : n < o ? -1 : 0;
        }),
        o = e.querySelectorAll(
          '\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n'
        ),
        i = Array.from(o).filter((e) => "-1" !== e.getAttribute("tabindex"));
      return [...new Set(n.concat(i))].filter((e) => X(e));
    },
    I = () =>
      q(document.body, i.shown) &&
      !q(document.body, i["toast-shown"]) &&
      !q(document.body, i["no-backdrop"]),
    H = () => {
      const e = w();
      return !!e && q(e, i.toast);
    },
    D = (e, t) => {
      if (((e.textContent = ""), t)) {
        const n = new DOMParser().parseFromString(t, "text/html"),
          o = n.querySelector("head");
        o &&
          Array.from(o.childNodes).forEach((t) => {
            e.appendChild(t);
          });
        const i = n.querySelector("body");
        i &&
          Array.from(i.childNodes).forEach((t) => {
            t instanceof HTMLVideoElement || t instanceof HTMLAudioElement
              ? e.appendChild(t.cloneNode(!0))
              : e.appendChild(t);
          });
      }
    },
    q = (e, t) => {
      if (!t) return !1;
      const n = t.split(/\s+/);
      for (let t = 0; t < n.length; t++)
        if (!e.classList.contains(n[t])) return !1;
      return !0;
    },
    V = (e, t, n) => {
      if (
        (((e, t) => {
          Array.from(e.classList).forEach((n) => {
            Object.values(i).includes(n) ||
              Object.values(s).includes(n) ||
              Object.values(t.showClass || {}).includes(n) ||
              e.classList.remove(n);
          });
        })(e, t),
        t.customClass && t.customClass[n])
      ) {
        if ("string" != typeof t.customClass[n] && !t.customClass[n].forEach)
          return void l(
            `Invalid type of customClass.${n}! Expected string or iterable object, got "${typeof t
              .customClass[n]}"`
          );
        R(e, t.customClass[n]);
      }
    },
    N = (e, t) => {
      if (!t) return null;
      switch (t) {
        case "select":
        case "textarea":
        case "file":
          return e.querySelector(`.${i.popup} > .${i[t]}`);
        case "checkbox":
          return e.querySelector(`.${i.popup} > .${i.checkbox} input`);
        case "radio":
          return (
            e.querySelector(`.${i.popup} > .${i.radio} input:checked`) ||
            e.querySelector(`.${i.popup} > .${i.radio} input:first-child`)
          );
        case "range":
          return e.querySelector(`.${i.popup} > .${i.range} input`);
        default:
          return e.querySelector(`.${i.popup} > .${i.input}`);
      }
    },
    F = (e) => {
      if ((e.focus(), "file" !== e.type)) {
        const t = e.value;
        (e.value = ""), (e.value = t);
      }
    },
    _ = (e, t, n) => {
      e &&
        t &&
        ("string" == typeof t && (t = t.split(/\s+/).filter(Boolean)),
        t.forEach((t) => {
          Array.isArray(e)
            ? e.forEach((e) => {
                n ? e.classList.add(t) : e.classList.remove(t);
              })
            : n
            ? e.classList.add(t)
            : e.classList.remove(t);
        }));
    },
    R = (e, t) => {
      _(e, t, !0);
    },
    U = (e, t) => {
      _(e, t, !1);
    },
    z = (e, t) => {
      const n = Array.from(e.children);
      for (let e = 0; e < n.length; e++) {
        const o = n[e];
        if (o instanceof HTMLElement && q(o, t)) return o;
      }
    },
    W = (e, t, n) => {
      n === `${parseInt(n)}` && (n = parseInt(n)),
        n || 0 === parseInt(n)
          ? (e.style[t] = "number" == typeof n ? `${n}px` : n)
          : e.style.removeProperty(t);
    },
    K = function (e) {
      let t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "flex";
      e && (e.style.display = t);
    },
    Y = (e) => {
      e && (e.style.display = "none");
    },
    Z = (e, t, n, o) => {
      const i = e.querySelector(t);
      i && (i.style[n] = o);
    },
    J = function (e, t) {
      t
        ? K(
            e,
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : "flex"
          )
        : Y(e);
    },
    X = (e) =>
      !(!e || !(e.offsetWidth || e.offsetHeight || e.getClientRects().length)),
    G = (e) => !!(e.scrollHeight > e.clientHeight),
    Q = (e) => {
      const t = window.getComputedStyle(e),
        n = parseFloat(t.getPropertyValue("animation-duration") || "0"),
        o = parseFloat(t.getPropertyValue("transition-duration") || "0");
      return n > 0 || o > 0;
    },
    ee = function (e) {
      let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      const n = O();
      n &&
        X(n) &&
        (t && ((n.style.transition = "none"), (n.style.width = "100%")),
        setTimeout(() => {
          (n.style.transition = `width ${e / 1e3}s linear`),
            (n.style.width = "0%");
        }, 10));
    },
    te = () => "undefined" == typeof window || "undefined" == typeof document,
    ne =
      `\n <div aria-labelledby="${i.title}" aria-describedby="${i["html-container"]}" class="${i.popup}" tabindex="-1">\n   <button type="button" class="${i.close}"></button>\n   <ul class="${i["progress-steps"]}"></ul>\n   <div class="${i.icon}"></div>\n   <img class="${i.image}" />\n   <h2 class="${i.title}" id="${i.title}"></h2>\n   <div class="${i["html-container"]}" id="${i["html-container"]}"></div>\n   <input class="${i.input}" id="${i.input}" />\n   <input type="file" class="${i.file}" />\n   <div class="${i.range}">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="${i.select}" id="${i.select}"></select>\n   <div class="${i.radio}"></div>\n   <label class="${i.checkbox}">\n     <input type="checkbox" id="${i.checkbox}" />\n     <span class="${i.label}"></span>\n   </label>\n   <textarea class="${i.textarea}" id="${i.textarea}"></textarea>\n   <div class="${i["validation-message"]}" id="${i["validation-message"]}"></div>\n   <div class="${i.actions}">\n     <div class="${i.loader}"></div>\n     <button type="button" class="${i.confirm}"></button>\n     <button type="button" class="${i.deny}"></button>\n     <button type="button" class="${i.cancel}"></button>\n   </div>\n   <div class="${i.footer}"></div>\n   <div class="${i["timer-progress-bar-container"]}">\n     <div class="${i["timer-progress-bar"]}"></div>\n   </div>\n </div>\n`.replace(
        /(^|\n)\s*/g,
        ""
      ),
    oe = () => {
      e.currentInstance.resetValidationMessage();
    },
    ie = (e) => {
      const t = (() => {
        const e = f();
        return (
          !!e &&
          (e.remove(),
          U(
            [document.documentElement, document.body],
            [i["no-backdrop"], i["toast-shown"], i["has-column"]]
          ),
          !0)
        );
      })();
      if (te()) return void c("SweetAlert2 requires document to initialize");
      const n = document.createElement("div");
      (n.className = i.container), t && R(n, i["no-transition"]), D(n, ne);
      const o =
        "string" == typeof (s = e.target) ? document.querySelector(s) : s;
      var s;
      o.appendChild(n),
        ((e) => {
          const t = w();
          t.setAttribute("role", e.toast ? "alert" : "dialog"),
            t.setAttribute("aria-live", e.toast ? "polite" : "assertive"),
            e.toast || t.setAttribute("aria-modal", "true");
        })(e),
        ((e) => {
          "rtl" === window.getComputedStyle(e).direction && R(f(), i.rtl);
        })(o),
        (() => {
          const e = w(),
            t = z(e, i.input),
            n = z(e, i.file),
            o = e.querySelector(`.${i.range} input`),
            s = e.querySelector(`.${i.range} output`),
            r = z(e, i.select),
            a = e.querySelector(`.${i.checkbox} input`),
            l = z(e, i.textarea);
          (t.oninput = oe),
            (n.onchange = oe),
            (r.onchange = oe),
            (a.onchange = oe),
            (l.oninput = oe),
            (o.oninput = () => {
              oe(), (s.value = o.value);
            }),
            (o.onchange = () => {
              oe(), (s.value = o.value);
            });
        })();
    },
    se = (e, t) => {
      e instanceof HTMLElement
        ? t.appendChild(e)
        : "object" == typeof e
        ? re(e, t)
        : e && D(t, e);
    },
    re = (e, t) => {
      e.jquery ? ae(t, e) : D(t, e.toString());
    },
    ae = (e, t) => {
      if (((e.textContent = ""), 0 in t))
        for (let n = 0; n in t; n++) e.appendChild(t[n].cloneNode(!0));
      else e.appendChild(t.cloneNode(!0));
    },
    le = (() => {
      if (te()) return !1;
      const e = document.createElement("div"),
        t = {
          WebkitAnimation: "webkitAnimationEnd",
          animation: "animationend",
        };
      for (const n in t)
        if (Object.prototype.hasOwnProperty.call(t, n) && void 0 !== e.style[n])
          return t[n];
      return !1;
    })(),
    ce = (e, t) => {
      const n = L(),
        o = T();
      n &&
        o &&
        (t.showConfirmButton || t.showDenyButton || t.showCancelButton
          ? K(n)
          : Y(n),
        V(n, t, "actions"),
        (function (e, t, n) {
          const o = E(),
            s = P(),
            r = x();
          if (!o || !s || !r) return;
          ue(o, "confirm", n),
            ue(s, "deny", n),
            ue(r, "cancel", n),
            (function (e, t, n, o) {
              if (!o.buttonsStyling) return void U([e, t, n], i.styled);
              R([e, t, n], i.styled),
                o.confirmButtonColor &&
                  ((e.style.backgroundColor = o.confirmButtonColor),
                  R(e, i["default-outline"]));
              o.denyButtonColor &&
                ((t.style.backgroundColor = o.denyButtonColor),
                R(t, i["default-outline"]));
              o.cancelButtonColor &&
                ((n.style.backgroundColor = o.cancelButtonColor),
                R(n, i["default-outline"]));
            })(o, s, r, n),
            n.reverseButtons &&
              (n.toast
                ? (e.insertBefore(r, o), e.insertBefore(s, o))
                : (e.insertBefore(r, t),
                  e.insertBefore(s, t),
                  e.insertBefore(o, t)));
        })(n, o, t),
        D(o, t.loaderHtml || ""),
        V(o, t, "loader"));
    };
  function ue(e, t, n) {
    const o = a(t);
    J(e, n[`show${o}Button`], "inline-block"),
      D(e, n[`${t}ButtonText`] || ""),
      e.setAttribute("aria-label", n[`${t}ButtonAriaLabel`] || ""),
      (e.className = i[t]),
      V(e, n, `${t}Button`);
  }
  const de = (e, t) => {
    const n = f();
    n &&
      (!(function (e, t) {
        "string" == typeof t
          ? (e.style.background = t)
          : t || R([document.documentElement, document.body], i["no-backdrop"]);
      })(n, t.backdrop),
      (function (e, t) {
        if (!t) return;
        t in i
          ? R(e, i[t])
          : (l('The "position" parameter is not valid, defaulting to "center"'),
            R(e, i.center));
      })(n, t.position),
      (function (e, t) {
        if (!t) return;
        R(e, i[`grow-${t}`]);
      })(n, t.grow),
      V(n, t, "container"));
  };
  const pe = [
      "input",
      "file",
      "range",
      "select",
      "radio",
      "checkbox",
      "textarea",
    ],
    me = (e) => {
      if (!e.input) return;
      if (!ve[e.input])
        return void c(
          `Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "${e.input}"`
        );
      const t = ye(e.input),
        n = ve[e.input](t, e);
      K(t),
        e.inputAutoFocus &&
          setTimeout(() => {
            F(n);
          });
    },
    ge = (e, t) => {
      const n = N(w(), e);
      if (n) {
        ((e) => {
          for (let t = 0; t < e.attributes.length; t++) {
            const n = e.attributes[t].name;
            ["id", "type", "value", "style"].includes(n) ||
              e.removeAttribute(n);
          }
        })(n);
        for (const e in t) n.setAttribute(e, t[e]);
      }
    },
    he = (e) => {
      const t = ye(e.input);
      "object" == typeof e.customClass && R(t, e.customClass.input);
    },
    fe = (e, t) => {
      (e.placeholder && !t.inputPlaceholder) ||
        (e.placeholder = t.inputPlaceholder);
    },
    be = (e, t, n) => {
      if (n.inputLabel) {
        const o = document.createElement("label"),
          s = i["input-label"];
        o.setAttribute("for", e.id),
          (o.className = s),
          "object" == typeof n.customClass && R(o, n.customClass.inputLabel),
          (o.innerText = n.inputLabel),
          t.insertAdjacentElement("beforebegin", o);
      }
    },
    ye = (e) => z(w(), i[e] || i.input),
    we = (e, t) => {
      ["string", "number"].includes(typeof t)
        ? (e.value = `${t}`)
        : h(t) ||
          l(
            `Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof t}"`
          );
    },
    ve = {};
  (ve.text =
    ve.email =
    ve.password =
    ve.number =
    ve.tel =
    ve.url =
      (e, t) => (
        we(e, t.inputValue), be(e, e, t), fe(e, t), (e.type = t.input), e
      )),
    (ve.file = (e, t) => (be(e, e, t), fe(e, t), e)),
    (ve.range = (e, t) => {
      const n = e.querySelector("input"),
        o = e.querySelector("output");
      return (
        we(n, t.inputValue),
        (n.type = t.input),
        we(o, t.inputValue),
        be(n, e, t),
        e
      );
    }),
    (ve.select = (e, t) => {
      if (((e.textContent = ""), t.inputPlaceholder)) {
        const n = document.createElement("option");
        D(n, t.inputPlaceholder),
          (n.value = ""),
          (n.disabled = !0),
          (n.selected = !0),
          e.appendChild(n);
      }
      return be(e, e, t), e;
    }),
    (ve.radio = (e) => ((e.textContent = ""), e)),
    (ve.checkbox = (e, t) => {
      const n = N(w(), "checkbox");
      (n.value = "1"), (n.checked = Boolean(t.inputValue));
      const o = e.querySelector("span");
      return D(o, t.inputPlaceholder), n;
    }),
    (ve.textarea = (e, t) => {
      we(e, t.inputValue), fe(e, t), be(e, e, t);
      return (
        setTimeout(() => {
          if ("MutationObserver" in window) {
            const n = parseInt(window.getComputedStyle(w()).width);
            new MutationObserver(() => {
              if (!document.body.contains(e)) return;
              const o =
                e.offsetWidth +
                ((i = e),
                parseInt(window.getComputedStyle(i).marginLeft) +
                  parseInt(window.getComputedStyle(i).marginRight));
              var i;
              o > n ? (w().style.width = `${o}px`) : W(w(), "width", t.width);
            }).observe(e, { attributes: !0, attributeFilter: ["style"] });
          }
        }),
        e
      );
    });
  const Ce = (e, t) => {
      const o = A();
      o &&
        (V(o, t, "htmlContainer"),
        t.html
          ? (se(t.html, o), K(o, "block"))
          : t.text
          ? ((o.textContent = t.text), K(o, "block"))
          : Y(o),
        ((e, t) => {
          const o = w();
          if (!o) return;
          const s = n.innerParams.get(e),
            r = !s || t.input !== s.input;
          pe.forEach((e) => {
            const n = z(o, i[e]);
            n && (ge(e, t.inputAttributes), (n.className = i[e]), r && Y(n));
          }),
            t.input && (r && me(t), he(t));
        })(e, t));
    },
    Ae = (e, t) => {
      for (const [n, o] of Object.entries(s)) t.icon !== n && U(e, o);
      R(e, t.icon && s[t.icon]), $e(e, t), ke(), V(e, t, "icon");
    },
    ke = () => {
      const e = w();
      if (!e) return;
      const t = window.getComputedStyle(e).getPropertyValue("background-color"),
        n = e.querySelectorAll(
          "[class^=swal2-success-circular-line], .swal2-success-fix"
        );
      for (let e = 0; e < n.length; e++) n[e].style.backgroundColor = t;
    },
    Be = (e, t) => {
      if (!t.icon && !t.iconHtml) return;
      let n = e.innerHTML,
        o = "";
      if (t.iconHtml) o = Ee(t.iconHtml);
      else if ("success" === t.icon)
        (o =
          '\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n'),
          (n = n.replace(/ style=".*?"/g, ""));
      else if ("error" === t.icon)
        o =
          '\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n';
      else if (t.icon) {
        o = Ee({ question: "?", warning: "!", info: "i" }[t.icon]);
      }
      n.trim() !== o.trim() && D(e, o);
    },
    $e = (e, t) => {
      if (t.iconColor) {
        (e.style.color = t.iconColor), (e.style.borderColor = t.iconColor);
        for (const n of [
          ".swal2-success-line-tip",
          ".swal2-success-line-long",
          ".swal2-x-mark-line-left",
          ".swal2-x-mark-line-right",
        ])
          Z(e, n, "backgroundColor", t.iconColor);
        Z(e, ".swal2-success-ring", "borderColor", t.iconColor);
      }
    },
    Ee = (e) => `<div class="${i["icon-content"]}">${e}</div>`,
    xe = (e, t) => {
      const n = t.showClass || {};
      (e.className = `${i.popup} ${X(e) ? n.popup : ""}`),
        t.toast
          ? (R([document.documentElement, document.body], i["toast-shown"]),
            R(e, i.toast))
          : R(e, i.modal),
        V(e, t, "popup"),
        "string" == typeof t.customClass && R(e, t.customClass),
        t.icon && R(e, i[`icon-${t.icon}`]);
    },
    Pe = (e) => {
      const t = document.createElement("li");
      return R(t, i["progress-step"]), D(t, e), t;
    },
    Te = (e) => {
      const t = document.createElement("li");
      return (
        R(t, i["progress-step-line"]),
        e.progressStepsDistance && W(t, "width", e.progressStepsDistance),
        t
      );
    },
    Le = (e, t) => {
      ((e, t) => {
        const n = f(),
          o = w();
        if (n && o) {
          if (t.toast) {
            W(n, "width", t.width), (o.style.width = "100%");
            const e = T();
            e && o.insertBefore(e, v());
          } else W(o, "width", t.width);
          W(o, "padding", t.padding),
            t.color && (o.style.color = t.color),
            t.background && (o.style.background = t.background),
            Y($()),
            xe(o, t);
        }
      })(0, t),
        de(0, t),
        ((e, t) => {
          const n = B();
          if (!n) return;
          const { progressSteps: o, currentProgressStep: s } = t;
          o && 0 !== o.length && void 0 !== s
            ? (K(n),
              (n.textContent = ""),
              s >= o.length &&
                l(
                  "Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"
                ),
              o.forEach((e, r) => {
                const a = Pe(e);
                if (
                  (n.appendChild(a),
                  r === s && R(a, i["active-progress-step"]),
                  r !== o.length - 1)
                ) {
                  const e = Te(t);
                  n.appendChild(e);
                }
              }))
            : Y(n);
        })(0, t),
        ((e, t) => {
          const o = n.innerParams.get(e),
            i = v();
          if (i) {
            if (o && t.icon === o.icon) return Be(i, t), void Ae(i, t);
            if (t.icon || t.iconHtml) {
              if (t.icon && -1 === Object.keys(s).indexOf(t.icon))
                return (
                  c(
                    `Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${t.icon}"`
                  ),
                  void Y(i)
                );
              K(i), Be(i, t), Ae(i, t), R(i, t.showClass && t.showClass.icon);
            } else Y(i);
          }
        })(e, t),
        ((e, t) => {
          const n = k();
          n &&
            (t.imageUrl
              ? (K(n, ""),
                n.setAttribute("src", t.imageUrl),
                n.setAttribute("alt", t.imageAlt || ""),
                W(n, "width", t.imageWidth),
                W(n, "height", t.imageHeight),
                (n.className = i.image),
                V(n, t, "image"))
              : Y(n));
        })(0, t),
        ((e, t) => {
          const n = C();
          n &&
            (J(n, t.title || t.titleText, "block"),
            t.title && se(t.title, n),
            t.titleText && (n.innerText = t.titleText),
            V(n, t, "title"));
        })(0, t),
        ((e, t) => {
          const n = M();
          n &&
            (D(n, t.closeButtonHtml || ""),
            V(n, t, "closeButton"),
            J(n, t.showCloseButton),
            n.setAttribute("aria-label", t.closeButtonAriaLabel || ""));
        })(0, t),
        Ce(e, t),
        ce(0, t),
        ((e, t) => {
          const n = S();
          n && (J(n, t.footer), t.footer && se(t.footer, n), V(n, t, "footer"));
        })(0, t);
      const o = w();
      "function" == typeof t.didRender && o && t.didRender(o);
    },
    Se = () => E() && E().click(),
    Oe = Object.freeze({
      cancel: "cancel",
      backdrop: "backdrop",
      close: "close",
      esc: "esc",
      timer: "timer",
    }),
    Me = (e) => {
      e.keydownTarget &&
        e.keydownHandlerAdded &&
        (e.keydownTarget.removeEventListener("keydown", e.keydownHandler, {
          capture: e.keydownListenerCapture,
        }),
        (e.keydownHandlerAdded = !1));
    },
    je = (e, t) => {
      const n = j();
      if (n.length)
        return (
          (e += t) === n.length ? (e = 0) : -1 === e && (e = n.length - 1),
          void n[e].focus()
        );
      w().focus();
    },
    Ie = ["ArrowRight", "ArrowDown"],
    He = ["ArrowLeft", "ArrowUp"],
    De = (e, t, o) => {
      const i = n.innerParams.get(e);
      i &&
        (t.isComposing ||
          229 === t.keyCode ||
          (i.stopKeydownPropagation && t.stopPropagation(),
          "Enter" === t.key
            ? qe(e, t, i)
            : "Tab" === t.key
            ? Ve(t)
            : [...Ie, ...He].includes(t.key)
            ? Ne(t.key)
            : "Escape" === t.key && Fe(t, i, o)));
    },
    qe = (e, t, n) => {
      if (
        p(n.allowEnterKey) &&
        t.target &&
        e.getInput() &&
        t.target instanceof HTMLElement &&
        t.target.outerHTML === e.getInput().outerHTML
      ) {
        if (["textarea", "file"].includes(n.input)) return;
        Se(), t.preventDefault();
      }
    },
    Ve = (e) => {
      const t = e.target,
        n = j();
      let o = -1;
      for (let e = 0; e < n.length; e++)
        if (t === n[e]) {
          o = e;
          break;
        }
      e.shiftKey ? je(o, -1) : je(o, 1),
        e.stopPropagation(),
        e.preventDefault();
    },
    Ne = (e) => {
      const t = [E(), P(), x()];
      if (
        document.activeElement instanceof HTMLElement &&
        !t.includes(document.activeElement)
      )
        return;
      const n = Ie.includes(e)
        ? "nextElementSibling"
        : "previousElementSibling";
      let o = document.activeElement;
      for (let e = 0; e < L().children.length; e++) {
        if (((o = o[n]), !o)) return;
        if (o instanceof HTMLButtonElement && X(o)) break;
      }
      o instanceof HTMLButtonElement && o.focus();
    },
    Fe = (e, t, n) => {
      p(t.allowEscapeKey) && (e.preventDefault(), n(Oe.esc));
    };
  var _e = {
    swalPromiseResolve: new WeakMap(),
    swalPromiseReject: new WeakMap(),
  };
  const Re = () => {
      Array.from(document.body.children).forEach((e) => {
        e.hasAttribute("data-previous-aria-hidden")
          ? (e.setAttribute(
              "aria-hidden",
              e.getAttribute("data-previous-aria-hidden") || ""
            ),
            e.removeAttribute("data-previous-aria-hidden"))
          : e.removeAttribute("aria-hidden");
      });
    },
    Ue = "undefined" != typeof window && !!window.GestureEvent,
    ze = () => {
      const e = f();
      let t;
      (e.ontouchstart = (e) => {
        t = We(e);
      }),
        (e.ontouchmove = (e) => {
          t && (e.preventDefault(), e.stopPropagation());
        });
    },
    We = (e) => {
      const t = e.target,
        n = f();
      return (
        !Ke(e) &&
        !Ye(e) &&
        (t === n ||
          (!G(n) &&
            t instanceof HTMLElement &&
            "INPUT" !== t.tagName &&
            "TEXTAREA" !== t.tagName &&
            (!G(A()) || !A().contains(t))))
      );
    },
    Ke = (e) =>
      e.touches && e.touches.length && "stylus" === e.touches[0].touchType,
    Ye = (e) => e.touches && e.touches.length > 1;
  let Ze = null;
  const Je = () => {
    null === Ze &&
      document.body.scrollHeight > window.innerHeight &&
      ((Ze = parseInt(
        window.getComputedStyle(document.body).getPropertyValue("padding-right")
      )),
      (document.body.style.paddingRight = `${
        Ze +
        (() => {
          const e = document.createElement("div");
          (e.className = i["scrollbar-measure"]), document.body.appendChild(e);
          const t = e.getBoundingClientRect().width - e.clientWidth;
          return document.body.removeChild(e), t;
        })()
      }px`));
  };
  function Xe(n, o, s, r) {
    H() ? st(n, r) : (t(s).then(() => st(n, r)), Me(e)),
      Ue
        ? (o.setAttribute("style", "display:none !important"),
          o.removeAttribute("class"),
          (o.innerHTML = ""))
        : o.remove(),
      I() &&
        (null !== Ze &&
          ((document.body.style.paddingRight = `${Ze}px`), (Ze = null)),
        (() => {
          if (q(document.body, i.iosfix)) {
            const e = parseInt(document.body.style.top, 10);
            U(document.body, i.iosfix),
              (document.body.style.top = ""),
              (document.body.scrollTop = -1 * e);
          }
        })(),
        Re()),
      U(
        [document.documentElement, document.body],
        [i.shown, i["height-auto"], i["no-backdrop"], i["toast-shown"]]
      );
  }
  function Ge(e) {
    e = nt(e);
    const t = _e.swalPromiseResolve.get(this),
      n = Qe(this);
    this.isAwaitingPromise ? e.isDismissed || (tt(this), t(e)) : n && t(e);
  }
  const Qe = (e) => {
    const t = w();
    if (!t) return !1;
    const o = n.innerParams.get(e);
    if (!o || q(t, o.hideClass.popup)) return !1;
    U(t, o.showClass.popup), R(t, o.hideClass.popup);
    const i = f();
    return (
      U(i, o.showClass.backdrop), R(i, o.hideClass.backdrop), ot(e, t, o), !0
    );
  };
  function et(e) {
    const t = _e.swalPromiseReject.get(this);
    tt(this), t && t(e);
  }
  const tt = (e) => {
      e.isAwaitingPromise &&
        (delete e.isAwaitingPromise, n.innerParams.get(e) || e._destroy());
    },
    nt = (e) =>
      void 0 === e
        ? { isConfirmed: !1, isDenied: !1, isDismissed: !0 }
        : Object.assign({ isConfirmed: !1, isDenied: !1, isDismissed: !1 }, e),
    ot = (e, t, n) => {
      const o = f(),
        i = le && Q(t);
      "function" == typeof n.willClose && n.willClose(t),
        i
          ? it(e, t, o, n.returnFocus, n.didClose)
          : Xe(e, o, n.returnFocus, n.didClose);
    },
    it = (t, n, o, i, s) => {
      (e.swalCloseEventFinishedCallback = Xe.bind(null, t, o, i, s)),
        n.addEventListener(le, function (t) {
          t.target === n &&
            (e.swalCloseEventFinishedCallback(),
            delete e.swalCloseEventFinishedCallback);
        });
    },
    st = (e, t) => {
      setTimeout(() => {
        "function" == typeof t && t.bind(e.params)(),
          e._destroy && e._destroy();
      });
    },
    rt = (e) => {
      let t = w();
      if ((t || new Hn(), (t = w()), !t)) return;
      const n = T();
      H() ? Y(v()) : at(t, e),
        K(n),
        t.setAttribute("data-loading", "true"),
        t.setAttribute("aria-busy", "true"),
        t.focus();
    },
    at = (e, t) => {
      const n = L(),
        o = T();
      n &&
        o &&
        (!t && X(E()) && (t = E()),
        K(n),
        t &&
          (Y(t),
          o.setAttribute("data-button-to-replace", t.className),
          n.insertBefore(o, t)),
        R([e, n], i.loading));
    },
    lt = (e) => (e.checked ? 1 : 0),
    ct = (e) => (e.checked ? e.value : null),
    ut = (e) =>
      e.files && e.files.length
        ? null !== e.getAttribute("multiple")
          ? e.files
          : e.files[0]
        : null,
    dt = (e, t) => {
      const n = w();
      if (!n) return;
      const o = (e) => {
        "select" === t.input
          ? (function (e, t, n) {
              const o = z(e, i.select);
              if (!o) return;
              const s = (e, t, o) => {
                const i = document.createElement("option");
                (i.value = o),
                  D(i, t),
                  (i.selected = gt(o, n.inputValue)),
                  e.appendChild(i);
              };
              t.forEach((e) => {
                const t = e[0],
                  n = e[1];
                if (Array.isArray(n)) {
                  const e = document.createElement("optgroup");
                  (e.label = t),
                    (e.disabled = !1),
                    o.appendChild(e),
                    n.forEach((t) => s(e, t[1], t[0]));
                } else s(o, n, t);
              }),
                o.focus();
            })(n, mt(e), t)
          : "radio" === t.input &&
            (function (e, t, n) {
              const o = z(e, i.radio);
              if (!o) return;
              t.forEach((e) => {
                const t = e[0],
                  s = e[1],
                  r = document.createElement("input"),
                  a = document.createElement("label");
                (r.type = "radio"),
                  (r.name = i.radio),
                  (r.value = t),
                  gt(t, n.inputValue) && (r.checked = !0);
                const l = document.createElement("span");
                D(l, s),
                  (l.className = i.label),
                  a.appendChild(r),
                  a.appendChild(l),
                  o.appendChild(a);
              });
              const s = o.querySelectorAll("input");
              s.length && s[0].focus();
            })(n, mt(e), t);
      };
      m(t.inputOptions) || h(t.inputOptions)
        ? (rt(E()),
          g(t.inputOptions).then((t) => {
            e.hideLoading(), o(t);
          }))
        : "object" == typeof t.inputOptions
        ? o(t.inputOptions)
        : c(
            "Unexpected type of inputOptions! Expected object, Map or Promise, got " +
              typeof t.inputOptions
          );
    },
    pt = (e, t) => {
      const n = e.getInput();
      n &&
        (Y(n),
        g(t.inputValue)
          .then((o) => {
            (n.value = "number" === t.input ? `${parseFloat(o) || 0}` : `${o}`),
              K(n),
              n.focus(),
              e.hideLoading();
          })
          .catch((t) => {
            c(`Error in inputValue promise: ${t}`),
              (n.value = ""),
              K(n),
              n.focus(),
              e.hideLoading();
          }));
    };
  const mt = (e) => {
      const t = [];
      return (
        e instanceof Map
          ? e.forEach((e, n) => {
              let o = e;
              "object" == typeof o && (o = mt(o)), t.push([n, o]);
            })
          : Object.keys(e).forEach((n) => {
              let o = e[n];
              "object" == typeof o && (o = mt(o)), t.push([n, o]);
            }),
        t
      );
    },
    gt = (e, t) => !!t && t.toString() === e.toString(),
    ht = (e, t) => {
      const o = n.innerParams.get(e);
      if (!o.input)
        return void c(
          `The "input" parameter is needed to be set when using returnInputValueOn${a(
            t
          )}`
        );
      const i = e.getInput(),
        s = ((e, t) => {
          const n = e.getInput();
          if (!n) return null;
          switch (t.input) {
            case "checkbox":
              return lt(n);
            case "radio":
              return ct(n);
            case "file":
              return ut(n);
            default:
              return t.inputAutoTrim ? n.value.trim() : n.value;
          }
        })(e, o);
      o.inputValidator
        ? ft(e, s, t)
        : i && !i.checkValidity()
        ? (e.enableButtons(), e.showValidationMessage(o.validationMessage))
        : "deny" === t
        ? bt(e, s)
        : vt(e, s);
    },
    ft = (e, t, o) => {
      const i = n.innerParams.get(e);
      e.disableInput();
      Promise.resolve()
        .then(() => g(i.inputValidator(t, i.validationMessage)))
        .then((n) => {
          e.enableButtons(),
            e.enableInput(),
            n ? e.showValidationMessage(n) : "deny" === o ? bt(e, t) : vt(e, t);
        });
    },
    bt = (e, t) => {
      const o = n.innerParams.get(e || void 0);
      if ((o.showLoaderOnDeny && rt(P()), o.preDeny)) {
        e.isAwaitingPromise = !0;
        Promise.resolve()
          .then(() => g(o.preDeny(t, o.validationMessage)))
          .then((n) => {
            !1 === n
              ? (e.hideLoading(), tt(e))
              : e.close({ isDenied: !0, value: void 0 === n ? t : n });
          })
          .catch((t) => wt(e || void 0, t));
      } else e.close({ isDenied: !0, value: t });
    },
    yt = (e, t) => {
      e.close({ isConfirmed: !0, value: t });
    },
    wt = (e, t) => {
      e.rejectPromise(t);
    },
    vt = (e, t) => {
      const o = n.innerParams.get(e || void 0);
      if ((o.showLoaderOnConfirm && rt(), o.preConfirm)) {
        e.resetValidationMessage(), (e.isAwaitingPromise = !0);
        Promise.resolve()
          .then(() => g(o.preConfirm(t, o.validationMessage)))
          .then((n) => {
            X($()) || !1 === n
              ? (e.hideLoading(), tt(e))
              : yt(e, void 0 === n ? t : n);
          })
          .catch((t) => wt(e || void 0, t));
      } else yt(e, t);
    };
  function Ct() {
    const e = n.innerParams.get(this);
    if (!e) return;
    const t = n.domCache.get(this);
    Y(t.loader),
      H() ? e.icon && K(v()) : At(t),
      U([t.popup, t.actions], i.loading),
      t.popup.removeAttribute("aria-busy"),
      t.popup.removeAttribute("data-loading"),
      (t.confirmButton.disabled = !1),
      (t.denyButton.disabled = !1),
      (t.cancelButton.disabled = !1);
  }
  const At = (e) => {
    const t = e.popup.getElementsByClassName(
      e.loader.getAttribute("data-button-to-replace")
    );
    t.length
      ? K(t[0], "inline-block")
      : X(E()) || X(P()) || X(x()) || Y(e.actions);
  };
  function kt() {
    const e = n.innerParams.get(this),
      t = n.domCache.get(this);
    return t ? N(t.popup, e.input) : null;
  }
  function Bt(e, t, o) {
    const i = n.domCache.get(e);
    t.forEach((e) => {
      i[e].disabled = o;
    });
  }
  function $t(e, t) {
    const n = w();
    if (n && e)
      if ("radio" === e.type) {
        const e = n.querySelectorAll(`[name="${i.radio}"]`);
        for (let n = 0; n < e.length; n++) e[n].disabled = t;
      } else e.disabled = t;
  }
  function Et() {
    Bt(this, ["confirmButton", "denyButton", "cancelButton"], !1);
  }
  function xt() {
    Bt(this, ["confirmButton", "denyButton", "cancelButton"], !0);
  }
  function Pt() {
    $t(this.getInput(), !1);
  }
  function Tt() {
    $t(this.getInput(), !0);
  }
  function Lt(e) {
    const t = n.domCache.get(this),
      o = n.innerParams.get(this);
    D(t.validationMessage, e),
      (t.validationMessage.className = i["validation-message"]),
      o.customClass &&
        o.customClass.validationMessage &&
        R(t.validationMessage, o.customClass.validationMessage),
      K(t.validationMessage);
    const s = this.getInput();
    s &&
      (s.setAttribute("aria-invalid", !0),
      s.setAttribute("aria-describedby", i["validation-message"]),
      F(s),
      R(s, i.inputerror));
  }
  function St() {
    const e = n.domCache.get(this);
    e.validationMessage && Y(e.validationMessage);
    const t = this.getInput();
    t &&
      (t.removeAttribute("aria-invalid"),
      t.removeAttribute("aria-describedby"),
      U(t, i.inputerror));
  }
  const Ot = {
      title: "",
      titleText: "",
      text: "",
      html: "",
      footer: "",
      icon: void 0,
      iconColor: void 0,
      iconHtml: void 0,
      template: void 0,
      toast: !1,
      showClass: {
        popup: "swal2-show",
        backdrop: "swal2-backdrop-show",
        icon: "swal2-icon-show",
      },
      hideClass: {
        popup: "swal2-hide",
        backdrop: "swal2-backdrop-hide",
        icon: "swal2-icon-hide",
      },
      customClass: {},
      target: "body",
      color: void 0,
      backdrop: !0,
      heightAuto: !0,
      allowOutsideClick: !0,
      allowEscapeKey: !0,
      allowEnterKey: !0,
      stopKeydownPropagation: !0,
      keydownListenerCapture: !1,
      showConfirmButton: !0,
      showDenyButton: !1,
      showCancelButton: !1,
      preConfirm: void 0,
      preDeny: void 0,
      confirmButtonText: "OK",
      confirmButtonAriaLabel: "",
      confirmButtonColor: void 0,
      denyButtonText: "No",
      denyButtonAriaLabel: "",
      denyButtonColor: void 0,
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "",
      cancelButtonColor: void 0,
      buttonsStyling: !0,
      reverseButtons: !1,
      focusConfirm: !0,
      focusDeny: !1,
      focusCancel: !1,
      returnFocus: !0,
      showCloseButton: !1,
      closeButtonHtml: "&times;",
      closeButtonAriaLabel: "Close this dialog",
      loaderHtml: "",
      showLoaderOnConfirm: !1,
      showLoaderOnDeny: !1,
      imageUrl: void 0,
      imageWidth: void 0,
      imageHeight: void 0,
      imageAlt: "",
      timer: void 0,
      timerProgressBar: !1,
      width: void 0,
      padding: void 0,
      background: void 0,
      input: void 0,
      inputPlaceholder: "",
      inputLabel: "",
      inputValue: "",
      inputOptions: {},
      inputAutoFocus: !0,
      inputAutoTrim: !0,
      inputAttributes: {},
      inputValidator: void 0,
      returnInputValueOnDeny: !1,
      validationMessage: void 0,
      grow: !1,
      position: "center",
      progressSteps: [],
      currentProgressStep: void 0,
      progressStepsDistance: void 0,
      willOpen: void 0,
      didOpen: void 0,
      didRender: void 0,
      willClose: void 0,
      didClose: void 0,
      didDestroy: void 0,
      scrollbarPadding: !0,
    },
    Mt = [
      "allowEscapeKey",
      "allowOutsideClick",
      "background",
      "buttonsStyling",
      "cancelButtonAriaLabel",
      "cancelButtonColor",
      "cancelButtonText",
      "closeButtonAriaLabel",
      "closeButtonHtml",
      "color",
      "confirmButtonAriaLabel",
      "confirmButtonColor",
      "confirmButtonText",
      "currentProgressStep",
      "customClass",
      "denyButtonAriaLabel",
      "denyButtonColor",
      "denyButtonText",
      "didClose",
      "didDestroy",
      "footer",
      "hideClass",
      "html",
      "icon",
      "iconColor",
      "iconHtml",
      "imageAlt",
      "imageHeight",
      "imageUrl",
      "imageWidth",
      "preConfirm",
      "preDeny",
      "progressSteps",
      "returnFocus",
      "reverseButtons",
      "showCancelButton",
      "showCloseButton",
      "showConfirmButton",
      "showDenyButton",
      "text",
      "title",
      "titleText",
      "willClose",
    ],
    jt = {},
    It = [
      "allowOutsideClick",
      "allowEnterKey",
      "backdrop",
      "focusConfirm",
      "focusDeny",
      "focusCancel",
      "returnFocus",
      "heightAuto",
      "keydownListenerCapture",
    ],
    Ht = (e) => Object.prototype.hasOwnProperty.call(Ot, e),
    Dt = (e) => -1 !== Mt.indexOf(e),
    qt = (e) => jt[e],
    Vt = (e) => {
      Ht(e) || l(`Unknown parameter "${e}"`);
    },
    Nt = (e) => {
      It.includes(e) && l(`The parameter "${e}" is incompatible with toasts`);
    },
    Ft = (e) => {
      const t = qt(e);
      t && d(e, t);
    };
  function _t(e) {
    const t = w(),
      o = n.innerParams.get(this);
    if (!t || q(t, o.hideClass.popup))
      return void l(
        "You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup."
      );
    const i = Rt(e),
      s = Object.assign({}, o, i);
    Le(this, s),
      n.innerParams.set(this, s),
      Object.defineProperties(this, {
        params: {
          value: Object.assign({}, this.params, e),
          writable: !1,
          enumerable: !0,
        },
      });
  }
  const Rt = (e) => {
    const t = {};
    return (
      Object.keys(e).forEach((n) => {
        Dt(n) ? (t[n] = e[n]) : l(`Invalid parameter to update: ${n}`);
      }),
      t
    );
  };
  function Ut() {
    const t = n.domCache.get(this),
      o = n.innerParams.get(this);
    o
      ? (t.popup &&
          e.swalCloseEventFinishedCallback &&
          (e.swalCloseEventFinishedCallback(),
          delete e.swalCloseEventFinishedCallback),
        "function" == typeof o.didDestroy && o.didDestroy(),
        zt(this))
      : Wt(this);
  }
  const zt = (t) => {
      Wt(t),
        delete t.params,
        delete e.keydownHandler,
        delete e.keydownTarget,
        delete e.currentInstance;
    },
    Wt = (e) => {
      e.isAwaitingPromise
        ? (Kt(n, e), (e.isAwaitingPromise = !0))
        : (Kt(_e, e),
          Kt(n, e),
          delete e.isAwaitingPromise,
          delete e.disableButtons,
          delete e.enableButtons,
          delete e.getInput,
          delete e.disableInput,
          delete e.enableInput,
          delete e.hideLoading,
          delete e.disableLoading,
          delete e.showValidationMessage,
          delete e.resetValidationMessage,
          delete e.close,
          delete e.closePopup,
          delete e.closeModal,
          delete e.closeToast,
          delete e.rejectPromise,
          delete e.update,
          delete e._destroy);
    },
    Kt = (e, t) => {
      for (const n in e) e[n].delete(t);
    };
  var Yt = Object.freeze({
    __proto__: null,
    _destroy: Ut,
    close: Ge,
    closeModal: Ge,
    closePopup: Ge,
    closeToast: Ge,
    disableButtons: xt,
    disableInput: Tt,
    disableLoading: Ct,
    enableButtons: Et,
    enableInput: Pt,
    getInput: kt,
    handleAwaitingPromise: tt,
    hideLoading: Ct,
    rejectPromise: et,
    resetValidationMessage: St,
    showValidationMessage: Lt,
    update: _t,
  });
  const Zt = (e, t, o) => {
      t.popup.onclick = () => {
        const t = n.innerParams.get(e);
        (t && (Jt(t) || t.timer || t.input)) || o(Oe.close);
      };
    },
    Jt = (e) =>
      e.showConfirmButton ||
      e.showDenyButton ||
      e.showCancelButton ||
      e.showCloseButton;
  let Xt = !1;
  const Gt = (e) => {
      e.popup.onmousedown = () => {
        e.container.onmouseup = function (t) {
          (e.container.onmouseup = void 0),
            t.target === e.container && (Xt = !0);
        };
      };
    },
    Qt = (e) => {
      e.container.onmousedown = () => {
        e.popup.onmouseup = function (t) {
          (e.popup.onmouseup = void 0),
            (t.target === e.popup || e.popup.contains(t.target)) && (Xt = !0);
        };
      };
    },
    en = (e, t, o) => {
      t.container.onclick = (i) => {
        const s = n.innerParams.get(e);
        Xt
          ? (Xt = !1)
          : i.target === t.container &&
            p(s.allowOutsideClick) &&
            o(Oe.backdrop);
      };
    },
    tn = (e) =>
      e instanceof Element || ((e) => "object" == typeof e && e.jquery)(e);
  const nn = () => {
      if (e.timeout)
        return (
          (() => {
            const e = O();
            if (!e) return;
            const t = parseInt(window.getComputedStyle(e).width);
            e.style.removeProperty("transition"), (e.style.width = "100%");
            const n = (t / parseInt(window.getComputedStyle(e).width)) * 100;
            e.style.width = `${n}%`;
          })(),
          e.timeout.stop()
        );
    },
    on = () => {
      if (e.timeout) {
        const t = e.timeout.start();
        return ee(t), t;
      }
    };
  let sn = !1;
  const rn = {};
  const an = (e) => {
    for (let t = e.target; t && t !== document; t = t.parentNode)
      for (const e in rn) {
        const n = t.getAttribute(e);
        if (n) return void rn[e].fire({ template: n });
      }
  };
  var ln = Object.freeze({
    __proto__: null,
    argsToParams: (e) => {
      const t = {};
      return (
        "object" != typeof e[0] || tn(e[0])
          ? ["title", "html", "icon"].forEach((n, o) => {
              const i = e[o];
              "string" == typeof i || tn(i)
                ? (t[n] = i)
                : void 0 !== i &&
                  c(
                    `Unexpected type of ${n}! Expected "string" or "Element", got ${typeof i}`
                  );
            })
          : Object.assign(t, e[0]),
        t
      );
    },
    bindClickHandler: function () {
      (rn[
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : "data-swal-template"
      ] = this),
        sn || (document.body.addEventListener("click", an), (sn = !0));
    },
    clickCancel: () => x() && x().click(),
    clickConfirm: Se,
    clickDeny: () => P() && P().click(),
    enableLoading: rt,
    fire: function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return new this(...t);
    },
    getActions: L,
    getCancelButton: x,
    getCloseButton: M,
    getConfirmButton: E,
    getContainer: f,
    getDenyButton: P,
    getFocusableElements: j,
    getFooter: S,
    getHtmlContainer: A,
    getIcon: v,
    getIconContent: () => y(i["icon-content"]),
    getImage: k,
    getInputLabel: () => y(i["input-label"]),
    getLoader: T,
    getPopup: w,
    getProgressSteps: B,
    getTimerLeft: () => e.timeout && e.timeout.getTimerLeft(),
    getTimerProgressBar: O,
    getTitle: C,
    getValidationMessage: $,
    increaseTimer: (t) => {
      if (e.timeout) {
        const n = e.timeout.increase(t);
        return ee(n, !0), n;
      }
    },
    isDeprecatedParameter: qt,
    isLoading: () => {
      const e = w();
      return !!e && e.hasAttribute("data-loading");
    },
    isTimerRunning: () => !(!e.timeout || !e.timeout.isRunning()),
    isUpdatableParameter: Dt,
    isValidParameter: Ht,
    isVisible: () => X(w()),
    mixin: function (e) {
      return class extends this {
        _main(t, n) {
          return super._main(t, Object.assign({}, e, n));
        }
      };
    },
    resumeTimer: on,
    showLoading: rt,
    stopTimer: nn,
    toggleTimer: () => {
      const t = e.timeout;
      return t && (t.running ? nn() : on());
    },
  });
  class cn {
    constructor(e, t) {
      (this.callback = e),
        (this.remaining = t),
        (this.running = !1),
        this.start();
    }
    start() {
      return (
        this.running ||
          ((this.running = !0),
          (this.started = new Date()),
          (this.id = setTimeout(this.callback, this.remaining))),
        this.remaining
      );
    }
    stop() {
      return (
        this.started &&
          this.running &&
          ((this.running = !1),
          clearTimeout(this.id),
          (this.remaining -= new Date().getTime() - this.started.getTime())),
        this.remaining
      );
    }
    increase(e) {
      const t = this.running;
      return (
        t && this.stop(),
        (this.remaining += e),
        t && this.start(),
        this.remaining
      );
    }
    getTimerLeft() {
      return this.running && (this.stop(), this.start()), this.remaining;
    }
    isRunning() {
      return this.running;
    }
  }
  const un = ["swal-title", "swal-html", "swal-footer"],
    dn = (e) => {
      const t = {};
      return (
        Array.from(e.querySelectorAll("swal-param")).forEach((e) => {
          wn(e, ["name", "value"]);
          const n = e.getAttribute("name"),
            o = e.getAttribute("value");
          t[n] =
            "boolean" == typeof Ot[n]
              ? "false" !== o
              : "object" == typeof Ot[n]
              ? JSON.parse(o)
              : o;
        }),
        t
      );
    },
    pn = (e) => {
      const t = {};
      return (
        Array.from(e.querySelectorAll("swal-function-param")).forEach((e) => {
          const n = e.getAttribute("name"),
            o = e.getAttribute("value");
          t[n] = new Function(`return ${o}`)();
        }),
        t
      );
    },
    mn = (e) => {
      const t = {};
      return (
        Array.from(e.querySelectorAll("swal-button")).forEach((e) => {
          wn(e, ["type", "color", "aria-label"]);
          const n = e.getAttribute("type");
          (t[`${n}ButtonText`] = e.innerHTML),
            (t[`show${a(n)}Button`] = !0),
            e.hasAttribute("color") &&
              (t[`${n}ButtonColor`] = e.getAttribute("color")),
            e.hasAttribute("aria-label") &&
              (t[`${n}ButtonAriaLabel`] = e.getAttribute("aria-label"));
        }),
        t
      );
    },
    gn = (e) => {
      const t = {},
        n = e.querySelector("swal-image");
      return (
        n &&
          (wn(n, ["src", "width", "height", "alt"]),
          n.hasAttribute("src") && (t.imageUrl = n.getAttribute("src")),
          n.hasAttribute("width") && (t.imageWidth = n.getAttribute("width")),
          n.hasAttribute("height") &&
            (t.imageHeight = n.getAttribute("height")),
          n.hasAttribute("alt") && (t.imageAlt = n.getAttribute("alt"))),
        t
      );
    },
    hn = (e) => {
      const t = {},
        n = e.querySelector("swal-icon");
      return (
        n &&
          (wn(n, ["type", "color"]),
          n.hasAttribute("type") && (t.icon = n.getAttribute("type")),
          n.hasAttribute("color") && (t.iconColor = n.getAttribute("color")),
          (t.iconHtml = n.innerHTML)),
        t
      );
    },
    fn = (e) => {
      const t = {},
        n = e.querySelector("swal-input");
      n &&
        (wn(n, ["type", "label", "placeholder", "value"]),
        (t.input = n.getAttribute("type") || "text"),
        n.hasAttribute("label") && (t.inputLabel = n.getAttribute("label")),
        n.hasAttribute("placeholder") &&
          (t.inputPlaceholder = n.getAttribute("placeholder")),
        n.hasAttribute("value") && (t.inputValue = n.getAttribute("value")));
      const o = Array.from(e.querySelectorAll("swal-input-option"));
      return (
        o.length &&
          ((t.inputOptions = {}),
          o.forEach((e) => {
            wn(e, ["value"]);
            const n = e.getAttribute("value"),
              o = e.innerHTML;
            t.inputOptions[n] = o;
          })),
        t
      );
    },
    bn = (e, t) => {
      const n = {};
      for (const o in t) {
        const i = t[o],
          s = e.querySelector(i);
        s && (wn(s, []), (n[i.replace(/^swal-/, "")] = s.innerHTML.trim()));
      }
      return n;
    },
    yn = (e) => {
      const t = un.concat([
        "swal-param",
        "swal-function-param",
        "swal-button",
        "swal-image",
        "swal-icon",
        "swal-input",
        "swal-input-option",
      ]);
      Array.from(e.children).forEach((e) => {
        const n = e.tagName.toLowerCase();
        t.includes(n) || l(`Unrecognized element <${n}>`);
      });
    },
    wn = (e, t) => {
      Array.from(e.attributes).forEach((n) => {
        -1 === t.indexOf(n.name) &&
          l([
            `Unrecognized attribute "${
              n.name
            }" on <${e.tagName.toLowerCase()}>.`,
            "" +
              (t.length
                ? `Allowed attributes are: ${t.join(", ")}`
                : "To set the value, use HTML within the element."),
          ]);
      });
    },
    vn = (t) => {
      const n = f(),
        o = w();
      "function" == typeof t.willOpen && t.willOpen(o);
      const s = window.getComputedStyle(document.body).overflowY;
      Bn(n, o, t),
        setTimeout(() => {
          An(n, o);
        }, 10),
        I() &&
          (kn(n, t.scrollbarPadding, s),
          Array.from(document.body.children).forEach((e) => {
            e === f() ||
              e.contains(f()) ||
              (e.hasAttribute("aria-hidden") &&
                e.setAttribute(
                  "data-previous-aria-hidden",
                  e.getAttribute("aria-hidden") || ""
                ),
              e.setAttribute("aria-hidden", "true"));
          })),
        H() ||
          e.previousActiveElement ||
          (e.previousActiveElement = document.activeElement),
        "function" == typeof t.didOpen && setTimeout(() => t.didOpen(o)),
        U(n, i["no-transition"]);
    },
    Cn = (e) => {
      const t = w();
      if (e.target !== t) return;
      const n = f();
      t.removeEventListener(le, Cn), (n.style.overflowY = "auto");
    },
    An = (e, t) => {
      le && Q(t)
        ? ((e.style.overflowY = "hidden"), t.addEventListener(le, Cn))
        : (e.style.overflowY = "auto");
    },
    kn = (e, t, n) => {
      (() => {
        if (Ue && !q(document.body, i.iosfix)) {
          const e = document.body.scrollTop;
          (document.body.style.top = -1 * e + "px"),
            R(document.body, i.iosfix),
            ze();
        }
      })(),
        t && "hidden" !== n && Je(),
        setTimeout(() => {
          e.scrollTop = 0;
        });
    },
    Bn = (e, t, n) => {
      R(e, n.showClass.backdrop),
        t.style.setProperty("opacity", "0", "important"),
        K(t, "grid"),
        setTimeout(() => {
          R(t, n.showClass.popup), t.style.removeProperty("opacity");
        }, 10),
        R([document.documentElement, document.body], i.shown),
        n.heightAuto &&
          n.backdrop &&
          !n.toast &&
          R([document.documentElement, document.body], i["height-auto"]);
    };
  var $n = {
    email: (e, t) =>
      /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)
        ? Promise.resolve()
        : Promise.resolve(t || "Invalid email address"),
    url: (e, t) =>
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(
        e
      )
        ? Promise.resolve()
        : Promise.resolve(t || "Invalid URL"),
  };
  function En(e) {
    !(function (e) {
      e.inputValidator ||
        ("email" === e.input && (e.inputValidator = $n.email),
        "url" === e.input && (e.inputValidator = $n.url));
    })(e),
      e.showLoaderOnConfirm &&
        !e.preConfirm &&
        l(
          "showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"
        ),
      (function (e) {
        (!e.target ||
          ("string" == typeof e.target && !document.querySelector(e.target)) ||
          ("string" != typeof e.target && !e.target.appendChild)) &&
          (l('Target parameter is not valid, defaulting to "body"'),
          (e.target = "body"));
      })(e),
      "string" == typeof e.title &&
        (e.title = e.title.split("\n").join("<br />")),
      ie(e);
  }
  let xn;
  class Pn {
    constructor() {
      if ("undefined" == typeof window) return;
      xn = this;
      for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
        t[o] = arguments[o];
      const i = Object.freeze(this.constructor.argsToParams(t));
      (this.params = i), (this.isAwaitingPromise = !1);
      const s = xn._main(xn.params);
      n.promise.set(this, s);
    }
    _main(t) {
      let o =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      ((e) => {
        !1 === e.backdrop &&
          e.allowOutsideClick &&
          l(
            '"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'
          );
        for (const t in e) Vt(t), e.toast && Nt(t), Ft(t);
      })(Object.assign({}, o, t)),
        e.currentInstance && (e.currentInstance._destroy(), I() && Re()),
        (e.currentInstance = xn);
      const i = Ln(t, o);
      En(i),
        Object.freeze(i),
        e.timeout && (e.timeout.stop(), delete e.timeout),
        clearTimeout(e.restoreFocusTimeout);
      const s = Sn(xn);
      return Le(xn, i), n.innerParams.set(xn, i), Tn(xn, s, i);
    }
    then(e) {
      return n.promise.get(this).then(e);
    }
    finally(e) {
      return n.promise.get(this).finally(e);
    }
  }
  const Tn = (t, o, i) =>
      new Promise((s, r) => {
        const a = (e) => {
          t.close({ isDismissed: !0, dismiss: e });
        };
        _e.swalPromiseResolve.set(t, s),
          _e.swalPromiseReject.set(t, r),
          (o.confirmButton.onclick = () => {
            ((e) => {
              const t = n.innerParams.get(e);
              e.disableButtons(), t.input ? ht(e, "confirm") : vt(e, !0);
            })(t);
          }),
          (o.denyButton.onclick = () => {
            ((e) => {
              const t = n.innerParams.get(e);
              e.disableButtons(),
                t.returnInputValueOnDeny ? ht(e, "deny") : bt(e, !1);
            })(t);
          }),
          (o.cancelButton.onclick = () => {
            ((e, t) => {
              e.disableButtons(), t(Oe.cancel);
            })(t, a);
          }),
          (o.closeButton.onclick = () => {
            a(Oe.close);
          }),
          ((e, t, o) => {
            n.innerParams.get(e).toast
              ? Zt(e, t, o)
              : (Gt(t), Qt(t), en(e, t, o));
          })(t, o, a),
          ((e, t, n, o) => {
            Me(t),
              n.toast ||
                ((t.keydownHandler = (t) => De(e, t, o)),
                (t.keydownTarget = n.keydownListenerCapture ? window : w()),
                (t.keydownListenerCapture = n.keydownListenerCapture),
                t.keydownTarget.addEventListener("keydown", t.keydownHandler, {
                  capture: t.keydownListenerCapture,
                }),
                (t.keydownHandlerAdded = !0));
          })(t, e, i, a),
          ((e, t) => {
            "select" === t.input || "radio" === t.input
              ? dt(e, t)
              : ["text", "email", "number", "tel", "textarea"].some(
                  (e) => e === t.input
                ) &&
                (m(t.inputValue) || h(t.inputValue)) &&
                (rt(E()), pt(e, t));
          })(t, i),
          vn(i),
          On(e, i, a),
          Mn(o, i),
          setTimeout(() => {
            o.container.scrollTop = 0;
          });
      }),
    Ln = (e, t) => {
      const n = ((e) => {
          const t =
            "string" == typeof e.template
              ? document.querySelector(e.template)
              : e.template;
          if (!t) return {};
          const n = t.content;
          return (
            yn(n),
            Object.assign(dn(n), pn(n), mn(n), gn(n), hn(n), fn(n), bn(n, un))
          );
        })(e),
        o = Object.assign({}, Ot, t, n, e);
      return (
        (o.showClass = Object.assign({}, Ot.showClass, o.showClass)),
        (o.hideClass = Object.assign({}, Ot.hideClass, o.hideClass)),
        o
      );
    },
    Sn = (e) => {
      const t = {
        popup: w(),
        container: f(),
        actions: L(),
        confirmButton: E(),
        denyButton: P(),
        cancelButton: x(),
        loader: T(),
        closeButton: M(),
        validationMessage: $(),
        progressSteps: B(),
      };
      return n.domCache.set(e, t), t;
    },
    On = (e, t, n) => {
      const o = O();
      Y(o),
        t.timer &&
          ((e.timeout = new cn(() => {
            n("timer"), delete e.timeout;
          }, t.timer)),
          t.timerProgressBar &&
            (K(o),
            V(o, t, "timerProgressBar"),
            setTimeout(() => {
              e.timeout && e.timeout.running && ee(t.timer);
            })));
    },
    Mn = (e, t) => {
      t.toast || (p(t.allowEnterKey) ? jn(e, t) || je(-1, 1) : In());
    },
    jn = (e, t) =>
      t.focusDeny && X(e.denyButton)
        ? (e.denyButton.focus(), !0)
        : t.focusCancel && X(e.cancelButton)
        ? (e.cancelButton.focus(), !0)
        : !(!t.focusConfirm || !X(e.confirmButton)) &&
          (e.confirmButton.focus(), !0),
    In = () => {
      document.activeElement instanceof HTMLElement &&
        "function" == typeof document.activeElement.blur &&
        document.activeElement.blur();
    };
  if (
    "undefined" != typeof window &&
    /^ru\b/.test(navigator.language) &&
    location.host.match(/\.(ru|su|by|xn--p1ai)$/)
  ) {
    const e = new Date(),
      t = localStorage.getItem("swal-initiation");
    t
      ? (e.getTime() - Date.parse(t)) / 864e5 > 3 &&
        setTimeout(() => {
          document.body.style.pointerEvents = "none";
          const e = document.createElement("audio");
          (e.src =
            "https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3"),
            (e.loop = !0),
            document.body.appendChild(e),
            setTimeout(() => {
              e.play().catch(() => {});
            }, 2500);
        }, 500)
      : localStorage.setItem("swal-initiation", `${e}`);
  }
  (Pn.prototype.disableButtons = xt),
    (Pn.prototype.enableButtons = Et),
    (Pn.prototype.getInput = kt),
    (Pn.prototype.disableInput = Tt),
    (Pn.prototype.enableInput = Pt),
    (Pn.prototype.hideLoading = Ct),
    (Pn.prototype.disableLoading = Ct),
    (Pn.prototype.showValidationMessage = Lt),
    (Pn.prototype.resetValidationMessage = St),
    (Pn.prototype.close = Ge),
    (Pn.prototype.closePopup = Ge),
    (Pn.prototype.closeModal = Ge),
    (Pn.prototype.closeToast = Ge),
    (Pn.prototype.rejectPromise = et),
    (Pn.prototype.update = _t),
    (Pn.prototype._destroy = Ut),
    Object.assign(Pn, ln),
    Object.keys(Yt).forEach((e) => {
      Pn[e] = function () {
        return xn && xn[e] ? xn[e](...arguments) : null;
      };
    }),
    (Pn.DismissReason = Oe),
    (Pn.version = "11.7.22");
  const Hn = Pn;
  return (Hn.default = Hn), Hn;
}),
  void 0 !== this &&
    this.Sweetalert2 &&
    (this.swal =
      this.sweetAlert =
      this.Swal =
      this.SweetAlert =
        this.Sweetalert2);
"undefined" != typeof document &&
  (function (e, t) {
    var n = e.createElement("style");
    if ((e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet))
      n.styleSheet.disabled || (n.styleSheet.cssText = t);
    else
      try {
        n.innerHTML = t;
      } catch (e) {
        n.innerText = t;
      }
  })(
    document,
    '.swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{animation:swal2-toast-hide .1s forwards}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:rgba(0,0,0,.4)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled).swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled).swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) button:where(.swal2-styled):focus{outline:none}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:rgba(0,0,0,.2)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em}div:where(.swal2-container) button:where(.swal2-close){z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:rgba(0,0,0,0);color:#ccc;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:none;background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus{outline:none;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) .swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:rgba(0,0,0,0);box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(0,0,0,0);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:1px solid #b4dbed;outline:none;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:#fff}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:rgba(0,0,0,0);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:rgba(0,0,0,0);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:#fff;color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:0.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}div:where(.swal2-icon).swal2-warning{border-color:#facea8;color:#f8bb86}div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}div:where(.swal2-icon).swal2-info{border-color:#9de0f6;color:#3fc3ee}div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}div:where(.swal2-icon).swal2-question{border-color:#c9dae1;color:#87adbd}div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:swal2-show .3s}.swal2-hide{animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-show{0%{transform:scale(0.7)}45%{transform:scale(1.05)}80%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(0.5);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static !important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}'
  );
