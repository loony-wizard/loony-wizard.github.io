"use strict";

if (location.protocol === "http:") {
	location.href = "https:" + location.hostname + location.pathname + location.hash;
}