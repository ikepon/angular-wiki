# Rack::Utils
## Rack::Utils.parse_cookies(env)
HTTP_COOKIE からクッキーを取り出す

```ruby
def parse_cookies(env)
  parse_cookies_header env[HTTP_COOKIE]
end
```

## Rack::Utils.set_cookie_header!(response_headers, "session_key", Time.now.to_f)
HTTP_COOKIE に値をセットする

```ruby
def set_cookie_header!(header, key, value)
  header[SET_COOKIE] = add_cookie_to_header(header[SET_COOKIE], key, value)
  nil
end
```

cf:
- [Module: Rack::Utils](https://www.rubydoc.info/github/rack/rack/Rack/Utils)
