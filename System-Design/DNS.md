# DNS (Domain Name System - domain to IP address)

![alt text](DNS/9.PNG "Title")  

**When you hit abc.example.com in browser below things happen** (refer above image)  

1. DNS server on you machine checks if entry of that domain name is present
2. CHeck browser cache
3. Call **local DNS server** (aka Name server) (provided by ISP) and that server check's it cache
4. If Ip not found, Name server calls the **Root DNS server (root server is at the top of DNS hierarchy)** which returns which **Top level domain(TLD)** server to reach out to (e.g. reach out to .com, or .org. or .in TLD servers).  
5. TLD server will refer to **Authorative name server** which should have the IP address 

**For abc.exmaple.com - Root server will return .com, TLD will return example.com, Authorative NS will return abc.example.com**