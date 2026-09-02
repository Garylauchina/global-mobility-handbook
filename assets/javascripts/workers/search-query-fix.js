"use strict"

const wrapperUrl = new URL(self.location.href)
const upstreamValue = wrapperUrl.searchParams.get("upstream")

if (!upstreamValue)
  throw new Error("Missing upstream search worker URL")

const upstreamUrl = new URL(upstreamValue, wrapperUrl)

if (upstreamUrl.origin !== wrapperUrl.origin)
  throw new Error("Search worker upstream must be same-origin")

self.addEventListener("message", event => {
  const message = event.data
  if (message && message.type === 2 && typeof message.data === "string")
    message.data = message.data.replace(/\p{sc=Han}+/gu, "$&㐀")
})

importScripts(upstreamUrl.href)
