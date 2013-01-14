Stanbol API front-end
=====================

## Overview

The **Stanbol API front-end** is a developer-oriented HTTP API to post analysis tasks to [Apache Stanbol](http://stanbol.apache.org) and provides the following features:
* extremely simple APIs to ease prototyping, integration and usage
* support for textual contents
* support for URLs
* for URLs, preprocessing of HTML pages to capture the actual URL content while skipping noise such as ads, menus and so forth
* synchronous access (for asynchronous access see [idntik.it](http://idntik.it))

The API are coded in Java as an OSGi compliant bundle which installs in [Apache Felix](http://felix.apache.org) side-by-side with Apache Stanbol.

The preprocessing of HTML is based on the well-known [Readability](https://code.google.com/p/arc90labs-readability/source/browse/trunk/js/readability.js) javascript. Readability is behind the same feature that many people use when they switch to the reader view of Safari (and other browser now too). For more information on Readability see [here](http://blog.arc90.com/2010/06/07/safari-5-another-step-towards-better-reading-on-the-web/).

## Install

To install, checkout the source code, then run the following from the *stanbol-facade-api* folder:

```sh
mvn -DskipTests install -PinstallBundle -Dsling.url=http://localhost:8080/system/console
```

where **localhost:8080** is your installation of Apache Stanbol.

## How to use

The aim for the API is to be very simple for developers to use and integrate, in fact only one end-point is implemented at present time: */api/tasks*

```sh
curl -ik \
 -X POST \
 -H "Content-Type: application/json" \
 -H "Accept: application/json" \
 http://localhost:8080/api/tasks \
 -d @*a json file*
```

where **localhost:8080** is your installation of Apache Stanbol.

### JSON payload

The API consumer can send two different payloads:
* a content payload containing the textual contents to be analyzed.
* a URL payload containing a URL to be parsed for contents.

#### Content

Example content payload:

```javascript
{
	"mimeType": "application/rdf+xml",
	"content": "Thank you so much.\nTonight, *...* God bless these United States."
}
```

The original test file is available [here](https://github.com/insideout10/stanbol-facade/blob/master/home/var/samples/obamareelectionspeech.json).

#### URL

Example URL payload:

```javascript
{
	"url": "http://www.corriere.it/politica/12_dicembre_11/Berlusconi-che-ci-importa-dello-spread_0f328ec8-4368-11e2-b89b-3cf6075586fe.shtml",
	"mimeType": "application/rdf+xml"
}
```

## Credits

This work was developed by [InsideOut10](http://www.insideout.io) as part of the Open Source contributions to Apache Stanbol.

## License

  Copyright 2013 InsideOut10

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.