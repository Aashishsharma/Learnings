# CDN

1. A CDN is a group of geographically distributed proxy servers. A proxy server is an intermediate server between a client and the origin server.
2. It's a network of distributed servers that work together to deliver web content (such as images, videos, CSS files, JavaScript files, and more) to users based on their geographic location.
3. CDN improves the performance, reliability, and availability of web content by reducing the distance between the user and the server delivering the content
4. It also caches the web content
5. CDN costs money

## Akamai

1. Akamai is one of the CDN prociders (Amazon CloudFront, Google Cloud CDN).
2. Akamai takes care of on which akamai CDN servers the static content needs to be hosted and when user's request static content from CDN, akamai tracks user location and serves content from nearest akamai CDN server

#### Steps tp use Akamai CDN

1. Create app that server minified css / js files - internal-server-domain/path/to/minified.js
2. Log in to Akamai Control Center
3. In Akamai Property Manager, Create a New Property -here you define settings such as the name of the property, the domain, and the type of content you'll be delivering (e.g., web content, streaming media, etc.).
4. Setup origin server - Configure your origin server settings within the property to specify where Akamai should retrieve your content from. This is typically the server where your minified JS file is currently hosted.
5. Retrieve CDN Domain - example-cdn.akamaized.net/path/to/minified.js
6. After deploying new minifed js to your internal sever purge CDN cache from Akamai UI