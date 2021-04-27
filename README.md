# proSapient Swagger / OpenAPI viewer

This is Slate-like alternative to SwaggerUI based on proSapient styleguide.

![proSapient Swagger](/screenshots/image.png?raw=true "proSapient Swagger")

## Advantages

* Bare CRA app with minimum ad-hoc changes
* 100% Compatible with OpenAPI v3.0
* 3-columns Slate-like view
* Advanced markdown render

## Setup

* Setup `REACT_APP_SPEC_URL` with url to open-api spec
* Since render is dynamic make sure that open-api host is CORS friendly
* Run `yarn start` to run the app
* Use any react-app hosting (e.g. netlify) for docs hosting.

## Notes

* OpenAPI v3.0 supports markdown in `description` fields (not only). 
* All code snippets will be moved to right column in documentation.
* This render splits main `description` field into sections based on headers (#) and sub-headers (##).
* all description supports markdown tables.
* Code snippet may use title:
```ruby
  ```ruby Title here
  code here
```
