// src/lib/courses.ts

export const COURSE_DATA: any = {
  foundations: {
    title: "Networking Foundations",
    threshold: 85,
    rankAward: "Packet Sniffer",
    "lesson-1": {
      title: "What Is a Network and Why It Matters",
      duration: "30 mins",
      content: `### Core Definition
A computer network is a group of two or more devices connected together so they can exchange data and share resources. 

**Data types include:**
- Text messages
- Emails
- Videos & Files
- System instructions

### Why Networks Exist
Networks solve three basic problems:
1. **Communication:** Sending information between devices.
2. **Resource sharing:** Access to printers, files, and internet.
3. **Efficiency:** Doing tasks faster and at scale.

### Criteria That Define a Network
For something to be considered a network, it must have:
- At least two connected devices.
- A communication medium (wired or wireless).
- Rules for communication (protocols).

### The Analogy
A network is like a **conversation between people**. 
- Devices are people.
- Data is speech.
- Protocols are the language and rules. If people don’t agree on a language, communication fails.

### Real-Life Applications
- Online gaming & Video calls.
- ATM transactions.
- Smart home devices.

**Learning Outcome:** You can now define a network, explain its necessity, and identify them in the wild.`,
      practical: {
        goal: "Test the communication line by pinging the loopback address. Type: 'ping 127.0.0.1'",
        expected: "ping 127.0.0.1",
        output: "Pinging 127.0.0.1 with 32 bytes of data...\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\n[SUCCESS] Local communication stack is operational."
      },
      quiz: [
        { id: 1, q: "What is the core definition of a network?", options: ["One isolated PC", "Two or more connected devices", "A computer screen"], correct: 1 },
        { id: 2, q: "In our analogy, what represents 'Protocols'?", options: ["The people", "The language/rules", "The speech"], correct: 1 },
        { id: 3, q: "Which is NOT a reason networks exist?", options: ["Communication", "Resource isolation", "Efficiency"], correct: 1 }
      ]
    },
    "lesson-2": {
      title: "Network Components – The Building Blocks",
      duration: "30 mins",
      content: `### Core Components
1. **End Devices (Hosts):** Computers, Smartphones, Servers, and Printers. These are the origins and destinations of data.
2. **Network Interface Card (NIC):** Hardware that allows connection. Wired (Ethernet) or Wireless (Wi-Fi).
3. **Transmission Media:** The path (Ethernet cables, Fiber optics, or Radio waves).
4. **Intermediary Devices:** The managers (Switches, Routers, Access Points).

### Selection Criteria
Choosing components depends on:
- Number of devices.
- Distance & Speed requirements.
- Budget.

### The Analogy
Think of a **delivery system**:
- Homes are devices.
- Roads are cables.
- Traffic controllers are switches.
- Route planners are routers.

**Learning Outcome:** You can identify components, understand their roles, and explain how they connect physically.`,
      practical: {
        goal: "Check your local Network Interface status. Type: 'show nic status'",
        expected: "show nic status",
        output: "Interface: eth0 | Status: UP | Speed: 1000Mbps\nInterface: wlan0 | Status: DOWN\n[INFO] Ethernet NIC detected and active."
      },
      quiz: [
        { id: 1, q: "What allows a device to physically connect to a network?", options: ["NIC", "CPU", "RAM"], correct: 0 },
        { id: 2, q: "Which is an intermediary device?", options: ["Printer", "Router", "Smartphone"], correct: 1 },
        { id: 3, q: "Fiber optic cables use what to transmit data?", options: ["Electricity", "Light", "Sound"], correct: 1 }
      ]
    },
    "lesson-3": {
      title: "Types of Networks – LAN, WAN, and Beyond",
      duration: "30 mins",
      content: `### Classification Criteria
Networks are classified by geographic size, ownership, and purpose.

### Types of Networks
- **LAN (Local Area Network):** Small area (home/office). High speed, privately owned.
- **WAN (Wide Area Network):** Large areas (countries/continents). Uses public/leased infrastructure.
- **MAN (Metropolitan):** Covers a city or campus.
- **PAN (Personal):** Very short range (Bluetooth, smartwatches).

### Real-Life Examples
- Home Wi-Fi = LAN.
- Corporate branch connection = WAN.
- University campus = MAN.

**Learning Outcome:** You can differentiate network types and choose the right one for any scenario.`,
      practical: {
        goal: "Identify the current network scope. Type: 'network-type --scan'",
        expected: "network-type --scan",
        output: "Scanning topology...\nRange: 100m\nOwnership: Private\nResult: LAN Detected."
      },
      quiz: [
        { id: 1, q: "Which network covers a city?", options: ["LAN", "PAN", "MAN"], correct: 2 },
        { id: 2, q: "What defines a WAN?", options: ["Bluetooth range", "Small office size", "Countries/Continents coverage"], correct: 2 },
        { id: 3, q: "Is a home Wi-Fi network high-speed and private?", options: ["Yes (LAN)", "No (WAN)"], correct: 0 }
      ]
    },
    "lesson-4": {
      title: "Data, Packets, and How Information Travels",
      duration: "30 mins",
      content: `### What Is Data?
Raw digital information represented as **bits** (0s and 1s).

### What Is a Packet?
A small unit of data containing:
- Source & Destination addresses.
- Payload (actual data).
- Control information.

### Why Packet Switching?
Data is broken down to:
- Improve efficiency.
- Reduce congestion.
- Allow error recovery.

### The Analogy
Sending a **book by mail**:
- Pages are sent separately in envelopes.
- Each has the same destination.
- Pages are reassembled upon delivery.

**Learning Outcome:** You can explain packet communication and understand how data is reconstructed.`,
      practical: {
        goal: "Simulate data fragmentation into packets. Type: 'packetize --data 1024kb'",
        expected: "packetize --data 1024kb",
        output: "Data received: 1024kb\nFragmenting...\n[P1][P2][P3][P4] created.\nAdding Headers... Ready for transmission."
      },
      quiz: [
        { id: 1, q: "What are bits?", options: ["0s and 1s", "Small cables", "Radio frequencies"], correct: 0 },
        { id: 2, q: "What does the 'Payload' of a packet contain?", options: ["The address", "The actual data", "The error code"], correct: 1 },
        { id: 3, q: "Why break data into packets?", options: ["To make it slower", "To reduce congestion/improve efficiency", "To hide the data"], correct: 1 }
      ]
    },
    "lesson-5": {
      title: "IP Addresses – The Identity of Devices",
      duration: "30 mins",
      content: `### Definition
A unique numerical identifier assigned to every device on a network. 

### Types of IP Addresses
- **IPv4:** (e.g., 192.168.1.1). Limited space.
- **IPv6:** Longer format. Solves address exhaustion.
- **Public vs Private:** Private is local; Public is internet-visible.
- **Dynamic vs Static:** Dynamic is auto-assigned; Static is manual.

**Learning Outcome:** You can identify IP types and understand why uniqueness matters.`,
      practical: {
        goal: "Retrieve your station's IP configuration. Type: 'ipconfig'",
        expected: "ipconfig",
        output: "IPv4 Address . . . . . : 192.168.1.105\nSubnet Mask . . . . . : 255.255.255.0\nDefault Gateway . . . : 192.168.1.1"
      },
      quiz: [
        { id: 1, q: "Which IP is visible on the internet?", options: ["Private", "Public", "Static"], correct: 1 },
        { id: 2, q: "Why was IPv6 created?", options: ["It is cheaper", "IPv4 addresses ran out", "It uses less power"], correct: 1 },
        { id: 3, q: "What is a 'Static' IP?", options: ["Automatically assigned", "Manually configured", "Changes every hour"], correct: 1 }
      ]
    },
    "lesson-6": {
      title: "Routers, Switches, and Traffic Control",
      duration: "30 mins",
      content: `### Switches
Operate inside LANs. They forward data based on device (MAC) addresses to reduce collisions.

### Routers
Connect different networks. They decide the best paths for data and connect LANs to the internet.

### The Analogy
- **Switch:** Like an office receptionist directing you to a specific room.
- **Router:** Like a GPS navigation system planning a route between cities.

**Learning Outcome:** Distinguish between routers and switches and explain high-level data flow.`,
      practical: {
        goal: "Check the routing table for the best path. Type: 'show ip route'",
        expected: "show ip route",
        output: "Gateway: 192.168.1.1\nPath 01: [Fastest] -> ISP-1\nPath 02: [Backup] -> ISP-2\nStatus: Routing active."
      },
      quiz: [
        { id: 1, q: "Which device connects different networks?", options: ["Switch", "Router", "Access Point"], correct: 1 },
        { id: 2, q: "What is a Switch's primary job?", options: ["Assign IPs", "Forward data within a LAN", "Connect to the moon"], correct: 1 },
        { id: 3, q: "Which device acts like a 'GPS'?", options: ["Switch", "Router", "NIC"], correct: 1 }
      ]
    },
    "lesson-7": {
      title: "The Internet Explained Simply",
      duration: "30 mins",
      content: `### Definition
The internet is a global system of interconnected networks following shared rules.

### How it Works
1. Device sends request.
2. Router forwards it.
3. **ISP** (Internet Service Provider) carries it.
4. Server responds.

### Why it Scales
Decentralized design, redundant paths, and standardized protocols.

**Learning Outcome:** Describe internet mechanics and the role of ISPs.`,
      practical: {
        goal: "Resolve a server name to see the internet flow. Type: 'nslookup google.com'",
        expected: "nslookup google.com",
        output: "Server: odyssey-dns-01\nNon-authoritative answer:\nName: google.com\nAddress: 142.250.190.46"
      },
      quiz: [
        { id: 1, q: "What does ISP stand for?", options: ["Internal System Port", "Internet Service Provider", "Integrated Signal Path"], correct: 1 },
        { id: 2, q: "The internet is a 'Network of...'", options: ["Computers", "Networks", "Cables"], correct: 1 },
        { id: 3, q: "Why is the internet decentralized?", options: ["For security and redundancy", "Because it is cheaper", "Because no one owns it"], correct: 0 }
      ]
    },
    "lesson-8": {
      title: "Troubleshooting – Logical Models",
      duration: "30 mins",
      content: `### Common Issues
No connectivity, slow speeds, or intermittent drops.

### Troubleshooting Model
1. **Identify the problem.**
2. **Isolate the cause** (determine if it is one device or many).
3. **Test solutions.**
4. **Verify resolution.**

### Real-Life Application
- Check cables/power (Physical layer first).
- Restarting devices.
- Checking ISP outages.

**Learning Outcome:** Apply structured logic to diagnose and fix basic network issues.`,
      practical: {
        goal: "Trace a connection to find where it breaks. Type: 'tracert 8.8.8.8'",
        expected: "tracert 8.8.8.8",
        output: "1  <1ms 192.168.1.1\n2  12ms isp-core-01.net\n3  * * * Request Timed Out.\n[ALERT] Connection break detected at ISP gateway."
      },
      quiz: [
        { id: 1, q: "What should you check first?", options: ["Software updates", "Physical cables/power", "DNS settings"], correct: 1 },
        { id: 2, q: "What is the second step of troubleshooting?", options: ["Isolate the cause", "Identify the problem", "Call a friend"], correct: 0 },
        { id: 3, q: "Troubleshooting should be based on...", options: ["Guesswork", "Structured Logic", "Random clicking"], correct: 1 }
      ]
    },
    "final-exam": {
      title: "Foundations Final Clearance",
      questions: [
        { q: "What is the primary purpose of a network?", options: ["Isolating data", "Resource sharing & communication", "Power generation"], correct: 1 },
        { q: "A 'Host' is another name for what?", options: ["A router", "An end device", "A cable"], correct: 1 },
        { q: "Which cable type is used for high-speed city-wide connections?", options: ["Copper", "Fiber Optics", "Coaxial"], correct: 1 },
        { q: "What network type covers a small office?", options: ["WAN", "LAN", "PAN"], correct: 1 },
        { q: "Data is broken into these small units for travel:", options: ["Blocks", "Packets", "Slices"], correct: 1 },
        { q: "An IPv4 address looks like which of these?", options: ["192.168.1.1", "2001:db8::", "FF-EE-DD"], correct: 0 },
        { q: "Which device connects different networks?", options: ["Switch", "Router", "NIC"], correct: 1 },
        { q: "What does an ISP provide?", options: ["Hard drives", "Internet access", "New monitors"], correct: 1 },
        { q: "The first layer to check when troubleshooting is:", options: ["Application", "Physical (cables)", "Network"], correct: 1 },
        { q: "A Bluetooth connection is a:", options: ["WAN", "MAN", "PAN"], correct: 2 },
        { q: "The 'Payload' is the:", options: ["Address", "Actual data content", "Cable weight"], correct: 1 },
        { q: "DHCP usually provides which type of IP?", options: ["Static", "Dynamic", "Manual"], correct: 1 },
        { q: "A Switch directs traffic using...", options: ["IP addresses", "MAC addresses", "Usernames"], correct: 1 },
        { q: "Intermediary devices include:", options: ["PCs and Phones", "Routers and Switches", "Keyboards"], correct: 1 },
        { q: "The Internet is decentralized. This means:", options: ["It has a single brain", "It has redundant, shared paths", "It doesn't work in space"], correct: 1 }
      ]
    }
  },
  building: {
    title: "Building Networks: Protocols, IP & Routing",
    threshold: 85,
    rankAward: "Subnet Samurai",
    "lesson-1": {
      title: "Why Protocols Exist",
      duration: "60 mins",
      content: `### Core Definition
A protocol is a formal set of agreed rules that define how data is formatted, sent, received, and how errors are handled. Without protocols, digital communication would be literal noise.

### Why Protocols are Mandatory
In the modern matrix, we use devices from different manufacturers (Apple, Cisco, Samsung, Dell) running different OS. Protocols create **standard behavior** so they can all "speak" the same language.

> ### The Traffic Analogy
> Protocols are like traffic laws. Everyone agrees to drive on a specific side of the road, and red lights mean the same thing to every driver. Rules prevent total chaos.

### Practical Perspective
When you open a website, a "Protocol Stack" works together:
- **DNS** resolves the name.
- **IP** routes the packets.
- **TCP** ensures reliability.
- **HTTP** formats the webpage.

**Learning Outcome:** You can define protocols, explain layered communication, and identify them in real traffic.`,
      practical: {
        goal: "Check the active protocol stack on your interface. Type: 'protocols --list'",
        expected: "protocols --list",
        output: "ACTIVE STACK:\n[L7] HTTP/S\n[L4] TCP/UDP\n[L3] IPv4/IPv6\n[L2] ARP\nStatus: Stack Synchronized."
      },
      quiz: [
        { id: 1, q: "What is a protocol?", options: ["A type of hardware", "A set of agreed communication rules", "A physical cable"], correct: 1 },
        { id: 2, q: "What happens if devices don't use the same protocol?", options: ["They slow down", "Communication fails", "They use more power"], correct: 1 },
        { id: 3, q: "In our analogy, traffic lights represent what?", options: ["Data", "Protocols", "Hardware"], correct: 1 }
      ]
    },
    "lesson-2": {
      title: "The OSI Model – A Thinking Tool",
      duration: "60 mins",
      content: `### What the OSI Model Really Is
The OSI Model is a conceptual framework that breaks communication into 7 logical layers. It is **not** a piece of software; it is a diagnostic and design tool.

### The 7 Layers (Functional Purpose)
1. **Physical:** Signals, cables, and voltages.
2. **Data Link:** Local delivery and MAC addresses.
3. **Network:** IP addressing and routing paths.
4. **Transport:** Reliability and flow control.
5. **Session:** Connection management.
6. **Presentation:** Formatting and encryption.
7. **Application:** User-facing services (Browser, Email).

> ### The Package Analogy
> OSI is like sending a package: The item is the data, the box is the Layer 4 segment, the address label is the Layer 3 packet, and the delivery truck is the Layer 1 physical medium.

**Learning Outcome:** You can map real-world issues to specific layers to stop guessing and start troubleshooting.`,
      practical: {
        goal: "Simulate a Layer 1 diagnostic. Type: 'diagnose --layer 1'",
        expected: "diagnose --layer 1",
        output: "Checking Physical Interfaces...\nEth0: NO SIGNAL (Cable Disconnected)\n[FIX] Plug in the Ethernet cable to clear Layer 1."
      },
      quiz: [
        { id: 1, q: "Which layer is responsible for IP addressing?", options: ["Layer 2", "Layer 3", "Layer 4"], correct: 1 },
        { id: 2, q: "If the Wi-Fi light is OFF, which layer is likely the problem?", options: ["Layer 1 (Physical)", "Layer 7 (Application)", "Layer 3 (Network)"], correct: 0 },
        { id: 3, q: "Is the OSI Model a software product?", options: ["Yes", "No, it's a reference model"], correct: 1 }
      ]
    },
    "lesson-3": {
        title: "TCP/IP – The Internet Reality",
        duration: "60 mins",
        content: `### TCP/IP in Reality
While OSI is for teaching, **TCP/IP** is the practical implementation used on the internet today. It condenses the world into 4 layers:
1. **Network Interface**
2. **Internet**
3. **Transport**
4. **Application**

### TCP vs UDP (Reliability vs Speed)
| Feature | TCP | UDP |
| :--- | :--- | :--- |
| Reliability | Guaranteed | No Guarantee |
| Speed | Slower (Checks errors) | Faster (Just sends) |
| Use Case | Web/Email | Gaming/Streaming |

**Learning Outcome:** You can choose between TCP and UDP logically and understand real packet flow.`,
        practical: {
          goal: "Initiate a reliable TCP handshake. Type: 'connect --tcp odyssey.net'",
          expected: "connect --tcp odyssey.net",
          output: "[SYN] -> Sent\n[SYN-ACK] <- Received\n[ACK] -> Sent\nStatus: TCP Session Established (Reliable)."
        },
        quiz: [
          { id: 1, q: "Which protocol is faster for online gaming?", options: ["TCP", "UDP"], correct: 1 },
          { id: 2, q: "What does IP decide?", options: ["How fast data goes", "Where data goes", "If data is encrypted"], correct: 1 },
          { id: 3, q: "How many layers are in the practical TCP/IP model?", options: ["7", "4", "5"], correct: 1 }
        ]
      },
      "lesson-4": {
        title: "IP Addressing & Binary Logic",
        duration: "75 mins",
        content: `### IP = Location + Identity
An IP address (IPv4) is a 32-bit address split into two parts:
1. **Network Portion:** Used for routing between networks.
2. **Host Portion:** Identifies the specific device.

### Binary Basics
Routers do not see decimals like "192". They see bits. 
- **Decimal 192** = \`11000000\` in binary.

### IPv4 Exhaustion
IPv4 only allows ~4 billion addresses. Because ofdevice growth, we are moving to **IPv6**, which has a nearly infinite address space.

**Learning Outcome:** You can read IPs structurally and prepare for the math of subnetting.`,
        practical: {
          goal: "Convert the first octet of 192.168.1.1 to binary. Type: 'binary --convert 192'",
          expected: "binary --convert 192",
          output: "Decimal: 192\nBinary: 11000000\n[PATTERN] 128 + 64 + 0 + 0 + 0 + 0 + 0 + 0"
        },
        quiz: [
          { id: 1, q: "How many bits are in an IPv4 address?", options: ["16", "32", "128"], correct: 1 },
          { id: 2, q: "What portion of the IP does a router read?", options: ["Host Portion", "Network Portion"], correct: 1 },
          { id: 3, q: "Why was IPv6 created?", options: ["To make the internet faster", "To solve address exhaustion", "To replace Wi-Fi"], correct: 1 }
        ]
      },
      "lesson-5": {
        title: "Subnetting – Network Design",
        duration: "90 mins",
        content: `### What Subnetting Solves
Subnetting is the process of dividing one large network into multiple smaller ones. 
**Goals:** Efficiency, Security, and Performance.

> ### The Building Analogy
> Subnetting is like cutting a large, empty building into smaller, secure offices. Each office has its own door and controlled access.

### Subnet Masks & CIDR
The Mask (e.g., /24) tells the computer where the network ends and the hosts begin.
- **/24** = 256 addresses.
- **/26** = 64 addresses (Creating 4 subnets).

**Learning Outcome:** You can perform subnet calculations and design basic IP plans.`,
        practical: {
          goal: "Calculate the subnets for a /26 mask. Type: 'subnet --mask /26'",
          expected: "subnet --mask /26",
          output: "Mask: 255.255.255.192\nSubnets: 4\nHosts per Subnet: 62\nRange 1: .0 to .63"
        },
        quiz: [
          { id: 1, q: "What does CIDR notation (/24) represent?", options: ["The IP version", "The number of network bits", "The speed of the network"], correct: 1 },
          { id: 2, q: "Why do we subnet?", options: ["To use more cables", "To improve performance and security", "To hide the internet"], correct: 1 },
          { id: 3, q: "Which is a valid subnet mask?", options: ["255.255.255.0", "192.168.1.1", "0.0.0.255"], correct: 0 }
        ]
      },
      "lesson-6": {
        title: "Switching – Local Design",
        duration: "60 mins",
        content: `### What Switching Really Does
Switches operate at Layer 2 (Data Link). They learn the **MAC addresses** of connected devices and send data only to the specific port where the destination lives.

### VLANs (Logical Separation)
Virtual LANs (VLANs) allow you to separate departments (like HR and Finance) on the **same physical switch** for better security.

**Learning Outcome:** You can explain switch behavior and design simple LAN layouts.`,
        practical: {
          goal: "View the dynamic MAC address table. Type: 'show mac-table'",
          expected: "show mac-table",
          output: "Port 1: 00-14-22-01-23-45 [PC-01]\nPort 2: 00-14-22-05-99-AA [PC-02]\nStatus: Learning Active."
        },
        quiz: [
          { id: 1, q: "What address does a Switch use to forward data?", options: ["IP Address", "MAC Address", "Home Address"], correct: 1 },
          { id: 2, q: "What is a VLAN used for?", options: ["To boost Wi-Fi", "To logically separate networks", "To replace routers"], correct: 1 },
          { id: 3, q: "How does a switch reduce traffic?", options: ["By blocking the internet", "By sending data only to the destination port", "By turning off empty ports"], correct: 1 }
        ]
      },
      "lesson-7": {
        title: "Routing – The Best Path",
        duration: "60 mins",
        content: `### Routing is Decision-Making
Routers are the "GPS" of the network. When a packet arrives, the router:
1. Reads the Destination IP.
2. Consults its **Routing Table**.
3. Chooses the best path based on metrics (speed/distance).

### Static vs Dynamic
- **Static:** You manually tell the router where to go (Simple/Secure).
- **Dynamic:** Routers talk to each other (OSPF, BGP) to learn the best path automatically (Scalable).

**Learning Outcome:** You can understand routing logic and distinguish between routing methods.`,
        practical: {
          goal: "Consult the routing table for the gateway. Type: 'show ip route'",
          expected: "show ip route",
          output: "D 0.0.0.0/0 [110/2] via 192.168.1.1\nC 192.168.1.0/24 is directly connected\nStatus: Best path selected."
        },
        quiz: [
          { id: 1, q: "What does a router use to make forwarding decisions?", options: ["MAC Table", "Routing Table", "User list"], correct: 1 },
          { id: 2, q: "Which routing type is better for large, changing networks?", options: ["Static", "Dynamic"], correct: 1 },
          { id: 3, q: "A 'Metric' in routing represents what?", options: ["The weight of the router", "The 'cost' or distance of a path", "The number of users"], correct: 1 }
        ]
      },
      "lesson-8": {
        title: "Designing Real Networks",
        duration: "75 mins",
        content: `### Design is About Tradeoffs
Engineers must balance **Cost, Performance, Security, and Scalability**. 

### The Design Process
1. **Identify Requirements:** How many users? What apps?
2. **Choose Topology:** Star, Mesh, or Hybrid?
3. **Plan IP Addressing:** Subnetting for growth.
4. **Security:** Where do firewalls go?

### Common Mistakes
- **Flat Networks:** Putting everyone in one giant subnet (Security risk).
- **No Redundancy:** Having only one path to the internet (Single point of failure).

**Learning Outcome:** You can design basic networks and justify your engineering decisions.`,
        practical: {
          goal: "Deploy the final network configuration. Type: 'deploy --network-plan v1'",
          expected: "deploy --network-plan v1",
          output: "Initializing Star Topology...\nApplying Subnet 192.168.10.0/24...\nVLANs 10, 20, 30 Created...\n[SUCCESS] Network Design Validated."
        },
        quiz: [
          { id: 1, q: "What is a 'Flat Network'?", options: ["A network with no subnetting", "A network with no cables", "A network on one floor"], correct: 0 },
          { id: 2, q: "Why is redundancy important?", options: ["To save money", "To prevent a single point of failure", "To make it look better"], correct: 1 },
          { id: 3, q: "What is the first step in network design?", options: ["Buy devices", "Identify requirements", "Draw a diagram"], correct: 1 }
        ]
      },
      "final-exam": {
        title: "Building Networks: Final Clearance",
        questions: [
          { q: "What is the primary role of a Network Protocol?", options: ["To power devices", "To provide a set of rules for communication", "To store data"], correct: 1 },
          { q: "Which OSI layer handles encryption and formatting?", options: ["Layer 1", "Layer 6", "Layer 3"], correct: 1 },
          { q: "What is the main difference between TCP and UDP?", options: ["TCP is faster", "TCP provides reliable delivery", "UDP checks for errors"], correct: 1 },
          { q: "How many bits are in an IPv4 address octet?", options: ["4", "8", "32"], correct: 1 },
          { q: "A /26 CIDR mask provides how many usable host addresses?", options: ["254", "62", "14"], correct: 1 },
          { q: "Which device forwards traffic based on MAC addresses?", options: ["Router", "Switch", "Hub"], correct: 1 },
          { q: "What does a Router use to find the best path?", options: ["MAC Table", "Routing Table", "DNS"], correct: 1 },
          { q: "VLANs are used to:", options: ["Physically move switches", "Logically separate broadcast domains", "Increase internet speed"], correct: 1 },
          { q: "A 'Default Gateway' is usually the IP of which device?", options: ["Your PC", "Your Switch", "Your Router"], correct: 2 },
          { q: "Which protocol is used to resolve a name to an IP?", options: ["HTTP", "DNS", "TCP"], correct: 1 },
          { q: "Binary 11000000 is equal to which decimal number?", options: ["128", "192", "255"], correct: 1 },
          { q: "Layer 2 of the OSI model is called:", options: ["Network", "Data Link", "Physical"], correct: 1 },
          { q: "What happens in a 'Three-Way Handshake'?", options: ["A router reboots", "A TCP connection is established", "A switch learns a MAC"], correct: 1 },
          { q: "Which network topology is most common in modern LANs?", options: ["Ring", "Star", "Bus"], correct: 1 },
          { q: "The process of 'borrowing bits' from the host portion is:", options: ["Routing", "Subnetting", "Switching"], correct: 1 }
        ]
      }
  },
  advanced: {
    title: "Advanced Networking — Performance, Security, and Troubleshooting",
    threshold: 85,
    rankAward: "Network Architect",
    "lesson-1": {
      title: "How Real Networks Fail",
      duration: "1 Hour",
      content: `### Why Theory Breaks Down
In real environments, failures are rarely as simple as a broken cable. Most networks fail while being powered on and "correctly" configured. 

### Common Misconceptions
- **"We need more bandwidth"**: Often, the pipe is big enough, but the processor is full.
- **"The router is slow"**: Usually, it's a protocol delay, not hardware speed.
- **"Just reboot everything"**: This hides the root cause without fixing it.

### Real Causes of Failure
- **Minor misconfigurations**: A single wrong digit in an ACL.
- **Asymmetric routing**: Data goes out one path and tries to return through a blocked one.
- **DNS Delays**: Users think the internet is "down" when names just aren't resolving.
- **Silent Drops**: Firewalls dropping packets without sending an error message.

> ### Real-Life Example
> A company upgrades to a 10Gbps link, but users report *slower* speeds. **Why?** The firewall's Deep Packet Inspection (DPI) engine was built for 1Gbps. It became a bottleneck, dropping packets as it struggled to keep up.

**Outcome:** You will start thinking systemically and skeptical of "easy" hardware fixes.`,
      practical: {
        goal: "Detect silent drops in the security appliance. Type: 'inspect --drops --verbose'",
        expected: "inspect --drops --verbose",
        output: "[WARN] 12.5% Packet Loss detected at Firewall-01\n[REASON] Buffer Overflow in DPI Engine\n[ACTION] Bypass inspection for trusted traffic."
      },
      quiz: [
        { id: 1, q: "What is a 'Silent Drop'?", options: ["A cable being unplugged", "Firewall dropping packets without notification", "A router losing power"], correct: 1 },
        { id: 2, q: "Why might a bandwidth upgrade make things slower?", options: ["Cables get too hot", "Security devices may bottleneck at higher speeds", "The ISP reduces quality"], correct: 1 },
        { id: 3, q: "Asymmetric routing causes issues because:", options: ["Data travels too fast", "Return paths might be blocked or unmonitored", "It uses two different cables"], correct: 1 }
      ]
    },
    "lesson-2": {
      title: "Network Performance Fundamentals",
      duration: "1 Hour 15 Mins",
      content: `### What "Fast" Really Means
"Speed" is a misleading term. User experience is a calculation of four critical metrics.

### Key Performance Metrics
1. **Bandwidth**: Maximum capacity (The width of the road).
2. **Latency**: Time delay (The distance and processing time).
3. **Jitter**: Variability in delay (The inconsistency of traffic flow).
4. **Packet Loss**: Reliability failure (Potholes that require data to be resent).

### Practical Impact
- **Voice Calls**: Break even on 1Gbps links if **Jitter** is high.
- **Cloud Apps**: Feel slow if **Latency** is high, regardless of bandwidth.
- **Gaming**: Hates **Jitter** and **Loss** more than low bandwidth.

> ### The Road Analogy
> Bandwidth is a **wide road**. Latency is the **speed limit**. Jitter is a **traffic light** that keeps changing timings randomly.

**Outcome:** You can now describe performance problems accurately instead of just saying the network is "slow."`,
      practical: {
        goal: "Measure Jitter and Latency on the VoIP trunk. Type: 'test-qos --voip --target 10.1.1.5'",
        expected: "test-qos --voip --target 10.1.1.5",
        output: "Latency: 45ms (Optimal)\nJitter: 115ms (CRITICAL)\n[ALERT] High Jitter detected. Audio packets arriving out of sync."
      },
      quiz: [
        { id: 1, q: "Which metric describes the variability in packet arrival time?", options: ["Bandwidth", "Latency", "Jitter"], correct: 2 },
        { id: 2, q: "If a cloud app is in a distant region, which metric increases?", options: ["Bandwidth", "Latency", "Throughput"], correct: 1 },
        { id: 3, q: "Why does gaming prefer low Jitter over high Bandwidth?", options: ["Consistency matters for real-time state sync", "It makes the graphics better", "Bandwidth is too expensive"], correct: 0 }
      ]
    },
    "lesson-3": {
      title: "Traffic Flow and Bottleneck Analysis",
      duration: "1 Hour 15 Mins",
      content: `### What Congestion Actually Is
Congestion occurs when demand exceeds the ability to process data. Buffers fill up, and packets are either delayed or dropped.

### Where Bottlenecks Hide
- **Access Switches**: Too many users on one uplink.
- **WAN Circuits**: The narrowest part of the corporate network.
- **ISP Handoff**: Where your fast fiber meets the ISP's congested router.

### TCP Behavior Logically
TCP is **conservative**. It assumes that packet loss means the network is full. When loss occurs, TCP intentionally slows down to "help" the network.

**Outcome:** You can identify congestion points and explain why speeds fluctuate during peak hours.`,
      practical: {
        goal: "Locate the bottleneck in the path to the Data Center. Type: 'path-analyze --destination 172.16.0.10'",
        expected: "path-analyze --destination 172.16.0.10",
        output: "Hop 1: 1ms (Core)\nHop 2: 85ms (ISP-Edge) [!!! BOTTLENECK detected]\nHop 3: 88ms (DC-Gateway)\n[RESULT] Link saturation at ISP edge."
      },
      quiz: [
        { id: 1, q: "How does TCP respond to packet loss?", options: ["Sends faster", "Slows down intentionally", "Reboots the router"], correct: 1 },
        { id: 2, q: "Where is a 'Bottleneck' usually found?", options: ["In the fastest cable", "At the narrowest point of traffic flow", "In the user's mouse"], correct: 1 }
      ]
    },
    "lesson-4": {
      title: "Quality of Service (QoS)",
      duration: "1 Hour",
      content: `### Why QoS Exists
Not all traffic is equal. If a Windows Update downloads at the same priority as a CEO's Zoom call, the call will fail.

### QoS Concepts
1. **Classification**: Identifying what the traffic is.
2. **Marking**: Labeling the packet (like a VIP badge).
3. **Queuing**: Deciding who gets to go first when the line is long.
4. **Shaping vs Policing**: Smoothing traffic out vs dropping it if it exceeds limits.

> ### The Emergency Analogy
> QoS is an **Ambulance**. Both the ambulance and the delivery truck are on the road, but the ambulance gets "Priority Queuing" to bypass the traffic lights.

**Outcome:** You understand when QoS helps, when it's pointless, and when it makes things worse.`,
      practical: {
        goal: "Apply a priority marking to Voice traffic. Type: 'qos-mark --type voice --dscp EF'",
        expected: "qos-mark --type voice --dscp EF",
        output: "Traffic Class: Voice\nMarking: DSCP 46 (Expedited Forwarding)\n[SUCCESS] Voice packets will now bypass standard data queues."
      },
      quiz: [
        { id: 1, q: "What is 'Classification' in QoS?", options: ["Dropping packets", "Identifying traffic types", "Encrypting data"], correct: 1 },
        { id: 2, q: "Which QoS method smooths out traffic bursts?", options: ["Policing", "Shaping", "Deleting"], correct: 1 }
      ]
    },
    "lesson-5": {
        title: "Network Monitoring & Visibility",
        duration: "1 Hour 15 Mins",
        content: `### Monitoring is Non-Negotiable
Failures start small: a slight rise in CPU, a few errors on a port. Monitoring turns these surprises into **trends**.

### What to Watch
- **Interface Utilization**: Is the link full?
- **CPU/Memory**: Is the router overwhelmed?
- **Error Counters**: Are the cables failing?

### Monitoring vs Alerting
Monitoring is the **Dashboard**. Alerting is the **Alarm**. Too many alerts cause "Alert Fatigue," where engineers ignore real problems.

**Outcome:** You can design proactive visibility systems that catch problems before users call.`,
        practical: {
          goal: "Pull SNMP data for the core router CPU. Type: 'snmp-get --oid router.cpu.usage'",
          expected: "snmp-get --oid router.cpu.usage",
          output: "Router-Core-01 Usage: 94%\n[CRITICAL] CPU threshold exceeded.\n[REASON] BGP process re-calculating routes."
        },
        quiz: [
          { id: 1, q: "What is 'Alert Fatigue'?", options: ["Being too tired to type", "Ignoring alarms due to too many false positives", "A broken monitor"], correct: 1 },
          { id: 2, q: "Interface utilization monitoring helps detect:", options: ["Congestion", "Password leaks", "Physical theft"], correct: 0 }
        ]
      },
      "lesson-6": {
        title: "Logs and Event Correlation",
        duration: "1 Hour",
        content: `### Logs are Evidence
Logs record what happened, when it happened, and what decision the system made.

### Types of Logs
1. **Syslog**: System-level events (reboots, interface flaps).
2. **Traffic Logs**: Who talked to whom.
3. **Security Logs**: Denied attempts and threats.

### Practical Thinking
Logs only help if you correlate them. If the network went slow at 12:00 PM, look at the **Traffic Log** for 12:00 PM to see what changed.

**Outcome:** You will stop blind troubleshooting and start using logs contextually.`,
        practical: {
          goal: "Search logs for interface 'flapping' events. Type: 'logs --view syslog --grep flap'",
          expected: "logs --view syslog --grep flap",
          output: "12:05:01 - Eth0/1: State changed to DOWN\n12:05:04 - Eth0/1: State changed to UP\n[RESULT] Flapping interface detected. Possible faulty cable."
        },
        quiz: [
          { id: 1, q: "What does 'flapping' mean in networking?", options: ["The router is moving", "An interface going Up and Down repeatedly", "Slow Wi-Fi"], correct: 1 },
          { id: 2, q: "Which log shows blocked traffic?", options: ["Syslog", "Security Log", "Application Log"], correct: 1 }
        ]
      },
      "lesson-7": {
        title: "Security: Defense as a System",
        duration: "1 Hour 15 Mins",
        content: `### Security Reality
No network is ever 100% secure. Security is **Risk Reduction**.

### Core Principles
- **Least Privilege**: Only give users access to what they need.
- **Segmentation**: Divide the network so a breach in one area doesn't spread.
- **Assume Compromise**: Design as if the hacker is already inside.

### Defense in Depth
Layered controls: Perimeter (Firewall) -> Internal (VLANs) -> Endpoint (Antivirus) -> Monitoring (Logs).

**Outcome:** You will see security as a strategy, not just a product.`,
        practical: {
          goal: "Enforce a 'Least Privilege' policy on the server VLAN. Type: 'secure --vlan 20 --policy strict'",
          expected: "secure --vlan 20 --policy strict",
          output: "Policy Applied: Default Deny\nAllowed: Port 443 (HTTPS)\nBlocked: All others.\n[STATUS] Lateral movement risk reduced."
        },
        quiz: [
          { id: 1, q: "What is 'Defense in Depth'?", options: ["One very strong password", "Multiple layers of security controls", "Putting the server in a basement"], correct: 1 },
          { id: 2, q: "What does 'Least Privilege' mean?", options: ["No one gets access", "Users only get the minimum access required", "Everyone is an admin"], correct: 1 }
        ]
      },
      "lesson-8": {
        title: "Firewalls and Filtering Logic",
        duration: "1 Hour 15 Mins",
        content: `### Filtering Decisions
Firewalls evaluate traffic based on: Source, Destination, Port, Protocol, and **State**.

### Stateful vs Stateless
- **ACLs (Stateless)**: Fast, but "blind." They don't remember if a packet belongs to an existing conversation.
- **Firewalls (Stateful)**: Intelligent. They remember that you sent a request and automatically allow the reply back in.

### Common Mistakes
- **Overly Broad Rules**: Allowing "Any" traffic.
- **Rule Order**: Putting specific rules *below* general ones (They never get hit).

**Outcome:** You can predict traffic behavior and diagnose blocked flows.`,
        practical: {
          goal: "Add a stateful rule to allow web traffic. Type: 'fw-rule --add --permit tcp 443 --stateful'",
          expected: "fw-rule --add --permit tcp 443 --stateful",
          output: "Rule Added: Permit TCP 443\nStatus: Stateful Inspection Active.\n[INFO] Return traffic will be automatically permitted."
        },
        quiz: [
          { id: 1, q: "A stateful firewall is better because:", options: ["It is cheaper", "It remembers connection context", "It uses less power"], correct: 1 },
          { id: 2, q: "In a firewall list, which rules are checked first?", options: ["The ones at the bottom", "The ones at the top", "The ones with the most users"], correct: 1 }
        ]
      },
      "lesson-9": {
        title: "Network Attacks & The Adversary",
        duration: "1 Hour 15 Mins",
        content: `### Why Attacks Work
Hackers exploit **visibility gaps** and **trust**.

### Common Attack Types
- **Scanning**: Mapping your network (Nmap).
- **Spoofing**: Pretending to be someone else (IP/MAC).
- **Man-in-the-Middle (MitM)**: Intercepting data between two parties.
- **DoS**: Overwhelming a system so it crashes.

### Attacker Mindset
Attackers move **laterally**. They get into a weak PC and then "hop" to the sensitive servers.

**Outcome:** Recognize the signs of an attack and reduce your exposure.`,
        practical: {
          goal: "Detect an ARP Spoofing attempt. Type: 'security-scan --detect mitm'",
          expected: "security-scan --detect mitm",
          output: "[ALERT] ARP Cache Mismatch on Gateway\nIP 192.168.1.1 seen at TWO MAC addresses.\n[RESULT] Man-in-the-Middle attack in progress."
        },
        quiz: [
          { id: 1, q: "What is 'Lateral Movement'?", options: ["Cables moving on the floor", "An attacker moving from one compromised device to another", "Data going to the ISP"], correct: 1 },
          { id: 2, q: "A DoS attack targets which metric?", options: ["Confidentiality", "Availability", "Integrity"], correct: 1 }
        ]
      },
      "lesson-10": {
        title: "Secure Design & Segmentation",
        duration: "1 Hour",
        content: `### The Blast Radius
In a **Flat Network**, one infected laptop can infect the entire company. This is a large "Blast Radius."

### Segmentation Techniques
- **VLANs**: Separate traffic logically.
- **Firewall Zones**: Create "Islands of Trust" (e.g., DMZ for servers, Internal for staff, Guest for visitors).

**Outcome:** You can design segmented networks that minimize risk and improve control.`,
        practical: {
          goal: "Isolate the Guest VLAN from the Server VLAN. Type: 'segment --isolate guest --target servers'",
          expected: "segment --isolate guest --target servers",
          output: "Routing between VLAN 50 (Guest) and VLAN 10 (Servers) DISABLED.\n[STATUS] Blast radius restricted."
        },
        quiz: [
          { id: 1, q: "Why are 'Flat Networks' dangerous?", options: ["They are too slow", "They allow a single breach to spread everywhere", "They use too many IPs"], correct: 1 }
        ]
      },
      "lesson-11": {
        title: "Structured Troubleshooting",
        duration: "1 Hour 15 Mins",
        content: `### Stop Random Guessing
Randomly changing settings is dangerous. It hides root causes and creates new problems.

### Proven Models
1. **OSI-Based**: Bottom-up (Physical first) or Top-down.
2. **Follow-the-Path**: Checking every hop between source and destination.
3. **Divide and Conquer**: Start in the middle (Layer 3) and go up or down.

**Outcome:** You will troubleshoot faster and with total confidence.`,
        practical: {
          goal: "Diagnose a connection failure using Divide & Conquer. Type: 'ping gateway'",
          expected: "ping gateway",
          output: "Reply from 192.168.1.1: Success.\n[LOGIC] Layer 1-3 to the gateway is functional. Problem is likely Layer 4+ or WAN."
        },
        quiz: [
          { id: 1, q: "The 'Bottom-Up' approach starts at which layer?", options: ["Application", "Network", "Physical"], correct: 2 }
        ]
      },
      "lesson-12": {
        title: "Real Incident Walkthroughs",
        duration: "1 Hour 15 Mins",
        content: `### Reality is Messy
Incidents don't have labels. You must solve:
- **Broadcast Storms**: Where a loop crashes the switch.
- **Routing Loops**: Where packets go in circles until they expire.
- **ISP Drops**: Where the problem is outside your building.

**Outcome:** You practice thinking under pressure and handling messy, multi-factor failures.`,
        practical: {
          goal: "Identify a Layer 2 loop. Type: 'show spanning-tree --errors'",
          expected: "show spanning-tree --errors",
          output: "[ALERT] Excessive Broadcast Traffic on Port 5\n[ALERT] MAC Address Table Flapping\n[RESULT] Layer 2 Loop detected. STP blocked port 5."
        },
        quiz: [
          { id: 1, q: "Which protocol prevents Layer 2 loops?", options: ["BGP", "STP", "DHCP"], correct: 1 }
        ]
      },
      "lesson-13": {
        title: "Optimization & Capacity Planning",
        duration: "1 Hour",
        content: `### Predictive Engineering
A good engineer plans for growth. A bad one waits for an outage.

### Concepts
- **Baselines**: Knowing what "Normal" looks like.
- **Growth Trends**: If traffic grows 10% a month, when will the link be full?

**Outcome:** Justify equipment upgrades with data, not guesses.`,
        practical: {
          goal: "Forecast link exhaustion. Type: 'capacity --forecast --link wan1'",
          expected: "capacity --forecast --link wan1",
          output: "Current Utilization: 70%\nGrowth Rate: 5%/mo\n[PREDICTION] Link saturation in 6 months.\n[ACTION] Budget for upgrade in Q3."
        },
        quiz: [
          { id: 1, q: "Why is a 'Baseline' important?", options: ["To save energy", "To know what 'Normal' looks like for comparison", "To block hackers"], correct: 1 }
        ]
      },
      "lesson-14": {
        title: "Thinking Like a Network Engineer",
        duration: "1 Hour",
        content: `### The Professional Mindset
Real engineering is 50% technology and 50% **Process**.
- **Documentation**: If it's not written down, it doesn't exist.
- **Change Control**: Never change a production network without a window.
- **Rollback Plans**: Always know how to "undo" your work in 30 seconds.

**Outcome:** You leave this course ready to operate, secure, and troubleshoot like a professional.`,
        practical: {
          goal: "Commit a change with a safety timer. Type: 'commit --check --timer 10m'",
          expected: "commit --check --timer 10m",
          output: "Configuration applied.\n[SAFETY] If not confirmed in 10m, system will auto-rollback.\nStatus: Awaiting Pilot confirmation."
        },
        quiz: [
          { id: 1, q: "What is the most important part of any network change?", options: ["Speed", "Having a rollback plan", "Doing it alone"], correct: 1 }
        ]
      },

    "final-exam": {
      title: "Advanced Tier: Final Evaluation",
      questions: [
        { q: "Which metric describes delay variability?", options: ["Latency", "Jitter", "Throughput"], correct: 1 },
        { q: "What does TCP assume when it detects packet loss?", options: ["Power failure", "Congestion", "User error"], correct: 1 },
        { q: "Which log is best for diagnosing a faulty cable?", options: ["Syslog", "Traffic log", "Security log"], correct: 0 },
        { q: "Stateful firewalls are superior because they:", options: ["Are faster", "Understand connection context", "Use less RAM"], correct: 1 },
        { q: "The 'Blast Radius' refers to:", options: ["The weight of a router", "The extent of potential damage from a breach", "The Wi-Fi range"], correct: 1 },
        { q: "QoS 'Marking' happens at which layer usually?", options: ["Layer 1", "Layer 3 (DSCP)", "Layer 7"], correct: 1 },
        { q: "What is the purpose of a Spanning Tree (STP)?", options: ["Route traffic", "Prevent Layer 2 loops", "Assign IP addresses"], correct: 1 },
        { q: "A 'Baseline' allows an engineer to:", options: ["Sleep better", "Identify abnormal behavior", "Speed up the internet"], correct: 1 },
        { q: "Defense in Depth suggests:", options: ["One strong firewall", "Layered security controls", "Using only fiber"], correct: 1 },
        { q: "If the Wi-Fi light is off, start troubleshooting at:", options: ["Layer 3", "Layer 1", "Layer 7"], correct: 1 },
        { q: "Lateral Movement is used by attackers to:", options: ["Fix cables", "Navigate inside a network to find targets", "Download files faster"], correct: 1 },
        { q: "Least Privilege is a principle for:", options: ["Speed", "Security access control", "Cost saving"], correct: 1 },
        { q: "Snmp monitoring is primarily used for:", options: ["Encryption", "Visibility into device health", "Chatting with peers"], correct: 1 },
        { q: "A Rollback plan is used when:", options: ["A configuration change fails", "A user forgets a password", "An ISP is cheap"], correct: 0 },
        { q: "What is a bottleneck?", options: ["A type of cable connector", "The slowest point in a data path", "A security hole"], correct: 1 }
      ]
    }
  },
   "osi-model": {
    title: "Mastering TCP/IP and the OSI Model",
    threshold: 85,
    rankAward: "Protocol Pilot",
    "lesson-1": {
      title: "Why Networking Needs Layers",
      duration: "45 mins",
      content: `### Core Explanation
Networking is incredibly complex. Data must be represented digitally, sent as electrical signals, routed globally, and understood by apps. Trying to solve this in one step would make systems **fragile** and **impossible to troubleshoot**. 

Layering separates responsibilities, allowing vendors to innovate independently and protocols to evolve without breaking the entire internet.

> ### The Restaurant Analogy
> Think of a restaurant:
> 1. **Kitchen:** Prepares food (Data Creation).
> 2. **Packaging:** Ensures food stays intact (Encapsulation).
> 3. **Delivery:** Transports the meal (Physical/Data Link).
> 4. **Address:** Ensures correct destination (Network Layer).
> 5. **Customer:** Consumes the food (Application).

**Engineering Note:** Layering is the reason we can upgrade from Wi-Fi 5 to Wi-Fi 6 without needing to change how Google Chrome works.`,
      practical: {
        goal: "Analyze a protocol stack sequence. Type: 'stack --analyze --all'",
        expected: "stack --analyze --all",
        output: "[L7] HTTP GET /index.html\n[L4] TCP Port 80 (Reliable)\n[L3] IP Dest: 10.0.0.5\n[L2] MAC: AA:BB:CC\n[STATUS] Encapsulation logic verified."
      },
      quiz: [
        { id: 1, q: "Why do we use layers in networking?", options: ["To make it slower", "To separate responsibilities and allow independent innovation", "Because routers require them"], correct: 1 },
        { id: 2, q: "In the restaurant analogy, the kitchen represents:", options: ["Data Creation", "Physical Cables", "Routing"], correct: 0 }
      ]
    },
    "lesson-2": {
      title: "OSI Model — Layer Breakdown",
      duration: "60 mins",
      content: `### Deep Dive into the 7 Layers

**Layer 1: Physical**
- Deals with bits (0s and 1s), voltages, and light pulses.
- *Failure example:* Unplugged cable or weak Wi-Fi signal.

**Layer 2: Data Link**
- Local delivery and MAC addresses.
- *Math Insight:* MAC addresses are 48-bit. $2^{48}$ ≈ 281 Trillion unique addresses.

**Layer 3: Network**
- Logical addressing (IP) and routing decisions.
- *Key Idea:* Routers forward based on the **Network Portion** only.

**Layer 4: Transport**
- Reliability and Port numbers.
- *TCP Math:* **Window Size** controls how much data is sent before an ACK is required.

**Layers 5–7 (Software Layers)**
- **Session:** Connection tracking.
- **Presentation:** Encryption and encoding.
- **Application:** User-facing (HTTP, SMTP).

**Troubleshooting Note:** Professionals move **Bottom-Up** (Physical first) or **Top-Down**, never randomly.`,
      practical: {
        goal: "Check for Layer 2 address conflicts. Type: 'arp -a'",
        expected: "arp -a",
        output: "Interface: 192.168.1.1 --- 00-11-22-33-44-55\nInterface: 192.168.1.5 --- AA-BB-CC-DD-EE-FF\n[INFO] 48-bit MAC addressing table is healthy."
      },
      quiz: [
        { id: 1, q: "Which layer handles bit transmission (voltages/light)?", options: ["Layer 1", "Layer 3", "Layer 7"], correct: 0 },
        { id: 2, q: "What is the primary identifier used at Layer 2?", options: ["IP Address", "MAC Address", "Port Number"], correct: 1 }
      ]
    },
    "lesson-3": {
      title: "TCP/IP Model and Real Traffic",
      duration: "45 mins",
      content: `### TCP vs. UDP
**TCP (Transmission Control Protocol)**
Ensures ordered delivery and retransmission of lost packets.
- *Handshake Math:* **SYN -> SYN-ACK -> ACK**. Three messages establish trust.

**UDP (User Datagram Protocol)**
Removes acknowledgments. It is faster but less reliable. Use it when timing (gaming/VoIP) matters more than 100% accuracy.

**Engineer’s Note:** If TCP feels slow, it is usually reacting to **Packet Loss**, not a lack of bandwidth.

**Notes Summary:**
- OSI = Thinking Model.
- TCP/IP = Real Implementation.
- Engineers troubleshoot logically, not emotionally.`,
      practical: {
        goal: "Initialize a TCP 3-Way Handshake. Type: 'tcp --connect 8.8.8.8'",
        expected: "tcp --connect 8.8.8.8",
        output: "[SEND] SYN\n[RECV] SYN-ACK\n[SEND] ACK\n[SUCCESS] Connection Established. Trust verified."
      },
      quiz: [
        { id: 1, q: "Which protocol is 'connectionless' and faster?", options: ["TCP", "UDP"], correct: 1 },
        { id: 2, q: "What are the three steps of the TCP handshake?", options: ["START, MID, END", "SYN, SYN-ACK, ACK", "HELLO, WAIT, GO"], correct: 1 }
      ]
    },
    "lesson-4": {
      title: "Encapsulation: The Data Journey",
      duration: "45 mins",
      content: `### Russian Doll Networking
When you send data, it goes through **Encapsulation**. Each layer adds its own "header" (information) to the data, like putting a letter inside an envelope, then inside a box, then inside a shipping container.

**The Stages:**
1. **Data** (L7-5)
2. **Segment** (L4 - TCP/UDP header)
3. **Packet** (L3 - IP header)
4. **Frame** (L2 - MAC header)
5. **Bits** (L1 - Physical)

**Learning Outcome:** You can visualize how data morphs as it moves down the stack.`,
      practical: {
        goal: "Analyze the headers of a captured segment. Type: 'inspect --headers --all'",
        expected: "inspect --headers --all",
        output: "[L2] Src: AA:01 | Dst: BB:02\n[L3] Src: 10.0.0.1 | Dst: 8.8.8.8\n[L4] Protocol: TCP | Win: 64240\n[STATUS] Decapsulation successful."
      },
      quiz: [
        { id: 1, q: "What is data called at Layer 3?", options: ["Frame", "Packet", "Segment"], correct: 1 },
        { id: 2, q: "Encapsulation happens when data moves which way?", options: ["Up the stack", "Down the stack", "Sideways"], correct: 1 },
        { id: 3, q: "Which layer adds MAC address headers?", options: ["Network", "Data Link", "Physical"], correct: 1 }
      ]
    },
    "lesson-5": {
      title: "Common Ports: The Doors to Services",
      duration: "45 mins",
      content: `### Logic of Ports
If the IP is the building address, the **Port** is the specific room number. Every application listens on a specific port.

### Essential Port Registry:
- **HTTP:** 80 (Web)
- **HTTPS:** 443 (Secure Web)
- **DNS:** 53 (Name Resolution)
- **SSH:** 22 (Secure Shell)
- **FTP:** 21 (File Transfer)

**Engineering Note:** Blocking unused ports is the first step in "Hardening" a network.`,
      practical: {
        goal: "Scan the server for open application ports. Type: 'portscan --target 192.168.1.50'",
        expected: "portscan --target 192.168.1.50",
        output: "Port 22: OPEN (SSH)\nPort 80: OPEN (HTTP)\nPort 443: OPEN (HTTPS)\n[INFO] 3 services active on target host."
      },
      quiz: [
        { id: 1, q: "Which port is used for HTTPS?", options: ["80", "443", "53"], correct: 1 },
        { id: 2, q: "DNS operates on which port?", options: ["21", "22", "53"], correct: 2 },
        { id: 3, q: "A port is like what in our building analogy?", options: ["The foundation", "The room number", "The wallpaper"], correct: 1 }
      ]
    },
    "lesson-6": {
      title: "Diagnostic Tools Mastery",
      duration: "60 mins",
      content: `### Thinking Like a Pro
Network engineers use specific tools to test each layer of the OSI model. 

### The Toolkit:
- **Ping:** Tests Layer 3 connectivity.
- **Traceroute:** Maps every hop in the path.
- **Telnet/NC:** Tests if a specific port (Layer 4/7) is open.
- **ARP:** Maps L3 IPs to L2 MACs.

**Learning Outcome:** You can choose the right tool for the right layer failure.`,
      practical: {
        goal: "Verify if the web service is reachable on port 80. Type: 'nc -zv 10.0.0.1 80'",
        expected: "nc -zv 10.0.0.1 80",
        output: "Connection to 10.0.0.1 80 port [tcp/http] succeeded!\n[STATUS] Layer 4-7 path is verified."
      },
      quiz: [
        { id: 1, q: "Which tool tests connectivity at Layer 3?", options: ["Ping", "ARP", "Wireshark"], correct: 0 },
        { id: 2, q: "Traceroute shows you what?", options: ["The MAC address", "Every router in the path", "The user's name"], correct: 1 }
      ]
    },
    "final-exam": {
      title: "OSI & TCP/IP: Final Clearance",
      questions: [
        { q: "Which OSI layer is responsible for electrical signals and cable types?", options: ["Data Link", "Physical", "Network"], correct: 1 },
        { q: "What is the data unit called at the Transport Layer (Layer 4)?", options: ["Packet", "Frame", "Segment"], correct: 2 },
        { q: "Which protocol provides 'Reliable' delivery through acknowledgments?", options: ["UDP", "TCP", "IP"], correct: 1 },
        { q: "A Switch operates primarily at which OSI layer?", options: ["Layer 1", "Layer 2", "Layer 3"], correct: 1 },
        { q: "The process of adding a header as data moves down the stack is called:", options: ["Decapsulation", "Encryption", "Encapsulation"], correct: 2 },
        { q: "Which port does a browser use for SECURE web traffic (HTTPS)?", options: ["80", "443", "22"], correct: 1 },
        { q: "At which layer does IP Routing take place?", options: ["Layer 2", "Layer 3", "Layer 4"], correct: 1 },
        { q: "What are the three steps of the TCP handshake?", options: ["HELLO, WAIT, GO", "SYN, SYN-ACK, ACK", "START, TRANSFER, END"], correct: 1 },
        { q: "Which diagnostic tool maps the entire path (every hop) to a destination?", options: ["Ping", "Traceroute", "Ipconfig"], correct: 1 },
        { q: "How many bits are in a standard MAC address?", options: ["32-bit", "48-bit", "64-bit"], correct: 1 },
        { q: "Which layer handles data encryption and compression?", options: ["Application", "Presentation", "Session"], correct: 1 },
        { q: "What is the purpose of the TCP 'Window Size'?", options: ["To define the IP", "To control flow/buffer limits", "To hide the port"], correct: 1 },
        { q: "DNS (Name Resolution) uses which port number?", options: ["21", "25", "53"], correct: 2 },
        { q: "Which protocol is 'connectionless' and used for streaming/VoIP?", options: ["TCP", "UDP", "HTTP"], correct: 1 },
        { q: "If you move 'Bottom-Up' in troubleshooting, which layer do you check first?", options: ["Physical", "Network", "Application"], correct: 0 }
      ]
    }
  },
  "subnetting": {
    title: "Subnetting Made Simple — IPv4 & IPv6",
    threshold: 85,
    rankAward: "Subnet Samurai",
    "lesson-1": {
      title: "IP Address Structure",
      duration: "60 mins",
      content: `### IPv4 Basics
An IPv4 address is 32 bits total, written as 4 octets (8 bits each).
- **Example:** 192.168.1.10
- **Binary:** \`11000000.10101000.00000001.00001010\`

### Network vs. Host Portion
The **Subnet Mask** defines the split.
- **IP:** 192.168.1.10
- **Mask:** 255.255.255.0 (/24)
- *Result:* First 24 bits = Network. Last 8 bits = Hosts.

### Math Note: Usable Hosts
Formula: $2^{host\_bits} - 2$
**Why minus 2?** You must subtract the **Network Address** (first IP) and the **Broadcast Address** (last IP).`,
      practical: {
        goal: "Convert the first octet of 192.x.x.x to binary. Type: 'bin --convert 192'",
        expected: "bin --convert 192",
        output: "Decimal: 192\nBinary: 11000000\nNetwork Bits: 11000000 (Binary High)"
      },
      quiz: [
        { id: 1, q: "How many bits are in an IPv4 address?", options: ["16", "32", "128"], correct: 1 },
        { id: 2, q: "Why do we subtract 2 when calculating usable hosts?", options: ["For the Router and Switch", "For the Network and Broadcast addresses", "To save energy"], correct: 1 }
      ]
    },
    "lesson-2": {
      title: "Subnetting Math (Step-by-Step)",
      duration: "75 mins",
      content: `### Example Problem
**Network:** 192.168.1.0/24 
**Requirement:** Create 6 subnets.

### Steps to Solve:
1. **Find bits to borrow:** $2^3 = 8$ subnets (3 bits is enough to cover 6).
2. **New Mask:** /24 + 3 borrowed bits = **/27**.
3. **Host bits left:** 32 - 27 = **5 bits**.
4. **Usable hosts:** $2^5 - 2 = \mathbf{30}$ hosts per subnet.

### Increment Calculation
Increment = 256 - Subnet Mask Value.
For /27, the mask is 255.255.255.224.
**256 - 224 = 32.**

**Subnets:** .0, .32, .64, .96, .128, etc.`,
      practical: {
        goal: "Calculate the increment for a /26 mask (255.255.255.192). Type: 'calc --increment 192'",
        expected: "calc --increment 192",
        output: "256 - 192 = 64.\nSubnets: .0, .64, .128, .192\n[SUCCESS] Increment Logic Validated."
      },
      quiz: [
        { id: 1, q: "If you borrow 2 bits from a /24, what is the new CIDR?", options: ["/25", "/26", "/28"], correct: 1 },
        { id: 2, q: "What is the host increment for a 255.255.255.240 mask?", options: ["16", "32", "8"], correct: 0 }
      ]
    },
    "lesson-3": {
      title: "IPv6 Explained Clearly",
      duration: "45 mins",
      content: `### IPv6 Structure
IPv6 is **128 bits**, written in hexadecimal blocks. 
- **Example:** \`2001:0db8:85a3::8a2e:0370:7334\`

### Why IPv6 is Easier
1. **No Scarcity:** There are enough addresses for every grain of sand on earth.
2. **No NAT:** Devices connect directly.
3. **Standardization:** /64 is the standard subnet size for almost everything.

**Engineer’s Note:** IPv6 trades "math complexity" for "abundance." You stop counting bits and start designing flows.`,
      practical: {
        goal: "Compress the IPv6 address 2001:0db8:0000:0000:0000:0000:0000:0001. Type: 'ipv6 --compress'",
        expected: "ipv6 --compress",
        output: "Full: 2001:0db8:0000:0000:0000:0000:0000:0001\nCompressed: 2001:db8::1\n[INFO] Double colons used to replace zero blocks."
      },
      quiz: [
        { id: 1, q: "How many bits are in an IPv6 address?", options: ["32", "64", "128"], correct: 2 },
        { id: 2, q: "IPv6 is written in which format?", options: ["Dotted Decimal", "Hexadecimal", "Binary Only"], correct: 1 }
      ]
    },
    "lesson-4": {
      title: "CIDR and the /Slash Notation",
      duration: "60 mins",
      content: `### Beyond Classes
In the early days, IPs were rigid (Class A, B, C). **CIDR** (Classless Inter-Domain Routing) changed this by using the "Slash" notation.

- **/24** = 255.255.255.0 (Standard LAN)
- **/25** = 255.255.255.128 (Half a /24)
- **/30** = 255.255.255.252 (Used for Router-to-Router links)

**Engineering Tip:** Always use /30 or /31 for point-to-point links to save IP space.`,
      practical: {
        goal: "Calculate the subnet mask for a /25 prefix. Type: 'mask --calc /25'",
        expected: "mask --calc /25",
        output: "Prefix: /25\nBinary: 11111111.11111111.11111111.10000000\nDecimal: 255.255.255.128"
      },
      quiz: [
        { id: 1, q: "How many addresses are in a /24?", options: ["256", "128", "64"], correct: 0 },
        { id: 2, q: "Which prefix is best for a simple two-router link?", options: ["/8", "/24", "/30"], correct: 2 }
      ]
    },
    "lesson-5": {
      title: "Public, Private, and NAT Logic",
      duration: "60 mins",
      content: `### The Great Translation
Private IPs (e.g., 192.168.x.x) are not allowed on the public internet. **NAT** (Network Address Translation) is the process your router uses to swap your Private IP for its one Public IP.

### Private Ranges:
- **10.0.0.0** - 10.255.255.255
- **172.16.0.0** - 172.31.255.255
- **192.168.0.0** - 192.168.255.255

**Learning Outcome:** Understand how thousands of devices can "hide" behind a single public IP address.`,
      practical: {
        goal: "Identify your public facing gateway address. Type: 'show nat --public'",
        expected: "show nat --public",
        output: "Internal: 192.168.1.105:5012\nTranslated: 203.0.113.42:5012\n[INFO] NAT Translation Active."
      },
      quiz: [
        { id: 1, q: "Is 192.168.1.1 a Public or Private IP?", options: ["Public", "Private"], correct: 1 },
        { id: 2, q: "What does NAT stand for?", options: ["Network Address Translation", "Net Access Tool", "Node Application Transfer"], correct: 0 }
      ]
    },
    "lesson-6": {
      title: "Binary Speed-Counting",
      duration: "60 mins",
      content: `### The Human Calculator
To master subnetting, you must memorize the "Power of 2" values. 
**The Magic Numbers:** 128, 64, 32, 16, 8, 4, 2, 1.

### Example:
To get 200 in binary:
1. Is 200 > 128? **Yes** (1) -> 72 left.
2. Is 72 > 64? **Yes** (1) -> 8 left.
3. Is 8 > 32? No (0)
4. Is 8 > 16? No (0)
5. Is 8 >= 8? **Yes** (1) -> 0 left.
Result: \`11001000\`

**Learning Outcome:** Convert decimal to binary in your head in under 5 seconds.`,
      practical: {
        goal: "Convert decimal 168 to binary. Type: 'bin --convert 168'",
        expected: "bin --convert 168",
        output: "128 (1) + 64 (0) + 32 (1) + 16 (0) + 8 (1) + 4 (0) + 2 (0) + 1 (0)\nResult: 10101000\n[SUCCESS] Binary pattern recognized."
      },
      quiz: [
        { id: 1, q: "What is the binary value of 128?", options: ["10000000", "11111111", "00000001"], correct: 0 },
        { id: 2, q: "What is $2^4$?", options: ["8", "16", "32"], correct: 1 },
        { id: 3, q: "How many bits are needed to create 16 subnets?", options: ["2", "4", "8"], correct: 1},
      ]
    },
    "final-exam": {
      title: "Subnetting: Grandmaster Evaluation",
      questions: [
        { q: "How many bits are in a single IPv4 address?", options: ["16", "32", "128"], correct: 1 },
        { q: "What does CIDR notation '/24' represent in decimal?", options: ["255.255.0.0", "255.255.255.0", "255.0.0.0"], correct: 1 },
        { q: "How many usable hosts are in a /24 network?", options: ["256", "254", "128"], correct: 1 },
        { q: "Which formula calculates the number of usable hosts?", options: ["2^n", "2^n - 2", "n^2"], correct: 1 },
        { q: "IPv6 addresses are written in which format?", options: ["Dotted Decimal", "Binary", "Hexadecimal"], correct: 2 },
        { q: "What is the host increment for a /26 mask (255.255.255.192)?", options: ["32", "64", "128"], correct: 1 },
        { q: "Which of these is a Private IP range?", options: ["8.8.8.0", "10.0.0.0/8", "203.0.113.0"], correct: 1 },
        { q: "What is the binary equivalent of decimal 128?", options: ["11111111", "10000000", "00000001"], correct: 1 },
        { q: "A /30 prefix is most commonly used for what?", options: ["Large Offices", "Point-to-point router links", "Home Wi-Fi"], correct: 1 },
        { q: "What does NAT stand for?", options: ["Network Address Translation", "Node Access Table", "Net Application Terminal"], correct: 0 },
        { q: "How many bits are in an IPv6 address?", options: ["32", "64", "128"], correct: 2 },
        { q: "What is the Subnet Mask for a /27 prefix?", options: ["255.255.255.192", "255.255.255.224", "255.255.255.240"], correct: 1 },
        { q: "Why do we subtract 2 when calculating usable hosts?", options: ["For the Gateway and DNS", "For the Network and Broadcast IDs", "For the Server and Client"], correct: 1 },
        { q: "Which protocol allows a private network to share one public IP?", options: ["DHCP", "NAT", "DNS"], correct: 1 },
        { q: "In binary counting, what is the value of the 3rd bit from the right (2^2)?", options: ["2", "4", "8"], correct: 1 }
      ]
    }
  },
  "ccna-mastery": {
    title: "CCNA: Cisco Certified Associate",
    threshold: 85,
    rankAward: "Cisco Associate",
    "lesson-1": {
      title: "Introduction to Cisco IOS",
      duration: "90 mins",
      content: `### The Command Line Interface (CLI)
Cisco devices run on **IOS (Internetwork Operating System)**. Understanding the modes is critical for any engineer.

### Modes of Operation:
1. **User EXEC Mode** (\`Router>\`): Limited view, diagnostic only.
2. **Privileged EXEC Mode** (\`Router#\`): Detailed viewing and debugging.
3. **Global Config Mode** (\`Router(config)#\`): Where the actual changes happen.

**Learning Outcome:** Navigate modes and save configurations using \`write memory\`.`,
      practical: {
        goal: "Enter Privileged mode and then Global Config. Type: 'enable' followed by 'configure terminal'",
        expected: "configure terminal",
        output: "Router#\nEnter configuration commands, one per line. End with CNTL/Z.\nRouter(config)#"
      },
      quiz: [
        { id: 1, q: "Which mode is indicated by the '#' prompt?", options: ["User mode", "Privileged mode", "Setup mode"], correct: 1 },
        { id: 2, q: "What command takes you from Privileged to Global Config?", options: ["enable", "config t", "exit"], correct: 1 }
      ]
    },
    "lesson-2": {
      title: "VLANs & Trunking",
      duration: "2 Hours",
      content: `### Broadcast Domain Control
By default, all ports on a switch are in VLAN 1. We create **VLANs** to break up broadcast domains for security and performance.

### Trunking (802.1Q)
A **Trunk** is a link that carries traffic for multiple VLANs between switches.

**Learning Outcome:** Create a VLAN and assign it to a port.`,
      practical: {
        goal: "Create VLAN 10 named 'Sales'. Type: 'vlan 10' then 'name Sales'",
        expected: "name Sales",
        output: "Router(config-vlan)# name Sales\n[SUCCESS] VLAN 10 database updated."
      },
      quiz: [
        { id: 1, q: "What protocol is used for trunking?", options: ["802.3ad", "802.1Q", "VTP"], correct: 1 }
      ]
    }
    // ... add lessons 3-6 following CCNA curriculum ...
  },

  "ccnp-enterprise": {
    title: "CCNP: Enterprise Core",
    threshold: 85,
    rankAward: "Enterprise Engineer",
    "lesson-1": {
      title: "Advanced Spanning Tree (MSTP/RPVST+)",
      duration: "3 Hours",
      content: `### Layer 2 Loop Prevention
At the Professional level, standard STP is too slow. We use **Rapid-PVST+** or **MST (Multiple Spanning Tree)** to ensure sub-second convergence and load balancing.

**Learning Outcome:** Influence the Root Bridge election by changing the priority.`,
      practical: {
        goal: "Set this switch as the Root Bridge for VLAN 10. Type: 'spanning-tree vlan 10 priority 4096'",
        expected: "spanning-tree vlan 10 priority 4096",
        output: "Recalculating STP Topology...\nSwitch is now ROOT for VLAN 10."
      },
      quiz: [
        { id: 1, q: "What is the default STP priority?", options: ["32768", "4096", "1"], correct: 0 }
      ]
    }
    // ... add lessons 2-6 (BGP, EIGRP, Automation) ...
  },

  "mikrotik-mtcna": {
    title: "MikroTik: RouterOS Mastery",
    threshold: 85,
    rankAward: "MikroTik Certified",
    "lesson-1": {
      title: "Introduction to RouterOS CLI",
      duration: "60 mins",
      content: `### The MikroTik Logic
MikroTik uses **RouterOS**. Unlike Cisco, commands are structured in directories.

### Common Paths:
- \`/ip address\`: IP management.
- \`/interface\`: Physical/Virtual ports.
- \`/ip firewall\`: Security rules.

**Learning Outcome:** Print the current IP configuration.`,
      practical: {
        goal: "Print all assigned IP addresses. Type: '/ip address print'",
        expected: "/ip address print",
        output: "Flags: X - disabled, I - invalid, D - dynamic \n #   ADDRESS            NETWORK         INTERFACE\n 0   192.168.88.1/24    192.168.88.0    bridge"
      },
      quiz: [
        { id: 1, q: "How do you go to the root menu in MikroTik CLI?", options: ["exit", "/", "back"], correct: 1 },
        { id: 2, q: "What is the name of the MikroTik GUI tool?", options: ["Cisco View", "Winbox", "WebFig"], correct: 1 }
      ]
    }
},
};